# claude-code plugins

Library of commands, subagents and Claude skills.

Commands and agents were sorted into subdirectories using Claude Haiku 4.5.

Original sources listed below.

## agents

- https://github.com/davepoon/claude-code-subagents-collection

```
mkdir -p agents
git clone --depth 1 \
  https://github.com/davepoon/claude-code-subagents-collection.git \
  tmp/claude-code-subagents-collection ||
  git -C tmp/claude-code-subagents-collection pull --no-autostash --rebase
find tmp/claude-code-subagents-collection/subagents \
  -name "*.md" -exec cp {} ./agents/ \;
```

## commands

- https://github.com/davepoon/claude-code-subagents-collection

```
mkdir -p commands
git clone --depth 1 \
  https://github.com/davepoon/claude-code-subagents-collection.git \
  tmp/claude-code-subagents-collection ||
  git -C tmp/claude-code-subagents-collection pull --no-autostash --rebase
find tmp/claude-code-subagents-collection/commands \
  -name "*.md" -exec cp {} ./commands/ \;
```

## skills

- https://github.com/obra/superpowers

```
git clone --depth 1 https://github.com/obra/superpowers.git tmp/superpowers ||
  git -C tmp/superpowers pull --no-autostash --rebase
cp -R tmp/superpowers/skills/* skills
```

- https://github.com/lackeyjb/playwright-skill

```
git clone --depth 1 https://github.com/lackeyjb/playwright-skill.git tmp/playwright-skill ||
  git -C tmp/playwright-skill pull --no-autostash --rebase
cp -R tmp/playwright-skill/skills/* skills
```
