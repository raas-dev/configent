#!/usr/bin/env python3
"""Token Optimizer - PreToolUse Read Cache (standalone entry point).

Conservatively intercepts Read tool calls to detect redundant file reads.
Default behavior is production-safe structure substitution for a narrow slice:
unchanged whole-file supported code rereads that can be replaced with a bounded
code map.

Default ON. Opt out via TOKEN_OPTIMIZER_READ_CACHE=0 or config.json
{"read_cache_enabled": false}.

Modes:
  soft_block (default) - deny eligible redundant rereads and inject structure map
  warn                - log redundant rereads but allow the read
  shadow              - measure-only, allow the read without warning noise
  block               - deny all redundant rereads; only inject structure map for
                        eligible supported code files, reason-only otherwise
"""

from __future__ import annotations

import json
import os
import re
import sqlite3
import sys
import time
from datetime import datetime
from fnmatch import fnmatch
from pathlib import Path
from typing import Any, Optional

from hook_io import read_stdin_hook_input
from plugin_env import is_v5_flag_enabled, resolve_snapshot_dir
from runtime_env import runtime_home

try:
    from session_store import SessionStore, cleanup_old_stores
except ImportError:
    SessionStore = None  # type: ignore[assignment,misc]
    cleanup_old_stores = None  # type: ignore[assignment]

try:
    from credential_patterns import redact_credentials as _redact_creds
except ImportError:
    _redact_creds = None

from structure_map import (
    StructureMapResult,
    detect_structure_language,
    is_structure_supported_file,
    summarize_code_file,
    summarize_code_source,
)

try:
    from token_estimate import estimate_tokens_from_bytes, estimate_tokens
