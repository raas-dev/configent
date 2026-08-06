# Quality Questions — fixed BinEval bank (skill-artifact)

This is the fixed BinEval question bank for evaluating **skill-artifact** quality. Every question is a single yes/no atomic check answered `1` (satisfied) or `0` (violated) with evidence. Deterministic questions (ids `DET-*`) are emitted by `scripts/eval_skill.py --json` — that script is the sole emitter, and they require no model judgment. The llm questions (ids `Q-<DIMENSION>-N`) are answered by `agents/bineval.md` against the skill under test. Questions are grouped under the 5 fixed dimensions: Discovery, Clarity, Structure, Robustness, Completeness. Each dimension caps at 6 **llm** questions (the deterministic count is fixed by the shared contract).

---

## Discovery

Triggers correctly, no false-trigger; description carries purpose + triggers, no process leak (folds principle P2 + axis Discovery).

### Deterministic (source: deterministic, emitted by eval_skill.py)

- `DET-DISCOVERY-NAME-VALID` — critical — "Is name kebab-case, <=64 chars, matching the folder?"
- `DET-DISCOVERY-DESC-PRESENT` — critical — "Is description present, <=1024 chars, free of angle brackets, and a string (not a YAML list)?"
- `DET-DISCOVERY-TRIGGERS` — non-critical — "Does the description contain trigger phrases (e.g. 'Use when ...')?"
- `DET-DISCOVERY-NEG-TRIGGERS` — non-critical — "Does the description contain negative triggers (e.g. 'Do NOT use for ...')?"
- `DET-DISCOVERY-NO-PROCESS-LEAK` — non-critical — "Is the description free of multi-step process/workflow language?"

### LLM (source: llm, answered by agents/bineval.md)

- `Q-DISCOVERY-1` — non-critical — maps to P2 / axis Discovery
  - text: "Does the description state, in one phrase, what the skill actually does (its purpose) rather than only when to use it?"
  - violation_example: "Description reads 'Use when the user mentions invoices.' — it names a trigger but never says the skill parses and validates invoice PDFs."
- `Q-DISCOVERY-2` — non-critical — maps to the pushy description pattern
  - text: "Does the description broaden the trigger surface — 4-5 natural phrasings a user might actually say, and/or a clause like 'even if the user doesn't explicitly say \"<canonical term>\"'?"
  - violation_example: "Description triggers only on the single canonical term 'dashboard', with no variations ('chart', 'metrics view', 'display our data'), so the skill never fires when the user phrases it any other way."

---

## Clarity

Unambiguous instructions; explains WHY (TWI); one term per concept; imperative voice (P5 + P8 + P9b + axis Clarity).

### Deterministic

(No deterministic questions are emitted for Clarity — all Clarity checks are llm-answered.)

### LLM (source: llm, answered by agents/bineval.md)

- `Q-CLARITY-1` — non-critical — maps to P5 (TWI "why")
  - text: "Does each critical instruction explain WHY it matters, not just WHAT to do?"
  - violation_example: "Step says 'Do not round prices' with no reason, so the agent rounds anyway on an edge case it judges harmless."
- `Q-CLARITY-2` — non-critical — maps to P8 (one term per concept)
  - text: "Is a single term used consistently for each concept (no synonym drift like template/boilerplate/scaffold for the same thing)?"
  - violation_example: "The body calls the same artifact 'template', then 'boilerplate', then 'scaffold', forcing the agent to guess whether they are the same object."
- `Q-CLARITY-3` — non-critical — maps to P9b (no rubber words)
  - text: "Are instructions free of vague modifiers ('usually', 'as needed', 'periodically') and instead state measurable criteria?"
  - violation_example: "'Periodically re-check the data' gives no measurable trigger, so the agent never re-checks."
- `Q-CLARITY-4` — non-critical — maps to P9b (one action, no negation tangle) / axis Clarity
  - text: "Are instructions unambiguous, free of tangled multi-condition negations a model could interpret two ways?"
  - violation_example: "'Do X unless not Y, except when Z' leaves the agent to pick an interpretation at random."
- `Q-CLARITY-5` — non-critical — maps to P9b (imperative voice)
  - text: "Are instructions phrased as imperative commands ('Extract the data') rather than descriptive prose ('the data should be extracted')?"
  - violation_example: "Steps are written as 'you should usually consider extracting', which reads as a suggestion the agent can skip."
- `Q-CLARITY-6` — non-critical — maps to P10 (no nuance / exemption clauses)
  - text: "Are the rules free of nuance and exemption clauses ('don't X unless…', 'this doesn't apply to…'), with real exceptions expressed as separate conditionals keyed to observable predicates?"
  - violation_example: "'Never restate the spec unless it adds clarity.' — the 'unless' reopens the negotiation, so the agent restates the spec and calls it clarifying."

---

## Structure

SKILL.md is a map (MOC), token budget respected, references at most 1 level deep, progressive disclosure (P3 + axis Efficiency).

### Deterministic

- `DET-STRUCT-SKILLMD-EXISTS` — critical — "Does SKILL.md exist?"
- `DET-STRUCT-FRONTMATTER-VALID` — critical — "Is the YAML frontmatter present and valid?"
- `DET-STRUCT-NO-README` — non-critical — "Is there no README.md inside the skill?"
- `DET-STRUCT-NO-CHANGELOG` — non-critical — "Is there no CHANGELOG.md inside the skill?"
- `DET-STRUCT-REFS-DEPTH` — non-critical — "Are references nested at most 1 level deep?"
- `DET-STRUCT-BODY-LENGTH` — non-critical — "Is the SKILL.md body at most 500 lines?"
- `DET-STRUCT-HEADERS` — non-critical — "Does the body have at least 2 section headers?"
- `DET-STRUCT-MOC` — non-critical — "Is the body a map (not a long prose dump with few section anchors)?"

