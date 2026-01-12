---
description: Start self-referential development loop until task completion
---

[RALPH LOOP ACTIVATED]

$ARGUMENTS

## How Ralph Loop Works

You are starting a Ralph Loop - a self-referential development loop that runs until task completion.

1. Work on the task continuously and thoroughly
2. When the task is FULLY complete, output: `<promise>DONE</promise>`
3. If you stop without the promise tag, the loop will remind you to continue
4. Maximum iterations: 100 (configurable)

## Exit Conditions

- **Completion**: Output `<promise>DONE</promise>` when fully done
- **Cancel**: User runs `/cancel-ralph`
- **Max Iterations**: Loop stops at limit

## Guidelines

- Break the task into steps and work through them systematically
- Test your work as you go
- Don't output the promise until you've verified everything works
- Be thorough - the loop exists so you can take your time

---

Begin working on the task. Remember to output `<promise>DONE</promise>` when complete.
