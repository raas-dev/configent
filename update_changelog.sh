#!/usr/bin/env bash

npx -y auto-changelog --template keepachangelog \
  --unreleased \
  --hide-empty-releases \
  --breaking-pattern BWIC \
  --issue-pattern "^[Ff]ix" \
  --ignore-commit-pattern "^(?:[Rr]e(?:forma|inden)t|(?:[Ff]orma|[Ii]nden)t)"

git add -A CHANGELOG.md
