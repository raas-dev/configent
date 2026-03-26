## Gemini CLI Overlay

Gemini CLI has experimental subagent support, but subagents currently run
sequentially (not in parallel). Review dimensions one at a time.

### Setup

Enable subagents in Gemini CLI settings:
```json
{
  "experimental": {
    "enableAgents": true
  }
}
```

Optionally define a reviewer agent in `.gemini/agents/desloppify-reviewer.md`:

```yaml
---
name: desloppify-reviewer
description: Scores subjective codebase quality dimensions for desloppify
kind: local
tools:
  - read_file
  - search_code
temperature: 0.2
max_turns: 10
---
```

Use the prompt from the "Reviewer agent prompt" section above.

### Review workflow

Invoke the reviewer agent for each group of dimensions sequentially.
Even without parallelism, isolating dimensions across separate agent
invocations prevents score bleed between concerns.

Merge assessments and findings, then import.

When Gemini CLI adds parallel subagent execution, split dimensions across
concurrent agent calls instead.

<!-- desloppify-overlay: gemini -->
<!-- desloppify-end -->
