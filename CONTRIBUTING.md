# Contributing

Kindly create an [issue](https://github.com/raas-dev/configent/issues) and
a pull request.

## Guidelines

1. We do not use anything in installation scripts that is not POSIX compatible
2. Linux on AArch64 is a first class citizen as Macs run on ARM since 2023
3. The software **installed** must work on 95% of the supported Linux distros
4. There is most often **no need to install** on the host as `n` can run it
5. We do not rely on Homebrew outside macOS, before Homebrew Linux works on ARM
6. We prefer `mise` plugins when they provide binaries both for x86-64 and ARM
7. Otherwise we use the distros' official repositories (may have older versions)
8. We do not use Rust, Go or Python for tasks where `sh` has worked since 1970s

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

## Issues in dependencies

- Alpine Linux:
  - Homebrew does not work due to musl (all architectures)
    - Use `mise` wherever possible, otherwise use `apk`
  - See `mise` option `node.flavor = musl` for installing Node.js
    - https://mise.jdx.dev/lang/node.html#unofficial-builds
  - Rootless docker is not supported
    - Re-login is required after the initial install to be in `docker` group
