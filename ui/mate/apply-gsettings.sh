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
uid="$(id -u "${1:?luser required}")"
uhome="$(getent passwd "$1" | cut -d: -f6)"

export HOME="$uhome"
export XDG_RUNTIME_DIR="/run/user/$uid"
export DBUS_SESSION_BUS_ADDRESS="unix:path=/run/user/$uid/bus"
export DISPLAY=:0

# === org.mate.Marco.general ===
gsettings set org.mate.Marco.general compositing-manager false
gsettings set org.mate.Marco.general theme 'ClearlooksRe'
gsettings set org.mate.Marco.general titlebar-font 'Ubuntu Bold 10'

# === org.mate.NotificationDaemon ===
gsettings set org.mate.NotificationDaemon do-not-disturb true
gsettings set org.mate.NotificationDaemon sound-enabled false

# === org.mate.background ===
gsettings set org.mate.background color-shading-type 'solid'
gsettings set org.mate.background picture-filename '/usr/share/backgrounds/ubuntu-mate-common/Ubuntu-MATE-Splash.jpg'
gsettings set org.mate.background picture-options 'zoom'
gsettings set org.mate.background primary-color '#000000'
gsettings set org.mate.background secondary-color '#000000'

# === org.mate.background/desktop-backgrounds/0 ===
# relocatable: bound per id, but we skip — mate backgrounds seed this on first run.

# === org.mate.caja.desktop ===
gsettings set org.mate.caja.desktop computer-icon-visible true
gsettings set org.mate.caja.desktop font 'Ubuntu 10'
gsettings set org.mate.caja.desktop home-icon-visible true
gsettings set org.mate.caja.desktop trash-icon-visible true
gsettings set org.mate.caja.desktop volumes-visible true

# === org.mate.caja.icon-view ===
gsettings set org.mate.caja.icon-view default-use-tighter-layout false

# === org.mate.caja.list-view ===
gsettings set org.mate.caja.list-view default-column-order \
  "['name', 'size', 'type', 'date_modified', 'date_accessed', 'date_created', 'extension', 'group', 'where', 'mime_type', 'octal_permissions', 'owner', 'permissions', 'selinux_context', 'size_on_disk']"
gsettings set org.mate.caja.list-view default-visible-columns \
  "['name', 'size', 'type', 'date_modified']"

# === org.mate.caja.preferences ===
gsettings set org.mate.caja.preferences default-sort-order 'type'
gsettings set org.mate.caja.preferences show-backup-files true
gsettings set org.mate.caja.preferences sort-directories-first true

# === org.mate.accessibility.keyboard ===
gsettings set org.mate.accessibility-keyboard bouncekeys-beep-reject true
gsettings set org.mate.accessibility-keyboard bouncekeys-delay 300
gsettings set org.mate.accessibility-keyboard bouncekeys-enable false
gsettings set org.mate.accessibility-keyboard enable false
gsettings set org.mate.accessibility-keyboard feature-state-change-beep false
gsettings set org.mate.accessibility-keyboard mousekeys-accel-time 1200
gsettings set org.mate.accessibility-keyboard mousekeys-enable false
gsettings set org.mate.accessibility-keyboard mousekeys-init-delay 160
gsettings set org.mate.accessibility-keyboard mousekeys-max-speed 750
gsettings set org.mate.accessibility-keyboard slowkeys-beep-accept true
gsettings set org.mate.accessibility-keyboard slowkeys-beep-press true
gsettings set org.mate.accessibility-keyboard slowkeys-beep-reject false
gsettings set org.mate.accessibility-keyboard slowkeys-delay 300
gsettings set org.mate.accessibility-keyboard slowkeys-enable false
gsettings set org.mate.accessibility-keyboard stickykeys-enable false
gsettings set org.mate.accessibility-keyboard stickykeys-latch-to-lock true
gsettings set org.mate.accessibility-keyboard stickykeys-modifier-beep true
gsettings set org.mate.accessibility-keyboard stickykeys-two-key-off true
gsettings set org.mate.accessibility-keyboard timeout 120
gsettings set org.mate.accessibility-keyboard timeout-enable false
gsettings set org.mate.accessibility-keyboard togglekeys-enable false

