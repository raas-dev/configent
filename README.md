# c🌀nfigent (1.146.5)

[![Changelog](https://img.shields.io/github/v/tag/raas-dev/configent?label=changelog&sort=semver)](https://github.com/raas-dev/configent/blob/main/CHANGELOG.md)
[![LGPL-3.0](https://img.shields.io/github/license/raas-dev/configent)](https://github.com/raas-dev/configent/blob/main/LICENSE)

No startup pitches, I am a DevOps principled environment bootstrapper.

- Work must finish by running one command. Mouse is not productivity.
- Does not install 10s of tools most of which can be run ad-hoc in a container.
- 95% consistent user experience both on macOS and common Linux distros.
- Has an obvious (one) way to manage programming languages and tool versions.
- Provides AI assistant to choose and execute the best AI agent for your task.

| ![Screenshot of Brave Browser and IDE with tmux and zsh](ui/target.webp) |
| ------------------------------------------------------------------------ |

A few features:

- One character `.aliases`: The fastest are the commands one does not type.
- Terminal is mostly Rust and Go for speed, use `n`ix-shells for ad-hoc CLIs.
- Seamless macOS Docker experience, like it was when Docker Desktop was free.
- Run `up` to upgrade every package manager at once but respect locked versions.
- Ask AI (`a <question>`) or assistant (`_`) to run the best prompt for a task.

Works both on AArch64 (including Apple Silicon) and on x86-64.

Supported operating systems:

- macOS Sequoia (15), Sonoma (14) and Ventura (13)
- Ubuntu Linux 24.04 LTS (Noble Numbat) and 22.04 LTS (Jammy Jellyfish)
- Debian Linux 12 (Bookworm) and 11 (Bullseye)
- Fedora Linux 41 and 40
- CentOS Stream 10 and 9
- AlmaLinux 9 and 8
- Rocky Linux 9 and 8
- Oracle Linux 9 and 8
- openSUSE Tumbleweed and Leap (15.6)
- Arch Linux (rolling; since 2022-07)
- Alpine Linux 3.20 and 3.19

Minimum requirements are 4GB RAM and 20GB disk, on which it takes <15 minutes.

## 🥾 Up

Already existing **dotfiles are overridden without prompting**. There is no
uninstaller currently.

If in doubt, test drive in a virtual machine.

Installer requires only `curl` available:

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/1.146.5/install.sh | sh

Things are installed primarily per-user, but to install system-wide requirements
(such as `git`), `sudo` password may be asked in the beginning.

The respective git tag from this repository is cloned in `~/configent`,
or main branch is pulled on top of the git working copy if it already exists.

User's configs (dotfiles, symlinks and directories) overridden are backed up in
`~/configent/.backup` with same directory hierarchy as they located in `$HOME`.

### Server (default)

Script `install.sh` is non-interactive and suitable for cloud-init when run as
user with passwordless sudo.

**The defaults are what is most often used in software development in cloud.**
If you want to deviate from it, the fastest is to fork this repository,
make changes and cURL your public fork.

GUI apps are not installed by `install.sh` as a server is assumed, unless you
explicitly pass `FLATPAKS=true` (Linux distros) or `CASKS=true` (macOS) to the
script.

### Desktop

Alternatively, you can run `bootstrap` in the git working copy (`~/configent`)
to install GUI apps.

Add or remove GUI apps to your liking in `bin/install_apps_flatpak`
(Flatpak on Linux distros) or `bin/install_apps_cask` (Homebrew Cask on macOS).

To use GUI apps on Linux distros, you have to install Xorg, display manager and
window manager of your choice. See your distro's own instructions for that.

## 🔋's included

Script `bootstrap` essentially handles the whole automated setup (dotfiles,
apps) of the machine it is run in.

The script is non-interactive: Due to this, and though Zsh is preferred, it is
not set as the user's default shell. You may do it and get prompted, possibly
asked `sudo`, by running `bin/setup_zsh` after `bootstrap` has finished.

### symlink_dotfiles

Symlinks are created in in the user's home directory for all the files in
`dotfiles/`.

Files or symlinks of the same name at `$HOME` are overridden without asking,
but they are backed up first in `.backup/`.

Directory `bin` in this repository is symlinked to `~/.local/configent/bin`
and is first in `PATH` after you  restart the shell or run `source ~/.bashrc`.

All the scripts in `bin/` are available by name from then on. Also now you
can simply reload the configuration of the current shell with `r`.

💡: Export your own environment variables outside the git repo in `~/.rclocal`.

### install_apps

Apt, yum (dnf), zypper, pacman and apk package managers are recognized and used
to install mostly build-time requirements and other absolute necessities
from Linux distro's repository, which requires `sudo` rights.

Everything (else) that can be installed only user-wide is done so, as following.

Sensible defaults are used, what's installed by default:
1. Zsh and antidote (Zsh plugin manager)
2. Other command-line essentials and a few build time requirements
3. Vim, Vundle (plugin manager for Vim) and Vim bundles (Vim plugins)
4. GUI apps by [Homebrew Cask](https://formulae.brew.sh/cask/) (macOS) or
[Flatpak](https://flatpak.org/) (Linux distros)
5. Rust, Go, Node.js, Python and .NET language runtimes and a few packages
6. Linters (static analysis tools) and AWS and Azure development tools
7. Neovim with [LazyVim](https://www.lazyvim.org/)
8. Tmux, tpm (Tmux Plugin Manager) and tmux plugins
9. [Ollama](https://ollama.com/) and it is (auto-)started on background

Also on both macOS and Linux distros, with a few exceptions (GUI apps, Ollama)
everything is installed by [mise](https://mise.jdx.dev/).

**It is strongly recommended to `export GITHUB_TOKEN=`.**
This avoids getting rate limited by GitHub on parallel installation.

💡: Enable or disable tools in `etc/mise/config.toml`, then run `install_mise`.
Also see [mise for using and locking](https://mise.jdx.dev/configuration.html)
project specific versions.

Mise is always preferred over Homebrew. Use mise
[backends](https://mise.jdx.dev/dev-tools/backends/) and
[plugins](https://mise.jdx.dev/registry.html) to add more tools.

On macOS, [Homebrew](https://brew.sh) is used to install **absolutely minimum**
build-time requirements and apps.

⚠️: Homebrew may not be available on Linux at all as it
[does not work on ARM](https://docs.brew.sh/Homebrew-on-Linux#arm-unsupported).
On Linux distros (x86-64) it is installed `/home/linuxbrew`. If `sudo` is not
possible, then it is installed user's home.

### setup_ide

[Terminess](https://www.nerdfonts.com/font-downloads) monospace font is
installed. The font is used by IDE.

IDE configuration is then symlinked and IDE extensions are installed.
The configuration is backed up first if the IDE is already in use.

These steps are detailed further below.

## 🔨 IDE

[Cursor](https://www.cursor.com/) is the default IDE on macOS and
[VS Code](https://code.visualstudio.com/) is the default IDE on Linux distros.

Extensions in
[Open VSX Registry](https://open-vsx.org/) are available for all VS Code
likes and thus are preferred when choosing extensions.

To update `vscode/extensions.list` in repo after adding or removing extensions
via IDE, run `vscode/create_extensions_list`.

### bin/setup_code

The script symlinks `vscode/` to `<editor_specific_path>/User`.
Existing `User` directory is first backed up to
`~/configent/.backup/<editor_specific_path>/User`.

⚠️: This script does not install any VS Code like, see Cask and Flatpak related
`bin/install_apps_` for that.

If editor command-line binary is present when running this script,
the extensions (`vscode/extensions.list`) are installed.

💡: You can reuse `vscode/create_extensions_list` and `setup_code` for any
VS Code like editor already installed. See the scripts' arguments for that.

### bin/setup_continue

[Continue](https://docs.continue.dev) is installed as open-source AI code
assistant in VS Code likes. Note that (commercial) VS Code likes may
force their bundled AI solution and disable this extension automatically.

The script symlinks Continue config files to `~/.continue/`.
Dynamic configuration (`config.ts`) is used for reading all LLM provider
environment variables to avoid having API keys hardcoded in `config.json`.

To start using Continue, do these manually after bootstrap:

1. Export your LLM provider's environment variables in e.g. `~/.rclocal`.

2. If you use local LLMs via Ollama (which is installed in apps),
you must `ollama pull` the model defined in `config.json` before it is
automatically started by Continue (e.g. for code autocomplete).

## 🐚 Shell

Zsh loads [antidote](https://antidote.sh/) and uses it to install Zsh
plugins (`~/.zsh_plugins.txt`) on the first start.

Set `zsh` as the user's default shell:

    setup_zsh

If you prefer `bash` instead:

    setup_bash

These scripts are interactive as they prompt to change the default shell,
(unless that is default already). Such change may also require `sudo`
password to be entered, so if `NONINTERACTIVE=true` is passed (such as
`bootstrap` does), the default shell won't be changed. The shell plugins,
if any, are installed even in that case.

## 🏗️ Containers

Supported container runtimes:

- the original OCI compatible runtime was Docker (used by Docker Desktop)
- containerd is the industry-standard (CNCF) runtime in Kubernetes deployments
- third option is Podman, which is nearly Docker compatible daemonless runtime

These `bin/` shims wrap the container CLIs to use those runtimes:

- `docker`: Runs Docker CLI, installing build and compose CLI plugins when used
- `nerdctl`: Runs nerdctl (on containerd), which has build and compose built-in
- `podman`: Runs Podman CLI (on daemonless Podman), but lacks proper compose

See [rootless containers](https://rootlesscontaine.rs/) as those are preferred.

### macOS

Container runtimes base on Linux kernel features not present on macOS. Thus
[Lima](https://github.com/lima-vm/lima) is used for creating Linux VMs.

The aforementioned shims create and start the necessary virtual machines:
Ubuntu for Docker, Debian for containerd and Fedora for Podman.

In addition, VM 'debian' has [k3s](https://k3s.io/) for testing on Kubernetes.
See VM's startup message for exporting `KUBECONFIG` to use it with `kubectl`.

The following host directories are mounted read-write for VMs:

- `$HOME/dev`
- `$HOME/Downloads`
- `/tmp/lima`

### docker shortcut

Alias `d` is a shortcut for building Docker image in the current directory.
`Dockerfile` is read if present, otherwise [nixpacks](https://nixpacks.com/)
is used to detect the tech stack and build the image best-effort.

⚠️: Ensure the Docker image you are building `FROM` is safe before proceeding.

After the image is built, a new container is launched from it. If `.env` file
is present in the current directory, its environment variables are set in the
container.

If you use `PORT=8000 d`, the port given is mapped to the host and environment
variable `PORT` is set inside the container. Note that this takes precedence
if `PORT` is also defined in `.env` file.

If `d -d` or `d --detached` is used, all arguments are passed to `docker run`.
CMD defined in `Dockerfile` is effective. ENTRYPOINT defined in `Dockerfile`
(or by `nixpacks`) is effective, unless you override it in arguments.

If container was started as detached and successfully started up, docker logs
are followed. Sending `^C` exits the log view and does not stop the container.

If `-d` or `--detached` is not used, an interactive session is assumed and all arguments are passed to `docker run` entrypoint `/bin/sh -c` as commands, e.g.
`d bash` starts Bash in the container. Exiting the shell stops the container.

⚠️: If container writes to filesystem, you must be in a VM writable directory.

## ❄️ Nix

[Nix](https://nix.dev/) is not installed on the host, but alias `nixd` starts
a container where `nix`, `nix-env`, `nix-shell`, etc. are available.

The image is built by `etc/nix/Containerfile` and is run on containerd.
This enables NixOS like experience without going all-in NixOS (even on a VM).

Use alias `n` e.g. `n vim README.md` to open `README.md`, where Vim is running
in an isolated `nix-shell` in the container. The volume mount is created based
on the current working directory.

Package name(s, separated by forward slashes) are taken as the first argument.
The binary is assumed named according to the first package. The rest of the
arguments are passed to the binary. If binary name is different from the
package name, put meta-package "shell" first, e.g. `n shell/postgresql psql`.

The packages are installed from channel
[unstable](https://search.nixos.org/packages?channel=unstable).

You can expose `PORT` for servers, e.g. `PORT=8000 n python3 -m http.server`.

⚠️: If that binary writes to filesystem, you must be in a VM writable directory.

💡: Use `n` for command-line tools not wanted permanently installed on the
host. See `.aliases` for such examples, like ad-hoc security scanners.

## ⚙️ VMs

See `dotfiles/.aliases` for `vm4...` creating
[Lima](https://github.com/lima-vm/lima) VMs to test on various Linux distros.

💡: See alias `v` for starting, shelling into, stopping and deleting a VM.

VMs are provisioned by [cloud-init](https://cloudinit.readthedocs.io/en/latest/)
on boot by pulling and running `install.sh` from this repository's main branch.

⚠️: Regardless of pulling main, the version is hardcoded in `install.sh`
and is only updated by `release.sh`.

You may willingly live on the edge by explicitly passing `GIT_REF`:

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/main/install.sh | GIT_REF=main sh

See `CONTRIBUTING.md` for more info on that.
