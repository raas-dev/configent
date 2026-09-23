#!/bin/bash
# Apply MATE desktop defaults to the user's dconf via direct `gsettings set`
# calls over the user dbus. Each call is wrapped so a missing schema or
# relocatable path is a no-op, not a script-killer.
#
# Settings values copied verbatim from d3f3e90b (the known-good commit).
# ponytail: relocatable schemas (mate-terminal profile, mate-panel objects)
# bind via `schema:/path/` colon syntax. Paths come straight from the dconf
# dump.
#
# Usage: apply-gsettings.sh <luser>
set -euo pipefail
luser="${1:?luser required}"
uid="$(id -u "$luser")"
uhome="$(getent passwd "$luser" | cut -d: -f6)"

run() {
  sudo -u "$luser" env \
    HOME="$uhome" \
    XDG_RUNTIME_DIR="/run/user/$uid" \
    DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$uid/bus" \
    DISPLAY=:0 \
    "$@" 2>/dev/null || true
}

# === org.mate.Marco.general ===
run gsettings set org.mate.Marco.general compositing-manager false
run gsettings set org.mate.Marco.general theme 'ClearlooksRe'
run gsettings set org.mate.Marco.general titlebar-font 'Ubuntu Bold 10'

# === org.mate.NotificationDaemon ===
run gsettings set org.mate.NotificationDaemon do-not-disturb true
run gsettings set org.mate.NotificationDaemon sound-enabled false

# === org.mate.background ===
run gsettings set org.mate.background color-shading-type 'solid'
run gsettings set org.mate.background picture-filename '/usr/share/backgrounds/wallpaper-radioactive.jpg'
run gsettings set org.mate.background picture-options 'zoom'
run gsettings set org.mate.background primary-color '#3C3B37'
run gsettings set org.mate.background secondary-color '#3C3B37'

# === org.mate.background/desktop-backgrounds/0 ===
# relocatable: bound per id, but we skip — mate backgrounds seed this on first run.

# === org.mate.caja.desktop ===
run gsettings set org.mate.caja.desktop computer-icon-visible true
run gsettings set org.mate.caja.desktop font 'Ubuntu 10'
run gsettings set org.mate.caja.desktop home-icon-visible true
run gsettings set org.mate.caja.desktop trash-icon-visible true
run gsettings set org.mate.caja.desktop volumes-visible true

# === org.mate.caja.icon-view ===
run gsettings set org.mate.caja.icon-view default-use-tighter-layout false

# === org.mate.caja.list-view ===
run gsettings set org.mate.caja.list-view default-column-order \
  "['name', 'size', 'type', 'date_modified', 'date_accessed', 'date_created', 'extension', 'group', 'where', 'mime_type', 'octal_permissions', 'owner', 'permissions', 'selinux_context', 'size_on_disk']"
run gsettings set org.mate.caja.list-view default-visible-columns \
  "['name', 'size', 'type', 'date_modified']"

# === org.mate.caja.preferences ===
run gsettings set org.mate.caja.preferences default-sort-order 'type'
run gsettings set org.mate.caja.preferences show-backup-files true
run gsettings set org.mate.caja.preferences show-desktop-icons true
run gsettings set org.mate.caja.preferences sort-directories-first true

