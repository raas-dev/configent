# c🌀nfigent (1.67.7)

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

Works on x86-64 and ARM:

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

## 🥾 Up

VSCode configs and dotfiles are installed per-user.
**Existing dotfiles at `$HOME` are overridden without prompting.**

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/1.67.7/install.sh | sh

To install system-wide packages, `sudo` password may be asked in the beginning.

If git is not present, it is installed by the Linux distro's package manager
or by Xcode Command Line Tools on macOS.

Then the respective git tag from this repository is cloned as `$HOME/configent`,
or main branch is pulled on top of it if the git working copy already exists.

### Server (default)

Script `install.sh` is non-interactive and suitable for cloud-init when run as
user with passwordless sudo (recommended), or as root

**The defaults are what is most often used in software development in cloud.**
If you want to deviate from it, the fastest is to fork this repo, make changes
and cURL your public fork.

GUI apps are not installed by `install.sh` as a server is assumed, unless you
explicitly pass `FLATPAKS=true` (Linux distros) or `CASKS=true` (macOS) to the
script.

### Desktop

Alternatively, you can run `bootstrap` in the git working copy
(`$HOME/configent`) to install GUI apps after `install.sh` has finished.

Add or remove GUI apps to your liking in `bin/install_apps_flatpak`
(Flatpak on Linux distros) or `bin/install_apps_cask` (Homebrew Cask on macOS).

To use GUI apps on Linux distros, you have to install Xorg, display manager and
window manager of your choice. See your distro's own instructions for that.

## 🔋's included

Script `bootstrap` essentially handles the whole automated setup (dotfiles,
apps, VSCode) of the machine it is run in. These three respective scripts are
described further below.

Necessities (such as Zsh) are installed best effort from the Linux distro's
repo, or from Homebrew if it is runnable on the OS and the CPU architecture.

The script is non-interactive: Due to this, and though Zsh is preferred, it is
not set as the user's default shell. You may do it and get prompted, possibly
asked `sudo`, by running `bin/install_zsh` after `bootstrap` has finished.

### symlink_dotfiles

Creates symlinks in the user's home directory for all the files in  `dotfiles/`.

Script `bootstrap` passes `-f` to `symlink_dotfiles` to skip override prompts
per already existing file or symlink in the user's home directory.

Directory `bin` is symlinked to `~/local/bin`, taking 1st preference in `PATH`.
If `~/local/bin` already exists, it is backed up as `~/local/bin-old`.

💡: Restart the shell or run `source ~/.bashrc`. Then on, you may simply reload
the configuration of the current shell (`.bashrc` or `.zshrc`) with `r` and all
the scripts in `bin/` are available by name from now on.

### install_apps

If you want to adjust high level tech stacks, modify this script.

