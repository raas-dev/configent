# c🌀nfigent

No startup pitches, I am an opinionated config manager and machine bootstrapper.

Principles:

- 95% feature parity between macOS and the most popular Linux distros
- Scripts over cmdline options - keep it simple, comment out unwanted parts
- There is actually one, and only one, way to do things - the most efficient
- If something switches context faster than `tmux` and `zsh`, we'll switch to it
- The fastest open source web browser, VSCode and killer terminal. That's it.

Features:

- Bootstrap macOS/APT/YUM Linux distros one command only with `curl` and `bash`
- One character shell aliases - the fastest are the commands one does not write
- In terminal, Rust and Go written utilities are always preferred due to speed
- Best practices language multiple versioning with `pyenv`, `rbenv` and `nvm`
- Run `docker` and `nerdctl` from macOS, by lima VMs for dockerd and containerd

Things are happening per user, but `sudo` may be required for some OS features.

## TL;DR

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/main/install.sh | bash

If git is not present, it is installed by APT or YUM (or by Xcode command line
tools on macOS) and the repo is cloned to `$HOME/configent`.

GUI apps (macOS: Homebrew Cask, others: Snap) are not installed by `install.sh`,
after the installation re-run `./bootstrap` in the cloned repo to install them.

### From a private git repo

Prerequisites:
- Install git to clone the repo (on macOS: `xcode-select --install`)
- Create an SSH key pair (`ssh-keygen -t rsa`)
- Add SSH key `.pub` part in GitHub

Clone the repo and run one command install:

    git clone git@github.com:raas-dev/configent.git && configent/install.sh

## Scripts included

Script `bootstrap` runs all the scripts documented below.

### ⚙️ Dotfiles

Symlinks all files in `dotfiles/` to home directory (pass `-f` to skip prompts):

    ./symlink_dotfiles

Directory `bin` is symlinked to `~/local/bin` which takes preference in `PATH`.

If an existing `~/local/bin` exists, it is first backed up as `~/local/bin-old`.

Restart the shell, or run `source ~/.zshrc` (or `source ~/.bashrc`) and
binaries in `bin/` are available by name.

### 🖥️ Apps

MacOS, APT-based (Ubuntu, Debian) and YUM-based (Fedora, Rocky) are supported:

    ./install_apps

[Homebrew](https://brew.sh/) is installed first if `brew` is not already in
`PATH`. **On ARM64 Linux distros, Homebrew is skipped (see Known bugs).**

Secondly, [Homebrew Cask](https://formulae.brew.sh/cask/) and casks (macOS) or
[snap](https://snapcraft.io/) (Linux distros) and snaps are installed.

Thirdly, latest `zsh` and `bash`, `tmux` and other command-line utilities, 
cloud development tools and [Neovim](https://neovim.io/) are installed,
if `brew` is present

Fourthly, [Terminess](https://www.programmingfonts.org/#terminus) monospace
font is installed.

Finally `pyenv`, `rbenv` and `nvm` and defined language versions are installed.

### 🖊️ Visual Studio Code

Symlink `vscode/` to `<vscode_config_path>/Code` (back ups old as `Code-old`):

    ./setup_vscode

If `code` is present, extensions are installed.

### 🐚 User's default shell

Set the brew installed `zsh` as the user's default shell:

    install_zsh

or, if prefer (brew installed) `bash` instead:

    install_bash

## Docker and containerd

On macOS, these shims wrap the respective commands to run inside Lima VMs:

- `docker`: Runs docker cli and prefers rootless docker (no sudo required)
- `docker-compose`: Installs and runs docker-compose as a docker cli plugin
- `nerdctl`: Runs nerdctl (incl. nerdctl compose) in containerd user context

The shims are also available in non-interactive sessions, while `~/.aliases`
is sourced only in terminals where STDIN (effectively keyboard) is present.

See aliases to create Lima VMs named 'ubuntu' (for Docker) and 'rancher'
(for containerd and k3s) and `d` and `n` for container build and run shortcuts.

## Development

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