except ImportError:  # pragma: no cover - fallback keeps the hook resilient
    def estimate_tokens_from_bytes(n_bytes):
        return max(1, int(n_bytes) // 4) if n_bytes and n_bytes > 0 else 0

    def estimate_tokens(text):
        return max(1, len(text) // 4) if text else 0


def _is_v5_delta_enabled():
    """Check if delta mode is enabled. Default ON in v5.1."""
    return is_v5_flag_enabled("v5_delta_mode", "TOKEN_OPTIMIZER_READ_CACHE_DELTA", default=True)


def _is_v5_structure_map_beta():
    """Check if structure map beta telemetry is enabled."""
    return is_v5_flag_enabled(
        "v5_structure_map_beta",
        "TOKEN_OPTIMIZER_STRUCTURE_MAP",
        default=False,
        env_truthy_value="beta",
    )


def _is_first_read_shadow_enabled():
    """Master switch for the first-read skeleton feature (default ON).

    Off (TOKEN_OPTIMIZER_FIRST_READ_SHADOW=0 / config first_read_shadow_enabled)
    disables BOTH the shadow measurement and active skeleton serving — the read
    falls through untouched.
    """
    return is_v5_flag_enabled(
        "v5_first_read_shadow",
        "TOKEN_OPTIMIZER_FIRST_READ_SHADOW",
        default=True,
    )


def _is_first_read_active_enabled():
    """Whether validated cohorts serve a SKELETON instead of the full file.

    Default ON. Off (TOKEN_OPTIMIZER_FIRST_READ_ACTIVE=0) drops every cohort back
    to shadow (measure-only) without disabling measurement. The full file always
    stays one `expand`/range-read away (see _serve_first_read_skeleton).
    """
    return is_v5_flag_enabled(
        "v5_first_read_active",
        "TOKEN_OPTIMIZER_FIRST_READ_ACTIVE",
        default=True,
    )


# Cohorts (language, size-band) promoted shadow->active because real-history
# backfill showed an edit-within-5-turns rate well under the 15% gate with a
# confident sample (>=20). Bands MUST match compression_backfill._size_band.
# Reversible: drop a tuple here (or set TOKEN_OPTIMIZER_FIRST_READ_ACTIVE=0).
#
# Two tiers of promotion, both validated by the 2026-06-11 backfill on 6,009
# sessions / 31,885 first-reads (edit-within-5-turns metric, first-read-per-file):
#   * FULL-GATE cohorts (>=20 reads, >=5 sessions, edit-rate <15%):
#       markdown/python/typescript 16-64KB, python 64-256KB.
#   * INTERPOLATED cohorts: a low-sample cohort with ZERO observed edits in
#     history graduates when the SAME language already passed the full gate in an
#     ADJACENT size band. markdown 64-256KB (13 reads, 0% edits; markdown 16-64KB
#     passed) and typescript 64-256KB (2 reads, 0% edits; typescript 16-64KB
#     passed) qualify. This trades a thin sample for the strong language signal
#     plus the always-recoverable `expand` safety net. New languages with no
#     adjacent passing band (json/yaml/javascript) stay measure-only until they
#     accumulate enough history or are promoted via `measure.py cohorts promote`.
FIRST_READ_ACTIVE_COHORTS = frozenset({
    ("python", "16-64KB"),
    ("python", "64-256KB"),
    ("typescript", "16-64KB"),
    ("typescript", "64-256KB"),  # interpolated (ts 16-64KB passed, 0% edits)
})
# NOTE (#79): markdown cohorts were demoted to shadow (measure-only) on
# 2026-06-30. A code skeleton (signatures/imports) is structure-preserving, but
# the markdown skeleton is headings-only — prose docs read for understanding
# lose load-bearing content, and the edit-rate promotion gate does not capture
# read-need. Markdown still flows through the shadow path so telemetry is kept;
# re-promote only behind a prose-aware summary. Reversible: re-add the tuples.

# Interpolated cohorts: a thin-sample subset of the active set, graduated on an
# adjacent passing band rather than their own full gate. Tracked as a named
# constant so measure/backfill can pin against it (drift test) and the dashboard
# can flag the higher-exposure tier. Serving is identical (they ARE active); the
# distinction only changes the runtime tripwire's sample floor in measure.py.
_INTERPOLATED_COHORTS = frozenset({
    ("typescript", "64-256KB"),
})


def _first_read_size_band(n_bytes: int) -> str:
    """Size band for cohort lookup. MUST match compression_backfill._size_band."""
    kb = n_bytes / 1024
    if kb < 16:
        return "<16KB"   # below the shadow floor; never a promoted cohort
    if kb < 64:
        return "16-64KB"
    if kb < 256:
        return "64-256KB"
    if kb < 1024:
        return "256KB-1MB"
    return "1-2MB"


# First-read shadow size window (bytes). Below the floor a skeleton saves too
# little to justify the extra hot-path read; above the ceiling we refuse to read
# content on the PreToolUse path to stay inside the hook budget.
FIRST_READ_SHADOW_MIN_BYTES = 16 * 1024
FIRST_READ_SHADOW_MAX_BYTES = 2 * 1024 * 1024
# Only log a shadow opportunity when the skeleton is a clear win, matching the
# >=40% gate U3/U4 use, so coverage reflects genuinely compressible reads.
FIRST_READ_SHADOW_MIN_RATIO = 0.40

# compression_events feature names for the first-read shadow path. measure.py's
# coverage view matches on these same strings (its own mirror constants).
FEATURE_FIRST_READ_SKELETON = "first_read_skeleton"
FEATURE_FIRST_READ_EDIT_FOLLOWUP = "first_read_edit_followup"

# WS2 runtime tripwire: measure.py writes the set of auto-demoted cohorts here
# when a cohort's live edit-rate exceeds the gate. The hot-path read consults it
# so a demoted cohort falls back to shadow (measure-only) without a code change.
# Cached in-process with an mtime gate so repeated reads in one process are free.
_TRIPWIRE_SIDECAR_NAME = "cohort_tripwire.json"
_demoted_cohorts_cache: "tuple[float, frozenset | _AllCohortsDemoted] | None" = None


class _AllCohortsDemoted(frozenset):
    """Sentinel meaning 'sidecar exists but is unreadable → demote everything'.

    A frozenset subclass whose membership test is always True, so the hot-path
    `cohort not in _demoted_cohorts()` short-circuits every active cohort back to
    shadow (measure-only) for this call. Used ONLY for a sidecar that EXISTS but
    is corrupt/malformed — fail-CLOSED on corruption. A MISSING sidecar stays
    fail-open (empty frozenset) since "no sidecar yet" legitimately means "no
    demotions computed yet", not "verdict lost".
    """

    __slots__ = ()

    def __contains__(self, item) -> bool:  # type: ignore[override]
        return True


_ALL_COHORTS_DEMOTED = _AllCohortsDemoted()


def _valid_tripwire_payload(data: Any) -> bool:
    """Schema-validate the tripwire sidecar (T1 fail-closed-on-corruption).

    `demoted` must be a list of 2-element string pairs; `edit_rates` (when
    present) a dict. Anything else is treated as corruption.
    """
    if not isinstance(data, dict):
        return False
    demoted = data.get("demoted", [])
    if not isinstance(demoted, list):
        return False
    for pair in demoted:
        if not isinstance(pair, (list, tuple)) or len(pair) != 2:
            return False
        if not all(isinstance(x, str) for x in pair):
            return False
    rates = data.get("edit_rates", {})
    if not isinstance(rates, dict):
        return False
    return True


def _demoted_cohorts() -> "frozenset | _AllCohortsDemoted":
    """Cohorts auto-demoted by the runtime tripwire (frozenset of (lang, band)).

    Reads the `cohort_tripwire.json` sidecar maintained by measure.py.
      * MISSING sidecar  -> empty frozenset (fail-OPEN: no demotions computed yet;
        worst case is serving a skeleton the tripwire would later demote, which
        the next edit-rate cycle re-resolves).
      * CORRUPT/malformed sidecar that EXISTS -> _ALL_COHORTS_DEMOTED sentinel
        (fail-CLOSED for corruption: every active cohort drops to shadow this
        call rather than trusting a verdict we cannot parse).
    TOCTOU-safe: a single open('rb') + os.fstat(fd) reads the mtime of the EXACT
    bytes consumed (T2), so the cached verdict can never key off a different file
    version than the one parsed. Mtime-gated so the hot path pays ~one open/fstat
    per process.
    """
    global _demoted_cohorts_cache
    try:
        path = SNAPSHOT_DIR / _TRIPWIRE_SIDECAR_NAME
        try:
            fd = os.open(str(path), os.O_RDONLY)
        except OSError:
            return frozenset()  # missing -> fail-open
        try:
            st = os.fstat(fd)
            mtime = st.st_mtime
            if (
                _demoted_cohorts_cache is not None
                and _demoted_cohorts_cache[0] == mtime
            ):
                return _demoted_cohorts_cache[1]
            raw = os.read(fd, st.st_size) if st.st_size else b""
        finally:
            os.close(fd)
        try:
            data = json.loads(raw.decode("utf-8")) if raw else {}
        except (ValueError, UnicodeDecodeError):
            _demoted_cohorts_cache = (mtime, _ALL_COHORTS_DEMOTED)
            return _ALL_COHORTS_DEMOTED
        if not _valid_tripwire_payload(data):
            _demoted_cohorts_cache = (mtime, _ALL_COHORTS_DEMOTED)
            return _ALL_COHORTS_DEMOTED
        demoted = frozenset(
            (str(c[0]), str(c[1])) for c in data.get("demoted", [])
        )
        _demoted_cohorts_cache = (mtime, demoted)
        return demoted
    except Exception:
        # Any unexpected error after we KNOW the sidecar exists is treated as
        # corruption (fail-closed); a pre-open OSError already returned fail-open.
        return _ALL_COHORTS_DEMOTED

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

SNAPSHOT_DIR = resolve_snapshot_dir()
CACHE_DIR = SNAPSHOT_DIR / "read-cache"
TRENDS_DB = SNAPSHOT_DIR / "trends.db"
MAX_CONTEXTIGNORE_PATTERNS = 200
READ_CACHE_MODES = frozenset({"shadow", "warn", "soft_block", "block"})
DEFAULT_MODE = "soft_block"

MIN_STRUCTURE_CONFIDENCE = 0.75
MAX_CONSECUTIVE_DENIALS = 3
REASON_ONLY_TOKENS_EST = 10
# U-G3: conservative avoided-search credit when a proactive hint sends the agent
# straight to a file (~2 exploratory reads of ~2500 tokens it didn't have to do
# to locate it). Deliberately small -- lean understated, observed-once per file.
_HINT_FOLLOW_AVOIDED_TOKENS = 5000
STRICT_CONTEXT_CAPS = {
    "signatures": 350,
    "top_level": 500,
    "skeleton": 850,
    "digest": 500,
}
MAX_ADDITIONAL_CONTEXT_CHARS = 2600
STRICT_ADDITIONAL_CONTEXT_CHARS = 1000

# All binary extensions (early-return path). Token-cost warnings use the
# narrower EXPENSIVE_BINARY subset in detectors/pdf_ingestion.py.
BINARY_EXTENSIONS = frozenset({
    ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".ico", ".webp", ".svg",
    ".pdf", ".wasm", ".zip", ".tar", ".gz", ".bz2", ".7z", ".rar",
    ".exe", ".dll", ".so", ".dylib", ".o", ".a",
    ".mp3", ".mp4", ".wav", ".avi", ".mov", ".mkv",
    ".ttf", ".otf", ".woff", ".woff2", ".eot",
    ".pyc", ".pyo", ".class", ".jar",
    ".sqlite", ".db", ".sqlite3",
})


# ---------------------------------------------------------------------------
# .contextignore
# ---------------------------------------------------------------------------

_contextignore_cache: dict[str, list[str]] = {}


def _load_contextignore_patterns() -> list[str]:
    """Load .contextignore patterns from project root and global config."""

    cache_key = "patterns"
    if cache_key in _contextignore_cache:
        return _contextignore_cache[cache_key]

    patterns: list[str] = []

    project_ignore = Path(".contextignore")
    if project_ignore.exists():
        try:
            for line in project_ignore.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line and not line.startswith("#"):
                    patterns.append(line)
        except OSError:
            pass

    global_ignore = runtime_home() / ".contextignore"
    if global_ignore.exists():
        try:
            for line in global_ignore.read_text(encoding="utf-8").splitlines():
                line = line.strip()
                if line and not line.startswith("#"):
                    patterns.append(line)
        except OSError:
            pass

    patterns = patterns[:MAX_CONTEXTIGNORE_PATTERNS]
    _contextignore_cache[cache_key] = patterns
    return patterns


def _is_contextignored(file_path: str) -> bool:
    """Check if file matches any .contextignore pattern."""

    patterns = _load_contextignore_patterns()
    if not patterns:
        return False
    for pattern in patterns:
        if fnmatch(file_path, pattern) or fnmatch(Path(file_path).name, pattern):
            return True
    return False


# ---------------------------------------------------------------------------
# Cache operations
# ---------------------------------------------------------------------------

def _make_store(session_id: str) -> Optional["SessionStore"]:
    if SessionStore is None:
        return None
    try:
        return SessionStore(session_id)
    except Exception:
        return None


def _cache_path(session_id: str) -> Path:
    safe_id = re.sub(r"[^a-zA-Z0-9_-]", "", session_id) or "unknown"
    return CACHE_DIR / f"{safe_id}.json"


def _decisions_log_path(session_id: str = "unknown") -> Path:
    safe_id = re.sub(r"[^a-zA-Z0-9_-]", "", session_id) or "unknown"
    decisions_dir = CACHE_DIR / "decisions"
    decisions_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
    return decisions_dir / f"{safe_id}.jsonl"



def _reset_replacement_state(entry: dict[str, Any]) -> None:
    entry["last_replacement_fingerprint"] = ""
    entry["last_replacement_type"] = ""
    entry["repeat_replacement_count"] = 0
    entry["consecutive_denials"] = 0
    entry["last_structure_reason"] = ""
    entry["last_structure_confidence"] = 0.0


def _check_escape_hatch(
    entry: dict[str, Any],
    store: Any,
    file_path: str,
    session_id: str,
    mode: str,
    offset: int,
    limit: int,
    tokens_est: int,
    language: str,
    eligible: bool,
    summary: Any,
    save_hook_context_enabled: bool,
    quiet: bool,
) -> bool:
    """Allow the read if consecutive denials reach the threshold. Returns True if escaped."""
    consecutive_denials = int(entry.get("consecutive_denials", 0) or 0) + 1
    if consecutive_denials < MAX_CONSECUTIVE_DENIALS:
        entry["consecutive_denials"] = consecutive_denials
        return False

    entry["consecutive_denials"] = 0
    _reset_replacement_state(entry)
    store.upsert_file_entry(file_path, entry)
    _log_decision(
        "allow",
        file_path,
        f"escape_hatch_read_{entry['read_count']}",
        session_id,
        mode=mode,
        actual_substitution=False,
        eligible=eligible,
        language=language,
        reason_code="consecutive_denial_escape",
        offset=offset,
        limit=limit,
        replacement_type=summary.replacement_type if summary else None,
        file_tokens_est=tokens_est,
        replacement_tokens_est=0,
        net_saved_tokens_est=0,
        replacement_fingerprint=summary.fingerprint if summary else None,
        repeat_replacement_count=consecutive_denials,
        save_hook_additional_context_enabled=save_hook_context_enabled,
        confidence=summary.confidence if summary else 0.0,
    )
    if not quiet:
        print(
            f"[Read Cache] Escape hatch: allowing read after {consecutive_denials} consecutive denials: {file_path}",
            file=sys.stderr,
        )
    return True


def _ensure_entry_defaults(entry: dict[str, Any]) -> None:
    entry.setdefault("mtime_ns", 0)
    entry.setdefault("size_bytes", 0)
    entry.setdefault("tokens_est", 0)
    entry.setdefault("read_count", 0)
    entry.setdefault("last_access", 0.0)
    entry.setdefault("last_replacement_fingerprint", "")
    entry.setdefault("last_replacement_type", "")
    entry["repeat_replacement_count"] = int(entry.get("repeat_replacement_count", 0) or 0)
    entry["consecutive_denials"] = int(entry.get("consecutive_denials", 0) or 0)
    entry["last_structure_reason"] = entry.get("last_structure_reason", "")
    entry["last_structure_confidence"] = float(entry.get("last_structure_confidence", 0.0) or 0.0)
    if "ranges_seen" not in entry:
        old_off = int(entry.get("offset", 0) or 0)
        old_lim = int(entry.get("limit", 0) or 0)
        entry["ranges_seen"] = [[old_off, old_lim]]


def _log_decision(
    decision: str,
    file_path: str,
    reason: str,
    session_id: str,
    **extra: Any,
) -> None:
    entry = {
        "ts": time.time(),
        "decision": decision,
        "file": file_path,
        "reason": reason,
        "session": session_id,
    }
    entry.update(extra)
    log_path = _decisions_log_path(session_id)
    try:
        fd = os.open(str(log_path), os.O_WRONLY | os.O_CREAT | os.O_APPEND, 0o600)
        with os.fdopen(fd, "a", encoding="utf-8") as handle:
            handle.write(json.dumps(entry, sort_keys=True) + "\n")
    except OSError:
        pass


def _log_unexpected_tool(tool_name: str, quiet: bool = False) -> None:
    """Log when the hook is invoked for a non-Read tool (matcher bypass)."""
    log_dir = SNAPSHOT_DIR / "diagnostics"
    try:
        log_dir.mkdir(parents=True, exist_ok=True, mode=0o700)
        log_path = log_dir / "unexpected_tool_invocations.jsonl"
        entry = {
            "ts": time.time(),
            "tool_name": tool_name,
            "event": "read_cache_invoked_for_non_read_tool",
        }
        fd = os.open(str(log_path), os.O_WRONLY | os.O_CREAT | os.O_APPEND, 0o600)
        with os.fdopen(fd, "a", encoding="utf-8") as handle:
            handle.write(json.dumps(entry, sort_keys=True) + "\n")
    except OSError:
        pass
    if not quiet:
        print(
            f"[Read Cache] WARNING: invoked for tool '{tool_name}', expected 'Read'. Skipping.",
            file=sys.stderr,
        )


# ---------------------------------------------------------------------------
# Hook response helpers
# ---------------------------------------------------------------------------

def _emit_pretool_response(
    permission_decision: Optional[str],
    reason: Optional[str],
    additional_context: Optional[str] = None,
) -> None:
    payload: dict[str, Any] = {
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
        }
    }
    hook_output = payload["hookSpecificOutput"]
    if permission_decision:
        hook_output["permissionDecision"] = permission_decision
    if reason:
        hook_output["permissionDecisionReason"] = reason
    if additional_context:
        hook_output["additionalContext"] = additional_context
    print(json.dumps(payload))


def _build_structure_message(
    file_path: str,
    summary: StructureMapResult,
    net_saved_tokens_est: int,
) -> str:
    return "\n".join(
        [
            f"[Token Optimizer] {Path(file_path).name} is unchanged (already read this session).",
            f"Using {summary.replacement_type} view (~{net_saved_tokens_est:,} tokens saved).",
            "You can still Edit this file directly, or Read a specific range (offset/limit) for full content.",
            "",
            summary.replacement_text,
        ]
    )


def _build_reason_only_message(file_path: str) -> str:
    return (
        f"[Token Optimizer] {Path(file_path).name} is unchanged, already in context, and was already "
        "summarized in this session. You can still Edit this file or Read a specific range."
    )


def _hook_additional_context_saved() -> bool:
    value = os.environ.get("CLAUDE_CODE_SAVE_HOOK_ADDITIONAL_CONTEXT", "").strip().lower()
    return value not in ("", "0", "false", "no")


def _additional_context_within_cap(text: str, strict: bool) -> bool:
    cap = STRICT_ADDITIONAL_CONTEXT_CHARS if strict else MAX_ADDITIONAL_CONTEXT_CHARS
    return len(text) <= cap


# ---------------------------------------------------------------------------
# Savings tracking
# ---------------------------------------------------------------------------

_SAVINGS_SCHEMA = """
CREATE TABLE IF NOT EXISTS savings_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    event_type TEXT NOT NULL,
    tokens_saved INTEGER DEFAULT 0,
    cost_saved_usd REAL DEFAULT 0.0,
    session_id TEXT,
    session_uuid TEXT,
    detail TEXT,
    model TEXT,
    unjoinable INTEGER DEFAULT 0
);
"""

_UUID_PAT_RC = re.compile(
    r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    re.IGNORECASE,
)


def _extract_session_uuid_rc(session_id: Optional[str]) -> tuple:
    """Return (session_uuid, unjoinable) for the read_cache fast path.

    A full Claude UUID (8-4-4-4-12 hex) is the JSONL stem and can be joined
    directly on session_log.session_uuid. Short opaque agent_ids (<=20 chars,
    no dashes) cannot be resolved and are flagged unjoinable=1 so the
    aggregation layer never silently prices them at the Sonnet fallback.
    """
    if not session_id or session_id in ("unknown", "test-123", "perf_test", "regtest", "demo"):
        return None, False
    if _UUID_PAT_RC.match(session_id):
        return session_id, False
    if len(session_id) <= 20 and "-" not in session_id:
        return None, True
    return None, False


# Process-local: once the savings_events columns are confirmed present we skip
# the per-write PRAGMA introspection. Fresh tables get all columns from the
# schema; the ALTERs only matter for pre-v5.10 tables, so one verification per
# process is enough. (Worst case across mixed old/new DBs in one process: a stale
# skip -- acceptable for a measurement path, and executescript already creates
# new tables fully-formed.)
_savings_columns_verified = False


def _ensure_savings_columns(conn: sqlite3.Connection) -> None:
    """Idempotent migration: ensure model, session_uuid, and unjoinable columns exist.

    The shipped schema declares all three, but pre-existing tables created before
    v5.10 lack session_uuid and unjoinable. Runs the PRAGMA once per process, then
    short-circuits on subsequent calls in the hot savings-write path.
    """
    global _savings_columns_verified
    if _savings_columns_verified:
        return
    try:
        cols = {row[1] for row in conn.execute("PRAGMA table_info(savings_events)")}
        if "model" not in cols:
            conn.execute("ALTER TABLE savings_events ADD COLUMN model TEXT")
        if "session_uuid" not in cols:
            conn.execute("ALTER TABLE savings_events ADD COLUMN session_uuid TEXT")
        if "unjoinable" not in cols:
            conn.execute("ALTER TABLE savings_events ADD COLUMN unjoinable INTEGER DEFAULT 0")
        # All three columns now exist (present already or just ALTER'd, which
        # auto-commits), so future introspection in this process is redundant.
        _savings_columns_verified = True
    except Exception:
        pass


def _ensure_savings_model_column(conn: sqlite3.Connection) -> None:
    """Backward-compat alias for _ensure_savings_columns (used in tests)."""
    _ensure_savings_columns(conn)


def _log_savings_event(event_type: str, tokens_saved: int, session_id: str, detail: str) -> None:
    if tokens_saved <= 0:
        return
    conn: Optional[sqlite3.Connection] = None
    try:
        SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
        conn = sqlite3.connect(str(TRENDS_DB))
        conn.execute("PRAGMA journal_mode=WAL")
        conn.execute("PRAGMA busy_timeout=5000")
        conn.executescript(_SAVINGS_SCHEMA)
        _ensure_savings_columns(conn)
        # U1: derive the stable UUID join key before calling measure imports.
        session_uuid, unjoinable = _extract_session_uuid_rc(session_id)
        # Resolve the event's REAL model from its session and price at that model's
        # rate -- never a flat default. Persisting `model` makes the row repriceable
        # later. Import lazily (measure isn't always loaded in the hook fast path).
        model = None
        cost_per_mtok = 3.0
        try:
            from measure import (  # type: ignore
                _estimate_compression_cost_per_mtok,
                _resolve_session_model,
            )
            model = _resolve_session_model(session_id)
            cost_per_mtok = _estimate_compression_cost_per_mtok(model)
        except Exception:
            pass
        cost_saved = tokens_saved * cost_per_mtok / 1_000_000
        conn.execute(
            "INSERT INTO savings_events "
            "(timestamp, event_type, tokens_saved, cost_saved_usd, session_id, session_uuid, detail, model, unjoinable) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (datetime.now().isoformat(), event_type, tokens_saved, cost_saved,
             session_id, session_uuid, detail, model, 1 if unjoinable else 0),
        )
        conn.commit()
    except Exception:
        pass
    finally:
        if conn is not None:
            try:
                conn.close()
            except Exception:
                pass


