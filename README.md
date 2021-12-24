# c🌀nfigent

No startup pitches, I am an opinionated config manager and machine bootstrapper.

Principles:

- 95% feature parity between macOS and the most popular Linux distros
- Scripts over cmdline options - keep it simple, comment out unwanted parts
- There is actually one, and only one, way to do things - the most efficient
- If something switches context faster than `tmux` and `zsh`, we'll switch to it
- The fastest open source web browser, VSCode and killer terminal. That's it.

Features:

- Bootstrap macOS/APT/YUM Linux distros one command only, only `curl` required
- One character shell aliases - the fastest are the commands one does not write
- In terminal, Rust and Go written utilities are always preferred due to speed
- Best practices language multiple versioning with `pyenv`, `rbenv` and `nvm`
- Run `docker` and `nerdctl` from macOS, by lima VMs for dockerd and containerd

Things are happening per user, but `sudo` may be required for some OS features.

## 💣

This repo is cloned to `$HOME/configent`, or pulled if it already exists there:

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/main/install.sh | sh

If git is not present, it is installed first by APT, YUM or Xcode cmdline tools.

GUI apps (macOS: Homebrew Cask, others: Snap) are not installed by `install.sh`.

If machine is not server, run `./bootstrap` in the cloned repo to install them.

### Private installation

Fork this repository. Installing from a private git repo has some prerequisites:
- Install git to clone the repo (on macOS: `xcode-select --install`)
- Create an SSH key pair (`ssh-keygen -t rsa`)
- Add SSH key `.pub` part in GitHub

Then run the one command install/update:

    git clone git@github.com:raas-dev/configent.git && configent/install.sh

## 🔋's included

Script `bootstrap` runs the three scripts in the order documented below.

### ⚙️ symlink_dotfiles

Symlinks all the files in `dotfiles/` to the user's home directory.

Script `bootstrap` passes `-f` to this script to skip override prompts per file.

Directory `bin` is symlinked to `~/local/bin`, taking 1st preference in `PATH`.

If an existing `~/local/bin` exists, it is first backed up as `~/local/bin-old`.

Restart the shell or run `source ~/.zshrc`. Then you may simply reload with `r`.

All the binaries in `bin/` are available by name from now on.

### 🖥️ install_apps

MacOS, APT-based (Ubuntu, Debian) and YUM-based (Fedora, Rocky) are supported.

[Homebrew](https://brew.sh/) is installed if `brew` is not already in `PATH`.

**On ARM64 Linux distros, Homebrew is skipped (see Known bugs).**

Secondly, [Homebrew Cask](https://formulae.brew.sh/cask/) and casks (macOS) or
[snap](https://snapcraft.io/) (Linux distros) and snaps are installed.

Thirdly, [Terminess](https://www.programmingfonts.org/#terminus) monospace
font is installed.

Fourthly, latest `zsh`, `tmux`, command-line utilities, cloud development tools
and [Neovim](https://neovim.io/) is installed.

Finally `pyenv`, `rbenv` and `nvm` and defined language versions are installed.

### 🖊️ setup_vscode

Symlinks `vscode/` to `<os_vscode_path>/Code`.

The symlink is created even if `code` is not (yet) installed.

The old `Code/` is first backed up as `Code-old`.

If `code` is present, VSCode extensions are installed.

## 🐚 User's default shell

Set the brew installed `zsh` as the user's default shell:

    install_zsh

If prefer `bash` instead, install the latest from brew and set it as default:

    install_bash

## 🏗️ Docker and containerd

On macOS, these shims wrap the respective commands to run inside Lima VMs:

- `docker`: Runs docker cli and prefers rootless docker (no sudo required)
- `docker-compose`: Installs and runs docker-compose as a docker cli plugin
- `nerdctl`: Runs nerdctl (incl. nerdctl compose) in containerd user context

The shims are also available in non-interactive sessions, while `~/.aliases`
is sourced only in terminals where STDIN (effectively keyboard) is present.

See aliases to create Lima VMs named 'ubuntu' (for Docker) and 'rancher'
(for containerd and k3s) and `d` and `n` for container build and run shortcuts.

## 🔨 Development

Tested on:
- macOS Catalina (10.15), Big Sur (11) and Monterey (12)
- Ubuntu Linux 21.10 (Impish Indri)
- Debian Linux 11 (bullseye)
- Fedora Linux 35
- Rocky Linux 8.5

### Known bugs

- Neovim plugins do not get installed unless `install_nvim` is run second time

### Won't fix

- Homebrew on Linux is not officially supported on arm64
    - Installer can be patched to skip the arm64 and
    - Required ruby 2.6.8 can be installed system-wide from source
    - Most formulas do not have arm64 bottle but must be installed from source
        - Building all dependencies from source would be tedious task
- Podman seems not to work very well with most of the containers (as of 2021-12)
- Docker installer sh does not work on Rocky Linux 8.5