What's installed by default:
1. Command-line necessities and compile-time requirements
2. GUI apps by [Homebrew Cask](https://formulae.brew.sh/cask/) (macOS) or
[Flatpak](https://flatpak.org/) (Linux distros)
3. Zsh plugin manager and plugins (Zsh from `brew` if Homebrew is available)
4. Rust, Go, Node.js, Python and .NET language runtimes and default packages
5. Appsec, cloud development and infrastructure-as-code command-line tools
6. (Neo)vim bundles and config (Neovim from `brew` if Homebrew is available)
7. Tmux plugins and config (tmux from `brew` if Homebrew is available)
8. [Terminess](https://www.programmingfonts.org/#terminus) monospace font

Apt, yum (dnf), zypper, pacman and apk package managers are recognized and used
to install requirements from Linux distro's repository (requires `sudo` rights).
On Linux distros, flatpaks (GUI apps) are always installed user-wide.

On macOS, [Homebrew](https://brew.sh) is used to install requirements and
casks (GUI apps) user-wide.

Language runtimes and development tools are always installed user-wide by
[asdf](https://asdf-vm.com/). Global versions are defined in `~/.tool-versions`.
Whenever possible, [asdf plugins](https://github.com/asdf-vm/asdf-plugins)
are preferred over Homebrew.

⚠️: Homebrew may or may not be present after installation, as Homebrew Linux
[does not work on ARM](https://docs.brew.sh/Homebrew-on-Linux#arm-unsupported).

With Homebrew on Linux (x86-64), system-wide installation (`/home/linuxbrew`) is
preferred, but if it this not possible (no `sudo`), it is installed user's home.
In both cases, Zsh, Neovim and tmux are installed using Homebrew on Linux,
as it likely has newer versions than the ones gotten from the distro's repo.

💡: See [asdf documentation](https://asdf-vm.com/manage/versions.html#set-current-version) for locking project specific versions.

### setup_vscode

The script symlinks `vscode/` to `<user_vscode_path>/Code`.
The old `Code/` is first backed up as `Code-old`.

Symlinking happens even if `code` has not been installed. If `code` is present,
also VSCode extensions (`vscode/extensions.list`) are installed.

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

If Homebrew is available (Linux distros on x86-64, macOS on x86-64 or ARM),
Zsh and Bash are installed from Homebrew and preferred over system-wide shells
(respectively), as Homebrew likely has newer versions available.

## 🏗️ dockerd and containerd

Both container runtimes in a nutshell:

- the two are different runtimes - if you used Docker Desktop, it was dockerd
- containerd is the industry-standard (CNCF) runtime in Kubernetes deployments
- regardless of the runtime, containers must not be run with `sudo`

These `bin/` shims wrap the container runtime CLIs to run best-effort on the OS:

- `docker`: Runs docker cli and its plugins preferring rootless docker
- `nerdctl`: Runs nerdctl (containerd cli) preferring rootless containerd
- `podman`: The 3rd option, runs on near-Docker compatible daemonless runtime

The shims are available in non-interactive shells, while `~/.aliases` is
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

In addition, VM 'debian' has [k3s](https://k3s.io/) for testing on Kubernetes,
see VM's startup message for exporting `KUBECONFIG` to use it with `kubectl`.

VM 'fedora' has rootless [podman](https://podman.io/), run `podman` to use it.

⚠️: VMs 'ubuntu', 'debian' and 'fedora' mount your host's `$HOME` directory as
writable inside the VM. This enables containers to use bind mounts (directories
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
whereas `nixery` mounts the current directory as read-only.

💡: Use `n` and `nixery` for binaries not wanted permanently installed, such as
command-line security tools. See `.aliases` for the existing ad-hoc tools.

## 🔨 Development

See `dotfiles/.aliases` for `vm4...` creating
[lima](https://github.com/lima-vm/lima) VMs to test on various Linux distros.

💡: See alias `v` for starting, shelling into, stopping and deleting a VM.

VMs are provisioned by [cloud-init](https://cloudinit.readthedocs.io/en/latest/)
on boot by pulling and running `install.sh` from this repo's main branch.

⚠️: Regardless of pulling main, the version to install is defined in
`install.sh` and is only updated by `release.sh`.

You may willingly live on the edge by explicitly passing `GIT_REF`:

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/main/install.sh | GIT_REF=main sh

For development purposes, once the VM has been started, your host's `$HOME`
directory is mounted in the VM. This enables testing most changes without first
committing and pushing to your fork.

### Contributing

Install [pre-commit](https://pre-commit.com/) hooks before committing:

    pre-commit install --hook-type pre-commit
    pre-commit install --hook-type commit-msg

Kindly create an [issue](https://github.com/raas-dev/configent/issues) and
a pull request.

Development guidelines:
1. We do not use anything in installation scripts that is not POSIX compatible
2. Linux on AArch64 is a first class citizen as Macs run on ARM since 2023
3. The software **installed** must work on 95% of the supported Linux distros
4. There is most often **no need to install** as `n` and `nixery` can run it
5. We do not rely on Homebrew outside macOS, before Homebrew Linux works on ARM
6. We prefer `asdf plugin`s when they provide binaries both for x86-64 and ARM
7. Otherwise we use the distros' official repositories (may have older versions)
8. Thus we will not add LunarVim, NVChad, etc. if the latest Neovim is required
9. Dotfiles are often based on personal preference and improvements are welcome
10. We do not use Rust, Go or Python for tasks where `sh` has worked since 1970s

### Issues in dependencies

- Homebrew does not work on Alpine Linux (both x86-64 and ARM, due to musl)
- Node.js may not work on Alpine Linux, install it by `apk` if wanted (2023-07)
- Cloudflare does not work on ARM on Ubuntu, Debian, Arch or OpenSUSE (2023-07)
