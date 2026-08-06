# BinEval Method

Atomic binary evaluation: decompose a target into requirements, ask one yes/no question per criterion, answer each 1/0 **with evidence**, aggregate to a score in `[0,1]`. Replaces holistic numeric scoring (old 5-axis 1-10, comparator 1-5 rubric) with interpretable, auditable judgments.

Source: *"Ask, Don't Judge: Binary Questions for Interpretable LLM Evaluation and Self-Improvement"* (arXiv 2606.27226).

## Two-step meta-prompt (generated questions)

Generate questions in two passes — never write questions straight from raw intuition.

1. **Summarize → requirements.** Turn the target (a skill, or an eval output) into an explicit set `R = {r1..rK}`, each a distinct, checkable criterion. One requirement = one idea.
2. **Decompose → binary questions.** For each requirement emit `>=1` yes/no question where **"yes" = satisfied, "no" = violated**. Pair each question with a concise `violation_example` — the concrete "no" case. Tag `dimension` and `requirement_id`.

A good question is answerable from the artifact alone, has an unambiguous yes/no, and tests exactly one thing.

## Binary evaluation

Each question gets, in this order:
- `explanation`: the critique — evidence grounding the answer (quote a line, cite a count, name the missing section). Written and emitted BEFORE the answer, so the judge articulates its assessment before committing to a verdict. Evidence is mandatory; an answer without evidence is not auditable.
- `answer`: `1` (yes/satisfied) or `0` (no/violated) — no middle values.

Deterministic checks come from `scripts/eval_skill.py --json` (the sole emitter, ids `DET-*`). LLM-judged questions come from the two-step meta-prompt (`source: "llm"`).

## Scoring

- Per-dimension: `S_d = mean(answers in dimension d)`, in `[0,1]`.
- Overall: `S = (1/N) * sum(all answers)`, where `N` = total questions.

Display bands:

| S | display |
|------|---------|
| `>= 0.90` | production-ready |
| `0.70–0.89` | solid |
| `0.50–0.69` | needs-work |
| `< 0.50` | rewrite |

Optional 50-pt display = `round(S * 50)`.

## The GATE

`gate_passed = every CRITICAL question answered 1` (deterministic criticals + critical bank questions).

The GATE — not the scalar `S` — is the pass criterion. A skill can score `S = 0.88` and still fail the gate if one critical question is `0`. Report both, but block on the gate.

**The ORCHESTRATOR computes the overall score and the gate**, after the judge returns its answers. The judge emits only `questions[]` (each with the critique before the 1/0 answer), `dimension_scores`, and `failing[]`.

**NEVER pass acceptance thresholds or GATE criteria into judge prompts** — a judge that knows the bar is biased toward it, nudging borderline answers to whichever side clears the threshold. Aggregation is a separate step from judgment precisely so the judgment stays uncontaminated.

## Judge calibration (automatic, no human labels)

Calibrate the question bank against a second, independent judge from a **different model family**. No human labels anywhere in this loop — the two judges calibrate the questions, not each other.

- **Channel.** Run the second judge through `codex exec` with a GPT model. Fallback: any API access to a non-Anthropic model (e.g. OpenRouter). Same artifact, same question bank, same prompt — only the model family differs.
- **Metric.** Per-question agreement between the two judges. Compare answers question by question; never average them into one score.
- **What a disagreement means.** On binary rubrics, judges from different families converge on the same answers (Prosa, arXiv 2605.01630; CheckEval, arXiv 2403.18771). So a question where the judges disagree **stably** — the disagreement reproduces across 2 runs — is a badly worded question, not a dispute between judges. Send it back for rewording in `references/quality-questions.md`; splitting the difference or averaging the two answers hides the defect that produced them.
- **Self-preference rule.** A judge scores models from its own family higher, and the bias survives the binary paradigm (arXiv 2604.06996). When accepting a skill version as final, at least one judge must come from outside the family of the model that wrote the edits.

## Variance discipline

An LLM judge drifts run to run on unchanged input. In Grafana's production skill-authoring loop a 0–100 judge swings 7–10 points — "local 94 commonly lands at CI 85" — which is enough to manufacture an improvement that never happened.

- **Two consecutive runs, or it didn't happen.** Accept an improvement on a non-critical question only when it reproduces in 2 consecutive runs. One flip is noise until it repeats.
- **Same standard on the reject side.** A held-out assertion that flips pass→fail counts as a regression only when the flip reproduces in 2 consecutive runs of that cell (Held-out gate, condition (a)).
- Critical questions are exempt in the blocking direction only: a critical `0` fails the GATE on the spot. It is the *improvement* claim that has to earn a second confirming run.

