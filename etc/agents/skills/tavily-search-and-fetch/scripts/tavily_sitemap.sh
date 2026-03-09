#!/usr/bin/env bash
set -euo pipefail

# Tavily Map - Discover URLs on a website (faster than crawl)

usage() {
  cat <<'EOF'
Usage: scripts/tavily_sitemap.sh <url> [options]

Options:
    --max-depth N              Crawl depth 1-5 (default: 1)
    --max-breadth N            Links per page (default: 20)
    --limit N                  Total URLs cap (default: 50)
    --instructions TEXT        Natural language focus guidance
    --select-paths P1,P2       Regex patterns to include
    --exclude-paths P1,P2      Regex patterns to exclude
    --allow-external           Allow external domain links (default)
    --no-allow-external        Stay on same domain
    --json                     Output raw JSON response

Environment:
    TAVILY_API_KEY             Your Tavily API key (required)

Examples:
    scripts/tavily_sitemap.sh https://docs.example.com
    scripts/tavily_sitemap.sh https://docs.example.com --max-depth 2 --limit 100
    scripts/tavily_sitemap.sh https://example.com --instructions "Find API docs" --select-paths "/docs/.*,/api/.*"
EOF
  exit 1
}

# Defaults
max_depth=1
max_breadth=20
limit=50
instructions=""
select_paths=""
exclude_paths=""
allow_external=true
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
  --argjson allow_external "$allow_external" \
  '{
    url: $url,
    max_depth: $max_depth,
    max_breadth: $max_breadth,
    limit: $limit,
    allow_external: $allow_external
  }')

[[ -n "$instructions" ]] && payload=$(echo "$payload" | jq --arg i "$instructions" '. + {instructions: $i}')
[[ -n "$select_paths" ]] && payload=$(echo "$payload" | jq --arg p "$select_paths" '. + {select_paths: ($p | split(","))}')
[[ -n "$exclude_paths" ]] && payload=$(echo "$payload" | jq --arg p "$exclude_paths" '. + {exclude_paths: ($p | split(","))}')

# Make request
tmpfile=$(mktemp)
trap 'rm -f "$tmpfile"' EXIT

http_code=$(curl -s -w '%{http_code}' -o "$tmpfile" \
  -X POST "https://api.tavily.com/map" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TAVILY_API_KEY" \
  -H "x-client-source: claude-code-skill" \
  -d "$payload")

if [[ "$http_code" -ne 200 ]]; then
  echo "Error: Tavily API returned HTTP $http_code" >&2
  cat "$tmpfile" >&2
  exit 1
fi

# Output
if [[ "$json_output" == "true" ]]; then
  jq . "$tmpfile"
else
  jq -r '
    "## Site Map: \(.base_url // "")\n\(.results | length) URLs found\n\n" +
    ([.results | to_entries[] | "\(.key + 1). \(.value)"] | join("\n")) +
    (if .response_time then "\n\n*Completed in \(.response_time | tostring | .[0:5])s*" else "" end)
  ' "$tmpfile"
fi