# === org.gnome.desktop.applications.terminal (mate aliases via gnome) ===
gsettings set org.gnome.desktop.default-applications.terminal exec 'mate-terminal'

# === org.mate.desktop.background (mate alias of org.gnome.desktop.background) ===
gsettings set org.mate.background color-shading-type 'solid'
gsettings set org.mate.background picture-options 'zoom'
gsettings set org.mate.background primary-color 'rgb(0,0,0)'
gsettings set org.mate.background secondary-color 'rgb(0,0,0)'

# === org.mate.font-rendering ===
gsettings set org.mate.font-rendering antialiasing 'rgba'
gsettings set org.mate.font-rendering hinting 'full'

# === org.mate.interface ===
gsettings set org.mate.interface document-font-name 'Ubuntu 10'
gsettings set org.mate.interface font-name 'Ubuntu 10'
gsettings set org.mate.interface gtk-color-scheme 'tooltip_fg_color:#f7f7f7\ntooltip_bg_color:#353535'
gsettings set org.mate.interface gtk-decoration-layout ':minimize,maximize,close'
gsettings set org.mate.interface gtk-enable-primary-paste false
gsettings set org.mate.interface gtk-theme 'Yaru-olive-dark'
gsettings set org.mate.interface icon-theme 'Yaru-olive'
gsettings set org.mate.interface monospace-font-name 'Terminess Nerd Font Bold 11'
gsettings set org.mate.interface window-scaling-factor 1

# === org.mate.media-handling ===
gsettings set org.mate.media-handling automount-open false

# === org.mate.peripherals.keyboard ===

# === org.mate.peripherals.mouse ===

# === org.mate.session ===
# session-start is ephemeral, skip.

# === org.gnome.desktop.sound (mate alias) ===
gsettings set org.gnome.desktop.sound event-sounds true
gsettings set org.gnome.desktop.sound input-feedback-sounds false
gsettings set org.gnome.desktop.sound theme-name '__no_sounds'

# === org.mate.marco.general (duplicate of org.mate.Marco.general) ===
gsettings set org.mate.Marco.general action-double-click-titlebar 'toggle_maximize'
gsettings set org.mate.Marco.general button-layout ':minimize,maximize,close'

# === org.mate.notification-daemon (hyphenated alias) ===
gsettings set org.mate.NotificationDaemon do-not-disturb true
gsettings set org.mate.NotificationDaemon sound-enabled false

# === org.mate.panel (mounted at /org/mate/panel/general/ in dconf, flat in gsettings) ===
# Prune orphan objects not in the canonical list (e.g. briskmenu, firefox applet
# inherited from the ubuntu-mate profile) so mate-panel stops trying to load
# factories whose .so is absent. Done via dconf because the relocatable object
# schema lacks a generic "delete" gsettings call.
canon="menu-bar separator show-desktop window-list gvc indicatorappletcomplete notification-area clock workspace-switcher"
pruned=0
for obj in $(dconf list /org/mate/panel/objects/ 2>/dev/null | tr -d /); do
  if ! printf '%s\n' "$canon" | grep -Fxq -- "$obj"; then
    dconf reset -f "/org/mate/panel/objects/$obj/" 2>/dev/null || true
    pruned=$((pruned + 1))
  fi
done
# Also nuke stale toplevel rows (anything other than the canonical top/bottom)
# so the panel layout resets cleanly without orphan bars.
for tid in $(dconf list /org/mate/panel/toplevels/ 2>/dev/null | tr -d /); do
  case " $tid " in
  " top " | " bottom ") ;;
  *) dconf reset -f "/org/mate/panel/toplevels/$tid/" 2>/dev/null || true ;;
  esac
