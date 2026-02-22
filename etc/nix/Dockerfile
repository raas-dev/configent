FROM nixos/nix:latest

RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf

RUN nix-channel --update

RUN echo 'export TERM=xterm-256color' >> /etc/bashrc \
  && echo 'export COLORTERM=truecolor' >> /etc/bashrc \
  && echo 'PS1="\[\e[0;36m\]\$\[\e[0m\] "' >> /etc/bashrc
