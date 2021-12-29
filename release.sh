#!/usr/bin/env bash

conventional_commits_starting_tag="1.2.0"
prerelease_type="$1"

# https://github.com/commitizen-tools/commitizen
pip3 install --quiet --user --upgrade commitizen

! "$HOME/.local/bin/cz" bump --dry-run && exit 0

# prefer https://github.com/KeNaCo/auto-changelog over `cz changelog`
pip3 install --quiet --user --upgrade auto-changelog

"$HOME/.local/bin/auto-changelog" --description \
  "All notable changes to this project will be documented in this file.

The format is based on \
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to \
[Semantic Versioning](https://semver.org/spec/v2.0.0.html)." \
  --starting-commit "$conventional_commits_starting_tag"^1 \
  --unreleased

git add -A CHANGELOG.md

if [[ -n "$prerelease_type" ]]; then
  echo "Creating pre-release ($prerelease_type)"
  "$HOME/.local/bin/cz" bump --changelog-to-stdout \
    --prerelease "$prerelease_type"
else
  "$HOME/.local/bin/cz" bump --changelog-to-stdout
fi
