#!/usr/bin/env python3
# Fetch Chrome Web Store CRXs for the pinned extension ids and unpack them
# versionless into ~/.config/chromium-extensions/<id>/ (outside the profile:
# Chromium's extension GC only scans its own profile dirs). The chromium
# wrappers mount these dirs with --load-extension. Chromium will not accept
# hand-registered user extensions (extension state must be MAC-signed in
# Secure Preferences, writable only by the browser itself or an interactive
# store install), so updates here = re-run this script.

import io
import os
import shutil
import struct
import sys
import urllib.request
import zipfile

IDS = [
    "ddkjiahejlhfcafbddmgiahcphecmpfh",  # uBlock Origin Lite
    "edibdbjcniadpccecjdfdjjppcpchdlm",  # I Still Don't Care About Cookies
]

# Store rejects unattended fetchers without a browser-like UA + prodversion.
UA = ("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36")
CRX_URL = ("https://clients2.google.com/service/update2/crx"
           "?response=redirect&prodversion=146.0.7680.177"
           "&acceptformat=crx2,crx3&x=id%3D{}%26uc")


def fetch_crx(extid):
    req = urllib.request.Request(CRX_URL.format(extid),
                                 headers={"User-Agent": UA})
    data = urllib.request.urlopen(req, timeout=60).read()
    if data[:4] != b"Cr24":
        raise ValueError(f"{extid}: not a CRX (magic={data[:4]!r})")
    version = struct.unpack("<I", data[4:8])[0]
    if version == 3:
        off = 12 + struct.unpack("<I", data[8:12])[0]
    else:  # crx2: version(4) pubkey-len(4) sig-len(4)
        pklen, siglen = struct.unpack("<II", data[8:16])
        off = 16 + pklen + siglen
    return zipfile.ZipFile(io.BytesIO(data[off:]))


def main():
    extroot = os.path.expanduser(sys.argv[1])
    os.makedirs(extroot, exist_ok=True)
    for extid in IDS:
        dest = os.path.join(extroot, extid)
        if os.path.isfile(os.path.join(dest, "manifest.json")):
            print(f"{extid}: present")
            continue
        tmp = dest + ".tmp"
        shutil.rmtree(tmp, ignore_errors=True)
        os.makedirs(tmp)
        fetch_crx(extid).extractall(tmp)
        shutil.rmtree(dest, ignore_errors=True)
        os.rename(tmp, dest)
        print(f"{extid}: installed")


if __name__ == "__main__":
    main()
