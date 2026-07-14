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

export COLORTERM="${COLORTERM:-truecolor}" # sudo -i strips COLORTERM

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

# pager: auto-exit if output fits on one screen, don't clear screen
export PAGER="less -F -X"

# get plain text from man
export MANROFFOPT='-c'

# macOS CLI tools: C++ headers not in default include path
# fixes pip builds failing with 'iostream' file not found
if [ "$(uname -s)" = 'Darwin' ]; then
  _sdk="$(xcrun --show-sdk-path 2>/dev/null)"
  if [ -d "$_sdk/usr/include/c++/v1" ]; then
    export CXXFLAGS="-isysroot $_sdk"
    export CXXFLAGS="$CXXFLAGS -I$_sdk/usr/include/c++/v1"
  fi
  unset _sdk
fi

### Defaults ###################################################################

# default for new files
umask 0027 # u=rwx,g=rx,o=

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

### mise #######################################################################

path_prepend "$HOME/.local/share/mise/shims"

### bun ########################################################################

# for bun link, npm link uses $(npm prefix -g)
path_append "$HOME/.bun/bin"

### pnpm #######################################################################

if [ "$(uname -s)" = 'Darwin' ]; then
  export PNPM_HOME="$HOME/Library/pnpm"
  path_append "$PNPM_HOME/bin"
else
  export PNPM_HOME="$HOME/.local/share/pnpm"
  path_append "$PNPM_HOME/bin"
fi

### go #########################################################################

export GOPATH="$HOME/.go"

### Haskell ####################################################################

path_append "$HOME/.ghcup/bin"

### Python #####################################################################

# PATH is rewritten on (re)loading shell, thus we are not in virtualenv
unset VIRTUAL_ENV VIRTUAL_ENV_PROMPT

# hatch
if command -v hatch >/dev/null; then
  unset HATCH_ENV_ACTIVE
  export HATCH_ENV_TYPE_VIRTUAL_PATH=".venv"
fi

# poetry
if command -v poetry >/dev/null; then
  export POETRY_VIRTUALENVS_IN_PROJECT=true
  export POETRY_VIRTUALENVS_OPTIONS_NO_PIP=true
  export POETRY_VIRTUALENVS_PREFER_ACTIVE_PYTHON=true
fi

# ptpython
if command -v ptpython >/dev/null; then
  export PTPYTHON_CONFIG_HOME="$HOME/.config/ptpython"
fi

# sitecustomize.py
export RICH_TRACEBACKS=true
export RICH_SHOW_LOCALS=true

### dotnet #####################################################################

if command -v dotnet >/dev/null; then
  #shellcheck disable=SC2155  # will not declare separately, value compactness
  export DOTNET_ROOT="$(dirname "$(which dotnet)")"
fi

### powershell #################################################################

command -v pwsh >/dev/null && export POWERSHELL_UPDATECHECK="Off"

### fzf ########################################################################

if command -v rg >/dev/null; then
  export FZF_DEFAULT_COMMAND='rg --files --hidden --follow --no-ignore-vcs'
fi

### bat ########################################################################

if command -v bat >/dev/null; then
  export BAT_PAGING="never"
  export BAT_STYLE="plain"
  export BAT_THEME="AyuDark"

  # color manpages
  export MANPAGER='sh -c "col -bx | bat -l man -p"'
fi

### mcat #######################################################################

if command -v mcat >/dev/null; then
  export MCAT_ENCODER="sixel"
  export MCAT_INLINE_OPTS="center=false"
  export MCAT_THEME="ayu"
fi

### delta ######################################################################

command -v delta >/dev/null && export GIT_PAGER="delta"

### tlrc #######################################################################

if command -v tlrc >/dev/null; then
  export TLRC_CONFIG="$HOME/.config/tlrc/config.toml"
fi

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

### local bin ##################################################################

path_prepend "$HOME/.local/bin"
path_prepend "$HOME/.local/configent/bin"

### ai #########################################################################

# dynamic-mcp (https://github.com/asyrjasalo/dynamic-mcp)
export DYNAMIC_MCP_CONFIG="$HOME/.config/configent/mcp/mcp.json"

# openchamber
export OPENCHAMBER_OPENCODE_PORT=4096

# opencode
export OPENCODE_DISABLE_CLAUDE_CODE_PROMPT=1  # disable ~/.claude/CLAUDE.md

# pi
export PI_SKIP_VERSION_CHECK=1

# ponytail
export PONYTAIL_DEFAULT_MODE="lite"

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

### mas - macOS Apple Store CLI ################################################

if [ "$(uname -s)" = 'Darwin' ]; then
  command -v mas >/dev/null && export MAS_NO_AUTO_INDEX=1
fi

### docker/podman CLIs on macOS ################################################

if [ "$(uname -s)" = 'Darwin' ]; then
  # docker(d)
  export DOCKER_HOST="unix://$HOME/.lima/default/sock/docker.sock"
  #export DOCKER_HOST="unix://$HOME/.lima/default/sock/docker_rootless.sock"

  # podman
  export CONTAINER_HOST="unix://$HOME/.lima/default/sock/podman.sock"

  # containerd
  # CONTAINERD_ADDRESS: nerdctl does not run on macOS (2026-01)
  export BUILDKIT_HOST="unix://$HOME/.lima/ubuntu/sock/buildkitd.sock"

  # kubernetes
  if command -v kubectl >/dev/null; then
    export KUBECONFIG="$HOME/.lima/default/kubeconfig.yaml:$HOME/.lima/ubuntu/kubeconfig.yaml:$HOME/.lima/k3s/kubeconfig.yaml:$HOME/.kube/config"
  fi
fi

### ollama #####################################################################

if command -v ollama >/dev/null; then
  export OLLAMA_CONTEXT_LENGTH=32768
  export OLLAMA_HOST="127.0.0.1:11434"
fi

### Disable telemetry ##########################################################

export DO_NOT_TRACK=1
export DISABLE_TELEMETRY=1

# homebrew
export HOMEBREW_NO_ANALYTICS=1

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

# rtk
export RTK_TELEMETRY_DISABLED=1

# pi
export PI_TELEMETRY=0

# headroom
export HEADROOM_TELEMETRY=off

# openspec
export OPENSPEC_TELEMETRY=0

# opentabs
export OPENTABS_TELEMETRY_DISABLED=1

# oh-my-openagent
export OMO_DISABLE_POSTHOG=1
export OMO_SEND_ANONYMOUS_TELEMETRY=0
