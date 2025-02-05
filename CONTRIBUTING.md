# Contributing

Kindly create an [issue](https://github.com/raas-dev/configent/issues) and
a pull request.

## Guidelines

1. Do not use anything in installation scripts that is not POSIX compatible.
3. The software **installed** must work on 95% of the Linux distros in README.
3. Do `mise` plugins or distros' repos. Do minimum Homebrew and only on macOS.
4. It must work on Linux distros on AArch64, as all Macs are AArch64 since 2023.
5. No benefit to install a tool if can use it via alias to `uvx`, `bunx` or `n`.

## Testing

See `dotfiles/.aliases` for `vm4...` creating
[Lima](https://github.com/lima-vm/lima) VMs to test on various Linux distros.

For development purposes, once the VM has been started, host's `$HOME/configent`
is mounted read-only in the VM. This enables testing most changes without first
committing and pushing to your fork.

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

- Neovim: Linux / Aarch64 (as of 2025-01)
  - Any existing `mise` plugin does not install Aarch64 binary
    - Fix: Install neovim from distro's repo

- Docker: CentOS Stream 10 / all archs (as of 2025-01)
  - After installing iptables from repo, `modproble iptables` fails until reboot
    - Fix: Reboot is required after (first) bootstrap for Docker to run

- Docker: Alpine Linux / all archs (as of 2025-01)
  - Rootless docker is not supported
    - Fix: Relogin is required after (first) bootstrap to be in `docker` group

- Node.js: Alpine Linux / all archs (as of 2025-01)
  - Mise starts compiling Node.js from source, which takes a long time
    - Fix: See [node.flavor=musl](https://mise.jdx.dev/lang/node.html#unofficial-builds)

- Homebrew: Alpine Linux / x86-64 (as of 2025)
  - Homebrew on Linux does not work on musl based distros
    - Workaround: Use `mise install` when possible, otherwise use `apk install`

- Homebrew: Linux / Aarch64  (as of 2025)
  - [Not supported](https://docs.brew.sh/Homebrew-on-Linux#arm-unsupported)
    - Workaround: Use `mise install`

```
- [APP]: [OS AND VERSION] / [ON WHICH ARCH] (as of [LAST CHECKED DATE])
  - [ISSUE]
    - [FIX|WORKAROUND]
```
