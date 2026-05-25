---
name: opentabs
description: Browser automation via OpenTabs CLI. Use when the user needs to interact with websites, including navigating pages, filling forms, clicking buttons, taking screenshots, extracting data, testing web apps, or automating any browser task.
---

# OpenTabs

Browser automation through the `opentabs` CLI. No Playwright, no MCP — pure shell commands.

Full docs: https://opentabs.dev/docs/reference/cli

## Setup

```bash
opentabs start --background   # Start server daemon (default port 9515)
opentabs doctor               # Verify: runtime, browser, config, extension
```

## Discovering and Calling Tools

```bash
opentabs tool list                        # List all available browser tools
opentabs tool list --json                 # Full schemas as JSON
opentabs tool schema browser_navigate     # Input schema for a specific tool
opentabs tool call browser_list_tabs      # Call a tool with no args
opentabs tool call browser_navigate '{"url":"https://example.com"}'
opentabs tool call browser_screenshot     # Take a screenshot
opentabs tool call browser_click '{"selector":"#submit"}'
opentabs tool call browser_type '{"selector":"#search","text":"hello"}'
```

The tool call timeout is 5 minutes. Use `--tab-id <id>` to target a specific tab.

## Server Management

```bash
opentabs start                # Start server (foreground)
opentabs start --background   # Start as daemon (PID in ~/.opentabs/server.pid)
opentabs start --port 3000    # Custom port
opentabs stop                 # Stop background server
opentabs status               # Server status, plugins, tab states
```

## Diagnostics & Logs

```bash
opentabs doctor               # Full health check
opentabs logs                  # Recent server logs
opentabs logs -f               # Follow logs in real-time
opentabs logs --plugin slack   # Filter by plugin
opentabs audit                 # Recent tool invocations
opentabs audit --tool browser_navigate  # Filter by tool
opentabs audit --since 1h      # Last hour of activity
opentabs audit --file          # Read from persistent disk log
```

## Configuration

```bash
opentabs config show           # Display current config
opentabs config set tool-permission.<plugin>.<tool> auto   # Auto-approve a tool
opentabs config set tool-permission.<plugin>.<tool> off    # Disable a tool
opentabs config set plugin-permission.<plugin> ask         # Plugin-level default
opentabs config set port 3000                              # Change server port
opentabs config path          # Print config file path
```

## Plugin Management

```bash
opentabs plugin list           # List installed plugins
opentabs plugin search <query> # Search npm registry
opentabs plugin install <name> # Install a plugin (shorthand or full name)
opentabs plugin remove <name> --confirm  # Remove a plugin
opentabs plugin configure <name>         # Interactive plugin setup
```

## Notes

- Chrome extension must be installed and connected for tab operations
- Run `opentabs doctor` to troubleshoot connection issues
- Audit log keeps last 500 invocations in memory, use `--file` for persistent log