## Gated self-update loop (Mode 2 IMPROVE)

Borrowed from SkillOpt (microsoft/SkillOpt): treat the skill document as trainable state, but accept an edit only when it survives evidence the editor never saw. Without this, edits are accepted by the same evals that produced them — which optimizes the skill for the test, not the task.

1. Freeze the train/held-out split (once per session).
2. Run ALL evals → grade → collect `failing[]`.
3. Note-taker turns TRAIN failing questions + explanations into generalized, deduped lessons.
4. Apply a bounded set of edits (see Edit budget).
5. Re-run ALL evals → the orchestrator applies the gate to the returned answers → record case transitions.

**Terminate** when train `failing[]` (or its critical subset) is empty, OR after 3 iterations. The cap is not arbitrary: checklist-guided refinement plateaus and then degrades past the 3rd–4th pass (STICK, arXiv 2410.03608) — later iterations edit for the sake of editing. Keep the best ACCEPTED version by `(held-out pass-rate, then train pass-rate)`. **Revert any edit that introduces a NEW failing question** — under the gate this is automatic for critical questions (condition c) and advisory for the rest.

### Held-out gate

Split the eval set once per session with `scripts/split_evals.py` (deterministic: fixed seed, items sorted by id, stratified by the optional `category` field). Freeze the split to `split.json` in the workspace BEFORE looking at any results, and never re-split afterwards — choosing a split after seeing scores is choosing the answer.

Discipline: lessons and edits are formed from TRAIN transcripts and gradings only. Held-out grading files are opened exactly once per iteration — at the accept/reject step. The directories are flat, so nothing enforces this technically; the rule is the enforcement.

**Accept a candidate iff all three hold:**

- **(a) No held-out regression.** No held-out assertion flips pass→fail versus the parent version. Assertion-level, not aggregate — an aggregate score can hide a regression compensated by an improvement elsewhere. Single runs are noisy: a flip counts only once it reproduces in 2 consecutive runs of that cell (see Variance discipline).
- **(b) Train strictly improves.** Train pass-rate must exceed the parent's — otherwise the edits didn't do their job.
- **(c) No new critical failure.** No NEW failing critical BinEval question (the GATE above still applies).

Why not "strict improvement on held-out" (the original SkillOpt criterion)? With 5–8 held-out cases, edits formed from train failures will often have nothing to fix on held-out — demanding held-out gains at that scale measures luck, not overfit. Held-out is the tripwire against regressions, not the scoreboard.

### Edit budget

At most **3 atomic edits** per iteration. Atomic = one coherent lesson applied in one place: a rule, a paragraph, a table row. An edit that touches a SKILL.md line AND its expanded entry in references/ for the same lesson counts as one. Label each edit with its lesson.

No wholesale rewrites. With ≤3 edits, a gate rejection is attributable: drop one edit, re-run, and the culprit is visible. A rewritten skill that fails the gate teaches nothing.

### Case transitions

Diff the parent's and candidate's grading assertion-by-assertion into four categories:

| Category | Parent → Candidate | Meaning |
|---|---|---|
| improved | fail → pass | the edit worked |
| regressed | pass → fail | warning even when the gate passes (train) or reject fuel (held-out) |
| persistent-fail | fail → fail | fuel for the next iteration |
| stable-success | pass → pass | counted, not listed |

Record as the `transitions` block in benchmark.json (see `references/schemas.md`).

## Fixed bank vs generated questions

- **Fixed bank → skill-artifact quality.** Stable, reusable questions (deterministic `DET-*` + curated bank). Use when evaluating the skill itself: structure, discovery, robustness are largely the same across skills, so fixed questions give comparable, repeatable scores.
- **Generated → output quality.** Run the two-step meta-prompt against the eval output, because correctness criteria are task-specific and can't be pre-listed.
- **Hybrid** (`question_source: "hybrid"`): deterministic + the fixed bank — the default for scoring a skill-artifact. Generated questions never mix into artifact scoring; they live in output grading.

## Limitation: over-decomposition

Splitting a target into too many questions inflates objective/structural signal and drowns subjective judgment — many easy "yes" answers swamp the few hard quality calls. Mitigate:
- **Cap** the number of generated questions per requirement and per dimension.
- **Mark subjective questions non-critical**, so the gate hinges on objective, verifiable criteria, not on contestable taste judgments.
