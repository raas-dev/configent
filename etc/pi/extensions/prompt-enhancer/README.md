# @danchamorro/pi-prompt-enhancer

A [Pi](https://github.com/badlogic/pi-mono) extension that rewrites your prompts to be clearer, more specific, and more actionable before sending them to the agent.

Uses whichever model is currently selected in your session -- no extra API keys or configuration needed.

## Install

```bash
pi install npm:@danchamorro/pi-prompt-enhancer
```

## Usage

### Keyboard shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+E` | Enhance the current editor text in-place |
| `Ctrl+Z` | Restore original prompt (undo enhancement) |

### Command

```
/enhance <prompt>
```

Enhances the given prompt and places the result in the editor for review.

## How it works

1. Type a prompt in the editor.
2. Press `Ctrl+E` (or use `/enhance`).
3. The extension sends your prompt to the current model with instructions to rewrite it -- not answer it.
4. The enhanced prompt replaces your editor text.
5. Review, edit if needed, then press Enter to send.
6. Changed your mind? Press `Ctrl+Z` to restore the original.

## Examples

**Before:**
> fix the auth bug

**After:**
> Fix the authentication bug: identify the root cause of the failure, apply the fix, and verify that login, token refresh, and session expiry flows all work correctly after the change.

---

**Before:**
> what is the best coding model

**After:**
> As of today, which AI coding model is considered the best on the market, and how do the top options compare in terms of code quality, debugging accuracy, reasoning ability, speed, context window size, and pricing for professional software engineering use?

## Requirements

- [Pi](https://github.com/badlogic/pi-mono) coding agent
- Any model with an active API key selected in the session

## License

MIT
