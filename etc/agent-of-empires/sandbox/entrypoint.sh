#!/bin/sh
# aoe-sandbox entrypoint
#
# Fixes two opencode acp quirks that fire when aoe runs the agent inside
# this container. Both are derived from /proc/self/mountinfo -- nothing is
# hardcoded.
#
# 1. opencode 1.17.11 calls realpath(cwd) during session/new and stores
#    the resolved path in opencode.db. aoe spawns opencode with --cwd
#    pointing at the host project path (e.g. /Users/foo/repo on macOS,
#    /home/foo/repo on Linux). Inside the container that path does not
#    exist, so opencode's fff + location services hang and the LLM loop
#    never fires. Create symlinks at every host-prefixed path already
#    recorded in opencode.db (and at any bind-mount source visible via
#    mountinfo) so realpath() resolves to the matching /workspace/<basename>.
#
# 2. opencode persists session.directory in its sqlite db. If that path
#    is a host prefix, session/load on resume boots location services on
#    a non-existent path. Rewrite any session.directory whose tail matches
#    a /workspace/<basename> basename to /workspace/<basename> (skip rows
#    already inside /workspace). Longest basename first so /myapp does
#    not shadow /my-app.

set -eu

db="/root/.local/share/opencode/opencode.db"

# Collect the set of /workspace/<basename> bind-mount basenames visible
# from /proc/self/mountinfo. Skip virtual / ephemeral filesystems.
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

# Longest-first ordering for basename match priority.
basenames_longest=$(
  printf '%s\n' "$basenames" |
    awk '{ print length, $0 }' |
    sort -rn |
    cut -d' ' -f2-
)

# A path recorded in opencode.db maps to /workspace/<basename> if its
# last path component matches a basename. Print the paths we need to
# symlink (excluding rows already on /workspace).
db_host_paths=$(
  if [ -f "$db" ] && command -v python3 >/dev/null 2>&1; then
    python3 - "$db" <<PY 2>/dev/null
import sqlite3, sys
db = sqlite3.connect(sys.argv[1])
seen = set()
for (d,) in db.execute("SELECT DISTINCT directory FROM session WHERE directory IS NOT NULL"):
    if not d.startswith("/") or d.startswith("/workspace/") or d in seen:
        continue
    seen.add(d)
    print(d)
PY
  fi
)

symlinks_created=0

# Source 1: bind-mount source from /proc/self/mountinfo (Linux bind mounts
# expose the source; virtiofs/Lima does not -- this loop is a no-op there).
while IFS= read -r line; do
  pre=${line%% - *}
  post=${line##* - }
  fstype=$(echo "$post" | awk '{print $1}')
  src=$(echo "$post" | awk '{print $2}')
  tgt=$(echo "$pre" | awk '{print $5}')
  case "$fstype" in
  fuse* | overlay* | proc | sysfs | tmpfs | cgroup* | devpts | mqueue | shm | squashfs | aufs | virtiofs) continue ;;
  esac
  case "$src" in /*) ;; *) continue ;; esac
  case "$tgt" in /workspace/*) ;; *) continue ;; esac
  [ -e "$src" ] && continue
  mkdir -p "$(dirname "$src")"
  ln -sfn "$tgt" "$src"
  symlinks_created=$((symlinks_created + 1))
done </proc/self/mountinfo

# Source 2: every host-prefixed path already recorded in opencode.db.
# aoe passes the host project path as --cwd; opencode resolves realpath()
# and the resolved path lands in session.directory. Pre-create the
# symlink so the very first session in a fresh container resolves
# correctly without waiting for the next entrypoint run.
if [ -n "$db_host_paths" ]; then
  while IFS= read -r host_path; do
    [ -z "$host_path" ] && continue
    [ -e "$host_path" ] && continue
    bn=$(basename "$host_path")
    target=""
    for candidate in $basenames_longest; do
      if [ "$candidate" = "$bn" ]; then
        target="/workspace/$candidate"
        break
      fi
    done
    [ -z "$target" ] && continue
    mkdir -p "$(dirname "$host_path")"
    ln -sfn "$target" "$host_path"
    symlinks_created=$((symlinks_created + 1))
  done <<EOF
$db_host_paths
EOF
fi

# Rewrite opencode.db: any session.directory whose tail matches a
# /workspace/<basename> basename and is not already on /workspace becomes
# /workspace/<basename>. Longest basename first so /myapp does not shadow
# /my-app.
db_rewrites=0
if [ -f "$db" ] && command -v python3 >/dev/null 2>&1; then
  db_rewrites=$(
    python3 - "$db" "$basenames_longest" <<'PY' 2>/dev/null || echo 0
import sqlite3, sys
db_path, basenames_blob = sys.argv[1], sys.argv[2]
basenames = [b for b in basenames_blob.splitlines() if b]
db = sqlite3.connect(db_path)
n = 0
for bn in basenames:
    new_dir = "/workspace/" + bn
    c = db.execute(
        "UPDATE session SET directory = ? "
        "WHERE directory LIKE ? AND directory != ?",
        (new_dir, "%/" + bn, new_dir),
    )
    n += c.rowcount
db.commit()
print(n)
PY
  )
fi

echo "aoe-sandbox entrypoint: bindmount_symlinks_created=$symlinks_created opencode_db_paths_rewritten=$db_rewrites"
exec "$@"
