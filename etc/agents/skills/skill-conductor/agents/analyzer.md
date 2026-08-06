# Post-hoc Analyzer Agent

Analyze blind comparison results to understand WHY the winner won and generate improvement suggestions.

## Role

After the blind comparator determines a winner, the Post-hoc Analyzer "unblids" the results by examining the skills and transcripts. The goal is to extract actionable insights: what made the winner better, and how can the loser be improved?

## Inputs

You receive these parameters in your prompt:

- **winner**: "A" or "B" (from blind comparison)
- **winner_skill_path**: Path to the skill that produced the winning output
- **winner_transcript_path**: Path to the execution transcript for the winner
- **loser_skill_path**: Path to the skill that produced the losing output
- **loser_transcript_path**: Path to the execution transcript for the loser
- **comparison_result_path**: Path to the blind comparator's output JSON
- **output_path**: Where to save the analysis results

## Process

### Step 1: Read Comparison Result

1. Read the blind comparator's output at comparison_result_path
2. Note the winning side (A or B), the reasoning, and any scores
3. Understand what the comparator valued in the winning output

### Step 2: Read Both Skills

1. Read the winner skill's SKILL.md and key referenced files
2. Read the loser skill's SKILL.md and key referenced files
3. Identify structural differences:
   - Instructions clarity and specificity
   - Script/tool usage patterns
   - Example coverage
   - Edge case handling

### Step 3: Read Both Transcripts

1. Read the winner's transcript
2. Read the loser's transcript
3. Compare execution patterns:
   - How closely did each follow their skill's instructions?
   - What tools were used differently?
   - Where did the loser diverge from optimal behavior?
   - Did either encounter errors or make recovery attempts?

### Step 4: Analyze Instruction Following

For each transcript, evaluate:

- Did the agent follow the skill's explicit instructions?
- Did the agent use the skill's provided tools/scripts?
- Were there missed opportunities to leverage skill content?
- Did the agent add unnecessary steps not in the skill?

Score instruction following 1-10 and note specific issues.

### Step 5: Identify Winner Strengths

Determine what made the winner better:

- Clearer instructions that led to better behavior?
- Better scripts/tools that produced better output?
- More comprehensive examples that guided edge cases?
- Better error handling guidance?

Be specific. Quote from skills/transcripts where relevant.

### Step 6: Identify Loser Weaknesses

Determine what held the loser back:

- Ambiguous instructions that led to suboptimal choices?
- Missing tools/scripts that forced workarounds?
- Gaps in edge case coverage?
- Poor error handling that caused failures?

### Step 7: Generate Improvement Suggestions

Based on the analysis, produce actionable suggestions for improving the loser skill:

- Specific instruction changes to make
- Tools/scripts to add or modify
- Examples to include
- Edge cases to address

Prioritize by impact. Focus on changes that would have changed the outcome.

### Step 8: Write Analysis Results

Save structured analysis to `{output_path}`.

## Output Format

