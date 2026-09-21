#!/bin/bash
# xorg + xfce + selkies + stealth chromium
# layout: all file writes + downloads run in parallel; ONE apt transaction (dpkg is the serial bottleneck)
set -eux -o pipefail
[ -f /var/tmp/desktop.done ] && exit 0 # full-run marker; binary checks miss partially-completed runs
export DEBIAN_FRONTEND=noninteractive
APTOPT=(-o Acquire::Retries=3 -o Acquire::Languages=none -o APT::Get::Keep-Downloaded-Packages=1 -o Dpkg::Use-Pty=0 -o Dpkg::Options::=--force-unsafe-io -o Dpkg::Options::=--force-confold -o APT::Immediate-Configure=0 -o Dpkg::Options::=--no-triggers) # Keep-Downloaded-Packages: apt deletes debs post-install by default → would defeat the /var/cache/apt/archives host cache mount
ARCH=$(dpkg --print-architecture)
TARBALL=/mnt/lima-provision/chromium-extensions.$ARCH.tar.gz

wait_ok() { # wait_ok <pid> <log> — fail provision with bg job log
  wait "$1" || {
    cat "$2" >&2
    exit 1
  }
}

apt_update() { apt-get update "${APTOPT[@]}"; }

selkies_deb() { # pinned 2.0.0rc0 (ubuntu26.04 debs); cache or fetch
  case "$ARCH" in
  amd64) DEB=selkies-2.0.0rc0-ubuntu26.04-amd64.deb ;;
  arm64) DEB=selkies-2.0.0rc0-ubuntu26.04-arm64.deb ;;
  esac
  [ -f "/mnt/lima-provision/$DEB" ] && return 0
  curl -fsSL --retry 5 --retry-all-errors -o "/tmp/$DEB" \
    "https://github.com/selkies-project/selkies/releases/download/2.0.0rc0/${DEB}"
  [ -w /mnt/lima-provision ] && cp "/tmp/$DEB" /mnt/lima-provision/ || true # cache for next recreate; mount may not be up yet
}

