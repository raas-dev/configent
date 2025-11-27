# AI agent commands

Commands are at least compatible with Claude Code, Opencode and Cursor.

Cloned from https://github.com/davepoon/claude-code-subagents-collection:

```
mkdir -p commands
git clone --depth 1 \
  https://github.com/davepoon/claude-code-subagents-collection.git \
  tmp/claude-code-subagents-collection ||
  git -C tmp/claude-code-subagents-collection pull --no-autostash --rebase
find tmp/claude-code-subagents-collection/commands \
  -name "*.md" -exec cp {} commands/ \;
```

Then sorted in subdirectories per category using Claude Haiku 4.5.
