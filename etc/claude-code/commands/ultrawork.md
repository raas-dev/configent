---
description: Activate maximum performance mode with parallel agent orchestration
---

[ULTRAWORK MODE ACTIVATED]

$ARGUMENTS

## Smart Model Routing (SAVE TOKENS)

Choose tier based on task complexity: LOW (haiku) → MEDIUM (sonnet) → HIGH (opus)

| Domain | LOW (Haiku) | MEDIUM (Sonnet) | HIGH (Opus) |
|--------|-------------|-----------------|-------------|
| Analysis | oracle-low | oracle-medium | oracle |
| Execution | sisyphus-junior-low | sisyphus-junior | sisyphus-junior-high |
| Search | explore | explore-medium | - |
| Research | librarian-low | librarian | - |
| Frontend | frontend-engineer-low | frontend-engineer | frontend-engineer-high |
| Docs | document-writer | - | - |

## Enhanced Execution Instructions
- Use PARALLEL agent execution for all independent subtasks
- USE TIERED ROUTING - match agent tier to task complexity to save tokens!
- Delegate aggressively to specialized subagents
- Maximize throughput by running multiple operations concurrently
- Continue until ALL tasks are 100% complete - verify before stopping
- Use background execution for long-running operations:
  - For Bash: set \`run_in_background: true\` for npm install, builds, tests
  - For Task: set \`run_in_background: true\` for long-running subagent tasks
  - Use \`TaskOutput\` to check results later
  - Maximum 5 concurrent background tasks
- Report progress frequently

CRITICAL: Do NOT stop until every task is verified complete.