# === org.mate.accessibility.keyboard ===
run gsettings set org.mate.accessibility-keyboard bouncekeys-beep-reject true
run gsettings set org.mate.accessibility-keyboard bouncekeys-delay 300
run gsettings set org.mate.accessibility-keyboard bouncekeys-enable false
run gsettings set org.mate.accessibility-keyboard enable false
run gsettings set org.mate.accessibility-keyboard feature-state-change-beep false
run gsettings set org.mate.accessibility-keyboard mousekeys-accel-time 1200
run gsettings set org.mate.accessibility-keyboard mousekeys-enable false
run gsettings set org.mate.accessibility-keyboard mousekeys-init-delay 160
run gsettings set org.mate.accessibility-keyboard mousekeys-max-speed 750
run gsettings set org.mate.accessibility-keyboard slowkeys-beep-accept true
run gsettings set org.mate.accessibility-keyboard slowkeys-beep-press true
run gsettings set org.mate.accessibility-keyboard slowkeys-beep-reject false
run gsettings set org.mate.accessibility-keyboard slowkeys-delay 300
run gsettings set org.mate.accessibility-keyboard slowkeys-enable false
run gsettings set org.mate.accessibility-keyboard stickykeys-enable false
run gsettings set org.mate.accessibility-keyboard stickykeys-latch-to-lock true
run gsettings set org.mate.accessibility-keyboard stickykeys-modifier-beep true
run gsettings set org.mate.accessibility-keyboard stickykeys-two-key-off true
run gsettings set org.mate.accessibility-keyboard timeout 120
run gsettings set org.mate.accessibility-keyboard timeout-enable false
run gsettings set org.mate.accessibility-keyboard togglekeys-enable false

# === org.gnome.desktop.applications.terminal (mate aliases via gnome) ===
run gsettings set org.gnome.desktop.default-applications.terminal exec 'mate-terminal'

# === org.mate.desktop.background (mate alias of org.gnome.desktop.background) ===
run gsettings set org.gnome.desktop.background color-shading-type 'solid'
run gsettings set org.gnome.desktop.background picture-filename '/usr/share/backgrounds/wallpaper-radioactive.jpg'
run gsettings set org.gnome.desktop.background picture-options 'zoom'
run gsettings set org.gnome.desktop.background primary-color 'rgb(60,59,55)'
run gsettings set org.gnome.desktop.background secondary-color 'rgb(60,59,55)'

# === org.mate.font-rendering ===
run gsettings set org.mate.font-rendering antialiasing 'rgba'
run gsettings set org.mate.font-rendering dpi 120.0
run gsettings set org.mate.font-rendering hinting 'slight'

# === org.mate.interface ===
run gsettings set org.mate.interface document-font-name 'Ubuntu 10'
run gsettings set org.mate.interface font-name 'Ubuntu 10'
run gsettings set org.mate.interface gtk-color-scheme 'tooltip_fg_color:#f7f7f7\ntooltip_bg_color:#353535'
run gsettings set org.mate.interface gtk-decoration-layout ':minimize,maximize,close'
run gsettings set org.mate.interface gtk-enable-primary-paste false
run gsettings set org.mate.interface gtk-theme 'Yaru-olive-dark'
run gsettings set org.mate.interface icon-theme 'Yaru-olive-dark'
run gsettings set org.mate.interface monospace-font-name 'Terminess Nerd Font Mono Bold 11'
run gsettings set org.mate.interface window-scaling-factor 1

# === org.mate.media-handling ===
run gsettings set org.mate.media-handling automount-open false

# === org.mate.peripherals.keyboard ===
run gsettings set org.mate.peripherals.keyboard bell-mode 'off'

# === org.mate.peripherals.mouse ===
run gsettings set org.mate.peripherals.mouse accel-profile 'default'
run gsettings set org.mate.peripherals.mouse cursor-theme 'Yaru'
run gsettings set org.mate.peripherals.mouse middle-button-enabled false

# === org.mate.session ===
# session-start is ephemeral, skip.

# === org.gnome.desktop.sound (mate alias) ===
run gsettings set org.gnome.desktop.sound event-sounds true
run gsettings set org.gnome.desktop.sound input-feedback-sounds false
run gsettings set org.gnome.desktop.sound theme-name '__no_sounds'

# === org.mate.marco.general (duplicate of org.mate.Marco.general) ===
run gsettings set org.mate.Marco.general action-double-click-titlebar 'toggle_maximize'
run gsettings set org.mate.Marco.general button-layout ':minimize,maximize,close'

# === org.mate.notification-daemon (hyphenated alias) ===
run gsettings set org.mate.NotificationDaemon do-not-disturb true
run gsettings set org.mate.NotificationDaemon sound-enabled false

