#!/usr/bin/env bash

pip install --user --upgrade commitizen
cz bump

npx --yes auto-changelog \
  --template keepachangelog \
  --unreleased \
  --hide-empty-releases \
  --ignore-commit-pattern "^(?:[Rr]e(?:forma|inden)t|(?:[Ff]orma|[Ii]nden)t)"

git add -A CHANGELOG.md
