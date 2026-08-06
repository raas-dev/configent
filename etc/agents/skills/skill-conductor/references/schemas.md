# JSON Schemas

This document defines the JSON schemas used by skill-conductor.

---

## evals.json

Defines the evals for a skill. Located at `evals/evals.json` within the skill directory.

```json
{
  "skill_name": "example-skill",
  "evals": [
    {
      "id": 1,
      "prompt": "User's example prompt",
      "expected_output": "Description of expected result",
      "files": ["evals/files/sample1.pdf"],
      "expectations": ["The output includes X", "The skill used script Y"]
    }
  ]
}
```

**Fields:**

- `skill_name`: Name matching the skill's frontmatter
- `evals[].id`: Unique integer identifier
- `evals[].prompt`: The task to execute
- `evals[].expected_output`: Human-readable description of success
- `evals[].files`: Optional list of input file paths (relative to skill root)
- `evals[].expectations`: List of verifiable statements
- `evals[].category`: (additive, optional) Free-form stratum label (e.g. `"guard"`, `"saturated"`, `"core"`, `"hard-new"`) used by `scripts/split_evals.py` to stratify the train/held-out split

---

## history.json

Tracks version progression in Improve mode. Located at workspace root.

```json
{
  "started_at": "2026-01-15T10:30:00Z",
  "skill_name": "pdf",
  "current_best": "v2",
  "iterations": [
    {
      "version": "v0",
      "parent": null,
      "expectation_pass_rate": 0.65,
      "grading_result": "baseline",
      "is_current_best": false
    },
    {
      "version": "v1",
      "parent": "v0",
      "expectation_pass_rate": 0.75,
      "grading_result": "won",
      "is_current_best": false
    },
    {
      "version": "v2",
      "parent": "v1",
      "expectation_pass_rate": 0.85,
      "grading_result": "won",
      "is_current_best": true
    }
  ]
}
```

**Fields:**

- `started_at`: ISO timestamp of when improvement started
- `skill_name`: Name of the skill being improved
- `current_best`: Version identifier of the best performer
- `iterations[].version`: Version identifier (v0, v1, ...)
- `iterations[].parent`: Parent version this was derived from
- `iterations[].expectation_pass_rate`: Pass rate from grading
- `iterations[].grading_result`: "baseline", "won", "lost", or "tie"
- `iterations[].is_current_best`: Whether this is the current best version

---

## grading.json

Output from the grader agent. Located at `<run-dir>/grading.json`.

```json
{
  "expectations": [
    {
      "text": "The output includes the name 'John Smith'",
      "dimension": "Completeness",
      "evidence": "Found in transcript Step 3: 'Extracted names: John Smith, Sarah Johnson', and summary.md lists it as the primary contact with the matching phone from the input.",
      "passed": true
    },
    {
      "text": "The spreadsheet has a SUM formula in cell B10",
      "dimension": "Robustness",
      "evidence": "No spreadsheet was created. outputs/ contains only report.txt and no spreadsheet tool appears in the transcript.",
      "passed": false
    }
  ],
  "summary": {
    "passed": 2,
    "failed": 1,
    "total": 3,
    "pass_rate": 0.67
  },
  "dimension_scores": {
    "Discovery": { "score": 1.0, "passed": 2, "total": 2 },
    "Clarity": { "score": 1.0, "passed": 1, "total": 1 },
    "Structure": { "score": 1.0, "passed": 3, "total": 3 },
    "Robustness": { "score": 0.5, "passed": 1, "total": 2 },
    "Completeness": { "score": 1.0, "passed": 1, "total": 1 }
  },
  "failing": [
    {
      "text": "The spreadsheet has a SUM formula in cell B10",
      "dimension": "Robustness",
      "evidence": "No spreadsheet was created. The output was a text file."
    }
  ],
  "execution_metrics": {
    "tool_calls": {
      "Read": 5,
      "Write": 2,
      "Bash": 8
    },
    "total_tool_calls": 15,
    "total_steps": 6,
    "errors_encountered": 0,
    "output_chars": 12450,
    "transcript_chars": 3200
  },
  "timing": {
    "executor_duration_seconds": 165.0,
    "grader_duration_seconds": 26.0,
    "total_duration_seconds": 191.0
  },
  "claims": [
    {
      "claim": "The form has 12 fillable fields",
      "type": "factual",
      "verified": true,
      "evidence": "Counted 12 fields in field_info.json"
    }
  ],
  "user_notes_summary": {
    "uncertainties": ["Used 2023 data, may be stale"],
    "needs_review": [],
    "workarounds": ["Fell back to text overlay for non-fillable fields"]
  },
  "eval_feedback": {
    "suggestions": [
      {
        "assertion": "The output includes the name 'John Smith'",
        "reason": "A hallucinated document that mentions the name would also pass"
      }
    ],
    "overall": "Assertions check presence but not correctness."
  }
}
```

