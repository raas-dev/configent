#!/bin/bash
# xorg + xfce + selkies + stealth chromium; bg jobs overlap apt chain
set -eux -o pipefail
command -v Xorg >/dev/null 2>&1 && command -v selkies >/dev/null 2>&1 && exit 0
export DEBIAN_FRONTEND=noninteractive
APTOPT=(-o Acquire::Retries=3 -o Acquire::Languages=none -o Dpkg::Use-Pty=0 -o Dpkg::Options::=--force-unsafe-io)
ARCH=$(dpkg --print-architecture)
TARBALL=/mnt/lima-provision/chromium-extensions.$ARCH.tar.gz

wait_ok() { # wait_ok <pid> <okfile> <log> — fail provision with bg job log
  wait "$1" || {
    cat "$3" >&2
    exit 1
  }
  [ -f "$2" ] || {
    cat "$3" >&2
    exit 1
  }
}

apt_base() { # incl. deps of bg jobs so they never wait on the dpkg lock
  apt-get update "${APTOPT[@]}"
  apt-get install -y --no-install-recommends "${APTOPT[@]}" \
    xorg xserver-xorg-video-dummy python3-pip unzip socat libnspr4 libnss3
}

chromium_dl() { # ~198MB; tarball cache if present, else pip cloakbrowser
  if [ -f "$TARBALL" ]; then
    tar xzf "$TARBALL" -C / && touch /tmp/cb.ok /tmp/ext.ok
  else
    pip3 install --no-cache-dir --break-system-packages --root-user-action=ignore --ignore-installed typing_extensions cloakbrowser &&
      cloakbrowser install &&
      touch /tmp/cb.ok
  fi
}

extensions_dl() { # crx downloads; cached tarball already includes them
  if [ -f "$TARBALL" ]; then
    for _ in $(seq 1 300); do
      [ -f /tmp/ext.ok ] && return 0
      sleep 2
    done
    return 1
  fi
  install -d /usr/local/share/extensions
  for pair in i-still-dont-care-about-cookies:edibdbjcniadpccecjdfdjjppcpchdlm ublock-origin-lite:ddkjiahejlhfcafbddmgiahcphecmpfh; do
    name=${pair%%:*}
    id=${pair##*:}
    curl -fsSL -o "/tmp/$name.crx" "https://clients2.google.com/service/update2/crx?response=redirect&prodversion=138.0.0.0&acceptformat=crx2,crx3&x=id%3D${id}%26uc"
    python3 -c 'import sys;d=open(sys.argv[1],"rb").read();open(sys.argv[2],"wb").write(d[d.find(b"PK\x03\x04"):])' "/tmp/$name.crx" "/tmp/$name.zip"
    mkdir -p "/usr/local/share/extensions/$name"
    unzip -oq "/tmp/$name.zip" -d "/usr/local/share/extensions/$name"
    rm -rf "/usr/local/share/extensions/$name"/_metadata
  done
  touch /tmp/ext.ok
}

selkies_install() { # pinned v2.0.0rc0 (latest with ubuntu26.04 debs)
  case "$ARCH" in
  amd64) DEB=selkies_2.0.0.rc0-1.ubuntu26.04_amd64.deb ;;
  arm64) DEB=selkies_2.0.0.rc0-1.ubuntu26.04_arm64.deb ;;
  esac
  SELKDEB=/mnt/lima-provision/$DEB
  if [ -f "$SELKDEB" ]; then
    apt-get install -y --no-install-recommends "${APTOPT[@]}" "$SELKDEB"
  else
    curl -fsSLO --retry 5 --retry-all-errors "https://github.com/selkies-project/selkies/releases/download/v2.0.0rc0/${DEB}"
    apt-get install -y --no-install-recommends "${APTOPT[@]}" "./${DEB}"
    rm -f "./${DEB}"
  fi
}

xfce_install() { # webtop ubuntu-xfce style desktop
  apt-get install -y --no-install-recommends "${APTOPT[@]}" \
    xfce4 xfce4-terminal thunar mousepad ristretto dbus-x11 pipewire pipewire-pulse wireplumber xubuntu-wallpapers
  rm -f /etc/xdg/autostart/xfce4-power-manager.desktop \
    /etc/xdg/autostart/xscreensaver.desktop \
    /usr/share/xfce4/panel/plugins/power-manager-plugin.desktop
  update-alternatives --set x-session-manager /usr/bin/xfce4-session
}

