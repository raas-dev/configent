# c🌀nfigent (1.58.4)

[![Changelog](https://img.shields.io/github/v/tag/raas-dev/configent?label=changelog&sort=semver)](https://github.com/raas-dev/configent/blob/main/CHANGELOG.md)
[![LGPL-3.0](https://img.shields.io/github/license/raas-dev/configent)](https://github.com/raas-dev/configent/blob/main/LICENSE)

No startup pitches, I am a DevOps principled development machine bootstrapper.

- 100% automated installation of curated, only stable and battle-tested tools
- 95% consistent user experience both on macOS and the most used Linux distros
- There is actually one, and only one, way to do it right - the most efficient
- If something switches context faster than `tmux` and `zsh`, we'll switch to it
- The secure open source web browser, VSCode and a killer terminal. That's it.

| ![Screenshot of Brave Browser and VSCode with tmux and zsh](ui/target.webp) |
| --------------------------------------------------------------------------- |

Features:

- Get full macOS or Linux development environment by running one `curl` command
- macOS `docker` experience exactly as it was with Docker Desktop, but it's free
- Multiplexed terminals with helpers/utilities written in Rust and Go for speed
- One character shell aliases - the fastest are the commands one does not type
- Use GPT in terminal and in IDE to create rest of the commands, code and apps

Works on x86_64 and AArch64/ARM64 operating systems:

- macOS Ventura (13), Monterey (12) and Big Sur (11)
- Ubuntu Linux 22.04 LTS (Jammy Jellyfish)
- Debian Linux 12 (Bookworm) and 11 (Bullseye)
- Fedora Linux 38, 37 and 36
- CentOS Stream 9 and 8
- AlmaLinux 9 and 8
- Rocky Linux 9 and 8
- Oracle Linux 9 and 8
- openSUSE Leap 15.4
- Arch Linux (rolling; since 2022-07)
- Alpine Linux 3.18, 3.17, 3.16 and 3.15

Minimum requirements are 4GB RAM and 10GB disk, or a 2016 MacBook Pro,
both on which it is <30 minutes.

## 💣 Up

VSCode configs and dotfiles are installed per-user.
**Existing dotfiles at `$HOME` are overridden without prompting.**

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/1.58.4/install.sh | sh

To install system-wide packages, `sudo` password may be asked in the beginning.

If git is not present, it is installed by the Linux distro's package manager
or by Xcode Command Line Tools on macOS.

Then the respective git tag from this repository is cloned as `$HOME/configent`,
or main branch is pulled on top of it if the git working copy already exists.

### Server (default)

Script `install.sh` is non-interactive and suitable for cloud-init when run as
user with passwordless sudo (recommended), or as root.

Fork this repo, comment or uncomment the wanted tech stacks in `install_apps`,
and change the curl URL to point to your public fork.

GUI apps are not installed by `install.sh` as a server is assumed.

### Desktop

Run `bootstrap` in the git working copy (`$HOME/configent`) to install GUI apps.

Add or remove GUI apps to your liking in `bin/install_apps_flatpak`
(Flatpak on Linux distros) or `bin/install_apps_cask` (Homebrew Cask on macOS).

To use GUI apps on Linux distros, you have to install Xorg, display manager and
window manager of your choice. See your distro's own instructions for that.

## 🔋's included

Script `bootstrap` runs the three below scripts in the order described.

This script essentially handles the whole automated setup (dotfiles, apps,
VSCode, zsh) of the machine it is run in and the script is non-interactive.

The default shell is not changed to `zsh`, but you may do it (and get prompted)
by running `bin/install_zsh` after `bootstrap` has finished.

### symlink_dotfiles

Creates symlinks in the user's home directory for all the files in  `dotfiles/`.

Script `bootstrap` passes `-f` to `symlink_dotfiles` to skip override prompts
per already existing file or symlink in the user's home directory.

Directory `bin` is symlinked to `~/local/bin`, taking 1st preference in `PATH`.
If `~/local/bin` already exists, it is backed up as `~/local/bin-old`.

💡: Restart the shell or run `source ~/.bashrc`. Then on, you may simply reload
the configuration of the current shell (`.bashrc` or `.zshrc`) shell with `r`
and all the scripts in `bin/` are available by name.

### install_apps

MacOS, apt, yum, zypper, pacman and apk based Linux distros are recognized.

⚠️: On AArch64 Linux distros, Homebrew parts are skipped (see [Issues in dependencies](https://github.com/raas-dev/configent#issues-in-dependencies)).

Order of installation:
1. [Homebrew](https://brew.sh/) if it is not already in `PATH`
2. GUI apps by [Homebrew Cask](https://formulae.brew.sh/cask/) (macOS) or
[Flatpak](https://flatpak.org/) (Linux distros)
3. Zsh, tmux, tmux plugins, cloud development and infrastructure-as-code tools
4. Rust, Go, Node.js and Python version managers, language versions and packages
5. [Terminess](https://www.programmingfonts.org/#terminus) monospace font
6. Vim bundles, and if `brew` is present, [Neovim](https://neovim.io/)

With Homebrew on Linux, system-wide installation (i.e. `/home/linuxbrew`) is
preferred but if this is not possible (no `sudo`), it is installed user's home.

On macOS, Homebrew formulae and casks are always installed user-wide.

On Linux distros, flatpaks are always installed user-wide.

### setup_vscode

The script symlinks `vscode/` to `<user_vscode_path>/Code`.
The old `Code/` is first backed up as `Code-old`.

Symlinking happens even if `code` has not been installed.
If `code` is present, also VSCode extensions (`vscode/extensions.list`)
are installed.

To update the list after adding or removing extensions in VSCode, run
`vscode/create_extensions_list`.

Configuring
[VSCode Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync)
will not interfere with storing configs in the git repo.

## 🐚 Default shell

Set `zsh` as the user's default shell:

    install_zsh

If you prefer `bash` instead:

    install_bash

## 🏗️ dockerd and containerd

Both container runtimes in a nutshell:

- the two are different runtimes - if you used Docker Desktop, it was dockerd
- containerd is the industry-standard (CNCF) runtime in Kubernetes deployments
- regardless of the runtime, containers must not be run with `sudo`

These `bin/` shims wrap the container runtime CLIs to run best-effort on the OS:

- `docker`: Runs docker cli preferring rootless docker when available (no sudo)
- `nerdctl`: Runs nerdctl (containerd cli) on the rootless containerd (no sudo)
- `podman`: The 3rd option, near-Docker compatible daemonless runtime (no sudo)

The shims are available in non-interactive sessions, while `~/.aliases` is
sourced only in terminals where STDIN (effectively keyboard) is present.

💡: Use alias `d` as a shortcut for building a docker image in the current
directory. `Dockerfile` is used for building if present, otherwise `nixpacks`
is used to detect the tech stack and build the image best effort.
After the image is built, a new container is launched from it. If alias `d` was
used with `--detached`/`-d`, host-container mapped ports are output and
docker logs are followed.

### macOS

Both dockerd and containerd base on Linux kernel features not present on macOS
so [Lima](https://github.com/lima-vm/lima) is used creating Linux VMs on QEMU.

The above shims create or start the necessary virtual machines, a lima VM named
'ubuntu' for running rootless dockerd and a lima VM 'debian' for running
rootless containerd.

VM 'debian' has [k3s](https://k3s.io/) for testing on Kubernetes, see Lima VM's
startup message for exporting `KUBECONFIG` to access it with `kubectl`.

VM 'fedora' has rootless [podman](https://podman.io/), run `podman` to use it.

⚠️: VMs 'ubuntu', 'debian' and 'fedora' mount your host's `$HOME` directory as
writable in the VM. This enables containers to use bind mounts (directories
on file system). If you want to keep host's home read-only (and prefer container
managed volumes instead), adjust `writable` in `etc/lima/<vmname>.yaml`.

## ❄️ Nix

[Nix](https://nix.dev/) is not installed in host but is run in OCI containers.

Aliases `nix`, `nix-env` and `nix-shell` start and attach a Nix environment
in a docker container from an image built by `etc/nix/Dockerfile`.

The following aliases are available for creating ad-hoc (shell) environments:
- `n`: Creates an ad-hoc shell environment in the current dir using `nix-shell`
- `nixery`: Runs container(d) from an image dynamically created by [Nixery](https://nixery.dev/)

💡: Use alias `nixery` for binaries not wanted installed on the host, such as
various command-line security tools, or for binaries not available on AArch64.

Both `n` and `nixery` take in the package name(s, separated by forward slashes)
to install and the command as argument; run aliases without arguments for help.

## 🔨 Development

See `dotfiles/.aliases` for `vm4...` creating
[lima](https://github.com/lima-vm/lima) VMs to test on various Linux distros.

💡: See alias `v` for starting, shelling into, stopping and deleting the VM.

VMs are provisioned by [cloud-init](https://cloudinit.readthedocs.io/en/latest/)
on boot by fetching and running `install.sh` from this repo's main branch.

Once VM has been started, your host's `$HOME` directory is mounted in the VM,
for testing script changes without first committing and pushing to your fork.

### Contributing

Install [pre-commit](https://pre-commit.com/) and the hooks before committing:

    pip3 install --user --upgrade pre-commit
    pre-commit install --hook-type pre-commit
    pre-commit install --hook-type commit-msg

Please create an [issue](https://github.com/raas-dev/configent/issues) and
a pull request.

### Issues in dependencies

- Homebrew on AArch64 Linux distros: [Not officially supported](https://docs.brew.sh/Homebrew-on-Linux#arm-unsupported)
    - Most formulae do not have AArch64 binary packages ("bottles") for Linux
    - Building all dependencies from source would be too long of a bootstrap
    - Thus `install.sh` skips the Homebrew parts on AArch64 Linux distros
- Homebrew does not work on Alpine Linux, as it does not base on glibc
- Arch Linux on AArch64
  - If `pacman` fails, backup and replace `/etc/pacman.d/mirrorlist` e.g. with:
    - `Server = http://eu.mirror.archlinuxarm.org/$arch/$repo`
