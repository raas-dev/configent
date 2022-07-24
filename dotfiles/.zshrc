#!/bin/sh
# the above shebang is purely for ShellCheck, this file is not executable

# shellcheck disable=SC1091  # do not expect input files
# shellcheck disable=SC2034  # ignore SAVEHIST, PROMPT and RPROMPT unused
# shellcheck disable=SC2155  # will not declare separately, value compactness

if [ "$(uname -s)" = 'Darwin' ]; then
  if [ -x "/opt/homebrew/bin/zsh" ]; then
    export SHELL="/opt/homebrew/bin/zsh"
  elif [ -x "/usr/local/bin/zsh" ]; then
    export SHELL="/usr/local/bin/zsh"
  fi
else
  if [ -x "/home/linuxbrew/.linuxbrew/bin/zsh" ]; then
    export SHELL="/home/linuxbrew/.linuxbrew/bin/zsh"
  elif [ -x "$HOME/.linuxbrew/bin/zsh" ]; then
    export SHELL="$HOME/.linuxbrew/bin/zsh"
  fi
fi

alias r=". \$HOME/.zshrc"

### Zplug ######################################################################

export ZPLUG_HOME="$HOME/.zplug"
[ -d "$ZPLUG_HOME" ] && . "$ZPLUG_HOME/init.zsh"

if command -v zplug >/dev/null; then
  zplug "zsh-users/zsh-completions", depth:1
  zplug "zsh-users/zsh-syntax-highlighting", defer:2

  zplug "zsh-users/zsh-history-substring-search", defer:3
  bindkey '^[[A' history-substring-search-up
  bindkey '^[[B' history-substring-search-down

  zplug "zsh-users/zsh-autosuggestions"
  zplug "bobsoppe/zsh-ssh-agent", use:ssh-agent.zsh
  zplug "plugins/colored-man-pages", from:oh-my-zsh

  zplug check || zplug install
  zplug load
fi

# completions
autoload -U +X compinit && compinit
autoload -U +X bashcompinit && bashcompinit

### History ####################################################################

HISTFILE="$HOME/.zsh_history"
HISTSIZE=10000
SAVEHIST=$HISTSIZE

setopt append_history         # append to history list rather than replace
setopt extended_history       # special history format with timestamp
setopt hist_expire_dups_first # expire the oldest instance of command
setopt hist_ignore_dups       # ignore second instance of same event
setopt hist_ignore_space      # ignore entries with leading space
setopt hist_verify            # do not execute the line directly
setopt inc_append_history     # write to history immediately
setopt no_hist_beep           # no beep
setopt share_history          # share history between session

alias history='fc -El 1' # show timestamped history (zsh fc only)

### Prompt #####################################################################

PROMPT='%F{blue}%n@%M %F{cyan}%C%f%# '
RPROMPT='%(?.%F{green}√.%F{red}✘%?)'

### Use emacs keymap ###########################################################

# https://zsh.sourceforge.io/Guide/zshguide04.html
bindkey -e

### Load other configs #########################################################

[ -f "$HOME/.profile" ] && . "$HOME/.profile"
[ -f "$HOME/.fzf.zsh" ] && . "$HOME/.fzf.zsh"
[ -f "$HOME/.aliases" ] && . "$HOME/.aliases"
[ -f "$HOME/.rclocal" ] && . "$HOME/.rclocal"

### Automatically list contents when changing directory ########################

chpwd() {
  ls
}

### Restore tmux ###############################################################

[ -n "$TMUX" ] || tmux attach -t "local" || tmux new -s "local"

# sdkman-init.sh is mentioned here to not be appended by `install_java`
