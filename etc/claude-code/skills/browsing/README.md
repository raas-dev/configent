# chrome-ws

Chrome DevTools Protocol CLI - zero dependencies.

## Installation

```bash
chmod +x chrome-ws
```

## Quick Test

```bash
./chrome-ws start                        # Launch Chrome (auto-detects platform)
./chrome-ws new "https://example.com"   # Create tab
./chrome-ws navigate 0 "https://example.com"
./chrome-ws extract 0 "h1"              # Extract heading
```

## Documentation

- `SKILL.md` - Complete usage guide
- `EXAMPLES.md` - Real-world examples

## Testing

```bash
./test-raw.sh       # Raw JSON-RPC
./test-tabs.sh      # Tab management
./test-navigate.sh  # Navigation
./test-interact.sh  # Form interaction
./test-extract.sh   # Content extraction
./test-wait.sh      # Wait commands
./test-e2e.sh       # End-to-end workflow
```

## Requirements

- Node.js 16+
- Chrome with `--remote-debugging-port=9222`
