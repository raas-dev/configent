#!/usr/bin/env python3
"""Freeze a deterministic train/held-out split of an evals.json file.

Usage:
    uv run scripts/split_evals.py <evals.json> --holdout 0.4 [--seed 42] [--write split.json]

Stratifies by the optional per-eval `category` field (evals without one form
their own stratum). Items are sorted by id before shuffling, so the split does
not depend on their order in the file. Same file + same seed = same split.
"""

import argparse
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from utils import split_evals  # noqa: E402


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    parser.add_argument("evals_file", type=Path, help="Path to evals.json")
    parser.add_argument("--holdout", type=float, default=0.4, help="Held-out fraction (default 0.4)")
    parser.add_argument("--seed", type=int, default=42, help="RNG seed (default 42)")
    parser.add_argument("--write", type=Path, help="Write split.json to this path")
    args = parser.parse_args()

    data = json.loads(args.evals_file.read_text())
    evals = sorted(data["evals"], key=lambda e: e["id"])
    train, heldout = split_evals(evals, args.holdout, seed=args.seed, stratify_key="category")

    split = {
        "skill_name": data.get("skill_name", ""),
        "seed": args.seed,
        "holdout": args.holdout,
        "train_ids": sorted(e["id"] for e in train),
        "heldout_ids": sorted(e["id"] for e in heldout),
        "created_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
    }
    print(json.dumps(split, indent=2, ensure_ascii=False))
    if args.write:
        args.write.parent.mkdir(parents=True, exist_ok=True)
        args.write.write_text(json.dumps(split, indent=2, ensure_ascii=False) + "\n")
        print(f"Written: {args.write}", file=sys.stderr)


if __name__ == "__main__":
    main()
