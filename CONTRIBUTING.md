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
6. We prefer `asdf plugin`s when they provide binaries both for x86-64 and ARM
7. Otherwise we use the distros' official repositories (may have older versions)
8. Thus we will not add LunarVim, NVChad, etc. if the latest Neovim is required
9. Dotfiles are often based on personal preference and improvements are welcome
10. We do not use Rust, Go or Python for tasks where `sh` has worked since 1970s

## Issues in dependencies

- Homebrew does not work on Alpine Linux (both x86-64 and ARM, due to musl)
  - Use `asdf` if possible, if not use `apk`
- Node.js may not work on Alpine Linux (2023-07)
  - Install it by `apk add nodejs` if required
- Cloudflared does not work on ARM Ubuntu, Debian, Arch or OpenSUSE (2024-04)
  - Is not installed by default
