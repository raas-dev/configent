#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Usage: $0 <path_to_prompts>"
  exit 1
fi

search_path="$1"

find "$search_path" -name "*.md" -print0 | while IFS= read -r -d $'\0' file; do
  first_line=$(sed -e '/^[[:space:]]*$/d' -e '/^---$/q; d' "$file")
  if [[ "$first_line" != "---" ]]; then
    echo "File $file does not have metadata, adding metadata"
    {
      echo "---"
      echo "use_tools: all"
      echo "---"
      cat "$file"
    } >"$file.tmp" && mv "$file.tmp" "$file"
  fi
done

echo "Finished processing files."
