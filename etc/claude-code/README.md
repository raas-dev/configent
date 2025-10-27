# claude-code plugins

Original sources listed below.

## agents

- https://github.com/davepoon/claude-code-subagents-collection

```
git clone --depth 1 \
  https://github.com/davepoon/claude-code-subagents-collection.git \
  tmp/claude-code-subagents-collection ||
  git -C tmp/claude-code-subagents-collection pull --no-autostash --rebase
find tmp/claude-code-subagents-collection/subagents \
  -name "*.md" -exec cp {} agents \;
```

## commands

- https://github.com/davepoon/claude-code-subagents-collection

```
git clone --depth 1 \
  https://github.com/davepoon/claude-code-subagents-collection.git \
  tmp/claude-code-subagents-collection ||
  git -C tmp/claude-code-subagents-collection pull --no-autostash --rebase
find tmp/claude-code-subagents-collection/commands \
  -name "*.md" -exec cp {} commands \;
```

## skills

- https://github.com/obra/superpowers

```
git clone --depth 1 https://github.com/danielmiessler/fabric.git
  tmp/superpowers ||
  git -C tmp/superpowers pull --no-autostash --rebase
cp -R tmp/superpowers/skills/* skills
```

- https://github.com/lackeyjb/playwright-skill