# ---------------------------------------------------------------------------
# Structure summarization
# ---------------------------------------------------------------------------

def _summarize_redundant_read(
    file_path: str,
    *,
    offset: int,
    limit: int,
    file_tokens_est: int,
) -> tuple[Optional[StructureMapResult], str]:
    try:
        content = Path(file_path).read_text(encoding="utf-8", errors="replace")
    except OSError:
        return None, "unreadable"

    summary = summarize_code_source(
        content,
        file_path=file_path,
        offset=offset,
        limit=limit,
        file_tokens_est=file_tokens_est,
        file_size_bytes=len(content.encode("utf-8", errors="ignore")),
    )
    reason_code = summary.reason

    if not summary.eligible:
        return summary, reason_code

    if summary.confidence < MIN_STRUCTURE_CONFIDENCE:
        return summary, "low_confidence"

    if _hook_additional_context_saved():
        strict_cap = STRICT_CONTEXT_CAPS.get(summary.replacement_type, len(summary.replacement_text))
        if len(summary.replacement_text) > strict_cap:
            return summary, "hook_context_cap"

    return summary, "ok"
# ---------------------------------------------------------------------------
# Main hook logic
# ---------------------------------------------------------------------------

def _first_read_compress(
    file_path: str,
    stat: os.stat_result,
    offset: int,
    limit: int,
    language: str,
    session_id: str,
    store: "SessionStore",
    mode: str,
    cached_content: Optional[str] = None,
    save_hook_context_enabled: bool = False,
    quiet: bool = True,
) -> bool:
    """First-read skeleton path. Returns True iff it SERVED a skeleton
    (active mode emitted a deny+inject and the caller must stop).

    For a whole-file first read of a structure-supported file in the size window
    that compresses well:
      * ACTIVE cohort (validated by history) -> serve the skeleton, archive the
        full original for `expand`, log a measured event. Returns True.
      * Otherwise -> SHADOW: serve the full file unchanged, log an opportunity
        event + arm the edit-rate ledger marker (resolved at the Edit hook).
        Returns False.
    Fully fail-open: any error returns False (serve the full file).
    """
    try:
        if not _is_first_read_shadow_enabled():
            return False
        # Whole-file reads only: a partial range has no skeleton equivalent.
        if offset != 0 or limit != 0:
            return False
        size = int(stat.st_size)
        if size < FIRST_READ_SHADOW_MIN_BYTES or size > FIRST_READ_SHADOW_MAX_BYTES:
            return False
        if not is_structure_supported_file(file_path):
            return False

        # Reuse the content delta mode already read this turn, if present, to
        # avoid a second full read of the same file on the hot path.
        content = (
            cached_content
            if cached_content is not None
            else Path(file_path).read_text(encoding="utf-8", errors="replace")
        )
        result = summarize_code_file(file_path, content=content, file_size_bytes=size)
        if not result.eligible:
            return False
        orig_tokens = int(result.file_tokens_est or estimate_tokens(content))
        skel_tokens = int(result.replacement_tokens_est or 0)
        if orig_tokens <= 0:
            return False
        would_be_ratio = 1.0 - (skel_tokens / orig_tokens)
        if would_be_ratio < FIRST_READ_SHADOW_MIN_RATIO:
            return False

        cohort = (language, _first_read_size_band(size))
        if (
            _is_first_read_active_enabled()
            and cohort in FIRST_READ_ACTIVE_COHORTS
            and cohort not in _demoted_cohorts()
            and result.replacement_text
        ):
            return _serve_first_read_skeleton(
                file_path, stat, size, language, session_id, store, mode,
                content, result, orig_tokens, skel_tokens,
                save_hook_context_enabled, quiet,
            )

        # SHADOW (cohort not yet promoted): serve full, measure the opportunity.
        # Write the ledger marker FIRST, then the skeleton event. If the second
        # write fails, the failure biases the R9 edit-rate the SAFE way (an
        # orphan marker can only over-count edits → looks less safe to promote),
        # never the unsafe way. Keyed by the resolved file_path (handle_invalidate
        # normalizes the path identically).
        store.set_meta(
            f"shadow_fr:{file_path}",
            json.dumps({
                "ts": time.time(),
                "lang": language,
                # v5.11.1 (T10): carry the size band so shadow follow-ups emit
                # lang|band like active ones. _resolve_first_read_marker packs
                # lang|band when present; older markers without it fall back to
                # bare lang, so this is backward-compatible.
                "band": _first_read_size_band(size),
                "ratio": round(would_be_ratio, 4),
                "resolved": 0,
            }),
        )
        from compression_log import log_compression_event
        log_compression_event(
            feature=FEATURE_FIRST_READ_SKELETON,
            session_id=session_id,
            command_pattern=language,
            tier="opportunity",
            verified=False,
            detail=f"shadow size_bytes={size}",
            original_tokens=orig_tokens,
            compressed_tokens=skel_tokens,
        )
        return False
    except Exception:
        return False


