# Contributing

Kindly create an [issue](https://github.com/raas-dev/configent/issues) and
a pull request.

## Guidelines

1. Do not write anything in installation scripts that is not POSIX compatible.
2. Install with `mise`. For `root`, use distros' repos. Use minimum of Homebrew.
3. If an app is **installed**, it must work on all Linux distros in README.md.
4. The app must work on AArch64 Linux as most Apple Macs are ARM64 since 2023.
5. Do not install if version does not matter. Call app via `uvx`, `bunx` or `n`.

## Testing

Use alias `vv` for creating
[Lima](https://github.com/lima-vm/lima) VMs to test on various Linux distros.

For each VM's cloud-init, alias `vv` sets installer to use the last commit:

    curl -fsSL https://raw.githubusercontent.com/raas-dev/configent/main/install.sh | GIT_REF=main sh

If `GIT_REF` is not set, the installer uses version hardcoded in `install.sh`.

Also, once the VM has been started, host's `$HOME/configent` is mounted
read-only in the VM. This helps in testing non-committed changes to the scripts.

## Pre-commit

Install [prek](https://prek.j178.dev/) and pre-commit hooks before committing:

    prek install --hook-type pre-commit
    prek install --hook-type commit-msg

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

## Known issues

- Lima: Alpine Linux (as of 2025-11)
  - After restarting VM, lima gets stuck in boot waiting ssh to be available
    - On macOS, try [qemu instead of vz](https://github.com/lima-vm/lima/issues/3052)
  - Musl binaries for apps may not be available, or may not build from source
    - Install `node` using `apk`

```
- [APP]: [OS AND VERSION] / [ON WHICH ARCH] (as of [LAST CHECKED DATE])
  - [ISSUE]
    - [WORKAROUND]
```
