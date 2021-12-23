### .bashrc

# quit if no prompt is present - shell is not interactive
[[ -z "$PS1" ]] && return

export SHELL="$(which bash)"

alias r=". $HOME/.bashrc"

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
  git branch --no-color 2> /dev/null | sed -e '/^[^*]/d' -e "s/* \(.*\)/\1/"
}

get_branch_info() {
  local branch=$(parse_git_branch)
  local scm=''
  if [[ -n "$branch" ]]; then
    scm='git'
  else
    branch=$(parse_git_branch)
    [[ -n "$branch" ]] && scm='hg'
  fi
  [[ -n "$scm" ]] && echo "($scm:$branch)"
}

if which git &>/dev/null ; then
  PS1="$txtblu\u@\h$txtrst:$txtcyn\w$txtgrn\$(get_branch_info)$txtrst\$ "
else
  PS1="$txtblu\u@\h$txtrst:$txtcyn\w$txtrst\$ "
fi

#if which starship &>/dev/null ; then
#  eval "$(starship init bash)"
#fi

### Additional bash completions ################################################

if [[ "$OSTYPE" != darwin* ]] ; then
  # apt-get install bash-completion
  if [[ -f "/usr/share/bash-completion/bash_completion" ]] ; then
    # ubuntu
    source "/usr/share/bash-completion/bash_completion"
  elif [[ -f "etc/bash_completion" ]] ; then
    # debian
    source "/etc/bash_completion"
  fi
fi

if which brew &>/dev/null ; then
  if [[ -f "$(brew --prefix)/etc/profile.d/bash_completion.sh" ]]; then
    source "$(brew --prefix)/etc/profile.d/bash_completion.sh"
  fi
fi

# add tab completion for hostnames based on ~/.ssh/config, ignoring wildcards
[[ -e "$HOME/.ssh/config" ]] && complete -o 'default' -o 'nospace' \
  -W "$(grep "^Host" ~/.ssh/config | grep -v "[?*]" \
    | cut -d ' ' -f2 | tr ' ' '\n')" scp sftp ssh

### zoxide #####################################################################

if which zoxide &>/dev/null ; then
  eval "$(zoxide init bash --cmd j --no-aliases)"

  function j() {
    __zoxide_z "$@"
  }
fi

### Load other configs #########################################################

[[ -f "$HOME/.profile" ]]  && . "$HOME/.profile"
[[ -f "$HOME/.aliases" ]]  && . "$HOME/.aliases"
[[ -f "$HOME/.fzf.bash" ]] && . "$HOME/.fzf.bash"
[[ -f "$HOME/.rclocal" ]]  && . "$HOME/.rclocal" || true