xorg_units() { # no display manager: systemd units run Xorg dummy + xfce directly
  printf '[Unit]\nDescription=Xorg dummy :0\n[Service]\nExecStart=/usr/bin/Xorg :0 -noreset\nRestart=on-failure\n[Install]\nWantedBy=graphical.target\n' >/etc/systemd/system/xorg-dummy.service
  # shellcheck disable=SC1083
  printf '[Unit]\nDescription=xfce session on :0\nRequires=xorg-dummy.service\nAfter=xorg-dummy.service\n[Service]\nUser={{.User}}\nPAMName=login\nEnvironment=DISPLAY=:0\nExecStart=/usr/bin/dbus-run-session -- /usr/bin/startxfce4\nRestart=on-failure\n[Install]\nWantedBy=graphical.target\n' >/etc/systemd/system/xfce-session.service
  systemctl enable xorg-dummy xfce-session
}

xorg_confd() { # localectl fails in cloud-init (located absent) — write XKB conf directly
  install -d /etc/X11/xorg.conf.d
  printf 'Section "InputClass"\n  Identifier "system-keyboard"\n  MatchIsKeyboard "on"\n  Option "XkbLayout" "fi"\nEndSection\n' >/etc/X11/xorg.conf.d/00-keyboard.conf
  sed -i 's/^XKBLAYOUT=.*/XKBLAYOUT="fi"/' /etc/default/keyboard
  # headless Xorg for selkies (video.display none = no virtio-gpu)
  printf 'Section "ServerLayout"\n  Identifier "layout"\n  Screen 0 "Screen0"\nEndSection\nSection "Device"\n  Identifier "dummy"\n  Driver "dummy"\n  VideoRam 32768\nEndSection\nSection "Monitor"\n  Identifier "monitor0"\n  HorizSync 5.0-1000.0\n  VertRefresh 5.0-200.0\nEndSection\nSection "Screen"\n  Identifier "Screen0"\n  Device "dummy"\n  Monitor "monitor0"\n  DefaultDepth 24\n  SubSection "Display"\n    Depth 24\n    Modes "2560x1440"\n    Virtual 2560 1440\n  EndSubSection\nEndSection\n' >/etc/X11/xorg.conf.d/10-dummy.conf
}

xfce_config() { # panel: stock default.xml from xfce4-panel pkg — no override needed
  install -d /etc/xdg/xfce4/xfconf/xfce-perchannel-xml
  cat >/etc/xdg/xfce4/xfconf/xfce-perchannel-xml/xfce4-desktop.xml <<'DESK'
<?xml version="1.0" encoding="UTF-8"?>
<channel name="xfce4-desktop" version="1.0">
  <property name="backdrop" type="empty" value="">
    <property name="screen0" type="empty" value="">
      <property name="monitor0" type="empty" value="">
        <property name="workspace0" type="empty" value="">
          <property name="color-style" type="int" value="0"/>
          <property name="image-style" type="int" value="5"/>
          <property name="last-image" type="string" value="/usr/share/xfce4/backdrops/xubuntu-wallpaper.png"/>
        </property>
      </property>
      <property name="monitorVirtual-1" type="empty" value="">
        <property name="workspace0" type="empty" value="">
          <property name="color-style" type="int" value="0"/>
          <property name="image-style" type="int" value="5"/>
          <property name="last-image" type="string" value="/usr/share/xfce4/backdrops/xubuntu-wallpaper.png"/>
        </property>
      </property>
    </property>
  </property>
</channel>
DESK
  printf 'WebBrowser=chromium\nTerminalEmulator=debian-x-terminal-emulator\n' >/etc/xdg/xfce4/helpers.rc
}

selkies_config() {
  cat >/usr/local/bin/selkies-session <<'EOF'
#!/bin/bash
# attaches selkies to the running Xorg/xfce session on :0
export DISPLAY="${DISPLAY:-:0}"
export XDG_RUNTIME_DIR="${XDG_RUNTIME_DIR:-/run/user/$(id -u)}"
# start pipewire stack if pulse socket absent
if [ ! -S "${XDG_RUNTIME_DIR}/pulse/native" ]; then
  pipewire & pipewire-pulse & wireplumber &
fi
for i in $(seq 1 20); do
  [ -S "${XDG_RUNTIME_DIR}/pulse/native" ] && break
  sleep 0.5
done
exec env -u LD_PRELOAD selkies --public --addr 127.0.0.1 --port 8080 \
  --enable-basic-auth=false \
  --encoder=x264enc
EOF
  chmod +x /usr/local/bin/selkies-session
  # TLS wrapper: https 8443 -> http 8080
  openssl req -x509 -newkey rsa:2048 -nodes -days 3650 -subj "/CN=localhost" \
    -keyout /etc/ssl/selkies.pem -out /tmp/sk.crt
  cat /tmp/sk.crt >>/etc/ssl/selkies.pem && rm /tmp/sk.crt
  printf '[Unit]\nDescription=Selkies TLS wrapper 8443->8080\nAfter=network.target\n[Service]\nExecStart=/usr/bin/socat OPENSSL-LISTEN:8443,fork,bind=127.0.0.1,cert=/etc/ssl/selkies.pem,verify=0 TCP:127.0.0.1:8080\nRestart=always\n[Install]\nWantedBy=multi-user.target\n' \
    >/etc/systemd/system/selkies-tls.service
  systemctl enable selkies-tls
  printf '[Desktop Entry]\nType=Application\nName=Selkies\nExec=selkies-session\n' \
    >/etc/xdg/autostart/selkies.desktop
  chmod 644 /etc/xdg/autostart/selkies.desktop
}

