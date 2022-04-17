#!/usr/bin/env bash

prerelease_type="$1"

branch="$(git branch --show-current)"
if [[ "$branch" != "main" ]] && [[ "$branch" != "master" ]]; then
  echo "Error: Releases must be created from trunk, run $0 in main/master."
  exit 1
fi

if [[ -n "$(git status -s)" ]]; then
  echo "Error: Working tree has changes, commit or reset first"
  exit 1
fi

# https://github.com/conventional-changelog/standard-version
npx -y standard-version

# https://github.com/commitizen-tools/commitizen
pip3 install --quiet --user --upgrade commitizen

if [[ -n "$prerelease_type" ]]; then
  echo "Creating pre-release ($prerelease_type)"
  "$HOME/.local/bin/cz" bump --prerelease "$prerelease_type"
else
  "$HOME/.local/bin/cz" bump
fi
