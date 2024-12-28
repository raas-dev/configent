#!/usr/bin/env bash

if [ -z "$1" ]; then
  echo "Usage: $0 <path_to_promptfiles>"
  exit 1
fi

search_path="$1"

find "$search_path" -name "*.md" -print0 | while IFS= read -r -d $'\0' file; do
  if ! grep -q "^use_tools: all$" "$file"; then
    echo "File $file does not have use_tools: all, adding metadata"

    # Remove all existing metadata blocks
    sed -i '/^---$/d' "$file"

    # Add the new metadata block
    {
      echo "---"
      echo "use_tools: all"
      echo "---"
      cat "$file"
    } >"$file.tmp" && mv "$file.tmp" "$file"
  else
    echo "File $file already has use_tools: all, skipping"
  fi
done

echo "Finished processing files."
