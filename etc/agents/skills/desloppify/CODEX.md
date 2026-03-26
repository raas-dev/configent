## Codex Overlay

This is the canonical Codex overlay used by the README install command.

1. Prefer first-class batch runs: `desloppify review --run-batches --runner codex --parallel --scan-after-import`.
2. The command writes immutable packet snapshots under `.desloppify/review_packets/holistic_packet_*.json`; use those for reproducible retries.
3. Keep reviewer input scoped to the immutable packet and the source files named in each batch.
4. If a batch fails, retry only that slice with `desloppify review --run-batches --packet <packet.json> --only-batches <idxs>`.
5. Manual override is safety-scoped: you cannot combine it with `--allow-partial`, and provisional manual scores expire on the next `scan` unless replaced by trusted internal or attested-external imports.

### Triage workflow

Prefer automated triage: `desloppify plan triage --run-stages --runner codex`

Options: `--only-stages observe,reflect` (subset), `--dry-run` (prompts only), `--stage-timeout-seconds N` (per-stage).

Run artifacts go to `.desloppify/triage_runs/<timestamp>/` — each run gets its own directory with `run.log` (live timestamped events), `run_summary.json`, per-stage `prompts/`, `output/`, and `logs/`. Check `run.log` to diagnose stalls or failures. Re-running resumes from the last confirmed stage.

If automated triage stalls, check `run.log` for the last event, then use `desloppify plan triage --stage-prompt <stage>` to get the full prompt with gate rules.

<!-- desloppify-overlay: codex -->
<!-- desloppify-end -->
