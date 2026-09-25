#!/usr/bin/env python3
"""Parse ui/xfce/chromium-extensions.yaml into TSV for the installer.

Each line of stdout: name<TAB>id<TAB>repo<TAB>asset<TAB>strip_tag_prefix
Only the keys we need are recognised; unknown keys are ignored. This
avoids pulling pyyaml as an apt dependency — the format is constrained
to a single top-level list of flat string maps, parsed by line.

Lines starting with `#` and blank lines are skipped. Values may be
bare or wrapped in single/double quotes; surrounding quotes are stripped.
"""

import pathlib
import sys


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: chromium-extensions.py <yaml>", file=sys.stderr)
        return 2
    path = pathlib.Path(sys.argv[1])
    if not path.is_file():
        print(f"missing: {path}", file=sys.stderr)
        return 1

    exts: list[dict[str, str]] = []
    cur: dict[str, str] | None = None
    for raw in path.read_text().splitlines():
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        if raw.startswith("extensions:"):
            continue
        if raw.startswith("  - "):
            if cur is not None:
                exts.append(cur)
            cur = {}
            k, _, v = raw[4:].partition(":")
            cur[k.strip()] = v.strip().strip('"').strip("'")
        elif raw.startswith("    ") and cur is not None:
            k, _, v = raw.strip().partition(":")
            cur[k.strip()] = v.strip().strip('"').strip("'")
    if cur is not None:
        exts.append(cur)

    for ext in exts:
        if not ext.get("id") or not ext.get("repo") or not ext.get("asset"):
            print(f"incomplete entry: {ext}", file=sys.stderr)
            return 1
        print(
            "\t".join(
                (
                    ext.get("name", ""),
                    ext.get("id", ""),
                    ext.get("repo", ""),
                    ext.get("asset", ""),
                    ext.get("strip_tag_prefix", ""),
                )
            )
        )
    return 0


if __name__ == "__main__":
    sys.exit(main())
