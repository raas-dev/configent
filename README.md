# c🌀nfigent (1.6.2)

[![Latest version](https://img.shields.io/github/v/tag/raas-dev/configent?label=latest&sort=semver)](https://github.com/raas-dev/configent/tags)

No startup pitches, I am an opinionated config manager and machine bootstrapper.

Principles:

- 95% feature parity between macOS and the most popular Linux distros
- Scripts over cmdline options - keep it simple, comment out unwanted parts
- There is actually one, and only one, way to do things - the most efficient
- If something switches context faster than `tmux` and `zsh`, we'll switch to it
- The fastest open source web browser, VSCode and killer terminal. That's it.

Features:

- Bootstrap macOS/APT/YUM/Alpine Linux with one command, only `curl` required
- One character shell aliases - the fastest are the commands one does not write
- In terminal, Rust and Go written utilities are always preferred due to speed
- Multiple language versions with `rustup`, `gvm`, `nvm` `pyenv` and `rbenv`
- Run `docker` and `nerdctl` from macOS, by lima VMs for dockerd and containerd

Things are happening per user, but `sudo` may be required for some OS features.

## 💣 Up

This repo is cloned to `$HOME/configent`, or pulled if it already exists there:

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/1.6.2/install.sh | sh

If git is not present, it is installed first by the Linux distro's package
manager or by Xcode cmdline tools on macOS.

### GUI apps

Homebrew Cask or Snaps are not installed by default, as a server/VM is assumed.

Re-run `./bootstrap` in the repo (after `install.sh` finishes) to install them.

## 🔋's included

Script `bootstrap` runs the three below scripts in the order described.

### ⚙️ symlink_dotfiles

Symlinks all the files in `dotfiles/` to the user's home directory.
Script `bootstrap` passes `-f` to this script to skip override prompts per file.

Directory `bin` is symlinked to `~/local/bin`, taking 1st preference in `PATH`.
If `~/local/bin` already exists, it is backed up as `~/local/bin-old`.

Restart the shell or run `source ~/.zshrc`. Then you may simply reload with `r`.

All the binaries in `bin/` are available by name from now on.

### 🖥️ install_apps

MacOS, APT-distros (Ubuntu, Debian), YUM-distros (Fedora, Rocky) and
Alpine Linux are supported.

**On ARM64 Linux distros, Homebrew is skipped (see Known bugs).**

Order of installation:
1. [Homebrew](https://brew.sh/) if it is not already in `PATH`
2. [Homebrew Cask](https://formulae.brew.sh/cask/) and casks (macOS) or
[Snap](https://snapcraft.io/) (Linux distros) and snaps
3. [Terminess](https://www.programmingfonts.org/#terminus) monospace font
4. Vim bundles, and if `brew` is present, Neovim
5. Rust, Go, Node, Python and Ruby version managers and the language versions
6. Zsh, tmux, command-line utilities and infrastructure-as-code tools

### 🖊️ setup_vscode

The script symlinks `vscode/` to `<os_vscode_path>/Code`.
The old `Code/` is first backed up as `Code-old`.

This is done even if `code` is not (yet) installed.
If `code` is present, VSCode extensions are installed.

## 🐚 Default shell

Set the brew installed `zsh` as the user's default shell:

    install_zsh

If prefer `bash` instead, install the latest from brew and set it as default:

    install_bash

## 🏗️ dockerd and containerd

Couple of things to understand:

- the two are different runtimes - if you used Docker Desktop, it was dockerd
- containerd is the standard runtime of production kubernetes - thus prefer it
- regardless of runtime, `sudo` is always a bad idea in terms of security

On macOS, these shims wrap the respective runtime CLIs to run inside lima VMs:

- `docker`: Runs docker cli and prefers rootless dockerd (no sudo is required)
- `docker-compose`: Installs and runs docker-compose as a docker cli plugin
- `nerdctl`: Runs nerdctl (also `nerdctl compose`) in user context containerd

The shims are available in non-interactive sessions, while `~/.aliases` is
sourced only in terminals where STDIN (effectively keyboard) is present.

The shims create or start the necessary virtual machines, a lima VM named
'ubuntu' for running rootless dockerd and a lima VM 'rancher' for containerd.

In addition, 'rancher' VM has [k3s](https://k3s.io/) for local Kubernetes.

See aliases for creating additional VMs and aliases `d` and `n` for running
containers.

## 🔨 Development

Tested on:
- macOS Catalina (10), Big Sur (11) and Monterey (12)
- Ubuntu Linux 21.10 (Impish Indri)
- Debian Linux 11 (bullseye)
- Fedora Linux 35
- Rocky Linux 8.5
- Alpine Linux 3.14.3

For the history of fixes, added and removed features, see
[CHANGELOG.md](https://github.com/raas-dev/configent/blob/main/CHANGELOG.md)

### Contributing

Install or upgrade [pre-commit](https://pre-commit.com/) and the hooks:

    pip3 install --user --upgrade pre-commit
    "$HOME/.local/bin/pre-commit" install --hook-type pre-commit
    "$HOME/.local/bin/pre-commit" install --hook-type commit-msg

### Known bugs

Please create an [issue](https://github.com/raas-dev/configent/issues) and
a pull request.

#### Won't fix

- Homebrew on Linux is not officially supported on aarch64
    - Hack1: Installer can be patched to skip the aarch64 check
    - Hack2: Requirement ruby 2.6.8 can be installed system-wide from source
    - Showstopper: Most formulas do not have aarch64 bottle
        - Building all dependencies from source would be tedious task
- Rocky Linux 8.5 has serious issues booting on aarch64
    - Rootless Docker installer (sh) does not work on x86_64 either
- Podman does not seem very well with most containers (as of 2021-12)