chromium_config() { # requires chromium_dl + extensions_dl done
  # cloakbrowser pip pkg installs under /root — relocate
  if [ -d /root/.cloakbrowser ]; then
    install -d /opt/cloakbrowser
    CRBIN=$(find /root/.cloakbrowser -maxdepth 2 -name chrome -print -quit)
    mv "$(dirname "$CRBIN")" /opt/cloakbrowser/
  fi
  CRBIN=$(find /opt/cloakbrowser -maxdepth 2 -name chrome -print -quit)
  # apparmor userns restriction breaks chrome sandbox on 24.04+
  echo 'kernel.apparmor_restrict_unprivileged_userns = 0' >/etc/sysctl.d/99-chromium-userns.conf
  sysctl -p /etc/sysctl.d/99-chromium-userns.conf
  # extensions (MV3/dNR): chrome must WRITE _metadata cache into ext dir -> user-owned
  # shellcheck disable=SC1083
  chown -R {{.User}}: /usr/local/share/extensions
  printf '#!/bin/sh\nexec %s --no-first-run --no-default-browser-check --load-extension=/usr/local/share/extensions/i-still-dont-care-about-cookies,/usr/local/share/extensions/ublock-origin-lite "$@"\n' "$CRBIN" >/usr/local/bin/chromium-wrapper
  chmod 755 /usr/local/bin/chromium-wrapper
  for n in chrome chromium chromium-browser; do ln -sf /usr/local/bin/chromium-wrapper /usr/local/bin/$n; done
  # .desktop + defaults
  install -d /usr/local/share/applications
  printf '[Desktop Entry]\nVersion=1.0\nName=Chromium\nGenericName=Web Browser\nExec=/usr/local/bin/chromium --no-first-run %%u\nTerminal=false\nType=Application\nIcon=chromium\nCategories=Network;WebBrowser;\nMimeType=x-scheme-handler/http;x-scheme-handler/https;\nStartupWMClass=Chromium\n' \
    >/usr/local/share/applications/chromium.desktop
  # snap-style duplicate name: chromium looks for it when deciding "is default"
  cp /usr/local/share/applications/chromium.desktop /usr/local/share/applications/chromium_chromium.desktop
  update-desktop-database /usr/local/share/applications || true
  chmod 755 /usr/local/share/applications
  chmod 644 /usr/local/share/applications/chromium.desktop /usr/local/share/applications/chromium_chromium.desktop
  # startup page (managed policy)
  install -d /etc/chromium/policies/managed
  printf '{"RestoreOnStartup":4,"RestoreOnStartupURLs":["https://browserleaks.com/ip"]}\n' \
    >/etc/chromium/policies/managed/startup.json
  printf '[Default Applications]\nx-scheme-handler/http=chromium_chromium.desktop\nx-scheme-handler/https=chromium_chromium.desktop\n' >/etc/xdg/mimeapps.list
  # per-user default too (xfce/xdg reads it before root one settles; survives reboot)
  # shellcheck disable=SC1083
  UHOME=$(getent passwd {{.User}} | cut -d: -f6)
  # shellcheck disable=SC1083
  install -d -o {{.User}} -m 755 "$UHOME/.config"
  printf '[Default Applications]\nx-scheme-handler/http=chromium_chromium.desktop\nx-scheme-handler/https=chromium_chromium.desktop\nx-scheme-handler/chromium_chromium.desktop=chromium_chromium.desktop\n' >"$UHOME/.config/mimeapps.list"
  # shellcheck disable=SC1083
  chown {{.User}}: "$UHOME/.config/mimeapps.list"
}

apt_base
chromium_dl >/tmp/cb.log 2>&1 &
CB=$!
extensions_dl >/tmp/ext.log 2>&1 &
EXT=$!
# apt chain serializes on the dpkg lock; runs while chromium/extensions download
selkies_install
xfce_install
xorg_units
xorg_confd
xfce_config
selkies_config
wait_ok "$CB" /tmp/cb.ok /tmp/cb.log
wait_ok "$EXT" /tmp/ext.ok /tmp/ext.log
chromium_config
systemctl set-default graphical.target
systemctl isolate graphical.target
