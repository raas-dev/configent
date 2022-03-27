#!/usr/bin/env bash

conventional_commits_starting_tag="1.2.0"
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

# https://github.com/commitizen-tools/commitizen
pip3 install --quiet --user --upgrade commitizen

if [[ -n "$prerelease_type" ]]; then
  echo "Creating pre-release ($prerelease_type)"
  "$HOME/.local/bin/cz" bump --prerelease "$prerelease_type"
else
  "$HOME/.local/bin/cz" bump
fi

# prefer https://github.com/KeNaCo/auto-changelog over `cz changelog`
# change target after https://github.com/KeNaCo/auto-changelog/pull/114 merged
pip3 install --quiet --user --upgrade git+https://github.com/kapsner/auto-changelog.git

"$HOME/.local/bin/auto-changelog" --description \
  "All notable changes to this project will be documented in this file.

The format is based on \
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to \
[Semantic Versioning](https://semver.org/spec/v2.0.0.html)." \
  --starting-commit "$conventional_commits_starting_tag"^1 \
  --unreleased

git add -A CHANGELOG.md
git commit --amend --reuse-message HEAD