def _serve_first_read_skeleton(
    file_path: str,
    stat: os.stat_result,
    size: int,
    language: str,
    session_id: str,
    store: "SessionStore",
    mode: str,
    content: str,
    result: StructureMapResult,
    orig_tokens: int,
    skel_tokens: int,
    save_hook_context_enabled: bool,
    quiet: bool,
) -> bool:
    """ACTIVE mode: serve the skeleton in place of the full file. Returns True
    iff it actually withheld content (a deny was emitted), else False.

    Invariant (the whole safety story): content is withheld ONLY when the full
    original has been successfully archived and is recoverable via `expand <key>`.
    If archiving fails for any reason, we FAIL OPEN — return False so the caller
    serves the full file. Once archived, logging is best-effort and can never
    abandon the deny we committed to. The original file on disk is never touched;
    a ranged Read or a direct Edit also reach the full content.
    """
    net_saved = max(0, orig_tokens - skel_tokens)
    # Archive FIRST. No guaranteed path back to the full content => do not withhold.
    try:
        from archive_result import derive_archive_key, archive_original, build_archive_pointer
        key = derive_archive_key(session_id, file_path, stat.st_mtime_ns)
        if archive_original(content, session_id, key, "Read", quiet=quiet,
                            file_path=file_path, language=language) is None:
            return False
        body = build_archive_pointer(result.replacement_text, len(content), key)
    except Exception:
        return False

    context = "\n".join([
        f"[Token Optimizer] {Path(file_path).name} is large (~{orig_tokens:,} tokens). "
        f"Serving a {result.replacement_type} skeleton (~{net_saved:,} tokens saved).",
        f"Need the full file? Run: expand {key}  "
        "(or Read a specific offset/limit range, or Edit the file directly).",
        "",
        body,
    ])
    reason = (
        f"{Path(file_path).name}: large-file first read served as a "
        f"{result.replacement_type} skeleton; full content available via expand or a ranged Read."
    )

    # Arm the ACTIVE-mode edit-rate marker (WS2 tripwire). A subsequent edit to
    # this same file means the served skeleton withheld content the model needed
    # — the live quality signal the runtime tripwire watches per cohort. Distinct
    # key from the shadow marker so the two edit-rates never cross-contaminate.
    # Written BEFORE the measured event so a partial-write failure biases the
    # edit-rate HIGH (safe / demotes), never low. Best-effort.
    try:
        band = _first_read_size_band(size)
        store.set_meta(
            f"active_fr:{file_path}",
            json.dumps({
                "ts": time.time(),
                "lang": language,
                "band": band,
                "resolved": 0,
            }),
        )
    except Exception:
        pass

    # The original is archived, so the deny is now safe to emit. Side-channel
    # logging is best-effort and MUST NOT prevent _emit_pretool_response.
    try:
        from compression_log import log_compression_event
        # command_pattern carries lang|band so the WS2 tripwire can compute a
        # per-cohort live edit-rate (measured skeletons vs measured follow-ups).
        log_compression_event(
            feature=FEATURE_FIRST_READ_SKELETON,
            session_id=session_id,
            command_pattern=f"{language}|{_first_read_size_band(size)}",
            tier="measured",
            verified=True,
            quality_preserved=True,
            detail=f"active size_bytes={size} type={result.replacement_type}",
            original_tokens=orig_tokens,
            compressed_tokens=skel_tokens,
        )
    except Exception:
        pass
    try:
        _log_decision(
            "block",
            file_path,
            "first_read_skeleton",
            session_id,
            mode=mode,
            actual_substitution=True,
            eligible=True,
            language=language,
            reason_code="first_read_skeleton_active",
            offset=0,
            limit=0,
            replacement_type=result.replacement_type,
            file_tokens_est=orig_tokens,
            replacement_tokens_est=skel_tokens,
            net_saved_tokens_est=net_saved,
            replacement_fingerprint=result.fingerprint,
            repeat_replacement_count=0,
            save_hook_additional_context_enabled=save_hook_context_enabled,
            confidence=result.confidence,
        )
    except Exception:
        pass
    if not quiet:
        print(f"[Read Cache] First-read skeleton: {file_path} (saved~{net_saved:,})",
              file=sys.stderr)
    _emit_pretool_response("deny", reason, context)
    return True


