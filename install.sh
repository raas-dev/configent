#!/bin/bash

# Usage: https://github.com/raas-dev/configent/blob/main/README.md
#
# Forked from:
# https://github.com/geekzter/bootstrap-os/blob/master/linux/bootstrap_linux.sh

# shellcheck disable=SC1091   # disable not finding script bootstrap as input

### constants  #################################################################

SCRIPT_PATH=$(dirname "$0")
GIT_REPO_URL="https://github.com/raas-dev/configent"
TARGET_PATH="$HOME/configent"

### variables ##################################################################

export NO_SNAPS="true"
export NO_CASKS="true"
[ -n "$NO_FORMULAE" ] && export NO_FORMULAE="true"

###############################################################################

if [[ "$OSTYPE" = linux-gnu* ]]; then
  if [[ $(uname -m) == 'aarch64' ]]; then
    export NO_FORMULAE="true"
    echo "Homebrew Linux does not support AArch64, NO_FORMULAE=true is forced."
  fi
  if [ "$EUID" = "0" ]; then
    CANELEVATE='true'
    SUDO=''
  elif which sudo &>/dev/null ; then
    CANELEVATE='true'
    SUDO='sudo'

    echo -e "\nSudo might be prompted to install git from distro's packages."

    # Ask sudo password upfront
    sudo -v

    # Keep sudo alive until the script has finished
    while true; do
    sudo -n true
    sleep 60
    kill -0 "$$" || exit
    done 2>/dev/null &
  else
    CANELEVATE='false'
  fi

  if [ "$CANELEVATE" = "true" ]; then
    if ! which git &>/dev/null ; then
      if which apt-get &>/dev/null ; then
        $SUDO apt-get install -y git
      elif which yum &>/dev/null ; then
        $SUDO yum install -y git
      else
        echo -e "\nError: Could not install git, please install git manually."
        exit 1
      fi
    fi
  fi
elif [[ "$OSTYPE" = darwin* ]]; then
  if [ ! -d "$(xcode-select -p)" ]; then
    xcode-select --install
  fi
else
  echo -e "\nError: Installer is only supported on macOS and Linux distros."
  exit 1
fi

if [ -t 0 ]; then
  # if in terminal/stdin present (script run by ./install.sh)
  echo -e "\nChecking if inside the git working copy and ought to pull."
  if [ -d "$SCRIPT_PATH/.git" ]; then
    echo -e "\nInside git working copy $(cd "$SCRIPT_PATH" && pwd), pulling."
    git -C "$SCRIPT_PATH" pull --rebase

    pushd "$SCRIPT_PATH" >/dev/null || exit
      . "$SCRIPT_PATH/bootstrap" "$@" # 2> >(tee install_error.log >&2)
    popd >/dev/null || exit
  fi
else
  # if not in terminal (script run by curl/wget/cat)
  if [ ! -d "$TARGET_PATH" ]; then
    echo -e "\nGit working copy does not exist, cloning to $TARGET_PATH"
    git clone --quiet "$GIT_REPO_URL" "$TARGET_PATH"
  else
    echo -e "\nGit working copy found at $TARGET_PATH, pulling."
    git -C "$TARGET_PATH" pull --rebase
  fi

  pushd "$TARGET_PATH" >/dev/null || exit
    . "$TARGET_PATH/bootstrap" "$@" # 2> >(tee install_error.log >&2)
  popd >/dev/null || exit
fi
