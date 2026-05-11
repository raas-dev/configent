# OpenCode computer-use profile

## opentabs (CLI)

Setup:

    bun add -g @opentabs-dev/cli
    opentabs start --background

Load the extension from `~/.opentabs/extension` in `chrome://extensions/`.

To install plugins:

    opentabs plugin install <plugin>

See [opentabs](https://opentabs.dev) for more information.

It also has an [MCP server](https://opentabs.dev/docs/reference/mcp-server),
but it is not used in this profile.

## agent-computer-use (CLI + Agent Skill)

Setup:

    bun add -g agent-cu
    agent-cu check-permissions

See [agent-computer-use](https://github.com/kortix-ai/agent-computer-use)
for more information.
