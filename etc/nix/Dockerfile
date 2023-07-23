# hadolint global ignore=DL3007,DL3059
FROM nixos/nix:latest

RUN cat <<EOF > /etc/nix/nix.conf
experimental-features = nix-command flakes
EOF

RUN nix-channel --update
RUN nix-env -u '*'
RUN nix-collect-garbage --delete-old

# https://www.cachix.org/
RUN nix-env -iA cachix -f https://cachix.org/api/v1/install
RUN cachix use devenv

# https://devenv.sh/
RUN nix-env -if https://install.devenv.sh/latest
