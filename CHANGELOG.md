# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.11.0](https://github.com/raas-dev/configent/compare/1.10.0...1.11.0) (2022-07-14)


### Features

* **aliases:** Add alias for translating to English ([e2118bb](https://github.com/raas-dev/configent/commit/e2118bb92c4d5951ed5959656285e4861f42aaeb))


### Fixes

* **pre-commit:** Fix pre-commit path in docs ([b037750](https://github.com/raas-dev/configent/commit/b0377507e48c2d9e2eb17cff7b71b0275b802288))


### Documentation

* **README:** Add note on overriding existing dotfiles ([14e51c0](https://github.com/raas-dev/configent/commit/14e51c021110ee54457e6891b61c2d7bbde641b0))
* **README:** Fix typos ([23beaa0](https://github.com/raas-dev/configent/commit/23beaa0f04699ce9fe0fa76f6d4ab227abee3373))
* **README:** Update distros tested on ([eed6b65](https://github.com/raas-dev/configent/commit/eed6b659cf807f63e4ecb07b5af317a3d1dbb2c1))

## [1.10.0](https://github.com/raas-dev/configent/compare/1.9.0...1.10.0) (2022-07-12)


### Features

* **got:** Add got (google translator) cli ([112373a](https://github.com/raas-dev/configent/commit/112373af913834b44c84127eec8163870a188957))


### Fixes

* **tmux:** Use tmux 3.2 due to broken termcap on 3.3 ([ed4c6d3](https://github.com/raas-dev/configent/commit/ed4c6d321dd2653bd098ad85afb78c6d0c6f2443))

## [1.9.0](https://github.com/raas-dev/configent/compare/1.8.0...1.9.0) (2022-05-24)


### Features

* **lima:** Add hostResolver for Docker ([b37ba2c](https://github.com/raas-dev/configent/commit/b37ba2c73557203c4d1f417c4b46ac57a32436cd))
* **lima:** Update images ([43492f7](https://github.com/raas-dev/configent/commit/43492f7c430e9c2c0d3ee5547f938b3b5bb3ff9d))


### Fixes

* **shell:** Fix export SHELL on brew installed shells ([5cafd07](https://github.com/raas-dev/configent/commit/5cafd072b887cf23207082a820f234ad8529d4b3))

## [1.8.0](https://github.com/raas-dev/configent/compare/1.7.0...1.8.0) (2022-04-29)


### Features

* **docker:** Brew install ctop on GNU/Linux ([698daed](https://github.com/raas-dev/configent/commit/698daed3430c9d9a7a73959854d5f03a3a12cf26))


### Refactor

* **zsh:** Remove zplug plugin source as github by default ([7186403](https://github.com/raas-dev/configent/commit/718640380d894518c4f6449b6dcd869c861bdb79))


### Fixes

* **git:** Alias git out push changes and tags ([46c5716](https://github.com/raas-dev/configent/commit/46c57164b6454b58dd76065f794343c430c04981))
* **python:** Use brew to install pre-requisites for Pythons ([1ceb0ce](https://github.com/raas-dev/configent/commit/1ceb0ce25729e5386af535e49c9cc70dc1590e98))
* **release:** Add updating CHANGELOG for prereleases ([576c93c](https://github.com/raas-dev/configent/commit/576c93c61b509949ac3aee292fa803b94d948c2b))
* **vscode:** Fix kubectl mac path ([9e63bbb](https://github.com/raas-dev/configent/commit/9e63bbbceb36eb5ca6312d725cae39ed6bb1f7de))
* **zsh:** Load zsh-syntax-highlighting ([6091d66](https://github.com/raas-dev/configent/commit/6091d6620fdba4d8913293ba0c8137193cf4fab7))

## [1.7.0](https://github.com/raas-dev/configent/compare/1.6.1...1.7.0) (2022-04-17)


### Features

* **git:** alias git out to follow tags ([ce9f4e8](https://github.com/raas-dev/configent/commit/ce9f4e8c3158d4b9479b97c7d740c957ec364194))
* **npx:** Add alias for standard-version ([94263f4](https://github.com/raas-dev/configent/commit/94263f4f3fd3091e1c1f690433686d232901c0d7))
* **vscode:** Add kubectl path ([eb63e6c](https://github.com/raas-dev/configent/commit/eb63e6ca59a2170d5110deaba2764c99ad8f798d))
* **vscode:** Update list of vscode extensions ([0e94389](https://github.com/raas-dev/configent/commit/0e94389c0f1767d29d9be292dfa2a7752dbd6f9d))


### Bug Fixes

* **release:** Fix generating changes for latest tag ([0a5837f](https://github.com/raas-dev/configent/commit/0a5837f0d30464d4122bdeaaa3804c5efcc9bc36))
* **vscode:** Fix terminal contrast ([bfd1b87](https://github.com/raas-dev/configent/commit/bfd1b875f53e1898677cf082193baa394d9e11b6))

## 1.6.2 (2022-03-27)

#### Fixes

* (release): Fix generating changes for latest tag

Full set of changes: [`1.6.1...1.6.2`](https://github.com/raas-dev/configent/compare/1.6.1...1.6.2)

## 1.6.1 (2022-03-27)

#### Fixes

* (chanagelog): Reformat CHANGELOG with auto-changelog

Full set of changes: [`1.6.0...1.6.1`](https://github.com/raas-dev/configent/compare/1.6.0...1.6.1)

## 1.6.0 (2022-03-27)

#### New Features

* (python): Update and use Python 3.10
* (ruby): Upgrade Ruby to 3.1
* (python): Downgrade to Python 3.9 due to broken packages
* (vscode): Disable multiline paste warning
* (aliases): Add naabu via nixery
* (iac): Add hadolint for Dockerfile linting, remvoe dockle
* (lima): Bootstrap on background
#### Fixes

* (release): Patch auto-changelog error with jinja2

Full set of changes: [`1.5.0...1.6.0`](https://github.com/raas-dev/configent/compare/1.5.0...1.6.0)

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
