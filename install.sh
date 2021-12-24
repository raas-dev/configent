#!/bin/sh

# Usage: https://github.com/raas-dev/configent/blob/main/README.md
#
# Forked from:
# https://github.com/geekzter/bootstrap-os/blob/master/linux/bootstrap_linux.sh

# shellcheck disable=SC1091   # disable not finding script bootstrap as input

### constants  #################################################################

GIT_REPO_URL="https://github.com/raas-dev/configent"
TARGET_PATH="$HOME/configent"

### variables ##################################################################

export NO_SNAPS="true"
export NO_CASKS="true"
[ -n "$NO_FORMULAE" ] && export NO_FORMULAE="true"

###############################################################################

if [ "$(uname -s)" = 'Linux' ]; then
  if [ "$(uname -m)" = 'aarch64' ]; then
    export NO_FORMULAE="true"
    printf "Homebrew Linux does not run on AArch64, NO_FORMULAE=true is forced."
  fi
  if [ "$(id -u)" = 0 ]; then
    CANELEVATE='true'
    SUDO=''
  elif which sudo >/dev/null 2>&1 ; then
    CANELEVATE='true'
    SUDO='sudo'

    printf "\nSudo might be prompted to install git from distro's packages."

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

  if [ "$CANELEVATE" = 'true' ]; then
    if ! which git >/dev/null 2>&1 ; then
      if which apt-get >/dev/null 2>&1 ; then
        $SUDO apt-get install -y git
      elif which yum >/dev/null 2>&1 ; then
        $SUDO yum install -y git
      else
        printf "\nError: Could not install git, please install git manually."
        exit 1
      fi
    fi
  fi
elif [ "$(uname -s)" = 'Darwin' ]; then
  if [ ! -d "$(xcode-select -p)" ]; then
    xcode-select --install
  fi
else
  printf "\nError: Installer is only supported on macOS and Linux distros."
  exit 1
fi

if [ -t 0 ]; then
  # if in terminal/stdin present (script run by ./install.sh)
  full_path=$(cd "$(dirname "$0")" && pwd)
  printf "\nChecking if inside the git working copy and ought to pull."
  if [ -d "$full_path/.git" ]; then
    printf "\nInside git working copy %s, pulling.\n" "$full_path"
    git -C "$full_path" pull --rebase
    . "$full_path/bootstrap" # 2> >(tee install_error.log >&2)
  fi
else
  # if not in terminal (script run by curl/wget/cat)
  if [ ! -d "$TARGET_PATH/.git" ]; then
    printf "\nGit working copy does not exist, cloning to %s" "$TARGET_PATH"
    git clone --quiet "$GIT_REPO_URL" "$TARGET_PATH"
  else
    printf "\nGit working copy found at %s, pulling." "$TARGET_PATH"
    git -C "$TARGET_PATH" pull --rebase
  fi
  cd "$TARGET_PATH"
  . "$TARGET_PATH/bootstrap" # 2> >(tee install_error.log >&2)
fi
