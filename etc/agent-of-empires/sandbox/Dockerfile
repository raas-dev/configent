# aoe-sandbox: Agent of Empires sandbox image (local, fixed opencode)
#
# Self-contained replacement for ghcr.io/agent-of-empires/aoe-sandbox:latest.
# Bundles every CLI/agent the upstream image ships plus a version-pinned,
# arch-correct opencode whose stdio ACP framing actually works with aoe
# 1.11.2's Rust `agent-client-protocol` client.
#
# Build:
#   docker build -t aoe-sandbox:local .
#   docker buildx build --platform linux/arm64,linux/amd64 \
#     -t ghcr.io/<you>/aoe-sandbox:local --push .
#
# Use:
#   [sandbox] default_image = "aoe-sandbox:local"
#   # or: aoe add --sandbox --sandbox-image aoe-sandbox:local /path/to/repo

FROM ubuntu:26.04

ENV DEBIAN_FRONTEND=noninteractive
ENV IS_SANDBOX=1

# --- base tooling --------------------------------------------------------
RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        curl \
        fzf \
        git \
        gnupg \
        jq \
        openssh-client \
        ripgrep \
        unzip \
    && rm -rf /var/lib/apt/lists/*

# --- runtimes ------------------------------------------------------------
# Node 22 (Codex CLI, npm-distributed adapters)
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

# --- Claude Code CLI (official installer) -------------------------------
RUN curl -fsSL https://claude.ai/install.sh | bash
ENV PATH="/root/.local/bin:${PATH}"

# --- OpenCode (Pinned, arch-correct, ACP-clean release) -----------------
# The upstream install script (`curl | bash https://opencode.ai/install`)
# is unreliable on aarch64 (Lima / Apple Silicon) and pinless, so it goes
# stale between image builds and re-introduces the broken 1.17.9 in the
# upstream image. Download the multi-arch release tarball instead.
ARG OPENCODE_VERSION=1.17.11
ARG TARGETARCH
RUN set -eux; \
    case "${TARGETARCH}" in \
        arm64|aarch64)  ARCH=arm64 ;; \
        amd64|x86_64)   ARCH=x64   ;; \
        *) echo "unsupported TARGETARCH=${TARGETARCH}" >&2; exit 1 ;; \
    esac; \
    curl -fsSL "https://github.com/sst/opencode/releases/download/v${OPENCODE_VERSION}/opencode-linux-${ARCH}.tar.gz" \
        -o /tmp/opencode.tar.gz; \
    mkdir -p /root/.opencode/bin; \
    tar -xzf /tmp/opencode.tar.gz -C /root/.opencode/bin/; \
    chmod +x /root/.opencode/bin/opencode; \
    rm /tmp/opencode.tar.gz; \
    /root/.opencode/bin/opencode --version
ENV PATH="/root/.opencode/bin:${PATH}"

# Move the real opencode binary aside so a wrapper can sit at the same path
# and ensure host-path symlinks exist before each spawn. aoe invokes
# `opencode acp` by name; the wrapper creates symlinks for any host-prefixed
# path recorded in /root/.local/share/opencode/opencode.db, then exec's
# the real binary. This covers the case where a session is created after
# container start and the db has a host path that the entrypoint did not
# see at boot time.
COPY opencode-wrapper.sh /aoe-sandbox-bin/opencode-wrapper.sh
RUN set -eux; \
    if [ ! -f /root/.opencode/bin/opencode-real ]; then \
        mv /root/.opencode/bin/opencode /root/.opencode/bin/opencode-real; \
    fi && \
    cp /aoe-sandbox-bin/opencode-wrapper.sh /root/.opencode/bin/opencode && \
    chmod +x /root/.opencode/bin/opencode /root/.opencode/bin/opencode-real

# --- other upstream agents ----------------------------------------------
# Hermes (NousResearch/hermes-agent) -- --skip-setup avoids the interactive wizard;
# FHS-style root install places `hermes` at /usr/local/bin.
RUN curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh \
    | bash -s -- --skip-setup

# Codex CLI (OpenAI)
RUN npm install -g @openai/codex

# Gemini CLI (Google)
RUN npm install -g @google/gemini-cli

# Antigravity CLI (Google)
RUN curl -fsSL https://antigravity.google/cli/install.sh | bash

# Mistral Vibe
RUN curl -LsSf https://mistral.ai/vibe/install.sh | bash
ENV PATH="/root/.vibe/bin:${PATH}"

# Cursor CLI
RUN curl -fsSL https://cursor.com/install | bash

# Copilot CLI (GitHub)
RUN npm install -g @github/copilot

# Pi (pi.dev) -- the pi-acp adapter below shells out to the `pi` binary this provides.
RUN npm install -g @earendil-works/pi-coding-agent

# Kiro CLI (AWS)
RUN curl -fsSL https://cli.kiro.dev/install | bash

# Qwen Code (Alibaba / QwenLM)
RUN npm install -g @qwen-code/qwen-code

# --- ACP adapters for structured view mode ------------------------------
# These must be in $PATH inside the container because aoE's `docker exec`
# invokes them by bare binary name (see src/acp/agent_registry.rs). If any
# are missing the agent exits 127 and ACP handshake times out.
RUN npm install -g \
        @agentclientprotocol/claude-agent-acp@^0.49.0 \
        @zed-industries/codex-acp \
        pi-acp

# --- credential mount points --------------------------------------------
RUN mkdir -p \
        /root/.claude \
        /root/.config/opencode \
        /root/.local/share/opencode \
        /root/.hermes \
        /root/.vibe \
        /root/.codex \
        /root/.gemini \
        /root/.gemini/antigravity-cli \
        /root/.cursor \
        /root/.copilot \
        /root/.pi \
        /root/.factory \
        /root/.kiro \
        /root/.qwen \
        /root/.ssh

# --- entrypoint + workspace + build-time sanity check ------------------
# opencode 1.17.11 calls realpath(cwd) during session/new; the host path
# does not exist inside the container. opencode also persists cwd in its
# sqlite db; if the db was written on a host with a different prefix,
# resumed sessions fail the same way. entrypoint.sh fixes both, deriving
# bind-mount basenames from /proc/self/mountinfo (no host path hardcoded).
COPY entrypoint.sh /aoe-sandbox-bin/entrypoint.sh
RUN mkdir -p /workspace && chmod +x /aoe-sandbox-bin/entrypoint.sh
WORKDIR /workspace
RUN set -eux; \
    printf '%s\n' \
      '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":1,"clientCapabilities":{},"clientInfo":{"name":"build-check","version":"0"}}}' \
      | timeout 5 /root/.opencode/bin/opencode acp \
      | grep -q '"agentInfo":{"name":"OpenCode"'
ENTRYPOINT ["/aoe-sandbox-bin/entrypoint.sh"]
CMD ["sleep", "infinity"]
