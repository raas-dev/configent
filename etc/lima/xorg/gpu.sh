#!/bin/sh
# Venus Vulkan driver for krunkit VMs (host GPU passthrough).
# Ubuntu Mesa's Venus driver lacks the 16KiB blob-alignment workaround for
# macOS hosts (libkrun/krunkit#114) — build patched driver from osy's patch.
# Built .so cached in /mnt/lima-provision to skip rebuild on VM recreate.

set -eux

# skip when host has no Venus (e.g. xorg-qemu variant reusing this template)
dmesg 2>/dev/null | grep -q '\[drm\] features:.*+context_init' || {
  echo 'virtio-gpu context_init absent — no Venus host support, skipping'
  exit 0
}

CACHE=/mnt/lima-provision/venus
MESATAG=26.0.8
PATCH_URL=https://gist.github.com/osy/a8f705050eed1c8421ad1a0855a8faa9/raw/0001-DO-NOT-MERGE-venus-hack-to-align-mappings-to-16KiB.patch
SRC_URL=http://archive.ubuntu.com/ubuntu/pool/main/m/mesa/mesa_${MESATAG}.orig.tar.xz

# distro driver + tools first: ICD json, vulkaninfo, fallback .so
apt-get update -qq
apt-get install -y --no-install-recommends mesa-vulkan-drivers vulkan-tools

DST=/usr/lib/aarch64-linux-gnu/libvulkan_virtio.so

if [ ! -f "$CACHE/libvulkan_virtio.so" ] || [ "$(cat "$CACHE/version" 2>/dev/null)" != "$(dpkg-query -W -f '${Version}' mesa-vulkan-drivers)" ]; then
  apt-get install -y --no-install-recommends \
    build-essential patch curl xz-utils tar \
    meson ninja-build pkg-config bison flex \
    libdrm-dev libexpat1-dev zlib1g-dev python3-mako python3-yaml

  cd /var/tmp
  curl -fsSLo mesa.tar.xz "$SRC_URL"
  rm -rf "mesa-${MESATAG}"
  tar -xf mesa.tar.xz
  cd "mesa-${MESATAG}"
  curl -fsSLo /tmp/venus-align.patch "$PATCH_URL"
  patch -p1 </tmp/venus-align.patch

  # Venus-only build: no GL, no llvm — ~2 min on 4 vCPU
  meson setup build \
    -Dvulkan-drivers=virtio \
    -Dgallium-drivers= \
    -Dglx=disabled -Degl=disabled -Dgbm=disabled -Dopengl=false \
    -Dplatforms= -Dtools= -Dllvm=disabled -Dshared-glapi=disabled
  ninja -C build

  install -m755 build/src/virtio/vulkan/libvulkan_virtio.so "$DST"

  mkdir -p "$CACHE"
  install -m644 build/src/virtio/vulkan/libvulkan_virtio.so "$CACHE/libvulkan_virtio.so"
  dpkg-query -W -f '${Version}' mesa-vulkan-drivers >"$CACHE/version"
else
  install -m755 "$CACHE/libvulkan_virtio.so" "$DST"
fi

# only the virtio ICD enumerates cleanly; others fail and kill the loader
grep -q '^VK_ICD_FILENAMES=' /etc/environment 2>/dev/null ||
  echo 'VK_ICD_FILENAMES=/usr/share/vulkan/icd.d/virtio_icd.json' >>/etc/environment

vulkaninfo --summary 2>/dev/null |
  grep -q 'Virtio-GPU Venus' ||
  {
    echo 'venus not detected — check dmesg for response 0x1200' >&2
    exit 1
  }