# === org.mate.panel (mounted at /org/mate/panel/general/ in dconf, flat in gsettings) ===
run gsettings set org.mate.panel default-layout 'ubuntu-mate'
run gsettings set org.mate.panel object-id-list \
  "['menu-bar', 'clock', 'notification-area', 'indicatorappletcomplete', 'show-desktop', 'window-list', 'gvc', 'separator', 'workspace-switcher']"
run gsettings set org.mate.panel toplevel-id-list "['top', 'bottom']"

# === org.mate.panel.object (relocatable per applet) ===
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" applet-iid 'ClockAppletFactory::ClockApplet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" locked true
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" object-type 'applet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" relative-to-edge 'end'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" toplevel-id 'top'

run gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/" custom-format '%a %d %b  %H:%M:%S'
run gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/" format 'custom'
run gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/" show-date true
run gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/" show-seconds true

run gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" applet-iid 'GvcAppletFactory::GvcApplet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" locked true
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" object-type 'applet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" relative-to-edge 'end'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" toplevel-id 'top'

run gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" applet-iid 'IndicatorAppletCompleteFactory::IndicatorAppletComplete'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" locked true
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" object-type 'applet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" relative-to-edge 'end'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" toplevel-id 'top'

run gsettings set "org.mate.panel.object:/org/mate/panel/objects/menu-bar/" locked true
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/menu-bar/" object-type 'menu-bar'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/menu-bar/" toplevel-id 'top'

run gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" applet-iid 'NotificationAreaAppletFactory::NotificationArea'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" locked true
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" object-type 'applet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" relative-to-edge 'end'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" toplevel-id 'top'

run gsettings set "org.mate.panel.object:/org/mate/panel/objects/separator/" locked true
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/separator/" object-type 'separator'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/separator/" relative-to-edge 'end'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/separator/" toplevel-id 'top'

run gsettings set "org.mate.panel.object:/org/mate/panel/objects/show-desktop/" applet-iid 'WnckletFactory::ShowDesktopApplet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/show-desktop/" locked true
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/show-desktop/" object-type 'applet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/show-desktop/" toplevel-id 'bottom'

run gsettings set "org.mate.panel.object:/org/mate/panel/objects/window-list/" applet-iid 'WnckletFactory::WindowListApplet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/window-list/" locked true
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/window-list/" object-type 'applet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/window-list/" toplevel-id 'bottom'

run gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" applet-iid 'WnckletFactory::WorkspaceSwitcherApplet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" locked true
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" object-type 'applet'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" relative-to-edge 'end'
run gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" toplevel-id 'bottom'

# === org.mate.panel.toplevel (relocatable per panel id) ===
run gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/bottom/" auto-hide false
run gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/bottom/" orientation 'bottom'
run gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/bottom/" screen 0
run gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/bottom/" y-bottom 0

run gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/top/" auto-hide false
run gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/top/" orientation 'top'
run gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/top/" screen 0

# === org.mate.peripherals-keyboard-xkb.general ===
run gsettings set org.mate.peripherals-keyboard-xkb general default-group 0
run gsettings set org.mate.peripherals-keyboard-xkb general disable-indicator false
run gsettings set org.mate.peripherals-keyboard-xkb general handle-indicators true
run gsettings set org.mate.peripherals-keyboard-xkb general known-file-list \
  "['fi', 'us']"

# === org.mate.peripherals-keyboard (hyphen alias) ===
run gsettings set org.mate.peripherals.keyboard bell-mode 'off'

# === org.mate.pluma ===
run gsettings set org.mate.pluma color-scheme 'Yaru-dark'

# === org.mate.power-manager ===
run gsettings set org.mate.power-manager button-power 'nothing'
run gsettings set org.mate.power-manager button-suspend 'nothing'
run gsettings set org.mate.power-manager icon-policy 'never'
run gsettings set org.mate.power-manager sleep-display-ac 0

