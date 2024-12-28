#!/usr/bin/env bash

# Check if the fabric directory exists
if [ -d "fabric" ]; then
  echo "Fabric repository already exists. Pulling latest changes with rebase..."
  pushd fabric >/dev/null || exit
  git pull --rebase origin main
  popd >/dev/null || exit
else
  echo "Cloning the latest commit of the fabric repository..."
  git clone --depth 1 https://github.com/danielmiessler/fabric.git
fi

# Create assistant directory if it doesn't exist
mkdir -p assistant

# Loop through all patterns and convert them
while IFS= read -r -d '' pattern_file; do
  # Extract pattern name from the path
  pattern_dir=$(dirname "$pattern_file")
  pattern_name=$(basename "$pattern_dir")

  # Create the output file path
  output_file="assistant/${pattern_name}.md"

  # Copy the content of system.md to the new file, removing "# INPUT:", "INPUT:", or "# INPUT" lines at the end
  sed '/^# INPUT:$/d;/^INPUT:$/d;/^# INPUT$/d' "$pattern_file" >"$output_file"

  # Check if user.md exists and is not empty
  user_file="${pattern_dir}/user.md"
  if [ -s "$user_file" ]; then
    # Removing "CONTENT:" line if present
    sed '1s/^CONTENT://;1!b' "$user_file" >>"$output_file"
  fi

  echo "Converted $pattern_file to $output_file"
done < <(find fabric/patterns -name system.md -print0)

echo "Conversion complete. See assistant/ for the prompt files."
