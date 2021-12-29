#!/usr/bin/env bash

# https://github.com/commitizen-tools/commitizen
pip install --quiet --user --upgrade commitizen

cz bump

# https://github.com/KeNaCo/auto-changelog
pip install --quiet --user --upgrade auto-changelog

auto-changelog --description \
  "All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to \
[Semantic Versioning](https://semver.org/spec/v2.0.0.html)." \
  --starting-commit 1.2.0^1 --unreleased

git add -A CHANGELOG.md
