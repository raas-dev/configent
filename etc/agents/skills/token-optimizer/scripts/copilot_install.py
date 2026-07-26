#!/usr/bin/env python3
"""Token Optimizer — GitHub Copilot CLI installer.

Wires Token Optimizer into a Copilot CLI setup:

1. Copies the adapter modules into <copilot_home>/token-optimizer/plugin/
   so the hook bridge runs from a stable path that survives repo moves.
2. Writes the hooks config to <copilot_home>/hooks/token-optimizer.json
   (USER-LEVEL ONLY — never .github/hooks/, which would silently affect a
   whole team's repo without consent; user-level hooks load in all modes
   including non-interactive `copilot -p`, per github/copilot-cli#3345).
3. Seeds capabilities.json for the installed CLI version.

Idempotent: re-running refreshes the payload and rewrites OUR hook file only.
Uninstall removes only files Token Optimizer created.

Usage:
    python3 copilot_install.py install [--dry-run]
    python3 copilot_install.py uninstall [--dry-run]
"""

from __future__ import annotations

import argparse
import json
import shlex
import shutil
import sys
from pathlib import Path

_SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(_SCRIPT_DIR))

from runtime_env import copilot_home  # noqa: E402

HOOK_FILE_NAME = "token-optimizer.json"
HOOK_TIMEOUT_SEC = 10

# Modules the bridge needs at runtime, copied next to it so the installed
# hook never depends on the repo checkout location.
_PAYLOAD_MODULES = (
    "copilot_hook_bridge.py",
    "copilot_state.py",
    "copilot_session.py",
    "copilot_vscode.py",
    "bash_hook.py",
    "bash_compress.py",
    "hook_io.py",
    "plugin_env.py",
    "runtime_env.py",
    # codex_io supplies atomic_write_json — without it the bridge's tally and
    # capabilities writes silently no-op (crash recovery would be dead).
    "codex_io.py",
    # hermes_session supplies compute_quality_score — without it copilot_session
    # silently falls back to a single-signal estimate (degraded quality grades).
    "hermes_session.py",
)


def _plugin_dir(root: Path) -> Path:
    return root / "token-optimizer" / "plugin"


def _hooks_dir(root: Path) -> Path:
    return root / "hooks"


def _hook_config(bridge_path: Path) -> dict:
    """The hooks file Copilot loads. Format per the official hooks reference:
    {"version": 1, "hooks": {event: [{"type": "command", "bash": ...}]}}.
    """
    py = sys.executable or "python3"
    # shlex.quote both paths: a HOME/COPILOT_HOME containing a space, $, or
    # backtick would otherwise break the bash string or inject a subcommand.
    # TOKEN_OPTIMIZER_RUNTIME is pinned so the bridge never process-scans on
    # the hot path and never falls through to the Claude default.
    py_q = shlex.quote(py)
    bridge_q = shlex.quote(str(bridge_path))

    def cmd(event: str) -> dict:
        return {
            "type": "command",
            "bash": f"TOKEN_OPTIMIZER_RUNTIME=copilot {py_q} {bridge_q} {event}",
            "timeoutSec": HOOK_TIMEOUT_SEC,
        }

    pre = cmd("pre-tool-use")
    # Only the bash tool is rewritten; the matcher keeps every other tool
    # call out of the bridge's hot path entirely.
    pre["matcher"] = {"toolName": "bash"}

    return {
        "version": 1,
        "hooks": {
            "sessionStart": [cmd("session-start")],
            "preToolUse": [pre],
            "postToolUse": [cmd("post-tool-use")],
            "stop": [cmd("stop")],
        },
    }


def install(*, dry_run: bool = False, home: Path = None) -> dict:
    """Install the adapter. Returns a summary dict of actions taken."""
    root = home if home is not None else copilot_home()
    actions = {"copied": [], "hook_file": None, "skipped": [], "dry_run": dry_run}

    plugin_dir = _plugin_dir(root)
    hooks_dir = _hooks_dir(root)

    if hooks_dir.exists() and not hooks_dir.is_dir():
        raise RuntimeError(
            f"{hooks_dir} exists but is not a directory — refusing to install. "
            "Move it aside and re-run."
        )

    for name in _PAYLOAD_MODULES:
        src = _SCRIPT_DIR / name
        if not src.exists():
            actions["skipped"].append(name)
            continue
        dest = plugin_dir / name
        if not dry_run:
            try:
                plugin_dir.mkdir(parents=True, exist_ok=True)
                shutil.copy2(src, dest)
            except OSError as exc:
                # A partial payload would silently break the bridge. Abort
                # BEFORE writing the hook config so a broken install never wires
                # hooks that point at missing modules.
                raise RuntimeError(f"failed copying {name}: {exc}") from exc
        actions["copied"].append(name)

    if actions["skipped"]:
        raise RuntimeError(
            "missing payload modules in this checkout: "
            f"{actions['skipped']} — refusing to wire hooks against an incomplete bridge."
        )

    hook_path = hooks_dir / HOOK_FILE_NAME
    config = _hook_config(plugin_dir / "copilot_hook_bridge.py")
    if not dry_run:
        try:
            hooks_dir.mkdir(parents=True, exist_ok=True)
            hook_path.write_text(json.dumps(config, indent=2) + "\n", encoding="utf-8")
        except OSError as exc:
            raise RuntimeError(f"failed writing hook config: {exc}") from exc
    actions["hook_file"] = str(hook_path)

    # Seed capabilities for the installed CLI version (best-effort).
    if not dry_run:
        try:
            import copilot_hook_bridge

            copilot_hook_bridge.load_capabilities(refresh=True)
        except Exception:
            pass

    return actions


def uninstall(*, dry_run: bool = False, home: Path = None) -> dict:
    """Remove ONLY what install() created. Session data and trends stay."""
    root = home if home is not None else copilot_home()
    actions = {"removed": [], "dry_run": dry_run}

    hook_path = _hooks_dir(root) / HOOK_FILE_NAME
    if hook_path.exists():
        if not dry_run:
            hook_path.unlink()
        actions["removed"].append(str(hook_path))

    plugin_dir = _plugin_dir(root)
    if plugin_dir.exists():
        if not dry_run:
            shutil.rmtree(plugin_dir)
        actions["removed"].append(str(plugin_dir))

    return actions


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("action", choices=("install", "uninstall"))
    parser.add_argument("--dry-run", action="store_true")
    return parser


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    try:
        if args.action == "install":
            result = install(dry_run=args.dry_run)
            verb = "Would install" if args.dry_run else "Installed"
            print(f"{verb} Token Optimizer for GitHub Copilot CLI.")
            print(f"  Hook config: {result['hook_file']}")
            print(f"  Modules: {len(result['copied'])} copied"
                  + (f", {len(result['skipped'])} missing: {result['skipped']}" if result["skipped"] else ""))
            print("  Run `python3 measure.py copilot-doctor` to verify readiness.")
        else:
            result = uninstall(dry_run=args.dry_run)
            verb = "Would remove" if args.dry_run else "Removed"
            for item in result["removed"] or ["(nothing installed)"]:
                print(f"{verb}: {item}")
        return 0
    except RuntimeError as exc:
        print(f"[Token Optimizer] {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    sys.exit(main())
