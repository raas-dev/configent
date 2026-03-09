#!/usr/bin/env bash
set -euo pipefail

# Tavily Research - AI-synthesized research with citations

usage() {
  cat <<'EOF'
Usage: scripts/tavily_research.sh <input> [options]

Options:
    --model mini|pro|auto         Research model (default: auto)
    --citation-format FORMAT      Citation style: numbered, mla, apa, chicago (default: numbered)
    --output-schema JSON          JSON schema for structured output
    --output-file PATH            Save results to file
    --json                        Output raw JSON response

Environment:
    TAVILY_API_KEY                Your Tavily API key (required)

Examples:
    scripts/tavily_research.sh "What is retrieval augmented generation?"
    scripts/tavily_research.sh "LangGraph vs CrewAI" --model pro
    scripts/tavily_research.sh "EV market analysis" --model pro --output-file ev-report.md
    scripts/tavily_research.sh "fintech startups" --output-schema '{"properties":{"summary":{"type":"string"}},"required":["summary"]}'
EOF
  exit 1
}

# Defaults
model="auto"
citation_format="numbered"
output_schema=""
output_file=""
json_output=false
input_text=""

# Parse args
while [[ $# -gt 0 ]]; do
  case "$1" in
  --model)
    model="$2"
    shift 2
    ;;
  --citation-format)
    citation_format="$2"
    shift 2
    ;;
  --output-schema)
    output_schema="$2"
    shift 2
    ;;
  --output-file)
    output_file="$2"
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
    input_text="$1"
    shift
    ;;
  esac
done

[[ -z "$input_text" ]] && {
  echo "Error: Research input is required" >&2
  usage
}

if [[ -z "${TAVILY_API_KEY:-}" ]]; then
  echo "Error: TAVILY_API_KEY environment variable not set" >&2
  echo "Get your free API key at https://app.tavily.com" >&2
  exit 1
fi

# Build JSON payload
payload=$(jq -n \
  --arg input "$input_text" \
  --arg model "$model" \
  --arg citation_format "$citation_format" \
  '{
    input: $input,
    model: $model,
    stream: false,
    citation_format: $citation_format
  }')

if [[ -n "$output_schema" ]]; then
  if ! echo "$output_schema" | jq . >/dev/null 2>&1; then
    echo "Error: Invalid JSON in --output-schema" >&2
    exit 1
  fi
  payload=$(echo "$payload" | jq --argjson s "$output_schema" '. + {output_schema: $s}')
fi

echo "Researching: $input_text (model: $model)" >&2
echo "This may take 30-120 seconds..." >&2

# Step 1: Create research task
tmpfile=$(mktemp)
trap 'rm -f "$tmpfile"' EXIT

http_code=$(curl -s -w '%{http_code}' -o "$tmpfile" \
  --max-time 30 \
  -X POST "https://api.tavily.com/research" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TAVILY_API_KEY" \
  -H "x-client-source: claude-code-skill" \
  -d "$payload")

if [[ "$http_code" -ne 200 && "$http_code" -ne 201 ]]; then
  echo "Error: Tavily API returned HTTP $http_code" >&2
  cat "$tmpfile" >&2
  exit 1
fi

request_id=$(jq -r '.request_id // empty' "$tmpfile")
if [[ -z "$request_id" ]]; then
  echo "Error: No request_id in response" >&2
  cat "$tmpfile" >&2
  exit 1
fi

# Step 2: Poll for results
poll_interval=2
max_wait=180
elapsed=0

while [[ $elapsed -lt $max_wait ]]; do
  http_code=$(curl -s -w '%{http_code}' -o "$tmpfile" \
    --max-time 30 \
    -X GET "https://api.tavily.com/research/$request_id" \
    -H "Authorization: Bearer $TAVILY_API_KEY")

  if [[ "$http_code" -eq 200 ]]; then
    status=$(jq -r '.status // empty' "$tmpfile")
    if [[ "$status" == "completed" ]]; then
      break
    elif [[ "$status" == "failed" ]]; then
      echo "Error: Research task failed" >&2
      cat "$tmpfile" >&2
      exit 1
    fi
  elif [[ "$http_code" -ne 202 ]]; then
    echo "Error: Tavily API returned HTTP $http_code while polling" >&2
    cat "$tmpfile" >&2
    exit 1
  fi

  sleep "$poll_interval"
  elapsed=$((elapsed + poll_interval))
  # Increase interval gradually
  if [[ $elapsed -ge 30 ]]; then
    poll_interval=5
  fi
done

if [[ $elapsed -ge $max_wait ]]; then
  echo "Error: Research timed out after ${max_wait}s" >&2
  exit 1
fi

# Output
if [[ "$json_output" == "true" ]]; then
  output=$(jq . "$tmpfile")
else
  output=$(jq -r '
    (.content // "") + "\n" +
    (if (.sources // [] | length) > 0 then
      "\n## Sources\n" +
      ([.sources | to_entries[] | "\(.key + 1). [\(.value.title // "Untitled")](\(.value.url // ""))"] | join("\n")) + "\n"
    else "" end) +
    (if .response_time then "\n*Research completed in \(.response_time | tostring | .[0:5])s*" else "" end)
  ' "$tmpfile")
fi

echo "$output"

if [[ -n "$output_file" ]]; then
  echo "$output" >"$output_file"
  echo "Saved to: $output_file" >&2
fi
