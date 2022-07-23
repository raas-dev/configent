#!/usr/bin/env bash

# shellcheck disable=SC1091  # do not expect input files

[ -f "$HOME/.bashrc" ] && . "$HOME/.bashrc"

# sdkman-init.sh is mentioned here to not be appended by `install_java`
