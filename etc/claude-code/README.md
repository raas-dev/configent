# claude-code plugins

Original sources listed below.

## agents

- https://github.com/davepoon/claude-code-subagents-collection/tree/main/subagents

```
git clone https://github.com/davepoon/claude-code-subagents-collection.git ./tmp/claude-code-subagents-collection
find tmp/claude-code-subagents-collection/subagents -name "*.md" -exec cp {} agents \;
```

## commands

- https://github.com/davepoon/claude-code-subagents-collection/tree/main/commands

```
git clone https://github.com/davepoon/claude-code-subagents-collection.git  ./tmp/claude-code-subagents-collection
find tmp/claude-code-subagents-collection/commands -name "*.md" -exec cp {} commands \;
```

## skills

- https://github.com/obra/superpowers/tree/main/skills

```
git clone https://github.com/obra/superpowers.git ./tmp/superpowers
cp -R tmp/superpowers/skills/* skills \;
```