chromium_dl() { # ~198MB; tarball cache if present, else pip cloakbrowser
  if [ -f "$TARBALL" ]; then
    tar xzf "$TARBALL" -C / && touch /tmp/cb.ok /tmp/ext.ok
  else
    for _ in $( # pip3 arrives with the apt txn
      seq 1 300
    ); do
      command -v pip3 >/dev/null 2>&1 && break
      sleep 2
    done
    command -v pip3
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
  for _ in $(seq 1 120); do
    [ -x /usr/bin/unzip ] && break
    sleep 2
  done
  [ -x /usr/bin/unzip ]
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

LUSER=$(getent passwd | awk -F: '$6 ~ /^\/home\// {print $1; exit}') # lima user (uid 501 from macOS host, not 1000); avoids Go-template {{.User}} (unrendered on manual runs)
write_configs() {                                                    # all package-independent file writes; overlaps the apt transaction
  # no display manager: systemd units run Xorg dummy + xfce directly
  printf '[Unit]\nDescription=Xorg dummy :0\n[Service]\nExecStart=/usr/bin/Xorg :0 -noreset\nRestart=on-failure\n[Install]\nWantedBy=graphical.target\n' >/etc/systemd/system/xorg-dummy.service
  # shellcheck disable=SC1083
  printf '[Unit]\nDescription=xfce session on :0\nRequires=xorg-dummy.service\nAfter=xorg-dummy.service\n[Service]\nUser=%s\nPAMName=login\nEnvironment=DISPLAY=:0\nExecStart=/usr/bin/dbus-run-session -- /usr/bin/startxfce4\nRestart=on-failure\n[Install]\nWantedBy=graphical.target\n' "$LUSER" >/etc/systemd/system/xfce-session.service
  systemctl enable xorg-dummy xfce-session
  # localectl fails in cloud-init (located absent) — write XKB conf directly
  install -d /etc/X11/xorg.conf.d
  printf 'Section "InputClass"\n  Identifier "system-keyboard"\n  MatchIsKeyboard "on"\n  Option "XkbLayout" "fi"\nEndSection\n' >/etc/X11/xorg.conf.d/00-keyboard.conf
  sed -i 's/^XKBLAYOUT=.*/XKBLAYOUT="fi"/' /etc/default/keyboard
  # headless Xorg for selkies (video.display none = no virtio-gpu)
  printf 'Section "ServerLayout"\n  Identifier "layout"\n  Screen 0 "Screen0"\nEndSection\nSection "Device"\n  Identifier "dummy"\n  Driver "dummy"\n  VideoRam 32768\nEndSection\nSection "Monitor"\n  Identifier "monitor0"\n  HorizSync 5.0-1000.0\n  VertRefresh 5.0-200.0\nEndSection\nSection "Screen"\n  Identifier "Screen0"\n  Device "dummy"\n  Monitor "monitor0"\n  DefaultDepth 24\n  SubSection "Display"\n    Depth 24\n    Modes "2560x1440"\n    Virtual 2560 1440\n  EndSubSection\nEndSection\n' >/etc/X11/xorg.conf.d/10-dummy.conf
  # panel: stock default.xml from xfce4-panel pkg — no override needed
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

chromium_files() { # package-independent; needs chromium_dl + extensions_dl done
  for _ in $(seq 1 300); do
    [ -f /tmp/cb.ok ] && [ -f /tmp/ext.ok ] && break
    sleep 2
  done
  [ -f /tmp/cb.ok ] && [ -f /tmp/ext.ok ] || return 1
  # cloakbrowser pip pkg installs under /root — relocate
  if [ ! -x "$(find /opt/cloakbrowser -maxdepth 2 -name chrome -print -quit 2>/dev/null)" ] && [ -d /root/.cloakbrowser ]; then
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
  chown -R "$LUSER": /usr/local/share/extensions
  printf '#!/bin/sh\nexec %s --no-first-run --no-default-browser-check --load-extension=/usr/local/share/extensions/i-still-dont-care-about-cookies,/usr/local/share/extensions/ublock-origin-lite "$@"\n' "$CRBIN" >/usr/local/bin/chromium-wrapper
  chmod 755 /usr/local/bin/chromium-wrapper
  for n in chrome chromium chromium-browser; do ln -sf /usr/local/bin/chromium-wrapper /usr/local/bin/$n; done
  # .desktop + defaults
  install -d /usr/local/share/applications
  printf '[Desktop Entry]\nVersion=1.0\nName=Chromium\nGenericName=Web Browser\nExec=/usr/local/bin/chromium --no-first-run %%u\nTerminal=false\nType=Application\nIcon=chromium\nCategories=Network;WebBrowser;\nMimeType=x-scheme-handler/http;x-scheme-handler/https;\nStartupWMClass=Chromium\n' \
    >/usr/local/share/applications/chromium.desktop
  # snap-style duplicate name: chromium looks for it when deciding "is default"
  cp /usr/local/share/applications/chromium.desktop /usr/local/share/applications/chromium_chromium.desktop
  chmod 755 /usr/local/share/applications
  chmod 644 /usr/local/share/applications/chromium.desktop /usr/local/share/applications/chromium_chromium.desktop
  # startup page (managed policy)
  install -d /etc/chromium/policies/managed
  printf '{"RestoreOnStartup":4,"RestoreOnStartupURLs":["https://browserleaks.com/ip"]}\n' \
    >/etc/chromium/policies/managed/startup.json
  printf '[Default Applications]\nx-scheme-handler/http=chromium_chromium.desktop\nx-scheme-handler/https=chromium_chromium.desktop\n' >/etc/xdg/mimeapps.list
  # per-user default too (xfce/xdg reads it before root one settles; survives reboot)
  # shellcheck disable=SC1083
  UHOME=$(getent passwd "$LUSER" | cut -d: -f6)
  # shellcheck disable=SC1083
  install -d -o "$LUSER" -m 755 "$UHOME/.config"
  printf '[Default Applications]\nx-scheme-handler/http=chromium_chromium.desktop\nx-scheme-handler/https=chromium_chromium.desktop\nx-scheme-handler/chromium_chromium.desktop=chromium_chromium.desktop\n' >"$UHOME/.config/mimeapps.list"
  # shellcheck disable=SC1083
  chown "$LUSER": "$UHOME/.config/mimeapps.list"
}

apt_install_all() { # ONE dpkg transaction — dpkg lock serializes anyway
  local -a pkgs=(
    xserver-xorg-core xserver-xorg-video-dummy xserver-xorg-input-libinput
    xauth x11-xkb-utils xkb-data fontconfig fonts-dejavu-core
    python3-pip unzip socat libnspr4 libnss3
    xfce4 xfce4-terminal thunar mousepad ristretto dbus-x11
    pipewire pipewire-pulse wireplumber xubuntu-wallpapers
  )
  case "$ARCH" in
  amd64) DEB=selkies-2.0.0rc0-ubuntu26.04-amd64.deb ;;
  arm64) DEB=selkies-2.0.0rc0-ubuntu26.04-arm64.deb ;;
  esac
  if [ -f "/mnt/lima-provision/$DEB" ]; then
    DEBSRC="/mnt/lima-provision/$DEB"
  else
    DEBSRC="/tmp/$DEB"
  fi
  apt-get install -y --no-install-recommends "${APTOPT[@]}" "${pkgs[@]}" "$DEBSRC"
  dpkg --configure -a --force-unsafe-io --force-confold
  # post-install tweaks needing files from the transaction
  rm -f /etc/xdg/autostart/xfce4-power-manager.desktop \
    /etc/xdg/autostart/xscreensaver.desktop \
    /usr/share/xfce4/panel/plugins/power-manager-plugin.desktop
  update-alternatives --set x-session-manager /usr/bin/xfce4-session
  update-desktop-database /usr/local/share/applications || true
}

# apt deb cache mounts at /var/cache/apt/archives (lima-provision share).
# partial/ created by GUEST root: host-created dirs carry macOS provenance
# xattr → virtiofs surfaces as ACL → EACCES for apt as root.
install -d -m 755 /var/cache/apt/archives/partial

apt_update >/tmp/apt.log 2>&1 &
UP=$!
selkies_deb >/tmp/selkdeb.log 2>&1 &
SDB=$!
chromium_dl >/tmp/cb.log 2>&1 &
CB=$!
write_configs
wait_ok "$UP" /tmp/apt.log
wait_ok "$SDB" /tmp/selkdeb.log
apt_install_all           # installs pip3/unzip → below needs them
wait_ok "$CB" /tmp/cb.log # extract overlaps apt txn above; chromium_files needs cb.ok
extensions_dl >/tmp/ext.log 2>&1
chromium_files
systemctl set-default graphical.target
systemctl isolate graphical.target
# write chromium tarball cache when absent — survives recreate (atomic tmp+mv)
if [ -w /mnt/lima-provision ] && [ ! -f "$TARBALL" ]; then
  tar czf "$TARBALL.tmp" -C / opt/cloakbrowser usr/local/share/extensions &&
    mv "$TARBALL.tmp" "$TARBALL"
fi
touch /var/tmp/desktop.done
