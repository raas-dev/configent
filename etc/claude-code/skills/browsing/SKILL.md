---
name: browsing
description: Use when you need direct browser control - teaches Chrome DevTools Protocol for controlling existing browser sessions, multi-tab management, form automation, and content extraction via use_browser MCP tool
---

# Browsing with Chrome Direct

## Overview

Control Chrome via DevTools Protocol using the `use_browser` MCP tool. Single unified interface with auto-starting Chrome.

**Announce:** "I'm using the browsing skill to control Chrome."

## When to Use

**Use this when:**
- Controlling authenticated sessions
- Managing multiple tabs in running browser
- Playwright MCP unavailable or excessive

**Use Playwright MCP when:**
- Need fresh browser instances
- Generating screenshots/PDFs
- Prefer higher-level abstractions

## The use_browser Tool

Single MCP tool with action-based interface. Chrome auto-starts on first use.

**Parameters:**
- `action` (required): Operation to perform
- `tab_index` (optional): Tab to operate on (default: 0)
- `selector` (optional): CSS selector for element operations
- `payload` (optional): Action-specific data
- `timeout` (optional): Timeout in ms for await operations (default: 5000)

## Actions Reference

### Navigation
- **navigate**: Navigate to URL
  - `payload`: URL string
  - Example: `{action: "navigate", payload: "https://example.com"}`

- **await_element**: Wait for element to appear
  - `selector`: CSS selector
  - `timeout`: Max wait time in ms
  - Example: `{action: "await_element", selector: ".loaded", timeout: 10000}`

- **await_text**: Wait for text to appear
  - `payload`: Text to wait for
  - Example: `{action: "await_text", payload: "Welcome"}`

### Interaction
- **click**: Click element
  - `selector`: CSS selector
  - Example: `{action: "click", selector: "button.submit"}`

- **type**: Type text into input (append `\n` to submit)
  - `selector`: CSS selector
  - `payload`: Text to type
  - Example: `{action: "type", selector: "#email", payload: "user@example.com\n"}`

- **select**: Select dropdown option
  - `selector`: CSS selector
  - `payload`: Option value(s)
  - Example: `{action: "select", selector: "select[name=state]", payload: "CA"}`

### Extraction
- **extract**: Get page content
  - `payload`: Format ('markdown'|'text'|'html')
  - `selector`: Optional - limit to element
  - Example: `{action: "extract", payload: "markdown"}`
  - Example: `{action: "extract", payload: "text", selector: "h1"}`

- **attr**: Get element attribute
  - `selector`: CSS selector
  - `payload`: Attribute name
  - Example: `{action: "attr", selector: "a.download", payload: "href"}`

- **eval**: Execute JavaScript
  - `payload`: JavaScript code
  - Example: `{action: "eval", payload: "document.title"}`

### Export
- **screenshot**: Capture screenshot
  - `payload`: Filename
  - `selector`: Optional - screenshot specific element
  - Example: `{action: "screenshot", payload: "/tmp/page.png"}`

### Tab Management
- **list_tabs**: List all open tabs
  - Example: `{action: "list_tabs"}`

- **new_tab**: Create new tab
  - Example: `{action: "new_tab"}`

- **close_tab**: Close tab
  - `tab_index`: Tab to close
  - Example: `{action: "close_tab", tab_index: 2}`

## Quick Start Pattern

```
Navigate and extract:
{action: "navigate", payload: "https://example.com"}
{action: "await_element", selector: "h1"}
{action: "extract", payload: "text", selector: "h1"}
```

## Common Patterns

### Fill and Submit Form
```
{action: "navigate", payload: "https://example.com/login"}
{action: "await_element", selector: "input[name=email]"}
{action: "type", selector: "input[name=email]", payload: "user@example.com"}
{action: "type", selector: "input[name=password]", payload: "pass123\n"}
{action: "await_text", payload: "Welcome"}
```

The `\n` at the end of the password submits the form.

### Multi-Tab Workflow
```
{action: "list_tabs"}
{action: "click", tab_index: 2, selector: "a.email"}
{action: "await_element", tab_index: 2, selector: ".content"}
{action: "extract", tab_index: 2, payload: "text", selector: ".amount"}
```

### Dynamic Content
```
{action: "navigate", payload: "https://example.com"}
{action: "type", selector: "input[name=q]", payload: "query"}
{action: "click", selector: "button.search"}
{action: "await_element", selector: ".results"}
{action: "extract", payload: "text", selector: ".result-title"}
```

### Get Link Attribute
```
{action: "navigate", payload: "https://example.com"}
{action: "await_element", selector: "a.download"}
{action: "attr", selector: "a.download", payload: "href"}
```

### Execute JavaScript
```
{action: "eval", payload: "document.querySelectorAll('a').length"}
{action: "eval", payload: "Array.from(document.querySelectorAll('a')).map(a => a.href)"}
```

## Tips

**Always wait before interaction:**
Don't click or fill immediately after navigate - pages need time to load.

```
// BAD - might fail if page slow
{action: "navigate", payload: "https://example.com"}
{action: "click", selector: "button"}  // May fail!

// GOOD - wait first
{action: "navigate", payload: "https://example.com"}
{action: "await_element", selector: "button"}
{action: "click", selector: "button"}
```

**Use specific selectors:**
Avoid generic selectors that match multiple elements.

```
// BAD - matches first button
{action: "click", selector: "button"}

// GOOD - specific
{action: "click", selector: "button[type=submit]"}
{action: "click", selector: "#login-button"}
```

**Submit forms with \n:**
Append newline to text to submit forms automatically.

```
{action: "type", selector: "#search", payload: "query\n"}
```

**Check content first:**
Extract page content to verify selectors before building workflow.

```
{action: "extract", payload: "html"}
```

## Troubleshooting

**Element not found:**
- Use `await_element` before interaction
- Verify selector with `extract` action using 'html' format

**Timeout errors:**
- Increase timeout: `{timeout: 30000}` for slow pages
- Wait for specific element instead of text

**Tab index out of range:**
- Use `list_tabs` to get current indices
- Tab indices change when tabs close

## Advanced Usage

For command-line usage outside Claude Code, see [COMMANDLINE-USAGE.md](COMMANDLINE-USAGE.md).

For detailed examples, see [EXAMPLES.md](EXAMPLES.md).

## Protocol Reference

Full CDP documentation: https://chromedevtools.github.io/devtools-protocol/
