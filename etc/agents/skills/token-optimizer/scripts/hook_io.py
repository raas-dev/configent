"""Shared I/O utilities for Token Optimizer hook scripts.

Single source of truth for reading JSON hook input from stdin.
Each hook script runs as a separate subprocess; this module
provides a consistent, bounded stdin reader across all of them.
"""

from __future__ import annotations

import json
import sys
import threading

_STDIN_TIMEOUT = 0.5


def _read_stdin_windows(timeout: float = _STDIN_TIMEOUT, max_bytes: int = 1_048_576) -> str:
    result = [""]

    def _reader() -> None:
        try:
            result[0] = sys.stdin.buffer.read(max_bytes).decode("utf-8", errors="replace")
        except Exception:
            pass

    t = threading.Thread(target=_reader, daemon=True)
    t.start()
    t.join(timeout)
    return result[0]


def read_stdin_hook_input(max_bytes: int = 1_048_576) -> dict:
    """Read JSON hook input from stdin non-blocking.

    Returns parsed dict or empty dict on failure.
    Bounds read size to max_bytes (default 1MB for PostToolUse payloads
    that include tool_response). PreToolUse callers can pass a lower cap.
    Works on Unix and Windows.

    C9: if the parsed JSON is valid but NOT a dict (e.g. a list, string, or
    number), prints a loud warning to stderr and returns {}. Callers do
    hook_input.get(...) which would AttributeError on a non-dict; the empty
    dict lets the existing `if not hook_input:` guards catch it.
    """
    try:
        if sys.platform == "win32":
            data = _read_stdin_windows(max_bytes=max_bytes)
        else:
            import select
            if select.select([sys.stdin], [], [], _STDIN_TIMEOUT)[0]:
                # Decode from the raw buffer as UTF-8 so a non-UTF-8 host locale
                # can't corrupt or crash on non-ASCII hook payloads (e.g. Hebrew
                # cwd / tool args). Mirrors the Windows path above.
                data = sys.stdin.buffer.read(max_bytes).decode("utf-8", errors="replace")
            else:
                return {}
        if not data:
            return {}
        parsed = json.loads(data)
        if not isinstance(parsed, dict):
            # C9: loud fail + return. A non-dict payload (list, string, number)
            # is a protocol violation; callers would AttributeError on .get().
            print(
                f"[hook_io] stdin JSON is {type(parsed).__name__}, not a dict; "
                f"treating as empty (hook will no-op)",
                file=sys.stderr,
            )
            return {}
        return parsed
    except (OSError, json.JSONDecodeError, ValueError):
        pass
    return {}
