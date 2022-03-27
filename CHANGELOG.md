# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.6.0 (2022-03-27)

### Fix

- **release**: Patch auto-changelog error with jinja2

### Feat

- **python**: Update and use Python 3.10
- **ruby**: Upgrade Ruby to 3.1
- **python**: Downgrade to Python 3.9 due to broken packages
- **vscode**: Disable multiline paste warning
- **aliases**: Add naabu via nixery
- **iac**: Add hadolint for Dockerfile linting, remvoe dockle
- **lima**: Bootstrap on background

## 1.5.0 (2022-02-16)

#### New Features

* (iac): Add aws-vault
* (gdrive): Remove installation of Google Drive
* (vscode): Disable GitLens welcome, Devskim enable BP
* (vscode): disable font aliasing
* (vscode): Decrease font size
* (casks): Optional peripheral drivers
* (iac): Install awscli and aws_completer
#### Fixes

* (profile): Check if brew present before bash_completion

Full set of changes: [`1.4.0...1.5.0`](https://github.com/raas-dev/configent/compare/1.4.0...1.5.0)

## 1.4.0 (2022-01-02)

#### New Features

* (tmux): Increase scroll speed
* (lima): forward SSH agent to Ubuntu VM
* (zsh): Improve zsh options for handling history
* (zsh): Add plugin for colored man pages
* (tmux): Double scroll speed
* (vim): Set paste mode by default
* (vim): Remove neocomplete to not override indent settings
* (IAC): Add semgrep to brew installed linters
#### Fixes

* (shells): Load bash-completion in profile
* (profile): move zoxide from shell rcs to profile
* (profile): move starship from shell rcs to profile
* (vim): Do not error hilight POSIX subshells
#### Refactorings

* (desktop): Remove long unused xfce4 configs
#### Docs

* (README): Add current version
* (README): Remove installing from a private git repo
* (README): Add latest version

Full set of changes: [`1.3.4...1.4.0`](https://github.com/raas-dev/configent/compare/1.3.4...1.4.0)

## 1.3.4 (2021-12-30)

#### Fixes

* (versioning): Update version in README.md

Full set of changes: [`1.3.3...1.3.4`](https://github.com/raas-dev/configent/compare/1.3.3...1.3.4)

## 1.3.3 (2021-12-30)

#### Fixes

* (install): Add versioning
#### Docs

* (development): Link to changelog
#### Others

* (release): Fix checking if working copy dirty
* (releases): Add versioning to install.sh
* (release): Create releases only from undirty trunk

Full set of changes: [`1.3.2...1.3.3`](https://github.com/raas-dev/configent/compare/1.3.2...1.3.3)

## 1.3.2 (2021-12-29)

#### Fixes

* (precommit): Add default_stage to prevent hooks running twice
* (precommit): Install commit-msg hook in addition to pre-commit
#### Others

* (release): Explicitly use pip3
* (release): Do not generate CHANGELOG.md if no commits

Full set of changes: [`1.3.1...1.3.2`](https://github.com/raas-dev/configent/compare/1.3.1...1.3.2)

## 1.3.1 (2021-12-29)

#### Fixes

* (gitconfig): git out to push both commits and tags

Full set of changes: [`1.3.0...1.3.1`](https://github.com/raas-dev/configent/compare/1.3.0...1.3.1)

## 1.3.0 (2021-12-29)

#### New Features

* (gitconfig): git out to push tags

Full set of changes: [`1.2.2...1.3.0`](https://github.com/raas-dev/configent/compare/1.2.2...1.3.0)

## 1.2.2 (2021-12-29)

#### Fixes

* (aliases): prefix npx powered aliases by npx-
#### Others

* (changelog): update changelog
* (commit): disable release.sh on commit

Full set of changes: [`1.2.1...1.2.2`](https://github.com/raas-dev/configent/compare/1.2.1...1.2.2)

## 1.2.1 (2021-12-29)

#### Refactorings

* (profile): support only multi-user nix installation
#### Others

* (sh): tidy release scripts
* Tidy up release files

Full set of changes: [`1.2.0...1.2.1`](https://github.com/raas-dev/configent/compare/1.2.0...1.2.1)

## 1.2.0 (2021-12-29)

#### New Features

* Add commitizen