def _resolve_first_read_shadow_on_edit(
    file_path: str,
    language: str,
    session_id: str,
    store: "SessionStore",
) -> None:
    """Resolve a shadow first-read ledger marker at the Edit/Write hook.

    A shadow-measured first read followed by an edit to the same file is the
    "the model needed the full file" proxy. Emit an Opportunity-tier follow-up
    event so coverage can compute the cohort edit-rate
    (followups / shadows). Marked resolved so repeated edits count once.
    Fully fail-open.

    Known limitation: the marker lives in the per-session store, so an edit in a
    DIFFERENT session than the shadow read is not resolved. The proxy therefore
    undercounts edits for cross-session read→edit patterns, biasing the edit-rate
    LOW (toward "promote"). The promotion decision (R9) must account for this with
    a conservative gate and human review before any active-mode flip — it must
    not auto-promote purely on this proxy.
    """
    # Resolve BOTH the shadow marker (measure-only cohorts, opportunity tier) and
    # the active marker (promoted cohorts, measured tier). The active follow-ups
    # feed the WS2 runtime tripwire's per-cohort live edit-rate; a demotion fires
    # when that rate exceeds the gate.
    _resolve_first_read_marker(
        store, f"shadow_fr:{file_path}", FEATURE_FIRST_READ_EDIT_FOLLOWUP,
        "opportunity", session_id, language,
        "shadow first-read followed by edit",
    )
    _resolve_first_read_marker(
        store, f"active_fr:{file_path}", FEATURE_FIRST_READ_EDIT_FOLLOWUP,
        "measured", session_id, language,
        "active first-read skeleton followed by edit",
    )


def _resolve_first_read_marker(
    store: "SessionStore",
    marker_key: str,
    feature: str,
    tier: str,
    session_id: str,
    language: str,
    detail: str,
) -> None:
    """Resolve one first-read ledger marker, emitting a follow-up event once.

    Tier selects the cohort population: opportunity = shadow (measure-only)
    cohorts, measured = active (promoted) cohorts watched by the tripwire. The
    follow-up's command_pattern carries the marker's stored language|band so the
    tripwire can attribute the edit to the exact (language, band) cohort.
    """
    try:
        raw = store.get_meta(marker_key)
        if not raw:
            return
        try:
            data = json.loads(raw)
        except (json.JSONDecodeError, TypeError):
            # A corrupt marker would otherwise stay un-resolvable forever and
            # silently drop this file from the edit-rate numerator. Clear it.
            store.set_meta(marker_key, "")
            return
        if data.get("resolved"):
            return
        band = data.get("band")
        lang = data.get("lang") or language
        # Pack lang|band so the tripwire can recover the cohort; fall back to bare
        # lang for shadow markers (the opportunity proxy is language-agnostic).
        pattern = f"{lang}|{band}" if band else lang
        from compression_log import log_compression_event
        log_compression_event(
            feature=feature,
            session_id=session_id,
            command_pattern=pattern,
            tier=tier,
            verified=(tier == "measured"),
            # The full file was needed right after the read — a skeleton would
            # have withheld content. That is the opposite of quality-preserving.
            quality_preserved=False,
            detail=detail,
            original_tokens=0,
            compressed_tokens=0,
        )
        data["resolved"] = 1
        store.set_meta(marker_key, json.dumps(data))
    except Exception:
        pass


