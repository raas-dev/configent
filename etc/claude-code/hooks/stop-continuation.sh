#!/bin/bash
# Sisyphus Stop Continuation Hook
# Checks for incomplete todos and injects continuation prompt
# Ported from oh-my-opencode's todo-continuation-enforcer

# Read stdin
INPUT=$(cat)

# Check for incomplete todos in the Claude todos directory
TODOS_DIR="$HOME/.claude/todos"
if [ -d "$TODOS_DIR" ]; then
  INCOMPLETE_COUNT=0
  for todo_file in "$TODOS_DIR"/*.json; do
    if [ -f "$todo_file" ]; then
      if command -v jq &>/dev/null; then
        COUNT=$(jq '[.[] | select(.status != "completed" and .status != "cancelled")] | length' "$todo_file" 2>/dev/null || echo "0")
        INCOMPLETE_COUNT=$((INCOMPLETE_COUNT + COUNT))
      fi
    fi
  done

  if [ "$INCOMPLETE_COUNT" -gt 0 ]; then
    cat <<EOF
{"continue": false, "reason": "[SYSTEM REMINDER - TODO CONTINUATION]\n\nIncomplete tasks remain in your todo list ($INCOMPLETE_COUNT remaining). Continue working on the next pending task.\n\n- Proceed without asking for permission\n- Mark each task complete when finished\n- Do not stop until all tasks are done"}
EOF
    exit 0
  fi
fi

# No incomplete todos - allow stop
echo '{"continue": true}'
exit 0
