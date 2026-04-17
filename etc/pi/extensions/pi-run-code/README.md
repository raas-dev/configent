# pi-run-code

Pi CLI extension that adds a `run_code` tool for executing TypeScript/JavaScript code. Does not replace or disable existing Pi tools.

## Install

```
pi install extensions/pi-run-code
```

Or load ad-hoc:

```
pi -e ~/.pi/agent/extensions/pi-run-code/src/index.ts
```

## Environment

The extension **does not load** unless you acknowledge that `run_code` executes arbitrary TypeScript with Node.js APIs and zx (`$`) shell access in the agent’s working directory.

Set this **before** starting Pi (shell profile, launchd env, IDE terminal env, CI secrets, etc.):

| Variable | Meaning |
|----------|---------|
| `PI_RUN_CODE_UNSANDBOXED` | Must be set to a truthy acknowledgment (see below). If unset or invalid, the extension logs a warning and registers no tools. |

**Accepted values** (trimmed, compared case-insensitively): `1`, `true`, `yes`.

Examples:

```sh
export PI_RUN_CODE_UNSANDBOXED=1
# or: true, yes, YES, True, …
```

## Usage

In Pi, say "run code" followed by what you want executed:

```
> run code list files in this dir
> run code compute fibonacci(20)
> run code parse this YAML
```

The agent will call `run_code` with TS/JS code. Available inside code:

- `$` (zx shell) — run shell commands: `` const out = await $`ls` ``
- `print(...)` — output to include in result
- `console.log/warn/error` — captured output
- `require(...)` — import any Node.js module (fs, path, os, etc.)

Only TypeScript and JavaScript syntax is accepted.

## Packages

Configure npm packages in `.pi/pi-run-code.json` (project) or `~/.pi/agent/pi-run-code.json` (global). Packages are auto-installed and injected as globals.

```json
{
  "packages": {
    "yaml": { "version": "^2", "as": "YAML" },
    "humanize-duration": "*"
  }
}
```

String shorthand (`"*"`, `"^4"`) auto-generates variable names: `humanize-duration` → `humanizeDuration`, `@scope/foo-bar` → `fooBar`.

Object form supports custom variable name and description:

```json
{
  "packages": {
    "yaml": {
      "version": "^2",
      "as": "YAML",
      "description": "YAML parser and stringifier"
    }
  }
}
```

Packages install to `.pi/pi-run-code/node_modules/` (project) or `~/.pi/agent/pi-run-code/node_modules/` (global). The directory is auto-added to `.pi/.gitignore`.

Project config overrides global for same variable name. Installs are skipped if `package.json` hasn't changed.

## Test

```
npm test
```

## License

MIT
