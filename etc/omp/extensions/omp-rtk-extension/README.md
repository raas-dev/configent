# omp-rtk-extension

OMP extension that transparently routes supported bash commands through [RTK](https://github.com/rtk-ai/rtk), the Rust CLI proxy that compresses command output before it reaches the model context.

This gives Oh My Pi users Claude Code–style RTK integration without changing normal `bash` tool usage.

## Features

- Transparent RTK integration through `PI_SHELL_PREFIX=rtk` when no shell prefix is already configured
- Safe fallback rewrite for supported `bash` commands when another prefix is already active
- Built-in slash commands for analytics and health checks
- Graceful degradation when RTK is not installed

## Requirements

- [Oh My Pi](https://github.com/can1357/oh-my-pi) with extension support
- [RTK](https://github.com/rtk-ai/rtk) installed and available on `PATH`
- Bun for running the included smoke test during development

## Install RTK

Use one of RTK's supported installation methods:

```bash
brew install rtk

# or
cargo install --git https://github.com/rtk-ai/rtk

# verify
rtk --version
```

RTK should print something like `rtk 0.28.0`. If it does not, or if `rtk gain` fails, you may have installed the wrong `rtk` binary.

## Use the extension

### Run directly from a local checkout

```bash
git clone https://github.com/masrurimz/omp-rtk-extension.git
cd omp-rtk-extension

omp --extension .
```

### Point OMP at a specific path

```bash
omp --extension /path/to/omp-rtk-extension
```

If you keep a persistent OMP extension configuration, add this repository path there instead of passing `--extension` each time.

## Slash commands

The extension registers:

- `/rtk-gain` — show RTK token savings analytics
- `/rtk-discover` — show missed RTK optimization opportunities
- `/rtk-status` — show whether RTK is available and whether shell-prefix mode is active

## How it works

### Primary path: shell prefix

1. Extension startup runs `rtk --version`
2. If RTK is available and no shell prefix is already set, the extension sets `PI_SHELL_PREFIX=rtk`
3. OMP's bash executor prepends that prefix to every bash command
4. RTK compresses supported command output before it reaches model context

### Fallback path: tool-call rewrite

1. The extension listens for `tool_call` events
2. For supported `bash` commands, it mutates `event.input.command` to `rtk <original command>`
3. OMP executes the rewritten command

This fallback depends on OMP's current shared-reference `tool_call` behavior. If OMP changes that contract in the future, prefix mode remains the durable integration path.

## Behavior notes

- If RTK is missing, the extension leaves commands unmodified and `/rtk-status` reports the missing binary.

- If `PI_SHELL_PREFIX` or `CLAUDE_CODE_SHELL_PREFIX` is already set, the extension preserves the existing prefix instead of clobbering user configuration.

- Unsupported commands pass through unchanged.

## Development

Run the smoke test:

```bash
bun run smoke
```

The included smoke test verifies:

- prefix mode when RTK is available
- rewrite fallback when another shell prefix is already set
- slash command registration and execution
- graceful degradation when RTK is unavailable

## Repository

- Source: https://github.com/masrurimz/omp-rtk-extension
- Issues: https://github.com/masrurimz/omp-rtk-extension/issues
- License: MIT
