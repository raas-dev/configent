# Runtime setup (pre-flight)

Run this block before any mode that touches scripts (CREATE, IMPROVE, VALIDATE, OPTIMIZE, PACKAGE).

```bash
# 1. uv (used by every script in scripts/ and eval-viewer/)
command -v uv >/dev/null || command -v ~/.local/bin/uv >/dev/null \
  || { echo "FAIL: uv not found. Install via curl -LsSf https://astral.sh/uv/install.sh | sh"; exit 1; }

# 2. SKILL_CONDUCTOR_DIR — absolute path to this skill (scripts use relative imports)
SKILL_CONDUCTOR_DIR="$(cd "$(dirname "$0")" 2>/dev/null && pwd || echo ~/.claude/skills/skill-conductor)"

# 3. UV_BIN — full path so subprocess and shell tool both work
UV_BIN="$(command -v uv || echo ~/.local/bin/uv)"

# 4. Optional: claude CLI (only Mode 5 OPTIMIZE)
command -v claude >/dev/null || echo "WARN: claude CLI absent — Mode 5 OPTIMIZE will fail"
```

If `uv` is absent, stop and tell the user. Don't fall back to `python3` directly — scripts have inline dependencies (`# /// script` blocks) that require `uv run`.

## LLM access for eval/improve

For Mode 1 Step 6 (eval loop) and Mode 2 (improve), the executor subagent needs LLM access. Three options, in order of preference:

1. `claude` CLI logged in (`claude /login` or `ANTHROPIC_API_KEY` in env). Verify: `claude --print "say ok"` returns `ok` (add `--model <current-model-id>` only if you need a specific model).
2. Anthropic SDK directly via `uv run --with anthropic ...` if `ANTHROPIC_API_KEY` is set.
3. On hosts with neither (e.g. OAuth-only Claude with no API key), evals can only be run by the orchestrating agent itself — there's no separate subagent. Mode 1 Step 6 then degrades to: write evals, the user runs them via their own agent, paste outputs back here.

Check the environment up front and tell the user which path applies. Don't pretend to spawn subagents that can't authenticate.
