# Tavily API Reference

All endpoints require `Authorization: Bearer $TAVILY_API_KEY` and `Content-Type: application/json`.

## Search (`POST https://api.tavily.com/search`)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `query` | string | required | Search query (keep under 400 chars) |
| `search_depth` | string | `"basic"` | `ultra-fast`, `fast`, `basic`, `advanced` |
| `topic` | string | `"general"` | `general`, `news`, `finance` |
| `max_results` | int | 5 | Number of results (0-20) |
| `include_answer` | bool | false | Include AI-generated answer |
| `include_raw_content` | bool | false | Include full page content |
| `include_images` | bool | false | Include image results |
| `days` | int | null | Filter to last N days |
| `time_range` | string | null | `day`, `week`, `month`, `year` |
| `chunks_per_source` | int | 3 | Chunks per source (1-5, advanced/fast only) |
| `include_domains` | array | [] | Domains to include (max 300) |
| `exclude_domains` | array | [] | Domains to exclude (max 150) |

### Search Depth

| Depth | Latency | Relevance | Content Type |
|-------|---------|-----------|--------------|
| `ultra-fast` | Lowest | Lower | NLP summary |
| `fast` | Low | Good | Chunks |
| `basic` | Medium | High | NLP summary |
| `advanced` | Higher | Highest | Chunks |

- `ultra-fast`: Real-time chat, autocomplete
- `fast`: Need chunks but latency matters
- `basic`: General-purpose, balanced
- `advanced`: Precision matters

### Response

```json
{
  "query": "...",
  "answer": "AI-generated answer (if requested)",
  "results": [
    {
      "title": "Page title",
      "url": "https://...",
      "content": "Text snippet",
      "raw_content": "Full content (if requested)",
      "score": 0.85
    }
  ],
  "response_time": 1.2
}
```

## Extract (`POST https://api.tavily.com/extract`)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `urls` | array | required | URLs to extract (max 20) |
| `query` | string | null | Reranks chunks by relevance |
| `chunks_per_source` | int | 3 | Chunks per URL (1-5, requires query) |
| `extract_depth` | string | `"basic"` | `basic` or `advanced` (for JS pages) |
| `format` | string | `"markdown"` | `markdown` or `text` |
| `include_images` | bool | false | Include image URLs |
| `timeout` | float | varies | Max wait (1-60 seconds) |

### Response

```json
{
  "results": [
    {
      "url": "https://...",
      "raw_content": "Full page content"
    }
  ],
  "failed_results": [
    {"url": "...", "error": "..."}
  ],
  "response_time": 2.3
}
```

## Crawl (`POST https://api.tavily.com/crawl`)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `url` | string | required | Root URL to crawl |
| `max_depth` | int | 1 | Levels deep (1-5) |
| `max_breadth` | int | 20 | Links per page |
| `limit` | int | 50 | Total pages cap |
| `instructions` | string | null | Natural language focus guidance |
| `chunks_per_source` | int | 3 | Chunks per page (1-5, requires instructions) |
| `extract_depth` | string | `"basic"` | `basic` or `advanced` |
| `format` | string | `"markdown"` | `markdown` or `text` |
| `select_paths` | array | null | Regex patterns to include |
| `exclude_paths` | array | null | Regex patterns to exclude |
| `allow_external` | bool | true | Include external domain links |
| `timeout` | float | 150 | Max wait (10-150 seconds) |

### Depth vs Performance

| Depth | Typical Pages | Time |
|-------|---------------|------|
| 1 | 10-50 | Seconds |
| 2 | 50-500 | Minutes |
| 3 | 500-5000 | Many minutes |

### Response

```json
{
  "base_url": "https://docs.example.com",
  "results": [
    {
      "url": "https://docs.example.com/page",
      "raw_content": "# Page Title\n\nContent..."
    }
  ],
  "response_time": 12.5
}
```

## Research (`POST https://api.tavily.com/research`)

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `input` | string | required | Research topic or question |
| `model` | string | `"auto"` | `mini`, `pro`, `auto` |
| `stream` | bool | false | Streaming (use false for CLI) |
| `citation_format` | string | `"numbered"` | `numbered`, `mla`, `apa`, `chicago` |
| `output_schema` | object | null | JSON schema for structured output |

### Model Selection

| Model | Use Case | Speed |
|-------|----------|-------|
| `mini` | Single topic, targeted research | ~30s |
| `pro` | Comprehensive multi-angle analysis | ~60-120s |
| `auto` | API chooses based on complexity | Varies |

Rule of thumb: "what does X do?" -> mini. "X vs Y vs Z" or "best way to..." -> pro.

### Response

```json
{
  "content": "# Research Results\n\n...",
  "sources": [
    {"url": "https://...", "title": "Source Title"}
  ],
  "response_time": 45.2
}
```

## Map (`POST https://api.tavily.com/map`)

Returns URLs only (faster than crawl). Same parameters as crawl minus content-specific ones.

```json
{
  "base_url": "https://docs.example.com",
  "results": [
    "https://docs.example.com/api/auth",
    "https://docs.example.com/guides/quickstart"
  ]
}
```

## Credit Costs

| Operation | Cost |
|-----------|------|
| Basic search | 1 credit |
| Advanced search | 2 credits |
| Basic extract (5 URLs) | 1 credit |
| Advanced extract (5 URLs) | 2 credits |
| Crawl (5 pages) | ~1 credit |
| Research | varies by model |
