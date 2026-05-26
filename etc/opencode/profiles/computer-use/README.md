# OpenCode computer-use profile

## browser-harness-js (CLI + Agent skill)

The `cdp` skill uses `bin/browser-harness-js` to talk to your browser via CDP.

You must enable checkbox for "Remote debugging" in
[brave](brave://inspect/#remote-debugging) or
[Chrome](chrome://inspect/#remote-debugging) DevTools menu.

The skill does any other setup if needed.

See [browser-harness-js](https://github.com/browser-use/browser-harness-js) for more information.

## agent-computer-use (CLI + Agent Skill)

Setup:

    bun add -g agent-cu
    agent-cu check-permissions

See [agent-computer-use](https://github.com/kortix-ai/agent-computer-use)
for more information.
