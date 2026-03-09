---
name: skill-seekers
description: Convert documentation websites, GitHub repositories, and PDFs into Claude AI skills. Use when creating Claude skills from docs, scraping documentation, packaging websites into skills, or converting repos/PDFs to Claude knowledge.
---

# Skill Seekers

**Convert documentation websites, GitHub repositories, and PDFs into Claude AI skills automatically.**

## When to Activate

Use this skill when:
- User wants to create a Claude skill from documentation
- User asks about scraping docs, GitHub repos, or PDFs for Claude
- User needs to package documentation into a `.zip` for Claude
- User wants to convert a website, repo, or PDF into knowledge for Claude

## Quick Reference

### Installation
```bash
pip install skill-seekers
```

### Core Commands

```bash
# Scrape documentation website
skill-seekers scrape --config configs/react.json
skill-seekers scrape --url https://docs.example.com --name myskill

# Scrape GitHub repository
skill-seekers github --repo facebook/react

# Extract from PDF
skill-seekers pdf --pdf docs/manual.pdf --name myskill

# Combine multiple sources (docs + GitHub + PDF)
skill-seekers unified --config configs/react_unified.json

# Enhance the skill with AI
skill-seekers enhance output/myskill/

# Package into .zip for Claude
skill-seekers package output/myskill/
```

### Complete Workflow

```bash
# 1. Scrape documentation
skill-seekers scrape --url https://react.dev --name react

# 2. Enhance with AI (optional but recommended)
skill-seekers enhance output/react/

# 3. Package into zip
skill-seekers package output/react/

# 4. Upload output/react.zip to Claude at https://claude.ai/skills
```

## Key Features

| Feature | Description |
|---------|-------------|
| **Doc Scraping** | Scrape any documentation website |
| **GitHub Scraping** | Extract code, APIs, issues from repos |
| **PDF Extraction** | Extract text, tables, images from PDFs |
| **Unified Scraping** | Combine docs + code + PDF in one skill |
| **Conflict Detection** | Find discrepancies between docs and code |
| **AI Enhancement** | Improve SKILL.md quality automatically |
| **Async Mode** | 2-3x faster with `--async` flag |

## Output Structure

```
output/
├── myskill_data/     # Raw scraped data (cached)
└── myskill/          # Built skill directory
    ├── SKILL.md      # Main skill file (required)
    └── references/   # Categorized documentation
        ├── index.md
        ├── api.md
        └── ...
```

## Available Presets

```bash
skill-seekers scrape --config configs/godot.json     # Godot Engine
skill-seekers scrape --config configs/react.json     # React
skill-seekers scrape --config configs/vue.json       # Vue.js
skill-seekers scrape --config configs/django.json    # Django
skill-seekers scrape --config configs/fastapi.json   # FastAPI
```

## Config File Structure

```json
{
  "name": "myframework",
  "description": "When to use this skill",
  "base_url": "https://docs.myframework.com/",
  "selectors": {
    "main_content": "article",
    "title": "h1",
    "code_blocks": "pre code"
  },
  "url_patterns": {
    "include": ["/docs", "/guide"],
    "exclude": ["/blog", "/about"]
  },
  "rate_limit": 0.5,
  "max_pages": 500
}
```

## Navigation

For detailed information, see:
- `references/readme.md` - Full documentation and examples
- `references/quickstart.md` - Getting started guide
- `references/usage.md` - Complete command reference
