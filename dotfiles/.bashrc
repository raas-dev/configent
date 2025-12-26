#!/bin/bash
# the above shebang is only for ShellCheck, this file is not executable

# Lima BEGIN is mentioned here for Lima to not mess with PATH on VM boot

# shellcheck disable=SC1091   # do not expect input files

# quit if no prompt is present - shell is not interactive
[ -z "$PS1" ] && return

if [ "$(uname -s)" = 'Darwin' ]; then
  if [ -x "/opt/homebrew/bin/bash" ]; then
    export SHELL="/opt/homebrew/bin/bash"
  elif [ -x "/usr/local/bin/bash" ]; then
    export SHELL="/usr/local/bin/bash"
  else
    export SHELL="/bin/bash"
  fi
else
  if [ -x "/home/linuxbrew/.linuxbrew/bin/bash" ]; then
    export SHELL="/home/linuxbrew/.linuxbrew/bin/bash"
  elif [ -x "$HOME/.linuxbrew/bin/bash" ]; then
    export SHELL="$HOME/.linuxbrew/bin/bash"
  else
    export SHELL="/bin/bash"
  fi
fi

### dircolors ##################################################################

command -v dircolors >/dev/null && eval "$(dircolors -b "$HOME"/.dir_colors)"

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
HISTSIZE=100000
HISTCONTROL=ignoreboth
HISTIGNORE='ls:cd:bg:fg:history:pwd:exit:r'
HISTTIMEFORMAT='%d.%m.%Y %H:%M  '

# save and reload the history after each command finishes
PROMPT_COMMAND="history -a; history -c; history -r"

### Prompt #####################################################################

# Only set PS1 if starship is not available (starship will override it anyway)
if ! command -v starship >/dev/null; then
  txtgrn='\[\e[0;32m\]'
  txtblu='\[\e[0;34m\]'
  txtcyn='\[\e[0;36m\]'
  txtrst='\[\e[0m\]'

  parse_git_branch() {
    git branch --no-color 2>/dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1/"
  }

  get_branch_info() {
    # shellcheck disable=SC2155   # will not declare separately, value compactness
    local branch=$(parse_git_branch)
    [ -n "$branch" ] && echo "(git:$branch)"
  }

  if command -v git >/dev/null; then
    PS1="$txtblu\u@\h$txtrst:$txtcyn\w$txtgrn\$(get_branch_info)$txtrst\$ "
  else
    PS1="$txtblu\u@\h$txtrst:$txtcyn\w$txtrst\$ "
  fi
fi

### Additional bash completions ################################################

if [ "$(uname -s)" = 'Darwin' ]; then
  if [ -r "/opt/homebrew/etc/profile.d/bash_completion.sh" ]; then
    # brew on ARM macs
    . "/opt/homebrew/etc/profile.d/bash_completion.sh"
  elif [ -r "/usr/local/etc/profile.d/bash_completion.sh" ]; then
    # brew on Intel Macs
    . "/usr/local/etc/profile.d/bash_completion.sh"
  fi
else
  if [ -r "/home/linuxbrew/.linuxbrew/etc/profile.d/bash_completion.sh" ]; then
    # Linuxbrew
    . "/home/linuxbrew/.linuxbrew/etc/profile.d/bash_completion.sh"
  elif [ -r "/usr/share/bash-completion/bash_completion" ]; then
    # apt on Ubuntu
    . "/usr/share/bash-completion/bash_completion"
  elif [ -r "/etc/bash_completion" ]; then
    # apt on Debian
    . "/etc/bash_completion"
  fi
fi

# add tab completion for hostnames based on ~/.ssh/config, ignoring wildcards
[ -r "$HOME/.ssh/config" ] && complete -o 'default' -o 'nospace' \
  -W "$(grep "^Host" ~/.ssh/config | grep -v "[?*]" |
    cut -d ' ' -f2 | tr ' ' '\n')" scp sftp ssh

# workaround https://github.com/oven-sh/bun/issues/11179
# bun completions

### Load other configs #########################################################

[ -r "$HOME/.bash-preexec.sh" ] && . "$HOME/.bash-preexec.sh"
[ -r "$HOME/.profile" ] && . "$HOME/.profile"
[ -r "$HOME/.aliases" ] && . "$HOME/.aliases"
[ -r "$HOME/.rclocal" ] && . "$HOME/.rclocal"
