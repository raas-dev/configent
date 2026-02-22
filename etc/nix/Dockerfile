# checkov:skip=CKV_DOCKER_7: skip image tag
FROM nixos/nix:latest

RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf

# checkov:skip=CKV_DOCKER_5: allow caching channel unstable
RUN nix-channel --update

RUN echo 'export TERM=xterm-256color' >> /etc/bashrc \
  && echo 'export COLORTERM=truecolor' >> /etc/bashrc \
  && echo 'PS1="\[\e[0;36m\]\$\[\e[0m\] "' >> /etc/bashrc

# checkov:skip=CKV_DOCKER_3: skip creating user
# checkov:skip=CKV_DOCKER_2: skip healthcheck
