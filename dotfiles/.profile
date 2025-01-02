#!/bin/bash
# the above shebang is only for ShellCheck, this file is not executable

# Lima BEGIN is mentioned here for Lima to not mess with PATH on VM boot

# shellcheck disable=SC1091  # do not expect input files
# shellcheck disable=SC2123  # reset PATH

### PATH #######################################################################

path_append() {
  if [ -d "$1" ]; then
    PATH=${PATH//":$1:"/:}     # delete all instances in the middle
    PATH=${PATH/%":$1"/}       # delete any instance at the end
    PATH=${PATH/#"$1:"/}       # delete any instance at the beginning
    PATH="${PATH:+"$PATH:"}$1" # append $1 or if $PATH is empty set to $1
  fi
}

path_prepend() {
  if [ -d "$1" ]; then
    PATH=${PATH//":$1:"/:}
    PATH=${PATH/%":$1"/}
    PATH=${PATH/#"$1:"/}
    PATH="$1${PATH:+":$PATH"}" # prepend $1 or if $PATH is empty set to $1
  fi
}

if [ "$(uname -s)" = 'Darwin' ]; then
  PATH=''
  path_append '/usr/local/bin'
  path_append '/usr/bin'
  path_append '/bin'
  path_append '/usr/sbin'
  path_append '/sbin'
elif [ "$(uname -s)" = 'Linux' ]; then
  PATH=''
  path_append '/usr/local/sbin'
  path_append '/usr/local/bin'
  path_append '/usr/sbin'
  path_append '/usr/bin'
  [ ! -L "/sbin" ] && path_append '/sbin'
  [ ! -L "/bin" ] && path_append '/bin'
  path_append '/snap/bin'
fi

### Exports ####################################################################

export LANG='en_US.UTF-8'
export LC_ALL='en_US.UTF-8'

export EDITOR='vim'
export VISUAL="$EDITOR"
export SVN_EDITOR="$EDITOR"

# color manpages
export MANPAGER='sh -c "col -bx | bat -l man -p"'
export MANROFFOPT='-c'

# https://github.com/wofr06/lesspipe
export LESS='-R' # output raw control chars for colors
export LESSOPEN='|~/.local/configent/bin/lesspipe.sh %s'
export LESSQUIET=1 # suppress additional less output

### Shell behaviour ############################################################

# default file permissions: u=rwx,g=rx,o=
umask 0027

# allow exiting shell with ^D
unset ignoreeof

### Disable stop (^S) and continue (^Q) flow control signals ###################

stty -ixon

### Brew #######################################################################

if [ "$(uname -s)" = 'Darwin' ]; then
  if [ -x "/opt/homebrew/bin/brew" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [ -x "/usr/local/bin/brew" ]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
  path_prepend "$(brew --prefix llvm)/bin"
  path_prepend "$(brew --prefix findutils)/libexec/gnubin"
  path_prepend "$(brew --prefix coreutils)/libexec/gnubin"
  export CFLAGS="-I$(brew --prefix openssl)/include"
  export LDFLAGS="-L$(brew --prefix openssl)/lib"
  export HOMEBREW_CASK_OPTS="--appdir=~/Applications"
else
  if [ -x "/home/linuxbrew/.linuxbrew/bin/brew" ]; then
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
  elif [ -x "$HOME/.linuxbrew/bin/brew" ]; then
    eval "$("$HOME/.linuxbrew/bin/brew shellenv")"
  fi
fi

export HOMEBREW_NO_ENV_HINTS=1

### mise #######################################################################

path_prepend "$HOME/.local/bin"
command -v mise >/dev/null && eval "$(mise activate "${SHELL##*/}")"

### go #########################################################################

export GOPATH="$HOME/.go"

### Haskell ####################################################################

path_prepend "$HOME/.ghcup/bin"

### Python #####################################################################

# PATH is rewritten on (re)loading shell, thus we are not in virtualenv
unset VIRTUAL_ENV VIRTUAL_ENV_PROMPT

# hatch
unset HATCH_ENV_ACTIVE
export HATCH_ENV_TYPE_VIRTUAL_PATH=".venv"

# poetry
export POETRY_VIRTUALENVS_IN_PROJECT=true
export POETRY_VIRTUALENVS_OPTIONS_NO_PIP=true
export POETRY_VIRTUALENVS_PREFER_ACTIVE_PYTHON=true

# ptpython
export PTPYTHON_CONFIG_HOME="$HOME/.config/ptpython"

# sitecustomize.py
export RICH_TRACEBACKS=true
export RICH_SHOW_LOCALS=true

### dotnet #####################################################################

command -v dotnet >/dev/null && export DOTNET_ROOT="$(dirname $(which dotnet))"

### Starship cross-shell prompt ################################################

command -v starship >/dev/null && eval "$(starship init "${SHELL##*/}")"

### zoxide #####################################################################

if command -v zoxide >/dev/null; then
  eval "$(zoxide init "${SHELL##*/}" --cmd j --no-aliases)"
  j() {
    __zoxide_z "$@"
  }
fi

### fzf ########################################################################

export FZF_DEFAULT_COMMAND='rg --files --hidden --follow --no-ignore-vcs'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"

### bat ########################################################################

export BAT_STYLE="auto"
export BAT_THEME="SynthWave84"

### awscli #####################################################################

command -v aws_completer >/dev/null &&
  complete -C "$(command -v aws_completer)" aws

### Azure bicep ################################################################

path_append "$HOME/.azure/bin"

### Azure developer CLI ########################################################

path_append "$HOME/.azd/bin"

### kubectl krew ###############################################################

path_append "$HOME/.krew/bin"

### Disable telemetry ##########################################################

# https://consoledonottrack.com
export DO_NOT_TRACK=1

# homebrew
export HOMEBREW_NO_ANALYTICS=1
export HOMEBREW_NO_ANALYTICS_THIS_RUN=1

# google
export CLOUDSDK_CORE_DISABLE_USAGE_REPORTING=true

# microsoft
export AZURE_CORE_COLLECT_TELEMETRY=0
export AZURE_DEV_COLLECT_TELEMETRY=no
export FUNCTIONS_CORE_TOOLS_TELEMETRY_OPTOUT=1
export DOTNET_CLI_TELEMETRY_OPTOUT=1
export ORYX_DISABLE_TELEMETRY=true
export POWERSHELL_TELEMETRY_OPTOUT=1
export RESTLER_TELEMETRY_OPTOUT=1

# aws
export SLS_TELEMETRY_DISABLED=1
export SLS_TRACKING_DISABLED=1

# js
export GATSBY_TELEMETRY_DISABLED=1
export NEXT_TELEMETRY_DISABLED=1
export NUXT_TELEMETRY_DISABLED=1
export NG_CLI_ANALYTICS=false
export NG_CLI_ANALYTICS_SHARE=false
export YARN_ENABLE_TELEMETRY=0

# rust
export BINSTALL_DISABLE_TELEMETRY=true

# go
export GOTELEMETRY=off

# hashicorp (terraform, consul, ...)
export CHECKPOINT_DISABLE=1

# infracost
export INFRACOST_SELF_HOSTED_TELEMETRY=false
export INFRACOST_SKIP_UPDATE_CHECK=true

### aichat #####################################################################

export AICHAT_CONFIG_DIR="$HOME/.config/aichat"
export AICHAT_FUNCTIONS_DIR="$HOME/.config/aichat/functions"
export AICHAT_ROLES_DIR="$HOME/.config/configent/prompts/general"

# https://alkue.com
export FUNCTIONS_REPO_URL="git@github.com:alkue-com/functions.git"

### XDG base directory specification ###########################################

# https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
if [ "$(uname -s)" = 'Linux' ]; then
  export XDG_CACHE_HOME="$HOME/.cache"
  export XDG_CONFIG_HOME="$HOME/.config"
  export XDG_BIN_HOME="$HOME/.local/bin"
  export XDG_DATA_HOME="$HOME/.local/share"
  export XDG_STATE_HOME="$HOME/.local/state"

  # Ordered base directories relative to which data files should be searched
  if command -v flatpak >/dev/null; then
    export XDG_DATA_DIRS="$XDG_DATA_HOME/flatpak/exports/share:/var/lib/flatpak/exports/share"
  fi
  export XDG_DATA_DIRS="$XDG_DATA_DIRS:/usr/local/share:/usr/share"
  if command -v snap >/dev/null; then
    export XDG_DATA_DIRS="$XDG_DATA_DIRS:/var/lib/snapd/desktop"
  fi
fi

### docker #####################################################################

if [ "$(uname -s)" = 'Darwin' ]; then
  export DOCKER_HOST="unix://$HOME/.lima/docker/sock/docker.sock"
elif [ "$(uname -s)" = 'Linux' ]; then
  if [ -S "$XDG_RUNTIME_DIR/docker.sock" ]; then
    export DOCKER_HOST="unix://$XDG_RUNTIME_DIR/docker.sock" # rootless
  elif [ -S "/var/run/docker.sock" ]; then
    export DOCKER_HOST="unix:///var/run/docker.sock" # rootful
  fi
fi

### configent/bin ##############################################################

path_prepend "$HOME/.local/configent/bin"