### LLM (source: llm, answered by agents/bineval.md)

- `Q-STRUCT-1` — non-critical — maps to P3 (MOC / progressive disclosure)
  - text: "Does SKILL.md delegate heavy detail to references/ instead of inlining it, keeping the body a navigable map?"
  - violation_example: "A 400-line procedure is pasted inline in SKILL.md with no pointer to a references/ file."
- `Q-STRUCT-2` — non-critical — maps to P3 (loading triggers for references)
  - text: "Are the reference pointers directive — stating WHEN to read each file and, for skills with 2 or more references, what NOT to load for a given task — rather than a flat 'file — purpose' list?"
  - violation_example: "The References section is a bare list ('docx-js.md - for creating documents, ooxml.md - for editing'), so the agent either loads all of them or none."

---

## Robustness

Handles edge cases; pre-flight checks; scripts error-handle; no secrets/env/keys in SKILL.md (P1 + P9a + axis Robustness).

### Deterministic

- `DET-ROBUST-NO-SECRETS` — critical — "Is SKILL.md free of secrets/env/keys (API keys, exported env vars)?"
- `DET-ROBUST-NO-USERPATHS` — non-critical — "Is SKILL.md free of user-absolute paths (/home/<user>, /Users/<user>)?"
- `DET-ROBUST-SCRIPTS-NONEMPTY` — non-critical — "Are all bundled scripts non-empty?"

### LLM (source: llm, answered by agents/bineval.md)

- `Q-ROBUST-1` — non-critical — maps to P1 (pre-flight check)
  - text: "Does the skill specify a pre-flight check (required tools/env/files) and tell the agent to stop and report when something is missing?"
  - violation_example: "The skill calls `gh pr status` with no check that `gh` exists, so on a machine without it the agent improvises a substitute."
- `Q-ROBUST-2` — non-critical — maps to axis Robustness (edge cases)
  - text: "Does the skill name concrete edge cases or failure modes and tell the agent how to handle them?"
  - violation_example: "The skill covers only the happy path; when the input file is absent there is no instruction, so the agent fabricates data."
- `Q-ROBUST-3` — non-critical — maps to axis Robustness (scripts error-handle)
  - text: "Do bundled scripts handle errors and return descriptive stdout/stderr on failure rather than failing silently? (If the skill bundles no scripts, answer 1 — vacuously satisfied.)"
  - violation_example: "A bundled script exits 0 with empty output when its input is malformed, hiding the failure from the caller."
- `Q-ROBUST-4` — non-critical — maps to the time-rot anti-pattern
  - text: "Is the skill free of time-sensitive language ('before/after <date>', 'the new API', 'currently') that rots, with legacy information separated from the current path (e.g. in a collapsed details block)?"
  - violation_example: "'If you're doing this before August 2025, use the old API.' — a year later the agent cannot tell which branch is current."

---

## Completeness

Covers the stated use cases; written from real practice; inline checklists at risk points (P4 + P7 + axis Completeness).

### Deterministic

- `DET-COMPLETE-NO-TODO` — non-critical — "Is the body free of [TODO] placeholders?"

### LLM (source: llm, answered by agents/bineval.md)

- `Q-COMPLETE-1` — non-critical — maps to axis Completeness (covers use cases)
  - text: "Does the skill cover every use case its description claims to handle, with no triggered scenario left without instructions?"
  - violation_example: "Description promises 'review and package skills' but the body has no packaging steps."
- `Q-COMPLETE-2` — non-critical — maps to P4 (fresh-practitioner author)
  - text: "Does the skill read as written from real practice — concrete examples, real edge cases — rather than abstract from-memory prose?"
  - violation_example: "Every example is a synthetic 'Acme Corp' placeholder and the 'Common Mistakes' section is empty or generic."
- `Q-COMPLETE-3` — non-critical — maps to P7 (inline checklists at risk points)
  - text: "Are short checklists placed inline at the risk step rather than collected in one section at the end of the document?"
  - violation_example: "All quality checks live in a 'QA' section at the bottom; the agent finishes the steps above and never reaches it."
- `Q-COMPLETE-4` — non-critical — maps to P9 (E:A:R — no Redundant content)
  - text: "Is the skill free of Redundant content — sections explaining what the model already knows (basic concepts, common library usage, generic best practices)?"
  - violation_example: "The body opens with a 'What is JSON' section and a tutorial on standard `requests` usage, spending tokens on knowledge the model already has."

---

## Scoring & gate

- Per-dimension `S_d` = mean of that dimension's answers, in [0,1].
- Overall `S` = (1/N) * sum of all answers across dimensions.
- Display bands: `S>=0.90` production-ready · `0.70-0.89` solid · `0.50-0.69` needs-work · `<0.50` rewrite. Optional 50-pt display = `round(S*50)`.
- GATE = every CRITICAL question (deterministic + critical bank questions) answered `1`. The gate is the pass criterion, not the scalar; subjective llm questions are non-critical by design.

bank-version: 1.1
