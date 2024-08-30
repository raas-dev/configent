#!/bin/sh

# configent (https://github.com/raas-dev/configent)
# One command automated macOS/Linux laptop/VM/container bootstrapper.
#
# Copyright(C) 2016- Anssi Syrjäsalo (http://a.syrjasalo.com)
# Licensed under GNU Lesser General Public License v3 (LGPL-3.0).

# install.sh is based on parts from:
# https://github.com/geekzter/bootstrap-os/blob/master/linux/bootstrap_linux.sh

# shellcheck disable=SC1091  # do not expect input files

### constants  #################################################################

GIT_REPO_URL="https://github.com/raas-dev/configent"
TARGET_PATH="$HOME/configent"

### variables ##################################################################

GIT_REF="${GIT_REF:-1.110.2}"

export CASKS="${CASKS:-false}"
export FLATPAKS="${FLATPAKS:-false}"
export SNAPS="${SNAPS:-false}"

################################################################################

if [ "$(uname -s)" = 'Linux' ]; then
  if [ "$(id -u)" = 0 ]; then
    CANELEVATE='true'
    SUDO=''
  elif command -v sudo >/dev/null; then
    CANELEVATE='true'
    SUDO='sudo'

    printf "Sudo might be prompted to install git from distro's packages.\n"

    # Ask sudo password upfront
    sudo -n true || sudo -v

    # Keep sudo alive until the script has finished
    while true; do
      sudo -n true
      sleep 60
      kill -0 "$$" || exit
    done 2>/dev/null &
  else
    CANELEVATE='false'
  fi

  if [ "$CANELEVATE" = 'true' ]; then
    if ! command -v git >/dev/null; then
      # zypper is aliased as apt-get, thus it has to come before real apt-get!
      if command -v zypper >/dev/null; then
        $SUDO zypper refresh
        $SUDO zypper install -y git
      elif command -v apt-get >/dev/null; then
        $SUDO apt-get update
        $SUDO apt-get install -y git
      elif command -v dnf >/dev/null; then
        $SUDO dnf check-update
        $SUDO dnf install -y git
      elif command -v pacman >/dev/null; then
        $SUDO pacman --noconfirm --needed -Sy git
      elif command -v apk >/dev/null; then
        $SUDO apk -U add git
      else
        printf "\nError: Could not install git, please install git manually.\n"
        exit 1
      fi
    fi
    if command -v apk >/dev/null; then
      printf "On Alpine Linux: Installing coreutils required by installer.\n"
      $SUDO apk -U add coreutils
    fi
  fi
elif [ "$(uname -s)" = 'Darwin' ]; then
  if [ ! -d "$(xcode-select -p)" ]; then
    xcode-select --install
  fi
else
  printf "\nError: Installer is only supported on macOS and Linux distros.\n"
  exit 1
fi

if [ -t 0 ]; then
  # if in terminal/stdin present (script run by ./install.sh)
  full_path=$(cd "$(dirname "$0")" && pwd)
  printf "Checking if in the git working copy and ought to pull.\n"
  if [ -d "$full_path/.git" ]; then
    git_branch="$(cd "$full_path" && git rev-parse --abbrev-ref HEAD)"
    printf "In git working copy %s, pulling %s\n" \
      "$full_path" "$git_branch"
    git -C "$full_path" pull --no-autostash --rebase origin "$git_branch"
    . "$full_path/bootstrap" # 2> >(tee install_error.log >&2)
  fi
else
  # if not in terminal (script run by curl/wget/cat)
  if [ ! -d "$TARGET_PATH/.git" ]; then
    printf "Git working copy not found, cloning %s (%s)\n" \
      "$TARGET_PATH" "$GIT_REF"
    git clone --quiet --depth 1 --branch "$GIT_REF" \
      "$GIT_REPO_URL" "$TARGET_PATH"
  else
    git_branch="$(cd "$TARGET_PATH" && git rev-parse --abbrev-ref HEAD)"
    printf "Git working copy found at %s, pulling %s\n" \
      "$TARGET_PATH" "$git_branch"
    git -C "$TARGET_PATH" pull --no-autostash --rebase origin "$git_branch"
  fi
  cd "$TARGET_PATH" &&
    . "$TARGET_PATH/bootstrap" # 2> >(tee install_error.log >&2)
fi
