# hadolint global ignore=DL3007,DL3059
# checkov:skip=CKV_DOCKER_2: skip healthcheck
# checkov:skip=CKV_DOCKER_3: skip creating user
# checkov:skip=CKV_DOCKER_5: allow caching channel unstable
# checkov:skip=CKV_DOCKER_7: skip image tag
FROM nixos/nix:latest

RUN echo "experimental-features = nix-command flakes" >> /etc/nix/nix.conf

RUN nix-channel --update
#RUN nix-env -u '*'

RUN nix-collect-garbage --delete-old
