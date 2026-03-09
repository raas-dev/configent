#!/usr/bin/env bash
set -euo pipefail

# Tavily Crawl - Crawl websites and optionally save as markdown files

usage() {
  cat <<'EOF'
Usage: scripts/tavily_crawl.sh <url> [options]

Options:
    --max-depth N              Crawl depth 1-5 (default: 1)
    --max-breadth N            Links per page (default: 20)
    --limit N                  Total pages cap (default: 50)
    --instructions TEXT        Natural language focus guidance
    --chunks-per-source N      Chunks per page 1-5 (requires --instructions)
    --extract-depth DEPTH      basic or advanced (default: basic)
    --format FORMAT            markdown or text (default: markdown)
    --select-paths P1,P2       Regex patterns to include
    --exclude-paths P1,P2      Regex patterns to exclude
    --allow-external           Allow external domain links (default)
    --no-allow-external        Stay on same domain
    --timeout N                Max wait seconds (default: 150)
    --output-dir PATH          Save each page as a markdown file
    --json                     Output raw JSON response

Environment:
    TAVILY_API_KEY             Your Tavily API key (required)

Examples:
    scripts/tavily_crawl.sh https://docs.example.com
    scripts/tavily_crawl.sh https://docs.example.com --max-depth 2 --limit 20
    scripts/tavily_crawl.sh https://docs.example.com --max-depth 2 --output-dir ./docs
    scripts/tavily_crawl.sh https://example.com --instructions "Find API docs" --chunks-per-source 3
    scripts/tavily_crawl.sh https://example.com --select-paths "/docs/.*,/api/.*" --exclude-paths "/blog/.*"
EOF
  exit 1
}

# Defaults
max_depth=1
max_breadth=20
limit=50
instructions=""
chunks_per_source=""
extract_depth="basic"
fmt="markdown"
select_paths=""
exclude_paths=""
allow_external=true
timeout=150
output_dir=""
json_output=false
url=""

# Parse args
while [[ $# -gt 0 ]]; do
  case "$1" in
  --max-depth)
    max_depth="$2"
    shift 2
    ;;
  --max-breadth)
    max_breadth="$2"
    shift 2
    ;;
  --limit)
    limit="$2"
    shift 2
    ;;
  --instructions)
    instructions="$2"
    shift 2
    ;;
  --chunks-per-source)
    chunks_per_source="$2"
    shift 2
    ;;
  --extract-depth)
    extract_depth="$2"
    shift 2
    ;;
  --format)
    fmt="$2"
    shift 2
    ;;
  --select-paths)
    select_paths="$2"
    shift 2
    ;;
  --exclude-paths)
    exclude_paths="$2"
    shift 2
    ;;
  --allow-external)
    allow_external=true
    shift
    ;;
  --no-allow-external)
    allow_external=false
    shift
    ;;
  --timeout)
    timeout="$2"
    shift 2
    ;;
  --output-dir)
    output_dir="$2"
    shift 2
    ;;
  --json)
    json_output=true
    shift
    ;;
  --help | -h) usage ;;
  -*)
    echo "Error: Unknown option $1" >&2
    exit 1
    ;;
  *)
    url="$1"
    shift
    ;;
  esac
done

[[ -z "$url" ]] && {
  echo "Error: URL is required" >&2
  usage
}

if [[ -z "${TAVILY_API_KEY:-}" ]]; then
  echo "Error: TAVILY_API_KEY environment variable not set" >&2
  echo "Get your free API key at https://app.tavily.com" >&2
  exit 1
fi

# Build JSON payload
payload=$(jq -n \
  --arg url "$url" \
  --argjson max_depth "$max_depth" \
  --argjson max_breadth "$max_breadth" \
  --argjson limit "$limit" \
  --arg extract_depth "$extract_depth" \
  --arg fmt "$fmt" \
  --argjson allow_external "$allow_external" \
  --argjson timeout "$timeout" \
  '{
    url: $url,
    max_depth: $max_depth,
    max_breadth: $max_breadth,
    limit: $limit,
    extract_depth: $extract_depth,
    format: $fmt,
    allow_external: $allow_external,
    timeout: $timeout
  }')

[[ -n "$instructions" ]] && payload=$(echo "$payload" | jq --arg i "$instructions" '. + {instructions: $i}')
[[ -n "$chunks_per_source" ]] && payload=$(echo "$payload" | jq --argjson c "$chunks_per_source" '. + {chunks_per_source: $c}')
[[ -n "$select_paths" ]] && payload=$(echo "$payload" | jq --arg p "$select_paths" '. + {select_paths: ($p | split(","))}')
[[ -n "$exclude_paths" ]] && payload=$(echo "$payload" | jq --arg p "$exclude_paths" '. + {exclude_paths: ($p | split(","))}')

echo "Crawling: $url" >&2

# Make request
tmpfile=$(mktemp)
trap 'rm -f "$tmpfile"' EXIT

http_code=$(curl -s -w '%{http_code}' -o "$tmpfile" \
  --max-time 180 \
  -X POST "https://api.tavily.com/crawl" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TAVILY_API_KEY" \
  -H "x-client-source: claude-code-skill" \
  -d "$payload")

if [[ "$http_code" -ne 200 ]]; then
  echo "Error: Tavily API returned HTTP $http_code" >&2
  cat "$tmpfile" >&2
  exit 1
fi

# Save pages if --output-dir specified
if [[ -n "$output_dir" ]]; then
  mkdir -p "$output_dir"
  count=0
  for row in $(jq -r '.results[]? | @base64' "$tmpfile"); do
    page_url=$(echo "$row" | base64 --decode | jq -r '.url // ""')
    content=$(echo "$row" | base64 --decode | jq -r '.raw_content // ""')
    [[ -z "$content" ]] && continue
    filename=$(echo "$page_url" | sed 's|^https\?://||; s|[/:?&=]|_|g' | cut -c1-100)
    filepath="$output_dir/${filename}.md"
    printf '# %s\n\n%s\n' "$page_url" "$content" >"$filepath"
    echo "Saved: $filepath" >&2
    count=$((count + 1))
  done
  echo "Crawl complete. $count files saved to: $output_dir" >&2
fi

# Output
if [[ "$json_output" == "true" ]]; then
  jq . "$tmpfile"
else
  jq -r '
    "## Crawl Results: \(.base_url // "")\n\(.results | length) pages crawled\n\n" +
    ([.results | to_entries[] |
      "### \(.key + 1). \(.value.url // "Unknown URL")\n\n" +
      (if (.value.raw_content | length) > 2000 then
        .value.raw_content[0:2000] + "\n\n... [truncated, \(.value.raw_content | length) chars total]"
      elif (.value.raw_content | length) > 0 then
        .value.raw_content
      else "*No content extracted*" end) +
      "\n\n---\n"
    ] | join("\n")) +
    (if .response_time then "\n*Crawl completed in \(.response_time | tostring | .[0:5])s*" else "" end)
  ' "$tmpfile"
fi