def handle_read(hook_input: dict[str, Any], mode: str, quiet: bool) -> None:
    """Handle a PreToolUse Read event. Caller must verify tool_name == "Read"."""

    tool_input = hook_input.get("tool_input", {})
    raw_path = tool_input.get("file_path", "")
    if not raw_path:
        return

    file_path = str(Path(raw_path).resolve())
    session_id = str(hook_input.get("agent_id") or hook_input.get("session_id") or "unknown")
    try:
        offset = int(tool_input.get("offset", 0) or 0)
    except (ValueError, TypeError):
        offset = 0
    try:
        limit = int(tool_input.get("limit", 0) or 0)
    except (ValueError, TypeError):
        limit = 0
    ext = Path(file_path).suffix.lower()
    language = detect_structure_language(file_path)
    save_hook_context_enabled = _hook_additional_context_saved()

    if _is_contextignored(file_path):
        reason = f"Blocked by .contextignore: {Path(file_path).name}"
        # The read is fully denied, so the tokens that would have entered context
        # are genuinely saved (measured / realized — TO performed the prevention).
        # Estimate from file size (st_size//4), matching the redundant-read path's
        # convention. Guarded: a missing/unreadable file just records zero.
        ignore_tokens_est = 0
        try:
            ignore_tokens_est = estimate_tokens_from_bytes(os.stat(file_path).st_size)
        except OSError:
            ignore_tokens_est = 0
        _log_decision(
            "block",
            file_path,
            "contextignore",
            session_id,
            mode=mode,
            actual_substitution=False,
            eligible=False,
            language=language,
            reason_code="contextignore",
            offset=offset,
            limit=limit,
            replacement_type=None,
            file_tokens_est=ignore_tokens_est,
            replacement_tokens_est=0,
            net_saved_tokens_est=ignore_tokens_est,
            replacement_fingerprint=None,
            repeat_replacement_count=0,
            save_hook_additional_context_enabled=save_hook_context_enabled,
        )
        _log_savings_event(
            "contextignore_block",
            ignore_tokens_est,
            session_id,
            Path(file_path).name,
        )
        if not quiet:
            print(f"[Read Cache] Blocked by .contextignore: {file_path}", file=sys.stderr)
        _emit_pretool_response("deny", reason)
        return

    if ext in BINARY_EXTENSIONS:
        # Warn about expensive binary ingestion (PDF, images, Office docs)
        try:
            binary_stat = os.stat(file_path)
            binary_size = binary_stat.st_size
        except OSError:
            return

        finding = None
        try:
            from detectors.pdf_ingestion import detect_pdf_ingestion_inline
            finding = detect_pdf_ingestion_inline(file_path, binary_size, ext)
        except ImportError:
            pass

        if finding:
            size_mb = binary_size / (1024 * 1024)
            context_msg = (
                f"[Token Optimizer] {Path(file_path).name} is a {ext} file "
                f"({size_mb:.1f}MB, ~{finding['savings_tokens']:,} estimated tokens). "
                f"{finding['suggestion']}"
            )
            _log_decision(
                "allow",
                file_path,
                "binary_ingestion_warning",
                session_id,
                mode=mode,
                actual_substitution=False,
                eligible=False,
                language=language,
                reason_code="binary_ingestion",
                offset=offset,
                limit=limit,
                replacement_type=None,
                file_tokens_est=finding["savings_tokens"],
                replacement_tokens_est=0,
                net_saved_tokens_est=0,
                replacement_fingerprint=None,
                repeat_replacement_count=0,
                save_hook_additional_context_enabled=save_hook_context_enabled,
            )
            if not quiet:
                print(
                    f"[Read Cache] Binary ingestion warning: {file_path} "
                    f"(~{finding['savings_tokens']:,} tokens)",
                    file=sys.stderr,
                )
            _emit_pretool_response(None, None, context_msg)
        return

    store = _make_store(session_id)
    if store is None:
        return

    # U-G3: if a proactive prior-session hint surfaced this exact file to this
    # session, the agent reading it is observed evidence the hint spared an
    # exploratory search to locate it. Credit once (claim_hint_follow flips the
    # credited flag) with a conservative avoided-search estimate. Best-effort.
    try:
        if store.claim_hint_follow(file_path):
            _log_savings_event(
                "hint_followed",
                _HINT_FOLLOW_AVOIDED_TOKENS,
                session_id,
                f"hint->read: {os.path.basename(file_path)}",
            )
    except Exception:
        pass

    try:
        entry = store.get_file_entry(file_path)
    except Exception:
        return

    if entry is None:
        try:
            stat = os.stat(file_path)
        except OSError:
            return

        tokens_est = estimate_tokens_from_bytes(stat.st_size)
        entry = {
            "mtime_ns": stat.st_mtime_ns,
            "size_bytes": stat.st_size,
            "ranges_seen": [[offset, limit]],
            "tokens_est": tokens_est,
            "read_count": 1,
            "last_access": time.time(),
        }
        delta_content = None
        if _is_v5_delta_enabled() and offset == 0 and limit == 0:
            try:
                from delta_diff import is_delta_eligible, content_hash, MAX_CONTENT_CACHE_BYTES
                if is_delta_eligible(file_path):
                    fc = Path(file_path).read_text(encoding="utf-8", errors="replace")
                    delta_content = fc  # reusable in-process even if too big to persist
                    if len(fc.encode("utf-8", errors="replace")) <= MAX_CONTENT_CACHE_BYTES:
                        safe_fc = _redact_creds(fc) if _redact_creds else fc
                        entry["cached_content"] = safe_fc
                        entry["content_hash"] = content_hash(fc)
                        store.upsert_cached_content(file_path, safe_fc, content_hash(fc))
            except Exception:
                pass
        _reset_replacement_state(entry)
        store.upsert_file_entry(file_path, entry)
        # U5: first-read skeleton. Active cohorts serve a skeleton (returns True,
        # we stop here); others fall through to serve the full file + shadow-log.
        # Reuses content delta mode already read this turn (even when too large to
        # persist) so the file is never read twice.
        if _first_read_compress(
            file_path, stat, offset, limit, language, session_id, store, mode,
            cached_content=entry.get("cached_content") or delta_content,
            save_hook_context_enabled=save_hook_context_enabled,
            quiet=quiet,
        ):
            return
        _log_decision(
            "allow",
            file_path,
            "first_read",
            session_id,
            mode=mode,
            actual_substitution=False,
            eligible=False,
            language=language,
            reason_code="first_read",
            offset=offset,
            limit=limit,
            replacement_type=None,
            file_tokens_est=tokens_est,
            replacement_tokens_est=0,
            net_saved_tokens_est=0,
            replacement_fingerprint=None,
            repeat_replacement_count=0,
            save_hook_additional_context_enabled=save_hook_context_enabled,
        )
        return

    _ensure_entry_defaults(entry)

    try:
        current_stat = os.stat(file_path)
    except OSError:
        store.delete_file_entry(file_path)
        _log_decision(
            "allow",
            file_path,
            "file_deleted",
            session_id,
            mode=mode,
            actual_substitution=False,
            eligible=False,
            language=language,
            reason_code="file_deleted",
            offset=offset,
            limit=limit,
            replacement_type=None,
            file_tokens_est=entry.get("tokens_est", 0),
            replacement_tokens_est=0,
            net_saved_tokens_est=0,
            replacement_fingerprint=None,
            repeat_replacement_count=0,
            save_hook_additional_context_enabled=save_hook_context_enabled,
        )
        return

    mtime_match = int(entry.get("mtime_ns", 0) or 0) == current_stat.st_mtime_ns
    size_match = int(entry.get("size_bytes", 0) or 0) == current_stat.st_size

    ranges_seen = entry.get("ranges_seen", [])
    if not ranges_seen:
        old_off = int(entry.get("offset", 0) or 0)
        old_lim = int(entry.get("limit", 0) or 0)
        ranges_seen = [[old_off, old_lim]]

    range_covered = False
    for cached_off, cached_lim in ranges_seen:
        if cached_off == 0 and cached_lim == 0:
            range_covered = True
            break
        if offset >= cached_off:
            if cached_lim == 0:
                range_covered = True
                break
            if limit > 0 and (offset + limit) <= (cached_off + cached_lim):
                range_covered = True
                break

    if not (mtime_match and size_match and range_covered):
        # v5.0: Delta mode -- return diff instead of allowing full re-read
        delta_enabled = _is_v5_delta_enabled()
        cached = store.get_cached_content(file_path) if delta_enabled else None
        old_content = cached.get("content") if cached else entry.get("cached_content")
        old_hash = cached.get("content_hash") if cached else entry.get("content_hash")
        if (
            delta_enabled
            and offset == 0
            and limit == 0
            and not mtime_match
            and old_hash
            and old_content
        ):
            try:
                from delta_diff import compute_delta, content_hash, is_delta_eligible, MAX_CONTENT_CACHE_BYTES
                if is_delta_eligible(file_path):
                    new_content = Path(file_path).read_text(encoding="utf-8", errors="replace")
                    new_hash = content_hash(new_content)
                    if new_hash != old_hash:
                        delta_text, delta_stats = compute_delta(old_content, new_content, Path(file_path).name)
                        if delta_text is not None:
                            entry["mtime_ns"] = current_stat.st_mtime_ns
                            entry["size_bytes"] = current_stat.st_size
                            entry["content_hash"] = new_hash
                            entry["read_count"] = int(entry.get("read_count", 0) or 0) + 1
                            entry["last_access"] = time.time()
                            _reset_replacement_state(entry)
                            store.upsert_file_entry(file_path, entry)
                            if len(new_content.encode("utf-8", errors="replace")) <= MAX_CONTENT_CACHE_BYTES:
                                store.upsert_cached_content(file_path, new_content, new_hash)

                            old_tokens = estimate_tokens_from_bytes(current_stat.st_size)
                            delta_tokens = estimate_tokens(delta_text)
                            net_saved = max(0, old_tokens - delta_tokens)

                            _log_decision(
                                "block",
                                file_path,
                                f"delta_read_{entry['read_count']}",
                                session_id,
                                mode=mode,
                                actual_substitution=True,
                                eligible=True,
                                language=language,
                                reason_code="delta_diff",
                                offset=offset,
                                limit=limit,
                                replacement_type="delta",
                                file_tokens_est=old_tokens,
                                replacement_tokens_est=delta_tokens,
                                net_saved_tokens_est=net_saved,
                                replacement_fingerprint=new_hash[:16],
                                repeat_replacement_count=0,
                                save_hook_additional_context_enabled=save_hook_context_enabled,
                            )
                            _log_savings_event("delta_read", net_saved, session_id,
                                               f"{Path(file_path).name}:+{delta_stats['added']}/-{delta_stats['removed']}")
                            # Log to compression_events for v5 telemetry
                            try:
                                sys.path.insert(0, str(Path(__file__).resolve().parent))
                                from measure import _log_compression_event
                                _log_compression_event(
                                    feature="delta_read",
                                    original_text=" " * (old_tokens * 4),  # proxy
                                    compressed_text=delta_text,
                                    session_id=session_id,
                                    command_pattern=f"Read:{Path(file_path).name}",
                                    quality_preserved=True,
                                    verified=True,
                                    tier="measured",  # realized: reaches headline explicitly
                                    detail=f"+{delta_stats['added']}/-{delta_stats['removed']}",
                                )
                            except Exception:
                                pass
                            if not quiet:
                                print(
                                    f"[Read Cache] Delta mode: {file_path} "
                                    f"(+{delta_stats['added']}/-{delta_stats['removed']}, saved~{net_saved:,})",
                                    file=sys.stderr,
                                )
                            reason = (
                                f"{Path(file_path).name} was edited; showing diff "
                                f"(+{delta_stats['added']}/-{delta_stats['removed']} lines) "
                                f"instead of full re-read."
                            )
                            _emit_pretool_response("deny", reason, delta_text)
                            return  # EXIT: delta handled, do NOT evaluate structure map
                    else:
                        # Hash unchanged despite mtime change (e.g., touch). Allow normal read.
                        pass
            except Exception:
                pass  # Fail open: fall through to normal allow

        file_changed = not (mtime_match and size_match)
        reason_code_allow = "file_modified" if file_changed else "new_range"
        entry["mtime_ns"] = current_stat.st_mtime_ns
        entry["size_bytes"] = current_stat.st_size
        if file_changed:
            entry["ranges_seen"] = [[offset, limit]]
        else:
            ranges_seen.append([offset, limit])
            if len(ranges_seen) > 20:
                ranges_seen = ranges_seen[-20:]
            entry["ranges_seen"] = ranges_seen
        entry["tokens_est"] = estimate_tokens_from_bytes(current_stat.st_size)
        entry["read_count"] = int(entry.get("read_count", 0) or 0) + 1
        entry["last_access"] = time.time()
        if delta_enabled and offset == 0 and limit == 0 and not entry.get("cached_content"):
            try:
                from delta_diff import is_delta_eligible, content_hash, MAX_CONTENT_CACHE_BYTES
                if is_delta_eligible(file_path):
                    fc = Path(file_path).read_text(encoding="utf-8", errors="replace")
                    if len(fc.encode("utf-8", errors="replace")) <= MAX_CONTENT_CACHE_BYTES:
                        safe_fc = _redact_creds(fc) if _redact_creds else fc
                        entry["cached_content"] = safe_fc
                        entry["content_hash"] = content_hash(fc)
                        store.upsert_cached_content(file_path, safe_fc, content_hash(fc))
            except Exception:
                pass
        _reset_replacement_state(entry)
        store.upsert_file_entry(file_path, entry)
        _log_decision(
            "allow",
            file_path,
            reason_code_allow,
            session_id,
            mode=mode,
            actual_substitution=False,
            eligible=False,
            language=language,
            reason_code=reason_code_allow,
            offset=offset,
            limit=limit,
            replacement_type=None,
            file_tokens_est=entry.get("tokens_est", 0),
            replacement_tokens_est=0,
            net_saved_tokens_est=0,
            replacement_fingerprint=None,
            repeat_replacement_count=0,
            save_hook_additional_context_enabled=save_hook_context_enabled,
        )
        return

    entry["read_count"] = int(entry.get("read_count", 0) or 0) + 1
    entry["last_access"] = time.time()
    tokens_est = int(entry.get("tokens_est", 0) or 0)

    summary: Optional[StructureMapResult] = None
    reason_code = "unsupported_language"
    if is_structure_supported_file(file_path):
        summary, reason_code = _summarize_redundant_read(
            file_path,
            offset=offset,
            limit=limit,
            file_tokens_est=tokens_est,
        )
    eligible_structure = bool(summary and summary.eligible and reason_code == "ok")

    if mode in {"shadow", "warn"} or (mode == "soft_block" and not eligible_structure):
        decision = "warn" if mode == "warn" else "allow"
        entry["last_structure_reason"] = reason_code
        entry["last_structure_confidence"] = summary.confidence if summary else 0.0
        store.upsert_file_entry(file_path, entry)
        _log_decision(
            decision,
            file_path,
            f"redundant_read_{entry['read_count']}",
            session_id,
            mode=mode,
            actual_substitution=False,
            eligible=eligible_structure,
            language=language,
            reason_code=reason_code,
            offset=offset,
            limit=limit,
            replacement_type=summary.replacement_type if summary else None,
            file_tokens_est=tokens_est,
            replacement_tokens_est=summary.replacement_tokens_est if summary else 0,
            net_saved_tokens_est=max(0, tokens_est - (summary.replacement_tokens_est if summary else 0)),
            replacement_fingerprint=summary.fingerprint if summary else None,
            repeat_replacement_count=0,
            save_hook_additional_context_enabled=save_hook_context_enabled,
            confidence=summary.confidence if summary else 0.0,
        )
        if not quiet and mode == "warn":
            print(f"[Read Cache] Redundant read allowed in warn mode: {file_path}", file=sys.stderr)
        return

    if eligible_structure and summary is not None:
        if _check_escape_hatch(
            entry, store, file_path, session_id, mode, offset, limit,
            tokens_est, language, True, summary, save_hook_context_enabled, quiet,
        ):
            return

        same_fingerprint = summary.fingerprint == entry.get("last_replacement_fingerprint", "")
        repeat_count = int(entry.get("repeat_replacement_count", 0) or 0) + 1 if same_fingerprint else 1
        entry["last_replacement_fingerprint"] = summary.fingerprint
        entry["last_replacement_type"] = summary.replacement_type
        entry["repeat_replacement_count"] = repeat_count
        entry["last_structure_reason"] = reason_code
        entry["last_structure_confidence"] = summary.confidence
        store.upsert_file_entry(file_path, entry)

        if repeat_count == 1:
            replacement_tokens_est = summary.replacement_tokens_est
            additional_context = _build_structure_message(
                file_path,
                summary,
                max(0, tokens_est - summary.replacement_tokens_est),
            )
            if not _additional_context_within_cap(additional_context, save_hook_context_enabled):
                additional_context = None
                replacement_tokens_est = REASON_ONLY_TOKENS_EST
        else:
            additional_context = None
            replacement_tokens_est = REASON_ONLY_TOKENS_EST

        net_saved_tokens_est = max(0, tokens_est - replacement_tokens_est)
        if repeat_count == 1:
            reason = (
                f"{Path(file_path).name} is unchanged and already in context; "
                f"using {summary.replacement_type} view."
            )
        else:
            reason = _build_reason_only_message(file_path)

        _log_decision(
            "block",
            file_path,
            f"redundant_read_{entry['read_count']}",
            session_id,
            mode=mode,
            actual_substitution=True,
            eligible=True,
            language=language,
            reason_code=f"structure_map_repeat_{repeat_count}",
            offset=offset,
            limit=limit,
            replacement_type=summary.replacement_type,
            file_tokens_est=tokens_est,
            replacement_tokens_est=replacement_tokens_est,
            net_saved_tokens_est=net_saved_tokens_est,
            replacement_fingerprint=summary.fingerprint,
            repeat_replacement_count=repeat_count,
            save_hook_additional_context_enabled=save_hook_context_enabled,
            confidence=summary.confidence,
        )
        _log_savings_event(
            "structure_map",
            net_saved_tokens_est,
            session_id,
            f"{Path(file_path).name}:{summary.replacement_type}:repeat={repeat_count}",
        )
        # v5.0: Structure map beta telemetry
        if _is_v5_structure_map_beta():
            try:
                sys.path.insert(0, str(Path(__file__).resolve().parent))
                from measure import _log_compression_event
                _log_compression_event(
                    feature="structure_map",
                    original_text=" " * (tokens_est * 4),  # proxy
                    compressed_text=summary.replacement_text if summary.replacement_text else "",
                    session_id=session_id,
                    command_pattern=f"Read:{Path(file_path).name}",
                    quality_preserved=True,
                    verified=False,  # we don't know if AI would have used full file
                    detail=f"type={summary.replacement_type} confidence={summary.confidence:.2f} repeat={repeat_count} lang={language}",
                )
            except Exception:
                pass
        if not quiet:
            print(
                f"[Read Cache] Blocked redundant read #{entry['read_count']}: {file_path} "
                f"(mode={mode}, replacement={summary.replacement_type}, repeat={repeat_count}, "
                f"saved~{net_saved_tokens_est:,})",
                file=sys.stderr,
            )
        _emit_pretool_response("deny", reason, additional_context)
        return

    if mode == "block":
        if _check_escape_hatch(
            entry, store, file_path, session_id, mode, offset, limit,
            tokens_est, language, False, summary, save_hook_context_enabled, quiet,
        ):
            return

        store.upsert_file_entry(file_path, entry)
        block_net_saved = max(0, tokens_est - REASON_ONLY_TOKENS_EST)
        _log_decision(
            "block",
            file_path,
            f"redundant_read_{entry['read_count']}",
            session_id,
            mode=mode,
            actual_substitution=False,
            eligible=False,
            language=language,
            reason_code=reason_code,
            offset=offset,
            limit=limit,
            replacement_type=None,
            file_tokens_est=tokens_est,
            replacement_tokens_est=REASON_ONLY_TOKENS_EST,
            net_saved_tokens_est=block_net_saved,
            replacement_fingerprint=None,
            repeat_replacement_count=0,
            save_hook_additional_context_enabled=save_hook_context_enabled,
            confidence=summary.confidence if summary else 0.0,
        )
        # B3: a hard block of a redundant reread (no structure-map replacement)
        # still prevents the full file from re-entering context. Credit the saved
        # tokens as a measured event, mirroring the structure_map path.
        _log_savings_event(
            "redundant_block",
            block_net_saved,
            session_id,
            f"{Path(file_path).name}:redundant_read_{entry['read_count']}",
        )
        reason = (
            f"{Path(file_path).name} is unchanged and already in context; "
            "redundant reread blocked. You can still Edit this file or Read a specific range."
        )
        _emit_pretool_response("deny", reason)
        return


