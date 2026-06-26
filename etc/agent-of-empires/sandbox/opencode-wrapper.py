#!/usr/bin/env python3
"""stdio proxy: sits between aoe and the real opencode binary.

aoe sends session/new (and session/load) with cwd = the host project
path (e.g. /Users/foo/repo on macOS). That path does not exist inside
the container, so opencode's fff/location services hang and the LLM
loop never fires. Rewrite cwd -> /workspace/<basename> before
forwarding to the real opencode so it boots cleanly.

This is a minimal JSON-RPC frame proxy: one line in, one line out,
cwd rewrite on session/new and session/load. Everything else passes
through untouched.
"""
import json
import os
import subprocess
import sys


def rewrite_cwd(cwd):
    """Map any host-prefixed cwd whose basename matches a /workspace/<bn>
    mount to /workspace/<bn>. /workspace/<bn> is left as-is."""
    if not isinstance(cwd, str) or not cwd.startswith("/"):
        return cwd
    if cwd.startswith("/workspace/"):
        return cwd
    # collect /workspace/* bind basenames from mountinfo
    basenames = []
    try:
        with open("/proc/self/mountinfo") as fh:
            for line in fh:
                if " - " not in line:
                    continue
                pre = line.split(" - ", 1)[0]
                tgt = pre.split()[4] if len(pre.split()) >= 5 else ""
                if tgt.startswith("/workspace/"):
                    bn = os.path.basename(tgt.rstrip("/"))
                    if bn and bn not in basenames:
                        basenames.append(bn)
    except OSError:
        pass
    basenames.sort(key=len, reverse=True)
    bn = os.path.basename(cwd.rstrip("/"))
    if bn in basenames:
        return "/workspace/" + bn
    return cwd


def main():
    real = "/root/.opencode/bin/opencode-real"
    proc = subprocess.Popen(
        [real] + sys.argv[1:],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=sys.stderr,
        bufsize=0,
    )

    def write_to_real(obj):
        line = (json.dumps(obj, separators=(",", ":")) + "\n").encode("utf-8")
        proc.stdin.write(line)
        proc.stdin.flush()

    def write_to_aoe(obj):
        line = (json.dumps(obj, separators=(",", ":")) + "\n").encode("utf-8")
        sys.stdout.buffer.write(line)
        sys.stdout.buffer.flush()

    # Forward stdin from aoe -> opencode-real, rewriting cwd on
    # session/new and session/load.
    def stdin_to_real():
        try:
            for raw in sys.stdin.buffer:
                line = raw.decode("utf-8", errors="replace").strip()
                if not line:
                    continue
                try:
                    obj = json.loads(line)
                except json.JSONDecodeError:
                    proc.stdin.write(raw)
                    proc.stdin.flush()
                    continue
                method = obj.get("method")
                params = obj.get("params")
                if method in ("session/new", "session/load") and isinstance(params, dict):
                    cwd = params.get("cwd")
                    if cwd is not None:
                        new_cwd = rewrite_cwd(cwd)
                        if new_cwd != cwd:
                            params["cwd"] = new_cwd
                write_to_real(obj)
        except (BrokenPipeError, OSError):
            pass
        finally:
            try:
                proc.stdin.close()
            except Exception:
                pass

    # Forward stdout from opencode-real -> aoe unchanged.
    def stdout_to_aoe():
        try:
            while True:
                chunk = proc.stdout.readline()
                if not chunk:
                    break
                sys.stdout.buffer.write(chunk)
                sys.stdout.buffer.flush()
        except (BrokenPipeError, OSError):
            pass

    import threading
    t_in = threading.Thread(target=stdin_to_real, daemon=True)
    t_out = threading.Thread(target=stdout_to_aoe, daemon=True)
    t_in.start()
    t_out.start()
    rc = proc.wait()
    t_out.join(timeout=2)
    sys.exit(rc)


if __name__ == "__main__":
    main()
