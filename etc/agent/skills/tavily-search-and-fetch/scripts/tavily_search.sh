#!/usr/bin/env bash
set -euo pipefail

# Tavily Search - Web search optimized for LLMs

usage() {
  cat <<'EOF'
Usage: scripts/tavily_search.sh <query> [options]

Options:
    --depth DEPTH             Search depth: ultra-fast, fast, basic, advanced (default: basic)
    --topic TOPIC             general, news, finance (default: general)
    --max-results N           Max results to return (default: 5)
    --include-answer          Include AI-generated answer
    --include-raw-content     Include full page content (not just snippets)
    --include-images          Include image results
    --days N                  Filter to last N days
    --time-range RANGE        Filter: day, week, month, year
    --chunks-per-source N     Chunks per source 1-5 (advanced/fast only)
    --include-domains d1,d2   Only search these domains
    --exclude-domains d1,d2   Exclude these domains
    --json                    Output raw JSON response

Environment:
    TAVILY_API_KEY            Your Tavily API key (required)

Examples:
    scripts/tavily_search.sh "What is RAG in AI?"
    scripts/tavily_search.sh "latest AI news" --topic news --days 7
    scripts/tavily_search.sh "NVDA stock analysis" --topic finance --depth advanced
    scripts/tavily_search.sh "AI news this week" --topic news --time-range week
EOF
  exit 1
}

# Defaults
depth="basic"
topic="general"
max_results=5
include_answer=false
include_raw_content=false
include_images=false
days=""
time_range=""
chunks_per_source=""
include_domains=""
exclude_domains=""
json_output=false
query=""

# Parse args
while [[ $# -gt 0 ]]; do
  case "$1" in
  --depth)
    depth="$2"
    shift 2
    ;;
  --topic)
    topic="$2"
    shift 2
    ;;
  --max-results)
    max_results="$2"
    shift 2
    ;;
  --include-answer)
    include_answer=true
    shift
    ;;
  --include-raw-content)
    include_raw_content=true
    shift
    ;;
  --include-images)
    include_images=true
    shift
    ;;
  --days)
    days="$2"
    shift 2
    ;;
  --time-range)
    time_range="$2"
    shift 2
    ;;
  --chunks-per-source)
    chunks_per_source="$2"
    shift 2
    ;;
  --include-domains)
    include_domains="$2"
    shift 2
    ;;
  --exclude-domains)
    exclude_domains="$2"
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
    query="$1"
    shift
    ;;
  esac
done

[[ -z "$query" ]] && {
  echo "Error: Query is required" >&2
  usage
}

if [[ -z "${TAVILY_API_KEY:-}" ]]; then
  echo "Error: TAVILY_API_KEY environment variable not set" >&2
  echo "Get your free API key at https://app.tavily.com" >&2
  exit 1
fi

# Build JSON payload
payload=$(jq -n \
  --arg query "$query" \
  --arg depth "$depth" \
  --arg topic "$topic" \
  --argjson max_results "$max_results" \
  --argjson include_answer "$include_answer" \
  --argjson include_raw_content "$include_raw_content" \
  --argjson include_images "$include_images" \
  '{
    query: $query,
    search_depth: $depth,
    topic: $topic,
    max_results: $max_results,
    include_answer: $include_answer,
    include_raw_content: $include_raw_content,
    include_images: $include_images
  }')

[[ -n "$days" ]] && payload=$(echo "$payload" | jq --argjson d "$days" '. + {days: $d}')
[[ -n "$time_range" ]] && payload=$(echo "$payload" | jq --arg t "$time_range" '. + {time_range: $t}')
[[ -n "$chunks_per_source" ]] && payload=$(echo "$payload" | jq --argjson c "$chunks_per_source" '. + {chunks_per_source: $c}')
[[ -n "$include_domains" ]] && payload=$(echo "$payload" | jq --arg d "$include_domains" '. + {include_domains: ($d | split(","))}')
[[ -n "$exclude_domains" ]] && payload=$(echo "$payload" | jq --arg d "$exclude_domains" '. + {exclude_domains: ($d | split(","))}')

# Make request
tmpfile=$(mktemp)
trap 'rm -f "$tmpfile"' EXIT

http_code=$(curl -s -w '%{http_code}' -o "$tmpfile" \
  -X POST "https://api.tavily.com/search" \
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
    (if .answer then "## Answer\n\(.answer)\n" else "" end) +
    "## Results (\(.results | length) found)\n" +
    ([.results[] | to_entries | from_entries |
      "### \(.title // "No title")\n**URL:** \(.url // "N/A")" +
      (if .score then "\n**Relevance:** \(.score | tostring | .[0:4])" else "" end) +
      "\n\n" +
      (if .raw_content then "**Content:**\n\(.raw_content | .[0:2000])" +
        (if (.raw_content | length) > 2000 then "\n... [truncated]" else "" end)
       elif .content then .content
       else "" end) +
      "\n"
    ] | join("\n")) +
    (if .usage.credits then "\n---\n*Credits used: \(.usage.credits)*" else "" end)
  ' "$tmpfile"
fi
