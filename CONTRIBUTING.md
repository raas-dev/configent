# Contributing

Kindly create an [issue](https://github.com/raas-dev/configent/issues) and
a pull request.

## Guidelines

1. Do not use anything in installation scripts that is not POSIX compatible.
2. Install using `mise` plugins or from distros' repos. Use minimum of Homebrew.
3. The app **installed** must work on all of the Linux distros listed in README.
4. The app must work on AArch64 Linux as all Macs default to AArch64 since 2023.
5. No use to install the app if can use it via an alias to `uvx`, `bunx` or `n`.

## Testing

See `dotfiles/.aliases` for `v-*` for quickly creating and starting
[Lima](https://github.com/lima-vm/lima) VMs for various Linux distros.

You may willingly run the installer from the latest commit by passing `GIT_REF`:

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/main/install.sh | GIT_REF=main sh

For development purposes, once the VM has been started, host's `$HOME/configent`
is mounted read-only in the VM which helps in testing changes in the scripts.

## Pre-commit

Install [pre-commit](https://pre-commit.com/) hooks before committing:

    pre-commit install --hook-type pre-commit
    pre-commit install --hook-type commit-msg

## Static analysis

All of these tools are either installed or installed lazily on use by configent.

Run [semgrep](https://semgrep.dev/) for code vulnerability analysis:

    semgrep scan  .

Run [Trivy](https://trivy.dev/latest/) to scan for secrets in git repository:

    trivy fs .

Run [Checkov](https://www.checkov.io/) to scan for Docker misconfigurations:

    checkov -d .

See respective ignore files in the repository root.

In addition, Semgrep and Checkov support inline ignores (as comments in files).

SAST tools are not run as `pre-commit` hooks as they are not necessarily Python.

## Known issues

- Lima: Arch Linux / AArch64 (as of 2025-06)
  - [No up-to-date AArch64 image](https://github.com/lima-vm/lima/issues/3049)
    - Workaround: Use [own](https://github.com/mschirrmeister/archlinux-lima)

```
- [APP]: [OS AND VERSION] / [ON WHICH ARCH] (as of [LAST CHECKED DATE])
  - [ISSUE]
    - [FIX|WORKAROUND]
```
