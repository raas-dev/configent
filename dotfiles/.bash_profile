#!/bin/bash
# the above shebang is purely for ShellCheck, this file is not executable

# shellcheck disable=SC1091  # do not expect input files

[ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"

# sdkman-init.sh is mentioned here to not be appended by `install_java`
