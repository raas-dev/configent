#!/bin/bash
# the above shebang is only for ShellCheck, this file is not executable

# Lima BEGIN is mentioned here for Lima to not mess with PATH on VM boot

# shellcheck disable=SC1091  # do not expect input files
# shellcheck disable=SC2016  # zstyle: ignore single quotes warning
# shellcheck disable=SC2034  # ignore SAVEHIST, PROMPT and RPROMPT unused

# zsh skips zshrc for non-interactive shells, no guard needed

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

### Key bindings ###############################################################

# https://zsh.sourceforge.io/Guide/zshguide04.html
bindkey -e      # use emacs keymap
bindkey -r '^S' # unbind terminal chord
bindkey -r '^l' # unbind clear screen (ctrl+l) for terminal pane navigation

### dircolors ##################################################################

# load before LS_COLORS for Aloxaf/fzf-tab
command -v dircolors >/dev/null && eval "$(dircolors -b "$HOME"/.dir_colors)"

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

### antidote ###################################################################

if [ -r "$HOME/.antidote/antidote.zsh" ]; then
  export ANTIDOTE_HOME="$HOME/.cache/antidote"
  . "$HOME/.antidote/antidote.zsh"
  antidote load
fi
### Completions ################################################################

autoload -Uz compinit && compinit
autoload -Uz bashcompinit && bashcompinit

# native zsh completion system configuration
zstyle ':completion:*' completer _complete _ignored _gnu_generic
zstyle ':completion:*' list-colors "${LS_COLORS}"
zstyle ':completion:*' menu no
zstyle ':completion:*:descriptions' format '[%d]'
zstyle ':completion:*:git-checkout:*' sort false

# .zsh_plugins.txt: Aloxaf/fzf-tab
zstyle ':fzf-tab:*' switch-group ',' '.'
zstyle ':fzf-tab:*' show-group quiet
zstyle ':fzf-tab:*' prefix ''
zstyle ':fzf-tab:complete:*:*' fzf-preview \
  '[[ $desc == *" -- "* ]] && echo ${desc#*-- } || less ${(Q)realpath}'
zstyle ':fzf-tab:complete:*:*' fzf-flags \
  '--preview-window=right:75%' '--with-nth=1' '--delimiter=\s+' '--query='
zstyle ':fzf-tab:complete:-command-:*' fzf-preview \
  '(out=$(tldr --color always $word) 2>/dev/null && echo $out) || ''(out=$(MANWIDTH=$FZF_PREVIEW_COLUMNS man "$word") ''2>/dev/null && echo $out) || ''(out=$(which "$word") && echo $out) || echo "${(P)word}"'
#disable-fzf-tab  # to use carapace only

# workaround https://github.com/oven-sh/bun/issues/11179
# bun completions

### Prompt #####################################################################

command -v mise >/dev/null && eval "$(mise activate zsh)"

# Prefer starship prompt; fallback to builtin prompt when unavailable
if command -v starship >/dev/null; then
  eval "$(starship init zsh)"
else
  PROMPT='%F{blue}%n@%M %F{cyan}%C%f%# '
  RPROMPT='%(?.%F{green}√.%F{red}✘%?)'
fi

if command -v zoxide >/dev/null; then
  eval "$(zoxide init zsh --cmd j --no-aliases)"
  j() {
    # prefer exact basename match when single arg is given
    if [ $# -eq 1 ] && [ "$1" != '-' ] && [ "${1#-}" = "$1" ]; then
      local _j_exact
      _j_exact=$(zoxide query -l 2>/dev/null | while IFS= read -r _j_dir; do
        if [ "${_j_dir##*/}" = "$1" ]; then
          echo "$_j_dir"
          break
        fi
      done)
      if [ -n "$_j_exact" ]; then
        __zoxide_z "$_j_exact"
        return $?
      fi
    fi
    __zoxide_z "$@"
  }
fi

command -v carapace >/dev/null && eval "$(carapace _carapace zsh)"
command -v atuin >/dev/null && eval "$(atuin init zsh)"
command -v mcat >/dev/null && eval "$(mcat --generate zsh)"
command -v wt >/dev/null && eval "$(wt config shell init zsh)"

### Load other configs #########################################################

[ -r "$HOME/.aliases" ] && . "$HOME/.aliases"
[ -r "$HOME/.rclocal" ] && . "$HOME/.rclocal"

### Automatically list contents when changing directory ########################

chpwd_functions+=(chpwd_ls)
chpwd_ls() {
  ls
}
