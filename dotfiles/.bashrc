#!/usr/bin/env bash

# shellcheck disable=SC1091  # do not expect input files
# shellcheck disable=SC2015  # true is expected to be returned by the last line
# shellcheck disable=SC2155  # will not declare separately, value compactness

# quit if no prompt is present - shell is not interactive
[ -z "$PS1" ] && return

if [ "$(uname -s)" = 'Darwin' ]; then
  if [ -x "/opt/homebrew/bin/bash" ]; then
    export SHELL="/opt/homebrew/bin/bash"
  elif [ -x "/usr/local/bin/bash" ]; then
    export SHELL="/usr/local/bin/bash"
  fi
else
  if [ -x "/home/linuxbrew/.linuxbrew/bin/bash" ]; then
    export SHELL="/home/linuxbrew/.linuxbrew/bin/bash"
  elif [ -x "$HOME/.linuxbrew/bin/bash" ]; then
    export SHELL="$HOME/.linuxbrew/bin/bash"
  fi
fi

alias r=". \$HOME/.bashrc"

### Bash builtins ##############################################################

# have Bash to check if the window size has changed
shopt -s checkwinsize

# autocorrect typos in path names when using `cd`
shopt -s cdspell

### History ####################################################################

# append to the history file instead of overwriting it
shopt -s histappend

# combine multiline commands into one in history
shopt -s cmdhist

# configure history
HISTFILE="$HOME/.bash_history"
HISTFILESIZE=10000
HISTSIZE=10000
HISTCONTROL=ignoreboth
HISTIGNORE='ls:cd:bg:fg:history:pwd:exit:date:s'
HISTTIMEFORMAT='%d.%m.%Y %H:%M  '

# save and reload the history after each command finishes
PROMPT_COMMAND="history -a; history -c; history -r;"

### Prompt #####################################################################

txtgrn='\[\e[0;32m\]'
txtblu='\[\e[0;34m\]'
txtcyn='\[\e[0;36m\]'
txtrst='\[\e[0m\]'

parse_git_branch() {
  git branch --no-color 2>/dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1/"
}

get_branch_info() {
  local branch=$(parse_git_branch)
  local scm=''
  if [ -n "$branch" ]; then
    scm='git'
  else
    branch=$(parse_git_branch)
    [ -n "$branch" ] && scm='hg'
  fi
  [ -n "$scm" ] && echo "($scm:$branch)"
}

if command -v git >/dev/null; then
  PS1="$txtblu\u@\h$txtrst:$txtcyn\w$txtgrn\$(get_branch_info)$txtrst\$ "
else
  PS1="$txtblu\u@\h$txtrst:$txtcyn\w$txtrst\$ "
fi

### Additional bash completions ################################################

if [ "$(uname -s)" = 'Linux' ]; then
  # apt-get install bash-completion
  if [ -f "/usr/share/bash-completion/bash_completion" ]; then
    # ubuntu
    . "/usr/share/bash-completion/bash_completion"
  elif [ -f "etc/bash_completion" ]; then
    # debian
    . "/etc/bash_completion"
  fi
fi

# add tab completion for hostnames based on ~/.ssh/config, ignoring wildcards
[ -e "$HOME/.ssh/config" ] && complete -o 'default' -o 'nospace' \
  -W "$(grep "^Host" ~/.ssh/config | grep -v "[?*]" |
    cut -d ' ' -f2 | tr ' ' '\n')" scp sftp ssh

### Load other configs #########################################################

[ -f "$HOME/.profile" ] && . "$HOME/.profile"
[ -f "$HOME/.aliases" ] && . "$HOME/.aliases"
[ -f "$HOME/.fzf.bash" ] && . "$HOME/.fzf.bash"
[ -f "$HOME/.rclocal" ] && . "$HOME/.rclocal" || true

# sdkman-init.sh is mentioned here to not be appended by `install_java`