done
# default-layout points at /usr/share/mate-panel/layouts/<name>.layout.
# ubuntu-mate.layout has briskmenu baked in and re-creates the object on
# every mate-panel restart even when object-id-list excludes it. Use
# 'default' (no briskmenu). ponytail: revisit if we ever want a richer
# distro-specific panel layout.
gsettings set org.mate.panel default-layout 'default'
gsettings set org.mate.panel object-id-list \
  "['clock', 'gvc', 'indicatorappletcomplete', 'menu-bar', 'notification-area', 'separator', 'show-desktop', 'window-list', 'workspace-switcher']"
gsettings set org.mate.panel toplevel-id-list "['top', 'bottom']"

# === org.mate.panel.object (relocatable per applet) ===
gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" applet-iid 'ClockAppletFactory::ClockApplet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" locked true
gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" object-type 'applet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" position 20
gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" relative-to-edge 'end'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" toplevel-id 'top'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/clock/" panel-right-stick true

gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/" custom-format '%a %d %b  %H:%M:%S'
gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/" format 'custom'
gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/" show-date true
gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/" show-seconds true

gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/prefs/" custom-format '%a %d %b  %H:%M:%S'
gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/prefs/" format 'custom'
gsettings set "org.mate.panel.applet.clock:/org/mate/panel/objects/clock/prefs/" show-seconds true

gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" applet-iid 'GvcAppletFactory::GvcApplet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" locked true
gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" object-type 'applet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" position 40
gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" relative-to-edge 'end'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" toplevel-id 'top'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/gvc/" panel-right-stick true

gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" applet-iid 'IndicatorAppletCompleteFactory::IndicatorAppletComplete'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" locked true
gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" object-type 'applet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" position 30
gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" relative-to-edge 'end'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" toplevel-id 'top'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/" panel-right-stick true

gsettings set "org.mate.panel.object:/org/mate/panel/objects/menu-bar/" locked true
gsettings set "org.mate.panel.object:/org/mate/panel/objects/menu-bar/" object-type 'menu-bar'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/menu-bar/" position 10
gsettings set "org.mate.panel.object:/org/mate/panel/objects/menu-bar/" toplevel-id 'top'

gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" applet-iid 'NotificationAreaAppletFactory::NotificationArea'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" locked true
gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" object-type 'applet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" position 10
gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" relative-to-edge 'end'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" toplevel-id 'top'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/notification-area/" panel-right-stick true

gsettings set "org.mate.panel.object:/org/mate/panel/objects/show-desktop/" applet-iid 'WnckletFactory::ShowDesktopApplet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/show-desktop/" locked true
gsettings set "org.mate.panel.object:/org/mate/panel/objects/show-desktop/" object-type 'applet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/show-desktop/" position 10
gsettings set "org.mate.panel.object:/org/mate/panel/objects/show-desktop/" toplevel-id 'bottom'

gsettings set "org.mate.panel.object:/org/mate/panel/objects/window-list/" applet-iid 'WnckletFactory::WindowListApplet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/window-list/" locked true
gsettings set "org.mate.panel.object:/org/mate/panel/objects/window-list/" object-type 'applet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/window-list/" position 20
gsettings set "org.mate.panel.object:/org/mate/panel/objects/window-list/" toplevel-id 'bottom'

gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" applet-iid 'WnckletFactory::WorkspaceSwitcherApplet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" locked true
gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" object-type 'applet'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" position 10
gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" relative-to-edge 'end'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" toplevel-id 'bottom'
gsettings set "org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/" panel-right-stick true

# === org.mate.panel.toplevel (relocatable per panel id) ===
# Per-panel size/position. mate-panel derives rendered content from
# `org.mate.panel object-id-list` filtered by each object's `toplevel-id`.
gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/top/" auto-hide false
gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/top/" orientation 'top'
gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/top/" screen 0
gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/top/" size 32

gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/bottom/" auto-hide false
gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/bottom/" orientation 'bottom'
gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/bottom/" screen 0
gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/bottom/" y-bottom 0
gsettings set "org.mate.panel.toplevel:/org/mate/panel/toplevels/bottom/" size 32