# === org.mate.screensaver ===
run gsettings set org.mate.screensaver delay 0
run gsettings set org.mate.screensaver idle-activation-enabled false
run gsettings set org.mate.screensaver lock-enabled false
run gsettings set org.mate.screensaver mode 'blank-only'
run gsettings set org.mate.screensaver picture-filename '/usr/share/backgrounds/mate/desktop/Stripes.png'
run gsettings set org.mate.screensaver themes "@as []"

# === org.mate.settings-daemon.plugins.* ===
run gsettings set org.mate.settings-daemon.plugins.a11y-keyboard active true
run gsettings set org.mate.settings-daemon.plugins.a11y-settings active true
run gsettings set org.mate.settings-daemon.plugins.background active true
run gsettings set org.mate.settings-daemon.plugins.clipboard active true
run gsettings set org.mate.settings-daemon.plugins.keyboard active true
run gsettings set org.mate.settings-daemon.plugins.media-keys active true
run gsettings set org.mate.settings-daemon.plugins.mouse active true
run gsettings set org.mate.settings-daemon.plugins.sound active true
run gsettings set org.mate.settings-daemon.plugins.typing-break active true
run gsettings set org.mate.settings-daemon.plugins.xsettings active true
run gsettings set org.mate.settings-daemon.plugins.xrandr active true
run gsettings set org.mate.settings-daemon.plugins.xrandr show-notification-icon false

# === org.mate.slick-greeter ===
run gsettings set org.mate.slick-greeter logo ''
run gsettings set org.mate.slick-greeter other-monitors-logo ''
run gsettings set org.mate.slick-greeter play-ready-sound false

# === org.mate.sound ===
run gsettings set org.mate.sound event-sounds false
run gsettings set org.mate.sound input-feedback-sounds false
run gsettings set org.mate.sound theme-name '__custom'

# === org.mate.terminal.profile (relocatable, bound to built-in 'default' profile) ===
PROFILE_PATH=/org/mate/terminal/profiles/default/
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" allow-bold true
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" background-color '#000000000000'
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" bold-color '#000000000000'
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" copy-selection true
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" cursor-blink-mode 'on'
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" cursor-shape 'ibeam'
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" default-size-columns 120
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" default-size-rows 35
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" font 'Terminess Nerd Font Mono 11'
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" foreground-color '#AAAAAAAAAAAA'
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" palette \
  "'#000000000000:#CCCC00000000:#4E4D9A9A0605:#C4C3A0A00000:#34346564A4A3:#7575504F7B7B:#060598979A9A:#D3D3D7D6CFCF:#555457565352:#EFEF29282928:#8A89E2E23434:#FCFBE9E84F4F:#72729F9ECFCF:#ADAC7F7EA8A8:#3434E2E2E2E2:#EEEDEEEDECEB'"
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" scheme 'gray-on-black'
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" scrollback-unlimited true
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" silent-bell true
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" use-custom-default-size true
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" use-system-font false
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" use-theme-colors false
run gsettings set "org.mate.terminal.profile:$PROFILE_PATH" visible-name 'Default'

# Make 'default' the active profile.
run gsettings set org.mate.terminal.global default-profile 'default'
run gsettings set org.mate.terminal.global profile-list "['default']"

# === org.gnome.desktop.interface (mate aliases gtk clocks here too) ===
run gsettings set org.gnome.desktop.interface clock-show-date true
run gsettings set org.gnome.desktop.interface clock-show-seconds true
run gsettings set org.gnome.desktop.interface color-scheme 'default'
run gsettings set org.gnome.desktop.interface document-font-name 'Ubuntu 10'
run gsettings set org.gnome.desktop.interface font-name 'Ubuntu 10'
run gsettings set org.gnome.desktop.interface monospace-font-name 'Terminess Nerd Font Mono 11'
run gsettings set org.gnome.desktop.interface toolkit-accessibility true

# === org.gnome.desktop.sound ===
run gsettings set org.gnome.desktop.sound event-sounds false
run gsettings set org.gnome.desktop.sound input-feedback-sounds false
run gsettings set org.gnome.desktop.sound theme-name '__custom'
