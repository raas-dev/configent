---
name: simplify
description: Simplifies code for clarity without changing behavior. Use for readability, maintainability, and complexity reduction after behavior is understood.
---

# Code Simplification

## Overview

Simplify code by reducing complexity while preserving exact behavior. The goal is not fewer lines — it's code that is easier to read, understand, modify, and debug. Every simplification must pass a simple test: "Would a new team member understand this faster than the original?"

## When to Use

- After a feature is working and tests pass, but the implementation feels heavier than it needs to be
- During code review when readability or complexity issues are flagged
- When you encounter deeply nested logic, long functions, or unclear names
- When refactoring code written under time pressure
- When consolidating related logic scattered across files
- After merging changes that introduced duplication or inconsistency

**When NOT to use:**

- Code is already clean and readable — don't simplify for the sake of it
- You don't understand what the code does yet — comprehend before you simplify
- The code is performance-critical and the "simpler" version would be measurably slower
- You're about to rewrite the module entirely — simplifying throwaway code wastes effort

## The Five Principles

### 1. Preserve Behavior Exactly

Every simplification must produce identical runtime behavior:

- Same outputs for same inputs
- Same error handling and edge cases
- Same side effects and state mutations
- Same performance characteristics (or better)

If you cannot verify behavior is preserved (no tests, unclear spec), stop and ask.

### 2. Follow Project Conventions

Match the existing codebase style:

- Import patterns, naming conventions, file organization
- Error handling patterns and logging style
- Testing patterns and assertion style
- Comment style and documentation level

Don't introduce a "better" pattern that clashes with the rest of the codebase.

### 3. Prefer Clarity Over Cleverness

Explicit code is better than compact code when the compact version requires a mental pause to parse.

- Replace nested ternaries with readable control flow
- Replace dense inline transforms with named intermediate steps when they clarify intent
- Keep helpful names even if they cost a few extra lines

### 4. Maintain Balance

Watch for over-simplification:

- Don't inline away names that carry meaning
- Don't merge unrelated logic into one larger function
- Don't remove abstractions that serve testability or extensibility
- Don't optimize for line count over comprehension

### 5. Scope to What Changed

Default to simplifying recently modified code. Avoid unrelated drive-by refactors unless explicitly asked.

## Process

### Step 1: Understand Before Touching

- Read the code carefully. Trace the logic path.
- Understand what it does, why it does it, and what depends on it.
- Check for tests that verify the behavior you're about to simplify.
- If the code is unclear, add clarifying comments or names first — don't restructure yet.

### Step 2: Look for Simplification Opportunities

Common patterns that benefit from simplification:

- **Unnecessary nesting** — flatten guard clauses, early returns
- **Redundant variables** — eliminate intermediaries that add no clarity
- **Dead code** — unreachable branches, unused imports, commented-out code
- **Over-abstracted** — single-use functions, unnecessary indirection
- **Complex conditions** — extract into named booleans or guard functions
- **Inconsistent patterns** — align with nearby code conventions

### Step 3: Apply Changes Incrementally

Make one simplification at a time. After each:

- Re-read the result. Does it still express the same intent?
- Check that tests still pass (if available).
- Ensure the diff is clean and reviewable.

### Step 4: Verify the Result

After simplifying, confirm:

- The code is genuinely easier to understand
- The diff is clean and reviewable
- Project conventions still match
- No behavior, error handling, or side effects changed

## Guidance for This Repository

- Prefer straightforward TypeScript over clever compression
- Preserve existing runtime behavior, tests, and hooks
- Favor explicit names and smaller focused helpers when they improve readability
- Keep refactors tightly scoped to the task or review feedback

## Verification Checklist

- [ ] Existing tests pass without modification
- [ ] Build/typecheck/lint still pass
- [ ] No unrelated files were refactored
- [ ] No error handling was weakened or removed
- [ ] The result is simpler to review than the original
