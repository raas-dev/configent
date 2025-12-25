#!/bin/bash
# the above shebang is only for ShellCheck, this file is not executable

# Lima BEGIN is mentioned here for Lima to not mess with PATH on VM boot

# shellcheck disable=SC1091  # do not expect input files
# shellcheck disable=SC2016  # zstyle: ignore single quotes warning
# shellcheck disable=SC2034  # ignore SAVEHIST, PROMPT and RPROMPT unused

if [ "$(uname -s)" = 'Darwin' ]; then
  if [ -x "/opt/homebrew/bin/zsh" ]; then
    export SHELL="/opt/homebrew/bin/zsh"
  elif [ -x "/usr/local/bin/zsh" ]; then
    export SHELL="/usr/local/bin/zsh"
  else
    export SHELL="/bin/zsh"
  fi
else
  if [ -x "/home/linuxbrew/.linuxbrew/bin/zsh" ]; then
    export SHELL="/home/linuxbrew/.linuxbrew/bin/zsh"
  elif [ -x "$HOME/.linuxbrew/bin/zsh" ]; then
    export SHELL="$HOME/.linuxbrew/bin/zsh"
  else
    export SHELL="/bin/zsh"
  fi
fi

### Use emacs keymap ###########################################################

# https://zsh.sourceforge.io/Guide/zshguide04.html
bindkey -e
bindkey -r '^S' # unbind terminal chord
bindkey -r '^@' # unbind tmux prefix

### Completions ################################################################

autoload -Uz compinit && compinit
autoload -Uz bashcompinit && bashcompinit

# workaround https://github.com/oven-sh/bun/issues/11179
# bun completions

### dircolors ##################################################################

# load before LS_COLORS for Aloxaf/fzf-tab
command -v dircolors >/dev/null && eval "$(dircolors -b "$HOME"/.dir_colors)"

### antidote ###################################################################

if [ -r "$HOME/.antidote/antidote.zsh" ]; then
  export ANTIDOTE_HOME="$HOME/.cache/antidote"
  . "$HOME/.antidote/antidote.zsh"
  antidote load

  # .zsh_plugins.txt: Aloxaf/fzf-tab
  zstyle ':completion:*' list-colors "${LS_COLORS}"
  zstyle ':completion:*' menu no
  zstyle ':completion:*:descriptions' format '[%d]'
  zstyle ':completion:*:git-checkout:*' sort false
  zstyle ':fzf-tab:*' switch-group ',' '.'
  zstyle ':fzf-tab:*' fzf-flags --preview-window=right:70%
  zstyle ':fzf-tab:complete:*:*' fzf-preview 'less ${(Q)realpath}'
  zstyle ':fzf-tab:complete:*:options' fzf-preview
  zstyle ':fzf-tab:complete:*:argument-1' fzf-preview
  zstyle ':fzf-tab:complete:tldr:argument-1' fzf-preview 'tldr $word'
  zstyle ':fzf-tab:complete:-command-:*' fzf-preview \
    '(out=$(tldr $word) 2>/dev/null && echo $out) || (out=$(MANWIDTH=$FZF_PREVIEW_COLUMNS man "$word") 2>/dev/null && echo $out) || (out=$(which "$word") && echo $out) || echo "${(P)word}"'
  # disable-fzf-tab
fi

### History ####################################################################

HISTFILE="$HOME/.zsh_history"
HISTSIZE=100000
SAVEHIST=$HISTSIZE

setopt append_history         # append to history list rather than replace
setopt extended_history       # special history format with timestamp
setopt hist_expire_dups_first # expire the oldest instance of command
setopt hist_ignore_dups       # ignore second instance of same event
setopt hist_ignore_space      # ignore entries with leading space
setopt hist_verify            # do not execute the line directly
setopt no_hist_beep           # no beep
setopt share_history          # share history between session

alias history='fc -El 1' # show timestamped history (zsh fc only)

### Prompt #####################################################################

PROMPT='%F{blue}%n@%M %F{cyan}%C%f%# '
RPROMPT='%(?.%F{green}√.%F{red}✘%?)'

### Load other configs #########################################################

[ -r "$HOME/.profile" ] && . "$HOME/.profile"
[ -r "$HOME/.aliases" ] && . "$HOME/.aliases"
[ -r "$HOME/.rclocal" ] && . "$HOME/.rclocal"

### Automatically list contents when changing directory ########################

chpwd() {
  ls
}
