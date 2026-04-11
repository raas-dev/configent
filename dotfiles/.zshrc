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

### Key bindings ###############################################################

# https://zsh.sourceforge.io/Guide/zshguide04.html
bindkey -e      # use emacs keymap
bindkey -r '^S' # unbind terminal chord
bindkey -r '^l' # unbind clear screen (ctrl+l) for terminal pane navigation

### dircolors ##################################################################

# load before LS_COLORS for Aloxaf/fzf-tab
command -v dircolors >/dev/null && eval "$(dircolors -b "$HOME"/.dir_colors)"

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

### nsh ########################################################################

command -v nsh >/dev/null && eval "$(nsh init "${SHELL##*/}")"

# Atuin only records preexec's $1. nsh clears the buffer before accept-line,
# so `? …` never reaches Atuin. Start/end an explicit history row for NL
# queries.
if typeset -f __nsh_handle_nl_query_line >/dev/null 2>&1; then
  _nsh_fn_orig=__nsh_handle_nl_query_line__orig
  _nsh_fn_src=__nsh_handle_nl_query_line
  # Quoted subscripts on functions[...] break the copy in zsh
  # (orig never defined).
  # zsh functions[] keys are strings; bash-oriented SC2004 does not apply.
  # shellcheck disable=SC2004
  functions[$_nsh_fn_orig]=${functions[$_nsh_fn_src]}
  unset _nsh_fn_orig _nsh_fn_src
  __nsh_handle_nl_query_line() {
    case "$BUFFER" in
    '?? '* | '?! '* | '? '*)
      if command -v atuin >/dev/null; then
        typeset -g __NSH_ATUIN_NL_ID
        __NSH_ATUIN_NL_ID="$(
          ATUIN_LOG=error atuin history start -- "$BUFFER" 2>/dev/null
        )"
      fi
      ;;
    esac
    __nsh_handle_nl_query_line__orig
  }
  _nsh_fn_orig=__nsh_run_deferred__orig
  _nsh_fn_src=__nsh_run_deferred
  # shellcheck disable=SC2004
  functions[$_nsh_fn_orig]=${functions[$_nsh_fn_src]}
  unset _nsh_fn_orig _nsh_fn_src
  __nsh_run_deferred() {
    local _atuin_nl_id="${__NSH_ATUIN_NL_ID:-}" \
      _atuin_t0="${EPOCHREALTIME-}" _dur
    __nsh_run_deferred__orig
    local _atuin_qexit=$?
    if [[ -n "$_atuin_nl_id" ]]; then
      unset __NSH_ATUIN_NL_ID
      if [[ -n "$_atuin_t0" ]]; then
        local _atuin_t1="${EPOCHREALTIME-}"
        [[ -n "$_atuin_t1" ]] && printf -v _dur %.0f \
          $(((_atuin_t1 - _atuin_t0) * 1000000000))
      fi
      (ATUIN_LOG=error atuin history end --exit "$_atuin_qexit" \
        ${_dur:+--duration=$_dur} -- "$_atuin_nl_id" &) >/dev/null 2>&1
    fi
    return "$_atuin_qexit"
  }
fi

### Automatically list contents when changing directory ########################

chpwd() {
  ls
}
