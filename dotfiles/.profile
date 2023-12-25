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
  path_prepend "$(brew --prefix findutils)/libexec/gnubin"
  path_prepend "$(brew --prefix coreutils)/libexec/gnubin"
else
  if [ -x "/home/linuxbrew/.linuxbrew/bin/brew" ]; then
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
  elif [ -x "$HOME/.linuxbrew/bin/brew" ]; then
    eval "$("$HOME/.linuxbrew/bin/brew shellenv")"
  fi
fi

### asdf #######################################################################

if [ -r "$HOME/.asdf/asdf.sh" ]; then
  . "$HOME/.asdf/asdf.sh"

  # Go
  export ASDF_GOLANG_MOD_VERSION_ENABLED=true
  go_path="$(asdf where golang 2>/dev/null)"
  if [ -d "$go_path" ]; then
    export GOPATH="$go_path"
    export GOROOT="$GOPATH/go"
    path_prepend "$GOPATH/bin"
  fi

  # Rust
  rust_path="$(asdf where rust 2>/dev/null)"
  if [ -d "$rust_path" ]; then
    export CARGO_HOME="$rust_path"
    path_prepend "$CARGO_HOME/bin"
  fi
fi

### Haskell ####################################################################

[ -r "$HOME/.ghcup/env" ] && . "$HOME/.ghcup/env"

### Python #####################################################################

export BETTER_EXCEPTIONS=1
export TBVACCINE=1
export PTPYTHON_CONFIG_HOME="$HOME/.config/ptpython"

# Add `pip install --user` and `pipx` scopes to $PATH
path_prepend "$HOME/.local/bin"

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
export BAT_THEME="DarkNeon"

### dircolors ##################################################################

command -v dircolors >/dev/null && eval "$(dircolors -b "$HOME"/.dir_colors)"

### awscli #####################################################################

command -v aws_completer >/dev/null &&
  complete -C "$(command -v aws_completer)" aws

### Dotnet #####################################################################

dotnet_shell_env="$HOME/.asdf/plugins/dotnet/set-dotnet-env.${SHELL##*/}"
# shellcheck disable=SC1090  # do not follow non-constant source
[ -r "$dotnet_shell_env" ] && . "$dotnet_shell_env"
path_append "$HOME/.dotnet/tools"

### Azure bicep ################################################################

path_append "$HOME/.azure/bin"

### Azure developer CLI ########################################################

path_append "$HOME/.azd/bin"

### kubectl krew ###############################################################

path_append "$HOME/.krew/bin"

### Disable telemetries ########################################################

# Azure Developer CLI
export AZURE_DEV_COLLECT_TELEMETRY=no

# Azure Functions Core Tools
export FUNCTIONS_CORE_TOOLS_TELEMETRY_OPTOUT=true

# dotnet
export DOTNET_CLI_TELEMETRY_OPTOUT=1

### aichat #####################################################################

export AICHAT_CONFIG_DIR="$HOME/.config/aichat"

### XDG base directory specification ###########################################

# https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html
if [ "$(uname -s)" = 'Linux' ]; then
  export XDG_CACHE_HOME="$HOME/.cache"
  export XDG_CONFIG_HOME="$HOME/.config"
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

### configent/bin ##############################################################

path_prepend "$HOME/.local/configent/bin"