def handle_clear(session_id: str, quiet: bool) -> None:
    """Clear read cache for a session."""

    if session_id and session_id != "all":
        store = _make_store(session_id)
        if store is not None:
            try:
                store.clear_file_entries()
            finally:
                store.close()
        cp = _cache_path(session_id)
        if cp.exists():
            cp.unlink()
        dp = _decisions_log_path(session_id)
        if dp.exists():
            try:
                dp.unlink()
            except OSError:
                pass
        if not quiet:
            print(f"[Read Cache] Cleared cache for session {session_id}", file=sys.stderr)
    elif session_id == "all" and CACHE_DIR.exists():
        for candidate in CACHE_DIR.glob("*.json"):
            candidate.unlink()
        for candidate in CACHE_DIR.glob("*.tmp"):
            try:
                candidate.unlink()
            except OSError:
                pass
        decisions_dir = CACHE_DIR / "decisions"
        if decisions_dir.exists():
            for candidate in decisions_dir.glob("*.jsonl"):
                try:
                    candidate.unlink()
                except OSError:
                    pass
        deleted = cleanup_old_stores()
        if not quiet:
            extra = f", pruned {deleted} old session stores" if deleted else ""
            print(f"[Read Cache] Cleared all caches{extra}", file=sys.stderr)


def handle_invalidate(hook_input: dict[str, Any], quiet: bool) -> None:
    """Invalidate cache entry when a file is edited/written."""

    tool_name = hook_input.get("tool_name", "")
    if tool_name not in ("Edit", "Write", "MultiEdit", "NotebookEdit"):
        return

    tool_input = hook_input.get("tool_input", {})
    raw_path = tool_input.get("file_path", "")
    if not raw_path:
        return

    file_path = str(Path(raw_path).resolve())
    session_id = str(hook_input.get("agent_id") or hook_input.get("session_id") or "unknown")
    store = _make_store(session_id)
    if store is None:
        return

    # U5: resolve the first-read shadow quality proxy (edit-after-shadow-read).
    _resolve_first_read_shadow_on_edit(
        file_path, detect_structure_language(file_path), session_id, store
    )

    try:
        existing = store.get_file_entry(file_path)
        if existing is not None:
            store.delete_file_entry(file_path)
            store.delete_cached_content(file_path)
            if not quiet:
                print(f"[Read Cache] Invalidated: {file_path}", file=sys.stderr)
    except Exception:
        pass


