# checkov:skip=CKV_DOCKER_2: skip healthcheck
# checkov:skip=CKV_DOCKER_3: skip creating user
FROM python:3.11-slim-bookworm

ARG ADD_DEB_PACKAGES="gcc python3-dev"

# hadolint ignore=DL3008
RUN apt-get update && \
    apt-get install --yes --no-install-recommends ${ADD_DEB_PACKAGES} && \
    rm -rf /var/lib/apt/lists/*

ARG TZ="Europe/Helsinki"
RUN (cp /usr/share/zoneinfo/${TZ} /etc/localtime && \
    echo ${TZ} > /etc/timezone) || true

# hadolint ignore=DL3013
RUN pip install --no-cache-dir --upgrade pip setuptools wheel open-interpreter

COPY profiles /root/.config/open-interpreter/profiles

ENTRYPOINT ["interpreter"]
CMD ["--disable_telemetry"]
