#!/bin/sh
# opencode wrapper used by aoe-sandbox.
#
# aoe invokes `opencode acp` by name. Before exec'ing the real binary,
# scan /root/.local/share/opencode/opencode.db for any host-prefixed
# session.directory whose basename matches a /workspace/<basename>
# bind-mount and create a symlink at that host path -> /workspace/<basename>.
# Without this, opencode 1.17.11's realpath(cwd) resolves to a host path
# that does not exist inside the container and the LLM loop hangs before
# emitting any text.

set -eu

# Find /workspace/<basename> bind mounts visible from /proc/self/mountinfo.
basenames=$(
  awk '
        / - / {
            split($0, parts, " - ")
            tgt = parts[1]
            n = split(tgt, f, " ")
            if (f[5] ~ "^/workspace/") {
                bn = f[5]
                sub(".*/", "", bn)
                if (bn != "") print bn
            }
        }
    ' /proc/self/mountinfo | sort -u
)
basenames_longest=$(
  printf '%s\n' "$basenames" |
    awk '{ print length, $0 }' |
    sort -rn |
    cut -d' ' -f2-
)

# For each distinct host-prefixed directory in opencode.db, ensure a
# symlink exists at that path -> /workspace/<basename>.
db="/root/.local/share/opencode/opencode.db"
if [ -f "$db" ] && command -v python3 >/dev/null 2>&1; then
  python3 - "$db" "$basenames_longest" <<'PY' 2>/dev/null
import os, sqlite3, sys
db_path, basenames_blob = sys.argv[1], sys.argv[2]
basenames = [b for b in basenames_blob.splitlines() if b]
db = sqlite3.connect(db_path)
seen = set()
for (d,) in db.execute("SELECT DISTINCT directory FROM session WHERE directory IS NOT NULL"):
    if not d.startswith("/") or d.startswith("/workspace/") or d in seen:
        continue
    seen.add(d)
    bn = os.path.basename(d)
    if bn not in basenames:
        continue
    if os.path.lexists(d):
        continue
    parent = os.path.dirname(d)
    if parent:
        os.makedirs(parent, exist_ok=True)
    try:
        os.symlink("/workspace/" + bn, d)
    except OSError:
        pass
PY
fi

exec /root/.opencode/bin/opencode-real "$@"