def handle_stats(session_id: str) -> None:
    """Print cache stats for a session."""

    store = _make_store(session_id)
    files = store.get_all_file_entries()
    total_reads = sum(int(entry.get("read_count", 0) or 0) for entry in files.values())
    total_tokens = sum(int(entry.get("tokens_est", 0) or 0) for entry in files.values())

    decisions: dict[str, int] = {}
    reason_codes: dict[str, int] = {}
    replacement_types: dict[str, int] = {}
    eligible_events = 0
    repeat_replacement_events = 0
    structure_tokens_avoided = 0

    log_path = _decisions_log_path(session_id)
    if log_path.exists():
        try:
            for line in log_path.read_text(encoding="utf-8").splitlines():
                try:
                    event = json.loads(line)
                except json.JSONDecodeError:
                    continue
                decision = str(event.get("decision", "") or "")
                decisions[decision] = decisions.get(decision, 0) + 1
                reason_code = str(event.get("reason_code", "") or "")
                if reason_code:
                    reason_codes[reason_code] = reason_codes.get(reason_code, 0) + 1
                replacement_type = event.get("replacement_type")
                if replacement_type:
                    replacement_types[str(replacement_type)] = replacement_types.get(str(replacement_type), 0) + 1
                if bool(event.get("eligible")):
                    eligible_events += 1
                if int(event.get("repeat_replacement_count", 0) or 0) > 1:
                    repeat_replacement_events += 1
                if bool(event.get("actual_substitution")):
                    structure_tokens_avoided += int(event.get("net_saved_tokens_est", 0) or 0)
        except OSError:
            pass

    result = {
        "session_id": session_id,
        "cached_files": len(files),
        "total_reads": total_reads,
        "total_tokens_cached": total_tokens,
        "decisions": decisions,
        "structure": {
            "eligible_events": eligible_events,
            "repeat_replacement_events": repeat_replacement_events,
            "actual_tokens_avoided": structure_tokens_avoided,
            "replacement_types": replacement_types,
            "reason_codes": reason_codes,
        },
    }
    print(json.dumps(result, indent=2))


# ---------------------------------------------------------------------------
# Opt-out detection
# ---------------------------------------------------------------------------

def _is_read_cache_disabled() -> bool:
    """Check if user explicitly disabled read-cache via env var or config file."""

    env_val = os.environ.get("TOKEN_OPTIMIZER_READ_CACHE")
    if env_val == "0":
        return True
    if env_val is None:
        for config_dir in [SNAPSHOT_DIR, CACHE_DIR]:
            config_path = config_dir / "config.json"
            if config_path.exists():
                try:
                    config = json.loads(config_path.read_text(encoding="utf-8"))
                    if config.get("read_cache_enabled") is False:
                        return True
                except (json.JSONDecodeError, OSError, ValueError):
                    pass
    return False


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    args = sys.argv[1:]
    quiet = "--quiet" in args or "-q" in args

    if "--clear" in args:
        session_id = "all"
        for index, arg in enumerate(args):
            if arg == "--session" and index + 1 < len(args):
                session_id = args[index + 1]
        handle_clear(session_id, quiet)
        return

    if "--stats" in args:
        session_id = "unknown"
        for index, arg in enumerate(args):
            if arg == "--session" and index + 1 < len(args):
                session_id = args[index + 1]
        handle_stats(session_id)
        return

    if "--invalidate" in args:
        hook_input = read_stdin_hook_input(1_000_000)
        if not hook_input:
            return
        handle_invalidate(hook_input, quiet)
        return

    if _is_read_cache_disabled():
        return

    mode = os.environ.get("TOKEN_OPTIMIZER_READ_CACHE_MODE", DEFAULT_MODE).lower()
    if mode not in READ_CACHE_MODES:
        mode = DEFAULT_MODE

    hook_input = read_stdin_hook_input(1_000_000)
    if not hook_input:
        return

    tool_name = hook_input.get("tool_name", "")
    if tool_name != "Read":
        if tool_name:
            _log_unexpected_tool(tool_name, quiet)
        return

    # Gate under context pressure (token-saving: suppressed only at critical)
    try:
        from context_pressure import should_inject, get_pressure_level, log_suppression
        sid = hook_input.get("session_id") or ""
        if not should_inject(session_id=sid or None, priority="token-saving"):
            log_suppression("read_cache", get_pressure_level(session_id=sid or None))
            return
    except Exception:
        pass

    handle_read(hook_input, mode, quiet)


if __name__ == "__main__":
    main()
