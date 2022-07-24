# c🌀nfigent (1.18.6)

[![Changelog](https://img.shields.io/github/v/tag/raas-dev/configent?label=changelog&sort=semver)](https://github.com/raas-dev/configent/blob/main/CHANGELOG.md) [![LGPL-3.0](https://img.shields.io/github/license/raas-dev/configent)](https://github.com/raas-dev/configent/blob/main/LICENSE)

No startup pitches, I am a principled config manager and machine bootstrapper.

- 95% consistent user experience both on macOS and the most used Linux distros
- 100% automated: Scripts over options or menus, comment out unwanted parts
- There is actually one, and only one, way to do things - the most efficient
- If something switches context faster than `tmux` and `zsh`, we'll switch to it
- The fastest open source web browser, VSCode and a killer terminal. That's it.

| ![Screenshot of Brave Browser and VSCode with tmux and zsh](ui/target.webp) |
| --------------------------------------------------------------------------- |

Features:

- Get full macOS or Linux development environment by running one `curl` command
- Use multiple language versions with `rustup`, `gvm`, `nvm` `pyenv` and `rbenv`
- macOS `docker` experience exactly as it was with Docker Desktop, but it's free
- Multiplexed terminals with helpers/utilities written in Rust and Go for speed
- One character shell aliases - the fastest are the commands one does not type

Works on:

- macOS Monterey (12), Big Sur (11) and Catalina (10)
- Ubuntu Linux 22.04 LTS (Jammy Jellyfish) and 21.10 (Impish Indri)
- Debian Linux 11 (bullseye)
- Fedora Linux 36 and 35
- Rocky Linux 8.6 and 8.5
- CentOS Stream 8
- AlmaLinux 8.6
- Oracle Linux 8.6
- Arch Linux (rolling; since 2022-07)
- Alpine Linux 3.16, 3.15 and 3.14

Things are happening per user, but `sudo` may be used for some OS features.

## 💣 Up

**Note: The script overrides your current dotfiles at $HOME without prompting.**

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/1.18.6/install.sh | sh

If git is not present on the machine, it is installed first by the Linux
distro's package manager or by Xcode Command Line Tools on macOS.

Then the respective git tag from this repository is cloned as `$HOME/configent`,
or main branch is pulled on top of it if the git working copy already exists.

### Server (default)

Nothing is prompted by `install.sh`. It is non-interactive and thus suitable
for cloud-init.

Fork this repo, comment or uncomment the wanted tech stacks in `install_apps`,
and change the curl URL to point to your public fork.

### Desktop

GUI apps are not installed by `install.sh` as a server is assumed.
Run `bootstrap` in the git working copy created to install GUI apps.

Add or remove GUI apps to your liking in `bin/install_apps_snap`
(Snap on Linux distros) or `bin/install_apps_cask` (Homebrew Cask on macOS).

To use GUI apps on Linux distros, you have to install Xorg, display manager and
window manager of your choice. See the distro's own instructions for that.

## 🔋's included

Script `bootstrap` runs the three below scripts in the order described.

This script essentially handles the whole automated setup (dotfiles, apps,
VSCode, zsh) of the machine it is run in and the script is non-interactive.

The default shell is not changed to zsh (as there is a chance that zsh
installation has failed), but you may do it (and get prompted) by running
`bin/install_zsh` after `bootstrap` has finished.

### ⚙️ symlink_dotfiles

Creates symlinks in the user's home directory for all the files in  `dotfiles/`.

Script `bootstrap` passes `-f` to `symlink_dotfiles` to skip override prompts
per already existing file or symlink in the user's home directory.

Directory `bin` is symlinked to `~/local/bin`, taking 1st preference in `PATH`.
If `~/local/bin` already exists, it is backed up as `~/local/bin-old`.

Restart the shell or run `source ~/.bashrc`. Then on, you may simply reload
the configuration of the current shell (`.bashrc` or `.zshrc`) shell with `r`.

All the scripts in `bin/` are available by name from now on.

### 🖥️ install_apps

MacOS, APT, YUM and pacman based distros, as well as Alpine Linux, are known.

**On ARM64 Linux distros, Homebrew parts are skipped (see [Known bugs](https://github.com/raas-dev/configent#known-bugs)).**

Order of installation:
1. [Homebrew](https://brew.sh/) if it is not already in `PATH`
2. [Homebrew Cask](https://formulae.brew.sh/cask/) and casks (macOS) or
[Snap](https://snapcraft.io/) (Linux distros) and snaps
3. [Terminess](https://www.programmingfonts.org/#terminus) monospace font
4. Vim bundles, and if `brew` is present, Neovim
5. Go, Node.js and Python version managers and the specified language versions
6. Zsh, tmux, command-line utilities, cloud and infrastructure-as-code tools

### 🖊️ setup_vscode

The script symlinks `vscode/` to `<os_vscode_path>/Code`.
The old `Code/` is first backed up as `Code-old`.

This is done even if `code` is not (yet) installed.
If `code` is present, VSCode extensions are installed.

## 🐚 Default shell

Set the brew installed `zsh` as the user's default shell:

    install_zsh

If you prefer `bash` instead, brew the latest Bash and set it as default:

    install_bash

## 🏗️ dockerd and containerd

Things to understand:

- the two are different runtimes - if you used Docker Desktop, it was dockerd
- containerd is the de facto runtime in production Kubernetes - thus prefer it
- regardless of runtime, `sudo` is always a bad idea when it comes to security

On macOS, these `bin/` shims wrap the respective CLIs to run inside Linux VMs:

- `docker`: Runs docker cli and prefers rootless dockerd (no sudo is required)
- `docker-compose`: Installs and runs docker-compose as a docker cli plugin
- `nerdctl`: Runs nerdctl (also `nerdctl compose`) in user context containerd

The shims are available in non-interactive sessions, while `~/.aliases` is
sourced only in terminals where STDIN (effectively keyboard) is present.

[Lima](https://github.com/lima-vm/lima) is used for managing Linux VMs on QEMU.

The shims create or start the necessary virtual machines, a lima VM named
'ubuntu' for running rootless dockerd and a lima VM 'rancher' for containerd.

Note: Both 'ubuntu' and 'rancher' VMs mount your host's `$HOME` directory as
writable in the VM. This enables containers to use bind mounts (directories
on file system). If you want to keep host's home read-only (and prefer
Docker managed volumes instead), adjust `writable` in `etc/lima/<vmname>.yaml`.

In addition, VM 'rancher' includes [k3s](https://k3s.io/) for local Kubernetes.

Tip: Use aliases `d` and `n` as generic shortcuts for starting containers in
`docker` or `nerdctl` respectively, as long as the current working directory has
`Dockerfile` present. The host-container mapped ports are output by the aliases.

## 🔨 Development

See `dotfiles/.aliases` for `vm4...` creating
[lima](https://github.com/lima-vm/lima) VMs to test on various Linux distros.

See alias `v` for starting, shelling into, stopping and deleting the VM.

VMs are provisioned by [cloud-init](https://cloudinit.readthedocs.io/en/latest/)
on boot by fetching and running `install.sh` from this repo's main branch.

Once VM has been started, your host's `$HOME` directory is mounted in the VM,
for testing scripts changes without first commiting and pushing to the remote
repo/your fork.

### Contributing

Install or upgrade [pre-commit](https://pre-commit.com/) and install the hooks:

    pip3 install --user --upgrade pre-commit
    pre-commit install --hook-type pre-commit
    pre-commit install --hook-type commit-msg

### Known bugs

Please create an [issue](https://github.com/raas-dev/configent/issues) and
a pull request.

#### Out of scope

- Homebrew on Linux on 64-bit ARM: [Not officially supported](https://docs.brew.sh/Homebrew-on-Linux#arm)
    - Most formulae do not have AArch64 binary packages ("bottles") for Linux
    - Building all dependencies from source would be too long of a bootstrap
    - Thus `install.sh` skips Homebrew parts on AArch64 Linux distros (2022-07)
- Homebrew on Alpine Linux: Issues in formulae due to Alpine Linux not using glibc
- Alpine Linux on Lima: Lima [shims](https://github.com/lima-vm/lima/blob/master/pkg/cidata/cidata.TEMPLATE.d/boot/01-alpine-ash-as-bash.sh) `/bin/bash` to `/bin/ash` on boot
    - Thus Installing bash and setting it as the user's login shell does not work expectedly
- Fedora Linux: Must reboot after `squashfuse` installation for `snap` to work
    - error: `system does not fully support snapd: cannot mount squashfs image using "squashfs"`