**Fields:**

- `expectations[]`: Graded expectations with evidence. Framed as GENERATED binary yes/no questions (via the two-step Summarize→Decompose meta-prompt). Backward-compatible fields `text`, `passed`, `evidence` are retained; **`dimension`** (one of the 5 dimensions) is added to each entry. Field order is critique-before-verdict: `evidence` (the detailed critique citing concrete evidence) is written and emitted BEFORE `passed`, so the grader articulates its assessment before committing to a decision.
- `summary`: Aggregate pass/fail counts
- `dimension_scores`: (additive) Per-dimension `{ score, passed, total }`, where `score` = mean of that dimension's binary answers in [0,1]
- `failing[]`: (additive) The subset of expectations answered "no" (`passed: false`), each with `text`, `dimension`, `evidence`
- `execution_metrics`: Tool usage and output size (from executor's metrics.json)
- `timing`: Wall clock timing (from timing.json)
- `claims`: Extracted and verified claims from the output
- `user_notes_summary`: Issues flagged by the executor
- `eval_feedback`: (optional) Improvement suggestions for the evals, only present when the grader identifies issues worth raising

The `dimension`, `dimension_scores`, and `failing[]` fields are purely additive — the eval-viewer continues to read `expectations[]`, `claims`, and `eval_feedback` unchanged.

---

## bineval.json

Output from BinEval evaluation (`agents/bineval.md` emits it). Located at `<run-dir>/bineval.json`.

BinEval replaces numeric/holistic quality scoring with atomic binary yes/no questions per dimension. Each question carries a critique (`explanation`) written BEFORE the `1`/`0` `answer`, then the answers are aggregated to a score in [0,1]. The emitting agent writes `questions[]`, `dimension_scores`, and `failing[]`; the ORCHESTRATOR adds `overall` (see below).

```json
{
  "target": "skill-artifact",
  "skill_name": "pdf",
  "skill_path": "/path/to/pdf",
  "eval_id": null,
  "question_source": "hybrid",
  "requirements": [
    { "id": "R1", "dimension": "Clarity", "text": "Instructions explain WHY each step matters" }
  ],
  "questions": [
    {
      "id": "DET-STRUCT-SKILLMD-EXISTS",
      "dimension": "Structure",
      "requirement_id": null,
      "text": "Does SKILL.md exist?",
      "violation_example": "The skill directory has no SKILL.md file.",
      "source": "deterministic",
      "critical": true,
      "explanation": "SKILL.md found at the skill root.",
      "answer": 1
    },
    {
      "id": "Q-CLARITY-1",
      "dimension": "Clarity",
      "requirement_id": "R1",
      "text": "Does the body explain WHY the validation step matters?",
      "violation_example": "Step says 'run validate.py' with no rationale.",
      "source": "llm",
      "critical": false,
      "explanation": "Step 4 says 'run validate.py' and stops there; nothing in the body or references/ says what the validator catches or what breaks when it is skipped, so a reader cannot judge whether the step is optional.",
      "answer": 0
    }
  ],
  "dimension_scores": {
    "Discovery": { "score": 1.0, "passed": 4, "total": 4 },
    "Clarity": { "score": 0.75, "passed": 3, "total": 4 },
    "Structure": { "score": 1.0, "passed": 8, "total": 8 },
    "Robustness": { "score": 1.0, "passed": 5, "total": 5 },
    "Completeness": { "score": 0.83, "passed": 5, "total": 6 }
  },
  "overall": {
    "score": 0.86,
    "passed": 25,
    "total": 27,
    "display": "solid",
    "gate_passed": true
  },
  "failing": [
    {
      "id": "Q-CLARITY-1",
      "dimension": "Clarity",
      "text": "Does the body explain WHY the validation step matters?",
      "explanation": "The validation step is listed but never motivated.",
      "critical": false
    }
  ]
}
```

**Fields:**

- `target`: `"skill-artifact"` (evaluating a skill's files) or `"output"` (evaluating an eval run's output)
- `skill_name` / `skill_path`: Identify the evaluated skill
- `eval_id`: Eval id when `target` is `"output"`, otherwise `null`
- `question_source`: `"hybrid"` (deterministic + fixed bank — skill-artifact scoring), `"fixed"` (bank only), or `"generated"` (per-task questions — output grading)
- `requirements[]`: Explicit criteria from the two-step meta-prompt's Summarize step; each `{ id, dimension, text }`
- `questions[]`: Atomic binary questions
  - `id`: `DET-...` for deterministic records (emitted solely by `scripts/eval_skill.py --json`), or `Q-<DIMENSION>-N` for generated/bank questions
  - `dimension`: One of `Discovery`, `Clarity`, `Structure`, `Robustness`, `Completeness`
  - `requirement_id`: Links to a `requirements[]` id, or `null` for deterministic questions
  - `text`: A single yes/no question
  - `violation_example`: A concrete example of the "no" case
  - `source`: `"deterministic"` or `"llm"`
  - `critical`: Whether a "no" answer fails the gate
  - `explanation`: The critique — evidence grounding the answer. Emitted BEFORE `answer` and written before it
  - `answer`: `1` (yes/satisfied) or `0` (no/violated), committed only after the critique
- `dimension_scores`: Per-dimension `{ score, passed, total }`, where `score` = mean of that dimension's answers in [0,1]
- `overall`: **Filled by the ORCHESTRATOR, not by the emitting agent.** The judge is never told the acceptance criteria, so it cannot bias its answers toward them; the orchestrator computes this block from the returned answers.
  - `score`: `(1/N) * sum(all answers)` in [0,1]
  - `passed` / `total`: Count of `1` answers and total questions
  - `display`: Band — `score>=0.90` "production-ready", `0.70-0.89` "solid", `0.50-0.69` "needs-work", `<0.50` "rewrite" (optional 50-pt display = `round(score*50)`)
  - `gate_passed`: `true` iff EVERY critical question (deterministic + critical bank questions) is answered `1`. The GATE — not the scalar — is the pass criterion.
- `failing[]`: Questions answered `0`, each with `id`, `dimension`, `text`, `explanation`, `critical`

**Comparator variant:** When two skills/outputs are compared (see comparison.json), A and B answer the SAME `questions[]`. The comparator does not re-emit a full bineval.json per side; instead it records each side's `answer` per question and aggregates into the per-dimension `{ A, B, agreement }` shape of comparison.json.

---

## metrics.json

Output from the executor agent. Located at `<run-dir>/outputs/metrics.json`.

```json
{
  "tool_calls": {
    "Read": 5,
    "Write": 2,
    "Bash": 8,
    "Edit": 1,
    "Glob": 2,
    "Grep": 0
  },
  "total_tool_calls": 18,
  "total_steps": 6,
  "files_created": ["filled_form.pdf", "field_values.json"],
  "errors_encountered": 0,
  "output_chars": 12450,
  "transcript_chars": 3200
}
```

**Fields:**

- `tool_calls`: Count per tool type
- `total_tool_calls`: Sum of all tool calls
- `total_steps`: Number of major execution steps
- `files_created`: List of output files created
- `errors_encountered`: Number of errors during execution
- `output_chars`: Total character count of output files
- `transcript_chars`: Character count of transcript

---

## timing.json

Wall clock timing for a run. Located at `<run-dir>/timing.json`.

**How to capture:** When a subagent task completes, the task notification includes `total_tokens` and `duration_ms`. Save these immediately — they are not persisted anywhere else and cannot be recovered after the fact.

```json
{
  "total_tokens": 84852,
  "duration_ms": 23332,
  "total_duration_seconds": 23.3,
  "executor_start": "2026-01-15T10:30:00Z",
  "executor_end": "2026-01-15T10:32:45Z",
  "executor_duration_seconds": 165.0,
  "grader_start": "2026-01-15T10:32:46Z",
  "grader_end": "2026-01-15T10:33:12Z",
  "grader_duration_seconds": 26.0
}
```

---

## benchmark.json

Output from Benchmark mode. Located at `benchmarks/<timestamp>/benchmark.json`.

```json
{
  "metadata": {
    "skill_name": "pdf",
    "skill_path": "/path/to/pdf",
    "executor_model": "claude-sonnet-4-20250514",
    "analyzer_model": "most-capable-model",
    "timestamp": "2026-01-15T10:30:00Z",
    "evals_run": [1, 2, 3],
    "runs_per_configuration": 3
  },

  "runs": [
    {
      "eval_id": 1,
      "eval_name": "Ocean",
      "configuration": "with_skill",
      "run_number": 1,
      "result": {
        "pass_rate": 0.85,
        "passed": 6,
        "failed": 1,
        "total": 7,
        "time_seconds": 42.5,
        "tokens": 3800,
        "tool_calls": 18,
        "errors": 0
      },
      "expectations": [{ "text": "...", "passed": true, "evidence": "..." }],
      "notes": [
        "Used 2023 data, may be stale",
        "Fell back to text overlay for non-fillable fields"
      ]
    }
  ],

  "run_summary": {
    "with_skill": {
      "pass_rate": { "mean": 0.85, "stddev": 0.05, "min": 0.8, "max": 0.9 },
      "time_seconds": {
        "mean": 45.0,
        "stddev": 12.0,
        "min": 32.0,
        "max": 58.0
      },
      "tokens": { "mean": 3800, "stddev": 400, "min": 3200, "max": 4100 }
    },
    "without_skill": {
      "pass_rate": { "mean": 0.35, "stddev": 0.08, "min": 0.28, "max": 0.45 },
      "time_seconds": { "mean": 32.0, "stddev": 8.0, "min": 24.0, "max": 42.0 },
      "tokens": { "mean": 2100, "stddev": 300, "min": 1800, "max": 2500 }
    },
    "delta": {
      "pass_rate": "+0.50",
      "time_seconds": "+13.0",
      "tokens": "+1700"
    }
  },

  "notes": [
    "Assertion 'Output is a PDF file' passes 100% in both configurations - may not differentiate skill value",
    "Eval 3 shows high variance (50% ± 40%) - may be flaky or model-dependent",
    "Without-skill runs consistently fail on table extraction expectations",
    "Skill adds 13s average execution time but improves pass rate by 50%"
  ]
}
```

**Fields:**

- `metadata`: Information about the benchmark run
  - `skill_name`: Name of the skill
  - `timestamp`: When the benchmark was run
  - `evals_run`: List of eval names or IDs
  - `runs_per_configuration`: Number of runs per config (e.g. 3)
- `runs[]`: Individual run results
  - `eval_id`: Numeric eval identifier
  - `eval_name`: Human-readable eval name (used as section header in the viewer)
  - `configuration`: Must be `"with_skill"` or `"without_skill"` (the viewer uses this exact string for grouping and color coding)
  - `run_number`: Integer run number (1, 2, 3...)
  - `result`: Nested object with `pass_rate`, `passed`, `total`, `time_seconds`, `tokens`, `errors`
- `run_summary`: Statistical aggregates per configuration
  - `with_skill` / `without_skill`: Each contains `pass_rate`, `time_seconds`, `tokens` objects with `mean` and `stddev` fields
  - `delta`: Difference strings like `"+0.50"`, `"+13.0"`, `"+1700"`
- `notes`: Freeform observations from the analyzer
- `transitions`: (additive, optional) Assertion-level diff between two skill versions, produced by the gated self-update loop (Mode 2 Step 3). The viewer ignores it.

```json
"transitions": {
  "parent_version": "v3.1",
  "candidate_version": "v3.2",
  "improved": [{ "eval_id": 8, "text": "Rewrite is >=20% shorter than the original" }],
  "regressed": [],
  "persistent_fail": [{ "eval_id": 2, "text": "..." }],
  "stable_success_count": 47
}
```

  - `improved` / `regressed` / `persistent_fail`: Lists of `{ eval_id, text }` where `text` is the assertion. `regressed` on a held-out eval means the candidate should have been rejected.
  - `stable_success_count`: Count only — the list would be long and uninformative.

**Important:** The viewer reads these field names exactly. Using `config` instead of `configuration`, or putting `pass_rate` at the top level of a run instead of nested under `result`, will cause the viewer to show empty/zero values. Always reference this schema when generating benchmark.json manually.

---

## split.json

Frozen train/held-out split for the gated self-update loop. Located at the workspace root (e.g. `<workspace>/iteration-N/split.json`). Written by `scripts/split_evals.py --write`; never edited by hand and never regenerated after results have been seen.

```json
{
  "skill_name": "example-skill",
  "seed": 42,
  "holdout": 0.4,
  "train_ids": [2, 3, 4, 5, 8, 9, 12, 13, 14],
  "heldout_ids": [1, 6, 7, 10, 11, 15],
  "created_at": "2026-07-21T12:00:00+00:00"
}
```

---

## comparison.json

Output from blind comparator (`agents/comparator.md` emits it). Located at `<grading-dir>/comparison-N.json`.

A and B answer the SAME binary yes/no questions, each side's `explanation` (the critique) written and emitted BEFORE its `answer`. There is NO 1-5 rubric and no holistic 1-9 score. The winner is the side with the higher overall yes-rate; ties break on the critical-dimension yes-rate.

```json
{
  "questions": [
    {
      "id": "Q-COMPLETE-1",
      "dimension": "Completeness",
      "text": "Does the output include the date field?",
      "violation_example": "The output omits any date.",
      "critical": false,
      "A": { "explanation": "Date '2026-01-15' present in the header field block, matching the source record.", "answer": 1 },
      "B": { "explanation": "No date in the header, footer, or body; the field was dropped rather than relocated.", "answer": 0 }
    },
    {
      "id": "Q-STRUCT-1",
      "dimension": "Structure",
      "text": "Is the output formatted consistently throughout?",
      "violation_example": "Mixed heading styles and inconsistent indentation.",
      "critical": false,
      "A": { "explanation": "Heading hierarchy runs H1 → H2 → H3 with no skips; spacing is uniform across sections.", "answer": 1 },
      "B": { "explanation": "Heading levels jump from H1 to H3 and list indentation shifts between 2 and 4 spaces.", "answer": 0 }
    }
  ],
  "dimensions": {
    "Discovery": { "A": 1.0, "B": 1.0, "agreement": 1.0 },
    "Clarity": { "A": 1.0, "B": 0.5, "agreement": 0.5 },
    "Structure": { "A": 1.0, "B": 0.0, "agreement": 0.0 },
    "Robustness": { "A": 1.0, "B": 1.0, "agreement": 1.0 },
    "Completeness": { "A": 1.0, "B": 0.0, "agreement": 0.0 }
  },
  "overall": {
    "A": 0.8,
    "B": 0.6
  },
  "winner": "A",
  "decisive_questions": [
    {
      "id": "Q-COMPLETE-1",
      "dimension": "Completeness",
      "text": "Does the output include the date field?",
      "A": 1,
      "B": 0,
      "note": "A satisfies a question B fails — a direct contributor to A's higher yes-rate."
    }
  ],
  "reasoning": "A answers more questions 'yes' (0.8 vs 0.6). It includes the date field and is consistently formatted; B violates both."
}
```

**Fields:**

- `questions[]`: The shared binary questions. Each carries `id`, `dimension`, `text`, `violation_example`, `critical`, and a per-side `{ explanation, answer }` for both `A` and `B` — critique first, verdict second
- `dimensions`: Per-dimension yes-rate for each side plus `agreement` (the fraction of that dimension's questions where A and B gave the same answer)
- `overall`: `{ A, B }` — each side's overall yes-rate across all questions
- `winner`: The side (`"A"` or `"B"`) with the higher `overall` yes-rate; tiebreak = higher yes-rate on the critical dimensions
- `decisive_questions[]`: Questions where the sides diverge and that drive the verdict, each with `A`/`B` answers and a short `note`
- `reasoning`: Brief evidence-grounded summary of the verdict

---

## analysis.json

Output from post-hoc analyzer. Located at `<grading-dir>/analysis.json`.

```json
{
  "comparison_summary": {
    "winner": "A",
    "winner_skill": "path/to/winner/skill",
    "loser_skill": "path/to/loser/skill",
    "comparator_reasoning": "Brief summary of why comparator chose winner"
  },
  "winner_strengths": [
    "Clear step-by-step instructions for handling multi-page documents",
    "Included validation script that caught formatting errors"
  ],
  "loser_weaknesses": [
    "Vague instruction 'process the document appropriately' led to inconsistent behavior",
    "No script for validation, agent had to improvise"
  ],
  "instruction_following": {
    "winner": {
      "score": 9,
      "issues": ["Minor: skipped optional logging step"]
    },
    "loser": {
      "score": 6,
      "issues": [
        "Did not use the skill's formatting template",
        "Invented own approach instead of following step 3"
      ]
    }
  },
  "improvement_suggestions": [
    {
      "priority": "high",
      "category": "instructions",
      "suggestion": "Replace 'process the document appropriately' with explicit steps",
      "expected_impact": "Would eliminate ambiguity that caused inconsistent behavior"
    }
  ],
  "transcript_insights": {
    "winner_execution_pattern": "Read skill -> Followed 5-step process -> Used validation script",
    "loser_execution_pattern": "Read skill -> Unclear on approach -> Tried 3 different methods"
  }
}
```
