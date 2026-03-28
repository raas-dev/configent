# Architectural Patterns for Skills

Five reusable patterns. Most skills use one as primary and borrow elements from others. Choose based on what the skill actually does, not what sounds impressive.

## Pattern 1: Sequential Workflow

**Best for:** onboarding, pipelines, multi-step processes.

**Why this pattern:** When steps have dependencies (Step 2 needs Step 1's output), explicit ordering prevents the agent from skipping ahead or parallelizing things that shouldn't be parallel. Without it, the agent will try to be "smart" and reorder steps, often breaking the flow.

```markdown
## Step 1: [Action]
Call tool/script. Expected output: [describe success].

## Step 2: [Action]
Depends on Step 1 output. If [condition], skip to Step 3.

## Step 3: [Action]
Validate result. On failure: [rollback instructions].
```

**Key:** explicit ordering, dependencies between steps, validation at each stage, rollback on failure.

## Pattern 2: Iterative Refinement

**Best for:** content generation, report creation, quality-sensitive output.

**Why this pattern:** First-pass output is rarely good enough for quality-sensitive tasks. Without an explicit iteration loop with criteria, the agent either stops too early ("good enough") or loops forever. The iteration cap prevents runaway costs.

```markdown
## Draft
Generate initial output.

## Quality Check
Run `scripts/validate.py`. Criteria:
- [ ] Required sections present
- [ ] Data validated
- [ ] Formatting consistent

## Refine
Address each issue. Re-validate. Repeat until all criteria pass.
Max iterations: 3. If still failing, report issues to user.
```

**Key:** explicit quality criteria, iteration cap, validation scripts.

## Pattern 3: Context-Aware Selection

**Best for:** same goal achievable through different tools/approaches.

**Why this pattern:** The agent defaults to its first idea. Without a decision tree, it will pick whatever approach it "feels" is right, which varies across sessions. This pattern ensures consistent tool/approach selection based on actual input characteristics.

```markdown
## Decision Tree
- If [condition A]: use approach X (see references/approach-x.md)
- If [condition B]: use approach Y
- Default: use approach Z

## Execute
Follow selected approach. Explain choice to user.
```

**Key:** clear decision criteria, transparency about choices, fallback options.

## Pattern 4: Domain Intelligence

**Best for:** compliance, specialized knowledge, expert systems.

**Why this pattern:** Domain rules must be checked before action, not after. The agent naturally wants to "do the thing" first and check rules later — which means violations get committed before they're caught. Pre-check forces the right order.

```markdown
## Pre-check
Apply domain rules before acting:
- Rule 1: [check]
- Rule 2: [check]
If any fail: flag for review, do NOT proceed.

## Execute
Only if pre-check passed.

## Audit Trail
Log all decisions and checks.
```

**Key:** domain expertise in logic, compliance before action, documentation.

## Pattern 5: Multi-Service Coordination

**Best for:** workflows spanning multiple MCPs/APIs.

**Why this pattern:** When data flows across services, partial failures create inconsistent state. Phase separation with validation between phases ensures you don't create half an entity in Service B when Service A already succeeded. Without it, error recovery becomes impossible.

```markdown
## Phase 1: [Service A]
Fetch/create in Service A. Store result.

## Phase 2: [Service B]
Use Service A output. Create in Service B.
Validate before proceeding.

## Phase 3: [Notification]
Notify relevant channels with summary.
```

**Key:** clear phase separation, data passing between services, validation between phases.

---

## Anti-patterns

These are the failure modes that actually happen in practice. If you see them in a skill, fix them.

| Anti-pattern | Why it fails | Fix |
|-------------|-------------|-----|
| **Wall of text** | Agent skims paragraphs, misses critical detail | Break into numbered steps with clear actions |
| **Assumed context** | "Use the standard approach" — standard to whom? | Define every term, link every reference |
| **Synonym cycling** | template/boilerplate/scaffold for same concept | Pick one term, use it everywhere |
| **Hidden prerequisites** | Required tools/envs not mentioned until step 5 | List all prerequisites upfront |
| **Description as manual** | Workflow in description → agent skips body entirely | Description = triggers only. Process lives in body |
