#!/usr/bin/env bash
set -euo pipefail

# Tavily Extract - Extract full content from URLs

usage() {
  cat <<'EOF'
Usage: scripts/tavily_extract.sh <url1> [url2 ...] [options]

Options:
    --depth basic|advanced    Extraction depth (default: basic)
    --query TEXT              Rerank chunks by relevance to query
    --chunks-per-source N     Chunks per source 1-5 (requires --query)
    --format markdown|text    Output format (default: markdown)
    --include-images          Include images from pages
    --timeout N               Max wait seconds (1-60)
    --json                    Output raw JSON response

Environment:
    TAVILY_API_KEY            Your Tavily API key (required)

Examples:
    scripts/tavily_extract.sh https://example.com/article
    scripts/tavily_extract.sh url1 url2 url3 --depth advanced
    scripts/tavily_extract.sh https://example.com/docs --query "authentication API" --chunks-per-source 3
EOF
  exit 1
}

# Defaults
depth="basic"
query=""
chunks_per_source=""
fmt="markdown"
include_images=false
timeout=""
json_output=false
urls=()

# Parse args
while [[ $# -gt 0 ]]; do
  case "$1" in
  --depth)
    depth="$2"
    shift 2
    ;;
  --query)
    query="$2"
    shift 2
    ;;
  --chunks-per-source)
    chunks_per_source="$2"
    shift 2
    ;;
  --format)
    fmt="$2"
    shift 2
    ;;
  --include-images)
    include_images=true
    shift
    ;;
  --timeout)
    timeout="$2"
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
    urls+=("$1")
    shift
    ;;
  esac
done

[[ ${#urls[@]} -eq 0 ]] && {
  echo "Error: At least one URL is required" >&2
  usage
}
[[ ${#urls[@]} -gt 20 ]] && {
  echo "Error: Maximum 20 URLs per request" >&2
  exit 1
}

if [[ -z "${TAVILY_API_KEY:-}" ]]; then
  echo "Error: TAVILY_API_KEY environment variable not set" >&2
  echo "Get your free API key at https://app.tavily.com" >&2
  exit 1
fi

# Build URL array as JSON
urls_json=$(printf '%s\n' "${urls[@]}" | jq -R . | jq -s .)

# Build JSON payload
payload=$(jq -n \
  --argjson urls "$urls_json" \
  --arg depth "$depth" \
  --arg fmt "$fmt" \
  --argjson include_images "$include_images" \
  '{
    urls: $urls,
    extract_depth: $depth,
    format: $fmt,
    include_images: $include_images
  }')

[[ -n "$query" ]] && payload=$(echo "$payload" | jq --arg q "$query" '. + {query: $q}')
[[ -n "$chunks_per_source" ]] && payload=$(echo "$payload" | jq --argjson c "$chunks_per_source" '. + {chunks_per_source: $c}')
[[ -n "$timeout" ]] && payload=$(echo "$payload" | jq --argjson t "$timeout" '. + {timeout: $t}')

# Make request
tmpfile=$(mktemp)
trap 'rm -f "$tmpfile"' EXIT

http_code=$(curl -s -w '%{http_code}' -o "$tmpfile" \
  -X POST "https://api.tavily.com/extract" \
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
    (if (.results | length) > 0 then
      "## Extracted Content (\(.results | length) pages)\n\n" +
      ([.results | to_entries[] |
        "### \(.key + 1). \(.value.url // "Unknown URL")\n\n" +
        (if (.value.raw_content | length) > 5000 then
          .value.raw_content[0:5000] + "\n\n... [truncated, \(.value.raw_content | length) chars total]"
        elif (.value.raw_content | length) > 0 then
          .value.raw_content
        else "*No content extracted*" end) +
        (if (.value.images // [] | length) > 0 then
          "\n\n**Images (\(.value.images | length)):**\n" +
          ([.value.images[:5][] | "- \(.)"] | join("\n")) +
          (if (.value.images | length) > 5 then "\n- ... and \(.value.images | length - 5) more" else "" end)
        else "" end) +
        "\n\n---\n"
      ] | join("\n"))
    else "" end) +
    (if (.failed_results // [] | length) > 0 then
      "## Failed Extractions (\(.failed_results | length))\n" +
      ([.failed_results[] | "- \(.url // "Unknown"): \(.error // "Unknown error")"] | join("\n")) + "\n"
    else "" end) +
    (if .usage.credits then "\n*Credits used: \(.usage.credits)*" else "" end)
  ' "$tmpfile"
fi
