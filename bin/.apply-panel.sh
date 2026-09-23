#!/bin/bash
export HOME=/home/asyrjasalo.guest
export XDG_RUNTIME_DIR=/run/user/501
export DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/501/bus
export DISPLAY=:0

set_kv() {
  local schema="$1" key="$2" value="$3"
  sudo -u asyrjasalo gsettings set "$schema" "$key" "$value" 2>&1 | sed "s|^|  $schema.$key |"
}

# global order: left-anchored first, then right-stuck in render order
set_kv org.mate.panel object-id-list "['menu-bar', 'separator', 'show-desktop', 'window-list', 'gvc', 'indicatorappletcomplete', 'notification-area', 'clock', 'workspace-switcher']"

set_kv org.mate.panel.object:/org/mate/panel/objects/clock/ relative-to-edge end
set_kv org.mate.panel.object:/org/mate/panel/objects/clock/ toplevel-id top
set_kv org.mate.panel.object:/org/mate/panel/objects/clock/ panel-right-stick true
set_kv org.mate.panel.object:/org/mate/panel/objects/gvc/ relative-to-edge end
set_kv org.mate.panel.object:/org/mate/panel/objects/gvc/ toplevel-id top
set_kv org.mate.panel.object:/org/mate/panel/objects/gvc/ panel-right-stick true
set_kv org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/ relative-to-edge end
set_kv org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/ toplevel-id top
set_kv org.mate.panel.object:/org/mate/panel/objects/indicatorappletcomplete/ panel-right-stick true
set_kv org.mate.panel.object:/org/mate/panel/objects/notification-area/ relative-to-edge end
set_kv org.mate.panel.object:/org/mate/panel/objects/notification-area/ toplevel-id top
set_kv org.mate.panel.object:/org/mate/panel/objects/notification-area/ panel-right-stick true
set_kv org.mate.panel.object:/org/mate/panel/objects/separator/ relative-to-edge start
set_kv org.mate.panel.object:/org/mate/panel/objects/separator/ toplevel-id top
set_kv org.mate.panel.object:/org/mate/panel/objects/separator/ panel-right-stick false
set_kv org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/ relative-to-edge end
set_kv org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/ toplevel-id bottom
set_kv org.mate.panel.object:/org/mate/panel/objects/workspace-switcher/ panel-right-stick true

echo "---verify---"
sudo -u asyrjasalo gsettings get org.mate.panel object-id-list
echo "---dconf dump---"
sudo -u asyrjasalo dconf dump /org/mate/panel/ | grep -A 2 workspace-switcher
