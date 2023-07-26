# c🌀nfigent (1.64.0)

[![Changelog](https://img.shields.io/github/v/tag/raas-dev/configent?label=changelog&sort=semver)](https://github.com/raas-dev/configent/blob/main/CHANGELOG.md)
[![LGPL-3.0](https://img.shields.io/github/license/raas-dev/configent)](https://github.com/raas-dev/configent/blob/main/LICENSE)

No startup pitches, I am a DevOps principled environment bootstrapper.

- 100% automated installation of only curated, stable and battle-tested tools
- 95% consistent user experience both on macOS and the beloved Linux distros
- There is only one way to install, update and change language and tool versions
- If something switches context faster than `tmux` and `zsh`, we'll switch to it
- The secure open source web browser, VSCode and a killer terminal. That's it.

| ![Screenshot of Brave Browser and VSCode with tmux and zsh](ui/target.webp) |
| --------------------------------------------------------------------------- |

A few features:

- Setup is one `curl` command, run `up` to upgrade every package manager on OS
- macOS `docker` experience as it was with Docker Desktop, but it runs rootless
- Command-line is Rust, Go and C for speed and `n`ix-shells for ad-hoc binaries
- One character `.aliases` - the fastest are the commands one does not type
- Ask GPT in terminal (`s`), create shell commands (`_`) and code (`c`)

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

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/1.64.0/install.sh | sh

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

Language runtimes and most command-line tools are installed OS independent by
[asdf](https://asdf-vm.com/). Versions are defined in `~/.tool-versions`.

For a few other command-line tools which are not available as
[asdf plugins](https://github.com/asdf-vm/asdf-plugins),
[Homebrew](https://brew.sh/) is preferred.

⚠️: Homebrew Linux on AArch64 is poorly supported (see [Issues in dependencies](https://github.com/raas-dev/configent#issues-in-dependencies)).

Order of installation:
1. Command-line necessities and compile-time requirements (Linux distro's repo)
2. GUI apps by [Homebrew Cask](https://formulae.brew.sh/cask/) (macOS) or
[Flatpak](https://flatpak.org/) (Linux distros)
3. Zsh plugins and Zsh on macOS (on Linux distros, Zsh is installed from repo)
4. Rust, Go, Node.js, Python and .NET language runtimes and default packages
5. [Terminess](https://www.programmingfonts.org/#terminus) monospace font
6. Appsec, cloud development and infrastructure-as-code command-line tools
7. Vim bundles, and if `brew` is present, [Neovim](https://neovim.io/)
8. Tmux plugins, and if `brew` is present, [tmux](https://github.com/tmux/tmux)

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

- `docker`: Runs docker cli and its plugins preferring rootless docker
- `nerdctl`: Runs nerdctl (containerd cli) preferring rootless containerd
- `podman`: The 3rd option, runs on near-Docker compatible daemonless runtime

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

[Nix](https://nix.dev/) is not installed on the host, but alias `nixd` starts
a container where `nix`, `nix-env`, `nix-shell`, `devenv`, etc. are available.
The container image is built by `etc/nix/Dockerfile`.

The environment is created in the current directory and alias `n` is used e.g.
`n vim README.md` to run an isolated `nix-shell` on containerd.

Alternatively, use alias `nixery` to create ad-hoc environments with selected
packages only by building the container image in [Nixery](https://nixery.dev/).

Both `n` and `nixery` take Nix package name(s, separated by forward slashes)
as the first argument. The packages are installed from channel
[unstable](https://search.nixos.org/packages?channel=unstable).

The binary is assumed named according to the first package and the rest of the
arguments are passed to the binary. If name is different from the package name,
put meta-package "shell" first e.g. `nixery shell/google-cloud-sdk gcloud`.

⚠️: Alias `n` mounts the current directory as writable inside the container,
where as `nixery` mounts the current directory as read-only.

💡: Use aliases for binaries not wanted installed on the host, such as various
command-line security tools, and for binaries that are not available on AArch64.

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

- Linux Homebrew on AArch64 is [not officially supported](https://docs.brew.sh/Homebrew-on-Linux#arm-unsupported)
  - If used, install these from the distro's repository (`bin/where_skipped`):
    - git-lfs (`install_utils`)
    - translate-shell (`install_utils`)
    - universal-ctags (`install_utils`)
    - azcopy (`install_iac`)
    - azd (`install_iac`)
    - neovim (`install_neovim`)
    - tmux (`install_tmux`)
- Cloudflared (`install_iac`) does not work on Linux on AArch64
  - `cannot execute binary file: Exec format error`
- Homebrew does not work on Alpine Linux as it bases on musl, not glibc
