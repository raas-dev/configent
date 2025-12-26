#!/bin/bash
# the above shebang is only for ShellCheck, this file is not executable

# Lima BEGIN is mentioned here for Lima to not mess with PATH on VM boot

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
  # shellcheck disable=SC2123  # reset PATH
  PATH=''
  path_append '/usr/local/bin'
  path_append '/usr/bin'
  path_append '/bin'
  path_append '/usr/sbin'
  path_append '/sbin'
elif [ "$(uname -s)" = 'Linux' ]; then
  # shellcheck disable=SC2123  # reset PATH
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

[ -z "$DEFAULT_IDE" ] && export DEFAULT_IDE='code' # can override in ~/.rclocal
export EDITOR="$DEFAULT_IDE --wait"
export VISUAL="$EDITOR"

export GIT_EDITOR="vim -n"
export SVN_EDITOR="vim"

# https://github.com/wofr06/lesspipe
export LESS='-R' # output raw control chars for colors
export LESSUTFBINFMT='*n%C' # display Unicode characters instead of code points
export LESSOPEN='|~/.local/configent/bin/lesspipe.sh %s'
export LESSQUIET=1 # suppress additional less output

# get plain text from man
export MANROFFOPT='-c'

### Shell behaviour ############################################################

# default file permissions: u=rwx,g=rx,o=
umask 0027

# allow exiting shell with ^D
unset ignoreeof

### Disable stop (^S) and continue (^Q) flow control signals ###################

[ -t 0 ] && stty -ixon 2>/dev/null

### Brew #######################################################################

if [ "$(uname -s)" = 'Darwin' ]; then
  if [ -x "/opt/homebrew/bin/brew" ]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [ -x "/usr/local/bin/brew" ]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
  # install_apps_brew
  if command -v brew >/dev/null; then
    if brew --prefix findutils >/dev/null 2>&1; then
      path_prepend "$(brew --prefix findutils)/libexec/gnubin"
    fi
    if brew --prefix coreutils >/dev/null 2>&1; then
      path_prepend "$(brew --prefix coreutils)/libexec/gnubin"
    fi
  fi
  # install_apps_cask
  export HOMEBREW_CASK_OPTS="--appdir=$HOME/Applications --no-quarantine"
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

if command -v dotnet >/dev/null; then
  #shellcheck disable=SC2155  # will not declare separately, value compactness
  export DOTNET_ROOT="$(dirname "$(which dotnet)")"
  export POWERSHELL_UPDATECHECK="Off"
fi

### Starship cross-shell prompt ################################################

command -v starship >/dev/null && eval "$(starship init "${SHELL##*/}")"

### zoxide #####################################################################

if command -v zoxide >/dev/null; then
  eval "$(zoxide init "${SHELL##*/}" --cmd j --no-aliases)"
  j() {
    __zoxide_z "$@"
  }
fi

### carapace ###################################################################

if command -v carapace >/dev/null; then
  eval "$(carapace _carapace "${SHELL##*/}")"
fi

### fzf ########################################################################

export FZF_DEFAULT_COMMAND='rg --files --hidden --follow --no-ignore-vcs'

### atuin ######################################################################

command -v atuin >/dev/null && eval "$(atuin init "${SHELL##*/}")"

### bat ########################################################################

export BAT_STYLE="auto"
export BAT_THEME="AyuDark"

# color manpages
command -v bat >/dev/null && export MANPAGER='sh -c "col -bx | bat -l man -p"'

### mcat #######################################################################

export MCAT_ENCODER="sixel"
export MCAT_INLINE_OPTS="center=false"
export MCAT_THEME="ayu"

# completions
command -v mcat >/dev/null && eval "$(mcat --generate "${SHELL##*/}")"

### git ########################################################################

command -v delta >/dev/null && export GIT_PAGER="delta"

### awscli #####################################################################

command -v aws_completer >/dev/null && complete -C aws_completer aws

### Azure bicep ################################################################

path_append "$HOME/.azure/bin"

### Azure developer CLI ########################################################

path_append "$HOME/.azd/bin"

### kubectl krew ###############################################################

path_append "$HOME/.krew/bin"

### UTM ########################################################################

if [ "$(uname -s)" = 'Darwin' ]; then
  path_append "$HOME/Applications/UTM.app/Contents/MacOS"
fi

### Antigravity ################################################################

path_append "$HOME/.antigravity/antigravity/bin"

### Disable telemetry ##########################################################

# https://consoledonottrack.com
export DO_NOT_TRACK=1

# homebrew
export HOMEBREW_NO_ANALYTICS=1
export HOMEBREW_NO_ANALYTICS_THIS_RUN=1

# anthropic
export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1

# google
export CLOUDSDK_CORE_DISABLE_USAGE_REPORTING=true
export GEMINI_CLI_START_SESSION_TELEMETRY_ENABLED=false

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

# browser-use
export ANONYMIZED_TELEMETRY=false

# vercel
export VERCEL_TELEMETRY_DISABLED=1

### ai #########################################################################

# aichat
export AICHAT_CONFIG_DIR="$HOME/.config/aichat"
export AICHAT_FUNCTIONS_DIR="$HOME/.config/aichat/functions"
export AICHAT_ROLES_DIR="$HOME/.config/configent/prompts"

# functions
export FUNCTIONS_REPO_URL="git@github.com:alkue-com/functions.git"
export LLM_MCP_SKIP_CONFIRM=".*"

# goose
export GOOSE_DISABLE_KEYRING=1

# prompts-mcp
export PROMPTS_DIR="$HOME/.config/configent/prompts"

# code-mode-mcp (https://github.com/universal-tool-calling-protocol/code-mode)
export UTCP_CONFIG_FILE="$HOME/.config/configent/utcp/.utcp_config.json"

# agent-mcp-gateway (https://github.com/roddutra/agent-mcp-gateway)
export GATEWAY_MCP_CONFIG="$HOME/.config/configent/mcp-gateway/mcp.json"
export GATEWAY_RULES="$HOME/.config/configent/mcp-gateway/gateway-rules.json"

### playwright #################################################################

# set macOS default (~/Library/Caches/ms-playwright) equal to Linux default
export PLAYWRIGHT_BROWSERS_PATH="$HOME/.cache/ms-playwright"

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

### docker/podman CLIs on macOS ################################################

if [ "$(uname -s)" = 'Darwin' ]; then
  export DOCKER_HOST="unix://$HOME/.lima/default/sock/docker.sock"
  export BUILDKIT_HOST="unix://$HOME/.lima/default/sock/buildkitd.sock"
  export CONTAINER_HOST="unix://$HOME/.lima/podman/sock/podman.sock"
fi

### ollama #####################################################################

export OLLAMA_CONTEXT_LENGTH=32768
export OLLAMA_HOST="127.0.0.1:11434"

### configent/bin ##############################################################

path_prepend "$HOME/.local/configent/bin"
