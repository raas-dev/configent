### .zshrc

export SHELL="$(which zsh)"

alias r=". \$HOME/.zshrc"

### Zplug ######################################################################

if [[ "$OSTYPE" = darwin* ]]; then
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

[[ -d "$ZPLUG_HOME" ]] && source "$ZPLUG_HOME/init.zsh"

if which zplug &>/dev/null ; then
  zplug "zsh-users/zsh-completions", depth:1
  zplug "zsh-users/zsh-autosuggestions", from:github 

  zplug "zsh-users/zsh-syntax-highlighting", from:github, defer:2

  zplug "zsh-users/zsh-history-substring-search", from:github, defer:3
  bindkey '^[[A' history-substring-search-up
  bindkey '^[[B' history-substring-search-down

  zplug "bobsoppe/zsh-ssh-agent", use:ssh-agent.zsh, from:github

  zplug check || zplug install
  zplug load
fi

# Allow bash completions
autoload bashcompinit
bashcompinit

### History ####################################################################

# This is unset on some environments
HISTFILE="$HOME/.zsh_history"

# Increase sizes
HISTSIZE=10000
SAVEHIST=10000

# Share history between shells
setopt append_history
setopt extended_history
setopt hist_expire_dups_first
setopt hist_ignore_dups
setopt hist_ignore_space
setopt hist_verify
setopt inc_append_history
setopt share_history

# Show timestamped history (zsh only)
alias history='fc -El 1'

### Prompt #####################################################################

if which starship &>/dev/null ; then
  eval "$(starship init zsh)"
else
  PROMPT='%F{blue}%n@%M %F{cyan}%C%f%# '
  RPROMPT='%(?.%F{green}√.%F{red}✘%?)'
fi

### Use emacs keymap ###########################################################

# https://zsh.sourceforge.io/Guide/zshguide04.html
bindkey -e

### zoxide #####################################################################

if which zoxide &>/dev/null ; then
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

[[ -n "$TMUX" ]] || tmux attach -t "local" || tmux new -s "local"
