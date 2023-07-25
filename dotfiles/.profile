#!/bin/bash
# the above shebang is only for ShellCheck, this file is not executable

# shellcheck disable=SC1091  # do not expect input files
# shellcheck disable=SC2123  # set PATH
# shellcheck disable=SC2155  # will not declare separately, value compactness

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
export LESS='-R'                              # output raw control characters to have colors
export LESSOPEN='|~/local/bin/lesspipe.sh %s' # use lesspipe.sh in this repo
export LESSQUIET=1                            # suppress additional output not belonging to the file

### Shell behaviour ############################################################

# default file permissions: u=rwx,g=rx,o=
umask 0027

# allow exiting shell with ^D
unset ignoreeof

### Disable stop (^S) and continue (^Q) flow control signals ###################

stty -ixon

### Homebrew/Linuxbrew #########################################################

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

  # go
  export ASDF_GOLANG_MOD_VERSION_ENABLED=true
  go_path="$(asdf where golang)"
  if [ -d "$go_path" ]; then
    export GOPATH="$go_path"
    export GOROOT="$GOPATH/go"
    path_prepend "$GOPATH/bin"
  fi

  # rust
  asdf where rust &>/dev/null && path_prepend "$(asdf where rust)/bin"
fi

### Haskell ####################################################################

[ -r "$HOME/.ghcup/env" ] && . "$HOME/.ghcup/env"

### Python #####################################################################

export BETTER_EXCEPTIONS=1
export TBVACCINE=1

# Add `pip install --user` and `pipx` scope into $PATH
path_prepend "$HOME/.local/bin"

### Prompt #####################################################################

command -v starship >/dev/null && eval "$(starship init "${SHELL##*/}")"

### zoxide #####################################################################

if command -v zoxide >/dev/null; then
  eval "$(zoxide init "${SHELL##*/}" --cmd j --no-aliases)"

  j() {
    __zoxide_z "$@"
  }
fi

### Java #######################################################################

jars_path="$HOME/jars"
if [ -d "$jars_path" ]; then
  export CLASSPATH="$(find "$jars_path" -name '*.jar' -print0 |
    xargs echo | tr ' ' ':')"
fi

### Dotnet #####################################################################

dotnet_shell_env="$HOME/.asdf/plugins/dotnet/set-dotnet-env.${SHELL##*/}"
# shellcheck disable=SC1090  # do not follow non-constant source
[ -r "$dotnet_shell_env" ] && . "$dotnet_shell_env"

path_append "$HOME/.dotnet/tools"

### Fzf ########################################################################

export FZF_DEFAULT_COMMAND='rg --files --hidden --follow --no-ignore-vcs'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"

### bat ########################################################################

export BAT_STYLE="auto" # same as default, unless output is piped (lesspipe.sh)
export BAT_THEME="DarkNeon"

### Dircolors ##################################################################

command -v dircolors >/dev/null && eval "$(dircolors -b "$HOME"/.dir_colors)"

### awscli #####################################################################

command -v aws_completer >/dev/null &&
  complete -C "$(command -v aws_completer)" aws

### kubectl krew ###############################################################

krew_path="${KREW_ROOT:-$HOME/.krew}"
path_append "$krew_path/bin"

### Disable telemetry ##########################################################

# Azure Functions Core Tools
export FUNCTIONS_CORE_TOOLS_TELEMETRY_OPTOUT=true

# Azure Developer CLI
export AZURE_DEV_COLLECT_TELEMETRY=no

# kics
export DISABLE_CRASH_REPORT=0

### Linux distros only #########################################################

if [ "$(uname -s)" = 'Linux' ]; then
  export XDG_DATA_HOME="$HOME/.local/share"
  if command -v flatpak >/dev/null; then
    export XDG_DATA_DIRS="$XDG_DATA_HOME/flatpak/exports/share:/var/lib/flatpak/exports/share"
  fi
  export XDG_DATA_DIRS="$XDG_DATA_DIRS:/usr/local/share:/usr/share"
  if command -v snap >/dev/null; then
    export XDG_DATA_DIRS="$XDG_DATA_DIRS:/var/lib/snapd/desktop"
  fi
fi

### Local binaries first in the PATH ###########################################

path_prepend "$HOME/local/bin"
