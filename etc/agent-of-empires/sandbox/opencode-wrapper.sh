#!/bin/sh
# opencode wrapper used by aoe-sandbox.
#
# Sits at /root/.opencode/bin/opencode. Intercepts session/new and
# session/load JSON-RPC frames from aoe and rewrites any cwd pointing
# at a host project path (e.g. /Users/foo/repo on macOS,
# /home/foo/repo on Linux) to the matching /workspace/<basename>
# bind-mount target. The real opencode binary then sees a cwd that
# exists inside the container and boots location services correctly.
#
# Forwards all other frames untouched. Reads stdin from aoe, writes
# stdout back to aoe; reads stdin from the real binary, writes stdout
# to aoe.

exec /usr/bin/env python3 /aoe-sandbox-bin/opencode-wrapper.py "$@"