# === org.mate.peripherals-keyboard-xkb.general ===
gsettings set org.mate.peripherals-keyboard-xkb.general default-group 0
gsettings set org.mate.peripherals-keyboard-xkb.general disable-indicator false
gsettings set org.mate.peripherals-keyboard-xkb.general handle-indicators true
gsettings set org.mate.peripherals-keyboard-xkb.general known-file-list \
  "['fi', 'us']"

# === org.mate.peripherals-keyboard (hyphen alias) ===

# === org.mate.pluma ===

# === org.mate.power-manager ===
gsettings set org.mate.power-manager button-power 'nothing'
gsettings set org.mate.power-manager button-suspend 'nothing'
gsettings set org.mate.power-manager icon-policy 'never'
gsettings set org.mate.power-manager sleep-display-ac 0

# === org.mate.screensaver ===
gsettings set org.mate.screensaver idle-activation-enabled false
gsettings set org.mate.screensaver lock-enabled false
gsettings set org.mate.screensaver mode 'blank-only'
gsettings set org.mate.screensaver picture-filename '/usr/share/backgrounds/mate/desktop/Stripes.png'
gsettings set org.mate.screensaver themes "@as []"

# === org.mate.slick-greeter ===

# === org.mate.sound ===
gsettings set org.mate.sound event-sounds false
gsettings set org.mate.sound input-feedback-sounds false
gsettings set org.mate.sound theme-name '__custom'

# === org.mate.terminal.profile (relocatable, bound to built-in 'default' profile) ===
PROFILE_PATH=/org/mate/terminal/profiles/default/
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" allow-bold true
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" background-color '#000000000000'
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" bold-color '#000000000000'
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" copy-selection true
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" cursor-blink-mode 'on'
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" cursor-shape 'ibeam'
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" default-size-columns 120
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" default-size-rows 35
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" font 'Terminess Nerd Font 11'
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" foreground-color '#AAAAAAAAAAAA'
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" palette \
  "'#000000000000:#CCCC00000000:#4E4D9A9A0605:#C4C3A0A00000:#34346564A4A3:#7575504F7B7B:#060598979A9A:#D3D3D7D6CFCF:#555457565352:#EFEF29282928:#8A89E2E23434:#FCFBE9E84F4F:#72729F9ECFCF:#ADAC7F7EA8A8:#3434E2E2E2E2:#EEEDEEEDECEB'"
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" scrollback-unlimited true
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" silent-bell true
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" use-custom-default-size true
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" use-system-font false
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" use-theme-colors false
gsettings set "org.mate.terminal.profile:$PROFILE_PATH" visible-name 'Default'

# Make 'default' the active profile.
gsettings set org.mate.terminal.global default-profile 'default'
gsettings set org.mate.terminal.global profile-list "['default']"

# === org.gnome.desktop.interface (mate aliases gtk clocks here too) ===
gsettings set org.gnome.desktop.interface clock-show-date true
gsettings set org.gnome.desktop.interface clock-show-seconds true
gsettings set org.gnome.desktop.interface color-scheme 'default'
gsettings set org.gnome.desktop.interface document-font-name 'Ubuntu 10'
gsettings set org.gnome.desktop.interface font-name 'Ubuntu 10'
gsettings set org.gnome.desktop.interface monospace-font-name 'Terminess Nerd Font 11'
gsettings set org.gnome.desktop.interface toolkit-accessibility true

# === org.gnome.desktop.sound ===
gsettings set org.gnome.desktop.sound event-sounds false
gsettings set org.gnome.desktop.sound input-feedback-sounds false
gsettings set org.gnome.desktop.sound theme-name '__custom'

# Force live mate-panel to re-read dconf. A running panel keeps its in-RAM
# applet list/size from when it started, so the freshly-applied settings
# (size=32, default-layout=default, object-id-list=...) only take effect on
# the next start. `mate-panel --replace` is the documented MATE reload path:
# the new binary XEmbed-swaps into the running panel, the old one exits
# cleanly. Backgrounded in a subshell so the script returns immediately
# instead of tracking the long-lived panel.
if pgrep -u "$uid" -x mate-panel >/dev/null 2>&1; then
  (mate-panel --replace >/dev/null 2>&1 &)
fi
