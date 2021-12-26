#!/usr/bin/env bash

# shellcheck disable=SC1091  # do not expect input files
# shellcheck disable=SC2123  # set PATH
# shellcheck disable=SC2155  # will not declare separately, value compactness

### PATH #######################################################################

path_append() {
  if [ -d "$1" ] && [[ ":$PATH:" != *":$1:"* ]]; then
    PATH="${PATH:+"$PATH:"}$1"
  fi
}

path_prepend() {
  if [ -d "$1" ]; then
    PATH=${PATH//":$1:"/:} #delete all instances in the middle
    PATH=${PATH/%":$1"/} #delete any instance at the end
    PATH=${PATH/#"$1:"/} #delete any instance at the beginning
    PATH="$1${PATH:+":$PATH"}" #prepend $1 or if $PATH is empty set to $1
  fi
}

if [[ "$OSTYPE" = darwin* ]] ; then
  PATH=''
  path_append '/usr/local/bin'
  path_append '/usr/bin'
  path_append '/bin'
  path_append '/usr/sbin'
  path_append '/sbin'
elif [[ "$OSTYPE" = linux-gnu* ]] ; then
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

# no clearing of the screen after quitting man
export PAGER='less'
export MANPAGER='less -X'

### Shell behaviour ############################################################

# default file permissions: u=rwx,g=rx,o=
umask 0027

# allow exiting shell with ^D
unset ignoreeof

### Disable stop (^S) and continue (^Q) flow control signals ###################

stty -ixon

### Homebrew/Linuxbrew #########################################################

if [[ "$OSTYPE" = darwin* ]]; then
  if [[ -x "/opt/homebrew/bin/brew" ]]; then
    eval "$(/opt/homebrew/bin/brew shellenv)"
  elif [[ -x "/usr/local/bin/brew" ]]; then
    eval "$(/usr/local/bin/brew shellenv)"
  fi
  path_prepend "$(brew --prefix findutils)/libexec/gnubin"
  path_prepend "$(brew --prefix coreutils)/libexec/gnubin"
else
  if [[ -x "/home/linuxbrew/.linuxbrew/bin/brew" ]]; then
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
  elif [[ -x "$HOME/.linuxbrew/bin/brew" ]]; then
    eval "$("$HOME/.linuxbrew/bin/brew shellenv")"
  fi
fi

### Java #######################################################################

sdkman_path="$HOME/.sdkman"
[[ -d "$sdkman_path" ]] && . "$sdkman_path/bin/sdkman-init.sh"

jars_path="$HOME/jars"
if [[ -d "$jars_path" ]]; then
  export CLASSPATH=$(find "$jars_path" -name '*.jar' -print0 | \
    xargs echo | tr ' ' ':')
fi

### Rbenv ######################################################################

path_prepend "$HOME/.rbenv/bin"

if which rbenv &>/dev/null ; then
  eval "$(rbenv init -)"
fi

### Pyenv ######################################################################

path_prepend "$HOME/.pyenv/bin"

if which pyenv &>/dev/null ; then
  eval "$(pyenv init -)"
  eval "$(pyenv init --path)"
  if [[ -d "$HOME/.pyenv/plugins/pyenv-virtualenv" ]] ; then
    export PYENV_VIRTUALENV_DISABLE_PROMPT=1
    eval "$(pyenv virtualenv-init -)"
  fi
fi

export BETTER_EXCEPTIONS=1  # pip install --upgrade better_exceptions
export TBVACCINE=1          # pip install --upgrade tbvaccine

# Add `pip install --user` scope into $PATH if the dir exists
path_prepend "$HOME/.local/bin"

### Nvm ########################################################################

if [[ -d "$HOME/.nvm" ]]; then
  export NVM_DIR="$HOME/.nvm"
  source "$HOME/.nvm/nvm.sh"
  [[ -s "$NVM_DIR/bash_completion" ]] && source "$NVM_DIR/bash_completion"
fi

### Go #########################################################################

go_path="$HOME/go"
if [[ -d "$go_path" ]]; then
  path_prepend "$go_path/bin"
  export GOPATH="$go_path"
  export GOROOT="$HOME/.go"
fi

### Rust #######################################################################

cargo_path="$HOME/.cargo"
if [[ -d "$cargo_path" ]]; then
  path_prepend "$cargo_path/bin"
  source "$cargo_path/env"
fi

### Fzf ########################################################################

export FZF_DEFAULT_COMMAND='rg --files --hidden --follow --no-ignore-vcs'
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"

### Dircolors ##################################################################

which dircolors &>/dev/null && eval "$(dircolors -b "$HOME"/.dir_colors)"

### Azure Functions Core Tools #################################################

export FUNCTIONS_CORE_TOOLS_TELEMETRY_OPTOUT=true

### Local binaries first in the PATH ###########################################

path_prepend "$HOME/local/bin"