Write a JSON file with this structure:

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
    "Included validation script that caught formatting errors",
    "Explicit guidance on fallback behavior when OCR fails"
  ],
  "loser_weaknesses": [
    "Vague instruction 'process the document appropriately' led to inconsistent behavior",
    "No script for validation, agent had to improvise and made errors",
    "No guidance on OCR failure, agent gave up instead of trying alternatives"
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
        "Invented own approach instead of following step 3",
        "Missed the 'always validate output' instruction"
      ]
    }
  },
  "improvement_suggestions": [
    {
      "priority": "high",
      "category": "instructions",
      "suggestion": "Replace 'process the document appropriately' with explicit steps: 1) Extract text, 2) Identify sections, 3) Format per template",
      "expected_impact": "Would eliminate ambiguity that caused inconsistent behavior"
    },
    {
      "priority": "high",
      "category": "tools",
      "suggestion": "Add validate_output.py script similar to winner skill's validation approach",
      "expected_impact": "Would catch formatting errors before final output"
    },
    {
      "priority": "medium",
      "category": "error_handling",
      "suggestion": "Add fallback instructions: 'If OCR fails, try: 1) different resolution, 2) image preprocessing, 3) manual extraction'",
      "expected_impact": "Would prevent early failure on difficult documents"
    }
  ],
  "transcript_insights": {
    "winner_execution_pattern": "Read skill -> Followed 5-step process -> Used validation script -> Fixed 2 issues -> Produced output",
    "loser_execution_pattern": "Read skill -> Unclear on approach -> Tried 3 different methods -> No validation -> Output had errors"
  }
}
```

## Guidelines

- **Be specific**: Quote from skills and transcripts, don't just say "instructions were unclear"
- **Be actionable**: Suggestions should be concrete changes, not vague advice
- **Focus on skill improvements**: The goal is to improve the losing skill, not critique the agent
- **Prioritize by impact**: Which changes would most likely have changed the outcome?
- **Consider causation**: Did the skill weakness actually cause the worse output, or is it incidental?
- **Stay objective**: Analyze what happened, don't editorialize
- **Think about generalization**: Would this improvement help on other evals too?

## Categories for Suggestions

Use these categories to organize improvement suggestions:

| Category         | Description                                    |
| ---------------- | ---------------------------------------------- |
| `instructions`   | Changes to the skill's prose instructions      |
| `tools`          | Scripts, templates, or utilities to add/modify |
| `examples`       | Example inputs/outputs to include              |
| `error_handling` | Guidance for handling failures                 |
| `structure`      | Reorganization of skill content                |
| `references`     | External docs or resources to add              |

## Priority Levels

- **high**: Would likely change the outcome of this comparison
- **medium**: Would improve quality but may not change win/loss
- **low**: Nice to have, marginal improvement

---

# Note-taker Mode (Self-update Loop)

In the Mode 2 IMPROVE self-update loop, the analyzer runs as a **Note-taker**. It does not compare two skills. Instead it consumes the `failing[]` array from a single `bineval.json` evaluation and turns raw failing questions into a small set of **generalized, deduped lessons** that drive targeted skill edits.

## Role

The evaluator emits many granular failing questions, several of which describe the same underlying defect from different angles (e.g. "no WHY for step 3", "no WHY for the validation rule", "rationale missing for the fallback"). Feeding each one to the editor separately causes scattered, redundant edits. The Note-taker collapses semantically similar failures into one lesson per root cause, so each edit fixes a class of problems at once.

## Inputs

You receive these parameters in your prompt:

- **bineval_path**: Path to the `bineval.json` produced by the evaluator (read its `failing[]` and `dimension_scores`)
- **skill_path**: Path to the skill being improved
- **iteration**: Current self-update iteration number (1, 2, or 3)
- **prior_lessons_path** (optional): Path to lessons emitted in a previous iteration, to avoid re-proposing reverted or already-applied edits
- **output_path**: Where to save the lessons JSON

## Process

### Step 1: Read Failing Questions

1. Read `bineval.json` at bineval_path
2. Collect every entry in `failing[]` — each has `id`, `dimension`, `text`, `explanation`, `critical`
3. Note `dimension_scores` to see which dimensions are weakest overall

### Step 2: Cluster by Root Cause

Group failing questions that share a root cause, not just a dimension. Two questions belong to the same cluster when fixing one would plausibly fix the other.

Signals that questions belong together:

- Same SKILL.md region or reference file is implicated by their explanations
- They describe the same missing element repeated in different places (missing WHY, missing trigger, missing edge-case handling)
- They are different symptoms of one structural problem (e.g. SKILL.md is a prose dump → causes both "not a map" and "body too long")

Keep deterministic `DET-*` failures as their own clusters when they have a single concrete fix (e.g. `DET-STRUCT-NO-README` → delete the README). Do not merge a critical failure into a non-critical cluster — critical fixes must stay visible.

### Step 3: Generalize Each Cluster into a Lesson

For each cluster, write ONE lesson that:

- States the **generalized defect** (the pattern, not the single instance)
- Names the **concrete fix** (what to change in which file/region)
- Lists the **source question ids** it resolves (so re-evaluation can confirm)
- Carries a **dimension** and a **critical** flag (critical if any clustered question is critical)
- Carries a **priority**: `high` if it closes a critical question or the weakest dimension, else `medium`/`low`

A good lesson is reusable: phrased so it would catch the same defect class on another skill, but paired with a fix specific enough to apply now.

### Step 4: Dedupe Against Prior Lessons

If prior_lessons_path is provided:

- Drop any lesson whose fix was already applied and did NOT clear its source questions (it failed — flag it `recurring` instead of re-proposing the identical edit, and suggest a different approach)
- Drop any lesson whose edit was reverted in a prior iteration because it introduced a NEW failing question (do not re-propose the reverted edit)

### Step 5: Order for Targeted Editing

Sort lessons so the editor applies them in impact order: critical first, then by priority, then by how many questions each closes. This keeps the loop converging on the GATE (all critical questions = 1) before chasing marginal score gains.

### Step 6: Write Lessons

Save lessons to `{output_path}`.

## Output Format

Write a JSON file with this structure:

```json
{
  "iteration": 1,
  "skill_path": "path/to/skill",
  "weakest_dimensions": ["Clarity", "Structure"],
  "lessons": [
    {
      "id": "L1",
      "dimension": "Clarity",
      "defect": "Instructions state WHAT to do but never WHY — agents can't adapt when the literal step doesn't fit",
      "fix": "Add a one-line rationale (TWI) after each imperative step in SKILL.md sections 'Extract' and 'Validate'",
      "resolves": ["Q-CLARITY-2", "Q-CLARITY-4", "Q-CLARITY-7"],
      "critical": false,
      "priority": "high",
      "status": "new"
    },
    {
      "id": "L2",
      "dimension": "Structure",
      "defect": "SKILL.md is a prose dump, not a map — long body with few anchors forces full-file reads",
      "fix": "Split the 'Workflow' prose into a reference file and replace with a 4-bullet MOC linking to it",
      "resolves": ["Q-STRUCT-1", "Q-STRUCT-3", "DET-STRUCT-MOC"],
      "critical": false,
      "priority": "high",
      "status": "new"
    },
    {
      "id": "L3",
      "dimension": "Robustness",
      "defect": "An exported env var sits in a SKILL.md code block",
      "fix": "Remove the export line; reference the variable name only",
      "resolves": ["DET-ROBUST-NO-SECRETS"],
      "critical": true,
      "priority": "high",
      "status": "new"
    }
  ]
}
```

`status` is one of: `new`, `recurring` (proposed before, prior fix did not clear it — try a different approach), `reverted` (prior edit was rolled back; do not repeat).

## Guidelines

- **One lesson per root cause**: merge semantically similar failures; never emit one lesson per failing question
- **Generalize, then specialize**: the `defect` is the reusable pattern, the `fix` is the concrete edit for this skill
- **Traceability**: every lesson lists the `resolves` ids so re-evaluation can verify the failures cleared
- **Critical stays critical**: never bury a critical failure inside a non-critical cluster; gate-closing lessons rank first
- **Surgical fixes**: each `fix` touches only what the defect requires — a lesson that triggers a broad rewrite is too coarse, split it
- **Respect the loop's exit**: when `failing[]` is empty, emit zero lessons; the loop terminates
- **No redundant edits**: honor prior_lessons_path — never re-propose a reverted edit or repeat a fix that already failed

---

# Analyzing Benchmark Results

When analyzing benchmark results, the analyzer's purpose is to **surface patterns and anomalies** across multiple runs, not suggest skill improvements.

## Role

Review all benchmark run results and generate freeform notes that help the user understand skill performance. Focus on patterns that wouldn't be visible from aggregate metrics alone.

## Inputs

You receive these parameters in your prompt:

- **benchmark_data_path**: Path to the in-progress benchmark.json with all run results
- **skill_path**: Path to the skill being benchmarked
- **output_path**: Where to save the notes (as JSON array of strings)

## Process

### Step 1: Read Benchmark Data

1. Read the benchmark.json containing all run results
2. Note the configurations tested (with_skill, without_skill)
3. Understand the run_summary aggregates already calculated

### Step 2: Analyze Per-Assertion Patterns

For each expectation across all runs:

- Does it **always pass** in both configurations? (may not differentiate skill value)
- Does it **always fail** in both configurations? (may be broken or beyond capability)
- Does it **always pass with skill but fail without**? (skill clearly adds value here)
- Does it **always fail with skill but pass without**? (skill may be hurting)
- Is it **highly variable**? (flaky expectation or non-deterministic behavior)

### Step 3: Analyze Cross-Eval Patterns

Look for patterns across evals:

- Are certain eval types consistently harder/easier?
- Do some evals show high variance while others are stable?
- Are there surprising results that contradict expectations?

### Step 4: Analyze Metrics Patterns

Look at time_seconds, tokens, tool_calls:

- Does the skill significantly increase execution time?
- Is there high variance in resource usage?
- Are there outlier runs that skew the aggregates?

### Step 5: Generate Notes

Write freeform observations as a list of strings. Each note should:

- State a specific observation
- Be grounded in the data (not speculation)
- Help the user understand something the aggregate metrics don't show

Examples:

- "Assertion 'Output is a PDF file' passes 100% in both configurations - may not differentiate skill value"
- "Eval 3 shows high variance (50% ± 40%) - run 2 had an unusual failure that may be flaky"
- "Without-skill runs consistently fail on table extraction expectations (0% pass rate)"
- "Skill adds 13s average execution time but improves pass rate by 50%"
- "Token usage is 80% higher with skill, primarily due to script output parsing"
- "All 3 without-skill runs for eval 1 produced empty output"

### Step 6: Write Notes

Save notes to `{output_path}` as a JSON array of strings:

```json
[
  "Assertion 'Output is a PDF file' passes 100% in both configurations - may not differentiate skill value",
  "Eval 3 shows high variance (50% ± 40%) - run 2 had an unusual failure",
  "Without-skill runs consistently fail on table extraction expectations",
  "Skill adds 13s average execution time but improves pass rate by 50%"
]
```

## Guidelines

**DO:**

- Report what you observe in the data
- Be specific about which evals, expectations, or runs you're referring to
- Note patterns that aggregate metrics would hide
- Provide context that helps interpret the numbers

**DO NOT:**

- Suggest improvements to the skill (that's for the improvement step, not benchmarking)
- Make subjective quality judgments ("the output was good/bad")
- Speculate about causes without evidence
- Repeat information already in the run_summary aggregates
