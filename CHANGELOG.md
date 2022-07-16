# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.14.0](https://github.com/raas-dev/configent/compare/1.13.0...1.14.0) (2022-07-16)


### Features

* **lima:** Add support for Arch Linux ([b31278f](https://github.com/raas-dev/configent/commit/b31278fd9b5ec9b2e59a11b7bed06edc8318f985))
* **pacman:** Add installing MS core fonts ([d2419c2](https://github.com/raas-dev/configent/commit/d2419c24c537a66e5c6da79ce2ab917a81b0d78a))
* **yay:** Use yay over pacman if yay is installed ([be968cb](https://github.com/raas-dev/configent/commit/be968cb6c866fba8a22cddb91189a2c4dd7146d3))


### Documentation

* **arch:** Note bug with snapd installation on Arch ([60f74a0](https://github.com/raas-dev/configent/commit/60f74a000660aaa53bab28a2b14520d9e5512087))


### Fixes

* **pacman:** Add gcc for brew ([83b15ab](https://github.com/raas-dev/configent/commit/83b15ab40e2b90c229760cd1cab8e9bbda5c97ff))
* **pacman:** Fix installing snap on Arch Linux ([544988a](https://github.com/raas-dev/configent/commit/544988acc283347b882882779adf6a5d40e831b4))
* **posix:** Use  over  for checking existence ([747a6f1](https://github.com/raas-dev/configent/commit/747a6f1019775b44f6a1b0facde2c491c3159f67))
* **starship:** Double command timeout due to git ([42ebe04](https://github.com/raas-dev/configent/commit/42ebe047a03ee3d97b971a5274bbb66adef4ece6))

## [1.13.0](https://github.com/raas-dev/configent/compare/1.12.0...1.13.0) (2022-07-16)


### Features

* **lima:** Add Alpine Linux 3.16 support, note brew issues ([39533a7](https://github.com/raas-dev/configent/commit/39533a7f8edbe924203ddd014ddc679e6a4169e0))
* **lima:** Add CentOS Stream 8 and AlmaLinux 8.6 ([38a26d6](https://github.com/raas-dev/configent/commit/38a26d6cf097b670bf7340b5fe80f2bc8e1bcc80))
* **lima:** Add preliminary support for Arch Linux ([ebbc1ab](https://github.com/raas-dev/configent/commit/ebbc1abf5296d8c98136c5e636ee644bc9a547a0))
* **lima:** Add Rocky Linux 3.6 support ([cc19db8](https://github.com/raas-dev/configent/commit/cc19db808533e8dee87ee59797c0030b8a61e223))


### Refactor

* **podman:** Rename VM podman-testing -> podman-ubuntu ([65dae26](https://github.com/raas-dev/configent/commit/65dae264e36dec1f24fa26ede141e2c021c782ee))


### Fixes

* **pyenv:** Fix liblzma yum package name as prerequisite for Pythons ([05f8d95](https://github.com/raas-dev/configent/commit/05f8d9509d976d3c01b53d11370eb7f8af3e2cca))
* **pyenv:** Install liblzma as prerequisite for Python ([49eb3ab](https://github.com/raas-dev/configent/commit/49eb3ab6cf5281c7ef20ca8bc34511ce4533ac5c))


### Documentation

* **README:** Add license/disclaimer badge ([8dea8ed](https://github.com/raas-dev/configent/commit/8dea8ed568a9080cc2947dfd070a3f007d73fb8e))
* **README:** Reorganize ([68be721](https://github.com/raas-dev/configent/commit/68be7211b5eebbbd5f9dcbc679211f821935ceb2))

## [1.12.0](https://github.com/raas-dev/configent/compare/1.11.0...1.12.0) (2022-07-16)


### Features

* **python:** Update Pythons ([f5123c3](https://github.com/raas-dev/configent/commit/f5123c3af6bcaa4e9951deedbe6180373764b1c6))
* **ruby:** Update Rubies ([5f4af3f](https://github.com/raas-dev/configent/commit/5f4af3ffb9101a2da8fcbc3b1b3dfac96446a285))


### Documentation

* **README:** Clarify install.sh if repo already exists ([641cf21](https://github.com/raas-dev/configent/commit/641cf21200cd472179e372d5c23de4c712c3607d))
* **README:** Clarify pulling working copy on install.sh ([5e373f8](https://github.com/raas-dev/configent/commit/5e373f8179624fbd80bd13c9fe752b9c6bb2eeeb))
* **README:** Clarify setup ([0acff3e](https://github.com/raas-dev/configent/commit/0acff3e82b18ee5ac7accf301de8a76b5ba52cfa))
* **README:** Fix typos ([cd1661a](https://github.com/raas-dev/configent/commit/cd1661a1c0858cd51636a55a974eb21bc5a32241))
* **README:** Move changelog to top ([df5b1da](https://github.com/raas-dev/configent/commit/df5b1da4a00ec35560b6270cc9beae27c0067207))
* **README:** Update known issues ([c3ddc49](https://github.com/raas-dev/configent/commit/c3ddc490fff9a50f82c10e40145030afb5e4a696))

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
