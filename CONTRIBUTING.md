# Contributing

Install [pre-commit](https://pre-commit.com/) hooks before committing:

    pre-commit install --hook-type pre-commit
    pre-commit install --hook-type commit-msg

Kindly create an [issue](https://github.com/raas-dev/configent/issues) and
a pull request.

## Development guidelines

1. We do not use anything in installation scripts that is not POSIX compatible
2. Linux on AArch64 is a first class citizen as Macs run on ARM since 2023
3. The software **installed** must work on 95% of the supported Linux distros
4. There is most often **no need to install** on the host as `n` can run it
5. We do not rely on Homebrew outside macOS, before Homebrew Linux works on ARM
6. We prefer `mise` plugins when they provide binaries both for x86-64 and ARM
7. Otherwise we use the distros' official repositories (may have older versions)
8. We do not use Rust, Go or Python for tasks where `sh` has worked since 1970s

## Issues in dependencies

- Alpine Linux:
  - Homebrew does not work due to musl (all architectures)
    - Use `mise` wherever possible, otherwise use `apk`
  - Rootless docker is not supported
    - Re-login is required after the initial install to be in `docker` group
