# hadolint global ignore=DL3007,DL3059
# checkov:skip=CKV_DOCKER_7: skip pinning image
# checkov:skip=CKV_DOCKER_2: skip healthcheck
# checkov:skip=CKV_DOCKER_3: skip creating use
FROM nixos/nix:latest

RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf

RUN nix-channel --update
#RUN nix-env -u '*'

# https://www.cachix.org/
RUN nix-env -iA cachix -f https://cachix.org/api/v1/install
RUN cachix use devenv

# https://devenv.sh/
RUN nix-env -if https://install.devenv.sh/latest

RUN nix-collect-garbage --delete-old
