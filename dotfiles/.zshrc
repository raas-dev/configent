#!/usr/bin/env bash

# shellcheck disable=SC2034  # ignore SAVEHIST, PROMPT and RPROMPT unused
# shellcheck disable=SC2155  # will not declare separately, value compactness

export SHELL="$(which zsh)"

alias r=". \$HOME/.zshrc"

### Zplug ######################################################################

if [[ $OSTYPE == darwin* ]]; then
  if [[ $(uname -m) == 'arm64' ]]; then
    export ZPLUG_HOME="/opt/homebrew/opt/zplug"
  else
    export ZPLUG_HOME="/usr/local/opt/zplug"
  fi
else
  if [[ -d "/home/linuxbrew/.linuxbrew/opt/zplug" ]]; then
    export ZPLUG_HOME="/home/linuxbrew/.linuxbrew/opt/zplug"
  elif [[ -d "$HOME/.linuxbrew/opt/zplug" ]]; then
    export ZPLUG_HOME="$HOME/.linuxbrew/opt/zplug"
  fi
fi

[[ -d $ZPLUG_HOME ]] && source "$ZPLUG_HOME/init.zsh"

if which zplug &>/dev/null; then
  zplug "zsh-users/zsh-completions", depth:1
  zplug "zsh-users/zsh-syntax-highlighting", from:github, defer:2

  zplug "zsh-users/zsh-history-substring-search", from:github, defer:3
  bindkey '^[[A' history-substring-search-up
  bindkey '^[[B' history-substring-search-down

  zplug "zsh-users/zsh-autosuggestions", from:github
  zplug "bobsoppe/zsh-ssh-agent", use:ssh-agent.zsh, from:github
  zplug "plugins/colored-man-pages", from:oh-my-zsh

  zplug check || zplug install
  zplug load
fi

# completions
autoload -U compinit && compinit
autoload -U bashcompinit bashcompinit

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

### zoxide #####################################################################

if which zoxide &>/dev/null; then
  eval "$(zoxide init zsh --cmd j --no-aliases)"

  function j() {
    __zoxide_z "$@"
  }
fi

### Load other configs #########################################################

[[ -f "$HOME/.profile" ]] && . "$HOME/.profile"
[[ -f "$HOME/.fzf.zsh" ]] && . "$HOME/.fzf.zsh"
[[ -f "$HOME/.aliases" ]] && . "$HOME/.aliases"
[[ -f "$HOME/.rclocal" ]] && . "$HOME/.rclocal"

### Automatically list contents when changing directory ########################

chpwd() {
  ls
}

### Restore tmux ###############################################################

[[ -n $TMUX ]] || tmux attach -t "local" || tmux new -s "local"

# sdkman-init.sh is mentioned here to not be appended by `install_java`
