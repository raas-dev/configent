# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.69.0](https://github.com/raas-dev/configent/compare/1.68.1...1.69.0) (2023-07-31)


### Features

* **bootstrap:** Populate .rclocal with git user info ([4beb84d](https://github.com/raas-dev/configent/commit/4beb84dcf68488e7e16ac546d62f46bb18e12545))


### Fixes

* **git:** Set name and email in envvars ([c29f5f3](https://github.com/raas-dev/configent/commit/c29f5f3fdcea6243360282fcb482ab1c6aff38c5))
* **sncli:** Remove user login settings ([bbc95c3](https://github.com/raas-dev/configent/commit/bbc95c39746ce2559ff969cb1e30c1ff8fe80971))

### [1.68.1](https://github.com/raas-dev/configent/compare/1.68.0...1.68.1) (2023-07-31)


### Fixes

* **aliases:** Add support for PORT for d and n ([06e99ac](https://github.com/raas-dev/configent/commit/06e99ac8215057fc74467df43ed703944a16041a))
* **aliases:** Improve d and n args ([8f41164](https://github.com/raas-dev/configent/commit/8f411641e3ec9ed90e39dfe12dcb5b12d106ee9e))
* **aliases:** Shorten docker/nerdctl cleanup aliases ([6220c7a](https://github.com/raas-dev/configent/commit/6220c7a2def755b713cfd3a69b9d49010eda5050))

## [1.68.0](https://github.com/raas-dev/configent/compare/1.67.8...1.68.0) (2023-07-30)


### Features

* **aliases:** Add trufflehog via nixery ([f228269](https://github.com/raas-dev/configent/commit/f228269cfd0dfa6c13ff7b39513174b1834e1072))


### Fixes

* **linux:** Set XDG environment variables ([d3bcd63](https://github.com/raas-dev/configent/commit/d3bcd637f06560d41d5eba07cfe9dda9119c8b41))

### [1.67.8](https://github.com/raas-dev/configent/compare/1.67.7...1.67.8) (2023-07-29)


### Fixes

* **hg:** Remove .hgrc ([c5d99da](https://github.com/raas-dev/configent/commit/c5d99da3ae13eeff50bae721920e5e71748df8ff))

### [1.67.7](https://github.com/raas-dev/configent/compare/1.67.6...1.67.7) (2023-07-29)


### Fixes

* **vscode:** Only spell check workspace files ([fbfd6db](https://github.com/raas-dev/configent/commit/fbfd6db29553cddd28356a71b5310465b5f0113e))

### [1.67.6](https://github.com/raas-dev/configent/compare/1.67.5...1.67.6) (2023-07-29)


### Fixes

* **aliases:** Alias r to common shell reloader ([77f64d7](https://github.com/raas-dev/configent/commit/77f64d752837f13c8f442cea8f33cdb9b9229ce4))
* **asdf:** Remove separate asdf install ([3769392](https://github.com/raas-dev/configent/commit/376939207d4cb3c8847cfc87a8cddfedea166174))
* **bash:** Fix HISTIGNORE to ignore r ([55b729a](https://github.com/raas-dev/configent/commit/55b729a0672a127f5f932933c409134a34b4178c))
* **install:** Do not rebase git repos with autostash ([ed8c29a](https://github.com/raas-dev/configent/commit/ed8c29a2693e2fa56aa6001e0d19b036b40ee881))
* **lima:** Do not mess with PATH on VM boot ([b3139c8](https://github.com/raas-dev/configent/commit/b3139c8d809b551d88ecb183c24dae1f60f226de))
* **shells:** Increase history size ([4e0cefc](https://github.com/raas-dev/configent/commit/4e0cefc009d8c736fdc056690c8cd8f6421f7677))
* **vim:** Put swap, backups and undo under ~/.vim ([b629319](https://github.com/raas-dev/configent/commit/b6293199ea8b8f99878ca6881ee80d6c4d0245a2))

### [1.67.5](https://github.com/raas-dev/configent/compare/1.67.4...1.67.5) (2023-07-29)


### Fixes

* **dotnet:** Fix path ([94c8020](https://github.com/raas-dev/configent/commit/94c8020e1eaf912a02a7bbee05d5a7b6ba24cd48))
* **iac:** Remove brew requirement ([906607e](https://github.com/raas-dev/configent/commit/906607eb13728b0a6a1dcd2de70f15911828be8c))

### [1.67.4](https://github.com/raas-dev/configent/compare/1.67.3...1.67.4) (2023-07-28)


### Fixes

* **python:** Fix pip install for asdf ([7d67b55](https://github.com/raas-dev/configent/commit/7d67b55c79815e154930d4999953173d6f280a23))

### [1.67.3](https://github.com/raas-dev/configent/compare/1.67.2...1.67.3) (2023-07-28)


### Fixes

* **asdf:** Remove error message plugin not installed ([07a62cf](https://github.com/raas-dev/configent/commit/07a62cf76589431cd96311f96b05152a117eedb7))
* **distros:** Postpone lnav installation after utils ([e433d84](https://github.com/raas-dev/configent/commit/e433d84800a9073fe5c7efe9fbe8eac53d4290d5))
* **install:** CASKS, FLATPAKS, SNAPS is false by default ([a02aad1](https://github.com/raas-dev/configent/commit/a02aad1fb1c8d8bb68a6feda5643669a9b4e5b46))
* **shells:** Change skip prompt to NONINTERACTIVE ([0ed1c41](https://github.com/raas-dev/configent/commit/0ed1c415e127f0bef0a9b55d9413a8c2221c4380))

### [1.67.2](https://github.com/raas-dev/configent/compare/1.67.1...1.67.2) (2023-07-28)


### Fixes

* **distros:** NO_FLATPAKS skips install flatpak ([dfa9531](https://github.com/raas-dev/configent/commit/dfa9531a6584759a48ff4cc10ea1512d8708f0bb))
* **install:** Allow passing variables to install.sh ([f5a3452](https://github.com/raas-dev/configent/commit/f5a34526bf883dd112fd8be0a372d1a96afce435))

### [1.67.1](https://github.com/raas-dev/configent/compare/1.67.0...1.67.1) (2023-07-28)


### Fixes

* **archlinux:** Fix git-extras installation ([21ec73b](https://github.com/raas-dev/configent/commit/21ec73b9cafb95361f5c6c62be1e15b8981eba5e))

## [1.67.0](https://github.com/raas-dev/configent/compare/1.66.2...1.67.0) (2023-07-28)


### Features

* **aliases:** Add pcalc via nixery ([5ae06f9](https://github.com/raas-dev/configent/commit/5ae06f9884bbe6b4000d069378a211095cafe29b))
* **aliases:** Add xplr via nix-shell ([4fe29aa](https://github.com/raas-dev/configent/commit/4fe29aabac22b1bea2f6174e0f960198ab36bf2e))
* **git:** Add git-extras ([087afe6](https://github.com/raas-dev/configent/commit/087afe6d4a44fdd96a88bae9dcbe342bc8f60f24))


### Performance

* **zsh:** Remove extra check for antidote ([7111cd7](https://github.com/raas-dev/configent/commit/7111cd7ba36b9fb3407df148a57437f9e3ea9b7a))


### Fixes

* **alpine:** Add testing apk repo as a tag ([0915e3d](https://github.com/raas-dev/configent/commit/0915e3daccdd198b97da5cb80146ca7ce853af41))
* **centos:** Add Epel in repositories ([2a3e650](https://github.com/raas-dev/configent/commit/2a3e650079563f02cacd4f62e1539e00a3e86e22))
* **docker:** Use curl --create-dirs over mkdir -p ([7db3140](https://github.com/raas-dev/configent/commit/7db3140ccfb5f1e00cbd958ebe36f82e8959288f))
* **git:** Remove aliases provided by git-extras ([112af41](https://github.com/raas-dev/configent/commit/112af41a565f3e0030a59d76b8657d8cab8cd220))
* **install:** Move lnav earlier to read cloud-init ([62250b3](https://github.com/raas-dev/configent/commit/62250b3452b5fdf92513db456e17201d6c6e77a1))
* **vscode:** Use Bash IDE over shellcheck extension ([23b408c](https://github.com/raas-dev/configent/commit/23b408cae4f34a6f34f4b5a7c6bb77265e63bb7c))
* **zsh:** Set ANTIDOTE_HOME to prevent cleanup ([3c26ac8](https://github.com/raas-dev/configent/commit/3c26ac854e2be2c5137efa1edfbe7b8b86bc71cb))

### [1.66.2](https://github.com/raas-dev/configent/compare/1.66.1...1.66.2) (2023-07-27)


### Fixes

* **aliases:** Confirm brewclear and codeclear ([f0d8e5e](https://github.com/raas-dev/configent/commit/f0d8e5e7f9898513bd95cec39c5aceb3b59e3dfa))
* **aliases:** Use nixery for read-only bins ([4226c29](https://github.com/raas-dev/configent/commit/4226c2917f62d17cc39fdb9b99b2435663421b3c))
* **packages:** Add gawk ([90b3b1d](https://github.com/raas-dev/configent/commit/90b3b1db6c41a67baec15b9a75bb2874c6cf85b4))
* **python:** Move pre-commit to venv scope ([977a964](https://github.com/raas-dev/configent/commit/977a964a599832c462a7a4c1f2c0b14797c314f9))
* **python:** Move ptpython to aliases ([ad40bc4](https://github.com/raas-dev/configent/commit/ad40bc4845309fee4d1cd14df9afb8283c70bfe4))
* **vscode:** Add Semgrep vscode extension ([c6f23d2](https://github.com/raas-dev/configent/commit/c6f23d2e7eec78ff175c6ae777edb47a0bba9245))

### [1.66.1](https://github.com/raas-dev/configent/compare/1.66.0...1.66.1) (2023-07-26)


### Fixes

* **brew:** Install azcopy and azd without brew ([311c017](https://github.com/raas-dev/configent/commit/311c01772bbd30ae875e8657b8cd151a3fb5a079))
* **rust:** Default stable ([08de6e0](https://github.com/raas-dev/configent/commit/08de6e0ac95f6c05b6dfa1a0feb02d8af42d2adf))

## [1.66.0](https://github.com/raas-dev/configent/compare/1.65.0...1.66.0) (2023-07-26)


### Features

* **linux:** Add ctags ([2272c77](https://github.com/raas-dev/configent/commit/2272c7733afa047ce5fabed694f4a680361722d2))


### Fixes

* **fonts:** Install fonts last ([e4ba9df](https://github.com/raas-dev/configent/commit/e4ba9df3db1e04654b5fdff4110974ca3a5a8201))
* **linux:** Add build deps for Ruby ([e3a998f](https://github.com/raas-dev/configent/commit/e3a998fee6a93ef30bb57936cd095326c947d4a5))
* **linux:** Compile-time deps ([3214f2b](https://github.com/raas-dev/configent/commit/3214f2b04a576ecfd74c56452055c12313b2a4ed))
* **nvim:** Fix symlinking neovim configs ([13e0277](https://github.com/raas-dev/configent/commit/13e027746a400ffb09dfbcb75456765635975f7f))

## [1.65.0](https://github.com/raas-dev/configent/compare/1.64.0...1.65.0) (2023-07-26)


### Features

* **linux:** Add git-lfs ([0038a6b](https://github.com/raas-dev/configent/commit/0038a6bd10fd921ff29a4f2a4ee4e5937a78662d))
* **linux:** Add neovim ([7a1c9e6](https://github.com/raas-dev/configent/commit/7a1c9e6e3798967b9683bf59ccaaeb1ed4a53724))
* **linux:** Add tmux ([f5cd2e3](https://github.com/raas-dev/configent/commit/f5cd2e332af70d12a6d576fc53b496a884f288a5))


### Fixes

* **iac:** Move tfsec from appsec to iac ([0b0942b](https://github.com/raas-dev/configent/commit/0b0942beddd22110a98c7e1632583cb4d733b0c3))
* **trans:** Add trans as script, remove brew ([69b11b4](https://github.com/raas-dev/configent/commit/69b11b4ac40e9d759d71ac53a2f06aefd8122a5b))

## [1.64.0](https://github.com/raas-dev/configent/compare/1.63.0...1.64.0) (2023-07-26)


### Features

* **asdf:** Prefer asdf over brew for most tools ([3f1beb1](https://github.com/raas-dev/configent/commit/3f1beb1af84bd7931af5b0e7a000b8615355de52))


### Fixes

* **asdf:** Remove plugin update on language install ([6f6defb](https://github.com/raas-dev/configent/commit/6f6defbd34bbc3eb5cf078bb34fe9812972124d1))
* **dotnet:** Opt out telemetry ([c67cc83](https://github.com/raas-dev/configent/commit/c67cc8332b0805c2a1fff8a29aad652f818a3496))
* **go:** Export asdf go mod support before install ([a27f743](https://github.com/raas-dev/configent/commit/a27f743be046a0545e042d70e2ad19a7488d37ab))
* **haskell:** Remove cabal packages over asdf ([1139cf7](https://github.com/raas-dev/configent/commit/1139cf72bc7834285dfc1e5f855c2b64e7f90827))

## [1.63.0](https://github.com/raas-dev/configent/compare/1.62.0...1.63.0) (2023-07-25)


### Features

* **asdf:** Move language version managers to asdf ([70a2de9](https://github.com/raas-dev/configent/commit/70a2de9bdc1d8133c8dc0d0f2c53480315bfd973))


### Fixes

* **asdf:** Remove extraneous update ([550ae66](https://github.com/raas-dev/configent/commit/550ae667761186eb578dad0c5d56b2d3e9645c18))
* **dircolors:** Add .jsx and .tsx ([f87cb99](https://github.com/raas-dev/configent/commit/f87cb9989aae9a4d60b47d1c736c516c08d8f991))
* **dircolors:** Add .ts ([8aa9991](https://github.com/raas-dev/configent/commit/8aa9991b94382aa3028dd460f3ad3c74884ffd20))
* **haskell:** Fix loading ghcup env ([dc9dc27](https://github.com/raas-dev/configent/commit/dc9dc275cffb641cb0f52ee83863167fc75cb487))
* **haskell:** Install cabal packages ([4088ab5](https://github.com/raas-dev/configent/commit/4088ab522d9399142a26202d54c85bb69590cd6e))
* **profile:** Add CARGO_HOME for Rust ([a46b41c](https://github.com/raas-dev/configent/commit/a46b41cba944face0caeec892a62462b2d3781e5))
* **rust:** Remove unused CARGO_HOME ([e8d28a6](https://github.com/raas-dev/configent/commit/e8d28a6fb648af5ee0c7311ee17d178b8641a350))

## [1.62.0](https://github.com/raas-dev/configent/compare/1.61.1...1.62.0) (2023-07-25)


### Features

* **asdf:** Add dotnet ([c978909](https://github.com/raas-dev/configent/commit/c9789098e943baca2347a7311c77061008ebd487))
* **asdf:** Add support for asdf ([8d04c9c](https://github.com/raas-dev/configent/commit/8d04c9cc13f4c050d6247d18e33c9343e37bccb0))
* **dotnet:** Install dotnet via asdf ([fd5f554](https://github.com/raas-dev/configent/commit/fd5f554f47db09f1fb8f6912daae63b3715dc47a))


### Fixes

* **asdf:** Update asdf to latest stable ([d673585](https://github.com/raas-dev/configent/commit/d6735856b6952fe5c26d0bf720962d554a659bbb))
* **java:** Fix sdkman-init.sh shell to bash ([64e2f76](https://github.com/raas-dev/configent/commit/64e2f76de9cd3068f7deaccd50151d3f1fb32567))
* **vscode:** Disable IntelliCode override ([61070aa](https://github.com/raas-dev/configent/commit/61070aa7bb3ddc4e101e17ef5db3a61d31a66f49))
* **zsh:** Add -z to autoload compinit ([69a068b](https://github.com/raas-dev/configent/commit/69a068b7394110f9be4bae8ca9619a2efc7e2e46))

### [1.61.1](https://github.com/raas-dev/configent/compare/1.61.0...1.61.1) (2023-07-24)


### Fixes

* **d:** Add support for passing PORT ([387bf9c](https://github.com/raas-dev/configent/commit/387bf9c30837aecc210d0dbfba540fdf2a596cc8))
* **nixd:** Add support for passing PORT ([204abdd](https://github.com/raas-dev/configent/commit/204abddb3641795263711502c6554a343758a6c5))
* **nixd:** Fix passing PORT if not set ([0ff833e](https://github.com/raas-dev/configent/commit/0ff833eaa2ed23517579b737b8e97ef4fde63528))

## [1.61.0](https://github.com/raas-dev/configent/compare/1.60.0...1.61.0) (2023-07-24)


### Features

* **aliases:** Add difftastic via nix-shell ([bea7042](https://github.com/raas-dev/configent/commit/bea70423a2e5972e92a77cab3a745502fce6b033))
* **aliases:** Add gping via nixery ([46d14c2](https://github.com/raas-dev/configent/commit/46d14c2e3c82ff5aeffcb1e8db08fe8b560cfaab))
* **aliases:** Add majestic via npx ([398d73c](https://github.com/raas-dev/configent/commit/398d73c22376f2e53cf3c8f993e76e292f9fbadb))


### Fixes

* **aliases:** Add miniserve via nix-shell ([7c1b3f6](https://github.com/raas-dev/configent/commit/7c1b3f637c16e5c7f9f453107feee239c6b58a88))
* **aliases:** Fix pwsh entrypoint ([4fb1ee6](https://github.com/raas-dev/configent/commit/4fb1ee6121bc25bdc0ab5e8e7efcf6325d6a0f55))
* **bin:** Remove cht.sh over tldr ([d9558f6](https://github.com/raas-dev/configent/commit/d9558f6fb01c8d269b71419dc7885567dc806d8b))
* **git:** Remove side-by-side diff ([c51ad83](https://github.com/raas-dev/configent/commit/c51ad83f951e42817528abf6dfae2a4f5bb8f392))
* **nixd:** Fix check if container is running ([242a8e6](https://github.com/raas-dev/configent/commit/242a8e6aad5dde631112e6993ebcac3bf0f3a435))
* **nixd:** Fix check if container is running ([55f38bf](https://github.com/raas-dev/configent/commit/55f38bf1c2db99939bbbeb13647825c57153567b))
* **nixd:** Fix container capabilities ([34654bf](https://github.com/raas-dev/configent/commit/34654bffc334d64368b2281dc7b753702959c027))
* **nix:** Do not upgrade on image build ([fdb27da](https://github.com/raas-dev/configent/commit/fdb27da570b7bca3d0a1a3c5c7dab4238a09bf78))
* **nixd:** Run in containerd ([5f0fe10](https://github.com/raas-dev/configent/commit/5f0fe103b95ce53415dedbd71e37a7abf3d2a1b7))
* **sql:** Remove install_sql, move usql to nix ([283b69b](https://github.com/raas-dev/configent/commit/283b69bca7be5693a0159a277accdeb9e19ed97f))

## [1.60.0](https://github.com/raas-dev/configent/compare/1.59.2...1.60.0) (2023-07-23)


### Features

* **aliases:** Add devenv via Nix ([284a93b](https://github.com/raas-dev/configent/commit/284a93bc8f531c6d44d563101ca3e4a8f15337b0))


### Fixes

* **aliases:** Add shell meta-package option for n ([1c4a8da](https://github.com/raas-dev/configent/commit/1c4a8da3185dddb123088a2ed89fbf3303f662fe))
* **aliases:** Fix nixd image name ([cf34f5b](https://github.com/raas-dev/configent/commit/cf34f5bb98a8cf47358d11bd5f0eb39a87d1cbec))
* **aliases:** Remove nix- aliases over nixd and n ([ec239d9](https://github.com/raas-dev/configent/commit/ec239d9533a54cc7bc2508c4389e5294f789d74b))
* **aliases:** Simplify nixery arguments ([7dda829](https://github.com/raas-dev/configent/commit/7dda829bbb55da1b81774287a100d63961c1c321))

### [1.59.2](https://github.com/raas-dev/configent/compare/1.59.1...1.59.2) (2023-07-22)


### Fixes

* **nixd:** Container naming per bin and per dir ([0c37d65](https://github.com/raas-dev/configent/commit/0c37d65b8c351a8177ed0f30209554a9d1adaad9))
* **nixd:** Name container per dir ([0cf2bc6](https://github.com/raas-dev/configent/commit/0cf2bc64bc8178246fa18214a90beb1fa47f11c3))

### [1.59.1](https://github.com/raas-dev/configent/compare/1.59.0...1.59.1) (2023-07-22)


### Fixes

* **aliases:** Make nixery environments read-only ([6f7f355](https://github.com/raas-dev/configent/commit/6f7f355966350be46821459ef5e0526933403510))
* **aliases:** Require nixery command always ([7cd97b6](https://github.com/raas-dev/configent/commit/7cd97b6c3c02276bc3ccbfaef45616685d9f0d62))

## [1.59.0](https://github.com/raas-dev/configent/compare/1.58.4...1.59.0) (2023-07-22)


### Features

* **aliases:** Make n() run nix-shell in docker ([11487f5](https://github.com/raas-dev/configent/commit/11487f52293a97cda25a4f03bfc1e33d3ba43fe7))


### Fixes

* **aliases:** Add ns() for nix-shell ([78eef30](https://github.com/raas-dev/configent/commit/78eef30497598c507aa63745b73ec8ac4461f1a1))
* **aliases:** Build image on create only ([9e1da78](https://github.com/raas-dev/configent/commit/9e1da7821f498d518387e43cd5e2753dc0ee5dd0))
* **aliases:** Infer nixery default command name ([00602f1](https://github.com/raas-dev/configent/commit/00602f1098b1b723d51e6f85caf348305b1e034b))
* **aliases:** Name nixd container by command ([caba14a](https://github.com/raas-dev/configent/commit/caba14a3c30423a4381b648526c8db714d468b1b))
* **nix:** Add nix Dockerfile ([b3a5675](https://github.com/raas-dev/configent/commit/b3a5675d91e9afc0e6730d4f95b4c1a0f538dc8b))
* **nix:** Use locally built image for nixd ([ed110ff](https://github.com/raas-dev/configent/commit/ed110ffafb774a9781ccf5233be98b1ebfb888d9))
* **topgrade:** Args ([d2ec25c](https://github.com/raas-dev/configent/commit/d2ec25c8181d5e55d0714a1adef9962d33ceffda))
* **topgrade:** Update casks ([f5fd210](https://github.com/raas-dev/configent/commit/f5fd21046c6be99cf96ab87b6e04e9718b05f432))

### [1.58.4](https://github.com/raas-dev/configent/compare/1.58.3...1.58.4) (2023-07-21)


### Fixes

* **aliases:** Fix quotes in nix-shell ([0acd1dd](https://github.com/raas-dev/configent/commit/0acd1dd7737a2be3abd7673d4dad12e6370a2de0))
* **aliases:** Quote docker and nerdctl args ([26136a8](https://github.com/raas-dev/configent/commit/26136a84bc113f7e0bc1f68aa266ba0d3ade0a11))

### [1.58.3](https://github.com/raas-dev/configent/compare/1.58.2...1.58.3) (2023-07-20)


### Fixes

* **docker:** Add support for system-wide plugins ([4c88008](https://github.com/raas-dev/configent/commit/4c88008d3c3227d3713a22f98be46aaa10797678))

### [1.58.2](https://github.com/raas-dev/configent/compare/1.58.1...1.58.2) (2023-07-20)


### Fixes

* **aliases:** Add cap-drop ALL to nix ([fb43a53](https://github.com/raas-dev/configent/commit/fb43a534bd466358e3aa0bcf8907a7617c5770ff))
* **aliases:** Add default docker cap to nix ([08d0150](https://github.com/raas-dev/configent/commit/08d0150685133e585a96008d13700925d7b71611))
* **aliases:** Remove pwsh container name ([8f07749](https://github.com/raas-dev/configent/commit/8f07749e11bb3db637b130f6b8024b92144180d6))

### [1.58.1](https://github.com/raas-dev/configent/compare/1.58.0...1.58.1) (2023-07-20)


### Fixes

* **aliases:** Add d() support for entrypoint ([3bd6bb0](https://github.com/raas-dev/configent/commit/3bd6bb02c51ee7523b1468bd339ddc4c1851fd72))

## [1.58.0](https://github.com/raas-dev/configent/compare/1.57.4...1.58.0) (2023-07-18)


### Features

* **aliases:** Make d() build images with nixpacks ([05fa5f4](https://github.com/raas-dev/configent/commit/05fa5f40865263018def0a84dd03979c5c9ddce8))


### Fixes

* **aliases:** Add nixpacks ([ba45acd](https://github.com/raas-dev/configent/commit/ba45acdd206166e8f5c0e981999bc7383a564a43))

### [1.57.4](https://github.com/raas-dev/configent/compare/1.57.3...1.57.4) (2023-07-18)


### Fixes

* **iac:** Add cloudflared ([10d5640](https://github.com/raas-dev/configent/commit/10d56404086816f88b6ed13b8d3b747914bbf94c))
* **iac:** Fix cloudflared formula name ([d61551d](https://github.com/raas-dev/configent/commit/d61551dcf879915b9903a1044d9f56c318c6a4d2))
* **linux:** Add package deps ([7a0c32d](https://github.com/raas-dev/configent/commit/7a0c32dbff89bf0cdce36089473a2052afc39600))
* **rust:** Remove bore-cli ([d514457](https://github.com/raas-dev/configent/commit/d51445723a3f2a8f2e644c08e855a9ad49cb77d1))

### [1.57.3](https://github.com/raas-dev/configent/compare/1.57.2...1.57.3) (2023-07-17)


### Fixes

* **aliases:** Swap powershell and miniserve runtime ([2889ce5](https://github.com/raas-dev/configent/commit/2889ce5bba373c2f0b4ac5686cd8bbddee9abb9c))
* **iac:** Add krew and kubectx via krew ([aa47359](https://github.com/raas-dev/configent/commit/aa47359b6b85e85f7a5a2a13b286b720aa796d84))

### [1.57.2](https://github.com/raas-dev/configent/compare/1.57.1...1.57.2) (2023-07-17)


### Fixes

* **aliases:** Add google-cloud-sdk via nixery ([4f05677](https://github.com/raas-dev/configent/commit/4f05677f58eccee4fbbabdff57910e4628738c48))
* **aliases:** Change miniserve port ([cef86d0](https://github.com/raas-dev/configent/commit/cef86d0b358c8ef2e7c6ead757bff25d864d4a40))
* **aliases:** Remove dufs over miniserve ([b923268](https://github.com/raas-dev/configent/commit/b9232687db8d3b970bfac4418bdf34808fe51753))

### [1.57.1](https://github.com/raas-dev/configent/compare/1.57.0...1.57.1) (2023-07-15)


### Fixes

* **aliases:** Add miniserve ([1dd8fae](https://github.com/raas-dev/configent/commit/1dd8faef332210e423a242ade9f4cb3f5c088b44))
* **aliases:** Add nerdctl args for prune ([b863007](https://github.com/raas-dev/configent/commit/b863007eb506ff8c2beee4394e12539a14366c41))
* **aliases:** Remove netdata ([fbb1ba8](https://github.com/raas-dev/configent/commit/fbb1ba8e70705276998475ea91aa1ef435f75e21))

## [1.57.0](https://github.com/raas-dev/configent/compare/1.56.0...1.57.0) (2023-07-14)


### Features

* **linux:** Move from snaps to user-wide flatpaks ([ed13bf8](https://github.com/raas-dev/configent/commit/ed13bf8c713aa7d83cfde5c094204251cfa9ebcd))


### Fixes

* **inputrc:** Improve completion for bash ([edf38ec](https://github.com/raas-dev/configent/commit/edf38ec84593d7ef6eb85e87f8a514e8a7cacfb8))

## [1.56.0](https://github.com/raas-dev/configent/compare/1.55.0...1.56.0) (2023-07-14)


### Features

* **flatpak:** Add initial support ([db4a957](https://github.com/raas-dev/configent/commit/db4a957f5552ae4d5359c088d27b65b8f33dcf0b))


### Fixes

* **apps:** Remove spotify ([b3b5aa3](https://github.com/raas-dev/configent/commit/b3b5aa3ea5c0e9a17985eb8a539039200da8b8a2))
* **profile:** Add conditional XDG_DATA_DIRS ([5a1d702](https://github.com/raas-dev/configent/commit/5a1d70284256002ebe31fc8c4d9d51f0905d6316))
* **profile:** Add XDG_DATA_DIRS ([31ff1fa](https://github.com/raas-dev/configent/commit/31ff1faaba143d7322335f7abb68e721fa650cc9))
* **profile:** export XDG_ vars on Linux distros only ([d6810ce](https://github.com/raas-dev/configent/commit/d6810ceaa2ab5418fa4de3e3ef27e8fd9b639602))
* **profile:** export XDG_DATA_HOME ([0c3f4fe](https://github.com/raas-dev/configent/commit/0c3f4fe5bf1a88f23d159ab6859ceb5bc9849b8f))
* **profile:** Fix colon in XDG_DATA_DIRS ([f4614f4](https://github.com/raas-dev/configent/commit/f4614f428dd6e76003e8be3ec50416dcc5dbd4f1))

## [1.55.0](https://github.com/raas-dev/configent/compare/1.54.4...1.55.0) (2023-07-14)


### Features

* **linux:** Install flatpak ([70498b5](https://github.com/raas-dev/configent/commit/70498b5f5a5e3879ab04582bf266beb74f4f9286))
* **powershell:** Move pwsh to a container only ([4dab4d0](https://github.com/raas-dev/configent/commit/4dab4d0a9fb085c9e75497f0cf836082004edc92))


### Fixes

* **alpine:** Add musl-locales ([6262479](https://github.com/raas-dev/configent/commit/62624796458402d16b07c673d3d2275fdecbafea))
* **alpine:** Add perl for fzf ([fd3b4c8](https://github.com/raas-dev/configent/commit/fd3b4c8921e0106d9d81427ae96f63f14109a10c))
* **alpine:** Install less ([3cde727](https://github.com/raas-dev/configent/commit/3cde727bce11783e3f43a6f5f094eda2bc9f057e))
* **alpine:** Install util-linux ([5ce0a51](https://github.com/raas-dev/configent/commit/5ce0a51d3436cdc78aaf3eda60b3e521831d4249))
* **alpine:** Reverse lima's ash-as-bash hack ([6861a75](https://github.com/raas-dev/configent/commit/6861a75798175ea38a0dde0482ca07d698f69787))

### [1.54.4](https://github.com/raas-dev/configent/compare/1.54.3...1.54.4) (2023-07-14)


### Fixes

* **nerdctl:** Add check for lima installed ([48d1f2f](https://github.com/raas-dev/configent/commit/48d1f2fe49cc9f3aa7e7c634c1e62150ec16cc60))
* **nerdctl:** Add support for user installed nerdctl ([cdffedb](https://github.com/raas-dev/configent/commit/cdffedb9123e2e06f0802dfd340ed48c36b5d301))

### [1.54.3](https://github.com/raas-dev/configent/compare/1.54.2...1.54.3) (2023-07-14)


### Fixes

* **lima:** Remove forwarding docker socket to host ([5f64877](https://github.com/raas-dev/configent/commit/5f648778c34d0ac571617067b7ffb9b641a3bf93))
* **podman:** Simplify podman shim ([9732bda](https://github.com/raas-dev/configent/commit/9732bda797ebe8adbe87ec3842a0c2e038c3b93c))

### [1.54.2](https://github.com/raas-dev/configent/compare/1.54.1...1.54.2) (2023-07-14)


### Fixes

* **docker:** Remove support for macOS docker cli ([b72ae52](https://github.com/raas-dev/configent/commit/b72ae5205c7649885b698a3606f82b18b262df78))
* **docker:** Set XDG_RUNTIME_DIR before DOCKER_HOST ([6f1e2bc](https://github.com/raas-dev/configent/commit/6f1e2bcb901435101bae905da19680eac9da9c74))
* **nerdctl:** Only set XDG_RUNTIME_DIR if empty ([c804c95](https://github.com/raas-dev/configent/commit/c804c95b0141673e1fc2e9a1cfb2d16324f5ecf2))
* **nerdctl:** Set XDG_RUNTIME_DIR earlier ([510111c](https://github.com/raas-dev/configent/commit/510111c97673faf5862de08f731130fcbf8821f1))
* **shells:** Echo after default shell is set ([8938df6](https://github.com/raas-dev/configent/commit/8938df6261be2dd000e16602309dc3a70935b6de))

### [1.54.1](https://github.com/raas-dev/configent/compare/1.54.0...1.54.1) (2023-07-14)


### Fixes

* **zsh:** Install antidote plugins always ([2ea3fa0](https://github.com/raas-dev/configent/commit/2ea3fa071d92526d2352d96969aed82b7e699793))

## [1.54.0](https://github.com/raas-dev/configent/compare/1.53.3...1.54.0) (2023-07-14)


### Features

* **zsh:** Install system-wide zsh on all distros ([434ac13](https://github.com/raas-dev/configent/commit/434ac13c12626ea0f98c01497d01bed339b5c83e))


### Fixes

* **alpine:** Add vim ([2073c1c](https://github.com/raas-dev/configent/commit/2073c1c050f822a636e6f73ab13a01ac2f64a5e8))
* **alpine:** Fix docker runlevel on boot ([2d87fd9](https://github.com/raas-dev/configent/commit/2d87fd9788d57035e4dc77c81143f2b861c182ba))
* **bash:** Fix detection of system-wide bash ([748c32d](https://github.com/raas-dev/configent/commit/748c32de5a44922927436a5e17e702faba7a0e1b))
* **installer:** Install coreutils on Alpine Linux ([86984d1](https://github.com/raas-dev/configent/commit/86984d186ed24bf9ca8e5ec193025fbe17d49b1a))
* **nvm:** export NVM_DIR for .cache ([87c318c](https://github.com/raas-dev/configent/commit/87c318c29d4fcdb1da5a9d32f6f55117434dbc0a))
* **shells:** Add setting system-wide as default ([1d7e1a5](https://github.com/raas-dev/configent/commit/1d7e1a5af098ccd40271063b16e56310a2a6e064))
* **zsh:** Fix detection of system-wide zsh ([bb656b8](https://github.com/raas-dev/configent/commit/bb656b8d94a70fcfca8df682393f9b6657302d6d))

### [1.53.3](https://github.com/raas-dev/configent/compare/1.53.2...1.53.3) (2023-07-13)


### Fixes

* **install:** Fix package manager error message ([8cb2340](https://github.com/raas-dev/configent/commit/8cb234091031fb34b0c94875e22df15dae5eb4cf))
* **python:** Install xz-devel for pyenv ([5248b5f](https://github.com/raas-dev/configent/commit/5248b5f42a716f72d3c5ea5018cd404faf76e332))

### [1.53.2](https://github.com/raas-dev/configent/compare/1.53.1...1.53.2) (2023-07-12)


### Fixes

* **debian:** Install locales asap ([b20da04](https://github.com/raas-dev/configent/commit/b20da04945af1b3b7e306cfc0faeeded066d692c))
* **yum:** Use dnf over yum ([068521f](https://github.com/raas-dev/configent/commit/068521f4f8a3b52832816ea5ec59d5561d17a45d))

### [1.53.1](https://github.com/raas-dev/configent/compare/1.53.0...1.53.1) (2023-07-11)


### Fixes

* **alpine:** Remove unnecessary var from sudo ([a4d6474](https://github.com/raas-dev/configent/commit/a4d6474b636ddac420b9be2c74d370291504577d))
* **containerd:** Run nerdctl on Debian over CentOS ([314a0af](https://github.com/raas-dev/configent/commit/314a0af7915252172f31fa89fd80866c228cf8a7))

## [1.53.0](https://github.com/raas-dev/configent/compare/1.52.1...1.53.0) (2023-07-11)


### Features

* **lima:** Add openSUSE Leap ([80126d2](https://github.com/raas-dev/configent/commit/80126d2d5eb4d3aefbd33d5e676759ec7311ba69))

### [1.52.1](https://github.com/raas-dev/configent/compare/1.52.0...1.52.1) (2023-07-11)


### Fixes

* **lima:** Resolve host.docker.internal ([5daa6fd](https://github.com/raas-dev/configent/commit/5daa6fd62a2781ef68061ea4275affb899f37174))

## [1.52.0](https://github.com/raas-dev/configent/compare/1.51.2...1.52.0) (2023-07-11)


### Features

* **aliases:** Add psql and mysql cli via nixery ([85ccb7e](https://github.com/raas-dev/configent/commit/85ccb7e867297321795a5116ed645b43d1dd0f8d))
* **lima:** Combine VMs centos and rancher ([9cbe8c4](https://github.com/raas-dev/configent/commit/9cbe8c4fc7a2efab0fe765687fa23c9425f60d8f))
* **lima:** Combine VMs fedora and podman ([df469f3](https://github.com/raas-dev/configent/commit/df469f3fead3f7b463c9183b3a807b4cf29cd87e))
* **lima:** Move podman to use Fedora over Ubuntu ([f8b6903](https://github.com/raas-dev/configent/commit/f8b6903191dc497c16813ab3c33fa9cb51f8012e))
* **podman:** Allow connecting to remote podman ([da02d13](https://github.com/raas-dev/configent/commit/da02d13940e39dcde6258727d2a36fad8be29714))


### Fixes

* **aliases:** Make nixery use nerdctl on centos ([56c74d6](https://github.com/raas-dev/configent/commit/56c74d6e0c37fe10f5862f9a4ebfdc3eb68b987c))
* **alpine:** Remove support for brew ([734c147](https://github.com/raas-dev/configent/commit/734c147e9483fabd2cdfa267e6aea2049bfc1575))
* **centos:** Get kubecoonfig ([654fa8b](https://github.com/raas-dev/configent/commit/654fa8b8669192b0f3e0e645afa0cd5d5f88bcc8))
* **lima:** Fix fedora host.docker.internal ([a1822dd](https://github.com/raas-dev/configent/commit/a1822ddd35b8249050c942a3d8260ce15903260e))
* **lima:** Use hostResolver hosts over /etc/hosts ([529908f](https://github.com/raas-dev/configent/commit/529908f16110a20b2605b34eb2cc7de725e82251))
* **macos:** Remove cask install spotify ([eb5e86a](https://github.com/raas-dev/configent/commit/eb5e86a9262e6bedaa93455d07bf1295590789f4))
* **ruby:** Remove installing rbenv by default ([6d64557](https://github.com/raas-dev/configent/commit/6d645572b94a9323c3bd5b74e8018b002763efbd))
* **yum:** Add lsof ([1215a2e](https://github.com/raas-dev/configent/commit/1215a2e725589e0373e7225daac66cfb9e9088c8))

### [1.51.2](https://github.com/raas-dev/configent/compare/1.51.1...1.51.2) (2023-07-10)


### Fixes

* **vim:** Remove deprecated language plugins ([e202122](https://github.com/raas-dev/configent/commit/e20212291ef9dacc0ba808a2bc258b8de0213a99))
* **vscode:** Export currently installed extensions ([76af97d](https://github.com/raas-dev/configent/commit/76af97d2eee82bdc0e2677d52c725d6f6991056a))
* **vscode:** Remove extension for isort, add ruff ([798a546](https://github.com/raas-dev/configent/commit/798a546a6c6f6e1638b25dd60ec6aa43eac5e0ad))

### [1.51.1](https://github.com/raas-dev/configent/compare/1.51.0...1.51.1) (2023-07-10)


### Fixes

* **aliases:** Add sgpt system role ([27fa203](https://github.com/raas-dev/configent/commit/27fa203946b1a9e89f6171e4c2e128a8d74e56ed))
* **aliases:** Remove jetpack devbox ([80be8b9](https://github.com/raas-dev/configent/commit/80be8b963b12f0d7dfa5d2c34906b2aa8b9fd062))
* **aliases:** Use gpt-4 for sgpt chat and code ([16be4d9](https://github.com/raas-dev/configent/commit/16be4d9eaadd43a0d6136e2af3e052a5ba20de4f))

## [1.51.0](https://github.com/raas-dev/configent/compare/1.50.0...1.51.0) (2023-07-10)


### Features

* **aliases:** Make up and dup use topgrade ([8a39a35](https://github.com/raas-dev/configent/commit/8a39a35cefce50ca37624cdc8e4aa5aee7175170))


### Fixes

* **aliases:** Topgrade disabled package managers ([79c9ecc](https://github.com/raas-dev/configent/commit/79c9ecc4146595da8081d667d84e85cd19974652))

## [1.50.0](https://github.com/raas-dev/configent/compare/1.49.0...1.50.0) (2023-07-09)


### Features

* **lima:** Update Linux distros images ([9eba701](https://github.com/raas-dev/configent/commit/9eba701ef4b9885ece92d6450b5fb93644a6d295))
* **rust:** Add topgrade ([a0f6ed3](https://github.com/raas-dev/configent/commit/a0f6ed3a67fc897b0ae2290d47034c66535f888f))


### Fixes

* **aliases:** Add 'tup' for experimental upgrade all ([03f581c](https://github.com/raas-dev/configent/commit/03f581c2ff4e439f939ffd6479b874c63cc136ae))
* **rust:** Add cargo-cache for cleanup ([f977da5](https://github.com/raas-dev/configent/commit/f977da5b01406464fc3e18a3e5d269bbda31b91e))
* **yum:** Install locales for en_US.UTF-8 ([d4a55fe](https://github.com/raas-dev/configent/commit/d4a55febe83e17a91af592ca3b3f12e2c7cff607))

## [1.49.0](https://github.com/raas-dev/configent/compare/1.48.0...1.49.0) (2023-07-09)


### Features

* **aliases:** Add fq via nixery ([827b7d2](https://github.com/raas-dev/configent/commit/827b7d2d481dc3534dbaf6d026639116513bdaaf))
* **aliases:** Add grex via nixery ([4d10428](https://github.com/raas-dev/configent/commit/4d10428097796234227700adf051445bc18f449d))
* **aliases:** Add hexyl via nixery ([2cf3fbc](https://github.com/raas-dev/configent/commit/2cf3fbc91deea215718043430d344eb18cf7c8aa))
* **aliases:** Add tokei via nixery ([0dda418](https://github.com/raas-dev/configent/commit/0dda418992b27ce017fccd997d0bd19ae0871e7f))
* **aliases:** Improve e() and remove using unar ([8e53b0c](https://github.com/raas-dev/configent/commit/8e53b0ced578760608a68f6c5ae57fa8580bc047))
* **aliases:** Use pwd as volume for nixery ([280f4cf](https://github.com/raas-dev/configent/commit/280f4cfc805c275bcb0ff676bb4642b8e5d9508a))
* **go:** Add arc v3 ([fe03054](https://github.com/raas-dev/configent/commit/fe0305498b11a26a9f7d2497e4c68515d6f5d8a5))
* **rust:** Add cargo install-update ([45b9d3c](https://github.com/raas-dev/configent/commit/45b9d3c495b30678e83257cc94350fd3ec31ea45))


### Fixes

* **utils:** Remove unar ([93962ae](https://github.com/raas-dev/configent/commit/93962aed65deac47ac16ad9997e8b5b0e8761af7))

## [1.48.0](https://github.com/raas-dev/configent/compare/1.47.1...1.48.0) (2023-07-08)


### Features

* **apps:** Install cask spotify on macOS ([6cd2455](https://github.com/raas-dev/configent/commit/6cd24558bce474b362e604ed3d5e69fd4798dd90))
* **macos:** Install casks nordvpn and ukelele ([adfee54](https://github.com/raas-dev/configent/commit/adfee5414ea15ed18faf3b2bf53c169c867759da))
* **rust:** Move terminal utils from brew to rust ([3be55a1](https://github.com/raas-dev/configent/commit/3be55a11c42730b6d753ebb22e7751f9a99934d9))


### Documentation

* **README:** Fix install order ([07f96a4](https://github.com/raas-dev/configent/commit/07f96a4112e23e77c0b97264c5b0739fe1dcecf1))
* **README:** Fix language versions ([5e66744](https://github.com/raas-dev/configent/commit/5e66744ebb79c28d4928a5b48a4f36b2daaf62ea))


### Fixes

* **snap:** Add optional Spotify ([882c08e](https://github.com/raas-dev/configent/commit/882c08e64a8372459681d82a0eb906318d854905))

### [1.47.1](https://github.com/raas-dev/configent/compare/1.47.0...1.47.1) (2023-07-08)


### Fixes

* **rust:** Prefer cargo install binaries ([ed0cfec](https://github.com/raas-dev/configent/commit/ed0cfec11951606a32f9de60736ddbe4b9b99cb8))

## [1.47.0](https://github.com/raas-dev/configent/compare/1.46.0...1.47.0) (2023-07-08)


### Features

* **go:** Add sttr ([2e32912](https://github.com/raas-dev/configent/commit/2e32912ff8f5985eb64e5e42e04ede08910c3a4a))


### Fixes

* **aliases:** Remove md5sum and sha1sum over coreutils ([bd6124c](https://github.com/raas-dev/configent/commit/bd6124c34c6c3f43762b33aa246b235e71a31d12))
* **aliases:** Remove mute and unmute on macOS ([ce6de6f](https://github.com/raas-dev/configent/commit/ce6de6fc14eced577f6c6f83989844b06fb8c112))
* **aliases:** Remove oryx, does not have aarch64 ([b4607cc](https://github.com/raas-dev/configent/commit/b4607cc56ff88d3ed39a1380c42d736ac3586b02))
* **aliases:** Use https for wttr ([497e9d8](https://github.com/raas-dev/configent/commit/497e9d8044d036e6fa94060fff59604e1ec81b98))
* **db:** Remove unused gobang ([aadae3d](https://github.com/raas-dev/configent/commit/aadae3d756ad15e438435c0277070447d5b22aa7))
* **go:** Remove unused CodeGPT ([620968c](https://github.com/raas-dev/configent/commit/620968c78d456ef6116babf25e200a7ba2170fc2))

## [1.46.0](https://github.com/raas-dev/configent/compare/1.45.2...1.46.0) (2023-07-07)


### Features

* **rust:** Add kondo for delete temp build dirs ([7e23b77](https://github.com/raas-dev/configent/commit/7e23b77892f04167309c4144be1d2ec6a5255a8a))


### Documentation

* **README:** Container runtimes ([fca05d5](https://github.com/raas-dev/configent/commit/fca05d53c7a3fa44797afb99bab6ac62de11efa0))


### Fixes

* **aliases:** Add wttr ([4f5df04](https://github.com/raas-dev/configent/commit/4f5df0412363ff8854e5378f3f95ef7ba69f1604))
* **aliases:** Remove pyclean() over kondo ([6e11921](https://github.com/raas-dev/configent/commit/6e119218d8a8898487c6914d09f4adf4ef37fe57))
* **aliases:** Remove unused fx ([4f7113b](https://github.com/raas-dev/configent/commit/4f7113b28f5aba80f56c27e11758cf450e2fdeed))
* **aliases:** Use gpt4 in sgpt ([aead31b](https://github.com/raas-dev/configent/commit/aead31b978f7e7fd44aba18eb446b3e5644160b2))
* **git:** Enable git rerere globally ([acf117f](https://github.com/raas-dev/configent/commit/acf117fa4865f67a2297b023c3a2cf3747d8d941))
* **git:** Rebase defaults ([e1bef4d](https://github.com/raas-dev/configent/commit/e1bef4d02ebf04b78edf1486e5558011694f9c66))
* **go:** Remove reflex ([47a9c83](https://github.com/raas-dev/configent/commit/47a9c8321b240df41467744c62cae70adad3fee2))
* **lesspipe:** Update lesspipe to 2.08 ([c9ebf5c](https://github.com/raas-dev/configent/commit/c9ebf5c5e70ecacfb3bb84b5ca9a32a579323bf3))
* **rust:** Add watchexec ([ae43e70](https://github.com/raas-dev/configent/commit/ae43e70c46e160bfd1c61ef0d3339a38deb84133))
* **vscode:** Use gpt4 in chatgpt extension ([a842545](https://github.com/raas-dev/configent/commit/a8425453a98301fc6fb71446bb9b302956536a90))

### [1.45.2](https://github.com/raas-dev/configent/compare/1.45.1...1.45.2) (2023-07-04)


### Fixes

* **lessfilter:** Fix more suitable dark theme ([a7c2e49](https://github.com/raas-dev/configent/commit/a7c2e492bd29c0a87ad96c04065e63453bea9937))

### [1.45.1](https://github.com/raas-dev/configent/compare/1.45.0...1.45.1) (2023-07-04)


### Fixes

* **vscode:** Remove unused extension ([b543f21](https://github.com/raas-dev/configent/commit/b543f213361b7d9b47647817c2b96d483d4ef91c))

## [1.45.0](https://github.com/raas-dev/configent/compare/1.44.0...1.45.0) (2023-07-04)


### Features

* **go:** Add glow for preview markdown in term ([ba851b5](https://github.com/raas-dev/configent/commit/ba851b578e47873bcb23d371c67d6f0bff09dfcd))


### Fixes

* **aliases:** Alias _ to shell gpt ([cd324a0](https://github.com/raas-dev/configent/commit/cd324a01c9c09bc859e7714b14427fc05b276fb8))
* **aliases:** Alias e to generic package extract ([3363edb](https://github.com/raas-dev/configent/commit/3363edbabe0aa3ac77708d4d9cd59afb2666f159))
* **aliases:** Clarify e() error messages ([95f1362](https://github.com/raas-dev/configent/commit/95f136212d64cf71db71bdea1fc09aba286bb215))
* **vscode:** Replace genie by chatgpt-reborn ([a87d346](https://github.com/raas-dev/configent/commit/a87d346f92c68865f0a5a86f77606efc4ea182c2))

## [1.44.0](https://github.com/raas-dev/configent/compare/1.43.0...1.44.0) (2023-07-03)


### Features

* **aliases:** Add gpt-engineer ([4888807](https://github.com/raas-dev/configent/commit/4888807dc97ccf699010924e8c29e56165c7a7b2))


### Fixes

* **docker:** Update buildx ([d21beab](https://github.com/raas-dev/configent/commit/d21beabec400131845fc81fa1f11c44f4579abbb))

## [1.43.0](https://github.com/raas-dev/configent/compare/1.42.3...1.43.0) (2023-07-02)


### Features

* **aliases:** Add aider via pipx ([d6293aa](https://github.com/raas-dev/configent/commit/d6293aa602df3fec916c231984a36115ae6a6e01))
* **python:** Update pythons ([3a48751](https://github.com/raas-dev/configent/commit/3a487514e023a06596f225a9df2ec775f2049dcc))
* **utils:** Add universal-ctags ([ec4f7d4](https://github.com/raas-dev/configent/commit/ec4f7d434b81e573e0a893a3e936934ef0f5d3e5))


### Fixes

* **aliases:** Remove lama-cleaner ([76db5e7](https://github.com/raas-dev/configent/commit/76db5e7f30be4d271b9df77595f610036bfa1be8))


### Documentation

* **aliases:** Fix comment ([e7030ef](https://github.com/raas-dev/configent/commit/e7030efc9889c0799b0525a5294f513a98c713e5))

### [1.42.3](https://github.com/raas-dev/configent/compare/1.42.2...1.42.3) (2023-06-18)


### Fixes

* **aliases:** Remove unused jupytext ([716cc7d](https://github.com/raas-dev/configent/commit/716cc7d7fbaf088676517a39af65bd022c6069f6))
* **vscode:** Fix context length ([c21504c](https://github.com/raas-dev/configent/commit/c21504cb3ed51203ea339410f734283db6f74129))
* **vscode:** Increase token count for Genie ([d3c984b](https://github.com/raas-dev/configent/commit/d3c984b33e4d106c7734b1c7104b9bbc7aababc3))
* **vscode:** Remove broken extensions ([5b3dda7](https://github.com/raas-dev/configent/commit/5b3dda764e302b39de5b33cfed1625d06390e50e))
* **vscode:** Remove unused todohighlight keywords ([fa9f1c8](https://github.com/raas-dev/configent/commit/fa9f1c8996c2eb3794f728eef48aeb45fcdde421))

### [1.42.2](https://github.com/raas-dev/configent/compare/1.42.1...1.42.2) (2023-06-05)


### Fixes

* **iac:** Add bicep CLI via az ([ec97af7](https://github.com/raas-dev/configent/commit/ec97af7453aff6f6515b83beae56132c4eb93d38))
* **less:** Colorize all plain text files ([26a71f9](https://github.com/raas-dev/configent/commit/26a71f9ae622c833d5bfcdf2c2b592ccdec5ffe0))

### [1.42.1](https://github.com/raas-dev/configent/compare/1.42.0...1.42.1) (2023-06-05)


### Fixes

* **git:** Add git-delta settings ([73aa23d](https://github.com/raas-dev/configent/commit/73aa23d98ee5688a7bd42761e29bc95f747a1c82))
* **go:** Install gopls for VSCode Go extension ([386f609](https://github.com/raas-dev/configent/commit/386f6098f07b51cc5710a8f58d324702a2f2fa58))
* **iac:** Add azd ([7ac7da1](https://github.com/raas-dev/configent/commit/7ac7da169225fbb32d3080f1ef10faa947c86924))
* **macos:** Include later less ([444ae48](https://github.com/raas-dev/configent/commit/444ae48d0f1c114f217462959331c35c4602f752))
* **macos:** Remove broken less ([c49eba6](https://github.com/raas-dev/configent/commit/c49eba6761c79421e165b2a1537dc48e8aa4d09f))
* **macos:** Remove broken osx-cpu-temp ([da1256f](https://github.com/raas-dev/configent/commit/da1256f1b2cc6b165d327dbb6d83f274d8741c29))
* **pager:** Use bat for colored manpages ([9f6bb2c](https://github.com/raas-dev/configent/commit/9f6bb2c6a17b8f09c8d8b64e9210e55721d0f076))
* **profile:** Disable azd telemetry ([c231479](https://github.com/raas-dev/configent/commit/c23147954e472e01e8126d7415164316dd9193be))
* **terminal:** Set theme for bat and git-delta ([510b423](https://github.com/raas-dev/configent/commit/510b423de37c84b3d595ca88b77990d66f100384))
* **utils:** Remove bat-extras ([744dff7](https://github.com/raas-dev/configent/commit/744dff71397a28f6fd6b022af2513ad652b8f79c))
* **utils:** Remove grex as obsolete ([6576b3d](https://github.com/raas-dev/configent/commit/6576b3d4c17f6a30e772a092e45f02af2fed19fe))
* **utils:** Remove turbocommit over codegpt ([fd9fb23](https://github.com/raas-dev/configent/commit/fd9fb23204efdcfa91a193035bc1470e8b2cbb95))

## [1.42.0](https://github.com/raas-dev/configent/compare/1.41.0...1.42.0) (2023-06-04)


### Features

* **aliases:** Change alias _ to describe command ([18f8e74](https://github.com/raas-dev/configent/commit/18f8e74dfd27ce34bd4ef45c3e5cb9c60d86956b))
* **aliases:** Change alias c to sgpt_code ([1981eb1](https://github.com/raas-dev/configent/commit/1981eb1ad96a029db0ca0d4cbe59dba86f4f2072))
* **git:** Add colorMoved to git diff ([2f92340](https://github.com/raas-dev/configent/commit/2f9234084680370ce0f3dbf121b66b77094cf9ee))
* **git:** Add diff3 merge conflict resolution ([71f66a7](https://github.com/raas-dev/configent/commit/71f66a77424a057f3b82cc1b6737dd1ed478341d))
* **git:** Add git-delta ([d5b3a5d](https://github.com/raas-dev/configent/commit/d5b3a5db6730272c0291c0dbfd5c411139884845))
* **macos:** Add sniffnet ([401c734](https://github.com/raas-dev/configent/commit/401c73479f01b6cae86ed0163d79a8da941211db))
* **utils:** Add bat-extras ([a8569a6](https://github.com/raas-dev/configent/commit/a8569a628b874279f10845dce7871118c74712fc))


### Fixes

* **aliases:** Remove autoheal ([632b08a](https://github.com/raas-dev/configent/commit/632b08afa3f99dde05a6bc2b613e12fc8d704035))
* **aliases:** Use shim for jq over alias ([292685e](https://github.com/raas-dev/configent/commit/292685e92a788208778170c043ecc6591d347d89))
* **bat:** Move setting default theme to profile ([a4f2772](https://github.com/raas-dev/configent/commit/a4f27725d668d867d655413c79fa79ea5f5ccd8b))
* **bat:** Output plain if bat is piped ([6e16b4d](https://github.com/raas-dev/configent/commit/6e16b4d65e3c9aa215895e7fb79ee30de3a16ad9))
* **git:** Add git-delta side-by-side settings ([7c2e4a8](https://github.com/raas-dev/configent/commit/7c2e4a85ecd1b4a99ec4774d634722ed571f5e08))
* **git:** Add vscode hyperlinks to delta ([755a2d2](https://github.com/raas-dev/configent/commit/755a2d2a9f503bf78edef7aceb5c14ccfb62c42c))
* **lessfilter:** Fix exit code to pass to lesspipe ([da70a12](https://github.com/raas-dev/configent/commit/da70a124e49ff8a681dcf563028089975e9a1af3))
* **less:** Fix extending lesspipe with lessfilter ([33015e7](https://github.com/raas-dev/configent/commit/33015e702f96d31219dbed30ddb5e25da4eb4048))
* **tmux:** Enable 24-bit/true color ([4b1bfb7](https://github.com/raas-dev/configent/commit/4b1bfb7355c0085fd3f65d3ff501e4f4a0bd9318))

## [1.41.0](https://github.com/raas-dev/configent/compare/1.40.0...1.41.0) (2023-05-28)


### Features

* **aliases:** Add § to translate to Finnish ([44e47ef](https://github.com/raas-dev/configent/commit/44e47efb25312487a021817559ee9bb296ac66a3))


### Fixes

* **aliases:** Update tech list for webanalyze ([72831d4](https://github.com/raas-dev/configent/commit/72831d4e18b7ff9799f6af661edb082fae8616c3))
* **osx:** Remove unneeded cask tap ([05719f3](https://github.com/raas-dev/configent/commit/05719f325cc3a68d01e36c9ed99d9a3d9e07ba20))
* **vscode:** Remove broken semgrep extension ([c85e5ce](https://github.com/raas-dev/configent/commit/c85e5cead8fe0de1837c1ee053e2c614336c8646))

## [1.40.0](https://github.com/raas-dev/configent/compare/1.39.0...1.40.0) (2023-05-01)


### Features

* **aliases:** Add translate-shell ([5e1d9f3](https://github.com/raas-dev/configent/commit/5e1d9f38e2392759e6eca1b14c87359b66a3fd97))


### Fixes

* **profile:** Disable KICS crash reports ([0f71c05](https://github.com/raas-dev/configent/commit/0f71c0584b709bd6f7e953121f099206ddd6d232))

## [1.39.0](https://github.com/raas-dev/configent/compare/1.38.0...1.39.0) (2023-04-27)


### Features

* **aliases:** Add maigret via nixery ([2f58515](https://github.com/raas-dev/configent/commit/2f58515a8785827fbe338574648dba4f4e59cf09))
* **aliases:** Add webanalyze via nixery ([743c9a2](https://github.com/raas-dev/configent/commit/743c9a27ecb2c6ceba79948ca95ee9ad1ab3222d))


### Fixes

* **nixery:** Fix volume mount via lima ([a4d1f4d](https://github.com/raas-dev/configent/commit/a4d1f4d33f63318dc83d1d9beeedb968bde74d9c))
* **nixery:** Remove publishing ports ([1c265da](https://github.com/raas-dev/configent/commit/1c265daada5ee4540386261881a2a16476d78abb))
* **nixery:** Use temporary writable volume mount ([b13627c](https://github.com/raas-dev/configent/commit/b13627c83d247e4fec28772b0d21d980c9a0ae6c))

## [1.38.0](https://github.com/raas-dev/configent/compare/1.37.0...1.38.0) (2023-04-26)


### Features

* **aliases:** Add katana via nixery ([c4a3273](https://github.com/raas-dev/configent/commit/c4a3273987fe23870cf7b7bb40fe47e6615dc7bb))
* **iac:** Replace dockle with grype ([c2de700](https://github.com/raas-dev/configent/commit/c2de700c1ad8a7b6d0dcc36a0fc7e142f8a2ebd9))


### Documentation

* **aliases:** Add devbox link ([4e3f9a7](https://github.com/raas-dev/configent/commit/4e3f9a763a494f31a8ce2222b484908e344eaa0b))
* **python:** Add hint to resolve lzma on macOS" ([94d00f2](https://github.com/raas-dev/configent/commit/94d00f216ea2caed88948bf2c326492b5afff8e7))


### Fixes

* **aliases:** Remove chain-bench ([76c786c](https://github.com/raas-dev/configent/commit/76c786c92c8eef0a3834e7a4ac71e552bace06ce))
* **vscode:** Remove trivy from extensions ([c2a2a0b](https://github.com/raas-dev/configent/commit/c2a2a0bf5ce5ffce7f1088981a8b6496f3b26a73))

## [1.37.0](https://github.com/raas-dev/configent/compare/1.36.0...1.37.0) (2023-04-25)


### Features

* **vscode:** Add cursor to extensions ([4e58701](https://github.com/raas-dev/configent/commit/4e5870154a4bd0fb53d66c5860ccfc411bc801ca))
* **vscode:** Remove RapidAPI, replace with REST client ([024381a](https://github.com/raas-dev/configent/commit/024381a809785fc41c5924b83b592a1b8680c24b))


### Fixes

* **aliases:** Alias , to  ext ([ac5412c](https://github.com/raas-dev/configent/commit/ac5412c673e78bc8c627f4fe8f8f6e2b0f88e43d))
* **aliases:** Alias s to sgpt chat ([906a67e](https://github.com/raas-dev/configent/commit/906a67ee632c3b4d63323f9b2ce6d7e32a856c09))

## [1.36.0](https://github.com/raas-dev/configent/compare/1.35.0...1.36.0) (2023-04-24)


### Features

* **vscode:** Add highlight-counter extension ([9695d25](https://github.com/raas-dev/configent/commit/9695d2580edbd66f546e2e5ab0317ac8971e2667))
* **vscode:** Add markdown extensions ([6ad0cff](https://github.com/raas-dev/configent/commit/6ad0cff54b25fc9b4a3448b4885843272311a98b))
* **vscode:** Add vscode extensions ([54c98a4](https://github.com/raas-dev/configent/commit/54c98a4a26d05d1e7affec0be84a50a510d5030f))


### Fixes

* **aliases:** Change c to code and k to kalker ([e9a25fb](https://github.com/raas-dev/configent/commit/e9a25fb619fc4dc31658f24ddc4e1f69a0f50803))

## [1.35.0](https://github.com/raas-dev/configent/compare/1.34.2...1.35.0) (2023-04-19)


### Features

* add turbocommit to Rust installation script ([7d43d31](https://github.com/raas-dev/configent/commit/7d43d31feb7b5b22793b1ac7e640a62a37006611))
* **aliases:** Add alias for autoheal ([774a125](https://github.com/raas-dev/configent/commit/774a1250d72b06778be122133c20e295b0c6ca22))
* **vscode:** Add vscode extensions ([7a1cc07](https://github.com/raas-dev/configent/commit/7a1cc07879e6e2925ac5597ac25e50391a8353e8))


### Fixes

* **aliases:** Remove broken got ([f6f9ceb](https://github.com/raas-dev/configent/commit/f6f9ceb2f5b4b44a612b60d0983ed8fe37c50b54))
* **macos:** Agree to licenses when running dup ([4a40be1](https://github.com/raas-dev/configent/commit/4a40be1303d80b861a4bed6e3b898ecb3ac12977))

### [1.34.2](https://github.com/raas-dev/configent/compare/1.34.1...1.34.2) (2023-04-10)


### Fixes

* **aliases:** Add check to stop and kill container ([83bdbfa](https://github.com/raas-dev/configent/commit/83bdbfa5a9522385b03ba50fd78fa783015ac1b2))
* **aliases:** Add d() support for envvars ([f40cd6b](https://github.com/raas-dev/configent/commit/f40cd6be6aa4ccc8ca113fa9536e036cc9441855))
* **aliases:** Make d() attempt to pull newer image ([1d46375](https://github.com/raas-dev/configent/commit/1d46375b09118cda0fdf640806aa8a8e0d083e51))
* **aliases:** Make d() follow docker logs ([7ebba0f](https://github.com/raas-dev/configent/commit/7ebba0f7cfdfcf4007a0bfeadf41c676ce6485ff))
* **aliases:** Make d() read envvars for env-file ([a65ec1e](https://github.com/raas-dev/configent/commit/a65ec1e0d8b0224040284d6a0f4c865a70a47a85))
* **aliases:** Passing custom args to d() ([35031a7](https://github.com/raas-dev/configent/commit/35031a7563ca0ac6ba7970ea590527165af2a5cf))
* **aliases:** Publish docker ports to localhost ([d6c1b41](https://github.com/raas-dev/configent/commit/d6c1b41e46976963eef397bf0389fb97144e9add))
* **aliases:** Remove obsolete option for sgpt ([2b369a1](https://github.com/raas-dev/configent/commit/2b369a16a74227d2ef09b970091edc0884ff72a3))
* **aliases:** Remove obsolete option for sgpt_execute ([0a3c501](https://github.com/raas-dev/configent/commit/0a3c501566d12f4fb70bd46ed2c1649a91790896))
* **limavm:** Use Quad9 DNS servers for Ubuntu VM ([faeaa7f](https://github.com/raas-dev/configent/commit/faeaa7f8c823808ccc02fa3483a99b3fc8193f7c))

### [1.34.1](https://github.com/raas-dev/configent/compare/1.34.0...1.34.1) (2023-04-08)


### Fixes

* **aliases:** Build d lower case image names ([5704f32](https://github.com/raas-dev/configent/commit/5704f321ffcf718fa6b84df19e1c17edf8a1852a))
* **docker:** Install Buildx and Compose as plugins ([41a67a4](https://github.com/raas-dev/configent/commit/41a67a4577c53070f0142c120379e700f707c2b2))

## [1.34.0](https://github.com/raas-dev/configent/compare/1.33.2...1.34.0) (2023-04-04)


### Features

* **aliases:** Add alias oc ([96e0d89](https://github.com/raas-dev/configent/commit/96e0d890e6543a0563c9759ce18fa0b9343920a3))
* **osx:** Add cmake ([67f9a9d](https://github.com/raas-dev/configent/commit/67f9a9d87b13acc6977f80ee663a44e542b0c179))
* **python:** Upgrade installed Python version ([da1395e](https://github.com/raas-dev/configent/commit/da1395e2094887e22439ff34d476601a1d21f345))
* **ruby:** Update optional Ruby version ([24aab25](https://github.com/raas-dev/configent/commit/24aab2598c4b6595a1949c3cc3e83ea01f22280e))


### Fixes

* **aliases:** Clean up pipx packages on pipclear ([25ed92c](https://github.com/raas-dev/configent/commit/25ed92cc592da8710e95759b2c53b686bf592988))
* **aliases:** Fix pipclear to not try remove -e ([72d6619](https://github.com/raas-dev/configent/commit/72d66199af3ec9caf38cc72ca63897208271c41f))
* **lima:** Double VM ram to 8GiB to speed up LLMS ([b2c788f](https://github.com/raas-dev/configent/commit/b2c788f3ab7d32dce14a61a08facbfc31c05b6ba))
* **vscode:** Disable throttling ([1e92061](https://github.com/raas-dev/configent/commit/1e9206154bbb55712b6161a1d2870347c67182fa))
* **vscode:** Migrate deprecated VSCode extensions ([ad9fdd0](https://github.com/raas-dev/configent/commit/ad9fdd08ca6875b06fab827b1602f8bdc7485add))

### [1.33.2](https://github.com/raas-dev/configent/compare/1.33.1...1.33.2) (2023-03-26)


### Documentation

* **lima:** Add lima-vm defaults as reference ([28f34e0](https://github.com/raas-dev/configent/commit/28f34e042e6cb54e3cf99d82333523e224875bd1))


### Fixes

* **ai:** Remove bin/ai wrapper over shell-gpt ([cad6425](https://github.com/raas-dev/configent/commit/cad64255c4ff58a33adbe607cd29ecb6d82354d8))
* **vscode:** Remove unused extensions ([f2ac4c5](https://github.com/raas-dev/configent/commit/f2ac4c5fd69ccf655d48b1ce1605bb81e378188d))

### [1.33.1](https://github.com/raas-dev/configent/compare/1.33.0...1.33.1) (2023-03-11)


### Fixes

* **aliases:** Add default args to genpass and whatlistens ([3a92d1e](https://github.com/raas-dev/configent/commit/3a92d1ed659bf31dba847c79b54f634702b4bf39))
* **aliases:** Remove JWT decode shortcuts ([d6dcddc](https://github.com/raas-dev/configent/commit/d6dcddc5fa1d0da21d9d4cafb6c4f587fcb136fc))

## [1.33.0](https://github.com/raas-dev/configent/compare/1.32.0...1.33.0) (2023-03-11)


### Features

* **aliases:** Add wappalyzer via npx ([0aacce2](https://github.com/raas-dev/configent/commit/0aacce2544ce505a4cc8bbc8266f7cfe58d20623))


### Documentation

* **bin:** Add copyright and summary ([35c111c](https://github.com/raas-dev/configent/commit/35c111cab8e7416ea79def4f88d14801dc866d96))


### Fixes

* **aliases:** Add context-aware chatgpt aliases ([bc45fb0](https://github.com/raas-dev/configent/commit/bc45fb0ca35266c47e379ba0a3e982ff9d35b380))
* **aliases:** Add context-aware code completion ([f0f19d7](https://github.com/raas-dev/configent/commit/f0f19d7921038e8753d0de9a847c63213d0cf33c))
* **aliases:** Change alias for translating text ([194e6a3](https://github.com/raas-dev/configent/commit/194e6a342cccf1b2515c5ffb26e340d20aa48cd0))
* **aliases:** Fix typo ([7676a21](https://github.com/raas-dev/configent/commit/7676a21e95ee9966d813e47463dcff9c76b598c3))
* **aliases:** Make 'e' to find and execute with sgpt ([5cdc460](https://github.com/raas-dev/configent/commit/5cdc460907dd26f33383d530724a94e0a737d297))
* **aliases:** Remove terminal-copilot ([28bcb05](https://github.com/raas-dev/configent/commit/28bcb055924111d4703afe64d4ed4455a5a94078))
* **sgpt:** Use no cache for completions/chats ([592c422](https://github.com/raas-dev/configent/commit/592c4225e991ab8473b4154b7ad2bcf80651fcfd))

## [1.32.0](https://github.com/raas-dev/configent/compare/1.31.2...1.32.0) (2023-03-04)


### Features

* **aliases:** Add oryx ([bf474b3](https://github.com/raas-dev/configent/commit/bf474b34ec3ab44fbcebd27e3d9cfbf3c0b2f7e9))
* **aliases:** Remove mrm, add projen ([4789836](https://github.com/raas-dev/configent/commit/478983621fddbdd8ed1bfec656c66f956cab3819))
* **nix:** Run nix/nix-env in docker ([a30bd00](https://github.com/raas-dev/configent/commit/a30bd00f03a3f9482df6325fa4f791085c67cd07))


### Documentation

* **README:** Fix minimum memory requirements ([2b15f0d](https://github.com/raas-dev/configent/commit/2b15f0d618cda253b149d6545693ff5004be53dd))


### Fixes

* **aliases:** Add nixd devbox ([932317a](https://github.com/raas-dev/configent/commit/932317ad5700b14012ed3ffb7de9fb3c4304bc8f))
* **aliases:** Remove aliases for cachix and devenv ([65e1771](https://github.com/raas-dev/configent/commit/65e17716b59848d40b0fdd849f00c7fe228c0ad2))
* **aliases:** Remove broken --include-mas from update ([4dec5e1](https://github.com/raas-dev/configent/commit/4dec5e17875f6745fa0726ad1065d2b59a96713e))
* **aliases:** Use function for devbox over alias ([870d8c1](https://github.com/raas-dev/configent/commit/870d8c1241b588ed619c8284a5d7912b173586c1))
* **devbox:** Change install path ([89f43d1](https://github.com/raas-dev/configent/commit/89f43d178ee0af423539e2ecee2ff14194f99d4f))
* **nixd:** Create nix environment per dir ([1942831](https://github.com/raas-dev/configent/commit/194283190fa3ca71a4bde9fc35f10b7647d66b3b))
* **nixd:** Don't quote args for docker exec ([0ff1816](https://github.com/raas-dev/configent/commit/0ff1816cc53b52ca7d00df6b8639c12d538f4da9))
* **utils:** Fix typo in git-lfs ([fea1fc1](https://github.com/raas-dev/configent/commit/fea1fc1972f37acc50bb6e1258d861d0950497f9))
* **vscode:** Don't show release notes after update ([425c3e4](https://github.com/raas-dev/configent/commit/425c3e4b2f4364347884d407b5dbab518e1205d7))
* **yarn:** Shim npx -y yarn, over using the alias ([99ed686](https://github.com/raas-dev/configent/commit/99ed686a5833b13698d375300b5fbdb9038469ee))

### [1.31.2](https://github.com/raas-dev/configent/compare/1.31.1...1.31.2) (2023-01-26)


### Fixes

* **arch:** Libunistring fixes ([13cecf9](https://github.com/raas-dev/configent/commit/13cecf97101958f66c500b8435417dd2ae70bb56))

### [1.31.1](https://github.com/raas-dev/configent/compare/1.31.0...1.31.1) (2023-01-26)


### Fixes

* **arch:** Arch Linux pacman fixes ([b2dfe32](https://github.com/raas-dev/configent/commit/b2dfe322bbbceca53c51e6d4e8513312d4278263))


### Documentation

* **README:** Tidy ([a6b7596](https://github.com/raas-dev/configent/commit/a6b759662500d8a6e1a3c384ceea903d1e2acfca))
* **README:** Update known issues in deps ([19bb981](https://github.com/raas-dev/configent/commit/19bb981c5d4fea676d0b46d057ab8b25cd88ea0f))

## [1.31.0](https://github.com/raas-dev/configent/compare/1.30.0...1.31.0) (2023-01-26)


### Features

* **aliases:** Add alias for playwright ([ed8ac5d](https://github.com/raas-dev/configent/commit/ed8ac5db6bc69035f031172a0db95ff7ccf6febc))
* **java:** Update java to 17.0.6 ([992ca2f](https://github.com/raas-dev/configent/commit/992ca2fd48ffcc80526f0d561aca4b3e3b6ce317))
* **lima:** Update lima VMs ([11d1449](https://github.com/raas-dev/configent/commit/11d14491a943d47d1b9ce444cc88e576277892c9))
* **python:** Upgrade Python to 3.11 series ([a0242e8](https://github.com/raas-dev/configent/commit/a0242e885926fb88d8154a15be950d620fcbb841))
* **ruby:** Update Ruby from 3.1 to 3.2 ([2368ac0](https://github.com/raas-dev/configent/commit/2368ac057de5509584e80e386c9a306094634b91))


### Fixes

* **aliases:** Fix typo in gobuster alias ([82661b0](https://github.com/raas-dev/configent/commit/82661b01e4395567f4b4078aabeb8a664a6f5dd3))
* **gitlens:** Disable telemetry ([1f50598](https://github.com/raas-dev/configent/commit/1f50598d75196118ed42e0f9d58dbe704bcf1903))
* **vscode:** Chatgpt settings ([340faac](https://github.com/raas-dev/configent/commit/340faac478ba54fdf8ef8ad683552a1c44a1f95b))

## [1.30.0](https://github.com/raas-dev/configent/compare/1.29.0...1.30.0) (2023-01-24)


### Features

* **aliases:** Add alias for codex ([5831f04](https://github.com/raas-dev/configent/commit/5831f046846cc48cf9b08a1c37e3555bf4383443))
* **bin:** Add `ai` ([c0016bf](https://github.com/raas-dev/configent/commit/c0016bfe629495a721f7b2baac0e227694ef87d3))
* **bin:** Add ai ([2b0125a](https://github.com/raas-dev/configent/commit/2b0125ad8ba8494e153c100baf7508043b6646a9))


### Fixes

* **ai:** Fix preserving newlines in question ([e2d4227](https://github.com/raas-dev/configent/commit/e2d4227e63741f4451084dcefc4a7e21c2bd49bc))
* **ai:** Fix preserving newlines in question ([8b426a1](https://github.com/raas-dev/configent/commit/8b426a1b9d7b96cc5ce4503d91b56efb0e65fa7f))
* **ai:** Fix prompt styling when generating code ([4e73ff0](https://github.com/raas-dev/configent/commit/4e73ff093642c50ed283a520b98c190d0b3d7c91))
* **codex:** Fix openai model ([18cd60e](https://github.com/raas-dev/configent/commit/18cd60eda898cb9dad23a1440dedd739c0d348a8))

## [1.29.0](https://github.com/raas-dev/configent/compare/1.28.0...1.29.0) (2023-01-22)


### Features

* **aliases:** Add alias for run openai Python package ([6d5dc05](https://github.com/raas-dev/configent/commit/6d5dc05d0e6f9f7ef3db39d16302b2c0a780d10a))
* **aliases:** Add huggingface-cli ([60e3569](https://github.com/raas-dev/configent/commit/60e356933df16e73d421c8c80712172ab77a4472))
* **aliases:** Add pipx run lama-cleaner ([13f906e](https://github.com/raas-dev/configent/commit/13f906e46aa8f598fa7041abce264853a3b180b8))
* **aliases:** Add terminal-copilot, alias to @ ([1929921](https://github.com/raas-dev/configent/commit/1929921c76a4783bbc954d2be1b2059ec5e545d4))
* **git:** Add git-lfs ([d894cbb](https://github.com/raas-dev/configent/commit/d894cbbbb74a6ab310b182320edaa6fb35b2477f))
* **macos:** Make alias dup update appstore apps ([ce2c03f](https://github.com/raas-dev/configent/commit/ce2c03fc5b872acf5c0a5eead676ae493e06b575))
* **osx:** Add mas-cli ([eb66283](https://github.com/raas-dev/configent/commit/eb662839a6d67ccfd26074c9c33ad8a8654869bb))
* **utils:** Add brew install git-lfs ([fd05c7a](https://github.com/raas-dev/configent/commit/fd05c7a5762199611805f1a2329da2334715cfeb))


### Fixes

* **aliases:** Fix copilot pipx args ([37ddea1](https://github.com/raas-dev/configent/commit/37ddea1d11f5c3117d8569dcb037cb848c409b69))
* **osx:** Do not quarantine brew casks after install ([37b8112](https://github.com/raas-dev/configent/commit/37b8112ce7ce7bcd2f12b0a9b0379180bd2253d2))

## [1.28.0](https://github.com/raas-dev/configent/compare/1.27.0...1.28.0) (2023-01-14)


### Features

* **aliases:** Add alias for asking chatgpt ([d55f1df](https://github.com/raas-dev/configent/commit/d55f1df933c28d17b22552256eceb3027da5c0f7))


### Fixes

* **aliases:** Fix alias for openai ([afa534d](https://github.com/raas-dev/configent/commit/afa534d89153d69200ebb9eb531973720af798d0))
* **aliases:** Fix pipclear to remove also local packages ([16e8078](https://github.com/raas-dev/configent/commit/16e8078acffd24248e1ae692cc25d78ce6c558e6))

## [1.27.0](https://github.com/raas-dev/configent/compare/1.26.0...1.27.0) (2023-01-08)


### Features

* **iac:** Add azure-cli extension for containers ([1e7e215](https://github.com/raas-dev/configent/commit/1e7e2155ab7ad1dd184e536611e4a766fac14ba2))

## [1.26.0](https://github.com/raas-dev/configent/compare/1.25.1...1.26.0) (2022-12-14)


### Features

* **aliases:** Add chain-bench via nixery ([54f2881](https://github.com/raas-dev/configent/commit/54f28814378d3af0f92fe15f578b3bd100d2ecbe))
* **aliases:** Add metasploit via nixery ([794303e](https://github.com/raas-dev/configent/commit/794303eef8352e167c47ff9dd3569c946cd5b0b2))
* **aliases:** Add msfconsole via nixery ([e1b4ef7](https://github.com/raas-dev/configent/commit/e1b4ef77fb69c528284ef9ee299b3469f8b605f8))
* **aliases:** Add nikto via nixery ([3acb358](https://github.com/raas-dev/configent/commit/3acb3584df9030e4b438f578df81ec3f5153a541))
* **aliases:** Add security tools via nixery ([c557713](https://github.com/raas-dev/configent/commit/c557713e1a867a3d3877396c7fe57ec9e50c9ca2))
* **aliases:** Add unar ([0fd7409](https://github.com/raas-dev/configent/commit/0fd7409e4a0791cc16e6d7b470985cbc793ceac6))


### Fixes

* **aliases:** Use apt full-upgrade ([c07698f](https://github.com/raas-dev/configent/commit/c07698fefc7f0efddbf339f77276fe46c67fd8b9))

### [1.25.1](https://github.com/raas-dev/configent/compare/1.25.0...1.25.1) (2022-11-14)


### Fixes

* **gnulinux:** Install cmake ([feec869](https://github.com/raas-dev/configent/commit/feec8695f807617a410a1f6d9440c21926312bd4))
* **gnulinux:** Install m4 as build dep ([5feb0a9](https://github.com/raas-dev/configent/commit/5feb0a9610a36b42e1f3bba39283fc3f058a4bcb))

## [1.25.0](https://github.com/raas-dev/configent/compare/1.24.0...1.25.0) (2022-11-14)


### Features

* **aliases:** Add amass via nixery ([da5774a](https://github.com/raas-dev/configent/commit/da5774a31c5d7b3bb005e1526bd3d053d924e55a))
* **aliases:** Add hydra via nixery ([c45fa2d](https://github.com/raas-dev/configent/commit/c45fa2d3a111c4e18b776c6fcff2cbaaf908f510))
* **aliases:** Add nuclei via nixery ([d7815b6](https://github.com/raas-dev/configent/commit/d7815b64f47ce6e3ec0cc944037c26729896af0c))
* **aliases:** Add wapiti via nixery ([6f6ddf4](https://github.com/raas-dev/configent/commit/6f6ddf405eb7d505f7513b3e0ed6a01c0295e986))
* **macos:** Add UTM ([36ad0d4](https://github.com/raas-dev/configent/commit/36ad0d4701ee5f4a64c0fe6c62b101f0a1c80996))
* **rust:** Install Rust and on aarch64, the utils ([c8855fc](https://github.com/raas-dev/configent/commit/c8855fc4ba67fbb66f174bb48d68ada49ac3661b))


### Documentation

* **macos:** Add Ventura ([8420817](https://github.com/raas-dev/configent/commit/8420817686e337f3c4d87f31530ace30c98d2ddf))


### Fixes

* **google:** Remove unused Google Drive ([91555ab](https://github.com/raas-dev/configent/commit/91555abae7e4cbc4ae6fce4f139569d63c01a0f5))
* **macos:** Purge defaults removed by Ventura ([80286e3](https://github.com/raas-dev/configent/commit/80286e3f2fe20a946549cc63deda376ff99fdbde))
* **macos:** Remove unused Rancher Desktop ([5cf2304](https://github.com/raas-dev/configent/commit/5cf23046b40096ccd7c8ab0c143eed2ea25d38e4))

## [1.24.0](https://github.com/raas-dev/configent/compare/1.23.9...1.24.0) (2022-10-30)


### Features

* **iac:** Add dockle for Docker image scanning ([75a89bd](https://github.com/raas-dev/configent/commit/75a89bd9f7a4e27bbdf757d00280218271b34953))
* **vscode:** Add spectral OpenAPI linter extension ([935b25a](https://github.com/raas-dev/configent/commit/935b25a37053fa9d412425c4fadb57d5fa372893))
* **vscode:** Add vscode cfn lint ([5a6bdac](https://github.com/raas-dev/configent/commit/5a6bdac78022014ddd6df64e079657d577fbc82b))


### Documentation

* **README:** Installation -> system-wide packages ([e110e8a](https://github.com/raas-dev/configent/commit/e110e8aa5d0ec8bc3d178cd4361be73a6208737f))


### Fixes

* **iac:** Install tfvar by go to support arm64 ([220caa6](https://github.com/raas-dev/configent/commit/220caa6ef90d62deb7195cd0811075ad5625d86b))
* **profile:** Add /usr/local/bin to PATH on macOS for pwsh ([22ac950](https://github.com/raas-dev/configent/commit/22ac950fa0d2721bc0654bbbbe4dd8e45e561c32))
* **vscode:** Enable fast commit in Source Control ([2205428](https://github.com/raas-dev/configent/commit/220542846a0a7e2b257323e910d3bfcf848f431f))
* **vscode:** Update extensions list in vscode setup ([0f56d4f](https://github.com/raas-dev/configent/commit/0f56d4ffb3107baad001ec5d0a42fb2284460274))

### [1.23.9](https://github.com/raas-dev/configent/compare/1.23.8...1.23.9) (2022-08-07)


### Fixes

* **docker:** Add --init to reap processes properly ([f11e753](https://github.com/raas-dev/configent/commit/f11e753405268563c7adacccbb1189d131170828))

### [1.23.8](https://github.com/raas-dev/configent/compare/1.23.7...1.23.8) (2022-08-02)


### Fixes

* **profile:** Load Rust utils after cargo is present ([1041fce](https://github.com/raas-dev/configent/commit/1041fce3c460c612123a1cf0c928ca72235d66a2))

### [1.23.7](https://github.com/raas-dev/configent/compare/1.23.6...1.23.7) (2022-08-01)


### Fixes

* **install:** Refresh package database first ([418edd8](https://github.com/raas-dev/configent/commit/418edd8d2afc45ed8471ef258908e81c9d758bd7))
* **install:** Refresh package database first ([dc70610](https://github.com/raas-dev/configent/commit/dc706102b3e556897645c34777f973b60c7276be))
* **sudo:** Check if user has passwordless sudo ([ca07d7c](https://github.com/raas-dev/configent/commit/ca07d7cfe42ba08f0fac851b1a0d55ea43f62f8c))
* **zsh:** Create .ssh if not already exists ([7ccd7ae](https://github.com/raas-dev/configent/commit/7ccd7aedcd2041d299945cff89bfbbf06ee82b88))
* **zsh:** Do not restore tmux ([edd0f26](https://github.com/raas-dev/configent/commit/edd0f261017eeb739bebeae8203fa26986d31dcd))

### [1.23.6](https://github.com/raas-dev/configent/compare/1.23.5...1.23.6) (2022-07-31)


### Documentation

* **README:** Update screenshot ([b6f6e86](https://github.com/raas-dev/configent/commit/b6f6e86011abf94ee65f2f98b14f0afd3e8f178b))
* **README:** Update screenshot ([74d64d7](https://github.com/raas-dev/configent/commit/74d64d71e423be8cd2eb87bf7948766f17fafefe))


### Fixes

* **k6:** Alias k6 to run k6 in docker by nixery ([8be4c79](https://github.com/raas-dev/configent/commit/8be4c79ea6a4b203964859a5994370b61eec832f))

### [1.23.5](https://github.com/raas-dev/configent/compare/1.23.4...1.23.5) (2022-07-31)


### Fixes

* **aliases:** Add --cap-drop ALL ([494d3fc](https://github.com/raas-dev/configent/commit/494d3fcfdf383ccb9b02dcc89ac96105d42898ca))

### [1.23.4](https://github.com/raas-dev/configent/compare/1.23.3...1.23.4) (2022-07-31)


### Fixes

* **aliases:** Remove configurable-http-proxy ([5dc4725](https://github.com/raas-dev/configent/commit/5dc4725f246b8000d70ede58a7aec866585397f3))
* **aliases:** Remove other ad-hoc web servers over dufs ([43eb93a](https://github.com/raas-dev/configent/commit/43eb93af5b20304951281fe8562afc590bc4d6cb))
* **iac:** Add check if go exists before installing k6 ([fde1e72](https://github.com/raas-dev/configent/commit/fde1e7252046a3a1290d53372b5bdbfd2b676fb3))

### [1.23.3](https://github.com/raas-dev/configent/compare/1.23.2...1.23.3) (2022-07-31)


### Fixes

* **k6:** Fix go path ([00dfd01](https://github.com/raas-dev/configent/commit/00dfd01e138cc983e2ae6bc41354c05551c987a2))
* **vscode:** Add extension for tfsec ([885f26c](https://github.com/raas-dev/configent/commit/885f26cf93dd04b0cca92732d7ea71a099b5357e))

### [1.23.2](https://github.com/raas-dev/configent/compare/1.23.1...1.23.2) (2022-07-31)


### Performance

* **utils:** Install utils before tmux ([023e151](https://github.com/raas-dev/configent/commit/023e151af575efa4440c05ac2ae5eec7de961026))


### Documentation

* **README:** Add min disk space requirement ([3206711](https://github.com/raas-dev/configent/commit/32067118932e6c903a48d24ef6296a82dac10d18))
* **README:** Add minimum hardware requirements ([d635ea0](https://github.com/raas-dev/configent/commit/d635ea0f2e5fddaafd2d9f27882b4b9b1de62bfa))
* **README:** Add minimum requirements ([464e2de](https://github.com/raas-dev/configent/commit/464e2def9dd80e6d6995ebc151658c5191f72326))
* **README:** Add more specific disk space requirement ([562b2a6](https://github.com/raas-dev/configent/commit/562b2a616d6099c104184241e3c050225464166e))


### Fixes

* **iac:** Use xk6 for k6, use nixery for dog and oha ([e4e5983](https://github.com/raas-dev/configent/commit/e4e5983d57b5a3c185b685c697763a70775dad9b))
* **vscode:** Add extension for hadolint ([be13762](https://github.com/raas-dev/configent/commit/be1376223baa8cff1ce79165df33706655b2a617))
* **vscode:** Add extension for trivy ([09ec596](https://github.com/raas-dev/configent/commit/09ec596d1727a2f8ca51001e6df132d00fbe8b81))

### [1.23.1](https://github.com/raas-dev/configent/compare/1.23.0...1.23.1) (2022-07-30)


### Fixes

* **iac:** Remove ctop over glances ([0ba5c15](https://github.com/raas-dev/configent/commit/0ba5c1555d20adf026fb3c6b37e00c5e45477b3b))
* **lima:** Let lima decide CPU and memory for VMs ([b3360fc](https://github.com/raas-dev/configent/commit/b3360fc8858cf2af0f146c6f6d98f9c70a4d90c8))
* **utils:** Run nmap via nixery ([9e6de0c](https://github.com/raas-dev/configent/commit/9e6de0c043a336f59027a375b78572b5166c8000))

## [1.23.0](https://github.com/raas-dev/configent/compare/1.22.0...1.23.0) (2022-07-30)


### Features

* **utils:** Use glances over btop, alias i to glances ([2d7c0fc](https://github.com/raas-dev/configent/commit/2d7c0fc92a8838d2978dd99e771972af6241cb6a))


### Fixes

* **fzf:** Install fzf from git repo ([d2abbd6](https://github.com/raas-dev/configent/commit/d2abbd6e54a70ba51ac5c9c6ae8a0154a7bd1140))
* **node:** Remove global node packages, use npx ([d2c9253](https://github.com/raas-dev/configent/commit/d2c9253081f5e8573bf8b3d9bddcaeab25794801))
* **python:** Add openpyxl for opening xlsx with vd ([26c6850](https://github.com/raas-dev/configent/commit/26c6850c2afc556e8d2c0d5e25f2c5bf6156ab3d))
* **python:** Install and run tools ad-hoc by pipx ([ad8adc9](https://github.com/raas-dev/configent/commit/ad8adc972fde8c1f56a9f543ad3c49a5c9f38ce0))
* **python:** Pipx install Python-based CLI tools ([87d2dc9](https://github.com/raas-dev/configent/commit/87d2dc979f0c88ed033adc17a9e7fc60d1a8f2d9))
* **python:** Remove support for pyenv virtualenv ([5943fdf](https://github.com/raas-dev/configent/commit/5943fdf3f80fd53259ee8e377756c2d8765cb524))

## [1.22.0](https://github.com/raas-dev/configent/compare/1.21.2...1.22.0) (2022-07-29)


### Features

* **go:** Add viddy and alias watch to it ([b649096](https://github.com/raas-dev/configent/commit/b649096b23a829cb7ca7e380fc4744c806bac03d))
* **python:** Add visidata ([cb118b2](https://github.com/raas-dev/configent/commit/cb118b2f3d3dbf62dab75dfa3f8f9fed1a53152a))
* **rust:** Add diskonaut and alias to u ([98461bc](https://github.com/raas-dev/configent/commit/98461bc12fc1ee5d9aee114d9928eda195191095))
* **sql:** Add gobang ([e929010](https://github.com/raas-dev/configent/commit/e929010455eadd5d98aa27f43019693364e401e1))


### Fixes

* **curl:** Do not pipe curl error messages to sh ([94e2082](https://github.com/raas-dev/configent/commit/94e2082bb725dddf54b01d6fbe6d022603e62ece))
* **curl:** Do not pipe curl error messages to sh/bash ([cfbb720](https://github.com/raas-dev/configent/commit/cfbb720f96a19ff22f689efb44fc5916f49fb2e7))


### Documentation

* **python:** Clarify headings ([d688b5c](https://github.com/raas-dev/configent/commit/d688b5c395f9a059e54e3b4745a33f29bccf1e71))
* **python:** Note euporie ([a98a70e](https://github.com/raas-dev/configent/commit/a98a70ea7f19722f4174781b07f8943dd80f71b8))

### [1.21.2](https://github.com/raas-dev/configent/compare/1.21.1...1.21.2) (2022-07-29)


### Documentation

* **README:** Add tip for using nixery by alias n ([197a69d](https://github.com/raas-dev/configent/commit/197a69d6c1300e9287605c62d0d1082d33463dcf))
* **README:** Fix behaviour for alias d ([7d6fa48](https://github.com/raas-dev/configent/commit/7d6fa483d369c6e6bd9474b67b43bd56221d0527))


### Fixes

* **nixery:** Support multiple nix-pkgs ([4fc8a98](https://github.com/raas-dev/configent/commit/4fc8a983fd7c1538c4d782082997c8043e7fe1c9))

### [1.21.1](https://github.com/raas-dev/configent/compare/1.21.0...1.21.1) (2022-07-29)


### Fixes

* **bash:** Add brew install bash-completions ([e45d5dd](https://github.com/raas-dev/configent/commit/e45d5dd89b9b310aec38acc2101fe5185345785c))
* **tickrs:** Launch with summary view ([b8f6367](https://github.com/raas-dev/configent/commit/b8f63670cb0fdb32a8d4e3b7b0a2b0c8f64eedb8))

## [1.21.0](https://github.com/raas-dev/configent/compare/1.20.2...1.21.0) (2022-07-29)


### Features

* **aliases:** Add alias for tickrs ([9260e41](https://github.com/raas-dev/configent/commit/9260e41100283637002ae1d3dab8895302abf02a))
* **go:** Add duf ([1a28d14](https://github.com/raas-dev/configent/commit/1a28d14bd3e9c0ff8e56e721462acf7a17aebcba))
* **go:** Add reflex ([2be55e1](https://github.com/raas-dev/configent/commit/2be55e17c356decf2178519cfac4fca40320fd28))
* **rust:** Add bore-cli and pastel ([056be9f](https://github.com/raas-dev/configent/commit/056be9fee51dff573035337ff52f2cccf4f7fc6c))


### Fixes

* **go:** Install gojq using go, not brew ([7cebe86](https://github.com/raas-dev/configent/commit/7cebe860465ee8d2c60709099d9775f621c6ea59))
* **rust:** Use Rust for install_utils if no brew ([e581152](https://github.com/raas-dev/configent/commit/e581152304bb5de2556b942ea9db8e50571ebbfe))
* **shells:** Return true if .rclocal does not exist ([058abef](https://github.com/raas-dev/configent/commit/058abef249236b35ec56f97bba02efaf7bbfb685))

### [1.20.2](https://github.com/raas-dev/configent/compare/1.20.1...1.20.2) (2022-07-28)


### Fixes

* **aliases:** Update tmux tpm plugins ([0f23345](https://github.com/raas-dev/configent/commit/0f23345436cde6adaf77292099a1af9605d04e9b))


### Documentation

* **license:** Update web page ([64f824c](https://github.com/raas-dev/configent/commit/64f824cfed0c375520c78d23ce3d8482ba5e8f47))

### [1.20.1](https://github.com/raas-dev/configent/compare/1.20.0...1.20.1) (2022-07-28)


### Fixes

* **lessfilter:** Run lesspipe.sh in bash for stdin ([0ae39da](https://github.com/raas-dev/configent/commit/0ae39da6da31c04783532ce111b955bc8a0fa68b))
* **lessfilter:** Use OS lesspipe if exists ([54c213d](https://github.com/raas-dev/configent/commit/54c213defb0b5f29fc4fc2f13730da5d1efa17e6))

## [1.20.0](https://github.com/raas-dev/configent/compare/1.19.0...1.20.0) (2022-07-28)


### Features

* **tmux:** Install and update tpm plugins ([97361ad](https://github.com/raas-dev/configent/commit/97361ad8b47cc1ebd2bc3331d68929275a250a56))
* **xpanes:** Add xpanes ([a91c929](https://github.com/raas-dev/configent/commit/a91c9296004e38245059b5fda412a644ebba602c))


### Fixes

* **more:** Fix unknown MORE option -R on GNU/Linux ([e84678e](https://github.com/raas-dev/configent/commit/e84678ecd2fa3898bff809ae42b647a74b290969))

## [1.19.0](https://github.com/raas-dev/configent/compare/1.18.6...1.19.0) (2022-07-28)


### Features

* **less:** Add lessfilter and lesspipe ([a33c0a6](https://github.com/raas-dev/configent/commit/a33c0a66f60498e3ffe70a82e9e21b89a74f1dda))
* **python:** Add tldr and zsh completion for man ([67d3c44](https://github.com/raas-dev/configent/commit/67d3c44de4e8b6469ece49be13a9596666a1411a))
* **zsh:** Add more feature-rich highlighting ([1c13b69](https://github.com/raas-dev/configent/commit/1c13b69c063ade5302b8de1ca7d06024d49d589a))
* **zsh:** Migrate to antidote from zplug due to speed ([9c3d407](https://github.com/raas-dev/configent/commit/9c3d407bece6057d210205fb5708c3764deea945))


### Documentation

* **README:** Add note on display server, DMs and WMs on GNU/Linux ([dca9c94](https://github.com/raas-dev/configent/commit/dca9c941465ff055079b76492164092f1c13da43))
* **README:** Clarify server vs desktop ([c9d97f6](https://github.com/raas-dev/configent/commit/c9d97f6b5d35f163ace1eb420759499f89fde66e))
* **README:** Fix typos ([7ffed28](https://github.com/raas-dev/configent/commit/7ffed28b8959ac3904659d2c7e8cd9502eac6bd8))


### Fixes

* **less:** Add checks in lessfilter if tools exist ([c46741c](https://github.com/raas-dev/configent/commit/c46741cc280ed8c4073b3304a473f6e885047983))
* **less:** Tidy lessfilter output ([764c0d9](https://github.com/raas-dev/configent/commit/764c0d9b0a461d878145fd69335663b962d1f0a8))
* **profile:** Fix raw control chars for more ([aa158e9](https://github.com/raas-dev/configent/commit/aa158e997a93c0b5cb76943aca1ce5a9b2ce1447))
* **README:** Fix typos ([1a12e6b](https://github.com/raas-dev/configent/commit/1a12e6b0d695ff8b59b0411bacdda39bfd6997e3))
* **zsh:** Fix installing antidote ([8380e4e](https://github.com/raas-dev/configent/commit/8380e4ea1e6042e933c4150d1e0f88d09db32c85))

### [1.18.6](https://github.com/raas-dev/configent/compare/1.18.5...1.18.6) (2022-07-24)


### Fixes

* **aliases:** Remove bashism from decode_jwt_partial() ([db00d50](https://github.com/raas-dev/configent/commit/db00d508875ec0f0c00da3448d48adcf87071460))
* **lima:** Install configent on podman-ubuntu but no brew formulae ([7316966](https://github.com/raas-dev/configent/commit/731696604cf319959e586a5cc42f25728db47909))
* **lima:** Use /bin/sh over bash in ubuntu and rancher VM probes ([79fbdee](https://github.com/raas-dev/configent/commit/79fbdee2b46ef8e53284d222205cbfd019826a72))
* **podman:** Make host's home writable for containers ([039cd32](https://github.com/raas-dev/configent/commit/039cd326110e1b69dd2aef712cc4bd39954f67c0))

### [1.18.5](https://github.com/raas-dev/configent/compare/1.18.4...1.18.5) (2022-07-24)


### Documentation

* **README:** Refresh shields.io ([1592122](https://github.com/raas-dev/configent/commit/1592122597f247539c1016ab8a8d014a52868a26))
* **README:** Update screenshot ([a95b00b](https://github.com/raas-dev/configent/commit/a95b00b15623701f63552d2b15960baf390dcbb6))


### Performance

* **dotfiles:** Make dotfiles POSIX compatible ([66f9009](https://github.com/raas-dev/configent/commit/66f90096587e8307501a5e3b29000837d07147d9))
* **shell:** Use /bin/sh over bash for speed whenever possible ([938f666](https://github.com/raas-dev/configent/commit/938f666832eb8db9977ace2008234c91eb71e586))


### Fixes

* **aliases:** Fix echo bashisms ([4363e1e](https://github.com/raas-dev/configent/commit/4363e1ec00865e46f0e5788f708c53548e0b27d9))
* **aliases:** Parse with bash to allow local variables ([60cf358](https://github.com/raas-dev/configent/commit/60cf358fecdf7607801f476723b0dec20eb7c423))
* **dotfiles:** Prefer . over source ([ca8313c](https://github.com/raas-dev/configent/commit/ca8313c2c372b20fbcecd0cec59b1fd865e78823))
* **profile:** Parse using bash for string substitutions to work ([91920a1](https://github.com/raas-dev/configent/commit/91920a131de98bfefb7dda01b8fa0eae9e8e6c98))
* **profile:** Quote CLASSPATH ([096dc87](https://github.com/raas-dev/configent/commit/096dc8736293a2089bc87f17f5deb0a8376d555b))
* **profile:** Remove non-standard function keyword ([a61f736](https://github.com/raas-dev/configent/commit/a61f73603f1a3257a3890f8178d9f61f364a9b7b))
* **shells:** Fix echo bashism in traps ([7617fd7](https://github.com/raas-dev/configent/commit/7617fd7c5bbd42e1c487e57da8b2f32f09eb7cee))

### [1.18.4](https://github.com/raas-dev/configent/compare/1.18.3...1.18.4) (2022-07-24)


### Fixes

* **profile:** Make path_append POSIX compatible ([79c960e](https://github.com/raas-dev/configent/commit/79c960ef278d8ae5a7c7811279db9558228fe484))


### Documentation

* **copyright:** Add licensed under LGPL-3.0 ([c2611be](https://github.com/raas-dev/configent/commit/c2611be673488d5903ddfdb84a3076bc7372ba3a))

### [1.18.3](https://github.com/raas-dev/configent/compare/1.18.2...1.18.3) (2022-07-23)


### Fixes

* **shells:** Use POSIX compatible conditional checks ([47f4739](https://github.com/raas-dev/configent/commit/47f4739661c346119ea97b7f543a3e3fd07efca4))
* **shells:** Use POSIX compatible OS checks ([0885f2c](https://github.com/raas-dev/configent/commit/0885f2cec824b4da70c25a6a9655df5273b926aa))

### [1.18.2](https://github.com/raas-dev/configent/compare/1.18.1...1.18.2) (2022-07-23)


### Fixes

* **zplug:** Pull zplug repo if install_zsh is re-run ([3edeed9](https://github.com/raas-dev/configent/commit/3edeed9878ceed3343cb249477b1d48d753c5a54))

### [1.18.1](https://github.com/raas-dev/configent/compare/1.18.0...1.18.1) (2022-07-23)


### Fixes

* **python:** Fix azcli dependencies ([5d98755](https://github.com/raas-dev/configent/commit/5d987555ab807f60d023f165a84062176b416ddf))

## [1.18.0](https://github.com/raas-dev/configent/compare/1.17.2...1.18.0) (2022-07-23)


### Features

* **aliases:** Install hwatch, alias watch to it if installed ([b31e917](https://github.com/raas-dev/configent/commit/b31e917351e6da133c529959d5d984fc8e8ab71e))
* **haskell:** Add stack for haskell ([96c3182](https://github.com/raas-dev/configent/commit/96c3182bc85f50050a4732cc755373d6fdecd926))
* **jq:** Install gojq over jq, alias jq to gojq ([18dcabe](https://github.com/raas-dev/configent/commit/18dcabe6a22479b50ee4c9b7f9ec72acf51c3642))


### Performance

* **brew:** Do not tap homebrew/core on initial install ([620d01d](https://github.com/raas-dev/configent/commit/620d01d63ef3ae1737fefbaa57339ada204f6f08))


### Documentation

* **install:** Add languages of IAC tools and utilities ([c43cf0f](https://github.com/raas-dev/configent/commit/c43cf0f29846051253829d8d6860a5187bfc469c))
* **README:** Update default stacks in install_apps ([98d732c](https://github.com/raas-dev/configent/commit/98d732cee9b99ddbcd80261c3f605ad567270669))
* **utils:** Fix gojq language ([2f0ab97](https://github.com/raas-dev/configent/commit/2f0ab973619f70e46cd40d71225577f00f84037e))


### Fixes

* **aws:** Fix aws cli version to 2 ([ea29298](https://github.com/raas-dev/configent/commit/ea29298046231e0960927b49b702a47cf9176ab7))
* **python:** Make pip install python written IAC tools, not brew ([33205a5](https://github.com/raas-dev/configent/commit/33205a5f96d00dd4f0c47b148fc702426faa1474))

### [1.17.2](https://github.com/raas-dev/configent/compare/1.17.1...1.17.2) (2022-07-23)


### Fixes

* **zplug:** Install zplug as git repo to ~/.zplug ([b2b53c9](https://github.com/raas-dev/configent/commit/b2b53c9ceab3724d886a45cabcbf45371d867baa))

### [1.17.1](https://github.com/raas-dev/configent/compare/1.17.0...1.17.1) (2022-07-23)


### Fixes

* **git:** Install git from brew only on macOS ([babda30](https://github.com/raas-dev/configent/commit/babda30ccdeb3afdb0d6e204c3f813277d324806))
* **rust:** Disable installation of Rust development tools ([624bb6c](https://github.com/raas-dev/configent/commit/624bb6c1a7cff16c0782fb8eac1af83f60ec1120))
* **shells:** Move installation of starship prompt to utils ([b68fd96](https://github.com/raas-dev/configent/commit/b68fd964d373487698930c2998103342bc3aff25))
* **utils:** Add installation of GNU grep on macOS ([2675334](https://github.com/raas-dev/configent/commit/267533444ceb6f6e352585f19a9897850059865f))
* **versionrc:** Do not show refactor commits in CHANGELOG ([2b2f379](https://github.com/raas-dev/configent/commit/2b2f3799c1d7f22683f77653f568fec9387eb08f))

## [1.17.0](https://github.com/raas-dev/configent/compare/1.16.5...1.17.0) (2022-07-22)


### Features

* **lnav:** Add The Logfile Navigator (lnav), alias t to it ([73e2bec](https://github.com/raas-dev/configent/commit/73e2bec878dd0e56d025c04ba60d5e0e3e95e6ff))


### Refactor

* **README:** Tidy ([f09198e](https://github.com/raas-dev/configent/commit/f09198ed1657427b8beed08231a2cf3389d7cd45))


### Fixes

* **aliases:** Alias t to tail log of cloud-init if target not igven ([39b4531](https://github.com/raas-dev/configent/commit/39b4531c7ec7fd5f930a7d3cead60f68b8ecb95f))
* **lnav:** Fix check if file is readable before trying sudo ([4ef1e27](https://github.com/raas-dev/configent/commit/4ef1e2722598c02c629dde426095ee1a67be5ece))

### [1.16.5](https://github.com/raas-dev/configent/compare/1.16.4...1.16.5) (2022-07-19)


### Refactor

* **vscode:** Remove unused settings ([d664567](https://github.com/raas-dev/configent/commit/d664567e83d551a03ff9d1e2117fff77d397e191))


### Fixes

* **aliases:** Remove --force from zplug clean ([d246a09](https://github.com/raas-dev/configent/commit/d246a09cb0ede2ffa17d460ebe9b1457142b3dee))
* **remove:** Remove duplicate path append ([a9ee771](https://github.com/raas-dev/configent/commit/a9ee771ff99943f9c9648abc83f904f02897f057))
* **vscode:** Add kubectl and helm paths ([a3d59ac](https://github.com/raas-dev/configent/commit/a3d59ac7a698c1a0030d299dace457b882e9e1af))
* **vscode:** Fix kubernetes paths on ARM64 macOS ([226695b](https://github.com/raas-dev/configent/commit/226695b95c6c0cd62daa57605856338f89a70a2f))


### Documentation

* **pyenv:** Add note on xz on macOS ([19bd05d](https://github.com/raas-dev/configent/commit/19bd05d7e24e71f2ef441a534df99cb8327e7250))

### [1.16.4](https://github.com/raas-dev/configent/compare/1.16.3...1.16.4) (2022-07-19)


### Documentation

* **README:** Fix typos ([be65c2a](https://github.com/raas-dev/configent/commit/be65c2a5ea1e0567ec2e9205cf4a7936ef16cadc))


### Fixes

* **aliases:** Add pacman/yay autoremove like behaviour ([7d1ab97](https://github.com/raas-dev/configent/commit/7d1ab97aebe928658afeb86ae26b0bb764bfa6af))
* **brew:** Run brew autoremove after brew upgrade ([46835c9](https://github.com/raas-dev/configent/commit/46835c9f23c2271ac5cf120ac8c483cc0a5f720a))
* **pacman:** Do not install msttcorefonts (accepts EULA) ([9898496](https://github.com/raas-dev/configent/commit/9898496530940c8c48773fd88b052875c1d10427))
* **yum:** Add explicit installation of libxcrypt-compat for brew ([f534e06](https://github.com/raas-dev/configent/commit/f534e0654150772222b5833c43d7c91b17d98289))

### [1.16.3](https://github.com/raas-dev/configent/compare/1.16.2...1.16.3) (2022-07-18)


### Documentation

* **README:** Add docs on volume mounts ([d98f213](https://github.com/raas-dev/configent/commit/d98f213aac9e4636813ee5b0347ec20334256fa8))
* **README:** Features ([a40d466](https://github.com/raas-dev/configent/commit/a40d46609fd85cdbf5cd71c37e647318a1d77555))
* **README:** Fix typos ([128f0f0](https://github.com/raas-dev/configent/commit/128f0f094804f3ea30121c8b15dbe171a129784b))
* **README:** Intro ([1d01bbb](https://github.com/raas-dev/configent/commit/1d01bbb8b56d54b47b03f7df566a2583239724fa))
* **README:** Update features ([ecb8228](https://github.com/raas-dev/configent/commit/ecb822869f56589274c98b56d4a3546c8441aa4f))


### Fixes

* **gitlens:** Disable what's new after upgrades ([6ec8459](https://github.com/raas-dev/configent/commit/6ec8459ed17ef0a2c01a536b3dc43d5a6a1d3e60))


### Refactor

* **README:** Customization ([5ceff72](https://github.com/raas-dev/configent/commit/5ceff72d9f1061c8805f7d30d7b41cfea9f24d95))
* **README:** Features ([543e5ac](https://github.com/raas-dev/configent/commit/543e5ac87c6efc445c20f246937da9c6a3672f18))
* **README:** Features ([93123fe](https://github.com/raas-dev/configent/commit/93123fe9429c9a3f16cac1a8a80ec95146baebcf))
* **README:** Features ([6d84eac](https://github.com/raas-dev/configent/commit/6d84eac47794f065d1a55848a89b9b16e4179f41))
* **README:** Features ([09c0795](https://github.com/raas-dev/configent/commit/09c079576c057357919ce43ef81f94ee55521a83))
* **README:** Features ([75a29c4](https://github.com/raas-dev/configent/commit/75a29c452e905d27c15e310028c8da4ad7d3d070))
* **README:** Features ([b1436e6](https://github.com/raas-dev/configent/commit/b1436e61e3b69625e0acbdb70784db9b9cd6a1b9))
* **README:** Features ([78dbba4](https://github.com/raas-dev/configent/commit/78dbba46305321127218a51a59dd9ff48129b962))
* **README:** Features ([6d9850a](https://github.com/raas-dev/configent/commit/6d9850a9d8420d9f2b14d31961863710f8f62bf9))

### [1.16.2](https://github.com/raas-dev/configent/compare/1.16.1...1.16.2) (2022-07-18)


### Fixes

* **shells:** Fix setting the default shell ([820e4c9](https://github.com/raas-dev/configent/commit/820e4c9d1dbda499cacb24c965280fb56e6909bc))

### [1.16.1](https://github.com/raas-dev/configent/compare/1.16.0...1.16.1) (2022-07-18)


### Fixes

* **lima:** Remove user probe for AlmaLinux ([9f4cfba](https://github.com/raas-dev/configent/commit/9f4cfbaaa9b47f1095fe9ff47859b7772939fbc9))
* **lima:** Remove VM user probes except Ubuntu and Rancher ([d1fcdfd](https://github.com/raas-dev/configent/commit/d1fcdfd2153d6981841023329b312030139d9e17))
* **node:** Disable installing global yarn ([8000461](https://github.com/raas-dev/configent/commit/800046199b3287c1b718a80f37bffa23d099ce30))

## [1.16.0](https://github.com/raas-dev/configent/compare/1.15.2...1.16.0) (2022-07-18)


### Features

* **nodejs:** Remove installation of global npm packages ([c2d8bdc](https://github.com/raas-dev/configent/commit/c2d8bdc25da156e9ba5645c29badfdb9585f6043))
* **nodejs:** Remove npx- prefix from global nodejs devtool aliases ([ab78321](https://github.com/raas-dev/configent/commit/ab78321c44c9fd8c7b3dcb9d93e2f5b5297326ec))
* **ruby:** Remove installation of Ruby but install rbenv ([4657a28](https://github.com/raas-dev/configent/commit/4657a28ef55526b11944e53150d863b9905dace7))


### Refactor

* **dotfiles:** Same convention for OSTYPE checks ([6ebf393](https://github.com/raas-dev/configent/commit/6ebf393aef3e6cf9c11d782fc1e4a3752b2b7e3a))
* **vscode:** Remove unused settings ([0f0b9e4](https://github.com/raas-dev/configent/commit/0f0b9e4f29612df1c6a2fa048c138cce8068e6b3))


### Documentation

* **alpine:** Homebrew issues on Alpine Linux ([b82af3d](https://github.com/raas-dev/configent/commit/b82af3da4de2d9c9ed62d2ee0b7092a7496ef621))


### Fixes

* **alpine:** Change default shell to bash ([71ecc9d](https://github.com/raas-dev/configent/commit/71ecc9d4ada2ffa2aa1deb57b1d1c902a7d57bfb))
* **alpine:** Do not set default shell ([b5dc367](https://github.com/raas-dev/configent/commit/b5dc3671571be97a6decfa3e0c0a895401c74bf9))
* **alpine:** Setting user's default login shell on Lima ([7030b31](https://github.com/raas-dev/configent/commit/7030b31745d387eeb1cc3183210e211b758d5140))
* **bash:** Separate bash installation steps on distros ([2132740](https://github.com/raas-dev/configent/commit/213274071c936eaebda1e45a7e87c186e5d7db1a))
* **nodejs:** Fix npm deprecation warning ([aee2910](https://github.com/raas-dev/configent/commit/aee2910af04ce9bb58e0dc8ae57b279bee621751))
* **python:** Remove brew dependencies for pyenv ([626ae86](https://github.com/raas-dev/configent/commit/626ae86ff4bcfcce5f77ccfd6faab80740671c46))
* **rancher:** Enable writable home for containerd ([dd4f7f8](https://github.com/raas-dev/configent/commit/dd4f7f82ff8df72607aaeadd2eb320ace7dcb9ef))
* **vscode:** Remove deprecated extension, is now a native feature ([034bb57](https://github.com/raas-dev/configent/commit/034bb57504355ec46016b4dd78d949644c34a46b))

### [1.15.2](https://github.com/raas-dev/configent/compare/1.15.1...1.15.2) (2022-07-17)


### Fixes

* **aliases:** Remove snap refresh for aliases up and up ([c3e153d](https://github.com/raas-dev/configent/commit/c3e153dab88c4bbd15c83a160850f47995a07025))
* **README:** Remove fixed Arch Linux snap bug from Known Bugs ([2e3cb01](https://github.com/raas-dev/configent/commit/2e3cb01b8f38b2178a1b09ab28b20344978a2be3))


### Documentation

* **README:** Document Homebrew on Linux, on 64-bit ARMs ([9385222](https://github.com/raas-dev/configent/commit/938522253c4ec04b807994343ca054c6bfec4043))
* **README:** Tidy ([a9bdc56](https://github.com/raas-dev/configent/commit/a9bdc5662cd74bdc1e93581ca132914a7f8fc67f))

### [1.15.1](https://github.com/raas-dev/configent/compare/1.15.0...1.15.1) (2022-07-17)


### Refactor

* **install.sh:** Fix comment ([f9e6a72](https://github.com/raas-dev/configent/commit/f9e6a720c200f5718ecffef208a6165df98c660c))
* **README:** Rename screenshot ([b4df946](https://github.com/raas-dev/configent/commit/b4df94686013d6ad751e28db3bf84adffb6922f0))


### Documentation

* **README:** Add screenshot in webp format ([4bbe324](https://github.com/raas-dev/configent/commit/4bbe3246bae1c92188e96a4f810a1b1b528a4b4b))
* **README:** Add what to customize ([5cdc8ae](https://github.com/raas-dev/configent/commit/5cdc8ae2ca02873460f2085d4565be6330ee0df4))
* **README:** Clarify ([8f8846d](https://github.com/raas-dev/configent/commit/8f8846d598cb72c94e3b189e5f162a5f529676fb))
* **README:** Development ([c67389d](https://github.com/raas-dev/configent/commit/c67389dcc06f9fd3c206344bb5ef614593f8e82f))
* **README:** Document bootstrap ([d338548](https://github.com/raas-dev/configent/commit/d33854813aba14c0721948794e90700b0a69bb73))
* **README:** Fix typos ([31612e9](https://github.com/raas-dev/configent/commit/31612e98e11a52379296b27d6838c7f5b9727feb))
* **README:** Fix typos ([23c44d3](https://github.com/raas-dev/configent/commit/23c44d3cea652fdcefa0abb3fc6d1b89841df81e))
* **README:** Fix typos ([a013e97](https://github.com/raas-dev/configent/commit/a013e97fd6be77cbe4f3883bd77cdc702a457c06))
* **README:** Move screenshot ([9c60e3b](https://github.com/raas-dev/configent/commit/9c60e3bdcf19a3d58073205e5d5cd8e89559ed88))
* **README:** Move screenshot to dir ([120d672](https://github.com/raas-dev/configent/commit/120d672a757de7c6149acc5abf79de061273aa32))
* **README:** Resize screenshot ([d107bf9](https://github.com/raas-dev/configent/commit/d107bf9755620b64d4f11da81c148c192c3b0fc4))
* **README:** Sort known issues per distro ([5037e80](https://github.com/raas-dev/configent/commit/5037e809686d3c4b80c0ad3940accff32345a783))
* **README:** Tidy ([bd7e733](https://github.com/raas-dev/configent/commit/bd7e7332ba07d7c54b592852c4e665c47f26d971))
* **README:** Tidy ([ed2baf1](https://github.com/raas-dev/configent/commit/ed2baf13ffecf0fd7149e902fcb1ce80cacd52fb))
* **README:** Tidy ([8f024e5](https://github.com/raas-dev/configent/commit/8f024e59f871e56405c7eeeb790e492d48a5f968))
* **README:** Update screenshot ([4c9a052](https://github.com/raas-dev/configent/commit/4c9a05266e4e33e014054ca67b19686d5ddaba66))
* **REDME:** Add screenshot ([d002dca](https://github.com/raas-dev/configent/commit/d002dca8221c724ecffe4a5756ea3ce5b79f6b33))


### Fixes

* **README:** Fix commands for reloading the shell config ([2578daa](https://github.com/raas-dev/configent/commit/2578daae381341fad28d047edcd46824a65171a5))
* **README:** Fix typos ([b18fc83](https://github.com/raas-dev/configent/commit/b18fc830fa9d5588c71acc856320379b7b218ae8))

## [1.15.0](https://github.com/raas-dev/configent/compare/1.14.0...1.15.0) (2022-07-16)


### Features

* **lima:** Add support for Oracle Linux ([9d42af1](https://github.com/raas-dev/configent/commit/9d42af119dc7ba70428612a78baf0b0d42899c01))


### Documentation

* **README:** Add working distros ([719007f](https://github.com/raas-dev/configent/commit/719007f3f2b51c32ef5d249adb279ddabeae7a22))
* **README:** Elaborate distros and tools ([d7109be](https://github.com/raas-dev/configent/commit/d7109be30a23fbd9d5854fabd16d08b47eeeba0b))


### Fixes

* **yum:** Fix lzma-sdk not available on Oracle Linux ([69b39dd](https://github.com/raas-dev/configent/commit/69b39dd6a27a1e72285a0176b115e8a170c6ae83))
* **yum:** Fix systemctl enable snapd ([934001d](https://github.com/raas-dev/configent/commit/934001d37ae3deec05b5cdf1bd8d712ceb9a5a39))

## [1.14.0](https://github.com/raas-dev/configent/compare/1.13.0...1.14.0) (2022-07-16)


### Features

* **lima:** Add support for Arch Linux ([b31278f](https://github.com/raas-dev/configent/commit/b31278fd9b5ec9b2e59a11b7bed06edc8318f985))
* **pacman:** Add installing MS core fonts ([d2419c2](https://github.com/raas-dev/configent/commit/d2419c24c537a66e5c6da79ce2ab917a81b0d78a))
* **yay:** Use yay over pacman if yay is installed ([be968cb](https://github.com/raas-dev/configent/commit/be968cb6c866fba8a22cddb91189a2c4dd7146d3))


### Documentation

* **arch:** Note bug with snapd installation on Arch ([60f74a0](https://github.com/raas-dev/configent/commit/60f74a000660aaa53bab28a2b14520d9e5512087))


### Fixes

* **pacman:** Add gcc for brew ([83b15ab](https://github.com/raas-dev/configent/commit/83b15ab40e2b90c229760cd1cab8e9bbda5c97ff))
* **pacman:** Fix installing snap on Arch Linux ([544988a](https://github.com/raas-dev/configent/commit/544988acc283347b882882779adf6a5d40e831b4))
* **posix:** Use  over  for checking existence ([747a6f1](https://github.com/raas-dev/configent/commit/747a6f1019775b44f6a1b0facde2c491c3159f67))
* **starship:** Double command timeout due to git ([42ebe04](https://github.com/raas-dev/configent/commit/42ebe047a03ee3d97b971a5274bbb66adef4ece6))

## [1.13.0](https://github.com/raas-dev/configent/compare/1.12.0...1.13.0) (2022-07-16)


### Features

* **lima:** Add Alpine Linux 3.16 support, note brew issues ([39533a7](https://github.com/raas-dev/configent/commit/39533a7f8edbe924203ddd014ddc679e6a4169e0))
* **lima:** Add CentOS Stream 8 and AlmaLinux 8.6 ([38a26d6](https://github.com/raas-dev/configent/commit/38a26d6cf097b670bf7340b5fe80f2bc8e1bcc80))
* **lima:** Add preliminary support for Arch Linux ([ebbc1ab](https://github.com/raas-dev/configent/commit/ebbc1abf5296d8c98136c5e636ee644bc9a547a0))
* **lima:** Add Rocky Linux 3.6 support ([cc19db8](https://github.com/raas-dev/configent/commit/cc19db808533e8dee87ee59797c0030b8a61e223))


### Refactor

* **podman:** Rename VM podman-testing -> podman-ubuntu ([65dae26](https://github.com/raas-dev/configent/commit/65dae264e36dec1f24fa26ede141e2c021c782ee))


### Fixes

* **pyenv:** Fix liblzma yum package name as prerequisite for Pythons ([05f8d95](https://github.com/raas-dev/configent/commit/05f8d9509d976d3c01b53d11370eb7f8af3e2cca))
* **pyenv:** Install liblzma as prerequisite for Python ([49eb3ab](https://github.com/raas-dev/configent/commit/49eb3ab6cf5281c7ef20ca8bc34511ce4533ac5c))


### Documentation

* **README:** Add license/disclaimer badge ([8dea8ed](https://github.com/raas-dev/configent/commit/8dea8ed568a9080cc2947dfd070a3f007d73fb8e))
* **README:** Reorganize ([68be721](https://github.com/raas-dev/configent/commit/68be7211b5eebbbd5f9dcbc679211f821935ceb2))

## [1.12.0](https://github.com/raas-dev/configent/compare/1.11.0...1.12.0) (2022-07-16)


### Features

* **python:** Update Pythons ([f5123c3](https://github.com/raas-dev/configent/commit/f5123c3af6bcaa4e9951deedbe6180373764b1c6))
* **ruby:** Update Rubies ([5f4af3f](https://github.com/raas-dev/configent/commit/5f4af3ffb9101a2da8fcbc3b1b3dfac96446a285))


### Documentation

* **README:** Clarify install.sh if repo already exists ([641cf21](https://github.com/raas-dev/configent/commit/641cf21200cd472179e372d5c23de4c712c3607d))
* **README:** Clarify pulling working copy on install.sh ([5e373f8](https://github.com/raas-dev/configent/commit/5e373f8179624fbd80bd13c9fe752b9c6bb2eeeb))
* **README:** Clarify setup ([0acff3e](https://github.com/raas-dev/configent/commit/0acff3e82b18ee5ac7accf301de8a76b5ba52cfa))
* **README:** Fix typos ([cd1661a](https://github.com/raas-dev/configent/commit/cd1661a1c0858cd51636a55a974eb21bc5a32241))
* **README:** Move changelog to top ([df5b1da](https://github.com/raas-dev/configent/commit/df5b1da4a00ec35560b6270cc9beae27c0067207))
* **README:** Update known issues ([c3ddc49](https://github.com/raas-dev/configent/commit/c3ddc490fff9a50f82c10e40145030afb5e4a696))

## [1.11.0](https://github.com/raas-dev/configent/compare/1.10.0...1.11.0) (2022-07-14)


### Features

* **aliases:** Add alias for translating to English ([e2118bb](https://github.com/raas-dev/configent/commit/e2118bb92c4d5951ed5959656285e4861f42aaeb))


### Fixes

* **pre-commit:** Fix pre-commit path in docs ([b037750](https://github.com/raas-dev/configent/commit/b0377507e48c2d9e2eb17cff7b71b0275b802288))


### Documentation

* **README:** Add note on overriding existing dotfiles ([14e51c0](https://github.com/raas-dev/configent/commit/14e51c021110ee54457e6891b61c2d7bbde641b0))
* **README:** Fix typos ([23beaa0](https://github.com/raas-dev/configent/commit/23beaa0f04699ce9fe0fa76f6d4ab227abee3373))
* **README:** Update distros tested on ([eed6b65](https://github.com/raas-dev/configent/commit/eed6b659cf807f63e4ecb07b5af317a3d1dbb2c1))

## [1.10.0](https://github.com/raas-dev/configent/compare/1.9.0...1.10.0) (2022-07-12)


### Features

* **got:** Add got (google translator) cli ([112373a](https://github.com/raas-dev/configent/commit/112373af913834b44c84127eec8163870a188957))


### Fixes

* **tmux:** Use tmux 3.2 due to broken termcap on 3.3 ([ed4c6d3](https://github.com/raas-dev/configent/commit/ed4c6d321dd2653bd098ad85afb78c6d0c6f2443))

## [1.9.0](https://github.com/raas-dev/configent/compare/1.8.0...1.9.0) (2022-05-24)


### Features

* **lima:** Add hostResolver for Docker ([b37ba2c](https://github.com/raas-dev/configent/commit/b37ba2c73557203c4d1f417c4b46ac57a32436cd))
* **lima:** Update images ([43492f7](https://github.com/raas-dev/configent/commit/43492f7c430e9c2c0d3ee5547f938b3b5bb3ff9d))


### Fixes

* **shell:** Fix export SHELL on brew installed shells ([5cafd07](https://github.com/raas-dev/configent/commit/5cafd072b887cf23207082a820f234ad8529d4b3))

## [1.8.0](https://github.com/raas-dev/configent/compare/1.7.0...1.8.0) (2022-04-29)


### Features

* **docker:** Brew install ctop on GNU/Linux ([698daed](https://github.com/raas-dev/configent/commit/698daed3430c9d9a7a73959854d5f03a3a12cf26))


### Refactor

* **zsh:** Remove zplug plugin source as github by default ([7186403](https://github.com/raas-dev/configent/commit/718640380d894518c4f6449b6dcd869c861bdb79))


### Fixes

* **git:** Alias git out push changes and tags ([46c5716](https://github.com/raas-dev/configent/commit/46c57164b6454b58dd76065f794343c430c04981))
* **python:** Use brew to install pre-requisites for Pythons ([1ceb0ce](https://github.com/raas-dev/configent/commit/1ceb0ce25729e5386af535e49c9cc70dc1590e98))
* **release:** Add updating CHANGELOG for prereleases ([576c93c](https://github.com/raas-dev/configent/commit/576c93c61b509949ac3aee292fa803b94d948c2b))
* **vscode:** Fix kubectl mac path ([9e63bbb](https://github.com/raas-dev/configent/commit/9e63bbbceb36eb5ca6312d725cae39ed6bb1f7de))
* **zsh:** Load zsh-syntax-highlighting ([6091d66](https://github.com/raas-dev/configent/commit/6091d6620fdba4d8913293ba0c8137193cf4fab7))

## [1.7.0](https://github.com/raas-dev/configent/compare/1.6.1...1.7.0) (2022-04-17)


### Features

* **git:** alias git out to follow tags ([ce9f4e8](https://github.com/raas-dev/configent/commit/ce9f4e8c3158d4b9479b97c7d740c957ec364194))
* **npx:** Add alias for standard-version ([94263f4](https://github.com/raas-dev/configent/commit/94263f4f3fd3091e1c1f690433686d232901c0d7))
* **vscode:** Add kubectl path ([eb63e6c](https://github.com/raas-dev/configent/commit/eb63e6ca59a2170d5110deaba2764c99ad8f798d))
* **vscode:** Update list of vscode extensions ([0e94389](https://github.com/raas-dev/configent/commit/0e94389c0f1767d29d9be292dfa2a7752dbd6f9d))


### Bug Fixes

* **release:** Fix generating changes for latest tag ([0a5837f](https://github.com/raas-dev/configent/commit/0a5837f0d30464d4122bdeaaa3804c5efcc9bc36))
* **vscode:** Fix terminal contrast ([bfd1b87](https://github.com/raas-dev/configent/commit/bfd1b875f53e1898677cf082193baa394d9e11b6))

## 1.6.2 (2022-03-27)

#### Fixes

* (release): Fix generating changes for latest tag

Full set of changes: [`1.6.1...1.6.2`](https://github.com/raas-dev/configent/compare/1.6.1...1.6.2)

## 1.6.1 (2022-03-27)

#### Fixes

* (chanagelog): Reformat CHANGELOG with auto-changelog

Full set of changes: [`1.6.0...1.6.1`](https://github.com/raas-dev/configent/compare/1.6.0...1.6.1)

## 1.6.0 (2022-03-27)

#### New Features

* (python): Update and use Python 3.10
* (ruby): Upgrade Ruby to 3.1
* (python): Downgrade to Python 3.9 due to broken packages
* (vscode): Disable multiline paste warning
* (aliases): Add naabu via nixery
* (iac): Add hadolint for Dockerfile linting, remove dockle
* (lima): Bootstrap on background
#### Fixes

* (release): Patch auto-changelog error with jinja2

Full set of changes: [`1.5.0...1.6.0`](https://github.com/raas-dev/configent/compare/1.5.0...1.6.0)

## 1.5.0 (2022-02-16)

#### New Features

* (iac): Add aws-vault
* (gdrive): Remove installation of Google Drive
* (vscode): Disable GitLens welcome, Devskim enable BP
* (vscode): disable font aliasing
* (vscode): Decrease font size
* (casks): Optional peripheral drivers
* (iac): Install awscli and aws_completer
#### Fixes

* (profile): Check if brew present before bash_completion

Full set of changes: [`1.4.0...1.5.0`](https://github.com/raas-dev/configent/compare/1.4.0...1.5.0)

## 1.4.0 (2022-01-02)

#### New Features

* (tmux): Increase scroll speed
* (lima): forward SSH agent to Ubuntu VM
* (zsh): Improve zsh options for handling history
* (zsh): Add plugin for colored man pages
* (tmux): Double scroll speed
* (vim): Set paste mode by default
* (vim): Remove neocomplete to not override indent settings
* (IAC): Add semgrep to brew installed linters
#### Fixes

* (shells): Load bash-completion in profile
* (profile): move zoxide from shell rcs to profile
* (profile): move starship from shell rcs to profile
* (vim): Do not error highlight POSIX subshells
#### Refactorings

* (desktop): Remove long unused xfce4 configs
#### Docs

* (README): Add current version
* (README): Remove installing from a private git repo
* (README): Add latest version

Full set of changes: [`1.3.4...1.4.0`](https://github.com/raas-dev/configent/compare/1.3.4...1.4.0)

## 1.3.4 (2021-12-30)

#### Fixes

* (versioning): Update version in README.md

Full set of changes: [`1.3.3...1.3.4`](https://github.com/raas-dev/configent/compare/1.3.3...1.3.4)

## 1.3.3 (2021-12-30)

#### Fixes

* (install): Add versioning
#### Docs

* (development): Link to changelog
#### Others

* (release): Fix checking if working copy dirty
* (releases): Add versioning to install.sh
* (release): Create releases only from undirty trunk

Full set of changes: [`1.3.2...1.3.3`](https://github.com/raas-dev/configent/compare/1.3.2...1.3.3)

## 1.3.2 (2021-12-29)

#### Fixes

* (precommit): Add default_stage to prevent hooks running twice
* (precommit): Install commit-msg hook in addition to pre-commit
#### Others

* (release): Explicitly use pip3
* (release): Do not generate CHANGELOG.md if no commits

Full set of changes: [`1.3.1...1.3.2`](https://github.com/raas-dev/configent/compare/1.3.1...1.3.2)

## 1.3.1 (2021-12-29)

#### Fixes

* (gitconfig): git out to push both commits and tags

Full set of changes: [`1.3.0...1.3.1`](https://github.com/raas-dev/configent/compare/1.3.0...1.3.1)

## 1.3.0 (2021-12-29)

#### New Features

* (gitconfig): git out to push tags

Full set of changes: [`1.2.2...1.3.0`](https://github.com/raas-dev/configent/compare/1.2.2...1.3.0)

## 1.2.2 (2021-12-29)

#### Fixes

* (aliases): prefix npx powered aliases by npx-
#### Others

* (changelog): update changelog
* (commit): disable release.sh on commit

Full set of changes: [`1.2.1...1.2.2`](https://github.com/raas-dev/configent/compare/1.2.1...1.2.2)

## 1.2.1 (2021-12-29)

#### Refactorings

* (profile): support only multi-user nix installation
#### Others

* (sh): tidy release scripts
* Tidy up release files

Full set of changes: [`1.2.0...1.2.1`](https://github.com/raas-dev/configent/compare/1.2.0...1.2.1)

## 1.2.0 (2021-12-29)

#### New Features

* Add commitizen
