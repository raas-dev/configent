---
name: ultrawork
description: Activate maximum performance mode with parallel agent orchestration
---

# Ultrawork Skill

Activates maximum performance mode with parallel agent orchestration.

## When Activated

This skill enhances Claude's capabilities by:

1. **Parallel Execution**: Running multiple agents simultaneously for independent tasks
2. **Aggressive Delegation**: Routing tasks to specialist agents immediately
3. **Background Operations**: Using `run_in_background: true` for long operations
4. **Persistence Enforcement**: Never stopping until all tasks are verified complete

## Agent Routing

| Task Type | Agent | Model |
|-----------|-------|-------|
| Complex debugging | oracle | Opus |
| Documentation research | librarian | Sonnet |
| Quick searches | explore | Haiku |
| UI/UX work | frontend-engineer | Sonnet |
| Technical writing | document-writer | Haiku |
| Visual analysis | multimodal-looker | Sonnet |
| Plan review | momus | Opus |
| Pre-planning | metis | Opus |
| Strategic planning | prometheus | Opus |

## Background Execution Rules

**Run in Background** (set `run_in_background: true`):
- Package installation: npm install, pip install, cargo build
- Build processes: npm run build, make, tsc
- Test suites: npm test, pytest, cargo test
- Docker operations: docker build, docker pull

**Run Blocking** (foreground):
- Quick status checks: git status, ls, pwd
- File reads, edits
- Simple commands

## Verification Checklist

Before stopping, verify:
- [ ] TODO LIST: Zero pending/in_progress tasks
- [ ] FUNCTIONALITY: All requested features work
- [ ] TESTS: All tests pass (if applicable)
- [ ] ERRORS: Zero unaddressed errors

**If ANY checkbox is unchecked, CONTINUE WORKING.**
