# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.172.2](https://github.com/raas-dev/configent/compare/1.172.1...1.172.2) (2025-10-27)


### Fixes

* **dotfiles:** add alias for echo command ([ac156b4](https://github.com/raas-dev/configent/commit/ac156b413bf6b2d886e8d384777dbed653c1d7a2))
* **mcp:** add missing -y flag and specify latest versions in args ([cccb494](https://github.com/raas-dev/configent/commit/cccb4942076823ea6376b4a5693b25d4d342953a))
* **mcp:** unify and simplify context7 mcp configuration ([1fc753b](https://github.com/raas-dev/configent/commit/1fc753bf7291c69d0627b9128c750960363eb48e))

### [1.172.1](https://github.com/raas-dev/configent/compare/1.172.0...1.172.1) (2025-10-27)


### Fixes

* **browsing:** remove entire browsing skill and related files ([3a1dcdc](https://github.com/raas-dev/configent/commit/3a1dcdcb0abaa932a011847788b7fcbe08b05661))
* **claude-code:** Add browsing skill ([91f4248](https://github.com/raas-dev/configent/commit/91f4248cf4d7640b06626432ac2c16a40ef72bca))
* **claude-code:** Cleanup skills ([1bc12a3](https://github.com/raas-dev/configent/commit/1bc12a3b8fce817206245a0e2adf32d051e57d61))
* **claude-code:** update .gitignore for nested node_modules and lock files ([343e2ef](https://github.com/raas-dev/configent/commit/343e2ef0f150f0c0a0783bf4efff5018b0dd2d56))
* **claude-code:** update .gitignore to exclude node_modules directory ([c7b67de](https://github.com/raas-dev/configent/commit/c7b67deefedb12f7dd210b31594fc9be32abccf0))
* **dotfiles:** fix unzip alias to use 7zz instead of 7z ([7eef751](https://github.com/raas-dev/configent/commit/7eef751490a343e120fb7f86d4ef3cb4f73af984))
* **mcp:** reorder and clean duplicates in mcp.json configuration ([6305404](https://github.com/raas-dev/configent/commit/63054041d798a6ec3cd8d2270c92b74d6dd04e5d))
* **opencode:** fix config for skillz local command and args formatting in mcp.json ([c6e9139](https://github.com/raas-dev/configent/commit/c6e91396e0abec302274d00190f9e9ac90a7a127))
* **opencode:** Remove opencode-skills ([3f0b2f9](https://github.com/raas-dev/configent/commit/3f0b2f981994d2fa1f9a9a9e4afa0dac589d6bf0))
* **settings:** add missing '-y' flag to chrome-devtools MCP args ([06cc072](https://github.com/raas-dev/configent/commit/06cc07240bfbee4291542a895eb3d0ff461e382c))

## [1.172.0](https://github.com/raas-dev/configent/compare/1.171.0...1.172.0) (2025-10-26)


### Features

* **claude-code:** Add agents and commands ([0f771bc](https://github.com/raas-dev/configent/commit/0f771bc7b86f8733bfd883c7cd3029c4c8c05f8b))


### Fixes

* **ai_commit:** correct variable name for additional constraints in commit message logic ([403d2a4](https://github.com/raas-dev/configent/commit/403d2a4a476300891f444cbdceca321b9ebc904a))
* **claude-code:** Add ComposioHQ awesome-claude-skills ([cb68447](https://github.com/raas-dev/configent/commit/cb6844734fece862bff427b49c4e7efa443ae69b))
* **claude-code:** correct README copy command formatting ([87bebcd](https://github.com/raas-dev/configent/commit/87bebcdfae82869f4d7d28388520d1be790e25c4))
* **claude-code:** update README clone commands to use shallow clone with pull fallback ([523cc2b](https://github.com/raas-dev/configent/commit/523cc2b528f018f197aa0cb8e5a5eb800915b94a))
* **claude:** add playwright-skill for browser automation with dev server detection ([9ec3b64](https://github.com/raas-dev/configent/commit/9ec3b640b984f96c3dbcc62dfc451ec051eedb3a))
* **codespellrc:** update skip patterns in codespell configuration ([972510a](https://github.com/raas-dev/configent/commit/972510ae45a80726b7245758832e0460c3c84ce1))
* **config:** update claude-skills config skill source references ([9f5e715](https://github.com/raas-dev/configent/commit/9f5e7155337852d65432c72f6674e5997ee02ed4))
* **cursor:** add desktop-commander MCP ([027eef6](https://github.com/raas-dev/configent/commit/027eef6ec977565ea68926ce032c5a24d3478357))
* **dotfiles:** update ai_agent aliases to use npx opendia and tavily-mcp ([92cb069](https://github.com/raas-dev/configent/commit/92cb069cd8392fbcc7e75ab12263870bf876b7f7))
* **mcp:** enable headless mode for chrome-devtools MCP command ([0a60c99](https://github.com/raas-dev/configent/commit/0a60c99332bae554a133725c92fd49f444d3195c))
* **mcp:** update claude-skills path and replace command with skillz ([66031ad](https://github.com/raas-dev/configent/commit/66031ad6d70885f41aff3bec33fb4a8f9d49a346))
* **postinstall_claude-code:** backup and symlink agents, commands, and skills directories ([dff8988](https://github.com/raas-dev/configent/commit/dff8988911eeb5ff7350c611d82bfd4fa72deb5b))
* **pre-commit-config:** restrict shebang check to non-skill files ([ed0164a](https://github.com/raas-dev/configent/commit/ed0164a5099dcf2713d5bfb60e40e1166ad7eb4a))
* **README:** correct clone command paths in claude-code instructions ([3a38caf](https://github.com/raas-dev/configent/commit/3a38caf850137f86eba294064a09ba045e3f92a3))
* **vscode:** Remove Kilo Code extension ([473e30f](https://github.com/raas-dev/configent/commit/473e30f3ebe961b8da6d2914a38ed4866a389bb4))

## [1.171.0](https://github.com/raas-dev/configent/compare/1.170.2...1.171.0) (2025-10-24)


### Features

* **claude-code:** Add skills library ([5256140](https://github.com/raas-dev/configent/commit/5256140d5b85baaa023065f9a95785374a6830ca))

### [1.170.2](https://github.com/raas-dev/configent/compare/1.170.1...1.170.2) (2025-10-24)


### Fixes

* **mcp:** add claude-skills MCP config and integration ([ef6cd6f](https://github.com/raas-dev/configent/commit/ef6cd6f0d5c80e298f0510cb9538946d7ad29760))
* **opencode:** add support for skills via plugins ([8c76b58](https://github.com/raas-dev/configent/commit/8c76b587c8c96262cc37acd42d74251abd7da9f4))
* **postinstall_opencode:** correct skills symlink path in postinstall script ([026aa27](https://github.com/raas-dev/configent/commit/026aa27b7d239bb144d92ac6a3beacd63849dd2a))

### [1.170.1](https://github.com/raas-dev/configent/compare/1.170.0...1.170.1) (2025-10-18)


### Fixes

* **project:** remove obsolete project tool file ([230cfac](https://github.com/raas-dev/configent/commit/230cfac3430bd84c15ffb14e1ca6ae98c6618e3f))

## [1.170.0](https://github.com/raas-dev/configent/compare/1.169.0...1.170.0) (2025-10-18)


### Features

* **opencode:** add opencode-ai tool support and configuration ([ddc2a7a](https://github.com/raas-dev/configent/commit/ddc2a7a3af0bba28d8e27858e24bf360ad8dd88c))


### Fixes

* **dotfiles:** add --wait flag to VISUAL editor setting ([9609000](https://github.com/raas-dev/configent/commit/96090007e91bfebea328adf18117924f0a58a4f8))
* **dotfiles:** correct windsurf alias and code alias assignment ([3029e40](https://github.com/raas-dev/configent/commit/3029e40c85b96ef3fa116f6cde0efa1c80298852))
* **dotfiles:** export DEFAULT_IDE for profile environment ([20d4551](https://github.com/raas-dev/configent/commit/20d455192081b169a161dbe6300a2ec65bafb020))
* **dotfiles:** make editor configurable with DEFAULT_IDE fallback ([daaa764](https://github.com/raas-dev/configent/commit/daaa76425af0c7a80a136a7353ea47c235a6dc86))
* **pre-commit-config:** exclude mcp.json from pretty-format-json hook ([fe64720](https://github.com/raas-dev/configent/commit/fe647206d34affb8429e1575bfe3eba5c2a062bc))
* **prompts:** correct typo in commit message instruction template ([ac08ab9](https://github.com/raas-dev/configent/commit/ac08ab90bce8318f227b77f9a008fe83673cc48d))

## [1.169.0](https://github.com/raas-dev/configent/compare/1.168.9...1.169.0) (2025-10-16)


### Features

* **ai:** Add gemini-cli ([c0068cb](https://github.com/raas-dev/configent/commit/c0068cbafd7481794e2adec8dcdc759afbdb2d9f))
* **claude-code:** add postinstall script and configuration ([6fc0e82](https://github.com/raas-dev/configent/commit/6fc0e82c099f814969b9d9d9dab8dde5d98aed56))


### Fixes

* **config.lock:** update several tool versions and checksums ([e8343a8](https://github.com/raas-dev/configent/commit/e8343a833026c5298b6313b2efba127ee3019a11))
* **dotfiles:** remove deprecated upstash context7-mcp alias usage ([918df0e](https://github.com/raas-dev/configent/commit/918df0e0783df501f0f7fd25f2299bd47398c306))
* **pre-commit-config:** update pretty-format-json to exclude settings.json ([4457576](https://github.com/raas-dev/configent/commit/4457576b077645ed5bfec86486dbe13ccaf92285))
* **settings:** move alwaysThinkingEnabled to end of settings.json ([d9d8c70](https://github.com/raas-dev/configent/commit/d9d8c70dbec9eb54ef6730896dfa092de2226bae))
* **vscode:** adjust diffEditor and editor layout settings ([ba6703a](https://github.com/raas-dev/configent/commit/ba6703a1a39727b81c6b32f945bc97f6f5980745))
* **vscode:** adjust SCM graph page size setting to 20 ([4ae44f6](https://github.com/raas-dev/configent/commit/4ae44f64d56781c4b3d1f40e9e031c3053c85ccd))
* **vscode:** change GitLens commitDetails files layout to tree ([54adddb](https://github.com/raas-dev/configent/commit/54adddb31ac7acd9e3a70884f90eef381bee2dc2))
* **vscode:** disable GitLens menus in settings ([cf8ec4d](https://github.com/raas-dev/configent/commit/cf8ec4d16efdcf756423b1ad957a9cca6afa365f))
* **vscode:** disable terminal tabs in integrated terminal settings ([50332cc](https://github.com/raas-dev/configent/commit/50332cc1bb9b02ee79fe928565608360a7d3b481))
* **vscode:** enable deferred startup finished activation setting ([9776579](https://github.com/raas-dev/configent/commit/9776579b34a59d06b94dc059ab41165dcb83d592))
* **vscode:** increase timeline view page size to 20 ([1694e21](https://github.com/raas-dev/configent/commit/1694e210f82eb33dc2e77577a717bdb15ac8936b))
* **vscode:** refine SCM and GitLens view settings ([348f089](https://github.com/raas-dev/configent/commit/348f089996f976aea7edaab5f98bff775bbfc4da))
* **vscode:** remove GitLens views page item limit setting ([4eff01a](https://github.com/raas-dev/configent/commit/4eff01a64de6b2ca4cd36063b527cfcbfbe05e72))
* **vscode:** unify GitLens view layouts to tree style ([bbf2669](https://github.com/raas-dev/configent/commit/bbf2669a2ee81e84dc6211c70c5238bbac5707bf))
* **vscode:** update cSpell settings for spell checking and suggestions ([733b85b](https://github.com/raas-dev/configent/commit/733b85be999594da4a12893687298f856fb84e6a))
* **vscode:** update git and scm settings for better repository handling ([c1c0340](https://github.com/raas-dev/configent/commit/c1c0340df338b69c789f1ecf7aaaf3d2d10de6e5))
* **vscode:** update GitLens and diff editor settings ([a6bd997](https://github.com/raas-dev/configent/commit/a6bd997b5f49591f6d4d0afa2a63a79849e15464))
* **vscode:** update GitLens settings adding heatmap and line locations ([3fb8b60](https://github.com/raas-dev/configent/commit/3fb8b603bc7bbe8e708cd51a5bcac34d0286dc50))
* **vscode:** update terminal tab visibility and hide on startup settings ([a6e6fbd](https://github.com/raas-dev/configent/commit/a6e6fbde8622296a39f1f366fdfc3183a1fa4edd))

### [1.168.9](https://github.com/raas-dev/configent/compare/1.168.8...1.168.9) (2025-10-15)


### Fixes

* **ai_commit:** correctly include git diff and recent headlines in message ([df63685](https://github.com/raas-dev/configent/commit/df6368516b658cbabaea5d6916236184fab80f6f))
* **ai_commit:** validate system instructions file presence ([2c10842](https://github.com/raas-dev/configent/commit/2c1084271370ae66a4804220345043ba078428df))
* **keybindings:** update and add keybindings for composerMode commands ([2b9ab83](https://github.com/raas-dev/configent/commit/2b9ab837355f90cc617d326618ea2aa13a2ec59a))
* **setup_duti:** add associations for log and mdc file types ([dfd17b4](https://github.com/raas-dev/configent/commit/dfd17b4634bde8cf0e1176d95f76eaef7a8fa82b))
* **vscode:** decrease terminal restore delay and keep existing terminals open ([2ca9509](https://github.com/raas-dev/configent/commit/2ca950903d052ee1fcf02b4a5266010dc7b087b0))
* **vscode:** set restoreTerminals.keepExistingTerminalsOpen to false ([10554e2](https://github.com/raas-dev/configent/commit/10554e2cfedc5fc5fcb66488d5ad1a3b9c6e2ca9))

### [1.168.8](https://github.com/raas-dev/configent/compare/1.168.7...1.168.8) (2025-10-14)


### Fixes

* **ai_commit:** add error handling and validations for commit generation ([47c80d7](https://github.com/raas-dev/configent/commit/47c80d77e021f4c7b082ca6f13853a8fc23f1cf0))
* **ai_commit:** remove duplicate success messages after committing ([ee5be89](https://github.com/raas-dev/configent/commit/ee5be895ecdf3fce1307e39176a44fdab011c660))
* **dotfiles:** update VISUAL to use DEFAULT_IDE instead of EDITOR ([365046f](https://github.com/raas-dev/configent/commit/365046fc05f504a0c237f3bbd0d297951a650f0e))

### [1.168.7](https://github.com/raas-dev/configent/compare/1.168.6...1.168.7) (2025-10-11)


### Fixes

* **bin:** clarify commit message rules and emphasize single-line output ([c279ad4](https://github.com/raas-dev/configent/commit/c279ad492dd2bb932008161f4c6f218530b766f6))

### [1.168.6](https://github.com/raas-dev/configent/compare/1.168.5...1.168.6) (2025-10-10)


### Fixes

* **ide:** change default IDE from Cursor to VS Code ([61c4fa8](https://github.com/raas-dev/configent/commit/61c4fa8018120ed9d9430bd64a27bbbec55b0ec4))
* **setup_duti:** redirect command output to /dev/null for cursor and windsurf ([12193d2](https://github.com/raas-dev/configent/commit/12193d2e3fb5592c5a38d2097bcc4adcd664d170))
* **setup_duti:** register vscode:// URL scheme handler ([c5beb6b](https://github.com/raas-dev/configent/commit/c5beb6ba4c8e2cfd46632d9946ed1f1d16090cc0))
* **vscode:** add marketplace URL configuration for extensions ([49adc36](https://github.com/raas-dev/configent/commit/49adc3680e9fc11d8b6dcf4b851963aecfc143ff))
* **vscode:** auto-detect IDE from environment instead of BIN_NAME ([0080d08](https://github.com/raas-dev/configent/commit/0080d08f16d6d1f02cbefce8934c432e33d6a5d0))
* **vscode:** disable cursor-workspace MCP discovery ([8b33c9a](https://github.com/raas-dev/configent/commit/8b33c9aa1e34da08d08d86e00fc76a63a159fec0))
* **vscode:** update extension list with cursorpyright and terminals ([37635b7](https://github.com/raas-dev/configent/commit/37635b7036ab8ae62c36107de449d6ce25ebb368))

### [1.168.5](https://github.com/raas-dev/configent/compare/1.168.4...1.168.5) (2025-10-09)


### Fixes

* **Chat:** set model to GPT-4.1 in chatmode configuration ([65e8870](https://github.com/raas-dev/configent/commit/65e8870388319a55849669bf7bf3f526840aac25))
* **vscode:** remove GitKraken and Pylance tools, enable auto-approve ([fa84a09](https://github.com/raas-dev/configent/commit/fa84a09a2794b29d568c359ba24b7f3d9d95de00))

### [1.168.4](https://github.com/raas-dev/configent/compare/1.168.3...1.168.4) (2025-10-09)


### Fixes

* **setup_ide:** change VS Code MCP config to use Cursor directory ([56fcdbe](https://github.com/raas-dev/configent/commit/56fcdbe53659d0296f63a958453bf29e8b9f159b))

### [1.168.3](https://github.com/raas-dev/configent/compare/1.168.2...1.168.3) (2025-10-09)


### Fixes

* **prompts:** add Chat chatmode with first-principles assistant ([582bbf4](https://github.com/raas-dev/configent/commit/582bbf4adf45a1431545e9f50c7abdda08b73e12))
* **setup_ide:** move path variable declarations to top of script ([0ca757f](https://github.com/raas-dev/configent/commit/0ca757f38bb292581b1c9be612a0596fe252a7fb))
* **vscode:** add MCP server configuration and enable gallery ([48630cb](https://github.com/raas-dev/configent/commit/48630cb79eeb4102bd9819c9a03314b86d0d7af2))
* **vscode:** update AI assistant extensions list ([851e557](https://github.com/raas-dev/configent/commit/851e5577fc5d0de43e48a384a4b4eb14efb2a79a))

### [1.168.2](https://github.com/raas-dev/configent/compare/1.168.1...1.168.2) (2025-10-05)


### Fixes

* **profile:** add PLAYWRIGHT_BROWSERS_PATH environment variable ([76d33b7](https://github.com/raas-dev/configent/commit/76d33b789ae3485ebcb075db58019589865f20cf))

### [1.168.1](https://github.com/raas-dev/configent/compare/1.168.0...1.168.1) (2025-10-01)


### Fixes

* **mcp:** add peekaboo server configuration ([8cd7d0f](https://github.com/raas-dev/configent/commit/8cd7d0feb0a6b70266d1d7fab2e233e663cebbe0))
* **profile:** correct Lumen AI model name format ([dd2e71d](https://github.com/raas-dev/configent/commit/dd2e71d7c92947d78a9265962dcb35cc3baba09b))
* **profile:** update lumen ai model to claude-sonnet-4.5 ([5d451a7](https://github.com/raas-dev/configent/commit/5d451a7b3b66e0c7ee39db0470c1cde48f51db9e))

## [1.168.0](https://github.com/raas-dev/configent/compare/1.167.14...1.168.0) (2025-09-22)


### Features

* **act:** add GitHub Actions runner configuration ([77cd599](https://github.com/raas-dev/configent/commit/77cd599ba18bbfc2e85b74d4a632654311decfcc))

### [1.167.14](https://github.com/raas-dev/configent/compare/1.167.13...1.167.14) (2025-09-21)


### Fixes

* **aliases:** add bandit and codespell uvx aliases ([0f3ae17](https://github.com/raas-dev/configent/commit/0f3ae17d6d4c5e2f009da0de160233784e1e1e9d))
* **aliases:** add quotes around bandit command with brackets ([684f6b7](https://github.com/raas-dev/configent/commit/684f6b74fe37fc626961ab801b60612c2da9037b))
* **mise:** add act tool configuration ([32a42a9](https://github.com/raas-dev/configent/commit/32a42a9f43d6d5eeb9b0a1903e833f4674406872))

### [1.167.13](https://github.com/raas-dev/configent/compare/1.167.12...1.167.13) (2025-09-20)


### Fixes

* **aliases:** remove redundant editable install in venv function ([d0ca1ec](https://github.com/raas-dev/configent/commit/d0ca1ecada700b5c46eae3a36dd49525d7c0826e))
* **mcp:** update server configs and add API key env vars ([6befe4c](https://github.com/raas-dev/configent/commit/6befe4cb701ee3b47f32511f1c996e4e6cf7ac50))

### [1.167.12](https://github.com/raas-dev/configent/compare/1.167.11...1.167.12) (2025-09-20)


### Fixes

* **aliases:** filter comments and handle empty pip freeze output ([1d64d18](https://github.com/raas-dev/configent/commit/1d64d18abd876c759512d578782d54b6bb5426f0))
* **aliases:** split printf and echo commands in ai_agent function ([d638caf](https://github.com/raas-dev/configent/commit/d638cafa1875ae2d400492b4058fe64650be21ee))
* **bin:** upgrade pip before installing packages and improve pipclear ([18f879b](https://github.com/raas-dev/configent/commit/18f879bf0cdb4f5b95e2fbcfeebe5b71dc5aca9e))

### [1.167.11](https://github.com/raas-dev/configent/compare/1.167.10...1.167.11) (2025-09-19)


### Fixes

* **aliases:** add --no-managed-python flag to uv sync command ([5bd4f6c](https://github.com/raas-dev/configent/commit/5bd4f6cf15c69de2f7b74c35843b407eee475f0c))
* **aliases:** add prompts-mcp extension to ai_agent function ([fd0f7d7](https://github.com/raas-dev/configent/commit/fd0f7d7392d914decba1e30582bac150bb3ec34d))

### [1.167.10](https://github.com/raas-dev/configent/compare/1.167.9...1.167.10) (2025-09-19)


### Fixes

* **mise:** Fix postinstall script name ([33d2c48](https://github.com/raas-dev/configent/commit/33d2c48daaef4a60acece6d1a9f76442b3d40201))

### [1.167.9](https://github.com/raas-dev/configent/compare/1.167.8...1.167.9) (2025-09-18)


### Fixes

* **ai:** simplify extension handling with dynamic arguments ([db0d6cd](https://github.com/raas-dev/configent/commit/db0d6cd8a0be8728f457291231fb6a4414e14c92))
* **aliases:** add interactive and resume flags to ai function ([7016cbd](https://github.com/raas-dev/configent/commit/7016cbded0dbb07f896b49a5b00c97e6f08e1218))
* **aliases:** add parameter handling and debug output to ai function ([d4fe7c1](https://github.com/raas-dev/configent/commit/d4fe7c1419742eb64151f0c9cdcc7f938c85382a))
* **aliases:** add recipe explanation output to ai function ([b3a84b0](https://github.com/raas-dev/configent/commit/b3a84b0b9043556f2410bcb53824c4f35225690b))
* **aliases:** separate aliases for ai assistants and ai agents ([424d161](https://github.com/raas-dev/configent/commit/424d161be05a5cb284437d3bcfdd6fc750bfdaa7))
* **aliases:** simplify ai_agent extension commands ([407208f](https://github.com/raas-dev/configent/commit/407208f5514e7fa6d42a30774f8f1cc3aa7451ad))
* **config:** update MCP extension arguments and reorder extensions ([5f4b63d](https://github.com/raas-dev/configent/commit/5f4b63db2f8857e9a89c3e562b30320d06c0fde4))

### [1.167.8](https://github.com/raas-dev/configent/compare/1.167.7...1.167.8) (2025-09-14)


### Fixes

* **goose:** add .goosehints configuration file ([647d7d7](https://github.com/raas-dev/configent/commit/647d7d71c0e735a15326514912dc35700caf6157))

### [1.167.7](https://github.com/raas-dev/configent/compare/1.167.6...1.167.7) (2025-09-14)


### Fixes

* **aliases:** improve ai function argument handling and formatting ([bd73ce3](https://github.com/raas-dev/configent/commit/bd73ce3b717e1af2407b954f71c4a9b21bca7194))

### [1.167.6](https://github.com/raas-dev/configent/compare/1.167.5...1.167.6) (2025-09-14)


### Fixes

* **goose:** add gitignore to exclude all files except config ([5d85817](https://github.com/raas-dev/configent/commit/5d8581763b95571f77f97fe3bf3268c1ae13cadb))

### [1.167.5](https://github.com/raas-dev/configent/compare/1.167.4...1.167.5) (2025-09-14)


### Fixes

* **ai:** Remove fast-agent ([6e771fc](https://github.com/raas-dev/configent/commit/6e771fca0f88cb4fa978a01958d1a4c92a78e747))
* **gptme:** Fix gptme config ([d604a86](https://github.com/raas-dev/configent/commit/d604a866378ec88a6eed94b65688ff352055f1b7))
* **mise:** comment out aichat tool configuration ([1f147f3](https://github.com/raas-dev/configent/commit/1f147f3e6fbf47251a2de4b8c83c5191d752beb5))

### [1.167.4](https://github.com/raas-dev/configent/compare/1.167.3...1.167.4) (2025-09-14)


### Fixes

* **vscode:** remove cursorpyright extension ([8f4f432](https://github.com/raas-dev/configent/commit/8f4f43249acf56589d858be720e999a77e196a44))

### [1.167.3](https://github.com/raas-dev/configent/compare/1.167.2...1.167.3) (2025-09-14)


### Fixes

* **ai:** Simplify prompts library ([bc10f13](https://github.com/raas-dev/configent/commit/bc10f132cd109553c4dc7c09d741887f586af232))

### [1.167.2](https://github.com/raas-dev/configent/compare/1.167.1...1.167.2) (2025-09-14)


### Fixes

* **ai:** Remove continue ([b87afc1](https://github.com/raas-dev/configent/commit/b87afc115592a55885dd0969c5d89293cc96288c))

### [1.167.1](https://github.com/raas-dev/configent/compare/1.167.0...1.167.1) (2025-09-14)


### Fixes

* **ai:** Remove legacy aichat setup ([33707a2](https://github.com/raas-dev/configent/commit/33707a20a17122a26d4622542b0940615a0f288a))
* **ai:** Update instructions library ([346a191](https://github.com/raas-dev/configent/commit/346a191261a7d28ffd13c1c0f4da720b5f61d941))
* **aliases:** rename system prompt file from chat.md to system.md ([8e300d9](https://github.com/raas-dev/configent/commit/8e300d957ea22dabd45ed3621eaad6122cc67c33))

## [1.167.0](https://github.com/raas-dev/configent/compare/1.166.1...1.167.0) (2025-09-14)


### Features

* **ai:** Prefer goose over aichat for MCP support ([d77e39f](https://github.com/raas-dev/configent/commit/d77e39fa01454af42f04785820ae7349eefa67d5))


### Fixes

* **aliases:** Alias goose to a ([f97ac69](https://github.com/raas-dev/configent/commit/f97ac69fd5b30ba6f3f9cf3c8aa58ebf2bb512cc))

### [1.166.1](https://github.com/raas-dev/configent/compare/1.166.0...1.166.1) (2025-09-14)


### Fixes

* **goose:** Install goose via ubi ([431b084](https://github.com/raas-dev/configent/commit/431b084910385a38a2b29bb52728957516a72f3c))

## [1.166.0](https://github.com/raas-dev/configent/compare/1.165.1...1.166.0) (2025-09-13)


### Features

* **ai:** add alias _ to use ai agents via goose ([5fbc319](https://github.com/raas-dev/configent/commit/5fbc3191d2860c190793a7dfef97a8533ee9ca22))


### Fixes

* **aichat:** add models-override.yaml configuration management ([a097446](https://github.com/raas-dev/configent/commit/a09744669922e098d130dda9a91bd33a7daf9a4c))

### [1.165.1](https://github.com/raas-dev/configent/compare/1.165.0...1.165.1) (2025-09-13)


### Fixes

* **goose:** symlink entire config directory instead of config.yaml ([e0fea81](https://github.com/raas-dev/configent/commit/e0fea817f3e8a56cae016b16114aba296ad6493c))

## [1.165.0](https://github.com/raas-dev/configent/compare/1.164.5...1.165.0) (2025-09-13)


### Features

* **goose:** add goose installation and configuration ([f3028b5](https://github.com/raas-dev/configent/commit/f3028b5d8fc92a58006ec6627e6dd3884fea3795))


### Fixes

* **mise:** update TOML table syntax from single to double brackets ([aa19087](https://github.com/raas-dev/configent/commit/aa190870b62b4da7d1f98b4a0f4764a1c0773bda))
* **prompts:** refine chat assistant role and task instructions ([32689a5](https://github.com/raas-dev/configent/commit/32689a586a901bae66e92f509642de6993582ec1))

### [1.164.5](https://github.com/raas-dev/configent/compare/1.164.4...1.164.5) (2025-09-13)


### Fixes

* **ai_commit:** add chore preference for dependency changes ([8c44865](https://github.com/raas-dev/configent/commit/8c44865507e85ffa9356e64a9a2fbcf41b36b0a4))
* **ai_commit:** clarify scope rules and add formatting constraints ([b3ee5bb](https://github.com/raas-dev/configent/commit/b3ee5bbde6a3938be6bbfa8b6b0f422bf267f0b9))
* **ai_commit:** clarify scope selection logic for generic names ([1955d23](https://github.com/raas-dev/configent/commit/1955d2313e108024ce2d27a4f2dd3a9786f9b69a))
* **ai_commit:** handle dotfiles and generic names in scope rules ([bed3ed7](https://github.com/raas-dev/configent/commit/bed3ed7f08213b35f5db6624f72d0b061c6d088e))
* **ai_commit:** improve formatting and fix typo in commit guidelines ([6f9bc35](https://github.com/raas-dev/configent/commit/6f9bc35f31059a525e07a4216b18e6baab2baaf6))
* **ai_commit:** improve user message formatting and context handling ([cb81d67](https://github.com/raas-dev/configent/commit/cb81d67800b1f52a1021d5cf294ec8355cbc5971))
* **ai_commit:** prefer fix over feat type unless adding new files ([95e6e4b](https://github.com/raas-dev/configent/commit/95e6e4bfc2402c8383d673d1500b49f0a40613e8))
* **ai_commit:** reorder type rules before scope rules in context ([8bf5367](https://github.com/raas-dev/configent/commit/8bf5367cb5a457d75ce4547b7bc6828d434db48f))
* **ai_commit:** simplify scope hint message ([95e3ff0](https://github.com/raas-dev/configent/commit/95e3ff08998718e6d9595fa2c5770c49f330db7b))
* **ai_commit:** update user hint description for type and scope ([c8d679a](https://github.com/raas-dev/configent/commit/c8d679aeead67062230ce41d58297c4b4708153c))
* **continue:** enable streaming for model configurations ([5197a77](https://github.com/raas-dev/configent/commit/5197a777555c393360a1eac4a0d4482ed2eabb95))

### [1.164.4](https://github.com/raas-dev/configent/compare/1.164.3...1.164.4) (2025-09-12)


### Fixes

* **.aliases:** add ai_agent_web function and alias ([877eb39](https://github.com/raas-dev/configent/commit/877eb3978e91832cacd9d129f69fbcae1d382e39))
* **.aliases:** escape exclamation mark in rg alias glob pattern ([3e2d980](https://github.com/raas-dev/configent/commit/3e2d9808ca9d81bae41ee81f921e83d34c919e32))
* **vscode:** replace basedpyright with cursorpyright ([38f0a9e](https://github.com/raas-dev/configent/commit/38f0a9ee206dcaf38dd04200d7957ad1dcdde555))

### [1.164.3](https://github.com/raas-dev/configent/compare/1.164.2...1.164.3) (2025-09-10)


### Fixes

* **.aliases:** add prune command to vm function ([8ec19b0](https://github.com/raas-dev/configent/commit/8ec19b04a558188ac486a909086fcc1c8490fa4f))
* **gitconfig:** remove -x flag from purge alias ([d4137f9](https://github.com/raas-dev/configent/commit/d4137f9ac95971fc8813c9d3b500b2a317e6575a))
* **mcp:** Use browser-use over playwright and midscene ([6dc1ec7](https://github.com/raas-dev/configent/commit/6dc1ec7bf8be1d7b99d01e09e61ff17481f51554))

### [1.164.2](https://github.com/raas-dev/configent/compare/1.164.1...1.164.2) (2025-09-01)


### Fixes

* **ai:** Remove support for aider ([cd4dcca](https://github.com/raas-dev/configent/commit/cd4dcca49743aad866fdd827c3e4ba9d7d1a05b5))

### [1.164.1](https://github.com/raas-dev/configent/compare/1.164.0...1.164.1) (2025-08-18)


### Fixes

* **mcp:** Fix playwright ([2efe1f7](https://github.com/raas-dev/configent/commit/2efe1f73c4315a8c43d1431538ad80696daecb0a))

## [1.164.0](https://github.com/raas-dev/configent/compare/1.163.0...1.164.0) (2025-08-18)


### Features

* **mcp:** add playwright configuration ([d34d928](https://github.com/raas-dev/configent/commit/d34d928ab39191377a75137540e8f2ba19f0dfcd))
* **mcp:** add tavily server configuration ([d925345](https://github.com/raas-dev/configent/commit/d925345798a41afd7f5b385578d4ae0c1e2d7ecc))


### Fixes

* **mcp:** remove playwright over midscene ([4f4b235](https://github.com/raas-dev/configent/commit/4f4b2351a6d7becfce34fad5f1e4cc3e00b29552))

## [1.163.0](https://github.com/raas-dev/configent/compare/1.162.1...1.163.0) (2025-08-18)


### Features

* **postinstall_lima:** add socket_vmnet setup for Lima VM networking ([ad27dcb](https://github.com/raas-dev/configent/commit/ad27dcbddaa85aa52c33e64824af2f5741c16656))


### Fixes

* **.aliases:** remove watch-interval from procs alias ([440b0b6](https://github.com/raas-dev/configent/commit/440b0b6a32b0612efb6f40328fd697beccb8bdfc))
* **bin:** add bridged network support when socket_vmnet available ([97d3105](https://github.com/raas-dev/configent/commit/97d3105c533678bca39b4ff2df075234c5334ce9))
* **bin:** remove vzNAT network configuration from limactl commands ([5069ded](https://github.com/raas-dev/configent/commit/5069ded738104202b6defcc0cd67479bee50ae08))
* **install_apps_apt:** add iputils-ping to utils packages ([d4a9e19](https://github.com/raas-dev/configent/commit/d4a9e19174486bb20e473a9684dd32f0179d485d))
* **keybindings:** disable new window shortcut for shift+cmd+n ([87afab9](https://github.com/raas-dev/configent/commit/87afab98c0c0d85bc45632cf1378445f9aabbbe4))
* **postinstall_lima:** add sudo check and improve error messages ([a043318](https://github.com/raas-dev/configent/commit/a043318656e7a9cf15e690391fd78eba7ec9bf0d))
* **setup_lima_macos:** improve sudo authentication handling ([5e9cca1](https://github.com/raas-dev/configent/commit/5e9cca1dded64f9d667375da75a6c6a5282fc345))

### [1.162.1](https://github.com/raas-dev/configent/compare/1.162.0...1.162.1) (2025-08-17)


### Fixes

* **mise:** update lima from 1.0.7 to 1.2.1 ([ea1b001](https://github.com/raas-dev/configent/commit/ea1b0018b5eba73f7af5f8254814366d22e85d25))

## [1.162.0](https://github.com/raas-dev/configent/compare/1.161.6...1.162.0) (2025-08-17)


### Features

* **vscode:** add toggle terminal extension and config ([58d4cf5](https://github.com/raas-dev/configent/commit/58d4cf5f4329c0fe059330e6e1db8ca9c9baf2e7))


### Fixes

* **aliases:** add Brave browser remote debugging alias ([bbfc4ed](https://github.com/raas-dev/configent/commit/bbfc4ed8fd9b347446e8305e09cbfa46b6c630c3))
* **config:** update web search prompt to ensure latest information ([4998d32](https://github.com/raas-dev/configent/commit/4998d32675ed46ba427704642f57b54cb20ece75))

### [1.161.6](https://github.com/raas-dev/configent/compare/1.161.5...1.161.6) (2025-08-13)


### Fixes

* **ai_commit:** add conventional commit rules to lumen draft context ([7a166a0](https://github.com/raas-dev/configent/commit/7a166a0cdb6f0135fa22280c5915f416f513f4e9))
* **config:** remove slash commands and update system prompts ([c76d0b4](https://github.com/raas-dev/configent/commit/c76d0b458cffaa3b5dcd6d9a1619404831f28646))
* **config:** update API provider configurations and docs ([f0904de](https://github.com/raas-dev/configent/commit/f0904de5bf2a6ba8c8a7898cec9e5f9aca1eace3))
* **prompts:** add web prompt and update config reference ([55e2991](https://github.com/raas-dev/configent/commit/55e2991c6f623631db3ec27e0f57f2f0633ba565))

### [1.161.5](https://github.com/raas-dev/configent/compare/1.161.4...1.161.5) (2025-08-11)


### Fixes

* **ai:** Go back to gpt-4.1 from gpt-5 (garbage) ([838e5a4](https://github.com/raas-dev/configent/commit/838e5a472878efdbeaac5a56c5d81467139bb567))

### [1.161.4](https://github.com/raas-dev/configent/compare/1.161.3...1.161.4) (2025-08-11)


### Fixes

* **aichat:** add gpt-5 models and update reference azure models ([ca771a5](https://github.com/raas-dev/configent/commit/ca771a5d8978505d65696c3758eebf86b8cc676e))
* **ai:** update OpenAI model use from gpt-4.1 to gpt-5 series ([16580d0](https://github.com/raas-dev/configent/commit/16580d01f23034cf99b770f281c3807dd8b123bb))

### [1.161.3](https://github.com/raas-dev/configent/compare/1.161.2...1.161.3) (2025-08-10)


### Fixes

* **docs:** clarify gpt-5 API key requirements and update config ([e8761c4](https://github.com/raas-dev/configent/commit/e8761c48016d99be5b32fdeb523a986543276b8b))
* **dotfiles:** update Lumen AI provider from OpenRouter to Claude ([bd6a370](https://github.com/raas-dev/configent/commit/bd6a370fc29c02459390296914a0655362823e94))

### [1.161.2](https://github.com/raas-dev/configent/compare/1.161.1...1.161.2) (2025-08-10)


### Fixes

* **continue:** Add OpenAI gpt-5 and gpt-5-mini ([435a215](https://github.com/raas-dev/configent/commit/435a2159d98fc18a3b29fb0bc50ddf482a766fce))

### [1.161.1](https://github.com/raas-dev/configent/compare/1.161.0...1.161.1) (2025-08-07)


### Fixes

* **dotfiles:** add 's' shortcut to limactl shell command aliases ([3648dfd](https://github.com/raas-dev/configent/commit/3648dfd673741cf7ca6dfce764226ea2b03aa7ee))
* **mcp:** add missing arguments to midscene config in mcp.json ([2b3b445](https://github.com/raas-dev/configent/commit/2b3b445c274e20b80e4bae489ede1645b2051062))

## [1.161.0](https://github.com/raas-dev/configent/compare/1.160.4...1.161.0) (2025-08-03)


### Features

* **ai:** load MCP servers dynamically from mcp.json ([7d5306e](https://github.com/raas-dev/configent/commit/7d5306e99d4545a58351e93394d3c09d85ee3260))


### Fixes

* **setup_ide:** copy and link Windsurf mcp_config.json correctly ([a7b9c8d](https://github.com/raas-dev/configent/commit/a7b9c8deca4884c2c4ff0565b5f3c64d570a0b86))
* **setup_ide:** correct symlink and backup handling for mcp.json files ([50e4528](https://github.com/raas-dev/configent/commit/50e4528e90a9c0931ca661d8e515b117d95ea962))
* **setup:** add kilocode config symlink setup and integrate it ([7f95703](https://github.com/raas-dev/configent/commit/7f95703532e06e8d0daa7de65fe62e6c23e8490e))

### [1.160.4](https://github.com/raas-dev/configent/compare/1.160.3...1.160.4) (2025-08-03)


### Fixes

* **config:** load API keys from environment variables correctly ([69bd630](https://github.com/raas-dev/configent/commit/69bd63074e0127e3ac7b8eb41b2e3c50f38ec129))
* **continue:** add midscene mcp ([74ab123](https://github.com/raas-dev/configent/commit/74ab1239465cbada721f7ea859eafdf8a92240d9))
* **cursor:** update command names and add functions MCP config ([2c89b07](https://github.com/raas-dev/configent/commit/2c89b07326a0595d32047d5595a63f18187379fd))
* **setup_ide:** correct backup path for .cursor/mcp.json file ([3d28427](https://github.com/raas-dev/configent/commit/3d284279914d6c50269ea84461ca2502273e7733))
* **setup_ide:** correct symlink target for mcp.json configuration file ([18fff6e](https://github.com/raas-dev/configent/commit/18fff6e646d30df341526d90580cfbd310fa346c))

### [1.160.3](https://github.com/raas-dev/configent/compare/1.160.2...1.160.3) (2025-08-03)


### Fixes

* **ai:** Remove outdated aichat developer prompts ([5f1601c](https://github.com/raas-dev/configent/commit/5f1601c330157cb797d55c5c341aeb979c155012))
* **ai:** Update assistant prompts from fabric ([b2cde70](https://github.com/raas-dev/configent/commit/b2cde7019f55d0f08561c776d70b220b40dc2ed7))
* **config:** update argc tool source and remove old cargo entry ([5cc4e73](https://github.com/raas-dev/configent/commit/5cc4e7303392d54e741ecef47a6220f35216174c))
* **macos:** install gnu-sed ([4739806](https://github.com/raas-dev/configent/commit/4739806bd6c2ef20a8e2ca0554f7693a6450b081))
* **prompts:** correct path to system.md in create_assistant script ([5cf28ec](https://github.com/raas-dev/configent/commit/5cf28ec7120348ffc9f8894dc0d9f7e036764158))

### [1.160.2](https://github.com/raas-dev/configent/compare/1.160.1...1.160.2) (2025-08-02)


### Fixes

* **docker:** update buildx plugin version to v0.26.1 ([f0d823a](https://github.com/raas-dev/configent/commit/f0d823a919ce9745e9c83361ed7ed5f680c2ae89))

### [1.160.1](https://github.com/raas-dev/configent/compare/1.160.0...1.160.1) (2025-08-01)


### Fixes

* **config:** update Ollama models and adjust capabilities settings ([9ef5e4b](https://github.com/raas-dev/configent/commit/9ef5e4b0704d0bcddfdf92586abd7607ad697fe9))
* **dotfiles:** ensure mcp service starts if not running during buildtools check ([562f3bc](https://github.com/raas-dev/configent/commit/562f3bc0efb39e5e398c4cf064354f963bdbf92f))

## [1.160.0](https://github.com/raas-dev/configent/compare/1.159.1...1.160.0) (2025-07-27)


### Features

* **cursor:** add browsermcp command to mcp.json configuration ([b6846df](https://github.com/raas-dev/configent/commit/b6846df2f3d0aa397ad87c5bc16ca47772ea5150))


### Fixes

* **bin:** remove obsolete postinstall_mcps script and update config.toml ([b708d50](https://github.com/raas-dev/configent/commit/b708d50fbbf6461ec7669f7ab4cadb45df7ba39d))
* **cursor:** update MCP command and environment variables ([3965f4d](https://github.com/raas-dev/configent/commit/3965f4decf248355984c4c7a8df6aa70590acae2))
* **dotfiles:** specify Python 3.11 in langflow alias command ([27384be](https://github.com/raas-dev/configent/commit/27384be841cc1b80428733fe9a26d7942c65dc4f))

### [1.159.1](https://github.com/raas-dev/configent/compare/1.159.0...1.159.1) (2025-07-25)


### Fixes

* **cursor:** add mcp.json config and setup symlink for MCP servers ([57a60b4](https://github.com/raas-dev/configent/commit/57a60b480b753ff77b000c06314fb3cbbf03b23c))
* **dotfiles:** disable browser-use telemetry ([c52c011](https://github.com/raas-dev/configent/commit/c52c0110e8bd12c4253833b8a72a68c7d62560a4))
* **mise:** remove playwright installation ([73f9b74](https://github.com/raas-dev/configent/commit/73f9b743dd4d0dd7e4836f4601237fa120f44ff4))

## [1.159.0](https://github.com/raas-dev/configent/compare/1.158.8...1.159.0) (2025-07-23)


### Features

* **browseruse:** add browser-use tool with config and postinstall script ([a944f18](https://github.com/raas-dev/configent/commit/a944f188f76ef50cb6c3ebca6ca9d14d5bc679d8))


### Fixes

* **ai:** Disable aider-chat installation by default ([8174584](https://github.com/raas-dev/configent/commit/81745844156e5ed55106825c5ac86e5fc4df05a4))
* **dotfiles:** handle multiple ports in PORT variable for container run ([1adb14f](https://github.com/raas-dev/configent/commit/1adb14f5a24eb8889510dacbd871afcca16cd274))

### [1.158.8](https://github.com/raas-dev/configent/compare/1.158.7...1.158.8) (2025-07-18)


### Fixes

* **dotfiles:** add alias for midscene CLI tool ([aad34f4](https://github.com/raas-dev/configent/commit/aad34f40b35a8c0064151866aaf6de05f219fa70))
* **vscode:** add Playwright extension and update related settings ([99dac7a](https://github.com/raas-dev/configent/commit/99dac7ac14a5c85569abd2b0e4176315be980ccc))

### [1.158.7](https://github.com/raas-dev/configent/compare/1.158.6...1.158.7) (2025-07-12)


### Fixes

* **ai:** update general prompt to use first principle thinking ([999bf60](https://github.com/raas-dev/configent/commit/999bf60e9e1b75bf5b2acd627e64b61a332af6ff))
* **postinstall:** add playwright MCP to postinstall and goose config ([4c0132b](https://github.com/raas-dev/configent/commit/4c0132bca6b4c1e9cc15dc98b316b0ae50937a21))

### [1.158.6](https://github.com/raas-dev/configent/compare/1.158.5...1.158.6) (2025-07-09)


### Fixes

* **bin:** add global Python version pinning for uv tool ([3d4172c](https://github.com/raas-dev/configent/commit/3d4172c40524bc99fd3a846eddc3276fec27e185))
* **macos:** enable AppleFontSmoothing by default on current host ([beee5c9](https://github.com/raas-dev/configent/commit/beee5c9c71c8cfd82955c238bdb98f4772ddc9f1))

### [1.158.5](https://github.com/raas-dev/configent/compare/1.158.4...1.158.5) (2025-07-07)


### Fixes

* **config:** pin mcpm version to 1.14.2 from latest ([64429c9](https://github.com/raas-dev/configent/commit/64429c92c9eeb05a3914b9371af57be84510bde0))

### [1.158.4](https://github.com/raas-dev/configent/compare/1.158.3...1.158.4) (2025-07-06)


### Fixes

* **dotfiles:** add empty --name option to gptme-dev command call ([43547b8](https://github.com/raas-dev/configent/commit/43547b880b2b8c62a771794d3072d502194ac250))

### [1.158.3](https://github.com/raas-dev/configent/compare/1.158.2...1.158.3) (2025-07-05)


### Fixes

* **lima:** Use minimal Ubuntu image ([9a94931](https://github.com/raas-dev/configent/commit/9a949315968f484d59b1ae3bcb1363326183cbf5))
* **setup_continue:** create .continue directory if missing ([6f9e2de](https://github.com/raas-dev/configent/commit/6f9e2de570d59f1bc38387746643cc4a1a3af338))

### [1.158.2](https://github.com/raas-dev/configent/compare/1.158.1...1.158.2) (2025-07-05)


### Fixes

* **bin:** move gnupg brew install under Darwin check for macOS ([afb46fa](https://github.com/raas-dev/configent/commit/afb46fa0c91dd963a3bca58f8718d2341d7bd3fd))
* **brew:** fix Linux compatibility in install_apps_brew script ([389654b](https://github.com/raas-dev/configent/commit/389654b03dc3fb5beb2d8ed3e9c2b4c67d895685))

### [1.158.1](https://github.com/raas-dev/configent/compare/1.158.0...1.158.1) (2025-07-04)


### Fixes

* **dotfiles:** force stop and delete lima VMs in aliases ([79cfcf9](https://github.com/raas-dev/configent/commit/79cfcf99ba0b2fa4a52435974d4adb8fcc2d8775))
* **macos:** install nmap and remove redundant alias for nmap ([c7fcf0b](https://github.com/raas-dev/configent/commit/c7fcf0b7853b8fe577e0176712e44c2d0fa35848))

## [1.158.0](https://github.com/raas-dev/configent/compare/1.157.5...1.158.0) (2025-07-04)


### Features

* **mcpm:** add postinstall script and config entries for mcpm tool integration ([8b1a824](https://github.com/raas-dev/configent/commit/8b1a8246fe91dc8a6a26d526326e73d7b8d6dcfb))


### Fixes

* **goose:** add context7 extension to goose configuration.yaml ([9c39823](https://github.com/raas-dev/configent/commit/9c39823dd44079241e47af72b1c18464ce454625))
* **mcpm:** add duckduckgo-mcp server ([5b32825](https://github.com/raas-dev/configent/commit/5b3282542ded2e64a7fb5048b85b5b9fc20011ed))
* **postinstall_mcps:** update mcpm add commands with correct target flag placement ([b976c85](https://github.com/raas-dev/configent/commit/b976c858468fe28a5a502fdacfe4f5d88824912a))

### [1.157.5](https://github.com/raas-dev/configent/compare/1.157.4...1.157.5) (2025-07-02)


### Fixes

* **flatpak:** add flathub remote for VS Code install command ([f138486](https://github.com/raas-dev/configent/commit/f138486713b9a15c59816086a2560f52edc226f0))
* **macos:** Fix adding utmctl to PATH ([9001da2](https://github.com/raas-dev/configent/commit/9001da2547086e74dd39a48fa3c233242f9739c2))
* **vscode:** adjust activity bar and editor tab settings ([162d270](https://github.com/raas-dev/configent/commit/162d27023dae22872e82c07233a358d44c43c6d3))

### [1.157.4](https://github.com/raas-dev/configent/compare/1.157.3...1.157.4) (2025-07-02)


### Fixes

* **bin:** add --vm-type=vz when starting VM on macOS with lima ([93ee403](https://github.com/raas-dev/configent/commit/93ee4030f754af98c847a7d214baa293d2b94589))
* **vscode:** remove redundant activity bar location setting ([7f8f7fc](https://github.com/raas-dev/configent/commit/7f8f7fce6e44632ca043dcf9301fc1f72c046ec1))

### [1.157.3](https://github.com/raas-dev/configent/compare/1.157.2...1.157.3) (2025-07-01)


### Fixes

* **install:** comment out binfmt install for macOS Rosetta preference ([7fa5412](https://github.com/raas-dev/configent/commit/7fa5412fc8262064ff4e05ed772484e18c2747f4))
* **provision:** remove deprecated Intel-on-ARM containerd setup script ([ff7ddf4](https://github.com/raas-dev/configent/commit/ff7ddf47e8e319a61101b8e7794a926558207582))

### [1.157.2](https://github.com/raas-dev/configent/compare/1.157.1...1.157.2) (2025-06-30)


### Fixes

* **dotfiles:** avoid restarting running Lima VM before start commands ([a021723](https://github.com/raas-dev/configent/commit/a021723380bd1aa270d8da1b07bebeb8800221fb))
* **vm:** correctly assign and use vm_name variable in v() function ([5fdf4bf](https://github.com/raas-dev/configent/commit/5fdf4bfe7ba24fd39c998bd872f39e38d4cf7e55))

### [1.157.1](https://github.com/raas-dev/configent/compare/1.157.0...1.157.1) (2025-06-30)


### Fixes

* **dotfiles:** pass os_args to limactl start command on Darwin ([bbc65d9](https://github.com/raas-dev/configent/commit/bbc65d9aaa578969c64048d0d1fcc2b3679c8804))
* **dotfiles:** remove unused os_args in limactl start command ([6cf18cf](https://github.com/raas-dev/configent/commit/6cf18cf3e51046439b110133656241f1b00951fb))
* **lima:** remove --vm-type=vz, redunant on macOS 13.5+ ([cbe25a4](https://github.com/raas-dev/configent/commit/cbe25a47776125cdbe9c0bf2aec607edd9822dab))

## [1.157.0](https://github.com/raas-dev/configent/compare/1.156.0...1.157.0) (2025-06-30)


### Features

* **dotfiles:** add Darwin-specific args to limactl start command ([b15eebf](https://github.com/raas-dev/configent/commit/b15eebf321a68163e3940a6381eb545f1c89dea4))


### Fixes

* **git:** remove pager from gitconfig and set GIT_PAGER instead ([3aafdaf](https://github.com/raas-dev/configent/commit/3aafdaf3e7763182176ebccaaa9c072114565069))
* **lima:** add --rosetta on macOS to limactl start ([04fb868](https://github.com/raas-dev/configent/commit/04fb868b8b9d6d5fa8a67cd4b128a5082815fb44))
* **lima:** remove unused GIT_REF environment variable in install script curl command ([52a53b0](https://github.com/raas-dev/configent/commit/52a53b031bd7e68656605aa203ac66355bf6f110))

## [1.156.0](https://github.com/raas-dev/configent/compare/1.155.0...1.156.0) (2025-06-30)


### Features

* **aliases:** Improve v() for managing VMs ([6292805](https://github.com/raas-dev/configent/commit/62928050324e1d853938ce620b983b53bba25ef6))


### Fixes

* **aliases:** Add create/start and stop/delete lima VMs ([ea76f3d](https://github.com/raas-dev/configent/commit/ea76f3d022730a2941a562bf5add882b8453a335))
* **aliases:** rename vm4 aliases to v-, and shell into ([c7aca92](https://github.com/raas-dev/configent/commit/c7aca92f981eb19eaff0597726cb908f00df1114))
* **dotfiles:** correct usage message in v-start function ([aa961e4](https://github.com/raas-dev/configent/commit/aa961e4a85870970bca267f6dca946db48ae61c0))
* **dotfiles:** update vup function to use LIMA_TEMPLATES_PATH ([4333e81](https://github.com/raas-dev/configent/commit/4333e8148f798ef82a32b4c02a1026383776f041))
* **install_apps:** correct install order for apt and docker commands ([14cc5f2](https://github.com/raas-dev/configent/commit/14cc5f21224310143255aea9a2d202797420408f))
* **macos:** Enable Rosetta for Ubuntu Lima VM ([28f8f13](https://github.com/raas-dev/configent/commit/28f8f1332f83528b29ed2578c4d55b680991b443))

## [1.155.0](https://github.com/raas-dev/configent/compare/1.154.2...1.155.0) (2025-06-29)


### Features

* **buildctl:** add buildctl shim and lima VM config for buildkit integration ([0817fd9](https://github.com/raas-dev/configent/commit/0817fd97976666288828eeec5ed6b186f6477eee))

### [1.154.2](https://github.com/raas-dev/configent/compare/1.154.1...1.154.2) (2025-06-29)


### Fixes

* **gitconfig:** fix alias function syntax for ai_commit wrapper ([b15b2ea](https://github.com/raas-dev/configent/commit/b15b2ea045fcc706e3bc61f64d350ddeeb5659a6))
* **install:** add vim installation to all package managers ([5cbc94d](https://github.com/raas-dev/configent/commit/5cbc94dd0d0b5e1f0081f553b271ff8e74c76e24))
* **podman:** remove build and run command platform overrides for aarch64 ([14d11f6](https://github.com/raas-dev/configent/commit/14d11f60d34cc1612c35ed79fb70eb6058388674))

### [1.154.1](https://github.com/raas-dev/configent/compare/1.154.0...1.154.1) (2025-06-29)


### Fixes

* **bin:** include command arguments as context for commit message drafting ([8b1a763](https://github.com/raas-dev/configent/commit/8b1a763e1f20ae2d4a54c84bef925e96eb16589f))
* **docker:** remove default platform override for arm64 architectures ([1ebb0f0](https://github.com/raas-dev/configent/commit/1ebb0f050d6933ac931e6a72c9596e499c5c293e))

## [1.154.0](https://github.com/raas-dev/configent/compare/1.153.3...1.154.0) (2025-06-27)


### Features

* **ai:** add Gemini CLI ([a7ff366](https://github.com/raas-dev/configent/commit/a7ff366e6d25ef9228c316f92d398ded5c9b994a))


### Fixes

* **dotfiles:** add --quiet flag to nix-shell command in alias ([ee566f6](https://github.com/raas-dev/configent/commit/ee566f6be41eea7b14116db7a27571ee6d46c4be))

### [1.153.3](https://github.com/raas-dev/configent/compare/1.153.2...1.153.3) (2025-06-26)


### Fixes

* **lima:** disable short-name-mode in fedora.yaml provisioning script ([00bd03a](https://github.com/raas-dev/configent/commit/00bd03a5f7cbed7ecc90c87c0b08b7ffa12865ff))
* **lima:** set short-name-mode to permissive in registries.conf system script ([53f8344](https://github.com/raas-dev/configent/commit/53f834429f1d0a7f267408797533150f7f7da331))

### [1.153.2](https://github.com/raas-dev/configent/compare/1.153.1...1.153.2) (2025-06-26)


### Fixes

* **bin:** set CONTAINERD_ADDRESS if not already defined ([dd712d6](https://github.com/raas-dev/configent/commit/dd712d61c846a5e3ad55f4a9891e23ac47308bb4))

### [1.153.1](https://github.com/raas-dev/configent/compare/1.153.0...1.153.1) (2025-06-26)


### Fixes

* **bin:** prepend $HOME/bin to PATH for docker and nerdctl scripts ([44ac286](https://github.com/raas-dev/configent/commit/44ac2866e2d29a5ac3f267ecb8e0432e048e76ef))

## [1.153.0](https://github.com/raas-dev/configent/compare/1.152.14...1.153.0) (2025-06-26)


### Features

* **podman:** Use same VM for all podman setups ([a87d247](https://github.com/raas-dev/configent/commit/a87d24746457015191ab540be7793d88391284e1))

### [1.152.14](https://github.com/raas-dev/configent/compare/1.152.13...1.152.14) (2025-06-26)


### Fixes

* **dotfiles:** configure docker/podman envvars for macOS only ([dc6d2cc](https://github.com/raas-dev/configent/commit/dc6d2cc309a7d0ad800a2665e2dc0c665312c9bc))

### [1.152.13](https://github.com/raas-dev/configent/compare/1.152.12...1.152.13) (2025-06-26)


### Fixes

* **provision:** run install.sh script in the background with curl command ([1a98265](https://github.com/raas-dev/configent/commit/1a98265f4e6c27177020126fab3a0254b861f9d7))

### [1.152.12](https://github.com/raas-dev/configent/compare/1.152.11...1.152.12) (2025-06-26)


### Fixes

* **docker:** Rootful and rootless docker on same VM ([cf1e69a](https://github.com/raas-dev/configent/commit/cf1e69a0c4626bce6e896364cd75bb763419dad1))

### [1.152.11](https://github.com/raas-dev/configent/compare/1.152.10...1.152.11) (2025-06-26)


### Fixes

* **docker:** prioritize rootful docker.sock over rootless in env setup ([878650f](https://github.com/raas-dev/configent/commit/878650f15f3bd41ba46a57e80832115f0f1f654d))

### [1.152.10](https://github.com/raas-dev/configent/compare/1.152.9...1.152.10) (2025-06-25)


### Fixes

* **bin:** update default TEMPLATE to ubuntu_rootful in docker shim ([0bb1ea2](https://github.com/raas-dev/configent/commit/0bb1ea2ccab4418a3f294d474f547362ba7000b6))

### [1.152.9](https://github.com/raas-dev/configent/compare/1.152.8...1.152.9) (2025-06-25)


### Fixes

* **bin:** prevent reinstalling Docker if already installed in install scripts ([babc596](https://github.com/raas-dev/configent/commit/babc5967985e69ce5aa973f3006655b28d98c3d8))

### [1.152.8](https://github.com/raas-dev/configent/compare/1.152.7...1.152.8) (2025-06-25)


### Fixes

* **bin:** enable and start docker service immediately on install scripts ([b41f5a6](https://github.com/raas-dev/configent/commit/b41f5a604f8fe87241d3852f46a3efa57e7c2fcc))

### [1.152.7](https://github.com/raas-dev/configent/compare/1.152.6...1.152.7) (2025-06-25)


### Fixes

* **script:** comment out disabling system-wide Docker to prevent disruption ([16d4cb9](https://github.com/raas-dev/configent/commit/16d4cb99b42760892d4e681d8aa49eec22b242a2))

### [1.152.6](https://github.com/raas-dev/configent/compare/1.152.5...1.152.6) (2025-06-25)


### Fixes

* **installer:** run Docker install script with sudo for rootless install ([116c85f](https://github.com/raas-dev/configent/commit/116c85f1f6de32a3d80fb3cc9b55acafe273c4ec))

### [1.152.5](https://github.com/raas-dev/configent/compare/1.152.4...1.152.5) (2025-06-25)


### Fixes

* **docker:** update template and always install Docker with additional config ([337aa87](https://github.com/raas-dev/configent/commit/337aa87fa0dd45165d8acae0ed232a4792998cf1))

### [1.152.4](https://github.com/raas-dev/configent/compare/1.152.3...1.152.4) (2025-06-25)


### Fixes

* **install:** update Docker rootless install script and setup tool usage ([038883a](https://github.com/raas-dev/configent/commit/038883a54a56e209eb2acceb8bb30c4efb334107))
* **lima:** disable user containerd and remove redundant provision scripts ([ec12098](https://github.com/raas-dev/configent/commit/ec12098cd2a6e6d914f1c3e6eb90a6e7ec0cc435))

### [1.152.3](https://github.com/raas-dev/configent/compare/1.152.2...1.152.3) (2025-06-25)


### Fixes

* **podman:** add support for podman CLI installation on macOS ([5adde30](https://github.com/raas-dev/configent/commit/5adde30e30dd51c6ff9c3bb5920b343f7681874c))

### [1.152.2](https://github.com/raas-dev/configent/compare/1.152.1...1.152.2) (2025-06-25)


### Fixes

* **bin:** support platform override for build and run commands on aarch64 ([2e2a684](https://github.com/raas-dev/configent/commit/2e2a6845419b5b5bbb9af2bcc97fbec255aaaace))

### [1.152.1](https://github.com/raas-dev/configent/compare/1.152.0...1.152.1) (2025-06-25)


### Fixes

* **lima:** Fix Arch Linux on aarch64 ([b510930](https://github.com/raas-dev/configent/commit/b51093080a94cab8f2b76abca04db2158f47b272))

## [1.152.0](https://github.com/raas-dev/configent/compare/1.151.3...1.152.0) (2025-06-25)


### Features

* **vm:** add QEMU support for oraclelinux and alpine Lima VMs ([60c6c41](https://github.com/raas-dev/configent/commit/60c6c41ed6477e23ca84ab2b165c493018e8024b))


### Fixes

* **lima:** Remove support for Alpine and Oracle Linux ([5f89da5](https://github.com/raas-dev/configent/commit/5f89da5999ad19532fd0dbe5fd7b03a715b5c3d6))

### [1.151.3](https://github.com/raas-dev/configent/compare/1.151.2...1.151.3) (2025-06-25)


### Fixes

* **bin:** update comments for git-extras and ctags availability ([67a5612](https://github.com/raas-dev/configent/commit/67a5612f63eceeb2ffa1cd200c7cfdbb663412e2))

### [1.151.2](https://github.com/raas-dev/configent/compare/1.151.1...1.151.2) (2025-06-25)


### Fixes

* **bin:** update EPEL repo installation for CentOS Stream 10 ([ae75adf](https://github.com/raas-dev/configent/commit/ae75adf68639f261d171b2965ae89de7a8a21b9e))

### [1.151.1](https://github.com/raas-dev/configent/compare/1.151.0...1.151.1) (2025-06-25)


### Fixes

* **bin:** split epel-release installs to avoid issues ([3effce3](https://github.com/raas-dev/configent/commit/3effce33375be197115b61e8faa493f56266ce6c))

## [1.151.0](https://github.com/raas-dev/configent/compare/1.150.8...1.151.0) (2025-06-25)


### Features

* **lima:** Add Alma Linux 10 and Rocky Linux 10 ([c832d91](https://github.com/raas-dev/configent/commit/c832d9181ec545266258ad0aceed9cb2e17739a0))


### Fixes

* **docker:** always run rootless docker install script without check ([ce9c534](https://github.com/raas-dev/configent/commit/ce9c5349819d49261cc1a5c5f60792ac74d08e1f))
* **etc:** update CentOS-Stream-10 image URLs and digests ([88ed567](https://github.com/raas-dev/configent/commit/88ed567510b7e15750527063c89ed7adc871fad0))

### [1.150.8](https://github.com/raas-dev/configent/compare/1.150.7...1.150.8) (2025-06-25)


### Fixes

* **docker:** export DOCKER_DEFAULT_PLATFORM for Apple Silicon Macs only ([0b639cd](https://github.com/raas-dev/configent/commit/0b639cd400416652926ac8218c9e9aa5aaa0442b))
* **docker:** set DOCKER_DEFAULT_PLATFORM for arm64 architecture ([2deed16](https://github.com/raas-dev/configent/commit/2deed1610fe824ad56000ccc7eda391f080cd101))
* **podman:** fix podman platform handling logic ([ca80aaa](https://github.com/raas-dev/configent/commit/ca80aaae9354b537d0869ce161830bad7ca14533))

### [1.150.7](https://github.com/raas-dev/configent/compare/1.150.6...1.150.7) (2025-06-25)


### Fixes

* **podman:** add architecture flag to build and run commands ([b49f11f](https://github.com/raas-dev/configent/commit/b49f11f4c6ab26997140291976a8972830c013e0))

### [1.150.6](https://github.com/raas-dev/configent/compare/1.150.5...1.150.6) (2025-06-25)


### Fixes

* **bin:** remove extra newline in install_docker_rootless script ([1d3bdcc](https://github.com/raas-dev/configent/commit/1d3bdccf244ad547e46f0926c45e214d5a099ef9))
* **bin:** update default TEMPLATE to "fedora" in podman shim ([0c27887](https://github.com/raas-dev/configent/commit/0c27887bbead452520650c755ef2278e27798102))

### [1.150.5](https://github.com/raas-dev/configent/compare/1.150.4...1.150.5) (2025-06-25)


### Fixes

* **install:** skip Docker install if docker command exists ([e6c797d](https://github.com/raas-dev/configent/commit/e6c797d7b19fe788326c7fb712dd1447fb8ef7a8))

### [1.150.4](https://github.com/raas-dev/configent/compare/1.150.3...1.150.4) (2025-06-25)


### Fixes

* **postinstall:** add mise shims to PATH in Azure and Pwsh scripts ([cb89d20](https://github.com/raas-dev/configent/commit/cb89d20c0691883c263efba06652e313ae3f9140))

### [1.150.3](https://github.com/raas-dev/configent/compare/1.150.2...1.150.3) (2025-06-25)


### Fixes

* **bin:** check dotnet and pwsh presence before exporting DOTNET_ROOT ([b1c9994](https://github.com/raas-dev/configent/commit/b1c9994a552ff92a31054abe89c0e83e29045786))
* **postinstall_node:** remove global npx install from postinstall script ([edbd77e](https://github.com/raas-dev/configent/commit/edbd77eb3c606d61bdda4cb41058e3763ad143ac))

### [1.150.2](https://github.com/raas-dev/configent/compare/1.150.1...1.150.2) (2025-06-25)


### Fixes

* **powershell:** set DOTNET_ROOT for pwsh ([e56a36e](https://github.com/raas-dev/configent/commit/e56a36ef999947e6e59c5f3d44cd65872bdc355d))

### [1.150.1](https://github.com/raas-dev/configent/compare/1.150.0...1.150.1) (2025-06-25)


### Fixes

* **docker:** enable and reload services instead of restarting them ([b0ac6d7](https://github.com/raas-dev/configent/commit/b0ac6d7008fbfa23acb01cdfb9f36b8c2ab4c95e))

## [1.150.0](https://github.com/raas-dev/configent/compare/1.149.2...1.150.0) (2025-06-25)


### Features

* **lima:** Use same VM for docker and nerdctl ([3f7ad7a](https://github.com/raas-dev/configent/commit/3f7ad7a8ab9e84eb3b87a5bcf027f6f21db91efb))

### [1.149.2](https://github.com/raas-dev/configent/compare/1.149.1...1.149.2) (2025-06-24)

### [1.149.1](https://github.com/raas-dev/configent/compare/1.149.0...1.149.1) (2025-06-24)


### Fixes

* **bin:** disable podman compose warning logs by default ([f5d0f67](https://github.com/raas-dev/configent/commit/f5d0f6758848a622d5d497f512fc26b2847df82f))
* **docker:** enable multi-arch support using tonistiigi/binfmt ([fa39e44](https://github.com/raas-dev/configent/commit/fa39e44d334af8dfbe0912398e99eba89b398246))
* **dotfiles:** conditionally set MANPAGER only if bat is available ([4e2c6cd](https://github.com/raas-dev/configent/commit/4e2c6cd15febd3a85c5f9f7a379f867697833b43))
* **nerdctl:** enable multi-platform support with binfmt setup ([539dfe0](https://github.com/raas-dev/configent/commit/539dfe0be91c365c65cf0d7b497d331d3e8a4250))

## [1.149.0](https://github.com/raas-dev/configent/compare/1.148.3...1.149.0) (2025-06-24)


### Features

* **podman:** install Docker compose plugin for podman compose commands ([2dc0061](https://github.com/raas-dev/configent/commit/2dc00612e17ee68ee381802f5a578957ab085389))


### Fixes

* **bin:** update TEMPLATE default to "fedora_rootful" in podman shim ([2aafe90](https://github.com/raas-dev/configent/commit/2aafe904f36ac0a7f815e27f92b1603e9e09c0f2))
* **docker:** update buildx plugin version to v0.25.0 ([31fe45e](https://github.com/raas-dev/configent/commit/31fe45eeef5312417ac1663d045ed4307b333e01))
* **lima:** remove redundant mountPoint and improve k3s provisioning checks ([aae012e](https://github.com/raas-dev/configent/commit/aae012e0a93c5531a04b567d7ad7c335d1acb15b))

### [1.148.3](https://github.com/raas-dev/configent/compare/1.148.2...1.148.3) (2025-06-24)


### Fixes

* **config:** replace '{{.GlobalTempDir}}/lima' with '/tmp/lima' in mounts ([f00a49f](https://github.com/raas-dev/configent/commit/f00a49f494f585c7a87bd4ef36104d540d17f918))
* **config:** update LLM model to google/gemini-2.5-flash ([19ed54c](https://github.com/raas-dev/configent/commit/19ed54c0d525cbe8c87b53f465f4259355730847))
* **config:** use global temp dir for /tmp/lima mounts in YAML files ([ae7880e](https://github.com/raas-dev/configent/commit/ae7880e72ef4a17645a85e8fccfd56a8803fe575))
* **continue:** add mcp servers duckduckgo and context7 ([b18954d](https://github.com/raas-dev/configent/commit/b18954d40c686b89ed67909bad3fe6567081abd2))
* **lima:** Add support for Fedora Linux 42 ([9a2db9a](https://github.com/raas-dev/configent/commit/9a2db9afb284e713cff39a65377b0e8546b5fdda))
* **lima:** Update ubuntu and debian images ([1ff31e6](https://github.com/raas-dev/configent/commit/1ff31e624ab887fca398e867c140a5b1ecf6664a))
* **podman:** Use rootful podman ([2b3beaa](https://github.com/raas-dev/configent/commit/2b3beaa46ed8676c0e984a00ffe2ecff4cb555a0))

### [1.148.2](https://github.com/raas-dev/configent/compare/1.148.1...1.148.2) (2025-06-23)


### Fixes

* **ai:** Remove gptme - not maintained ([5fb7cd8](https://github.com/raas-dev/configent/commit/5fb7cd8862adc3f87a9739cbf2bc5dc237a718bf))
* **config:** default API keys to empty string if env variable missing ([edca2f2](https://github.com/raas-dev/configent/commit/edca2f2ab839325b0ca59404fb16705b287cca4c))
* **config:** default API keys to empty string if env vars are missing ([9dbf788](https://github.com/raas-dev/configent/commit/9dbf788995a271c17702183ded7f57c6362c480a))
* **config:** remove fallback empty string for API keys in models config ([73e0b17](https://github.com/raas-dev/configent/commit/73e0b175da6a53c57c16b1334d1b2b0e97efffb0))
* **config:** update goose provider and model settings ([beabb13](https://github.com/raas-dev/configent/commit/beabb1338086696d6b118fec961125c0573b7191))
* **config:** update LLM model references to correct provider format ([e97a9d8](https://github.com/raas-dev/configent/commit/e97a9d83d400d907808460606ca0ade12f673f9a))
* **powershell:** install PSScriptAnalyzer module for IDEs ([3dd4435](https://github.com/raas-dev/configent/commit/3dd4435220e5b1be51c1145b30ce3523a9bd23b4))

### [1.148.1](https://github.com/raas-dev/configent/compare/1.148.0...1.148.1) (2025-06-22)


### Fixes

* **continue:** use gpt-4.1 via OpenRouter ([9fbfa26](https://github.com/raas-dev/configent/commit/9fbfa26d2f43f0777369b6b00477e562d66bad52))
* **dotfiles:** update lumen AI provider and API key environment variables ([690bc3b](https://github.com/raas-dev/configent/commit/690bc3b037c810c56b0810567c6728e38efcfe6f))
* **fast-agent:** update default_model to openrouter.openai/gpt-4.1 ([4a9bb72](https://github.com/raas-dev/configent/commit/4a9bb72d07c281d1c96024561a85bf96cce315de))

## [1.148.0](https://github.com/raas-dev/configent/compare/1.147.0...1.148.0) (2025-06-22)


### Features

* **ai:** Install fast-agent ([f6158bf](https://github.com/raas-dev/configent/commit/f6158bfcf7a25c1825b0f4b57af79787e5d8acd1))


### Fixes

* **aichat:** Fetch newer models after install ([89f11c6](https://github.com/raas-dev/configent/commit/89f11c6a48d621e186cd7925ffefd3c86f34d3c1))
* **ai:** Disable gptme - not updated ([be36b4e](https://github.com/raas-dev/configent/commit/be36b4e39b16a1d80fc754d4b7d9ce8ebe4530da))

## [1.147.0](https://github.com/raas-dev/configent/compare/1.146.7...1.147.0) (2025-06-19)


### Features

* **ai:** Use aichat over goose as CLI LLM client ([f917fda](https://github.com/raas-dev/configent/commit/f917fda88f0b4730d71a5d89fc1efd473e095000))

### [1.146.7](https://github.com/raas-dev/configent/compare/1.146.6...1.146.7) (2025-06-19)


### Fixes

* **ai:** Remove slow goose, use aichat ([cdc0cc3](https://github.com/raas-dev/configent/commit/cdc0cc309e75695739b2b01c9db22c2e3c68a9d8))

### [1.146.6](https://github.com/raas-dev/configent/compare/1.146.5...1.146.6) (2025-06-18)


### Fixes

* **ai:** Update Gemini 2.5 pro and flash to non-preview ([6f51c9b](https://github.com/raas-dev/configent/commit/6f51c9b123b27ce191cb3db045e7417e03708c68))

### [1.146.5](https://github.com/raas-dev/configent/compare/1.146.4...1.146.5) (2025-06-13)


### Fixes

* **macos:** Add script to disable font smoothing ([356d449](https://github.com/raas-dev/configent/commit/356d4490bf72f58dd81fa301b0cb3b928202807a))

### [1.146.4](https://github.com/raas-dev/configent/compare/1.146.3...1.146.4) (2025-06-09)


### Fixes

* **lima:** Downgrade and lock Lima to 1.0.7 ([85b6b51](https://github.com/raas-dev/configent/commit/85b6b51b6d4cc6fff6355a390502d5e2974b0c42))

### [1.146.3](https://github.com/raas-dev/configent/compare/1.146.2...1.146.3) (2025-06-09)


### Fixes

* **bin:** update docker buildx plugin version to v0.24.0 ([032c14b](https://github.com/raas-dev/configent/commit/032c14bc90f8d19499526f6702c612f4b3b9cb97))

### [1.146.2](https://github.com/raas-dev/configent/compare/1.146.1...1.146.2) (2025-06-08)


### Fixes

* **docker:** set DOCKER_DEFAULT_PLATFORM for arm64 if unset ([36fe9ab](https://github.com/raas-dev/configent/commit/36fe9ab48a2524f0cf6ae87ebc6f4fdde746206b))
* **dotfiles:** optimize uname calls and set platform for ARM Docker host ([d77c0c3](https://github.com/raas-dev/configent/commit/d77c0c3592d2cb1cdc5bf7ec3f30bc271dbe6684))

### [1.146.1](https://github.com/raas-dev/configent/compare/1.146.0...1.146.1) (2025-06-08)

## [1.146.0](https://github.com/raas-dev/configent/compare/1.145.0...1.146.0) (2025-06-06)


### Features

* **terminal:** add keybinding for shift+enter to send newline sequence ([63fe98b](https://github.com/raas-dev/configent/commit/63fe98b6bfc912b5d53ec0e08824c1274018a9c2))


### Performance

* **config:** add retrieval and reranking params for codebase and folder ([cee61db](https://github.com/raas-dev/configent/commit/cee61db2f6cd6d18c622db558733839288f0ebcd))


### Fixes

* **ai:** Update Google Gemini 2.5 Pro preview version ([68e25f2](https://github.com/raas-dev/configent/commit/68e25f25bf84d3f143c72a8c4b9497f394c33e6c))
* **scan:** correct scanner type from config to misconfig ([ee29034](https://github.com/raas-dev/configent/commit/ee29034e30be59d6033357111d342795c9b46701))

## [1.145.0](https://github.com/raas-dev/configent/compare/1.144.0...1.145.0) (2025-06-05)


### Features

* **macos:** add script to disable disk eject warning notification ([3b8c36a](https://github.com/raas-dev/configent/commit/3b8c36af170250f152e6b690ea01d3d52472857a))


### Fixes

* **config:** add qwen3:8b client with function calling support ([2d282c2](https://github.com/raas-dev/configent/commit/2d282c22fb91dd2e46f0a6e5bbcd1a80dc35ad90))

## [1.144.0](https://github.com/raas-dev/configent/compare/1.143.1...1.144.0) (2025-05-31)


### Features

* **macos:** Use Cursor as default IDE ([456832f](https://github.com/raas-dev/configent/commit/456832f699335c140120fd46470394b714ad27b0))


### Fixes

* **bin:** associate shell scripts with app bundle ID using duti ([575fe27](https://github.com/raas-dev/configent/commit/575fe2790764048ba3d22b067f12adde7af3b59c))
* **bin:** correct script error messages and reorder duti commands ([9401f0a](https://github.com/raas-dev/configent/commit/9401f0a44062dd672022a2ced43089297fe55585))
* **continue:** add Claude Sonnet 4 thinking mode ([7bca55f](https://github.com/raas-dev/configent/commit/7bca55f5da08e33e391b1e8f3c12128fff7fc27a))
* **macos:** By default `open` files to VS Code likes ([c386ec7](https://github.com/raas-dev/configent/commit/c386ec79fe19b5735f1505e1b68c220635c5f953))

### [1.143.1](https://github.com/raas-dev/configent/compare/1.143.0...1.143.1) (2025-05-31)


### Fixes

* **config:** add capabilities for uploadImage and tools in APIs config ([99ff9c4](https://github.com/raas-dev/configent/commit/99ff9c49aa914c3eb7f0d0051c76067f64fca846))

## [1.143.0](https://github.com/raas-dev/configent/compare/1.142.14...1.143.0) (2025-05-31)


### Features

* **continue:** add Ollama devstral ([d212fef](https://github.com/raas-dev/configent/commit/d212fef512b86732f0a9f2c34161ad8a90407196))


### Fixes

* **ai:** add deepseek-r1 model and increase max input tokens ([8ab530c](https://github.com/raas-dev/configent/commit/8ab530c5eb1f1731c587620518603a42b41e3e6f))
* **ai:** Update Claude 3.7 Sonnet to Claude Sonnet 4 ([6353af8](https://github.com/raas-dev/configent/commit/6353af881ff7a449864697e7e7a5523bbc1fb7df))
* **config:** update Ollama model version to mistral-small3.1:24b ([cefea65](https://github.com/raas-dev/configent/commit/cefea65e316ca78f0c44326372e40349f72fbdf9))

### [1.142.14](https://github.com/raas-dev/configent/compare/1.142.13...1.142.14) (2025-05-28)


### Fixes

* **node:** Install npx even though bunx is preferred ([ae26645](https://github.com/raas-dev/configent/commit/ae2664553634f30b5169a521536f0c021da812f1))
* **python:** Install pipx even though uvx is preferred ([11f6d43](https://github.com/raas-dev/configent/commit/11f6d434b2d9f292a9a512102b6007f16306d085))
* **vscode:** Add Claude Code extension ([2cc7c27](https://github.com/raas-dev/configent/commit/2cc7c273b77f6033ec0de8f8e3c666c729417b1f))

### [1.142.13](https://github.com/raas-dev/configent/compare/1.142.12...1.142.13) (2025-05-24)


### Fixes

* **vscode:** Add stagewise extension ([90a0310](https://github.com/raas-dev/configent/commit/90a03101e37da645d9c997c654e16d3d4eb4a340))
* **vscode:** Decrease window zoom ([2808940](https://github.com/raas-dev/configent/commit/28089404c66aaf67068df2541e20b474d9cf799d))
* **vscode:** Disable line numbers by default ([dbb6285](https://github.com/raas-dev/configent/commit/dbb6285e4ea4aa16d6b471abfa3ab0536ced0e6a))
* **vscode:** Fix letter spacing ([d66441e](https://github.com/raas-dev/configent/commit/d66441e79b77ea5909bad4be38144b649f351d9d))
* **vscode:** Increase font size ([7b0065e](https://github.com/raas-dev/configent/commit/7b0065e91f21ef94f3868a016d0e3bac244c8ceb))

### [1.142.12](https://github.com/raas-dev/configent/compare/1.142.11...1.142.12) (2025-05-23)


### Fixes

* **macos:** Remove cask for Zed ([cce5e3b](https://github.com/raas-dev/configent/commit/cce5e3b260beda7d26d353b5c605140d1675b390))
* **macos:** Remove install Cursor by default ([2ecea66](https://github.com/raas-dev/configent/commit/2ecea6695bd47cf7fba91864955ef3c56955c483))

### [1.142.11](https://github.com/raas-dev/configent/compare/1.142.10...1.142.11) (2025-05-23)


### Fixes

* **lima:** Fix bug in checking if VM is running ([f2357dc](https://github.com/raas-dev/configent/commit/f2357dca199c32cc008ae5465f4a771d3f7905d9))
* **vscode:** Decrease letter spacing 0.1 ([2817e0f](https://github.com/raas-dev/configent/commit/2817e0feea021e1c9842a92316d6fd8f45a2d8f7))

### [1.142.10](https://github.com/raas-dev/configent/compare/1.142.9...1.142.10) (2025-05-23)


### Fixes

* **vscode:** Add Kilo Code, remove Cline and Roo Code ([3004326](https://github.com/raas-dev/configent/commit/3004326f93b4484d6d405548a989dc425f9f33ab))

### [1.142.9](https://github.com/raas-dev/configent/compare/1.142.8...1.142.9) (2025-05-21)


### Fixes

* **ai:** Update Google Gemini 2.5 Flash version ([49d2ddd](https://github.com/raas-dev/configent/commit/49d2ddd049c9b7802aac3aa066705fca8a86b6a2))

### [1.142.8](https://github.com/raas-dev/configent/compare/1.142.7...1.142.8) (2025-05-09)


### Fixes

* **ai:** Update Google Gemini 2.5 pro model version ([43935c2](https://github.com/raas-dev/configent/commit/43935c29dc97f98e0519a48fa91dbc9f0ef935fd))

### [1.142.7](https://github.com/raas-dev/configent/compare/1.142.6...1.142.7) (2025-05-07)


### Fixes

* **install:** Add mise self-update ([0080109](https://github.com/raas-dev/configent/commit/0080109efeacd5389ecf6975d06ba88e412daba1))
* **shell:** Lock atuin version ([7a878c9](https://github.com/raas-dev/configent/commit/7a878c9cd6c435ad653a83ec17a01e3a60df1e49))
* **shell:** Upgrade starship prompt ([305d499](https://github.com/raas-dev/configent/commit/305d4991773339f702dc72ab04610d053931a053))

### [1.142.6](https://github.com/raas-dev/configent/compare/1.142.5...1.142.6) (2025-05-07)


### Fixes

* **aliases:** Add mcpm via uvx ([b7bdc44](https://github.com/raas-dev/configent/commit/b7bdc4422b521308f5d39281a7afb20eff1e1ff7))
* **cloud:** remove flyctl ([f2f8a6c](https://github.com/raas-dev/configent/commit/f2f8a6c35108fc6ef71a8be050d7470043cb8479))
* **dotfiles:** add alias for MCP inspector visual testing tool ([fd362ae](https://github.com/raas-dev/configent/commit/fd362ae6da14e190dce9217744d48a476b849b3f))
* **go:** Remove outdated webanalyze ([b33f322](https://github.com/raas-dev/configent/commit/b33f322958e6a648a52b4a558831cae519711e61))
* **rust:** update tool versions including rust to 1.86.0 and atuin to 18.6.0 ([624b9e2](https://github.com/raas-dev/configent/commit/624b9e2223cee6f5f46da15a67cf1ba601ee58a8))

### [1.142.5](https://github.com/raas-dev/configent/compare/1.142.4...1.142.5) (2025-05-02)


### Fixes

* **config:** update neovim version to 0.11.1 and xh to 0.24.1 ([fdf8941](https://github.com/raas-dev/configent/commit/fdf89413d544d6b9462df4b17bbc0832e7af68f5))

### [1.142.4](https://github.com/raas-dev/configent/compare/1.142.3...1.142.4) (2025-04-27)


### Fixes

* **macos:** add rsync installation for rsync_tmbackup.sh script ([f4d5213](https://github.com/raas-dev/configent/commit/f4d5213f3c1563e093ba865a06f85c51b2f7887f))

### [1.142.3](https://github.com/raas-dev/configent/compare/1.142.2...1.142.3) (2025-04-25)


### Fixes

* **ai:** Update assistant prompts from Fabric ([54bdb45](https://github.com/raas-dev/configent/commit/54bdb45636c64a0e0bc29f8b205f82161b556840))

### [1.142.2](https://github.com/raas-dev/configent/compare/1.142.1...1.142.2) (2025-04-19)


### Fixes

* **ai:** Update Azure AI Foundry models ([6f05ab1](https://github.com/raas-dev/configent/commit/6f05ab188aa77019d1c224135d07d6f3691f1b44))
* **config:** update mistral-small model to version 3.1 and extend context length ([d256c38](https://github.com/raas-dev/configent/commit/d256c389429bc985cac774e6a995ce7429871850))
* **config:** update Ollama mistral-small3.1 model to latest version ([fd969d1](https://github.com/raas-dev/configent/commit/fd969d108c57894f33725496f7bc494aa48ac5ac))

### [1.142.1](https://github.com/raas-dev/configent/compare/1.142.0...1.142.1) (2025-04-19)


### Fixes

* **aichat:** Remove unused prompts ([ce1727f](https://github.com/raas-dev/configent/commit/ce1727f4141a5eac1113d995b1e7514287e30493))
* **aichat:** Set default role for REPL ([b25387d](https://github.com/raas-dev/configent/commit/b25387df396d4aa7115593685dbdd5ef95552e83))

## [1.142.0](https://github.com/raas-dev/configent/compare/1.141.6...1.142.0) (2025-04-19)


### Features

* **ai:** Use goose over aichat in terminal ([942ec22](https://github.com/raas-dev/configent/commit/942ec22a9756f588f3c01b93a72f571b4b08e13c))
* **git:** add lumen for creating commit messages ([12e0273](https://github.com/raas-dev/configent/commit/12e02739d1d677a8a72468aca7b80a878b576a63))


### Fixes

* **aichat:** Remove broken zsh integration ([3c299c5](https://github.com/raas-dev/configent/commit/3c299c5860b31a4608cae20af37a528d1a41e414))
* **aider:** Install aider ([3df4aed](https://github.com/raas-dev/configent/commit/3df4aede1e144c0dacadca47106268da1ceaaea4))
* **azure:** Install PowerShell Azure module if pwsh ([da40691](https://github.com/raas-dev/configent/commit/da40691d1027382a276f49a3157e532c962abd11))
* **continue:** Change OpenRouter model to Claude 3.7 Sonnet ([670c71d](https://github.com/raas-dev/configent/commit/670c71d6c41f259299def762014861932dbd3603))
* **continue:** Enable tools and images for gpt-4.1 ([e975363](https://github.com/raas-dev/configent/commit/e9753637b4909ff2ee2b39dc86a376fcfac39cfc))
* **continue:** Use Gemini 2.5 flash as fast model ([3ebc74f](https://github.com/raas-dev/configent/commit/3ebc74fc3842cddea26f89f013f348c1df3dd919))
* **gemini:** Use 2.5 preview (paid), not 2.5 exp ([c1a3952](https://github.com/raas-dev/configent/commit/c1a3952748df059f7ed8858bc8bd49450b9c6608))
* **postinstall_azure:** Install Microsoft.Graph PS module ([3d29a2a](https://github.com/raas-dev/configent/commit/3d29a2a03983a75bfff06be6f544c72ea92af7ff))
* **postinstall_azure:** Trust PSGallery for Az module install ([445b615](https://github.com/raas-dev/configent/commit/445b61501dd230d01757d482e8cc2fefdb00265a))
* **rust:** Add mdcat ([7faf783](https://github.com/raas-dev/configent/commit/7faf7837f07bb85d463cb5ec6f952f102bad2b8d))
* **topgrade:** Do not upgrade powershell modules ([776f9ea](https://github.com/raas-dev/configent/commit/776f9eabf5c62dd8bdcd7d5bca8fd9282907ba51))

### [1.141.6](https://github.com/raas-dev/configent/compare/1.141.5...1.141.6) (2025-04-15)


### Fixes

* **aider:** Disable aider due to yanked dependency ([bccd5d6](https://github.com/raas-dev/configent/commit/bccd5d636f82a55665303bd471822086a71f126c))
* **continue:** Add OpenAI gpt-4.1 settings ([715368d](https://github.com/raas-dev/configent/commit/715368da3d0dfb0469f23eec4c6452b028d70373))
* **continue:** OpenAI to use gpt-4.1 and gpt-4.1-mini ([c46a14a](https://github.com/raas-dev/configent/commit/c46a14a607efd3c999b6b6a96daae2fb125be4ed))
* **keybindings:** Remove breadcrumbs toggle keybinding ([5ee74d8](https://github.com/raas-dev/configent/commit/5ee74d895a629340492fcfc3b3e85490b1cee841))
* **vscode:** Add cSpell and enable it for plain text ([25eb122](https://github.com/raas-dev/configent/commit/25eb122b341fe6c1caf2703237503839414d5fd2))

### [1.141.5](https://github.com/raas-dev/configent/compare/1.141.4...1.141.5) (2025-04-09)


### Fixes

* **azure:** Add az extension for bastion ([9267a06](https://github.com/raas-dev/configent/commit/9267a0601fd8dc300c4e470f54cc047e8758c1b2))
* **azure:** Remove obsolete `az next` CLI extension ([723aa5b](https://github.com/raas-dev/configent/commit/723aa5bbd5d5a4c0e04f613732eb8bd93be6753d))

### [1.141.4](https://github.com/raas-dev/configent/compare/1.141.3...1.141.4) (2025-04-08)


### Fixes

* **continue:** Add gemini-2.0-flash as reranker ([b18c486](https://github.com/raas-dev/configent/commit/b18c486c9bcba37044446f06f67d2df1502ede19))
* **macos:** Add script to reset external keyboard type ([1d79785](https://github.com/raas-dev/configent/commit/1d797853b31a74516c8b90765299d2a31c1fd7ee))
* **reset_keyboard_type:** Correct typo in sudo prompt message ([4fd065d](https://github.com/raas-dev/configent/commit/4fd065d29f15b9d99a36c11065137be10545af65))

### [1.141.3](https://github.com/raas-dev/configent/compare/1.141.2...1.141.3) (2025-04-02)


### Fixes

* **gptme:** Update config for Python 3.11 and RAG ([a5fd591](https://github.com/raas-dev/configent/commit/a5fd591ae99274b9ff2f23d415f1fd677e8e45cb))

### [1.141.2](https://github.com/raas-dev/configent/compare/1.141.1...1.141.2) (2025-04-02)


### Fixes

* **gptme:** Remove explicit gptme-rag install ([c2db113](https://github.com/raas-dev/configent/commit/c2db113ccdebc51db930def4949d536ac79ea0e1))

### [1.141.1](https://github.com/raas-dev/configent/compare/1.141.0...1.141.1) (2025-04-02)


### Fixes

* **.aliases:** Add aliases for latest gptme ([89e4237](https://github.com/raas-dev/configent/commit/89e42378015139b6640d1eb9932639064e6642fc))
* **.aliases:** Add claude alias for Claude Code ([db7b630](https://github.com/raas-dev/configent/commit/db7b6306e8c1d53ec85590587fa9871e18c8de7d))
* **.aliases:** Remove default gptme session name ([fcd7573](https://github.com/raas-dev/configent/commit/fcd757344506f289361b5fad1696a76b1d87b15c))
* **.aliases:** Remove default name argument from gptme alias ([174988f](https://github.com/raas-dev/configent/commit/174988f77ce811d52c782e08608ded465c4da234))
* **ai:** Add gptme ([3eb3092](https://github.com/raas-dev/configent/commit/3eb30928bae3293126e8ce5779870b94153a66da))
* **gptme:** Add support for gptme-rag ([f9d4880](https://github.com/raas-dev/configent/commit/f9d4880b33a2c336b5c6cd58c95caa8d1faafc9f))
* **gptme:** Add upcoming mcp configuration ([0ea4801](https://github.com/raas-dev/configent/commit/0ea48013e47ed7256d2c9e9579dcfb32bdc719b7))
* **gptme:** Resume session ([f9de5db](https://github.com/raas-dev/configent/commit/f9de5db4f1ba885e38e32f066ce5a75fe5112c34))

## [1.141.0](https://github.com/raas-dev/configent/compare/1.140.24...1.141.0) (2025-04-02)


### Features

* **ai:** Add Goose ([9edb56f](https://github.com/raas-dev/configent/commit/9edb56f9ac311a7122d17210d56a89854dd18e73))


### Fixes

* **aichat:** Migrate config to aichat 0.29.0 ([eb9e2c5](https://github.com/raas-dev/configent/commit/eb9e2c55e52bf8c778bdbfa30d80a45371acefd2))

### [1.140.24](https://github.com/raas-dev/configent/compare/1.140.23...1.140.24) (2025-04-01)


### Fixes

* **aichat:** Add gemma3 ([8d8741e](https://github.com/raas-dev/configent/commit/8d8741e7762a9c6f2bf5db7db32d90ff352552ef))
* **aichat:** Remove explicit tool use from prompts ([708bbb2](https://github.com/raas-dev/configent/commit/708bbb2317f007d743182e7b51867f7b2a6cbef2))
* **fabric:** Update assistant prompts ([96df8b4](https://github.com/raas-dev/configent/commit/96df8b48eb71a9d48b2b9fc596e7d03c3a2c2aea))

### [1.140.23](https://github.com/raas-dev/configent/compare/1.140.22...1.140.23) (2025-03-31)


### Fixes

* **settings:** Enable CodeLens due to git merge editor ([f68ac29](https://github.com/raas-dev/configent/commit/f68ac29b55d188006e474b1ba78b5818171122f3))

### [1.140.22](https://github.com/raas-dev/configent/compare/1.140.21...1.140.22) (2025-03-31)


### Fixes

* **aliases:** fix `c` passing DOCKER_HOST to oxker ([943bd67](https://github.com/raas-dev/configent/commit/943bd67f235ca5c2255d33414b92a0756cc1f6a5))
* **bash:** Add bash-preexec to fix atuin history ([b0623bb](https://github.com/raas-dev/configent/commit/b0623bb4ebaedb7e548553c8d15df8f0e20fc04f))
* **vscode:** Disable Code Lens ([f86cda2](https://github.com/raas-dev/configent/commit/f86cda22dcdd0cc70f8f821ea6f8396b38491e43))

### [1.140.21](https://github.com/raas-dev/configent/compare/1.140.20...1.140.21) (2025-03-30)


### Fixes

* **aliases:** Add whl extract support for e() ([0def2d3](https://github.com/raas-dev/configent/commit/0def2d30e8128b22fee69c55e5e9a3309b7a4bc7))

### [1.140.20](https://github.com/raas-dev/configent/compare/1.140.19...1.140.20) (2025-03-28)


### Fixes

* **mise:** Fix remove existing symlink ([2e56c74](https://github.com/raas-dev/configent/commit/2e56c74e6ddf350cccb54997ddde0dbe58e2c124))

### [1.140.19](https://github.com/raas-dev/configent/compare/1.140.18...1.140.19) (2025-03-27)


### Fixes

* **code:** Fix typo in app name ([a533168](https://github.com/raas-dev/configent/commit/a5331684e92517619cdced5c2b779ed8ed3d9e61))
* **macos:** Add duti ([0901e16](https://github.com/raas-dev/configent/commit/0901e16ba63df138e001c5449fbbe81e65c8fec7))
* **macos:** Register URL handler for vscode:// ([cb54643](https://github.com/raas-dev/configent/commit/cb54643e4f11764581dcdd5b5191c91f4fa03a83))

### [1.140.18](https://github.com/raas-dev/configent/compare/1.140.17...1.140.18) (2025-03-27)


### Fixes

* **aliases:** Add sqlcmd via n ([8148b14](https://github.com/raas-dev/configent/commit/8148b14e9ef20e0a71217d86fd9ce41de50b5eb7))
* **n:** Use latest NixOS Docker image ([df8fb72](https://github.com/raas-dev/configent/commit/df8fb72517e08f1005cfa2b71697790dbd426f8a))

### [1.140.17](https://github.com/raas-dev/configent/compare/1.140.16...1.140.17) (2025-03-26)


### Fixes

* **.aliases:** Add --fixed-strings to rg alias s ([27ba8eb](https://github.com/raas-dev/configent/commit/27ba8ebe17fe60b157285bc74d9fcda228419368))
* **continue:** Fix Gemini 2.5 Pro context length ([1f2a713](https://github.com/raas-dev/configent/commit/1f2a71334cde77d2f53a9385aca5d7cf9fdcd82b))
* **continue:** Remove legacy LLMs ([08d2154](https://github.com/raas-dev/configent/commit/08d21542cb9f88a12c231703ee5d04af851a3df7))

### [1.140.16](https://github.com/raas-dev/configent/compare/1.140.15...1.140.16) (2025-03-26)


### Fixes

* **aichat:** Use Gemini 2.5 Pro as the default LLM ([69380e2](https://github.com/raas-dev/configent/commit/69380e233c56db40dcfed12d9f906cd0721772b4))

### [1.140.15](https://github.com/raas-dev/configent/compare/1.140.14...1.140.15) (2025-03-26)


### Fixes

* **ai:** Prefer Gemini 2.5 Pro as the default LLM ([7fd273c](https://github.com/raas-dev/configent/commit/7fd273cb561a217f11ca98b21d09fd91c48fdcac))

### [1.140.14](https://github.com/raas-dev/configent/compare/1.140.13...1.140.14) (2025-03-25)


### Fixes

* **keybindings:** Add keybinding for composerMode.agent ([39fd653](https://github.com/raas-dev/configent/commit/39fd6533cf282e161ef20a9b80eb19daac6a944e))

### [1.140.13](https://github.com/raas-dev/configent/compare/1.140.12...1.140.13) (2025-03-22)


### Fixes

* **install_apps_cask:** Add no-quarantine to Cask install opts ([f55c914](https://github.com/raas-dev/configent/commit/f55c914c3d757339000ac1f369a3989fdd1828e9))
* **mise:** Update java 17 -> 21 ([8dcdea7](https://github.com/raas-dev/configent/commit/8dcdea776daee651c1705d642b73dae8a3839e0f))
* **mise:** Update ruby ([298e571](https://github.com/raas-dev/configent/commit/298e5718d7a5513b6b9d352b0e2cdb2ea3b3649b))

### [1.140.12](https://github.com/raas-dev/configent/compare/1.140.11...1.140.12) (2025-03-19)


### Fixes

* **settings:** Enable VS Code prereleases ([562ac84](https://github.com/raas-dev/configent/commit/562ac840520fb36d6efeac906e33638ac54eed10))
* **settings:** Ignore markdown files in cursor.cpp ([3c41542](https://github.com/raas-dev/configent/commit/3c415424fd6c3882714fc151f4fb8a16a3bd19ae))
* **vscode:** Add keybinding for generating git commit message ([c8717e3](https://github.com/raas-dev/configent/commit/c8717e384719621f874cad4d89c291d5fb3b0429))

### [1.140.11](https://github.com/raas-dev/configent/compare/1.140.10...1.140.11) (2025-03-17)


### Fixes

* **ai:** Remove GenAIScript ([59c8e71](https://github.com/raas-dev/configent/commit/59c8e71945b29dd7092fef496a9e6080c360c873))
* **create_extensions_list:** Correct variable assignment ([cd33ec1](https://github.com/raas-dev/configent/commit/cd33ec1c848480b3dd35684374f0703adbc09eb5))
* **install_apps_cask:** Unconditionally install Cursor and VS Code ([3ab5a62](https://github.com/raas-dev/configent/commit/3ab5a6213940caa7641c042568d428e87958b521))
* **keybindings:** Remove continue.debugTerminal command ([7291148](https://github.com/raas-dev/configent/commit/7291148998499c9b5daf920379af30ca92bafe63))
* **settings:** Disable tab autocomplete in VS Code ([6b6ba75](https://github.com/raas-dev/configent/commit/6b6ba750f61408f79964c0a8ef76b3182ec1a197))

### [1.140.10](https://github.com/raas-dev/configent/compare/1.140.9...1.140.10) (2025-03-17)


### Fixes

* **code:** Remove support for VSCodium ([8864f04](https://github.com/raas-dev/configent/commit/8864f04b6d4d297b4f47e93f44cc90065237c007))
* **install_apps_cask:** Add windsurf to cask install script ([1459f28](https://github.com/raas-dev/configent/commit/1459f2827312f4138c9fb61f242f0679bf4cc43b))

### [1.140.9](https://github.com/raas-dev/configent/compare/1.140.8...1.140.9) (2025-03-16)


### Fixes

* **install_apps_cask:** Force install with no-quarantine flag ([7fea86b](https://github.com/raas-dev/configent/commit/7fea86bc9f73df0938bb2ea850a2da6c8b05c66e))
* **keybindings:** Remove conflicting Continue keybindings ([e919f49](https://github.com/raas-dev/configent/commit/e919f49c3ee8ed032d5898e28b99e2202a03635f))
* **keybindings:** Remove duplicate Continue shortcut ([ff4a2dc](https://github.com/raas-dev/configent/commit/ff4a2dc97cd5f5e3ce444c3c95bc9d99bb637fa7))
* **keybindings:** Remove duplicate pin editor commands ([85655f6](https://github.com/raas-dev/configent/commit/85655f65e43c6f1b5ce450938edafb343a61ca37))
* **settings:** Disable VS Code chat command center ([e855ff6](https://github.com/raas-dev/configent/commit/e855ff64b00c4ecf1b08e9659d35907ce8c86c0b))
* **settings:** Move auxiliary activity bar to top ([26f7cd0](https://github.com/raas-dev/configent/commit/26f7cd0f6a6bd92f90bc43922ed68361398192e3))

### [1.140.8](https://github.com/raas-dev/configent/compare/1.140.7...1.140.8) (2025-03-16)


### Fixes

* **ai:** Update assistant prompts created by fabric ([62650b7](https://github.com/raas-dev/configent/commit/62650b77240b7fb275278c07bead56b533e08775))

### [1.140.7](https://github.com/raas-dev/configent/compare/1.140.6...1.140.7) (2025-03-14)


### Fixes

* **ai:** Rename envvars AZURE_AI_ to AZURE_FOUNDRY_ ([dc0f208](https://github.com/raas-dev/configent/commit/dc0f208295a5be02d1b6bcc778cd1e181d0535fd))
* **install_apps_cask:** Force install packages with brew ([53080d9](https://github.com/raas-dev/configent/commit/53080d9d84c4a41f92f96fd1601bf89d98dadaec))

### [1.140.6](https://github.com/raas-dev/configent/compare/1.140.5...1.140.6) (2025-03-02)


### Fixes

* **settings:** Fix default Python interpreter path ([f5e92fd](https://github.com/raas-dev/configent/commit/f5e92fd645b5533ae8b6f2a79ef813b9008279a2))

### [1.140.5](https://github.com/raas-dev/configent/compare/1.140.4...1.140.5) (2025-02-26)


### Fixes

* **extensions:** Remove debugpy from extensions list ([ab09d9e](https://github.com/raas-dev/configent/commit/ab09d9ef1f7f09bb6f06a4386e99ac7494dc3d8a))

### [1.140.4](https://github.com/raas-dev/configent/compare/1.140.3...1.140.4) (2025-02-26)


### Fixes

* **config:** Switch to mistral-small:24b ([3b8201e](https://github.com/raas-dev/configent/commit/3b8201e01fd6afb6fb553bcb8e901a195a15d8d0))
* **continue:** Add claude-3-7-sonnet-20250219 ([2e92c47](https://github.com/raas-dev/configent/commit/2e92c47103b4d4e8c9afd4c1e39af1fe7bc40e8a))
* **continue:** Remove claude 3.5 sonnet ([c3fdc3e](https://github.com/raas-dev/configent/commit/c3fdc3e8ee19077c6908ba7d23fd942a9d526f7a))
* **continue:** Remove unused defaultContext option ([3a0ac5e](https://github.com/raas-dev/configent/commit/3a0ac5e136e0127283be70a432af61c9c44efc7d))
* **continue:** Use currentFile as default context ([6b51edb](https://github.com/raas-dev/configent/commit/6b51edb6b42dbbdb9b7dbd38e05d7a8ee5cf9e74))

### [1.140.3](https://github.com/raas-dev/configent/compare/1.140.2...1.140.3) (2025-02-25)


### Fixes

* **aliases:** Remove unused macos aliases ([f23b673](https://github.com/raas-dev/configent/commit/f23b6730e436cb2bd26708e14537e0f95e865176))
* **aliases:** Rename alias cleanupds to cds ([0487a93](https://github.com/raas-dev/configent/commit/0487a932e00f7fbb3bd5879ce8e11e003bdf2cb9))
* **nodejs:** Update Node.js minor version ([c014f5c](https://github.com/raas-dev/configent/commit/c014f5c02ba71794edc7e8d6f75faf8069a8da40))

### [1.140.2](https://github.com/raas-dev/configent/compare/1.140.1...1.140.2) (2025-02-24)


### Fixes

* **vscode:** Increase minimap width slightly ([285f9e7](https://github.com/raas-dev/configent/commit/285f9e72e73fb64f2ad81e0d0cc47b65d88a71b6))

### [1.140.1](https://github.com/raas-dev/configent/compare/1.140.0...1.140.1) (2025-02-22)


### Fixes

* **settings:** Truncate GitLens status bar message ([6c9e145](https://github.com/raas-dev/configent/commit/6c9e14514b8129c7339005e75c3c68f2e0816495))
* **vscode:** Decrease minimap width ([a8da68b](https://github.com/raas-dev/configent/commit/a8da68b119d1d12a6b85aa7a0d26830842219cb7))

## [1.140.0](https://github.com/raas-dev/configent/compare/1.139.6...1.140.0) (2025-02-22)


### Features

* **vscode:** Add GenAiScript extension to list ([e15659d](https://github.com/raas-dev/configent/commit/e15659d5a5bda85cd561c1232bb211877db3ea77))


### Fixes

* **settings:** Improve GitLens status bar readability ([0b3897d](https://github.com/raas-dev/configent/commit/0b3897dc0cfe7dba27eb87d89405a9b54017d714))
* **vscode:** Use ; in CSV preview ([b2592e5](https://github.com/raas-dev/configent/commit/b2592e5d4eaf88a686335677cb6cf1e6307a720c))

### [1.139.6](https://github.com/raas-dev/configent/compare/1.139.5...1.139.6) (2025-02-20)


### Fixes

* **vscode:** Decrease font size by 0.50 ([13baed7](https://github.com/raas-dev/configent/commit/13baed730a021bc3e9b6e90b25ef0ae2ed095649))
* **vscode:** Increase letter spacing ([4b0b62a](https://github.com/raas-dev/configent/commit/4b0b62af80d21d5a6f5c838e7b2c483671564298))

### [1.139.5](https://github.com/raas-dev/configent/compare/1.139.4...1.139.5) (2025-02-20)


### Fixes

* **macos:** Do not enable auto-update for apps ([824220e](https://github.com/raas-dev/configent/commit/824220ef521ef3c3b7a80bd4fbe96977ff2f494c))
* **vscode:** Use bold font in editor and terminal ([5e8ec8b](https://github.com/raas-dev/configent/commit/5e8ec8b1812560fb5f957548a714fd7e42ee558c))

### [1.139.4](https://github.com/raas-dev/configent/compare/1.139.3...1.139.4) (2025-02-20)


### Fixes

* **vscode:** Decrease letter spacing ([0a33a5a](https://github.com/raas-dev/configent/commit/0a33a5a2e3a99ba42b9f82bde9a05b52ea3651cd))
* **vscode:** Increase font size ([15c154b](https://github.com/raas-dev/configent/commit/15c154b9ccd2d93f359b770ca07df4d9470d96b0))

### [1.139.3](https://github.com/raas-dev/configent/compare/1.139.2...1.139.3) (2025-02-20)


### Fixes

* **vscode:** Decrease editor font size ([ee3db7b](https://github.com/raas-dev/configent/commit/ee3db7b393be7c7f117dee1c9d2e8372b596ef23))
* **vscode:** Decrease font size by 0.50 ([47daff5](https://github.com/raas-dev/configent/commit/47daff53652e078c4025a766e2c4f8eb0a23f298))
* **vscode:** Decrease terminal font size ([47b3750](https://github.com/raas-dev/configent/commit/47b3750ee384b5d1ea8115e806783d1f63d8b543))
* **vscode:** Make minimap proportional size ([0a197c8](https://github.com/raas-dev/configent/commit/0a197c814a9ee7d4739de845699f62482c943116))
* **vscode:** Revert decrease font size by 0.50 ([c91ef47](https://github.com/raas-dev/configent/commit/c91ef47bc29a48aca7171e22011f9de1a91c56ee))

### [1.139.2](https://github.com/raas-dev/configent/compare/1.139.1...1.139.2) (2025-02-20)


### Fixes

* **aichat:** Add azure-openai o3-mini ([80565de](https://github.com/raas-dev/configent/commit/80565de55cc41fe029f948725f412d0119b83fd4))
* **aichat:** Add bedrock ([ba32334](https://github.com/raas-dev/configent/commit/ba3233400a9cf132caacb6002f24a9bef029b67b))
* **continue:** Add missing options to Azure AI models ([8a5b68d](https://github.com/raas-dev/configent/commit/8a5b68d8b6acce0715fe75147a48d8446b5cec2a))
* **macos:** Do not show hidden files by default ([ee08dec](https://github.com/raas-dev/configent/commit/ee08decba1184564342f8ba21ee0fc4d0245a6c2))
* **vscode:** Update models ([737f5a2](https://github.com/raas-dev/configent/commit/737f5a2380e3e62899975777375cbe8b2f88dcc2))

### [1.139.1](https://github.com/raas-dev/configent/compare/1.139.0...1.139.1) (2025-02-19)


### Fixes

* **aliases:** Remove extra file from resetkeyboard ([6e56a0f](https://github.com/raas-dev/configent/commit/6e56a0f9430266e3248dee577f345b2621e68cce))
* **macos:** Remove obsolete reset dock ([72c30c0](https://github.com/raas-dev/configent/commit/72c30c042a5a39f6aece6f55888472c55c70771a))
* **vscode:** Decrease minimap width ([67575ba](https://github.com/raas-dev/configent/commit/67575baf713a508aad6ba5909f542a4d4f20ad2c))
* **vscode:** Disable git terminal authentication ([e908979](https://github.com/raas-dev/configent/commit/e90897946372056aba6aa856f15939931aac6d2d))

## [1.139.0](https://github.com/raas-dev/configent/compare/1.138.6...1.139.0) (2025-02-17)


### Features

* **mise:** Add gcloud sdk ([b113e71](https://github.com/raas-dev/configent/commit/b113e7136289d2d12ca56f216448dc88fc1a6f31))

### [1.138.6](https://github.com/raas-dev/configent/compare/1.138.5...1.138.6) (2025-02-15)


### Fixes

* **continue:** Remove AiDD MCP Server ([4dc5975](https://github.com/raas-dev/configent/commit/4dc59755b56986c99e8aee5d3a8012bc069bfbb8))

### [1.138.5](https://github.com/raas-dev/configent/compare/1.138.4...1.138.5) (2025-02-13)


### Fixes

* **vscode:** Update mise env automatically in terminal ([9f26bb3](https://github.com/raas-dev/configent/commit/9f26bb363444ee25b770583c29cb307d616cd639))

### [1.138.4](https://github.com/raas-dev/configent/compare/1.138.3...1.138.4) (2025-02-11)


### Fixes

* **aider-chat:** Update to 0.74.2 ([a98ad92](https://github.com/raas-dev/configent/commit/a98ad922391decb060986407eee0a637ada792b3))

### [1.138.3](https://github.com/raas-dev/configent/compare/1.138.2...1.138.3) (2025-02-09)


### Fixes

* **continue:** Add deepseek-r1:14b via ollama ([ac5e78a](https://github.com/raas-dev/configent/commit/ac5e78abf2b38c6661705c7913f2ff4c359b76b5))
* **watch:** Use viddy, remove hwatch ([54ee837](https://github.com/raas-dev/configent/commit/54ee8377621d97f663953876ef2ba5430decc3a3))

### [1.138.2](https://github.com/raas-dev/configent/compare/1.138.1...1.138.2) (2025-02-08)


### Fixes

* **rust:** Add opscan ([37b69cb](https://github.com/raas-dev/configent/commit/37b69cb08d46287be56a34ddf8ef5f4548df8547))

### [1.138.1](https://github.com/raas-dev/configent/compare/1.138.0...1.138.1) (2025-02-08)


### Fixes

* **ai:** Do not save session by default ([c84bb52](https://github.com/raas-dev/configent/commit/c84bb5292cfccddd09bbbe683882f8d8ec9782ee))
* **ai:** Remove ai_developer agent ([8331b95](https://github.com/raas-dev/configent/commit/8331b95ac01278636482a606c413544d0931d331))

## [1.138.0](https://github.com/raas-dev/configent/compare/1.137.6...1.138.0) (2025-02-08)


### Features

* **docker:** Add oxker ([573ce75](https://github.com/raas-dev/configent/commit/573ce75b1c96f812984b6fd8dd7f056a0dd40f47))


### Fixes

* **aliases:** Add binsider via n ([709e2c9](https://github.com/raas-dev/configent/commit/709e2c975b9713d5b1bac1ba21571a6c5844acab))
* **aliases:** Add openapi-tui via n ([f124706](https://github.com/raas-dev/configent/commit/f1247065c8396a1acb0a40e9e9941e2551fc1db6))
* **aliases:** Add termscp via n ([fa6fb42](https://github.com/raas-dev/configent/commit/fa6fb42ed53fa8bac0289ffcc252ce9f397b02a6))
* **aliases:** Add trippy via n ([afe72d3](https://github.com/raas-dev/configent/commit/afe72d34969de86daa075d99c46298959e0d6a13))

### [1.137.6](https://github.com/raas-dev/configent/compare/1.137.5...1.137.6) (2025-02-08)


### Fixes

* **rust:** Add gping ([082462c](https://github.com/raas-dev/configent/commit/082462cf0decbf9cda0997c447be82b92d96ce71))
* **rust:** Add jnv ([9beac46](https://github.com/raas-dev/configent/commit/9beac4679c37c834c5ad5630c0a3eaf4d9440fea))

### [1.137.5](https://github.com/raas-dev/configent/compare/1.137.4...1.137.5) (2025-02-08)


### Fixes

* **config:** Default to bottom search bar in TUI ([61691ce](https://github.com/raas-dev/configent/commit/61691cef12cdd61c4813f5583e5ccdc502a0a2e3))

### [1.137.4](https://github.com/raas-dev/configent/compare/1.137.3...1.137.4) (2025-02-08)


### Fixes

* **.profile:** Disable PowerShell update check ([b8f9eab](https://github.com/raas-dev/configent/commit/b8f9eab09851c74cdc3928ddbb23da1f8a89bf08))
* **bash:** Add carapace ([dd57301](https://github.com/raas-dev/configent/commit/dd57301e06f3aa4a173ce5485877e5e7062925c6))
* **pwsh:** Add carapace ([0b7eff3](https://github.com/raas-dev/configent/commit/0b7eff3861b206ddc8bdf9c1698ba43340dd4e9f))

### [1.137.3](https://github.com/raas-dev/configent/compare/1.137.2...1.137.3) (2025-02-08)


### Fixes

* **atuin:** Add config ([4ff4142](https://github.com/raas-dev/configent/commit/4ff4142e248a7c282293a6b68c3d8605f5c142b3))
* **atuin:** Change style ([faf1aac](https://github.com/raas-dev/configent/commit/faf1aac24e0d5f493cbc0078d0d05dca815b2237))
* **settings:** Hide mise tool version decorations ([cebd717](https://github.com/raas-dev/configent/commit/cebd7179888c7d2e1101238ecf23723959c83afe))

### [1.137.2](https://github.com/raas-dev/configent/compare/1.137.1...1.137.2) (2025-02-08)


### Fixes

* **bash:** Fix bash completion logic ([d46b469](https://github.com/raas-dev/configent/commit/d46b46942fc48a2b5504b4025292c74622c0ca5c))
* **bash:** Remove completion coloring ([aab7b8b](https://github.com/raas-dev/configent/commit/aab7b8b7f35d5ec1998ac30b511aea99ebe31f77))
* **bash:** Remove unused keybindings ([2a27d74](https://github.com/raas-dev/configent/commit/2a27d741cd5079cd2da3e1316cedb267eae3b844))
* **macos:** Install bash-completion from brew ([a74a7fb](https://github.com/raas-dev/configent/commit/a74a7fb0408016d0126b54a524f54c5e2ae6d842))

### [1.137.1](https://github.com/raas-dev/configent/compare/1.137.0...1.137.1) (2025-02-08)


### Performance

* **bootstrap:** Git clone repos using --depth 1 ([acb1680](https://github.com/raas-dev/configent/commit/acb1680cf9f42cefd4e39a607f1bd6eb5f35f29f))

## [1.137.0](https://github.com/raas-dev/configent/compare/1.136.4...1.137.0) (2025-02-08)


### Features

* **shell:** Add atuin, remove fzf shell keybundings ([7d6092e](https://github.com/raas-dev/configent/commit/7d6092e5defec0dae7f84bfce6df9f0498bc7e36))


### Fixes

* **ai:** Remove kluster.ai support, is slow ([fa1536f](https://github.com/raas-dev/configent/commit/fa1536faa81f3422afebc3944ee8dd05fca87d4e))

### [1.136.4](https://github.com/raas-dev/configent/compare/1.136.3...1.136.4) (2025-02-06)


### Fixes

* **aichat:** Add reasoning support ([683cf1e](https://github.com/raas-dev/configent/commit/683cf1ee69c8f321e86741669e73309725294b99))
* **aichat:** Use gemini 2.0 pro exp by default ([dc62af1](https://github.com/raas-dev/configent/commit/dc62af1fdcf1340a54e4ea048d2ef2d504bde4dd))
* **aliases:** Add genaiscript and promptfoo ([a3f14ac](https://github.com/raas-dev/configent/commit/a3f14acd665a4aa69c67528a46e8fed99e5bf6ba))
* **config:** Reduce Gemini model context length ([0c8db0d](https://github.com/raas-dev/configent/commit/0c8db0d2f12c764eb6d489e0ed147e4ea86ad644))
* **continue:** Add gemini 2.0 pro exp ([b46b8f9](https://github.com/raas-dev/configent/commit/b46b8f9cbe11d2c4f3a2c202ee67886acc310423))

### [1.136.3](https://github.com/raas-dev/configent/compare/1.136.2...1.136.3) (2025-02-05)


### Fixes

* **mise:** Use postinstall over .default-x-packages ([3e38235](https://github.com/raas-dev/configent/commit/3e382350edcb93b955fd2f75435bea434f82fd71))
* **vscode:** Close debug console on session end ([ac420c2](https://github.com/raas-dev/configent/commit/ac420c23473433bbfbbe14ab12f4a275f2d69b13))
* **vscode:** Move linenum toggle statusbar button right ([b7a1348](https://github.com/raas-dev/configent/commit/b7a1348faf1623a6c7fe0263260a1b7f0e6da37e))
* **vscode:** Open debug console on session start ([ef565bd](https://github.com/raas-dev/configent/commit/ef565bd143ef361948fe4d2c9a75c2f91dc11841))
* **vscode:** Remove buggy Makefile Tools extension ([f4bea00](https://github.com/raas-dev/configent/commit/f4bea009188a3a404f7264a33d0eb78311df3258))

### [1.136.2](https://github.com/raas-dev/configent/compare/1.136.1...1.136.2) (2025-02-05)


### Fixes

* **vscode:** Add mise extension to put shims in env ([3da3e66](https://github.com/raas-dev/configent/commit/3da3e66c535b131a6973a146b0c1f651b5dd3cf6))
* **vscode:** Disable powershell auto start ([0697bb5](https://github.com/raas-dev/configent/commit/0697bb50af414c2314f5a8ecc5e19848268d96a0))

### [1.136.1](https://github.com/raas-dev/configent/compare/1.136.0...1.136.1) (2025-02-05)


### Fixes

* **aliases:** Add aliases for printing terminal widths ([fcf5c9f](https://github.com/raas-dev/configent/commit/fcf5c9f2892a7f52b7f8fc130a24fddb31205048))
* **continue:** Add more [@context](https://github.com/context) providers ([ce5a5b6](https://github.com/raas-dev/configent/commit/ce5a5b616cf874a9db270d0a3df5e7940163814d))
* **continue:** Remove unused slash commands ([fe333fd](https://github.com/raas-dev/configent/commit/fe333fdbc91d8db0c95990feb1e3ec49279c0be8))
* **vscode:** Add /review ([4d5a535](https://github.com/raas-dev/configent/commit/4d5a535c981a9978982f477bf4cd234fb385829d))
* **vscode:** Add keybinding for clearing terminal ([c058a34](https://github.com/raas-dev/configent/commit/c058a34f6459fa4134d5fff830c7894bfda2f416))
* **vscode:** Decrease letter spacing by 0.1 ([fc8191e](https://github.com/raas-dev/configent/commit/fc8191e902a6ce1c52f5af2358a84b925e7efda0))
* **vscode:** Disable terminal GPU rendering ([c8d48da](https://github.com/raas-dev/configent/commit/c8d48daf658c73fbf79d672b3ee1ad505701b20f))
* **vscode:** Use .venv/bin/python as default interpreter ([770c8bc](https://github.com/raas-dev/configent/commit/770c8bc4cf6cce7b35823e7e018dda39df639860))

## [1.136.0](https://github.com/raas-dev/configent/compare/1.135.9...1.136.0) (2025-02-04)


### Features

* **vscode:** Add extension to toggle line numbers ([1c95405](https://github.com/raas-dev/configent/commit/1c9540541f409fc4c08e13173dc406b2de14d0bd))


### Fixes

* **vscode:** Add commit message to GitLens statusbar ([708a00c](https://github.com/raas-dev/configent/commit/708a00c885568b4bb1e0dd19482bb1567e7edfcf))
* **vscode:** Add GitLens shortcut to statusbar ([127c4a2](https://github.com/raas-dev/configent/commit/127c4a217e9c803d62ba2e9b8e4f4aaa775822f7))
* **vscode:** Disable line numbers, use statusbar toggle ([1314d9f](https://github.com/raas-dev/configent/commit/1314d9f46453d5acf90c3f11d1a9859148487581))

### [1.135.9](https://github.com/raas-dev/configent/compare/1.135.8...1.135.9) (2025-02-04)


### Fixes

* **.aliases:** Use ipv4 alias to get city for wttr ([48b8aec](https://github.com/raas-dev/configent/commit/48b8aec4abbd748212cc34f1dc145da0c93c529f))
* **aichat:** Add mistral small 3 via ollama ([12faca7](https://github.com/raas-dev/configent/commit/12faca7868a74fdddacf3cfcbe7c2fe222bed614))
* **continue:** Add mistral-small 3 via ollama ([0cc6c3a](https://github.com/raas-dev/configent/commit/0cc6c3acc7d325b9b55aa07b1f19cb4267f07853))
* **vscode:** Remove python envy extension ([9fa040b](https://github.com/raas-dev/configent/commit/9fa040bd8936246f39a4bb155555d6bd73ba1e29))

### [1.135.8](https://github.com/raas-dev/configent/compare/1.135.7...1.135.8) (2025-02-03)


### Fixes

* **aichat:** Add kluster.ai ([91a3eef](https://github.com/raas-dev/configent/commit/91a3eefc9e2886bb2844dc3d5e39ea153cef36f3))
* **aichat:** Add together.ai ([fa552d2](https://github.com/raas-dev/configent/commit/fa552d2766f3fc8f7c03d472cba4bb1a3a7e2a71))
* **aichat:** Do not force markdown in default chat ([e39b92d](https://github.com/raas-dev/configent/commit/e39b92dfac81c5e10a208847de77d9631e2c214f))
* **continue:** Add streaming in global completionOptions ([788950c](https://github.com/raas-dev/configent/commit/788950ce93d3a0cc391ef342b11c5f91dfb4d12e))
* **continue:** Add support for together.ai ([55d5fdc](https://github.com/raas-dev/configent/commit/55d5fdc75c37025b6e45a2896619b5643304b2e7))

### [1.135.7](https://github.com/raas-dev/configent/compare/1.135.6...1.135.7) (2025-02-02)


### Fixes

* **continue:** Update config ([ff5b0f0](https://github.com/raas-dev/configent/commit/ff5b0f0b606941382c62c2da803189130ecc1771))
* **continue:** Update config ([255c738](https://github.com/raas-dev/configent/commit/255c738f042d9f73a9486dcb48b66fffafec5975))
* **vscode:** Adjust gutter error icon size ([de0572a](https://github.com/raas-dev/configent/commit/de0572acd7a5b123e8ed4396a29deef434f4f657))
* **vscode:** Adjust window and font size ([4d0c6cb](https://github.com/raas-dev/configent/commit/4d0c6cbb77e4e49ae5bd291676bf57e1da2ab6b7))
* **vscode:** Decrease font size by 0.50 ([9d802c4](https://github.com/raas-dev/configent/commit/9d802c4a252ba72770d896d19ed496e8c4bd12bc))
* **zsh:** Remove inc_append_history over share_history ([89f5453](https://github.com/raas-dev/configent/commit/89f54530fceb0b42ace20174469b61a567e0ca2d))

### [1.135.6](https://github.com/raas-dev/configent/compare/1.135.5...1.135.6) (2025-02-02)


### Fixes

* **aichat:** Allow use of models via OpenRouter ([9217c67](https://github.com/raas-dev/configent/commit/9217c679c7951c96267f4c9f900dcbc6ba5ce1be))
* **aichat:** Use explicit default role ([927bcab](https://github.com/raas-dev/configent/commit/927bcabdf6f545d7944d1abfb513c941c0bd0d96))
* **ai:** Rename envvars AZURE_OPENAI_ -> AZURE_AI_ ([ae42e7b](https://github.com/raas-dev/configent/commit/ae42e7b86259d7899f20467f20e2047d179e5ce8))
* **continue:** Add o3-mini as option ([06bcf01](https://github.com/raas-dev/configent/commit/06bcf01eca77dd7a23fead5efaf1109e6c7f69ab))
* **continue:** Fix loading AZURE_AI_API_BASE ([dd6a7ba](https://github.com/raas-dev/configent/commit/dd6a7ba0e91a4910418cffc57dc74c4c7a130e09))
* **continue:** Improve loading API keys ([dbfd361](https://github.com/raas-dev/configent/commit/dbfd361a06d9248c4bb4b538cfbb50cd29edff67))

### [1.135.5](https://github.com/raas-dev/configent/compare/1.135.4...1.135.5) (2025-02-01)


### Fixes

* **aichat:** Use gemini-exp-1206 by default ([0a18345](https://github.com/raas-dev/configent/commit/0a18345eb26fef69ac14aac5d5a01eb778370d32))
* **vscode:** Decrease editor font size by 0.25 ([369398d](https://github.com/raas-dev/configent/commit/369398d209ba28281040bde7d4f92765317b234d))

### [1.135.4](https://github.com/raas-dev/configent/compare/1.135.3...1.135.4) (2025-02-01)


### Fixes

* **vscode:** Hide glyph margin ([27d8fb0](https://github.com/raas-dev/configent/commit/27d8fb06b3955753d6cecc11b7b99d6b84a6cb93))
* **vscode:** Remove deprecated Azure Account extension ([a563994](https://github.com/raas-dev/configent/commit/a56399463ec5a802203815d8a8179d48f1dfe138))
* **vscode:** Remove unused Microsoft extensions ([4b984f6](https://github.com/raas-dev/configent/commit/4b984f699968f999d7cca29e59d4b70889df003f))

### [1.135.3](https://github.com/raas-dev/configent/compare/1.135.2...1.135.3) (2025-02-01)


### Fixes

* **tmux:** Fix statusbar icons ([fb56d24](https://github.com/raas-dev/configent/commit/fb56d249b7a9fe7cae24fa53580c9fcf31b954ba))
* **vscode:** Decrease editor font size by 0.25 ([9781fab](https://github.com/raas-dev/configent/commit/9781fab7ec516cd15fb4ffc83835f26b5aa4a4e8))

### [1.135.2](https://github.com/raas-dev/configent/compare/1.135.1...1.135.2) (2025-01-31)


### Fixes

* **vscode:** Make minimap fit ([e2c03b7](https://github.com/raas-dev/configent/commit/e2c03b78e642e840de2531722b3fb95d4a92d2db))
* **vscode:** Move statusbar debugger left ([848d8c3](https://github.com/raas-dev/configent/commit/848d8c3622d9ee3eff7b95268744c6e25128e38b))

### [1.135.1](https://github.com/raas-dev/configent/compare/1.135.0...1.135.1) (2025-01-31)


### Fixes

* **aichat:** Add kluster.ai ([0afba25](https://github.com/raas-dev/configent/commit/0afba25552da8cd9e6f7a31b3f7fa9e52398622a))
* **vscode:** Decrease terminal font size ([c97b8de](https://github.com/raas-dev/configent/commit/c97b8deacc35ebf44be72f41a33e1e3e1c64f913))
* **vscode:** Disable editor code folding ([87372df](https://github.com/raas-dev/configent/commit/87372dfc7f79951bfc1864fb7b0562142a2d1ad3))
* **vscode:** Fill minimap ([ea33aee](https://github.com/raas-dev/configent/commit/ea33aeebad8daa9b9cf30a2e60846dc858a6aab0))
* **vscode:** Make minimap less width ([2cf5cc9](https://github.com/raas-dev/configent/commit/2cf5cc9219ae4e88a6d110945b4ed30ef69e41e6))

## [1.135.0](https://github.com/raas-dev/configent/compare/1.134.3...1.135.0) (2025-01-25)


### Features

* **mise:** Update most non-SDK tools to latest ([e7f5a63](https://github.com/raas-dev/configent/commit/e7f5a63dc9ced98351b4f7a976a68f0f80e00d90))

### [1.134.3](https://github.com/raas-dev/configent/compare/1.134.2...1.134.3) (2025-01-24)


### Fixes

* **aliases:** Check if kubectl is present for Lima ([5553455](https://github.com/raas-dev/configent/commit/5553455c00c75db54bf3216bcce3767ab2377fd7))
* **aliases:** Export GITHUB_TOKEN in Lima VMs ([ee27a2b](https://github.com/raas-dev/configent/commit/ee27a2b18883b95675c4b570029ed5daa53da364))
* **continue:** Add local deepseek-r1:14b as chat model ([8fda089](https://github.com/raas-dev/configent/commit/8fda0890daff9d819ec4e03252fbbff4f0950756))

### [1.134.2](https://github.com/raas-dev/configent/compare/1.134.1...1.134.2) (2025-01-22)


### Fixes

* **aichat:** Change embedding to nomic-embed-text ([214419e](https://github.com/raas-dev/configent/commit/214419e5b7ea08217ca1242b1e1a0a34073e9c2f))
* **aliases:** Add option to remove venv forcefully ([4fc72b1](https://github.com/raas-dev/configent/commit/4fc72b1aab186b1f05f2c6efcc77dc2b1b2e98fc))
* **continue:** Increase autocomplete delay and ignore txt ([7c26a47](https://github.com/raas-dev/configent/commit/7c26a475f26347869892c8c1281e29c1b0057696))
* **continue:** Use MistralAI codestral 22 for tab complete ([2e0923d](https://github.com/raas-dev/configent/commit/2e0923d175a2a3d1bd77c8cc83df500bc956d4ea))

### [1.134.1](https://github.com/raas-dev/configent/compare/1.134.0...1.134.1) (2025-01-20)


### Fixes

* **lima:** Add support for openSUSE tumbleweed ([9e231ac](https://github.com/raas-dev/configent/commit/9e231ac1a3be9f1b9c901d38437ad3e019a9879e))
* **opensuse:** Add missing development dependencies ([30552fc](https://github.com/raas-dev/configent/commit/30552fce040670064105df2e87a0d93a6a9e5289))

## [1.134.0](https://github.com/raas-dev/configent/compare/1.133.4...1.134.0) (2025-01-19)


### Features

* **macos:** Install gnupg ([1501d0a](https://github.com/raas-dev/configent/commit/1501d0a3fab3ea8a35b00c56c2f903c2896978bd))


### Fixes

* **mise:** Add support for cosign and slsa-verifier ([3dcc2e3](https://github.com/raas-dev/configent/commit/3dcc2e3b3b0c4d6b5a5096ef5c68dbaf14947603))
* **mise:** Use .default-npm-packages over npm backend ([07929bc](https://github.com/raas-dev/configent/commit/07929bc86cfad556ae6a3fd75d89ae91d54e7456))
* **node:** Update npm after install node ([c701a58](https://github.com/raas-dev/configent/commit/c701a5816e3a4308fe24f28d8df5d767161db43c))

### [1.133.4](https://github.com/raas-dev/configent/compare/1.133.3...1.133.4) (2025-01-19)


### Fixes

* **mise:** Fix topgrade postinstall ([946b043](https://github.com/raas-dev/configent/commit/946b04396198a0a40ca224918e41ca01d5d948b0))
* **mise:** Remove broken autocmpletion ([e4a06c6](https://github.com/raas-dev/configent/commit/e4a06c623c1f2e3dc701cbc0200219ca29281278))
* **profile:** Use command directly instead of which ([57fd9ad](https://github.com/raas-dev/configent/commit/57fd9adfec20141fc23d567471fa2fb727611863))

### [1.133.3](https://github.com/raas-dev/configent/compare/1.133.2...1.133.3) (2025-01-19)


### Fixes

* **azure:** Fix installing az extensions ([2d1070b](https://github.com/raas-dev/configent/commit/2d1070b88097ed5dd12543136f463d8a3766442f))
* **lima:** Update Ubuntu and Debian images ([de90e4d](https://github.com/raas-dev/configent/commit/de90e4df61c3549694c866de4ae75fb45de0e9a5))

### [1.133.2](https://github.com/raas-dev/configent/compare/1.133.1...1.133.2) (2025-01-19)


### Fixes

* **azure:** Fix install azure-cli ([3ce410d](https://github.com/raas-dev/configent/commit/3ce410d63c888c200211ee7206fb1a21aadce57a))

### [1.133.1](https://github.com/raas-dev/configent/compare/1.133.0...1.133.1) (2025-01-19)


### Fixes

* **lima:** Update Arch Linux, remove LegacyBIOS ([42feed0](https://github.com/raas-dev/configent/commit/42feed076e8e3f57bc5c05365a511c255d80b412))
* **linux:** Install neovim from repo ([45e4a34](https://github.com/raas-dev/configent/commit/45e4a34a3c37490e03b74528d53478a12fbdae74))
* **neovim:** Run neovim setup always, no by mise ([18645a7](https://github.com/raas-dev/configent/commit/18645a7ce368040423291e91b2abd5e89faa9c12))

## [1.133.0](https://github.com/raas-dev/configent/compare/1.132.1...1.133.0) (2025-01-18)


### Features

* **lima:** Update Alpine Linux to 3.20 ([8ce8872](https://github.com/raas-dev/configent/commit/8ce8872cd02ab3534ce0170427828b79da726e9a))
* **opensuse:** Update openSUSE to 15.6 ([9fa0a8d](https://github.com/raas-dev/configent/commit/9fa0a8db1be6451ed7785190d1c13d6157ad0fd0))

### [1.132.1](https://github.com/raas-dev/configent/compare/1.132.0...1.132.1) (2025-01-18)


### Fixes

* **centos:** Remove legacyBIOS to enable macOS vz support ([09eea98](https://github.com/raas-dev/configent/commit/09eea98a2aac4e31163ed4cb2a7fec2e0fa33c16))
* **yum:** Install which ([cdd9809](https://github.com/raas-dev/configent/commit/cdd9809e6c3323bb6a1ebf35ef4bb7f01ec387b2))

## [1.132.0](https://github.com/raas-dev/configent/compare/1.131.5...1.132.0) (2025-01-18)


### Features

* **lima:** Update Fedora to 41 ([6bf9adf](https://github.com/raas-dev/configent/commit/6bf9adff58caf66fa1ab86ed94711f1f0e3991c8))
* **lima:** Update to CentOS Stream 10 ([2fc5a94](https://github.com/raas-dev/configent/commit/2fc5a94f2085cdf57e689680132ebcf47ad2a3d5))


### Fixes

* **lima:** Add forward podman.sock for Fedora ([4057aa2](https://github.com/raas-dev/configent/commit/4057aa22a4292cd66b69a9d4cabb885a3aa58b91))
* **lima:** Exclude 9p mount type for CentOS-likes ([e9992cc](https://github.com/raas-dev/configent/commit/e9992cca15a52e69b7ab03aef6f5170571cc1739))
* **mise:** Use latest bun ([31d8eaa](https://github.com/raas-dev/configent/commit/31d8eaa826d1d3879aad99feba084fa711a0c1b2))

### [1.131.5](https://github.com/raas-dev/configent/compare/1.131.4...1.131.5) (2025-01-18)


### Fixes

* **lima:** Add GITHUB_TOKEN to guest /etc/environment ([6242220](https://github.com/raas-dev/configent/commit/62422206fda0a458ce84028aad4033788e962fba))
* **lima:** Add support for vzNAT on macOS ([6ebd78a](https://github.com/raas-dev/configent/commit/6ebd78a80bf9006a679fddff59c90c053a24728f))

### [1.131.4](https://github.com/raas-dev/configent/compare/1.131.3...1.131.4) (2025-01-18)


### Fixes

* **lima:** Use user-v2 network by default ([7793b3a](https://github.com/raas-dev/configent/commit/7793b3aebb87c934e8af9b97c1860806d786c711))
* **vscode:** Change keybinding for pin/unpin tab ([650b9df](https://github.com/raas-dev/configent/commit/650b9df9d80fba93ee8fb57fbf46aecce2b7871a))

### [1.131.3](https://github.com/raas-dev/configent/compare/1.131.2...1.131.3) (2025-01-18)


### Fixes

* **aliases:** Rename alias ip to ipv4 ([5377c0c](https://github.com/raas-dev/configent/commit/5377c0c59e3763e9602752e1dde798c35decdb47))
* **keybindings:** Fix keybinding conflicts ([5a21eed](https://github.com/raas-dev/configent/commit/5a21eedd02aa4d52af390aaed96fd18fcda25956))
* **lima:** Use macOS vzNAT for Ubuntu and Debian VMs ([2914735](https://github.com/raas-dev/configent/commit/2914735d9a019df5a5d289c537af2259802e78ca))

### [1.131.2](https://github.com/raas-dev/configent/compare/1.131.1...1.131.2) (2025-01-18)


### Fixes

* **aliases:** Add alias to display dns server ([6a4da8d](https://github.com/raas-dev/configent/commit/6a4da8d09d3f04798c7e167da3ca66aff647a2b9))
* **lima:** Use hostresolver for docker ([76971eb](https://github.com/raas-dev/configent/commit/76971eb32cd739fa24fb78ceb838625768401c10))
* **lima:** Use hosts dns servers ([5646b67](https://github.com/raas-dev/configent/commit/5646b67c62629551a043bab74bd3116282e1d13c))

### [1.131.1](https://github.com/raas-dev/configent/compare/1.131.0...1.131.1) (2025-01-16)


### Fixes

* **vscode:** Add terminal panel focus keybindings ([83b8cb6](https://github.com/raas-dev/configent/commit/83b8cb6374c999793fc16f1060028a1e284e25e3))
* **vscode:** Open panel maximized always ([afe47a8](https://github.com/raas-dev/configent/commit/afe47a8b339ea7807ad9a7065546bd43cc3a0f61))
* **vscode:** Tidy terminal view ([da5bb16](https://github.com/raas-dev/configent/commit/da5bb16647c6fadcf01ac88f36ded35161da6fb9))

## [1.131.0](https://github.com/raas-dev/configent/compare/1.130.15...1.131.0) (2025-01-15)


### Features

* **vscode:** Add more terminal keybindings ([ae0d26b](https://github.com/raas-dev/configent/commit/ae0d26bbe7e9ef99c666dbcc0d20bc70223b5505))


### Fixes

* **lima:** Set explicit DNS servers ([66d6f03](https://github.com/raas-dev/configent/commit/66d6f03c3f9128ab767352ae4f04a1cdb7b287e8))

### [1.130.15](https://github.com/raas-dev/configent/compare/1.130.14...1.130.15) (2025-01-14)


### Fixes

* **cargo:** Lock gitui ([43c632d](https://github.com/raas-dev/configent/commit/43c632ddd262dc956f826652923d07d2d611c9c5))
* **macos:** Cmake ([9e00128](https://github.com/raas-dev/configent/commit/9e00128fb297b6e8106458d723431db18ceaa0d9))
* **vscode:** Remove extended terminal extension ([01225dc](https://github.com/raas-dev/configent/commit/01225dca94da73c03c52590d84a1e2f901bf2d91))

### [1.130.14](https://github.com/raas-dev/configent/compare/1.130.13...1.130.14) (2025-01-12)


### Fixes

* **settings:** Remove unused Python settings ([c1d1e91](https://github.com/raas-dev/configent/commit/c1d1e917c0fda886be231809b9313532891e3764))
* **vscode:** Add extensions for debugging ([fcbd4bf](https://github.com/raas-dev/configent/commit/fcbd4bf392b03eae5d5c7df38eade1a19aef4d43))
* **vscode:** Move statusbar clock left ([517e774](https://github.com/raas-dev/configent/commit/517e774d3fd097991310a0ce7e4a6d56bb8ab077))
* **vscode:** Remove trivy, lack of config support ([e08ca4d](https://github.com/raas-dev/configent/commit/e08ca4dddf24180dbfe5aeb9d475206b7e4a1b68))

### [1.130.13](https://github.com/raas-dev/configent/compare/1.130.12...1.130.13) (2025-01-12)


### Fixes

* **aichat:** Give shorter responses ([39ad584](https://github.com/raas-dev/configent/commit/39ad5841a80950c0e086ade0ac0d0804e93b2f04))
* **settings:** Skip more terminal commands ([846a0d2](https://github.com/raas-dev/configent/commit/846a0d287f5275f08322b4bf3aa5c0b15e241597))
* **terraform:** Remove tfsec, move to Trivy ([19bb02c](https://github.com/raas-dev/configent/commit/19bb02cfeb3d8d5bd92ce23e0898bf3286465178))
* **vscode:** Add commands to skip in shell ([251ac10](https://github.com/raas-dev/configent/commit/251ac1069219d67a4d8b3e700d50738a9c240f96))
* **vscode:** NOT prefer latest terminals on switch ([c2f72e0](https://github.com/raas-dev/configent/commit/c2f72e0a6230e9701e1c218506fa2b270480dc04))
* **vscode:** Remove mise extension ([2f8629c](https://github.com/raas-dev/configent/commit/2f8629c06d10300e4588c5af74891205c0d6395e))

### [1.130.12](https://github.com/raas-dev/configent/compare/1.130.11...1.130.12) (2025-01-10)


### Fixes

* **continue:** Add phi4 as chat model ([f63acde](https://github.com/raas-dev/configent/commit/f63acde64f19603f4b20c1485aec02f261aa21cd))
* **keybindings:** Change keybindings to use cmd key ([b770fe3](https://github.com/raas-dev/configent/commit/b770fe332d65a4a2634ec25efb6a829f4368fb6d))
* **vscode:** Adjust window and font size ([ec4e5f0](https://github.com/raas-dev/configent/commit/ec4e5f0d174b1845f0acd6b445d305e27b5fba11))
* **vscode:** Confirm drag and drop ([1ded406](https://github.com/raas-dev/configent/commit/1ded40611db4a3e1b993b5a4432f220847bb48e2))
* **vscode:** Fix copy/paste/cut in input boxes ([45ef0bc](https://github.com/raas-dev/configent/commit/45ef0bc592b3da8b9a0f5fb8f70fcb4748b8f56e))

### [1.130.11](https://github.com/raas-dev/configent/compare/1.130.10...1.130.11) (2025-01-08)


### Fixes

* **keybindings:** Add missing when clauses ([eb500b1](https://github.com/raas-dev/configent/commit/eb500b1af332eb3126b5ce924b14db8b1fb61f1a))
* **vscode:** Add cline to extensions ([7b03c6a](https://github.com/raas-dev/configent/commit/7b03c6ac7e6704c087e696b758ddd1c139a015c2))

### [1.130.10](https://github.com/raas-dev/configent/compare/1.130.9...1.130.10) (2025-01-08)


### Fixes

* **continue:** Load system message from file ([2f59c41](https://github.com/raas-dev/configent/commit/2f59c41657f0ea1f644d7a2fccdce1ec293d170e))
* **continue:** Remove extraneuous npm install ([3a4ce64](https://github.com/raas-dev/configent/commit/3a4ce642d10ee25c16fea65fdfa4d7923bc0b535))
* **gitconfig:** Make git c create commit message with AI ([2962196](https://github.com/raas-dev/configent/commit/2962196359ee78a4d272df14ea51fa230cffb289))

### [1.130.9](https://github.com/raas-dev/configent/compare/1.130.8...1.130.9) (2025-01-07)


### Fixes

* **aliases:** Add files-to-prompt ([b19c71a](https://github.com/raas-dev/configent/commit/b19c71a971ecbaed07d1181315a4ede4245a9b87))
* **aliases:** Allow passing secret as argument to sx ([d1f053d](https://github.com/raas-dev/configent/commit/d1f053d15705043a6469fd44947825c2ff8e163d))
* **continue:** Fix dependencies by config.ts ([540d43b](https://github.com/raas-dev/configent/commit/540d43b1f831b50b3d16e711917ec47d5b31d478))
* **vscode:** Set default formatter for shell ([81d2da5](https://github.com/raas-dev/configent/commit/81d2da51f0c5bbe48b0b65567c787cdef78ea4ae))

### [1.130.8](https://github.com/raas-dev/configent/compare/1.130.7...1.130.8) (2025-01-06)


### Fixes

* **macos:** Keychain ([4923833](https://github.com/raas-dev/configent/commit/4923833e17fd9f75b6bab4aad5f225e3c004bccc))
* **pandoc:** Add pandoc via official repo ([b288fe2](https://github.com/raas-dev/configent/commit/b288fe244e631bd224c7c3f78ba24b5491c0c00e))

### [1.130.7](https://github.com/raas-dev/configent/compare/1.130.6...1.130.7) (2025-01-05)


### Fixes

* **aliases:** Add pdftotext via nix ([9cf22c2](https://github.com/raas-dev/configent/commit/9cf22c2b38a8eccdccd1fa0008f4d7e1b66dc303))

### [1.130.6](https://github.com/raas-dev/configent/compare/1.130.5...1.130.6) (2025-01-05)


### Fixes

* **aliases:** Fix ai session naming ([efeedaa](https://github.com/raas-dev/configent/commit/efeedaa9b3cfcd46799609f04574efb683328657))
* **aliases:** Fix shift ([5233866](https://github.com/raas-dev/configent/commit/5233866e0456d29d8baa13e77bbb5dc7d04c2d89))

### [1.130.5](https://github.com/raas-dev/configent/compare/1.130.4...1.130.5) (2025-01-05)


### Fixes

* **aichat:** Pass all arguments to aichat ([f508e3a](https://github.com/raas-dev/configent/commit/f508e3a3bd44fc5562a17595b7e6049df7d1fffa))
* **aliases:** Fix agent context removal ([e9a1f17](https://github.com/raas-dev/configent/commit/e9a1f17424a68a1dd2ec5dbf4a983f0e32e559a5))
* **aliases:** Fix ai function to work without role ([9e89825](https://github.com/raas-dev/configent/commit/9e89825d75cf455c8918b2d2f086055fbd72232f))
* **aliases:** Fix context path in aichat function ([34650f9](https://github.com/raas-dev/configent/commit/34650f90661752933f384863796d121b8342d87a))

### [1.130.4](https://github.com/raas-dev/configent/compare/1.130.3...1.130.4) (2025-01-05)


### Fixes

* **aichat:** Add --save-session and increase threshold ([9e836c3](https://github.com/raas-dev/configent/commit/9e836c328089f2ac45785af8b6349b4090471d82))
* **aichat:** Fix session name and prompt ([a153e0b](https://github.com/raas-dev/configent/commit/a153e0bd3526ffe74b2e9f1a1b844d645276ea6c))
* **ai:** Improve general prompts ([b7675b5](https://github.com/raas-dev/configent/commit/b7675b5e9353681c8125fe41633fab57ec722c58))
* **aliases:** Fix ai session naming ([0935da2](https://github.com/raas-dev/configent/commit/0935da2e6a56a90ddc87995fbcc2256e8c27d4de))
* **aliases:** Fix aichat build command ([22ccd47](https://github.com/raas-dev/configent/commit/22ccd47278fbbefb69b23c85dc34c2b8505a5fc3))
* **aliases:** Remove session file verbosely ([945b2de](https://github.com/raas-dev/configent/commit/945b2def45e9c2ade04a2bea05c5a010a52ba752))

### [1.130.3](https://github.com/raas-dev/configent/compare/1.130.2...1.130.3) (2025-01-04)


### Fixes

* **aliases:** Use bun over npx ([702908f](https://github.com/raas-dev/configent/commit/702908fc15aa23cdfd9fc1a5ae51d9adc35933ef))
* **continue:** Remove phi-4 rc, add qwen2.5-coder:14b ([62d21de](https://github.com/raas-dev/configent/commit/62d21de5a2616900364a9e1cd4a9277ae720ffcf))
* **vscode:** Remove overlapping format extension ([37dba86](https://github.com/raas-dev/configent/commit/37dba86241c2a17b3c648523b0523064b505b456))

### [1.130.2](https://github.com/raas-dev/configent/compare/1.130.1...1.130.2) (2025-01-04)


### Fixes

* **aider:** Python version ([3ff1a99](https://github.com/raas-dev/configent/commit/3ff1a9945d7dcbf2a74d81547d467b41a09f32f9))
* **python:** Install sncli on Python 3.11 ([06975f9](https://github.com/raas-dev/configent/commit/06975f9e9af3d86ce3c4bbf270c2ba48f6d1d9fd))

### [1.130.1](https://github.com/raas-dev/configent/compare/1.130.0...1.130.1) (2025-01-04)


### Fixes

* **macos:** Rename script ([9134461](https://github.com/raas-dev/configent/commit/913446137ee9c36e61ad7732411b391b1cb385bf))
* **setup:** Script name ([1ad00bf](https://github.com/raas-dev/configent/commit/1ad00bf2416360863af7857d1c5ad500ff7026c8))

## [1.130.0](https://github.com/raas-dev/configent/compare/1.129.8...1.130.0) (2025-01-04)


### Features

* **python:** Update python 3.12 -> 3.13 ([676c3ff](https://github.com/raas-dev/configent/commit/676c3ffe2306f2b6e4a48e8e898375e3466d8052))


### Fixes

* **python:** Add playwright via mise ([e2e6ad3](https://github.com/raas-dev/configent/commit/e2e6ad327f0f75e459967f8d2d0745f5ed300359))

### [1.129.8](https://github.com/raas-dev/configent/compare/1.129.7...1.129.8) (2025-01-04)


### Fixes

* **install:** Add setup_ide ([65d3e15](https://github.com/raas-dev/configent/commit/65d3e15a9cc2668e331b2f9e3fe45993930ec56a))

### [1.129.7](https://github.com/raas-dev/configent/compare/1.129.6...1.129.7) (2025-01-04)


### Fixes

* **installl:** Remove support for SNAPS ([4fcc52e](https://github.com/raas-dev/configent/commit/4fcc52edbba00d72ba1d6da904edcad5a9d6f711))

### [1.129.6](https://github.com/raas-dev/configent/compare/1.129.5...1.129.6) (2025-01-04)


### Fixes

* **bin:** Postinstall ([e79b358](https://github.com/raas-dev/configent/commit/e79b3584d0e169b0ddbf4d83979d293d78b24092))
* **symlink:** Move app specific config to postinstalls ([d07af10](https://github.com/raas-dev/configent/commit/d07af10858daf0bce9fb97e836b1cbbb6f6079bc))

### [1.129.5](https://github.com/raas-dev/configent/compare/1.129.4...1.129.5) (2025-01-04)


### Fixes

* **vscode:** Add default interpreter path for python ([2a9d721](https://github.com/raas-dev/configent/commit/2a9d72197c9ae1207b76109b1c7c8aa88d74d7e4))

### [1.129.4](https://github.com/raas-dev/configent/compare/1.129.3...1.129.4) (2025-01-03)


### Fixes

* **continue:** Symlink continue configs ([52937e6](https://github.com/raas-dev/configent/commit/52937e6f54a3e387b1f14d9b909f5ec056187ce6))
* **install:** Reorganize parts ([de9744e](https://github.com/raas-dev/configent/commit/de9744e1657f26dc8ef4a3f3421e7751c4b31a03))
* **vscode:** Add mise extension to get PATHs right ([0a9d56e](https://github.com/raas-dev/configent/commit/0a9d56ed2e1afc544c099838e647c973e4d52f1f))
* **vscode:** Fix pwsh PATH ([139a393](https://github.com/raas-dev/configent/commit/139a3931712d8021785f5f1cfe5ed2fc6af7dec9))

### [1.129.3](https://github.com/raas-dev/configent/compare/1.129.2...1.129.3) (2025-01-03)


### Fixes

* **continue:** Fix ([5639e61](https://github.com/raas-dev/configent/commit/5639e615f9068a9c3ab28385d73e88f3e845916e))

### [1.129.2](https://github.com/raas-dev/configent/compare/1.129.1...1.129.2) (2025-01-03)


### Fixes

* **continue:** Add missing file ([c959b46](https://github.com/raas-dev/configent/commit/c959b46183fcf0844cf124864f146eec23a4b866))

### [1.129.1](https://github.com/raas-dev/configent/compare/1.129.0...1.129.1) (2025-01-03)


### Fixes

* **ai:** Improve prompts ([c98504c](https://github.com/raas-dev/configent/commit/c98504c37839f9ee6e309467c77b60c6ca315437))
* **continue:** Add gemini context length ([059d61f](https://github.com/raas-dev/configent/commit/059d61fc6f0bf47dcee74ef4a20b6a60f2ad58b9))
* **continue:** Improve keys ([6ecf334](https://github.com/raas-dev/configent/commit/6ecf334824603416b4d2415541cbeb9eeda1da69))
* **continue:** Improve keys ([25b9fd7](https://github.com/raas-dev/configent/commit/25b9fd777b9e207bfe8aa0c261c13cd5b481de11))
* **continue:** Improve prompts ([f669106](https://github.com/raas-dev/configent/commit/f669106ea74dcd4f12e548bdf4887913988d50fc))
* **continue:** Move setup script to PATH ([a562fa4](https://github.com/raas-dev/configent/commit/a562fa470275684e69c38b0b3b1faf4ed2aca58b))

## [1.129.0](https://github.com/raas-dev/configent/compare/1.128.16...1.129.0) (2025-01-03)


### Features

* **code:** Tidy setup for VS Code like forks ([021bdcb](https://github.com/raas-dev/configent/commit/021bdcbb07f156e4782e945d17361222b79187ad))


### Fixes

* **linux:** Install pkg-config for hurl ([e5b1b07](https://github.com/raas-dev/configent/commit/e5b1b0794c55e9644ecbfcf501535cbbecff020e))

### [1.128.16](https://github.com/raas-dev/configent/compare/1.128.15...1.128.16) (2025-01-03)


### Fixes

* **azure:** Remove changing az output format ([791bc51](https://github.com/raas-dev/configent/commit/791bc51f1133da7231cae01f9021dfc79240b9a3))
* **cmake:** Move cmake to mise ([bdebd9c](https://github.com/raas-dev/configent/commit/bdebd9c62b288439e247afaae3fbbee6d70c633c))
* **macos:** Remove explicit openssl ([98cd495](https://github.com/raas-dev/configent/commit/98cd495f4a9af7371c9aff90bee86733b64f3781))
* **macos:** Remove unused llvm from path ([7e4a5f9](https://github.com/raas-dev/configent/commit/7e4a5f925e61b17c1a8c9db1fc9a56df2a0d857d))
* **mise:** Comment out cmake ([510790f](https://github.com/raas-dev/configent/commit/510790f89b63d54f86fc87e27ef79392c21b955a))
* **mise:** Fix lockfile azure-cli backend ([4754c87](https://github.com/raas-dev/configent/commit/4754c87f86e8d6819b277a5af5f642e7b2240da4))
* **mise:** Fix lockfile azure-cli backend ([ca618f2](https://github.com/raas-dev/configent/commit/ca618f23778d2578143fba90a658dc9a7d65c176))

### [1.128.15](https://github.com/raas-dev/configent/compare/1.128.14...1.128.15) (2025-01-03)


### Fixes

* **install:** Remove unused deps ([1729ed1](https://github.com/raas-dev/configent/commit/1729ed1d9ec3da986a172ab9757e446b7e14e5d6))
* **macos:** Remove unused finder quicklook plugins ([0f0fc8e](https://github.com/raas-dev/configent/commit/0f0fc8e1e3ea20ec8ce0304e7cc278dd0952e088))
* **mise:** Add lockfile ([e6703b8](https://github.com/raas-dev/configent/commit/e6703b8c37c1746326c1e20488f4aa4f5c53e7f6))
* **mise:** Usage version ([f743aaa](https://github.com/raas-dev/configent/commit/f743aaa3677271bd8c989a549450db91c442b07c))

### [1.128.14](https://github.com/raas-dev/configent/compare/1.128.13...1.128.14) (2025-01-03)


### Fixes

* **aliases:** Add ods support for vd ([6e0ac5b](https://github.com/raas-dev/configent/commit/6e0ac5b196bdc18a21a228c260c4db41fbbf7694))
* **bun:** Add bun ([c6f8115](https://github.com/raas-dev/configent/commit/c6f8115cd79142ac558df22c4b0a0bb295a21a84))
* **install:** Remove lnav, broken on most distros ([5bf89d0](https://github.com/raas-dev/configent/commit/5bf89d00e18c1a3074cbbf2ee16f316c90f277ab))
* **logs:** Add tailspin for tailing logs ([c895996](https://github.com/raas-dev/configent/commit/c895996c2544d64ffb1d143cf1176742cd89dd06))
* **node:** Add yarn and pnpm via mise ([0ad9135](https://github.com/raas-dev/configent/commit/0ad91352094470fc913a39a39fb75532bf53fd64))
* **python:** Install glances ([27405ab](https://github.com/raas-dev/configent/commit/27405abe3655c10d5989fe1ec92ccfbb736d836b))
* **python:** Remove toolong ([cd2acbb](https://github.com/raas-dev/configent/commit/cd2acbbfc25ace5612e9db10b4a5d4151e747bd2))

### [1.128.13](https://github.com/raas-dev/configent/compare/1.128.12...1.128.13) (2025-01-02)


### Fixes

* **logs:** Use lnav ([251d93f](https://github.com/raas-dev/configent/commit/251d93f57d57bf44f2734cc354cab22cd05f19e3))

### [1.128.12](https://github.com/raas-dev/configent/compare/1.128.11...1.128.12) (2025-01-02)


### Fixes

* **aliases:** Use toolong over lnav for tailing logs ([f036d9b](https://github.com/raas-dev/configent/commit/f036d9b02cf852ba398fda9525d9f1f3fafd1793))
* **azure:** Remove messing with PATH ([f19c20b](https://github.com/raas-dev/configent/commit/f19c20b19fe968bf7328e099ca0279fc39a9f822))
* **profile:** Set DOTNET_ROOT ([37c6a26](https://github.com/raas-dev/configent/commit/37c6a26421112bfd3b4287888cda7c0f00511f99))

### [1.128.11](https://github.com/raas-dev/configent/compare/1.128.10...1.128.11) (2025-01-02)


### Fixes

* **cargo:** Binstall ([3138ca3](https://github.com/raas-dev/configent/commit/3138ca3c57216ec72cb008f31f04dd9688cfbf95))
* **shell:** Check presence of fzf ([34ab163](https://github.com/raas-dev/configent/commit/34ab1633d1c2a1d8805b197e6969a9a33b669ad9))

### [1.128.10](https://github.com/raas-dev/configent/compare/1.128.9...1.128.10) (2025-01-02)


### Fixes

* **fzf:** Fix loading order ([ca5afd6](https://github.com/raas-dev/configent/commit/ca5afd69694126d2a470227055f0b3ddb318e967))
* **lima:** Remove custom dns settings from ubuntu ([d36f643](https://github.com/raas-dev/configent/commit/d36f6431a7ab43678f016c6777378615b5691777))

### [1.128.9](https://github.com/raas-dev/configent/compare/1.128.8...1.128.9) (2025-01-02)


### Fixes

* **fzf:** Add via mise ([0cd3e2b](https://github.com/raas-dev/configent/commit/0cd3e2b2f7ab9729a937ac50f6765464714c0f0c))
* **mise:** Fix path to postinstall scripts ([0c2fa29](https://github.com/raas-dev/configent/commit/0c2fa29e14066f17533db19ced351820c9deb6a0))

### [1.128.8](https://github.com/raas-dev/configent/compare/1.128.7...1.128.8) (2025-01-02)


### Fixes

* **rust:** Add missing packages ([deae380](https://github.com/raas-dev/configent/commit/deae380ff66eea1be08d5d47327a7789ab0280b8))

### [1.128.7](https://github.com/raas-dev/configent/compare/1.128.6...1.128.7) (2025-01-02)


### Fixes

* **pacman:** Remove legacy openssl-1.1 ([593c64f](https://github.com/raas-dev/configent/commit/593c64f4b493fe2d709c426cf012db6dbea15344))

### [1.128.6](https://github.com/raas-dev/configent/compare/1.128.5...1.128.6) (2025-01-02)


### Fixes

* **fzf:** Add separate install script ([3f256e2](https://github.com/raas-dev/configent/commit/3f256e240694480862bac50e1d4c72f8e76fe6b5))
* **macos:** Add newer OpenSSL ([a8e7d3e](https://github.com/raas-dev/configent/commit/a8e7d3e9e6887238e413600452b7bd92965e3bda))
* **mise:** Add go backend ([7954d30](https://github.com/raas-dev/configent/commit/7954d30f8ed02ff0243feb7819de73604eb3e100))
* **mise:** Add python backend ([9a6959b](https://github.com/raas-dev/configent/commit/9a6959b2d0b48aa6c801029690c3a47f0ea5575d))
* **mise:** Tidy postinstall ([b03b15a](https://github.com/raas-dev/configent/commit/b03b15a1f512661a9ce21ceff42f7dcb5389ae0c))
* **mise:** Use cargo backend over rust postinstall ([c63c46e](https://github.com/raas-dev/configent/commit/c63c46eb8289d700d4a8b956c8070e60617de47a))
* **mise:** Use dotnet backend to install pwsh ([7562ed2](https://github.com/raas-dev/configent/commit/7562ed26374c6a2b51cd6d305f045c59f4f1041c))

### [1.128.5](https://github.com/raas-dev/configent/compare/1.128.4...1.128.5) (2025-01-02)


### Fixes

* **mise:** Improve disabling and enabling tools ([5d6344b](https://github.com/raas-dev/configent/commit/5d6344bb52db159974430ed18eafa864c2150730))

### [1.128.4](https://github.com/raas-dev/configent/compare/1.128.3...1.128.4) (2025-01-02)


### Fixes

* **aliases:** Include mise in up and dup ([0fc1704](https://github.com/raas-dev/configent/commit/0fc17047fd6073b36ee095ab9493667e07d255ba))
* **vscode:** Remove conflicting extension ([8a4741d](https://github.com/raas-dev/configent/commit/8a4741d6a7731905f260d6e3ad26f90b5efa5fe4))

### [1.128.3](https://github.com/raas-dev/configent/compare/1.128.2...1.128.3) (2025-01-02)


### Fixes

* **bootstrap:** Set default MISE_GITHUB_TOKEN ([51171cd](https://github.com/raas-dev/configent/commit/51171cd8403b7f432123b32715a7780c7034ece0))
* **mise:** Fix setting PATHs ([d73175b](https://github.com/raas-dev/configent/commit/d73175bfc43d25974d3d91f014423fe62ea53ef5))

### [1.128.2](https://github.com/raas-dev/configent/compare/1.128.1...1.128.2) (2025-01-02)


### Fixes

* **mise:** Do not use shims ([04553d2](https://github.com/raas-dev/configent/commit/04553d2958cc7010dc09364f248fd04096b10578))
* **mise:** Remove noise ([8519e2e](https://github.com/raas-dev/configent/commit/8519e2e7865e660172d3e67e3fc644a6f019d461))
* **mise:** Remove unused export PATHs ([b3d4df5](https://github.com/raas-dev/configent/commit/b3d4df59178e08400b101cbe9ed24795a1a5c619))

### [1.128.1](https://github.com/raas-dev/configent/compare/1.128.0...1.128.1) (2025-01-02)


### Fixes

* **mise:** Fix setting PATHs ([b822930](https://github.com/raas-dev/configent/commit/b82293032834c2e9a2aa01b3f6c9d8d768051051))
* **mise:** Remove unused option ([daf57a9](https://github.com/raas-dev/configent/commit/daf57a9842109ed1cd21098b4ce7ee6bf70e6e33))

## [1.128.0](https://github.com/raas-dev/configent/compare/1.127.2...1.128.0) (2025-01-02)


### Features

* **install:** Use mise over install_ scripts ([33b80be](https://github.com/raas-dev/configent/commit/33b80be05dd8afa2de99f5257b1385a52a681191))


### Fixes

* **ai:** Make agents to save and load their sessions ([e72a97d](https://github.com/raas-dev/configent/commit/e72a97d72d9f44f7c898803923b0b04ae3dac95d))

### [1.127.2](https://github.com/raas-dev/configent/compare/1.127.1...1.127.2) (2025-01-02)


### Fixes

* **aichat:** Default roles dir ([75cef3b](https://github.com/raas-dev/configent/commit/75cef3b0403a511ba863f4089c3266ea19d833dd))
* **ai:** Try most specific roles first ([df11d30](https://github.com/raas-dev/configent/commit/df11d307e65edb536df5fde36735a9174e64d511))
* **clang:** Install via mise and vfox plugin ([4dc6921](https://github.com/raas-dev/configent/commit/4dc69211c1ac6fbaa10449b5ba218e06f34f726b))
* **mise:** Install or update once in install_apps ([49d107e](https://github.com/raas-dev/configent/commit/49d107ee82e3396b767a5b8ed0924f4d59692cca))
* **zsh:** Do not install zsh on Linux Homebrew ([249c6ba](https://github.com/raas-dev/configent/commit/249c6ba9687aeb906f98308a761cd325141ff22e))

### [1.127.1](https://github.com/raas-dev/configent/compare/1.127.0...1.127.1) (2025-01-02)


### Fixes

* **ollama:** Start ollama on boot ([a957e88](https://github.com/raas-dev/configent/commit/a957e8844c92f11eeaab963cbac92640883a2691))

## [1.127.0](https://github.com/raas-dev/configent/compare/1.126.0...1.127.0) (2025-01-02)


### Features

* **mise:** Add lima ([f014de1](https://github.com/raas-dev/configent/commit/f014de18be7c9ee8573f3cafa63aed7f55fc7bea))

## [1.126.0](https://github.com/raas-dev/configent/compare/1.125.9...1.126.0) (2025-01-02)


### Features

* **mise:** Add neovim ([4db216b](https://github.com/raas-dev/configent/commit/4db216bbba5495c738eb5dbcf3ca69cfe74fb5c0))
* **mise:** Add ollama ([2f50888](https://github.com/raas-dev/configent/commit/2f5088809c1edede934a04e4dc7d59e9503cfea7))
* **mise:** Add tmux ([52deec3](https://github.com/raas-dev/configent/commit/52deec30f8bd07c7a8f56e4da70648bb8884c4be))


### Fixes

* **install:** Add bison for install tmux via mise ([f41ff1b](https://github.com/raas-dev/configent/commit/f41ff1bba466a0c13f2ae7f9ccd4ba341ba9bace))
* **neovim:** Remove installing neovim from distro ([c0a8ed1](https://github.com/raas-dev/configent/commit/c0a8ed11e9f93272604742776aa24e8dd368376c))

### [1.125.9](https://github.com/raas-dev/configent/compare/1.125.8...1.125.9) (2025-01-02)


### Fixes

* **aliases:** Rename usage to big ([db29eb8](https://github.com/raas-dev/configent/commit/db29eb809b5089f7ce7198b1981a5f662242c448))
* **aliases:** Rename utilities functions better ([283c1cc](https://github.com/raas-dev/configent/commit/283c1ccc16e12254088366fb16cf91ef1cb120af))
* **mise:** Activate aggressive ([a557c12](https://github.com/raas-dev/configent/commit/a557c122b1067d554388eecfc53dee4214d862b6))
* **mise:** Do not warn on missing tools ([95c7491](https://github.com/raas-dev/configent/commit/95c74913082b944ed2b5700fc1d6c29406bcd2b1))

### [1.125.8](https://github.com/raas-dev/configent/compare/1.125.7...1.125.8) (2025-01-01)


### Fixes

* **aliases:** Skip mise in up/dup ([1385b1c](https://github.com/raas-dev/configent/commit/1385b1c6fa7aa821f51cb2a19abfafb892f142ed))

### [1.125.7](https://github.com/raas-dev/configent/compare/1.125.6...1.125.7) (2025-01-01)


### Fixes

* **docker:** Add sudo to runsc install ([8ae9c0e](https://github.com/raas-dev/configent/commit/8ae9c0e5c7a0b29733e60eacddd84cf492a0f198))
* **install:** Check if rootful docker installed ([a06b048](https://github.com/raas-dev/configent/commit/a06b0483257552599b1ec72bb4ae2300f8c5b09d))
* **ollama:** Skip reinstall on Linux ([2ae43d5](https://github.com/raas-dev/configent/commit/2ae43d5c341b69151ca733f7656cef9828e049f4))

### [1.125.6](https://github.com/raas-dev/configent/compare/1.125.5...1.125.6) (2025-01-01)


### Fixes

* **install:** Self-update mise ([ce8129b](https://github.com/raas-dev/configent/commit/ce8129b985fbac6ec1258bfd130a5a40f4ced5d6))
* **profile:** Make mise quiet ([98236ea](https://github.com/raas-dev/configent/commit/98236eacbabedb484fbdfbe6179b5fa6b0a6ba35))

### [1.125.5](https://github.com/raas-dev/configent/compare/1.125.4...1.125.5) (2025-01-01)


### Fixes

* **profile:** Fix Haskell ghcup order in PATH ([5d99ff0](https://github.com/raas-dev/configent/commit/5d99ff043c74b39f7a8d983e35bae75ad0e3966a))

### [1.125.4](https://github.com/raas-dev/configent/compare/1.125.3...1.125.4) (2025-01-01)


### Fixes

* **bootstrap:** Set empty MISE_GITHUB_TOKEN ([14c8bc3](https://github.com/raas-dev/configent/commit/14c8bc3c5897c7c8fa137de31716832caca14120))

### [1.125.3](https://github.com/raas-dev/configent/compare/1.125.2...1.125.3) (2025-01-01)


### Fixes

* **bootstrap:** Set empty MISE_GITHUB_TOKEN ([39bcfba](https://github.com/raas-dev/configent/commit/39bcfba6b4af09ef74c2b4e4ad94dd9a54e8e6ef))

### [1.125.2](https://github.com/raas-dev/configent/compare/1.125.1...1.125.2) (2025-01-01)


### Fixes

* **aliases:** Add hadolint via n ([13db792](https://github.com/raas-dev/configent/commit/13db7928c79536b904c399fcf1314605485f637e))
* **bootstrap:** Add empty GITHUB_TOKEN ([92bfa7c](https://github.com/raas-dev/configent/commit/92bfa7c50739e0c83c534e929b2b6863d6b61910))

### [1.125.1](https://github.com/raas-dev/configent/compare/1.125.0...1.125.1) (2025-01-01)


### Fixes

* **hadolint:** Remove hadolint due to ARM64 issues ([a308de3](https://github.com/raas-dev/configent/commit/a308de35c7d6d773e3af98dcb1e311a07f6dc693))
* **python:** Move semgrep to be used via uvx ([b5a1977](https://github.com/raas-dev/configent/commit/b5a19777a7a5aea44e7411f81e9f6f8a4cc44f30))
* **python:** Remove unnecessary uninstall ([f3270af](https://github.com/raas-dev/configent/commit/f3270af05e5dd84f00529646d28f6c48d90bc091))

## [1.125.0](https://github.com/raas-dev/configent/compare/1.124.0...1.125.0) (2025-01-01)


### Features

* **install:** Remove legacy asdf files ([2bf618f](https://github.com/raas-dev/configent/commit/2bf618fb0a5b7f9838acd0129a3c52dcaea17c28))
* **install:** Update all languages and tools ([d6ff241](https://github.com/raas-dev/configent/commit/d6ff2414187de6d3e73033e86dc3267c220f27d1))
* **install:** Use mise over asdf ([cfebbf1](https://github.com/raas-dev/configent/commit/cfebbf1b2deec4859d6b6f1818eb20ba75a76f14))


### Fixes

* **aliases:** Remove default --glob for f ([0b2da09](https://github.com/raas-dev/configent/commit/0b2da09ab89a60e2015a6debad60b7347f1af43a))
* **azure:** Fix azure cli ([500604a](https://github.com/raas-dev/configent/commit/500604a1229c3ac0f85154560ecd5483e2f595f5))
* **bash:** Remove asdf completions ([e5ffc9a](https://github.com/raas-dev/configent/commit/e5ffc9aea671a86de98e7212cb16fb589d356ca8))
* **go:** Make GOPATH ~/.go regardless of go version ([bb1f6f2](https://github.com/raas-dev/configent/commit/bb1f6f27d4e309323216de189e364a6c0c27f7b9))
* **install:** Fix azure-cli plugin source ([3e873fe](https://github.com/raas-dev/configent/commit/3e873fe6488b4aa39da7e401102773f236cb0351))
* **install:** Fix backup achat roles dir ([ff0810d](https://github.com/raas-dev/configent/commit/ff0810de08ed0e8b9ce17af49433722a635bab9e))
* **install:** Order install apps per priority ([2eda02a](https://github.com/raas-dev/configent/commit/2eda02a708b6fe55719f05eb2191996e9068d58e))
* **profile:** Remove loading asdf ([ceb5ad0](https://github.com/raas-dev/configent/commit/ceb5ad0d314368aa016e8f91b81c020ce54dd4a6))

## [1.124.0](https://github.com/raas-dev/configent/compare/1.123.2...1.124.0) (2025-01-01)


### Features

* **rust:** Update rust 1.77.2 -> 1.83.0 ([5a94416](https://github.com/raas-dev/configent/commit/5a944161ccf9fcb986236ac538113bdd89f844fa))


### Fixes

* **aliases:** Make f use glob search by default ([14b9635](https://github.com/raas-dev/configent/commit/14b963551abbcd2435e5639c68379d1d81b893bf))
* **python:** Add create ~/.local/bin to install ([878c228](https://github.com/raas-dev/configent/commit/878c2280ec6c2f21365a5287dd0f36ecd79e0d68))

### [1.123.2](https://github.com/raas-dev/configent/compare/1.123.1...1.123.2) (2024-12-31)


### Fixes

* **aider:** Default model to gemini-2.0-flash-exp ([01c6fff](https://github.com/raas-dev/configent/commit/01c6fffa3da7a4a82bacfb8eaaf87f4bc2cb2394))
* **aider:** Use architect mode and /load script ([cc8395c](https://github.com/raas-dev/configent/commit/cc8395c123b8e9d70ba588873038a6f49131bbe9))
* **continue:** Add Phi-4 via ollama ([9076da8](https://github.com/raas-dev/configent/commit/9076da83e227f7b05cd3ed96af474aca97a5eb8b))
* **continue:** Remove gpt-4o over faster gpt-4o-mini ([f913728](https://github.com/raas-dev/configent/commit/f9137286b3c170b584d13079956d707fc8d74931))
* **vscode:** Disable GitHub copilot ([db977e2](https://github.com/raas-dev/configent/commit/db977e28701dc01b0c31096a6d2a5880a9b4e24f))
* **vscode:** Use Roo-Cline over Cline ([1b5d32b](https://github.com/raas-dev/configent/commit/1b5d32b57711bdf8469111b587d17dc735cdd0c6))

### [1.123.1](https://github.com/raas-dev/configent/compare/1.123.0...1.123.1) (2024-12-30)


### Fixes

* **asdf:** Clone asdf 0.14.1 by default ([e7f42a3](https://github.com/raas-dev/configent/commit/e7f42a370fda3b2e190a5af6607daae70738e414))

## [1.123.0](https://github.com/raas-dev/configent/compare/1.122.0...1.123.0) (2024-12-30)


### Features

* **aliases:** Use numbat-cli over kalker ([0a149ec](https://github.com/raas-dev/configent/commit/0a149ec66043f23923424dbcd67f852ca9980c07))


### Fixes

* **ai:** Fix stashing in create_assistant ([034e1b5](https://github.com/raas-dev/configent/commit/034e1b57d0a6187b13fe0ea0bb21d7a6ebe86264))
* **asdf:** Export ASDF_DIR ([b9e7b32](https://github.com/raas-dev/configent/commit/b9e7b32f9174303220f4eaeedbd1d2ebc53adbdc))
* **topgrade:** Disable asdf updates ([00b2265](https://github.com/raas-dev/configent/commit/00b226542f20a34984bf202ccd143f3fd59f8fc9))

## [1.122.0](https://github.com/raas-dev/configent/compare/1.121.5...1.122.0) (2024-12-30)


### Features

* **ai:** Add optional installation of agents ([775f9b8](https://github.com/raas-dev/configent/commit/775f9b8f53145f429df121b6f4c5d007731db7f3))

### [1.121.5](https://github.com/raas-dev/configent/compare/1.121.4...1.121.5) (2024-12-29)


### Fixes

* **continue:** Add caching to Anthropic ([ef53faf](https://github.com/raas-dev/configent/commit/ef53fafdfc917824077c07b9c70a8d56c19dfe65))
* **continue:** Adjust completion options ([ab3dcab](https://github.com/raas-dev/configent/commit/ab3dcab2a0864ddf33e8ccb6d2c0f940704c9b99))
* **continue:** Use text-embedding-004 as embeddings ([ae41410](https://github.com/raas-dev/configent/commit/ae41410e1b26093e40c4c282f5f0f04a7db77534))

### [1.121.4](https://github.com/raas-dev/configent/compare/1.121.3...1.121.4) (2024-12-29)


### Fixes

* **continue:** Remove qwen2.5-coder from chat ([c2c46cb](https://github.com/raas-dev/configent/commit/c2c46cb50d93fa8036a5b54ff5aaa9ef616c2daf))
* **continue:** Use gpt-4o in Azure ([dbe48af](https://github.com/raas-dev/configent/commit/dbe48affe44eabdddfe7e5eb50aeeabaa10ae838))
* **vscode:** Adjust font size and spacing ([b906118](https://github.com/raas-dev/configent/commit/b906118e8fc9ccb7f0dc8eebd8cc3d5e66e98321))
* **vscode:** Increase window zoom level to 2/3 ([ec2752a](https://github.com/raas-dev/configent/commit/ec2752ae1692041502a84b7cfaf2927794081a35))

### [1.121.3](https://github.com/raas-dev/configent/compare/1.121.2...1.121.3) (2024-12-28)


### Fixes

* **prompts:** Fix a bug in adding metadata ([6813f04](https://github.com/raas-dev/configent/commit/6813f0414f0c6a047b21f9d7791f757bbed8a1ce))
* **prompts:** Improve prompt file creation scripts ([7740a03](https://github.com/raas-dev/configent/commit/7740a0355feb97fc2cd22e165d57a9edfa55896b))
* **prompts:** Recreate prompts ([1a20c0b](https://github.com/raas-dev/configent/commit/1a20c0bfacc01aad298484ecd21ac9c4deaf85e8))

### [1.121.2](https://github.com/raas-dev/configent/compare/1.121.1...1.121.2) (2024-12-28)


### Fixes

* **ai:** Add tool use to prompts ([ab96ec3](https://github.com/raas-dev/configent/commit/ab96ec353b3d947a4004cecad9b5f5fd32c96ddf))
* **prompts:** Add script for create assistant ([c5f20df](https://github.com/raas-dev/configent/commit/c5f20df1ab400d36006215d7de9753cc40ceb3b6))
* **prompts:** Fix line endings ([e6d965c](https://github.com/raas-dev/configent/commit/e6d965c850010563d71e97a20b7bf47ea898ae3e))
* **prompts:** Improve add metadata script ([d998989](https://github.com/raas-dev/configent/commit/d99898903b301090507a1232c4387a98aa773e7e))
* **prompts:** Reduce noise in add_metadata ([86546b9](https://github.com/raas-dev/configent/commit/86546b9169b22234d33d7507716266a431ec5b5c))
* **prompts:** Update prompts ([e35cf17](https://github.com/raas-dev/configent/commit/e35cf175e173c6dd3edb1853d5265efef93f211f))
* **vscode:** Remove overlapping copy/paste keys ([25be096](https://github.com/raas-dev/configent/commit/25be0965da8c3a120405044b7a7f94179ee7f3d9))

### [1.121.1](https://github.com/raas-dev/configent/compare/1.121.0...1.121.1) (2024-12-28)


### Fixes

* **ai:** Context ([f4438f7](https://github.com/raas-dev/configent/commit/f4438f71348da92ddd100071d7f04a5fbf0d4de4))
* **aliases:** Fix shortcuts for aichat ([7dc4afd](https://github.com/raas-dev/configent/commit/7dc4afd6fe7e05c290ad1844c35a6886bbc38674))

## [1.121.0](https://github.com/raas-dev/configent/compare/1.120.1...1.121.0) (2024-12-27)


### Features

* **ai:** Remove gptscript over aichat agents ([5c285c4](https://github.com/raas-dev/configent/commit/5c285c4279aed9fdd919bcf4b0777ddf268f68b2))
* **continue:** Enable vscode autocomplete using ollama ([9cf0e86](https://github.com/raas-dev/configent/commit/9cf0e869257abf1e4d96405cd6556a4af9e7742a))


### Fixes

* **ai:** Improve use of AI agents from terminal ([c4bbfe0](https://github.com/raas-dev/configent/commit/c4bbfe0147cb0e24f1db01a74da77e816fc57fe4))

### [1.120.1](https://github.com/raas-dev/configent/compare/1.120.0...1.120.1) (2024-12-26)


### Fixes

* **aichat:** Add Gemini as default RAG model ([b6bdc98](https://github.com/raas-dev/configent/commit/b6bdc98274417cc3bf04a4b53cbf72ea073ab5b3))
* **aichat:** Symlink aichat .env file ([5bc9cf6](https://github.com/raas-dev/configent/commit/5bc9cf6e756bf9f770ff3af53b14d42e32e1a08b))
* **aichat:** Use all the existing tools ([745c8d6](https://github.com/raas-dev/configent/commit/745c8d62cdfcc117c8b617d02a9380df74da1747))
* **gptme:** Add gptme config ([948d449](https://github.com/raas-dev/configent/commit/948d449888288d6e416b17e118a35f7890e914f8))
* **vscode:** Decrease font size and line height ([840eb2b](https://github.com/raas-dev/configent/commit/840eb2b06ab78cfc5d9ca80eb152b93c7d8523c8))

## [1.120.0](https://github.com/raas-dev/configent/compare/1.119.0...1.120.0) (2024-12-25)


### Features

* **ai:** Add GitHub Copilot for autocomplete ([e1bd45b](https://github.com/raas-dev/configent/commit/e1bd45bc49283ff2a0ec5bc7e8976bab36aa4c7e))


### Fixes

* **aichat:** Update config for function calling ([5daa3be](https://github.com/raas-dev/configent/commit/5daa3be69b231f8e8b7244c8f889489d5ef39cef))
* **aichat:** Use gemini-2.0-flash-exp by default ([6d801a1](https://github.com/raas-dev/configent/commit/6d801a1b8acc11dd5b747f50b43a7c52c3155da7))
* **continue:** Cleanup models ([c39e2cc](https://github.com/raas-dev/configent/commit/c39e2cc5e5c680ed234c8c11178a8ea3e2442d32))
* **continue:** Fix gemini-exp model name ([52d5605](https://github.com/raas-dev/configent/commit/52d56059c284528b8407bef038044a1bd89dc218))
* **continue:** Improve quick actions ([92dc793](https://github.com/raas-dev/configent/commit/92dc793f9539ab8ca41c6a9ffb0fdc85f8b9a1cc))
* **gptscript:** Fix cat abuse ([9a71c58](https://github.com/raas-dev/configent/commit/9a71c5873c0720fa656d1ba97b8cde43ee232a64))
* **python:** Install ptpython in environments ([167cdce](https://github.com/raas-dev/configent/commit/167cdcee1d6dadf5be08385e8170469781b4a125))
* **rust:** Install argc ([4e51def](https://github.com/raas-dev/configent/commit/4e51def0deb4e3289d01af3e21e38425231a3706))
* **vscode:** Add keybindings for secondary sidebar ([449797a](https://github.com/raas-dev/configent/commit/449797a089701e250f381cbfd1b062d7e2540bbb))
* **vscode:** Adjust window zoom and font sizes ([daebe8a](https://github.com/raas-dev/configent/commit/daebe8ae8ed4bea032076758a90cccfade3dbb5b))

## [1.119.0](https://github.com/raas-dev/configent/compare/1.118.0...1.119.0) (2024-12-18)


### Features

* **gpt:** Add assistant and developer agent ([cf193b6](https://github.com/raas-dev/configent/commit/cf193b69eca7a4e8eabe37d41ac772d774960392))
* **jq:** Add vanilla jq for maximum compatibility ([0ed975b](https://github.com/raas-dev/configent/commit/0ed975b123edd1fa7045aa25d2fb62485e9885b9))


### Fixes

* **continue:** Use qwen2.5-coder 3b autocomplete ([42f8b05](https://github.com/raas-dev/configent/commit/42f8b0533d8257838f493c49fff1745028a66bae))

## [1.118.0](https://github.com/raas-dev/configent/compare/1.117.2...1.118.0) (2024-12-16)


### Features

* **python:** Use uv over pipx ([9fc71c0](https://github.com/raas-dev/configent/commit/9fc71c015b73e86c3907714e4a8418d32cc91366))


### Fixes

* **continue:** Change reranker model to gemini ([34948c7](https://github.com/raas-dev/configent/commit/34948c7655f2d5c1e05699e3b473888f7cf6ca63))

### [1.117.2](https://github.com/raas-dev/configent/compare/1.117.1...1.117.2) (2024-12-15)


### Fixes

* **git:** Remove unncessary HEAD from git discard ([456fd86](https://github.com/raas-dev/configent/commit/456fd8652bb84f69b4f86a24550850896ee2484a))
* **git:** Remove unnecessary HEAD from git rem ([f1eec0f](https://github.com/raas-dev/configent/commit/f1eec0fb9cd81b9f91b2b78ca0f7f02d2f964477))
* **install_apps:** Enable GitHub CLI installation ([1640c3b](https://github.com/raas-dev/configent/commit/1640c3b7e7c67e6c4a86f729ea77f7de9abaf00b))

### [1.117.1](https://github.com/raas-dev/configent/compare/1.117.0...1.117.1) (2024-12-13)


### Fixes

* **continue:** Add Gemini 2.0 Flash (exp) ([fda6b96](https://github.com/raas-dev/configent/commit/fda6b965a253b739bbf9d4292365ae87ae039a6e))
* **continue:** Double maxPromptTokens ([3666657](https://github.com/raas-dev/configent/commit/366665769c3c723773c60679acc578c94d2f0086))
* **continue:** Remove deepseek LLM support ([0d662c8](https://github.com/raas-dev/configent/commit/0d662c8b94fab187afea2bd97763ce274289498c))
* **profile:** Export XDG_BIN_HOME on Linux ([8d2346a](https://github.com/raas-dev/configent/commit/8d2346ac9a297e0283f2d00abb285d510098faa3))

## [1.117.0](https://github.com/raas-dev/configent/compare/1.116.0...1.117.0) (2024-12-09)


### Features

* **windsurf:** Add support for Windsurf editor ([e2793b4](https://github.com/raas-dev/configent/commit/e2793b4aa9955222d51b32ef0547f90b35cafdbb))


### Fixes

* **continue:** Add gemini-exp-1206 model ([bf56db9](https://github.com/raas-dev/configent/commit/bf56db9af18e9dfe97de9cc4d36e68ca0d8ac956))
* **gptscript:** Rename agent ([7853fb4](https://github.com/raas-dev/configent/commit/7853fb4c0a6ad1b3b62377afb16711eb6c033069))

## [1.116.0](https://github.com/raas-dev/configent/compare/1.115.1...1.116.0) (2024-12-04)


### Features

* **ai:** Add fabric-agent, use via alias _ ([8f79c6f](https://github.com/raas-dev/configent/commit/8f79c6f90fb363f237131015c742a2378e093b94))


### Fixes

* **aliases:** Skip pnpm for up and dup ([72ed113](https://github.com/raas-dev/configent/commit/72ed1136f0bf055f20d2d808be796415d8357ac7))
* **go:** Add gptscript ([c710578](https://github.com/raas-dev/configent/commit/c710578380370a2db159b710a4e66caa8ae7f09e))
* **go:** Update go to 1.23 from 1.22 ([572ffd0](https://github.com/raas-dev/configent/commit/572ffd0392d232654b7c40befec3d423a1a28c82))
* **pnpm:** Add shim for non-interactive shells ([8ce98a3](https://github.com/raas-dev/configent/commit/8ce98a391db6700cc0b73919535d43f0355a0015))

### [1.115.1](https://github.com/raas-dev/configent/compare/1.115.0...1.115.1) (2024-12-03)


### Fixes

* **aliases:** Alias g to git, not gitui ([eb98c95](https://github.com/raas-dev/configent/commit/eb98c95626430e81401968b28a5b9a05c65792b5))

## [1.115.0](https://github.com/raas-dev/configent/compare/1.114.6...1.115.0) (2024-11-24)


### Features

* **continue:** Add support for Gemini ([78322f9](https://github.com/raas-dev/configent/commit/78322f92051cb3fbe2e8fea75861515d9b7c944c))


### Fixes

* **aichat:** Add gemini, remove cohere ([d545264](https://github.com/raas-dev/configent/commit/d545264b5a6e60a66fe324f0af07f9a45b3db0ba))
* **aider:** Add autotest ([d8d78ea](https://github.com/raas-dev/configent/commit/d8d78ea5b2db81eb36310101c3d192128df139a3))
* **continue:** Remove Haiku 3.5 from model options ([55fb886](https://github.com/raas-dev/configent/commit/55fb886a6174243d1197ccdb8b461641781b3413))
* **continue:** Use built-in embedding model ([aaa516f](https://github.com/raas-dev/configent/commit/aaa516f62e0abc52b117cb2d3ac17e269217224f))

### [1.114.6](https://github.com/raas-dev/configent/compare/1.114.5...1.114.6) (2024-11-21)


### Fixes

* **continue:** Add lama3.2-vision ([c322de3](https://github.com/raas-dev/configent/commit/c322de3785a54cb4dd098482d2b5c7d275877577))
* **continue:** Fix Azure OpenAI deployment name ([4116f89](https://github.com/raas-dev/configent/commit/4116f89b9d07fe9cff8dfee65c0f4017ab6b8bf3))
* **continue:** Use qwen2.5 base model in autocomplete ([6f787b0](https://github.com/raas-dev/configent/commit/6f787b09fa2a5ba7cd7dc9810afe642120289de1))
* **vscode:** Remove cspell, too much noise ([ffe3491](https://github.com/raas-dev/configent/commit/ffe34911e5756f353fc89b10827a8fdae674808a))

### [1.114.5](https://github.com/raas-dev/configent/compare/1.114.4...1.114.5) (2024-11-14)


### Fixes

* **aider:** Update config ([a4c6836](https://github.com/raas-dev/configent/commit/a4c68363f84c5e912f333dce43dc761a7ab40f5d))
* **nodejs:** Update Node.js LTS version ([39b5727](https://github.com/raas-dev/configent/commit/39b57277aae4f1d25c7de823c0223ee50b590012))
* **vscode:** Add esbuild-problem-matchers extension ([f8814d1](https://github.com/raas-dev/configent/commit/f8814d18acbaafabe1fd8f9fd850bc4d738cd797))

### [1.114.4](https://github.com/raas-dev/configent/compare/1.114.3...1.114.4) (2024-11-12)


### Fixes

* **aichat:** Update llama3.1 to llama3.2-vision ([652a256](https://github.com/raas-dev/configent/commit/652a2561e2de213b5e8091da62bca988e158c71b))
* **aliases:** Add repomix via npx ([54ab1ae](https://github.com/raas-dev/configent/commit/54ab1ae3d69cc9c05ccd7268902f6cb87cb01e54))
* **continue:** Add more context providers ([0734901](https://github.com/raas-dev/configent/commit/0734901f13d9693c52ae218a9c025b1a326ebcb3))
* **continue:** Use qwen2.5-coder:14b via ollama ([ac2e295](https://github.com/raas-dev/configent/commit/ac2e2952a541579027179e152311ae26c2151e0e))

### [1.114.3](https://github.com/raas-dev/configent/compare/1.114.2...1.114.3) (2024-11-11)


### Fixes

* **macos:** Fix Lima VM name in DOCKER_HOST ([09451f4](https://github.com/raas-dev/configent/commit/09451f421a6ec17d316fd87715eef2edf2acf273))
* **macos:** Fix Lima VM name in KUBECONFIG ([651bcec](https://github.com/raas-dev/configent/commit/651bcecd033a521f96f6368909258d2b3b9d5266))
* **macos:** Install clang via brew and add to PATH ([c795b16](https://github.com/raas-dev/configent/commit/c795b16904820dc7b91680c581fcab4b8900378e))

### [1.114.2](https://github.com/raas-dev/configent/compare/1.114.1...1.114.2) (2024-11-09)


### Fixes

* **lima:** Rename Debian containerd VM to default ([3331e7f](https://github.com/raas-dev/configent/commit/3331e7ff71f392d6fc8983469a294d435c850987))

### [1.114.1](https://github.com/raas-dev/configent/compare/1.114.0...1.114.1) (2024-11-09)


### Fixes

* **lima:** Update debian image ([9ce05fe](https://github.com/raas-dev/configent/commit/9ce05fe525fb29a55849225945605320566a20b6))
* **lima:** Use Ubuntu LTS ([0aea74d](https://github.com/raas-dev/configent/commit/0aea74d2c3a6bd3418b68d7e4ccfd3d05bc17445))

## [1.114.0](https://github.com/raas-dev/configent/compare/1.113.17...1.114.0) (2024-11-09)


### Features

* **lima:** Fix docker, nerdctl and podman VM names ([4d2506b](https://github.com/raas-dev/configent/commit/4d2506b833e942962b80143ba5bb4bf912eac64f))
* **lima:** Use rootful docker in Ubuntu ([e60ef75](https://github.com/raas-dev/configent/commit/e60ef75ad6e8758a031b79c6bbfe2b02cab73894))

### [1.113.17](https://github.com/raas-dev/configent/compare/1.113.16...1.113.17) (2024-11-09)


### Fixes

* **docker:** Remove using docker group ([6ef99ac](https://github.com/raas-dev/configent/commit/6ef99acd6d542904a18a337851c6339e484f6c74))

### [1.113.16](https://github.com/raas-dev/configent/compare/1.113.15...1.113.16) (2024-11-09)


### Fixes

* **docker:** Add no-restart solution for sudo docker ([d78b7c4](https://github.com/raas-dev/configent/commit/d78b7c471ad03a03d3d855bbd0f50f91af5a60ce))

### [1.113.15](https://github.com/raas-dev/configent/compare/1.113.14...1.113.15) (2024-11-09)


### Fixes

* **docker:** Add support for rootful docker ([f1078b3](https://github.com/raas-dev/configent/commit/f1078b3329533c3e16d2cad25efee3759b461251))

### [1.113.14](https://github.com/raas-dev/configent/compare/1.113.13...1.113.14) (2024-11-09)


### Fixes

* **continue:** Add codestral as autocomplete LLM ([e9044bd](https://github.com/raas-dev/configent/commit/e9044bd4cad304e5bdd5ba53c7dde85f51b7bac6))
* **docker:** Fix DNS servers for docker ([9268337](https://github.com/raas-dev/configent/commit/9268337bff2125c9ac773579e92662265a2b61c9))
* **lima:** Fix limactl start arguments ([ba89c62](https://github.com/raas-dev/configent/commit/ba89c626f0ddc200251b5699788e91c3848edd07))
* **lima:** Update ubuntu images ([b9d9350](https://github.com/raas-dev/configent/commit/b9d935051789e27d7b5c2afdc3f79250fc06cfe6))

### [1.113.13](https://github.com/raas-dev/configent/compare/1.113.12...1.113.13) (2024-11-05)


### Fixes

* **continue:** Add Claude 3.5 Haiku to LLMs ([7f2dfcd](https://github.com/raas-dev/configent/commit/7f2dfcd1a7c45f3b1e044dfebe1e7d8b59e65f8a))

### [1.113.12](https://github.com/raas-dev/configent/compare/1.113.11...1.113.12) (2024-10-28)


### Fixes

* **aider:** Update config ([376780f](https://github.com/raas-dev/configent/commit/376780fe0143c51a72c34ec7e8faf179a034ba81))
* **aliases:** Add wttr ([aebde58](https://github.com/raas-dev/configent/commit/aebde58cb9c922e74cac36a5db4a44a40ecfdc5e))
* **continue:** Update Claude Sonnet version ([6a3525a](https://github.com/raas-dev/configent/commit/6a3525ac05bbf5af91ad60326bb3ccff2016ebd4))
* **js:** Update nodejs and bun ([a082a62](https://github.com/raas-dev/configent/commit/a082a6216487576e13a6f0cbc1e5af0df7e52f11))
* **python:** Update Python 3.11 -> 3.12 ([7c2ae7e](https://github.com/raas-dev/configent/commit/7c2ae7ec4f0e8fd48918dcf939cf5a0ddda6f1c3))

### [1.113.11](https://github.com/raas-dev/configent/compare/1.113.10...1.113.11) (2024-10-22)


### Fixes

* **aichat:** Improve prompts, delete unused ([87bef92](https://github.com/raas-dev/configent/commit/87bef9244ce9044dcd811053ef57d444f54164b4))
* **aliases:** Add gptme-server ([3209d8a](https://github.com/raas-dev/configent/commit/3209d8a6f888ccee6a2e23b83c1aee980c5f58e4))
* **azure:** Update azure cli ([8f85ec3](https://github.com/raas-dev/configent/commit/8f85ec374572014ccd6841d87263fbfcd73b8a7c))
* **continue:** Use better local autocomplete model ([14ae7b2](https://github.com/raas-dev/configent/commit/14ae7b2d13b773c28870c74c0248c36e3357faba))
* **gptme:** Add support for reading web pages ([1a19cd6](https://github.com/raas-dev/configent/commit/1a19cd684acf75d804d85f670527c7f12ef098ea))
* **lima:** Remove explicit DNS servers ([b0cf62f](https://github.com/raas-dev/configent/commit/b0cf62f5597d017736eb9a58cfa4bb67f79b2020))
* **terraform:** Update terraform and tfsec ([7e9f7e8](https://github.com/raas-dev/configent/commit/7e9f7e8443ab3374edd69ffc6cfdf8406ef0edc0))
* **vscode:** Add extension: cline ([dd67be3](https://github.com/raas-dev/configent/commit/dd67be358fa9ba2a2f31f648f2871364926c122a))

### [1.113.10](https://github.com/raas-dev/configent/compare/1.113.9...1.113.10) (2024-10-16)


### Fixes

* **aichat:** Improve subject-matter expert prompt ([2e5429d](https://github.com/raas-dev/configent/commit/2e5429d4ca3188399601ffe61c8c852862dba029))
* **aliases:** Add gptme ([9e01403](https://github.com/raas-dev/configent/commit/9e01403a27a81e78075ae18f3dadaf24edaf62e0))
* **docker:** Add support for rootful docker ([f00dc36](https://github.com/raas-dev/configent/commit/f00dc36ef16a6b5bd46853378acccace1c52abda))
* **docker:** Remove AppArmor for rootful Docker ([2c11f49](https://github.com/raas-dev/configent/commit/2c11f492d71ce8ee031b84c2012001b7403a9010))
* **ubuntu:** Use rootful Docker for compatibility ([bf58aa2](https://github.com/raas-dev/configent/commit/bf58aa26fa610729fe693c82f4699b973df37a39))
* **ubuntu:** Use rootless docker ([9ff556c](https://github.com/raas-dev/configent/commit/9ff556cbc89a5d26c3b58a0d294a2403677a7128))

### [1.113.9](https://github.com/raas-dev/configent/compare/1.113.8...1.113.9) (2024-10-07)


### Fixes

* **docker:** Add gVisor runtime support ([bb0e3fb](https://github.com/raas-dev/configent/commit/bb0e3fb3c40bc76260fc6a8c9c16579e1ca43294))

### [1.113.8](https://github.com/raas-dev/configent/compare/1.113.7...1.113.8) (2024-09-28)


### Fixes

* **aliases:** Add marimo via uvx ([abb0c3a](https://github.com/raas-dev/configent/commit/abb0c3a87bd353895245b3769135f465e770ca1b))
* **continue:** Hide quick actions ([e30d15c](https://github.com/raas-dev/configent/commit/e30d15cbcc76d657f83287cf7150f61ff6e3b9bd))
* **continue:** Update models ([a67efa6](https://github.com/raas-dev/configent/commit/a67efa61aad347136e7f74909111e59125f4ebde))
* **continue:** Use llama 3.2 as autocomplete model ([cc5a837](https://github.com/raas-dev/configent/commit/cc5a8371b41af7cbf63c78d5986c372688864965))

### [1.113.7](https://github.com/raas-dev/configent/compare/1.113.6...1.113.7) (2024-09-26)


### Fixes

* **topgrade:** Disable vim/nvim plugin updates ([6342fff](https://github.com/raas-dev/configent/commit/6342ffff01b6320da647d303642a87828b3e90b0))

### [1.113.6](https://github.com/raas-dev/configent/compare/1.113.5...1.113.6) (2024-09-24)


### Fixes

* **macos:** Remove install docker CLI ([fab424a](https://github.com/raas-dev/configent/commit/fab424aac2caf98124ac57302adc80d1f8d8748e))
* **sncli:** Use python 3.11 ([12a6094](https://github.com/raas-dev/configent/commit/12a6094ca65a075f24aa7398a841c2515a79b09d))

### [1.113.5](https://github.com/raas-dev/configent/compare/1.113.4...1.113.5) (2024-09-21)


### Fixes

* **jq:** Use gojq for better jq compatibility ([58f8bea](https://github.com/raas-dev/configent/commit/58f8beab653c09567ca8db467d6d4a33de9cb7e9))

### [1.113.4](https://github.com/raas-dev/configent/compare/1.113.3...1.113.4) (2024-09-20)


### Fixes

* **apt:** Fix NVIDIA Container Toolkit install ([fcde482](https://github.com/raas-dev/configent/commit/fcde4826f02cc37f25fb3141fbb61d0e804b7323))
* **vscode:** Remove semgrep ([e0339e3](https://github.com/raas-dev/configent/commit/e0339e3d0196f56fa6fdfca31b59a9746c2e0317))

### [1.113.3](https://github.com/raas-dev/configent/compare/1.113.2...1.113.3) (2024-09-19)


### Fixes

* **docker:** Fix nvidia-ctk to use sudo ([0a0dff1](https://github.com/raas-dev/configent/commit/0a0dff1d6703e84ce9c41937ec04e39cce8acec3))
* **docker:** Use Cloudflare DNS servers ([d53404b](https://github.com/raas-dev/configent/commit/d53404be7f01175d8a6a4568539595f982fa04bf))
* **lazyvim:** Remove dangling config ([28b9ec2](https://github.com/raas-dev/configent/commit/28b9ec20676308e2d71e3c0e88ac5b511abbd1e0))

### [1.113.2](https://github.com/raas-dev/configent/compare/1.113.1...1.113.2) (2024-09-18)


### Fixes

* **lazyvim:** Remove avante, too new nvim required ([cb0fa1f](https://github.com/raas-dev/configent/commit/cb0fa1f58f0b5591a5d2bb8ac85ad190184d626d))

### [1.113.1](https://github.com/raas-dev/configent/compare/1.113.0...1.113.1) (2024-09-16)


### Fixes

* **aliases:** Fix toolong binary name ([5eb2fda](https://github.com/raas-dev/configent/commit/5eb2fda51e6c9a22c7862171af97938d2e66c044))
* **macos:** Add portaudio for speech-to-text ([390eaa5](https://github.com/raas-dev/configent/commit/390eaa5e97d2365d2d2c4b44ec9ca869b96d0d37))

## [1.113.0](https://github.com/raas-dev/configent/compare/1.112.11...1.113.0) (2024-09-14)


### Features

* **bin:** Add rsync_tmbackup.sh script ([2e9f5c6](https://github.com/raas-dev/configent/commit/2e9f5c66533c6df990002a2f93e4d89b65f89569))


### Fixes

* **aider:** Accept suggestions without confirmation ([c854fde](https://github.com/raas-dev/configent/commit/c854fde6de621754125e8257a497555cbedd4fe6))

### [1.112.11](https://github.com/raas-dev/configent/compare/1.112.10...1.112.11) (2024-09-12)


### Fixes

* **aliases:** Add copier ([5adc807](https://github.com/raas-dev/configent/commit/5adc80761b00e1c706e08f3dd4ecc18df3a853ff))
* **vscode:** Use 2002ish green for statusbar fg ([bc2cc67](https://github.com/raas-dev/configent/commit/bc2cc67da07a543d7cc0a8141ae81d5c6346b10e))

### [1.112.10](https://github.com/raas-dev/configent/compare/1.112.9...1.112.10) (2024-09-11)


### Fixes

* **vscode:** Remove auto-switching venv in terminal ([502532b](https://github.com/raas-dev/configent/commit/502532b7d26a2e9dab1228121e5dd0e18e0489e5))

### [1.112.9](https://github.com/raas-dev/configent/compare/1.112.8...1.112.9) (2024-09-11)


### Fixes

* **vscode:** Remove python-envy ([52c36d0](https://github.com/raas-dev/configent/commit/52c36d02bf64742c6ddb447a52edca05e67c355f))

### [1.112.8](https://github.com/raas-dev/configent/compare/1.112.7...1.112.8) (2024-09-10)


### Fixes

* **aider:** Disable auto-commit. enable caching ([84cdc77](https://github.com/raas-dev/configent/commit/84cdc77198ea02d29af02429139e71c9ec4cd676))
* **vscode:** Disable terminal copy on selection ([639bd2a](https://github.com/raas-dev/configent/commit/639bd2a90f7f2d8a7dfff6399c5e73d628724764))

### [1.112.7](https://github.com/raas-dev/configent/compare/1.112.6...1.112.7) (2024-09-09)


### Fixes

* **bin:** Add tm for reusing tmux session ([4cda2d5](https://github.com/raas-dev/configent/commit/4cda2d5cb6e7be7bbab740c2a3f5d51976666d29))
* **continue:** Update auto-complete model ([530db55](https://github.com/raas-dev/configent/commit/530db55f3f38c748fa48c3c4fb13f2e6c6bab6db))
* **vscode:** Do not require terminal focus ([080fa4a](https://github.com/raas-dev/configent/commit/080fa4a880f90b76e9f965e529d90672fddfdd7b))
* **vscode:** Remove default debug terminal key ([8270c94](https://github.com/raas-dev/configent/commit/8270c94370d311d397957dfac1bc48afe68aa1a2))

### [1.112.6](https://github.com/raas-dev/configent/compare/1.112.5...1.112.6) (2024-09-08)


### Fixes

* **vscode:** Add code-runner ([236b90d](https://github.com/raas-dev/configent/commit/236b90d87c1ba0cf93a828171e85d85a7ae9ffa2))
* **vscode:** Add excel viewer ([9cd4023](https://github.com/raas-dev/configent/commit/9cd4023fdfb03f78bc338240af6a95783dc94142))
* **vscode:** Remove highlight APs ([e87fda9](https://github.com/raas-dev/configent/commit/e87fda94d45474ba647eb7d3d3f9c54ebaf41e47))
* **vscode:** Use VSCode buildins over extensions ([43558da](https://github.com/raas-dev/configent/commit/43558dacef134769520e6298099f46e311de4755))

### [1.112.5](https://github.com/raas-dev/configent/compare/1.112.4...1.112.5) (2024-09-08)


### Fixes

* **vscode:** Add debug terminal key binding ([83ed033](https://github.com/raas-dev/configent/commit/83ed0338ca0fc9f32cc86ef1d6f3d54d874cf1a2))
* **vscode:** Add keybinding to go to recent dir ([634a756](https://github.com/raas-dev/configent/commit/634a756ecdb5006ed35551189528b2e6c5a3d1a8))
* **vscode:** Add multi cursor case preserve ([8676017](https://github.com/raas-dev/configent/commit/8676017a1518e5b083cdf2715b79850f50f929cb))
* **vscode:** Hide cursor in overview ruler ([33ae49c](https://github.com/raas-dev/configent/commit/33ae49cc4a43a3d3ecdc8facca320e8db40243fa))
* **vscode:** Improve statusbar colors ([9d411f0](https://github.com/raas-dev/configent/commit/9d411f04f25980e119fbdc06c890ba9435fb4938))
* **vscode:** Improve terminal switching ([31933f2](https://github.com/raas-dev/configent/commit/31933f251d6d04b6291e5b3b1ddcc0b72a582f40))

### [1.112.4](https://github.com/raas-dev/configent/compare/1.112.3...1.112.4) (2024-09-08)


### Fixes

* **vscode:** Add terminals to statusbar ([a2b1179](https://github.com/raas-dev/configent/commit/a2b1179822d959a872b6020f5e84b796c250a4d1))
* **vscode:** Adjust highlight counter position ([849c256](https://github.com/raas-dev/configent/commit/849c256b3f2f174f46c2d4c0632dca8a8da47c0d))
* **vscode:** Change default session name ([d17967a](https://github.com/raas-dev/configent/commit/d17967a2fa71461077ebea1d725306d46c8e268e))
* **vscode:** Improve statusbar terminal colors ([01d3b5c](https://github.com/raas-dev/configent/commit/01d3b5c38518ca15817d37751c9b7c1044eed9bf))

### [1.112.3](https://github.com/raas-dev/configent/compare/1.112.2...1.112.3) (2024-09-08)


### Fixes

* **aliases:** Be verbose on removals ([100a1a4](https://github.com/raas-dev/configent/commit/100a1a4a236df6f9e58c70e762f4e18ef5573250))
* **macos:** Add alias for getting kb layout ([5cd0491](https://github.com/raas-dev/configent/commit/5cd0491f7114970e138acec9bbef7f23008eaaef))
* **tmux:** Show session icon ([2b69327](https://github.com/raas-dev/configent/commit/2b69327f1393c71b5712e35012e172d4d9754b25))
* **vscode:** Disable integrated GIT_ASKPASS ([2488fe6](https://github.com/raas-dev/configent/commit/2488fe667e27912c2c9825f1740aac04a01f5796))
* **vscode:** Improve integrated terminal ([9cee7f8](https://github.com/raas-dev/configent/commit/9cee7f81db826a49fbc80ca7d0559ae217738c9b))
* **vscode:** Improve terminal history ([e641177](https://github.com/raas-dev/configent/commit/e6411777182128b1a91055c607ad1963e885fa71))
* **vscode:** Improve terminal keybindings ([14cc4a6](https://github.com/raas-dev/configent/commit/14cc4a65726d90c31c8797173fa977e1f2e47054))

### [1.112.2](https://github.com/raas-dev/configent/compare/1.112.1...1.112.2) (2024-09-08)


### Fixes

* **tmux:** Clear plugin settings ([fe537bb](https://github.com/raas-dev/configent/commit/fe537bb80ab615262b81ad9a165ae390cab9fd96))
* **vscode:** Set default tmux session name ([4673163](https://github.com/raas-dev/configent/commit/467316324db80870d8cccc4eac8063781f000608))

### [1.112.1](https://github.com/raas-dev/configent/compare/1.112.0...1.112.1) (2024-09-07)


### Fixes

* **vscode:** Reuse tmux session ([a801bf1](https://github.com/raas-dev/configent/commit/a801bf1eecc42657d6720ce06fe5fa4ecd8ee140))

## [1.112.0](https://github.com/raas-dev/configent/compare/1.111.3...1.112.0) (2024-09-07)


### Features

* **tmux:** Add tmux battery ([785400d](https://github.com/raas-dev/configent/commit/785400d7860d4cda00377a575c18038ad2c3bda5))


### Fixes

* **vscode:** Hide date in statusbar ([8ccc3e9](https://github.com/raas-dev/configent/commit/8ccc3e9107a8c92bc29b0027a27ec6f3fef9ebb6))
* **vscode:** Remove tmux session defaults ([983f33f](https://github.com/raas-dev/configent/commit/983f33f1a272a3d077600ce241e69a8d7273b842))

### [1.111.3](https://github.com/raas-dev/configent/compare/1.111.2...1.111.3) (2024-09-07)


### Fixes

* **tmux:** Remove extra statusline icons ([8624f1f](https://github.com/raas-dev/configent/commit/8624f1f2767cecf0e98209e57dd226afc5088e03))
* **vscode:** Hide vertical scroll bar ([344086f](https://github.com/raas-dev/configent/commit/344086f67498d7498c70468fb02a5469bc0e09a3))
* **vscode:** Override tmux defaults ([508be30](https://github.com/raas-dev/configent/commit/508be30d56a9c196eb3e012ef959e173b579863a))

### [1.111.2](https://github.com/raas-dev/configent/compare/1.111.1...1.111.2) (2024-09-07)


### Fixes

* **tmux:** Add tmux-public-ip updating on interval ([39097a9](https://github.com/raas-dev/configent/commit/39097a9fbe599a07d8427f6d3ac494356a039c7d))

### [1.111.1](https://github.com/raas-dev/configent/compare/1.111.0...1.111.1) (2024-09-07)


### Fixes

* **tmux:** Remove extra statusline settings ([6e76afd](https://github.com/raas-dev/configent/commit/6e76afd52d977f577353652f62e633918b6a3220))
* **tmux:** Use script for getting public IP ([1b9cf88](https://github.com/raas-dev/configent/commit/1b9cf8834921c118da009ce5e65303666e017d8b))

## [1.111.0](https://github.com/raas-dev/configent/compare/1.110.12...1.111.0) (2024-09-07)


### Features

* **tmux:** Use C-Space as tmux prefix ([e10e515](https://github.com/raas-dev/configent/commit/e10e5154c710da008791605e864761fd2759797e))


### Fixes

* **install:** Cleanup tmux plugins ([f412552](https://github.com/raas-dev/configent/commit/f412552360343e7b76712f671d6ee355706cd50b))
* **tmux:** Change copy from right to middle button ([c5481c1](https://github.com/raas-dev/configent/commit/c5481c12e30b91cc3ad42a878cdc8680d3a1a185))
* **tmux:** Remove statusline defaults ([d57ba1c](https://github.com/raas-dev/configent/commit/d57ba1c64be50f41109c8658e79b26edccc0bde6))
* **tmux:** Remove unused find-session keybinding ([7940831](https://github.com/raas-dev/configent/commit/7940831a20820a3d4383345cc64e11c508ba5825))
* **vscode:** Add date to statusbar ([5217d25](https://github.com/raas-dev/configent/commit/5217d254c733c24fc67a89ea54d01aab36c16147))
* **vscode:** Add tmux-like terminal key bindings ([5467a18](https://github.com/raas-dev/configent/commit/5467a18854a2371e87855d4a5be1d587650bc589))
* **vscode:** Change default terminal ([b1bbf0d](https://github.com/raas-dev/configent/commit/b1bbf0da0a8e51b459836b911256e67f76ff8560))
* **vscode:** Change terminal mouse button behavior ([786c6ad](https://github.com/raas-dev/configent/commit/786c6ad99fd6268a47c10c1b44bea945fb174dd7))
* **vscode:** Enable terminal suggestions ([f6edea9](https://github.com/raas-dev/configent/commit/f6edea94d5ad122764ab00133b0a982e6c4716c4))
* **vscode:** Improve tmux-like keybindings ([8b14feb](https://github.com/raas-dev/configent/commit/8b14febf08b75c88d7f3af2d61112c9c7bd14e6f))

### [1.110.12](https://github.com/raas-dev/configent/compare/1.110.11...1.110.12) (2024-09-07)


### Fixes

* **aider:** Add autocommits ([9b9c6ab](https://github.com/raas-dev/configent/commit/9b9c6ab7c9dbe1ef1da5b9dc7aceb52a50c1e997))
* **tmux:** Faster mouse scroll ([5b83457](https://github.com/raas-dev/configent/commit/5b834573db122be5b88c76548543b87fc9e779fc))
* **vscode:** Smooth mouse scrolling in terminal ([4c43001](https://github.com/raas-dev/configent/commit/4c43001b9049ea2463fd4659d66b3a2a24a7d9b1))

### [1.110.11](https://github.com/raas-dev/configent/compare/1.110.10...1.110.11) (2024-09-06)


### Fixes

* **aichat:** Add jina-embeddings model via ollama ([03b9046](https://github.com/raas-dev/configent/commit/03b90468973e9a1e4fa20eef688be2515002688c))
* **aichat:** Add ollama nomic-embed-text support ([4174b12](https://github.com/raas-dev/configent/commit/4174b12039127d4cf6652e568faca56ecbea02df))
* **aichat:** Add support for ollama ([e082614](https://github.com/raas-dev/configent/commit/e082614884240be3d0605c94efe1e14f15c0ad8d))
* **continue:** Upgrade local ollama model ([a10d9c5](https://github.com/raas-dev/configent/commit/a10d9c532d38b1065122c1b0f1def315059c2fb9))

### [1.110.10](https://github.com/raas-dev/configent/compare/1.110.9...1.110.10) (2024-09-04)


### Fixes

* **aichat:** Fix roles format for aichat 0.21.1+ ([e5e70a9](https://github.com/raas-dev/configent/commit/e5e70a953fa81592ace264f4f98f391b9d88b7bd))
* **aliases:** Add ai_expert for aichat SME prompt ([dccbe61](https://github.com/raas-dev/configent/commit/dccbe612559f8fad35645cacd62614d9eccfa0e4))

### [1.110.9](https://github.com/raas-dev/configent/compare/1.110.8...1.110.9) (2024-09-03)


### Fixes

* **aider:** Disable auto commit ([62aa1a4](https://github.com/raas-dev/configent/commit/62aa1a484480b6fa1f9ca29cf8ac14101fa0200b))
* **dotfiles:** Update venv function to check for pyproject.toml ([bdb105d](https://github.com/raas-dev/configent/commit/bdb105dab87736771659a5f6ebbdd956f8eb3404))

### [1.110.8](https://github.com/raas-dev/configent/compare/1.110.7...1.110.8) (2024-09-03)


### Fixes

* **continue:** Add quick actions ([5fe13b9](https://github.com/raas-dev/configent/commit/5fe13b9b8a710efb8f7de69805345dffbe1ba8c1))
* **python:** Fix pipclear tool removal order ([08833f8](https://github.com/raas-dev/configent/commit/08833f80c3d24982f253d5753ed39dfaf7bb5efc))

### [1.110.7](https://github.com/raas-dev/configent/compare/1.110.6...1.110.7) (2024-09-02)


### Fixes

* **aliases:** Fix glances package names ([a073fbb](https://github.com/raas-dev/configent/commit/a073fbb22ae55e8f6a64e6fc43ff0524ad1c98de))
* **aliases:** Use uvx over pipx run ([13897fd](https://github.com/raas-dev/configent/commit/13897fdfc1902eed60a0151e0ae46f82faba099a))

### [1.110.6](https://github.com/raas-dev/configent/compare/1.110.5...1.110.6) (2024-09-02)


### Fixes

* **aliases:** Fix venv() handling extras ([e5f68ab](https://github.com/raas-dev/configent/commit/e5f68ab48149e564985e6c5accd32e4d587dc809))
* **aliases:** Fix venv() no lockfile order logic ([f99cb3c](https://github.com/raas-dev/configent/commit/f99cb3c5040628e5327ec646b24037354984bccd))

### [1.110.5](https://github.com/raas-dev/configent/compare/1.110.4...1.110.5) (2024-09-02)


### Fixes

* **aichat:** Improve generating commit message ([4f9eb40](https://github.com/raas-dev/configent/commit/4f9eb405816f3f2dbafc0e136e5072bac8ea00e8))
* **aliases:** Add support for uv.lock in venv() ([637fd46](https://github.com/raas-dev/configent/commit/637fd460a3b915d7a1e5b132a3454550ae2e4011))
* **aliases:** Improve venv() lockfile logic ([43b968d](https://github.com/raas-dev/configent/commit/43b968deeb7414b350690185177cdb87db039112))
* **aliases:** Use uv pip sync over install in venv() ([cbffa6d](https://github.com/raas-dev/configent/commit/cbffa6d659f188c249f54c4e4e8f50a3b571b9e8))

### [1.110.4](https://github.com/raas-dev/configent/compare/1.110.3...1.110.4) (2024-09-02)


### Fixes

* **aichat:** Improve coding prompt ([0bcff47](https://github.com/raas-dev/configent/commit/0bcff4716ea30314a7d5f6c0bc696c28e61a20b0))
* **aichat:** Improve commit message prompt ([cb78b30](https://github.com/raas-dev/configent/commit/cb78b304dc3faf843db9bf408d912fc4a855892d))
* **python:** Install ptpython via pipx ([3486406](https://github.com/raas-dev/configent/commit/3486406d43e5186d5c5d92ae99ee0693fa4422c1))
* **vscode:** Remove claude-dev ([76a1280](https://github.com/raas-dev/configent/commit/76a1280818ea2890d3e8c5cdb22fe7d56edfc578))

### [1.110.3](https://github.com/raas-dev/configent/compare/1.110.2...1.110.3) (2024-08-31)


### Fixes

* **install:** Add libxml2 to development dependencies ([2d6b479](https://github.com/raas-dev/configent/commit/2d6b4798776666c521f5402525166911a5fb37d1))
* **vscode:** Use pylance ([6e7206b](https://github.com/raas-dev/configent/commit/6e7206bd2b09f3bfdd24333ea40eb44eb40d5b0c))

### [1.110.2](https://github.com/raas-dev/configent/compare/1.110.1...1.110.2) (2024-08-30)


### Fixes

* **install:** Postpone installation of cloud tools ([f8c5998](https://github.com/raas-dev/configent/commit/f8c5998b6157b80d6eea08b6dbf61d7ae5112799))
* **install:** Separate vim and neovim installers ([81200bb](https://github.com/raas-dev/configent/commit/81200bbc0ca7c9034999392c87f9f154b90acc9a))

### [1.110.1](https://github.com/raas-dev/configent/compare/1.110.0...1.110.1) (2024-08-30)


### Fixes

* **lazyvim:** Add language plugins ([1861e29](https://github.com/raas-dev/configent/commit/1861e29a841546279843437ebaedae07b52c92b2))
* **lazyvim:** Remove ruby and nix language plugins ([17d47d0](https://github.com/raas-dev/configent/commit/17d47d017fc2194c392a246390ef121cba6bddde))
* **lazyvim:** Replace statusline clock with file info ([11cdfeb](https://github.com/raas-dev/configent/commit/11cdfeb9afeea79b717fbd2017c1c205fd4b0e13))

## [1.110.0](https://github.com/raas-dev/configent/compare/1.109.1...1.110.0) (2024-08-30)


### Features

* **fonts:** Update Terminess font ([4cd3d04](https://github.com/raas-dev/configent/commit/4cd3d04ab50abef1b712acd88c042eb476fd4880))


### Fixes

* **lazyvim:** Show hidden files in tree ([b064670](https://github.com/raas-dev/configent/commit/b0646705a956be94d9dc19270498eea8501df5c3))

### [1.109.1](https://github.com/raas-dev/configent/compare/1.109.0...1.109.1) (2024-08-30)


### Fixes

* **continue:** Use better local autocomplete LLM ([85b7a53](https://github.com/raas-dev/configent/commit/85b7a53b2e2c1a4f4320ec947530184402341d46))
* **ollama:** Install ollama on Linux distros ([c482620](https://github.com/raas-dev/configent/commit/c4826203136695d47b49405ddf84adc033fa31c5))

## [1.109.0](https://github.com/raas-dev/configent/compare/1.108.0...1.109.0) (2024-08-30)


### Features

* **neovim:** Add LazyVim for NeoVim ([40eb33b](https://github.com/raas-dev/configent/commit/40eb33b4f84b39d607c4ad60567a9874b077e454))


### Fixes

* **continue:** Use leaner tab autocomplete LLM ([9e7d03e](https://github.com/raas-dev/configent/commit/9e7d03ef1e52c34d62956e53ecb210ea94885b25))
* **vscode:** Add Lua extensions ([9f049bd](https://github.com/raas-dev/configent/commit/9f049bd5ad63a6162e7a3017c23a9c04516800c7))
* **vscode:** Remove noisy lua extension ([b7e582e](https://github.com/raas-dev/configent/commit/b7e582eb4c34d50aa3d7bc984ea78e033e9c4a0b))

## [1.108.0](https://github.com/raas-dev/configent/compare/1.107.3...1.108.0) (2024-08-29)


### Features

* **continue:** Use local models ([c83e4c6](https://github.com/raas-dev/configent/commit/c83e4c6173ec82ed82ceaf63afa025a1db1dc87c))
* **ollama:** Install Ollama using Homebrew ([08f65d6](https://github.com/raas-dev/configent/commit/08f65d6a24e063e4ea1f7dd4a18e91fad7ae57fc))


### Fixes

* **apps:** Split linters and appsec apps ([e9b5c05](https://github.com/raas-dev/configent/commit/e9b5c05ac9c79e405176896e5e31531ff4ae3fe1))

### [1.107.3](https://github.com/raas-dev/configent/compare/1.107.2...1.107.3) (2024-08-28)


### Fixes

* **aichat:** Remove unused options ([9e0dfdf](https://github.com/raas-dev/configent/commit/9e0dfdf75c543bb42647369699957cd475b54ee3))
* **continue:** Make embeddings and reranker use OpenAI ([a570e74](https://github.com/raas-dev/configent/commit/a570e74df2eaae6471e4e2fc98621ddebe1cdc86))
* **cspell:** Show mistakes as hints not problems ([aed0524](https://github.com/raas-dev/configent/commit/aed05247cb395a0d3bccd35f3f8de4672865317c))
* **vscode:** Spellcheck all files ([702bf52](https://github.com/raas-dev/configent/commit/702bf5203c3501665f86c6f26ea7d7dd4257fcf8))

### [1.107.2](https://github.com/raas-dev/configent/compare/1.107.1...1.107.2) (2024-08-27)


### Fixes

* **aws:** Remove legacy aws-vault, use aws sso ([8732c1c](https://github.com/raas-dev/configent/commit/8732c1c6d6a1d43712fb860543b9b75d3bf7c4b2))
* **continue:** Add self-hosted claude and gpt-4o ([6c9b19a](https://github.com/raas-dev/configent/commit/6c9b19ac3552ca4051283076a834e46b41cd9b17))
* **continue:** Configure many models of one provider ([d4e7428](https://github.com/raas-dev/configent/commit/d4e7428c8a07097590e3d2a3454e734de8476ac3))
* **docker:** Add NVIDIA Container Toolkit ([1c117d9](https://github.com/raas-dev/configent/commit/1c117d9a367cd9c9deb3a60e6ed8d335713af6d0))

### [1.107.1](https://github.com/raas-dev/configent/compare/1.107.0...1.107.1) (2024-08-26)


### Fixes

* **continue:** Add config.ts for reranker ([8f453e5](https://github.com/raas-dev/configent/commit/8f453e5fc001040d00c98ab548528cb4b933f5a9))
* **continue:** Add quick actions ([0a8b2bd](https://github.com/raas-dev/configent/commit/0a8b2bd4a6141d20093eb40d1609cc44df00f730))
* **continue:** Add reranker ([ae01914](https://github.com/raas-dev/configent/commit/ae019143aa6a6f8ae123bc0b34d6c03c10d0bd9b))
* **continue:** Fix serper api key param name ([f7ddbf0](https://github.com/raas-dev/configent/commit/f7ddbf0a71ea65be4491045819dfa766af9fa543))

## [1.107.0](https://github.com/raas-dev/configent/compare/1.106.1...1.107.0) (2024-08-26)


### Features

* **continue:** Add continue configs ([6bcc20b](https://github.com/raas-dev/configent/commit/6bcc20b949751091bf56bd88086f32933e5e5d72))

### [1.106.1](https://github.com/raas-dev/configent/compare/1.106.0...1.106.1) (2024-08-26)


### Fixes

* **macos:** Remove casks installed system-wide ([a1a9431](https://github.com/raas-dev/configent/commit/a1a9431581da380fe3c638924ae20b66cc3bf17b))
* **nodejs:** Update Node.js LTS version ([c405e4e](https://github.com/raas-dev/configent/commit/c405e4e4cec0e03769664dfe7c8b06a8005597e4))
* **tmux:** Slower mouse wheel scroll speed ([5f8db40](https://github.com/raas-dev/configent/commit/5f8db4037fdf3359b9d40cc5895adc16bf34d780))
* **vscode:** Use based pyright over MS pyright ([de5aace](https://github.com/raas-dev/configent/commit/de5aace3b07d79b05f3c396a69fcff92db8d9398))

## [1.106.0](https://github.com/raas-dev/configent/compare/1.105.2...1.106.0) (2024-08-25)


### Features

* **macos:** Install brew casks in user's HOME dir ([e98a8bd](https://github.com/raas-dev/configent/commit/e98a8bd2024c9e1ddd662900fb2f50635eb0fcb3))


### Fixes

* **cursor:** Tidy error handling in cursor shim ([f68ab6c](https://github.com/raas-dev/configent/commit/f68ab6c99c22940e38f526b535130a1ded7f6226))
* **macos:** Export Homebrew Cask appdir ([d65033f](https://github.com/raas-dev/configent/commit/d65033f6f5f987e4f5f2872f90e544bdffaa140a))
* **macos:** Prefer VSCode by default over Cursor ([ab07973](https://github.com/raas-dev/configent/commit/ab0797357bb6b238b357b1765ad3598edda3808e))

### [1.105.2](https://github.com/raas-dev/configent/compare/1.105.1...1.105.2) (2024-08-24)


### Fixes

* **macos:** Add shim to fix Cursor path on ARM ([3cd58f1](https://github.com/raas-dev/configent/commit/3cd58f1dfe422f05021b40390ef79f713f05444f))

### [1.105.1](https://github.com/raas-dev/configent/compare/1.105.0...1.105.1) (2024-08-24)


### Fixes

* **vscode:** Fix preference of Code over Cursor ([b470882](https://github.com/raas-dev/configent/commit/b4708823fd89ebbc60ed75dedabdb55b551734eb))

## [1.105.0](https://github.com/raas-dev/configent/compare/1.104.2...1.105.0) (2024-08-24)


### Features

* **macos:** Install Docker CLI locally ([1722132](https://github.com/raas-dev/configent/commit/17221328d408fd3a2688971e17abd6ad2c2f3d80))
* **macos:** Use VSCode by default, Cursor is buggy ([9727744](https://github.com/raas-dev/configent/commit/972774457be64abc0245d367ba9e8c13452fff63))


### Fixes

* **aliases:** Hide git changes in b ([0f68435](https://github.com/raas-dev/configent/commit/0f68435f5767bc2252b436c162799b1d688ef0d9))
* **docker:** Detect local macOS docker CLI ([c85e956](https://github.com/raas-dev/configent/commit/c85e956255c4082acdc31d5273be77b337b159cb))
* **docker:** Start docker VM first and always on macOS ([2c8f69e](https://github.com/raas-dev/configent/commit/2c8f69e4e61229c0f4f1915a03b291d2254b5a4c))
* **docker:** Update buildx version ([03820e5](https://github.com/raas-dev/configent/commit/03820e57fd8890edab60358d79eb18923bf96f03))
* **vscode:** Disable automatic updates ([5fa79f4](https://github.com/raas-dev/configent/commit/5fa79f4b08d99c5e70feeae41b124e26da63ddc1))
* **vscode:** Set default bash formatter to shfmt ([1f9e397](https://github.com/raas-dev/configent/commit/1f9e39708b0c25d9af82bb3cf9c4320ea041cdd8))
* **vscode:** Use VSCode compatible extensions ([9a588f7](https://github.com/raas-dev/configent/commit/9a588f7d1ba818a39de506898bd389a48f697455))

### [1.104.2](https://github.com/raas-dev/configent/compare/1.104.1...1.104.2) (2024-08-16)


### Fixes

* **aliases:** Add langflow via pipx ([bdb6f23](https://github.com/raas-dev/configent/commit/bdb6f23b9336d597f3d91006f2e8fc22fc5b4c4e))
* **cli:** Opt-out of most telemetries ([90a7125](https://github.com/raas-dev/configent/commit/90a712551a108db214798e164bcddf8d6e3cc296))
* **rust:** Add rustup default stable ([df4563c](https://github.com/raas-dev/configent/commit/df4563cb29432a5eeab902461741e94eeafc371a))
* **watch:** Change hwatch diff mode to word level ([c1debad](https://github.com/raas-dev/configent/commit/c1debadfd43242b67e60e6497ddefa14588bccbf))

### [1.104.1](https://github.com/raas-dev/configent/compare/1.104.0...1.104.1) (2024-08-16)


### Fixes

* **aichat:** Split assistant and expert prompts ([7ec3042](https://github.com/raas-dev/configent/commit/7ec3042dce32c093a1babc28c0465cde85cb2e0b))
* **aider:** Use config file over envvars ([81abaeb](https://github.com/raas-dev/configent/commit/81abaeb7969c217529cc6a081b7bd585ff28ce0d))
* **bun:** Do not add shell completions on upgrade ([0b43487](https://github.com/raas-dev/configent/commit/0b43487d6993afa39fccd6ca434027eb8d6dd7a9))
* **vscode:** Add extensions for Astro ([094131f](https://github.com/raas-dev/configent/commit/094131f315ab955306df94259bee2888e7bcb621))

## [1.104.0](https://github.com/raas-dev/configent/compare/1.103.0...1.104.0) (2024-08-11)


### Features

* **ai:** Add aider ([2453330](https://github.com/raas-dev/configent/commit/2453330633d2b76b84edf4187dff9967e1bee965))
* **bin:** Add optional bun installation ([32d87b6](https://github.com/raas-dev/configent/commit/32d87b6cb519add2c0323ebf1e8bb6501d8909ae))
* **gh:** Add optional installation of GitHub CLI ([19aa514](https://github.com/raas-dev/configent/commit/19aa51404d84a44a36f6e618b380d14aa090cbbe))


### Fixes

* **tmux:** Add select text to right mouse button ([0eb6afc](https://github.com/raas-dev/configent/commit/0eb6afc840eacdd690921c5a82181444ec629c32))

## [1.103.0](https://github.com/raas-dev/configent/compare/1.102.5...1.103.0) (2024-08-10)


### Features

* **go:** Add webanalyze ([fb5baca](https://github.com/raas-dev/configent/commit/fb5bacad9e361002dc02cac14ad71f25efb46a51))


### Fixes

* **aliases:** Remove deprecated wappalyzer ([6e59b05](https://github.com/raas-dev/configent/commit/6e59b056888c06bf251373e2464ce46f9c164df7))
* **zsh:** Change aichat shell integration to ^X ([f8c373a](https://github.com/raas-dev/configent/commit/f8c373a1b029f2fe30e885b2024de6f6284517a7))

### [1.102.5](https://github.com/raas-dev/configent/compare/1.102.4...1.102.5) (2024-08-05)


### Fixes

* **cursor:** Do not search web in chat by default ([0333de1](https://github.com/raas-dev/configent/commit/0333de1238ee4b23119706eee2c1efedbe315b8c))
* **vscode:** Decrease line height 15.4 -> 15.25 ([f418469](https://github.com/raas-dev/configent/commit/f418469146c7d2278fdc0a82deebf7bd4b97fbcd))
* **vscode:** Increase editor font size: 17 -> 17.5 ([47f6354](https://github.com/raas-dev/configent/commit/47f635450211695f0521c6cc3fed68393fe04eab))

### [1.102.4](https://github.com/raas-dev/configent/compare/1.102.3...1.102.4) (2024-08-04)


### Fixes

* **aichat:** Shorten expert answers ([d99e95c](https://github.com/raas-dev/configent/commit/d99e95c51bcad43f2e787025fe2898dc84196bcf))
* **vscode:** Remove python-envy ([8cac042](https://github.com/raas-dev/configent/commit/8cac04277cca1da66540e295df61684db5b0c193))
* **vscode:** Update cursor.ai settings ([275203e](https://github.com/raas-dev/configent/commit/275203ef570379a1593c22b8380405ca738c3a97))

### [1.102.3](https://github.com/raas-dev/configent/compare/1.102.2...1.102.3) (2024-08-03)


### Fixes

* **vscode:** Fix keybinding ([61ca4a4](https://github.com/raas-dev/configent/commit/61ca4a4b5ad90eee8ce91b80a2e56430a6ac1d80))

### [1.102.2](https://github.com/raas-dev/configent/compare/1.102.1...1.102.2) (2024-08-03)


### Fixes

* **ai_commit:** Remove deprecated argument for aichat ([72c3e55](https://github.com/raas-dev/configent/commit/72c3e55492a9d7dbf658564164427d8d3dfb0df9))
* **azure:** Update azure cli ([e627929](https://github.com/raas-dev/configent/commit/e627929afe3d5991637d69a8de699631ca9d38ff))
* **vscode:** Add python formatter settings ([a549f14](https://github.com/raas-dev/configent/commit/a549f1479ca0c2e0fb0929e4c2d2543b3a3400cf))
* **vscode:** Add python-envy ([315330f](https://github.com/raas-dev/configent/commit/315330fc829914edc22b8905a895ffac5dfcfe02))
* **vscode:** Ignore pylance import errors ([564dd6f](https://github.com/raas-dev/configent/commit/564dd6f404e7de6de57c91242483e3b20f96d133))
* **vscode:** Show problems ([cacd5fc](https://github.com/raas-dev/configent/commit/cacd5fcadc8d202bad02525413673d1cd01801c0))
* **vscode:** Unbind command+up/down in editor ([13061c4](https://github.com/raas-dev/configent/commit/13061c40e3019ef24f0547784afda36ebe9936cc))

### [1.102.1](https://github.com/raas-dev/configent/compare/1.102.0...1.102.1) (2024-07-31)


### Fixes

* **vscode:** Tighten line height by 0.1 ([c8fcba8](https://github.com/raas-dev/configent/commit/c8fcba8267322c6bd070f97f997bc27c23d102c5))

## [1.102.0](https://github.com/raas-dev/configent/compare/1.101.2...1.102.0) (2024-07-30)


### Features

* **vscode:** Add transparent minimap ([5be14bc](https://github.com/raas-dev/configent/commit/5be14bccecd6fc1202326c1724cded781f60c480))


### Fixes

* **vim:** Add vim-sensible ([9e597f6](https://github.com/raas-dev/configent/commit/9e597f66a71d4843f3a0026958616a42e18becb4))
* **vscode:** Wrap markdown at wordwrap column ([c47b5a8](https://github.com/raas-dev/configent/commit/c47b5a8899564ec85ac558ca5877ef4e3e11eb1b))

### [1.101.2](https://github.com/raas-dev/configent/compare/1.101.1...1.101.2) (2024-07-26)


### Fixes

* **vscode:** Minimap width ([47437e3](https://github.com/raas-dev/configent/commit/47437e3e843b4459b7d0d7907a5dc401fe0b0315))
* **vscode:** Select with Alt in terminal on macOS ([c553e82](https://github.com/raas-dev/configent/commit/c553e8266678c16d87a88faad44afde25c1edc1f))

### [1.101.1](https://github.com/raas-dev/configent/compare/1.101.0...1.101.1) (2024-07-25)


### Fixes

* **tmux:** Configure vim-tmux-navigator via tpm plugin ([a15dc5d](https://github.com/raas-dev/configent/commit/a15dc5df566c9284272ba87c63446ccb018432e9))
* **tmux:** Fix resizing panes using mouse ([6f70868](https://github.com/raas-dev/configent/commit/6f708680335503dc7ecc3abfec40547e3361046c))
* **tmux:** Improve mouse behavior in copy-mode-vi ([5e3ca19](https://github.com/raas-dev/configent/commit/5e3ca192544d69dcaa6b930cd1b596c55d68f248))
* **tmux:** Remove what is already set by tmux-sensible ([5cd85df](https://github.com/raas-dev/configent/commit/5cd85dfd7011a6f52f273c9c04503ff6b850b4fe))
* **vscode:** Ignore extension recommendations ([2c53b72](https://github.com/raas-dev/configent/commit/2c53b72d18b14ff259ea5889e7d158680974a256))

## [1.101.0](https://github.com/raas-dev/configent/compare/1.100.6...1.101.0) (2024-07-25)


### Features

* **tmux:** Add prefix-Space menu via tmux-which-key ([a3b4755](https://github.com/raas-dev/configent/commit/a3b475584daf477a3fdc6957cbd7b9645c444649))
* **tmux:** Make tmux great again ([cd89d14](https://github.com/raas-dev/configent/commit/cd89d14a0cad89d9a5821ec312d12e0b987dbcc0))


### Fixes

* **tmux:** Remove tmux-pane-focus ([33a3049](https://github.com/raas-dev/configent/commit/33a3049e28a338ae5a8386a63596182dcf264432))
* **tmux:** Reset tmux keybindings on start ([c6a0e75](https://github.com/raas-dev/configent/commit/c6a0e75e7be81cb9e0db4ea8b9837c0d6f3b6476))

### [1.100.6](https://github.com/raas-dev/configent/compare/1.100.5...1.100.6) (2024-07-25)


### Fixes

* **tmux:** Plugin order ([0e9da5b](https://github.com/raas-dev/configent/commit/0e9da5b3d1706768af9ae0d23ccccd1fe0f98d73))

### [1.100.5](https://github.com/raas-dev/configent/compare/1.100.4...1.100.5) (2024-07-25)


### Fixes

* **tmux:** Improve tmux-open keybindings ([7e60640](https://github.com/raas-dev/configent/commit/7e60640917c94651275374746c5ed3667daaa64b))
* **tmux:** Remove tmux-yank ([4f90a49](https://github.com/raas-dev/configent/commit/4f90a495efb4ef047afca4e47e2cb0ebf9bf6cf2))
* **vscode:** Fix mouse terminal annoyances ([cd76a46](https://github.com/raas-dev/configent/commit/cd76a4624df6879b7a50f8c4400dd2ba6b1224a2))

### [1.100.4](https://github.com/raas-dev/configent/compare/1.100.3...1.100.4) (2024-07-25)


### Fixes

* **vscode:** Do not copy terminal on selection ([b35d30b](https://github.com/raas-dev/configent/commit/b35d30b83990edfc3f6e2701f3a1ed3b7cb3b87b))
* **vscode:** Hide problem annoyances ([31eb7a2](https://github.com/raas-dev/configent/commit/31eb7a2f250bdb6442ec35bd5bbcac45d9238d43))
* **vscode:** Remove extensions: codesnap, million ([ca0e0f0](https://github.com/raas-dev/configent/commit/ca0e0f0bac875034b5c4ad17079247e1b59bc5ce))

### [1.100.3](https://github.com/raas-dev/configent/compare/1.100.2...1.100.3) (2024-07-24)


### Fixes

* **vscode:** Add support for pytest ([74a035d](https://github.com/raas-dev/configent/commit/74a035dee98f9f85b4746c6682f1958e17833b80))
* **vscode:** Enable shell integrations ([0bf21f1](https://github.com/raas-dev/configent/commit/0bf21f1d65aa751a67844fa3d7bffffcd4d9af9f))
* **vscode:** Fix powershell startup ([0ef5866](https://github.com/raas-dev/configent/commit/0ef5866e908eb6ed6cc195c170ae50c6edfa5ab5))
* **vscode:** Only check updates at start ([d522241](https://github.com/raas-dev/configent/commit/d522241390ceff11ae0764bf340d4f569534a215))
* **vscode:** Set debug toolbar location to docked ([2629350](https://github.com/raas-dev/configent/commit/262935001374227fefe74f0c54413b76500103a6))
* **vscode:** Show focused SCM badge over total count ([65cb609](https://github.com/raas-dev/configent/commit/65cb609d78877e95203c143447d79ad4e2ed068a))
* **vscode:** Silence non-zero exit notifications ([dc01c19](https://github.com/raas-dev/configent/commit/dc01c19b40993e3e851516a857393441909d64de))

### [1.100.2](https://github.com/raas-dev/configent/compare/1.100.1...1.100.2) (2024-07-23)


### Fixes

* **aliases:** Remove open-interpreter ([e7c1942](https://github.com/raas-dev/configent/commit/e7c1942263c3dee2374b262dbf7614fe1f0a0731))
* **vscode:** Do not show problems for all files ([4fd8a0e](https://github.com/raas-dev/configent/commit/4fd8a0e157c6f359342ff21149af938d77be99ba))
* **vscode:** Fit minimap ([0b7a7e7](https://github.com/raas-dev/configent/commit/0b7a7e75ed0b0453e6a76ecdb42576431cc03433))
* **vscode:** Move sidebar to right ([ddbeb49](https://github.com/raas-dev/configent/commit/ddbeb49d6747acec1ddbc071fda4e7689802d1dc))

### [1.100.1](https://github.com/raas-dev/configent/compare/1.100.0...1.100.1) (2024-07-16)


### Fixes

* **cursor:** Remove conflicting continue keybindings ([c43816f](https://github.com/raas-dev/configent/commit/c43816f85d3c40818f09a4fabeb948b3d7570fa6))
* **macos:** Add cask libreoffice-language-pack ([95d99a5](https://github.com/raas-dev/configent/commit/95d99a526daeab76008c208f7a187ff4e8f4b027))
* **vscode:** Add continue, remove codeium ([275641c](https://github.com/raas-dev/configent/commit/275641cdab7c3b06525581410629095c33a699ac))
* **vscode:** Add indent extensions ([8f2051a](https://github.com/raas-dev/configent/commit/8f2051a3f5706d5fe53c968b5dc290d48439fc76))
* **vscode:** Fix continue config ([cc3d453](https://github.com/raas-dev/configent/commit/cc3d45397b9d6a06d14126f4c3d27f378d54ef26))
* **vscode:** Update Claude version in Continue ([6065298](https://github.com/raas-dev/configent/commit/606529833781f2215b550e01b4c6bacd5a330d2c))

## [1.100.0](https://github.com/raas-dev/configent/compare/1.99.2...1.100.0) (2024-06-11)


### Features

* **jq:** Use jaq, remove gojq ([14adab4](https://github.com/raas-dev/configent/commit/14adab4a8d993e2f1628a7a1f85c1c2c1f7a617a))
* **watch:** Use hwatch, remove viddy ([01dcd9a](https://github.com/raas-dev/configent/commit/01dcd9a6000da15ab756249457d8701bdb6a0bb3))


### Fixes

* **yazi:** Add additional nixpkgs for previews ([cadcdf6](https://github.com/raas-dev/configent/commit/cadcdf60c85fae2826a3eef7fd759370c41294da))

### [1.99.2](https://github.com/raas-dev/configent/compare/1.99.1...1.99.2) (2024-05-29)


### Fixes

* **aichat:** Fix language ([61f363c](https://github.com/raas-dev/configent/commit/61f363cb4c1787194bcc9f83f7dc6bfaaef1aa31))
* **aliases:** Add flowise via npx ([4a77752](https://github.com/raas-dev/configent/commit/4a7775248db2cb76ce36b5f88840475575f91d98))

### [1.99.1](https://github.com/raas-dev/configent/compare/1.99.0...1.99.1) (2024-05-21)


### Fixes

* **vim:** Remove set paste ([06688d0](https://github.com/raas-dev/configent/commit/06688d0d1bb74b0372edfa1c5375d8dceb38549f))
* **vscode:** Add lines count extension ([1288495](https://github.com/raas-dev/configent/commit/128849520913b97a8d88a7d441c906babf2610cb))
* **vscode:** Line count format ([44b6d35](https://github.com/raas-dev/configent/commit/44b6d358cfbed0ba9356cff54705ef210fd13db8))

## [1.99.0](https://github.com/raas-dev/configent/compare/1.98.1...1.99.0) (2024-05-14)


### Features

* **lima:** Update Ubuntu LTS and Debian image ([234b067](https://github.com/raas-dev/configent/commit/234b0678b8181ef55803876e504a0efd67bb65e2))

### [1.98.1](https://github.com/raas-dev/configent/compare/1.98.0...1.98.1) (2024-05-14)


### Fixes

* **aichat:** Fix language for prompt ([6ca22e7](https://github.com/raas-dev/configent/commit/6ca22e76c02447c0956ffa2af4de2693e179d75a))

## [1.98.0](https://github.com/raas-dev/configent/compare/1.97.0...1.98.0) (2024-05-14)


### Features

* **ai:** Upgrade LLMs to GPT-4o ([e29e47e](https://github.com/raas-dev/configent/commit/e29e47e468f81508402d8172e9f0779be8113f59))


### Fixes

* **aichat:** Improve expert prompt ([2d81020](https://github.com/raas-dev/configent/commit/2d810205d4a16638da62a6be4898940e3d0627f0))
* **aichat:** Improve prompts ([1893156](https://github.com/raas-dev/configent/commit/1893156dfbd5eaf1f72bfec5745ecc83f9728b90))
* **aichat:** Structure prompts ([b19aed9](https://github.com/raas-dev/configent/commit/b19aed96ff6abbf5e456606667780ce747bb2a57))
* **vscode:** No confirm save untitled workspaces ([b240a77](https://github.com/raas-dev/configent/commit/b240a77af4ab62dca2fea94dc8896dce85901447))

## [1.97.0](https://github.com/raas-dev/configent/compare/1.96.1...1.97.0) (2024-05-05)


### Features

* **rust:** Add hurl, remove restclient ([35029b8](https://github.com/raas-dev/configent/commit/35029b8d3e1e26c399ed34d8d7137ea33304beb9))


### Fixes

* **aichat:** Improve prompts ([cdd0912](https://github.com/raas-dev/configent/commit/cdd09129e754615dd26be4089b904be2c6383870))
* **aliases:** Add wrangler ([d85723d](https://github.com/raas-dev/configent/commit/d85723d937e64739994e444bca9cbd22f811dc23))
* **n:** Fix nix docker image source ([1265096](https://github.com/raas-dev/configent/commit/126509626e4ebc4c8be89aa5bf42022184dd77c9))
* **vscode:** Add gh actions extension ([afb7ef6](https://github.com/raas-dev/configent/commit/afb7ef63dd96b5ff3664c33df884239722fd4064))

### [1.96.1](https://github.com/raas-dev/configent/compare/1.96.0...1.96.1) (2024-05-03)


### Fixes

* **aliases:** Return docker run exit code ([75426c0](https://github.com/raas-dev/configent/commit/75426c03c49b637d2769a93ef7d43426e343064d))

## [1.96.0](https://github.com/raas-dev/configent/compare/1.95.5...1.96.0) (2024-04-30)


### Features

* **tmux:** Update tmux to 3.4 ([e853e7b](https://github.com/raas-dev/configent/commit/e853e7b8f6a3f099d286402ecac3a03ddaad0f80))


### Fixes

* **tmux:** Increase escape-time to avoid rgb garbage ([ddd4e46](https://github.com/raas-dev/configent/commit/ddd4e46e515f2f22676dffdd6c797bb4574398b4))

### [1.95.5](https://github.com/raas-dev/configent/compare/1.95.4...1.95.5) (2024-04-28)


### Fixes

* **aliases:** Add aliases for common typos ([46522f6](https://github.com/raas-dev/configent/commit/46522f643d59bafcda84cd77187d77d9454cdde2))
* **docker:** Upgrade docker buildx version ([b4e1b6b](https://github.com/raas-dev/configent/commit/b4e1b6b19936f020f2b4817911d674a4fd368ff6))

### [1.95.4](https://github.com/raas-dev/configent/compare/1.95.3...1.95.4) (2024-04-25)


### Fixes

* **aliases:** Not install editable in venv if not lib ([fa1acf2](https://github.com/raas-dev/configent/commit/fa1acf2e670aa508e4cd44486dbbfbaae139fe57))
* **python:** Fix sitecustomize val not defined ([7f44b06](https://github.com/raas-dev/configent/commit/7f44b062a1562b76c18f82bb34d848db976afe6d))

### [1.95.3](https://github.com/raas-dev/configent/compare/1.95.2...1.95.3) (2024-04-23)


### Fixes

* **aliases:** Make z list all open ports by default ([bafabe7](https://github.com/raas-dev/configent/commit/bafabe7633b1085470ac01e27ba4e2654877a919))
* **lima:** Update alpine linux ([b013882](https://github.com/raas-dev/configent/commit/b013882f414091b26a9b64954e742de14365af7f))
* **profile:** Export DOCKER_HOST ([c228718](https://github.com/raas-dev/configent/commit/c228718b54e4f8a0c971b38ac3d5c45cdb3aa805))
* **venv:** Include pip in uv venv for legacy compat ([6c59024](https://github.com/raas-dev/configent/commit/6c5902407690906174ac012943d429dca818e8a0))

### [1.95.2](https://github.com/raas-dev/configent/compare/1.95.1...1.95.2) (2024-04-22)


### Fixes

* **azure:** Fix bicep target arch on Linux aarch64 ([5a5a82d](https://github.com/raas-dev/configent/commit/5a5a82d6a287cf06b8b01d91fa05b5eb658a4b0b))
* **cloudflared:** Change to support aarch64 linux ([9ea4982](https://github.com/raas-dev/configent/commit/9ea4982f134ca63557d3e21573da332632d73f22))

### [1.95.1](https://github.com/raas-dev/configent/compare/1.95.0...1.95.1) (2024-04-21)


### Fixes

* **asdf:** Consistent prepending to PATH on all OS ([773a8f3](https://github.com/raas-dev/configent/commit/773a8f3776374269840b6df19b246ed29bda5739))
* **rust:** Removing rustup over asdf installed cargo ([0a49b83](https://github.com/raas-dev/configent/commit/0a49b83d509e3f144f4ef7a964f2daef1115cd2c))

## [1.95.0](https://github.com/raas-dev/configent/compare/1.94.1...1.95.0) (2024-04-21)


### Features

* **asdf:** Upgrade all languages ([adfaea9](https://github.com/raas-dev/configent/commit/adfaea9919bcfa0d88b6c013777405397107c231))
* **asdf:** Upgrade all non-language tools ([0db624c](https://github.com/raas-dev/configent/commit/0db624c7345d0e289f71d98d0aa85f1acf3188b7))


### Fixes

* **bash:** Fix PROMPT_COMMAND ([5c92c1d](https://github.com/raas-dev/configent/commit/5c92c1d91f23de7cb19afe18ebed3fe2efdf4cae))

### [1.94.1](https://github.com/raas-dev/configent/compare/1.94.0...1.94.1) (2024-04-21)


### Fixes

* **python:** Fix azure-cli python version requirement ([adacd2b](https://github.com/raas-dev/configent/commit/adacd2b58ab24434d7827d46e50d552bc48c7ed3))
* **python:** Install pdm ([1d7e96f](https://github.com/raas-dev/configent/commit/1d7e96fa2f0acea8665e20c57e1e2beb42f1391d))

## [1.94.0](https://github.com/raas-dev/configent/compare/1.93.5...1.94.0) (2024-04-20)


### Features

* **bin:** introduce ai_commit script and update configs ([aa7cfeb](https://github.com/raas-dev/configent/commit/aa7cfeba3436d1bb5474858a0f8ac83fee594dae))


### Fixes

* **ai_code:** Detect repo language if not given ([dd1085d](https://github.com/raas-dev/configent/commit/dd1085d14471f4527d8b95c0f82efcc673c5ac78))
* **ai_commit:** Capitalize headline and body ([28123a8](https://github.com/raas-dev/configent/commit/28123a8ea349bdde495c78633e007c1e4951852d))
* **ai_commit:** Improve formatting ([1dfcd9d](https://github.com/raas-dev/configent/commit/1dfcd9d0ab2b5d636737c23471922f8f5ef655dd))
* **aliases:** Do not purge venv after deactivate ([262d33c](https://github.com/raas-dev/configent/commit/262d33c7c46d6c2266736575cd6b9ab020b731ff))
* **aliases:** Make venv install dev and test deps ([096b6f6](https://github.com/raas-dev/configent/commit/096b6f6b672c2a72ae2c34797827630012e45152))
* **aliases:** Validate pyproject.toml before exporting ([be1d568](https://github.com/raas-dev/configent/commit/be1d568cc352c830fc2f89bcda2b000e9f62fe3b))
* **jq:** Avoid infinite loop ([4a68826](https://github.com/raas-dev/configent/commit/4a688262e0a3283d89d9c9bba565adb35108698b))
* **python:** Add hatch ([f5ed188](https://github.com/raas-dev/configent/commit/f5ed18835437b05708e51138d90b73f9e203abae))
* **python:** Add pdm and hatch via pipx run ([6f23bb0](https://github.com/raas-dev/configent/commit/6f23bb0913813e88b19313aeaffa8b14548f2cc3))
* **qemu:** Fix shebang ([21bd0cd](https://github.com/raas-dev/configent/commit/21bd0cd6fabf5e4b94fa0b10eda7277c65fb98fa))
* **xpanes:** Update xpanes ([9d60928](https://github.com/raas-dev/configent/commit/9d609282204d90c4a7ed80eaa80c7ac554406dc0))

### [1.93.5](https://github.com/raas-dev/configent/compare/1.93.4...1.93.5) (2024-04-19)


### Fixes

* **rust:** Set CARGO_HOME on install ([f4fd57d](https://github.com/raas-dev/configent/commit/f4fd57df59b9f81827224ce4a7d34be4dc3d2318))

### [1.93.4](https://github.com/raas-dev/configent/compare/1.93.3...1.93.4) (2024-04-19)


### Fixes

* **bat:** Fix bat cache build order ([e8f852a](https://github.com/raas-dev/configent/commit/e8f852a19c3b18942a313fd6198b36d1f8b8ccd9))
* **poetry:** Do not install pip in venv ([a2685f8](https://github.com/raas-dev/configent/commit/a2685f82e6e45ebd3bcc97348bf771ee02410794))
* **poetry:** Prefer active python ([1af3360](https://github.com/raas-dev/configent/commit/1af33603ca8e7046ef4795ba01b0cf2d409bf33c))
* **python:** Add poetry export plugin ([d6cce8d](https://github.com/raas-dev/configent/commit/d6cce8dc07ae31c2277b4465c127c0af2ae53d67))
* **python:** Create poetry venvs in project dir ([b844b3e](https://github.com/raas-dev/configent/commit/b844b3e5f124457262f593984d5888a72430c025))
* **python:** Export requirements.txt if not exist ([2811575](https://github.com/raas-dev/configent/commit/2811575db91bd43a6531cc1a249f2c85a7eda709))
* **python:** Interpret truth values ([46f510c](https://github.com/raas-dev/configent/commit/46f510c71438a35b5a757365cd00141d073c41a4))

### [1.93.3](https://github.com/raas-dev/configent/compare/1.93.2...1.93.3) (2024-04-19)


### Fixes

* **interpreter:** Remove unused packages ([028d5c3](https://github.com/raas-dev/configent/commit/028d5c3d4299f6ad0c0d45000cee315b5688af16))
* **themes:** Fix hex codes ([8820b70](https://github.com/raas-dev/configent/commit/8820b7092d9ba788a51dde84b8d83e2706f02a9c))

### [1.93.2](https://github.com/raas-dev/configent/compare/1.93.1...1.93.2) (2024-04-19)


### Fixes

* **aliases:** Add rich tracebacks to venv ([bc9822c](https://github.com/raas-dev/configent/commit/bc9822c27a2c4c8a46cb60fdf6036b8ab1363d1c))
* **aliases:** Add security tools via nix ([0f28ebb](https://github.com/raas-dev/configent/commit/0f28ebb13f7181148aaaeed80ea39fccb53b2192))
* **aliases:** Remove wttr ([ca2ed7d](https://github.com/raas-dev/configent/commit/ca2ed7dcf3dd59ff05cd8b93e32532f28390a005))
* **codium:** Change Codium priority above Cursor ([47c981e](https://github.com/raas-dev/configent/commit/47c981e8f1b88b0422d7824dc3d2001bf3ff4c16))
* **python:** Symlink sitecustomize.py ([9fbc2fe](https://github.com/raas-dev/configent/commit/9fbc2feffe2adc69a2d1d951cd4290eef1e671e3))

### [1.93.1](https://github.com/raas-dev/configent/compare/1.93.0...1.93.1) (2024-04-18)


### Fixes

* **aliases:** Remove onefetch ([5336817](https://github.com/raas-dev/configent/commit/53368177c4db0a486bbac29811650761f66db4a1))
* **aliases:** Remove usql ([c5e99fa](https://github.com/raas-dev/configent/commit/c5e99fa9145b513f390846ac9a65c06b60111b88))
* **aliases:** Remove webanalyze ([38cfa3a](https://github.com/raas-dev/configent/commit/38cfa3ae26fc3106ed8a1f1a9c141fc727ce50e4))
* **azure:** Upgrade azure cli ([f02560f](https://github.com/raas-dev/configent/commit/f02560fcd20d6e4f286f5e38b0777c700403ee70))

## [1.93.0](https://github.com/raas-dev/configent/compare/1.92.0...1.93.0) (2024-04-18)


### Features

* **go:** Remove arc ([2ccb751](https://github.com/raas-dev/configent/commit/2ccb751f6f86055b7355c59e265b9bead6aec6cc))
* **rust:** Add ouch, deprecates go arc ([f5c74e9](https://github.com/raas-dev/configent/commit/f5c74e912d133ccef4980d8fe5bf2ae50bc62150))


### Fixes

* **aliases:** Add lemmeknow via nix ([67179c4](https://github.com/raas-dev/configent/commit/67179c4dc4eebfe18a28b9855389197e7b895a44))
* **aliases:** Add onefetch via nix ([0722547](https://github.com/raas-dev/configent/commit/072254746ea8b270b6043e1e2e6dcab788869440))
* **aliases:** Use yazi over xplr, via nix ([9eaf61e](https://github.com/raas-dev/configent/commit/9eaf61e322f8d5fc9e002f1eefdf9bc3fa11f37b))
* **tmux:** Enable passthrough ([5848592](https://github.com/raas-dev/configent/commit/5848592ac74708d15763ff15cdd3942b2188e332))

## [1.92.0](https://github.com/raas-dev/configent/compare/1.91.2...1.92.0) (2024-04-18)


### Features

* **python:** Use Rich tracebacks over tbvaccine ([4547aeb](https://github.com/raas-dev/configent/commit/4547aebd25a95cb1e64a57c44a43a10ae43570e5))


### Fixes

* **aliases:** Add harlequin via pipx ([6e4f2c0](https://github.com/raas-dev/configent/commit/6e4f2c08afce0584c5b2813174c30b72ce4c3d10))
* **aliases:** Add tl (toolong) via pipx ([3b496bc](https://github.com/raas-dev/configent/commit/3b496bc2a7122a6aaa2dc61d25bea303cdc03635))
* **python:** Fix RICH_TRACEBACKS logic ([ddf1630](https://github.com/raas-dev/configent/commit/ddf1630df1d531b3d9353ce1e1d06c823dd4ea25))
* **vscode:** Send most keybindings to shell ([5587f80](https://github.com/raas-dev/configent/commit/5587f8052d6a31118d22350ad3644efd1c0c5695))

### [1.91.2](https://github.com/raas-dev/configent/compare/1.91.1...1.91.2) (2024-04-18)


### Fixes

* **aichat:** Improve prompts ([bd2f62f](https://github.com/raas-dev/configent/commit/bd2f62f75f4730447f08f468935658634324632d))
* **python:** Remove better-exceptions ([3dcbef9](https://github.com/raas-dev/configent/commit/3dcbef95514ddbea52efb339c8c9a2f60106017e))
* **python:** Remove setuptools and wheel ([4608280](https://github.com/raas-dev/configent/commit/4608280f8d3a53113d7b329b0ceb3877c99f6839))

### [1.91.1](https://github.com/raas-dev/configent/compare/1.91.0...1.91.1) (2024-04-15)


### Fixes

* **aliases:** Recreate Python virtual env by venv ([5c5a806](https://github.com/raas-dev/configent/commit/5c5a806bebbc197138a786b5e330c9e11e62c656))
* **python:** Unset virtualenv on shell load ([73b01c7](https://github.com/raas-dev/configent/commit/73b01c7d7b50a550f2ca6081118fa73c06363479))

## [1.91.0](https://github.com/raas-dev/configent/compare/1.90.2...1.91.0) (2024-04-15)


### Features

* **aliases:** Add venv() for toggling Python venv ([c3e9406](https://github.com/raas-dev/configent/commit/c3e94067c36d19dd7c9aa56557f33bca26b1612e))
* **python:** Add uv ([18c8c21](https://github.com/raas-dev/configent/commit/18c8c21f1a7e4600e77981686afc8a12c4bc5dae))


### Fixes

* **node:** Upgrade Node.js LTS ([337c371](https://github.com/raas-dev/configent/commit/337c371c7d6ccb52c98d74747da549d96e6e4032))
* **ruby:** Upgrade ruby ([058511c](https://github.com/raas-dev/configent/commit/058511c0ee210955c25c5d370781f193a43379d7))

### [1.90.2](https://github.com/raas-dev/configent/compare/1.90.1...1.90.2) (2024-04-14)


### Fixes

* **aliases:** Move interpreter flags to config ([203b80e](https://github.com/raas-dev/configent/commit/203b80e3b97ee43c63bed1ab5080856a4269fa32))
* **aliases:** Remove euporie ([bc38950](https://github.com/raas-dev/configent/commit/bc38950474dfc3dbc013096d4f6c2a9469a0fc30))
* **appsec:** Upgrade tools ([4c99a3c](https://github.com/raas-dev/configent/commit/4c99a3c3cbfdcd5841b7531f91823491f86af78a))
* **cspell:** Ignore py files ([507ff59](https://github.com/raas-dev/configent/commit/507ff599fc57f851019f81648617e50e58307945))
* **dircolors:** Add file extensions ([a732ebf](https://github.com/raas-dev/configent/commit/a732ebf8fa1bb7e0972ece7ea6bdcc0dcd2e7ff2))
* **interpreter:** Assume offline ([69099e7](https://github.com/raas-dev/configent/commit/69099e71e69e99fd2d647ac0513302e8b6c0b8a7))
* **python:** Install poetry ([1a267a4](https://github.com/raas-dev/configent/commit/1a267a4f463bc24ad9ba78b93ea2458f32a99192))

### [1.90.1](https://github.com/raas-dev/configent/compare/1.90.0...1.90.1) (2024-04-13)


### Fixes

* **aliases:** Add auto-run to interpreter ([01be4ab](https://github.com/raas-dev/configent/commit/01be4ab246a1eafbdd4b42685aadba3a50d8cc67))
* **interpreter:** Fix open interpreter model ([991f223](https://github.com/raas-dev/configent/commit/991f223c280292975494f1f344da4f49a6f72f90))
* **interpreter:** Pin Open Interpreter version ([79b9aac](https://github.com/raas-dev/configent/commit/79b9aac339ff07872230334e59f48af583fc1164))
* **n:** Do not read .env file ([07b0ffc](https://github.com/raas-dev/configent/commit/07b0ffce1af299c9bebc962c80fe83070f421672))

## [1.90.0](https://github.com/raas-dev/configent/compare/1.89.3...1.90.0) (2024-04-13)


### Features

* **lima:** Make most volume mounts read only ([99fa848](https://github.com/raas-dev/configent/commit/99fa8482f625395bfd5c33d467d538e4dc62229d))


### Fixes

* **docker:** Fix handling of guest paths ([01660b6](https://github.com/raas-dev/configent/commit/01660b6e2f8819102d40432bc8594bc973eae935))

### [1.89.3](https://github.com/raas-dev/configent/compare/1.89.2...1.89.3) (2024-04-13)


### Fixes

* **docker:** Fix paths ([d29117f](https://github.com/raas-dev/configent/commit/d29117f563c46fcc72d1fa8d90e3e52e90f57660))
* **interpreter:** Fix dockerfile path ([c686e26](https://github.com/raas-dev/configent/commit/c686e26bcec05f3f182b031b41abb144eaa59475))

### [1.89.2](https://github.com/raas-dev/configent/compare/1.89.1...1.89.2) (2024-04-13)


### Performance

* **nix:** Speed up image build ([d6fca62](https://github.com/raas-dev/configent/commit/d6fca62c9ed59da1197ef2f65ea2877758f95042))


### Fixes

* **aliases:** Improve ai role ([4699058](https://github.com/raas-dev/configent/commit/46990580f72e612ea46a2f3752b29990774f644c))
* **docker:** Use relative paths in shims ([5e949d2](https://github.com/raas-dev/configent/commit/5e949d20e8b4603afe09a5c98ef2f3f6d749aedb))
* **lima:** Limit Debian VM volume mounts ([341765d](https://github.com/raas-dev/configent/commit/341765d57cb542010e6abb0fcaa7871bfae43ca5))
* **lima:** Update debian image ([8b1d333](https://github.com/raas-dev/configent/commit/8b1d33362f5707a722bbcdd1068b2dcabd11738f))

### [1.89.1](https://github.com/raas-dev/configent/compare/1.89.0...1.89.1) (2024-04-12)


### Fixes

* **aichat:** Shorten fast chat responses ([69bcf85](https://github.com/raas-dev/configent/commit/69bcf85942f7bde2dc43a88ee67535188d4fe183))
* **aichat:** Shorten fast chat responses ([53aecf8](https://github.com/raas-dev/configent/commit/53aecf87d07a225c1b5a1252be357012fc0ba5fc))
* **aliases:** Remove unused nixery apps ([64a0061](https://github.com/raas-dev/configent/commit/64a00619e47a0c14db3f381d911f6318e8742c2f))
* **dircolors:** Add formats ([9d0bb6b](https://github.com/raas-dev/configent/commit/9d0bb6b86f7fc360a1ed346951c8f3b5a815f417))
* **nix:** Do not build with cachix and devenv ([88007f6](https://github.com/raas-dev/configent/commit/88007f6920bfe94bb1f514fb7d6582f3b1b40dc0))
* **nixery:** Remove nixery ([c8cbc98](https://github.com/raas-dev/configent/commit/c8cbc98b1ab7051331c9410da04b3a3f8062ef95))

## [1.89.0](https://github.com/raas-dev/configent/compare/1.88.2...1.89.0) (2024-04-12)


### Features

* **aliases:** Change a, c to aichat and s to rg ([d493d02](https://github.com/raas-dev/configent/commit/d493d02a4c548071a65b1ab49fbe6adc8a82794f))


### Fixes

* **aichat:** Improve code prompt ([755c9ff](https://github.com/raas-dev/configent/commit/755c9ffcafd35042a6252b550cf50909a4247c55))
* **aichat:** Improve prompts ([63fc95c](https://github.com/raas-dev/configent/commit/63fc95cd6cc8bbd6aa39cde9e67ca085300f613e))
* **aichat:** Use gpt-4-turbo for coding ([547dfad](https://github.com/raas-dev/configent/commit/547dfad2e6607cbdbc4e1b0b8723558b8370015f))
* **dircolors:** Add colors to config files ([ed11b8d](https://github.com/raas-dev/configent/commit/ed11b8dc0afb7e122b5001c4d97ea9f6a59f1092))
* **dircolors:** Add ini and xml to config ([429f15f](https://github.com/raas-dev/configent/commit/429f15f9fb2560497e2ba768fdee78654a031c58))
* **dircolors:** Add webp ([e5683a3](https://github.com/raas-dev/configent/commit/e5683a395d821b813b9263a2ec26b1cdb3b8ebac))
* **dircolors:** Change colors for config and media ([286fdb9](https://github.com/raas-dev/configent/commit/286fdb9d0f5673f241c2c733ac4380c428f2b956))
* **macos:** Disable .DS_Store on removable drives ([5f2c6d6](https://github.com/raas-dev/configent/commit/5f2c6d6b5652f53bc1379e202e010f00c5278da5))
* **macos:** Rename os_x to macos ([14dc32a](https://github.com/raas-dev/configent/commit/14dc32a1a6d49d25f202397274406fb2b6f288a6))
* **vscode:** Keep sidebar open ([875a3e7](https://github.com/raas-dev/configent/commit/875a3e7d93901a72d5d149550739bfd0e59062ad))

### [1.88.2](https://github.com/raas-dev/configent/compare/1.88.1...1.88.2) (2024-04-11)


### Fixes

* **dircolors:** Preload before fzf-tab ([76241e9](https://github.com/raas-dev/configent/commit/76241e9a0948f6c3cd88573b0132a5e04861972b))
* **lessfilter:** Never show icons in dir listing ([c735482](https://github.com/raas-dev/configent/commit/c7354824ed8849cb312ca89b1995a0dc06b90092))
* **less:** Update lesspipe ([5351400](https://github.com/raas-dev/configent/commit/53514002fb6d930d8ba4a7c87badc112fad31a94))
* **vim:** Do not change cursor in vim ([3b9dcbf](https://github.com/raas-dev/configent/commit/3b9dcbf7ad4848c97aa4b19b67d03fe064ff7710))
* **vscode:** Improve terminal colors ([6b8c3bb](https://github.com/raas-dev/configent/commit/6b8c3bbaeb1e5dac1d25f5c01e2eb1d2c9deb061))
* **zsh:** Add fzf-tab menu defaults ([27ef7a5](https://github.com/raas-dev/configent/commit/27ef7a577000487dafd46635ffe1d6bb7f680e4d))

### [1.88.1](https://github.com/raas-dev/configent/compare/1.88.0...1.88.1) (2024-04-11)


### Fixes

* **gpt:** Update turbo-preview to turbo ([7c1875e](https://github.com/raas-dev/configent/commit/7c1875eb94472dafb69fc6be6249718e0de2b1d2))
* **turbocommit:** Fix LLM for turbocommit ([89d162f](https://github.com/raas-dev/configent/commit/89d162f43f848e53eed7e974ba9486f8e5345df7))
* **vscode:** Improve terminal color scheme ([26f384a](https://github.com/raas-dev/configent/commit/26f384a77e6d8b4bcc9df24db26326d35d32789a))
* **vscode:** Improve terminal colors ([629b01f](https://github.com/raas-dev/configent/commit/629b01f435502b4a956d95bfba27a1d3300b7d6f))
* **vscode:** Improve terminal colors ([c4488aa](https://github.com/raas-dev/configent/commit/c4488aae903902fb78203a0c31102097c05cd2ae))

## [1.88.0](https://github.com/raas-dev/configent/compare/1.87.3...1.88.0) (2024-04-10)


### Features

* **terminal:** Add SynthWave84 theme ([b3764ec](https://github.com/raas-dev/configent/commit/b3764ec2329665b480d92b8282a685e216242ac2))


### Fixes

* **aichat:** Improve code prompt ([c7ac60b](https://github.com/raas-dev/configent/commit/c7ac60b17930d3c099b3ed956ca7433f922f81ab))

### [1.87.3](https://github.com/raas-dev/configent/compare/1.87.2...1.87.3) (2024-04-10)


### Fixes

* **aichat:** Do not ask to save session ([ca8e0c7](https://github.com/raas-dev/configent/commit/ca8e0c7188f3cc0aa05b9292b33fe9c3ffbddad5))
* **aichat:** Make default temperature 0 ([4001f65](https://github.com/raas-dev/configent/commit/4001f656aca7d3b950989b1f89ecd6a2a460a088))
* **aichat:** Shorten fast chat responses ([5e5691f](https://github.com/raas-dev/configent/commit/5e5691f507b4b176858d085922c5d3bd21de3824))
* **aliases:** Use Claude3 Haiku for coding ([3a2b30b](https://github.com/raas-dev/configent/commit/3a2b30bc99a9fef9dfacadafa4c41ba3e8c44350))
* **codium:** Use Claude 3 haiku for Continue ([bec9ec2](https://github.com/raas-dev/configent/commit/bec9ec233944f2285678dcab2226a18084bced3b))

### [1.87.2](https://github.com/raas-dev/configent/compare/1.87.1...1.87.2) (2024-04-10)


### Fixes

* **aliases:** Remove fabric ([ff02f25](https://github.com/raas-dev/configent/commit/ff02f257560de2dc06dcecbeef76f0046a0f374e))

### [1.87.1](https://github.com/raas-dev/configent/compare/1.87.0...1.87.1) (2024-04-10)


### Fixes

* **codium:** Remove cursor ([947de76](https://github.com/raas-dev/configent/commit/947de76d4b67efc8ec0c3295b602e81c2c4e961d))
* **cursor:** Add pyright ([b990b2e](https://github.com/raas-dev/configent/commit/b990b2e903502b36b7fe65ba0e658391850096d5))

## [1.87.0](https://github.com/raas-dev/configent/compare/1.86.1...1.87.0) (2024-04-10)


### Features

* **linux:** Use VSCodium over VSCode ([5b49472](https://github.com/raas-dev/configent/commit/5b4947257cc9ae1fcd7822a432225cc97317dfc7))
* **macos:** Add experimental Cursor support ([0136df9](https://github.com/raas-dev/configent/commit/0136df9a3fa8a63e3a943d4819efc3495dcd4f36))
* **macos:** Prefer Cursor over VSCodium ([e7179ac](https://github.com/raas-dev/configent/commit/e7179acfa0a38e1eb3dbc51c734c7822de5f6dde))
* **macos:** Use Cursor over VSCode ([9fd46f7](https://github.com/raas-dev/configent/commit/9fd46f74f6a117a50136c5b6e512718640f258f4))
* **vscode:** Add pyright extension ([33c5ff5](https://github.com/raas-dev/configent/commit/33c5ff5869f911819350bf1949222483086bfbb2))
* **vscode:** Use VSCodium over VSCode ([f458699](https://github.com/raas-dev/configent/commit/f4586995dffdec988da65c9e533f4381ea7fb578))


### Fixes

* **aliases:** Fix codeclear ([c75cc2d](https://github.com/raas-dev/configent/commit/c75cc2dcd5c1e694b1c2a25bfccc7dae20d4012b))
* **code:** Prefer cursor as vscode if present ([7a75d22](https://github.com/raas-dev/configent/commit/7a75d22dd7bf83234db5fe239ba0f81ed89a8c57))
* **continue:** Add dotenv ([e446b30](https://github.com/raas-dev/configent/commit/e446b303ad06907a191a793e354fbfe73fc03fbc))
* **continue:** Move config.ts to setup_vscode ([c505759](https://github.com/raas-dev/configent/commit/c505759ee5cb905c058f1e7b88385deeeb617322))
* **cursor:** Add cursor specific extensions ([836ea3b](https://github.com/raas-dev/configent/commit/836ea3bd51ce7ff2769423e79dc97759575d594a))
* **cursor:** Fix aliasing code to cursor ([16200f1](https://github.com/raas-dev/configent/commit/16200f1880dd4600302ddbc36d9fc135f1ed691f))
* **vscode:** Add support for cursor extensions ([8fc5145](https://github.com/raas-dev/configent/commit/8fc5145ad2699a7cc3a562b11b4fd2bdf935e82a))
* **vscode:** Allow toggling sidebar ([b7a0e48](https://github.com/raas-dev/configent/commit/b7a0e482a4134baefaa76ec85ac3e31222cea0c1))
* **vscode:** Fix finding VSCode bin ([17e3027](https://github.com/raas-dev/configent/commit/17e302759202bfd6d34c192269b97e07715ce5be))
* **vscode:** Remove extensions requiring login ([c2a5478](https://github.com/raas-dev/configent/commit/c2a54784afe5809991a41a17dd35cc9b6d33f8ca))

### [1.86.1](https://github.com/raas-dev/configent/compare/1.86.0...1.86.1) (2024-04-05)


### Fixes

* **aichat:** Improve system prompts ([392b58d](https://github.com/raas-dev/configent/commit/392b58d1700aefe846ec92af6279054165e53bf5))
* **tmux:** Use terminal present by default ([842c333](https://github.com/raas-dev/configent/commit/842c333881e275551e5c3dca75a315aed9023805))

## [1.86.0](https://github.com/raas-dev/configent/compare/1.85.1...1.86.0) (2024-04-03)


### Features

* **gpt:** Remove codegpt due to lack of models ([37f589f](https://github.com/raas-dev/configent/commit/37f589f30a1640d9d5790e788f08a3892587628a))
* **pwsh:** Add starship to powershell ([b1a5c60](https://github.com/raas-dev/configent/commit/b1a5c601b0c13677aacac96933d8db26ecfdb7af))
* **python:** Update python ([51579e8](https://github.com/raas-dev/configent/commit/51579e803a12d0429db3b29bdbebbc65a066a8a2))
* **vscode:** Add pyright extension ([68253c0](https://github.com/raas-dev/configent/commit/68253c07daed7e9bfdc94de3df944202c6d66524))

### [1.85.1](https://github.com/raas-dev/configent/compare/1.85.0...1.85.1) (2024-03-30)


### Fixes

* **aichat:** Add specialized roles ([4984ff0](https://github.com/raas-dev/configent/commit/4984ff04a5a15cdb7da5c7ae7ebb4a92b7086989))
* **turbocommit:** Improve prompt ([96d16fe](https://github.com/raas-dev/configent/commit/96d16fe51de2218540785ff0b4b37f76e42002be))
* **turbocommit:** Improve prompt ([c22d7fe](https://github.com/raas-dev/configent/commit/c22d7febf30c748a26571c6bfb0474d9ea2032b0))
* **turbocommit:** Improve prompt ([d64790f](https://github.com/raas-dev/configent/commit/d64790f8ed87d08a93a0e786c2d89b8759ac8e30))

## [1.85.0](https://github.com/raas-dev/configent/compare/1.84.1...1.85.0) (2024-03-24)


### Features

* **gpt:** Add codegpt for creating commit msgs ([83ef374](https://github.com/raas-dev/configent/commit/83ef3746995225696baff22d9328b58cba5242bf))
* **gpt:** Add turbocommit ([0ae24fc](https://github.com/raas-dev/configent/commit/0ae24fc92ef6926f012de2e813468dc2e09d6ce7))


### Fixes

* **aliases:** Add uv via pipx ([9414d71](https://github.com/raas-dev/configent/commit/9414d71a196cc81729027f0acdc79b3f2ec76530))
* **turbocommit:** Improve prompt ([6232a6f](https://github.com/raas-dev/configent/commit/6232a6fd60eb22dc9a9e347428a1bf24a6f90a78))

### [1.84.1](https://github.com/raas-dev/configent/compare/1.84.0...1.84.1) (2024-03-23)


### Fixes

* **aichat:** Lower temperature ([d902684](https://github.com/raas-dev/configent/commit/d902684c272c4f2ead176b7481fec3084e37edb2))
* **aichat:** Prompt attempt to limit markdown width ([ca638e3](https://github.com/raas-dev/configent/commit/ca638e39074d6964f30d03270fcd3c713683a0c2))
* **rust:** Lock kalker dependencies ([5a96db8](https://github.com/raas-dev/configent/commit/5a96db8a89c88a06754ffcac86aafcfb42a07948))

## [1.84.0](https://github.com/raas-dev/configent/compare/1.83.0...1.84.0) (2024-03-19)


### Features

* **aliases:** Add syft via n ([06d2f4a](https://github.com/raas-dev/configent/commit/06d2f4a1ffc42a41a18c3822dc34c58a05def729))


### Fixes

* **aliases:** Remove interpreter env file ([1ef4abd](https://github.com/raas-dev/configent/commit/1ef4abd90e806c31592b44b57348169c404e4d54))
* **aliases:** Run grype via n as rw to write report ([a60b322](https://github.com/raas-dev/configent/commit/a60b3224a31d05a8826145f36d51cfe13744ffeb))
* **git:** Add alias ig to list git ignores ([b9e453b](https://github.com/raas-dev/configent/commit/b9e453b46bc4c7518050ea2bfe9f81acdeb4e058))
* **vscode:** Keep sidebar open ([3cfb4f1](https://github.com/raas-dev/configent/commit/3cfb4f16606399c7f594c8919e0ef4eef158516e))
* **vscode:** Remove unused kubescape ext ([538a0f4](https://github.com/raas-dev/configent/commit/538a0f43e7e1d14aeb30e251baf96e8eda66a2ff))

## [1.83.0](https://github.com/raas-dev/configent/compare/1.82.0...1.83.0) (2024-03-17)


### Features

* **aliases:** Create aliases for the prompt library ([a8dba8c](https://github.com/raas-dev/configent/commit/a8dba8c132421d38426a4df4862533d04cfdf078))
* **interpreter:** Run open-interpreter in docker ([2145ced](https://github.com/raas-dev/configent/commit/2145ced67b20514acfc9d05bbafb2194e98b5b10))


### Fixes

* **interpreter:** Add open-interpreter profile ([0f4f1b6](https://github.com/raas-dev/configent/commit/0f4f1b6e35761855b330d5cfb9a575225fcc3c7c))

## [1.82.0](https://github.com/raas-dev/configent/compare/1.81.1...1.82.0) (2024-03-16)


### Features

* **aliases:** Add guarddog via pipx ([7ca5962](https://github.com/raas-dev/configent/commit/7ca5962cf2d2c69e368bbb9520ed2c07c3d99bdf))
* **aliases:** Alias s to open GPT coding session ([786f764](https://github.com/raas-dev/configent/commit/786f764f59221e3f4f2a35a21e65c589c61fb296))
* **zsh:** Add CTRL+e for aichat shell integration ([011edba](https://github.com/raas-dev/configent/commit/011edbae7616f1cb115f53e3f1dfcfb96e26096b))


### Fixes

* **aliases:** Add open-interpreter defaults ([da210ed](https://github.com/raas-dev/configent/commit/da210edd16c3fe24327bf36403aef4dd42a5d157))
* **aliases:** Fix open-interpreter args ([6741519](https://github.com/raas-dev/configent/commit/674151956ef4fd25a923839962668392558f596c))
* **aliases:** Fix open-interpreter context length ([9c4537b](https://github.com/raas-dev/configent/commit/9c4537b136233883f7f4e5db756066823af29992))
* **aliases:** Remove unused glances modules ([e034834](https://github.com/raas-dev/configent/commit/e034834c7160bda44d0dab95cfbbe574b9c354d2))

### [1.81.1](https://github.com/raas-dev/configent/compare/1.81.0...1.81.1) (2024-03-16)


### Fixes

* **aichat:** Use claude 3 for codegen ([4863682](https://github.com/raas-dev/configent/commit/48636826c03275aa9c031be9bbeb70081fa0a377))
* **aliases:** Improve code prompt ([bdfea74](https://github.com/raas-dev/configent/commit/bdfea7408a885041820a816a686d53b5dcc4fa7b))
* **aliases:** Remove shell-gpt over aichat ([202a14f](https://github.com/raas-dev/configent/commit/202a14f541b5d00052d52847810abe94a9343064))
* **continue:** Move from py config to ts config ([d46f6e9](https://github.com/raas-dev/configent/commit/d46f6e91bb889bc9750b573611a56442cc149443))

## [1.81.0](https://github.com/raas-dev/configent/compare/1.80.2...1.81.0) (2024-03-14)


### Features

* **python:** Add poetry ([a70a5ae](https://github.com/raas-dev/configent/commit/a70a5ae417d92c55833c5b78024cc11c2d0b77f7))


### Fixes

* **git:** Tidy git l format ([9e2d0ce](https://github.com/raas-dev/configent/commit/9e2d0ce44b573eb7db2a3d147818da4d6b4d07ad))

### [1.80.2](https://github.com/raas-dev/configent/compare/1.80.1...1.80.2) (2024-03-10)


### Fixes

* **git:** Alias co without patch ([c4c1c33](https://github.com/raas-dev/configent/commit/c4c1c3327ad9b556051b27120ebf3bf52820d90d))
* **git:** Fix git sw ([779c570](https://github.com/raas-dev/configent/commit/779c5708d6e96e4a711fbbcbb4f81d15fa1a858f))
* **git:** Remove fetch extra prune ([a309de7](https://github.com/raas-dev/configent/commit/a309de7f2a4379c7f849aac71cafa200c95039e2))
* **macos:** Add check for script run on macOS only ([628996c](https://github.com/raas-dev/configent/commit/628996c8441c56181531d9724cf2487ce85b8763))
* **macos:** Add script to setup ukelele layouts ([231438c](https://github.com/raas-dev/configent/commit/231438ca1f28fd403d6441e764af1f7d1e6343e3))
* **macos:** Rename write defaults script ([4d48ac9](https://github.com/raas-dev/configent/commit/4d48ac9ac38f3d2bbaf88ad35cb51deaffa889c5))

### [1.80.1](https://github.com/raas-dev/configent/compare/1.80.0...1.80.1) (2024-03-10)


### Fixes

* **git:** Find aliases to ignore case ([65e3a00](https://github.com/raas-dev/configent/commit/65e3a00df2ef550f20d7dfbca7e36799f53af855))
* **git:** git b list remote references ([ded87c3](https://github.com/raas-dev/configent/commit/ded87c3efe695f4783701c8868f3d9966c91e6c8))
* **git:** git cam to no-edit ([1afd92a](https://github.com/raas-dev/configent/commit/1afd92a878743a3ce872a30ba218a33df81367f4))
* **git:** git f to prune ([9435d77](https://github.com/raas-dev/configent/commit/9435d77dcc2012edc11a21daae9a0ecf9549abc3))
* **git:** Similarize find aliases log format ([18e5ed2](https://github.com/raas-dev/configent/commit/18e5ed24a82f141470e194b5e34c39ed5453f49f))

## [1.80.0](https://github.com/raas-dev/configent/compare/1.79.1...1.80.0) (2024-03-10)


### Features

* **git:** Revisit and improve git aliases ([f7e3be9](https://github.com/raas-dev/configent/commit/f7e3be9dba95df1e94582dbf46ffe040bcd51963))
* **vscode:** Update extensions ([d406e15](https://github.com/raas-dev/configent/commit/d406e150567e90577d5deee2c963f5b32593b6cc))

### [1.79.1](https://github.com/raas-dev/configent/compare/1.79.0...1.79.1) (2024-03-04)


### Fixes

* **git:** Fix aliases st and s ([23b8d98](https://github.com/raas-dev/configent/commit/23b8d983494085b5c754038da178746e09a40348))
* **git:** Make f fetch also tags ([5376ff3](https://github.com/raas-dev/configent/commit/5376ff3b62f53964938adad7c7b12c4c3eace224))

## [1.79.0](https://github.com/raas-dev/configent/compare/1.78.1...1.79.0) (2024-03-03)


### Features

* **git:** Alias s to status and j to switch branch ([06cc78e](https://github.com/raas-dev/configent/commit/06cc78e6750dba304aa89a5c3d19c70fb6de9228))
* **git:** Renew git aliases ([ecd0f1e](https://github.com/raas-dev/configent/commit/ecd0f1e7f7a1ca670f226748d12a0bcf88e23a9d))

### [1.78.1](https://github.com/raas-dev/configent/compare/1.78.0...1.78.1) (2024-03-03)


### Fixes

* **aliases:** Remove flyctl ([4af2593](https://github.com/raas-dev/configent/commit/4af259369a2ce21e47ec9b1912276d10fca1e2eb))
* **vscode:** Fix Linux external terminal ([5f97714](https://github.com/raas-dev/configent/commit/5f97714b1896d96b0b0942f06cb7b811bad57e94))

## [1.78.0](https://github.com/raas-dev/configent/compare/1.77.2...1.78.0) (2024-03-02)


### Features

* **vscode:** Set tmux as default vscode terminal ([738bbcc](https://github.com/raas-dev/configent/commit/738bbccda28942be919c81462cb03c7b75228cd0))


### Fixes

* **aliases:** Remove majestic - unmaintained ([056771e](https://github.com/raas-dev/configent/commit/056771eaa1ec9ab75bb62109f9bceea97eda1d2f))
* **colors:** Add support for tmux-256color ([2d0f41a](https://github.com/raas-dev/configent/commit/2d0f41ac6d60c44ee439d17e8158cd0372faf364))
* **tmux:** Update 24-bit color settings ([42826c0](https://github.com/raas-dev/configent/commit/42826c0e7db1541e6bcd9c298f217f2120f97174))
* **tmux:** Use tmux 3.3a - 3.4 prints garbage ([cd60749](https://github.com/raas-dev/configent/commit/cd607492f22dab1f694ca4847320c1bd19db602e))
* **vscode:** Disable shell integration ([75a1a7e](https://github.com/raas-dev/configent/commit/75a1a7e87f02f20f391b7ae2a9a13d0d773b9c6d))
* **vscode:** Integrated terminal settings ([939572f](https://github.com/raas-dev/configent/commit/939572f52d1b21505306ad74b31575bece7f726f))

### [1.77.2](https://github.com/raas-dev/configent/compare/1.77.1...1.77.2) (2024-02-10)


### Fixes

* **aichat:** Improve expert prompt ([23be9a9](https://github.com/raas-dev/configent/commit/23be9a99b5679442439d79a3e12115e5333906c4))
* **aichat:** Improve expert prompt ([7835d4f](https://github.com/raas-dev/configent/commit/7835d4f810243c8cfcae7e867ea4cd3151b00b46))

### [1.77.1](https://github.com/raas-dev/configent/compare/1.77.0...1.77.1) (2024-02-04)


### Fixes

* **aichat:** Improve prompts and temperature ([b62cff6](https://github.com/raas-dev/configent/commit/b62cff66bf43da6db46df1ccab9ad46d38e7a306))
* **aliases:** Add --verify=no to h ([2ea53a4](https://github.com/raas-dev/configent/commit/2ea53a4106ca22e4f0ad8d09d9d73d040c643c86))
* **vscode:** Hide workbench ([c9eb1bc](https://github.com/raas-dev/configent/commit/c9eb1bc557ae84ec3c8c3427c48272789b480c81))

## [1.77.0](https://github.com/raas-dev/configent/compare/1.76.1...1.77.0) (2024-01-27)


### Features

* **ai:** Upgrade to latest gpt-4-turbo model ([8eac5e0](https://github.com/raas-dev/configent/commit/8eac5e0d1538dc5121a0dbde1b8c449ad0ca83cc))


### Fixes

* **tmux:** Upgrade tmux 3.2 -> 3.3a ([08fa18a](https://github.com/raas-dev/configent/commit/08fa18a20c14273f53bfa931838b3ffeb09c5981))

### [1.76.1](https://github.com/raas-dev/configent/compare/1.76.0...1.76.1) (2024-01-23)


### Fixes

* **aichat:** Improve expert prompt ([a89c55c](https://github.com/raas-dev/configent/commit/a89c55cd79585e0d50303e6a4ff731f3e74ac6cb))

## [1.76.0](https://github.com/raas-dev/configent/compare/1.75.3...1.76.0) (2024-01-14)


### Features

* **aliases:** Add cd shortcuts ([f164218](https://github.com/raas-dev/configent/commit/f164218f6e45711321968d661127cd8f6fed12ac))


### Fixes

* **aliases:** Get wttr for current time zone ([10ecaf5](https://github.com/raas-dev/configent/commit/10ecaf585f976d144cd5582fc1fa92ffea3a3dbb))
* **aliases:** Response ANSI wttr ([323f2af](https://github.com/raas-dev/configent/commit/323f2afce70316f1cd2f9528a366a2b5295f69b5))
* **aliases:** Simplify wttr format ([fe06415](https://github.com/raas-dev/configent/commit/fe06415f9a10eda2087ca7e8a70d965b50e04231))

### [1.75.3](https://github.com/raas-dev/configent/compare/1.75.2...1.75.3) (2024-01-07)


### Fixes

* **aichat:** Improve prompts ([8a0bc3a](https://github.com/raas-dev/configent/commit/8a0bc3a3c9bdbc121c00349c33a5dd511f32b720))

### [1.75.2](https://github.com/raas-dev/configent/compare/1.75.1...1.75.2) (2024-01-03)


### Fixes

* **aichat:** Improve prompts ([755aecb](https://github.com/raas-dev/configent/commit/755aecb636b085c65b663cdf3296c8dd74d979b2))
* **aichat:** Improve subject-matter expert prompt ([0345544](https://github.com/raas-dev/configent/commit/0345544b05671c9072db1225e0b6f2da4eb0962e))
* **aliases:** Add ai() option for code ([b5e2740](https://github.com/raas-dev/configent/commit/b5e27401964e0c117047a5d1dde1cbf5ba95c590))

### [1.75.1](https://github.com/raas-dev/configent/compare/1.75.0...1.75.1) (2023-12-29)


### Fixes

* **azure:** Upgrade bicep cli ([9091274](https://github.com/raas-dev/configent/commit/909127427d8b3c1ae86b5ef1be3b70783a729dde))

## [1.75.0](https://github.com/raas-dev/configent/compare/1.74.3...1.75.0) (2023-12-25)


### Features

* **aliases:** Move from shell-gpt to aichat ([5abdbe0](https://github.com/raas-dev/configent/commit/5abdbe08f6860198caa57c55a69de429eac0cac2))

### [1.74.3](https://github.com/raas-dev/configent/compare/1.74.2...1.74.3) (2023-12-23)


### Fixes

* **sgpt:** Revert shell-gpt to last working version ([6b0861c](https://github.com/raas-dev/configent/commit/6b0861c19b721c7912d6d1ffa1794a9f98b49b1a))

### [1.74.2](https://github.com/raas-dev/configent/compare/1.74.1...1.74.2) (2023-12-23)


### Fixes

* **git:** Git alias res -> rem ([1ae983d](https://github.com/raas-dev/configent/commit/1ae983dedaa5fa421062ac565523fe588a925f6b))
* **sgpt:** Fix assistant role json format ([a015e7b](https://github.com/raas-dev/configent/commit/a015e7baa766c05acf470574fe28e358ece964cf))

### [1.74.1](https://github.com/raas-dev/configent/compare/1.74.0...1.74.1) (2023-12-17)


### Fixes

* **continue:** Prompt ([312b8be](https://github.com/raas-dev/configent/commit/312b8bed911c8123ad3a6403637d2ce5014b0c17))
* **spgt:** Adjust prompt to produce shorter answers ([194374b](https://github.com/raas-dev/configent/commit/194374b75e1c24db1f32fc8665ffc117b69fb5e4))

## [1.74.0](https://github.com/raas-dev/configent/compare/1.73.6...1.74.0) (2023-12-02)


### Features

* **aliases:** Add firebase-tools via npx ([6df587a](https://github.com/raas-dev/configent/commit/6df587af121b0d7705618009dae81758492ee01f))
* **azure:** Add azure-cli ssh extension ([6aacdca](https://github.com/raas-dev/configent/commit/6aacdcab34909694aa9ff60bc6112e5c45cca031))

### [1.73.6](https://github.com/raas-dev/configent/compare/1.73.5...1.73.6) (2023-11-18)


### Fixes

* **asdf:** Update bun ([79c0049](https://github.com/raas-dev/configent/commit/79c004957f7997642bc9463120b5599dfd04e893))
* **asdf:** Update dotnet to 8 ([b4916c1](https://github.com/raas-dev/configent/commit/b4916c11c057dd4d505c29c01bca8552bf487a9c))

### [1.73.5](https://github.com/raas-dev/configent/compare/1.73.4...1.73.5) (2023-11-12)


### Fixes

* **continue:** Add terminal context provider ([e5481b7](https://github.com/raas-dev/configent/commit/e5481b7849d515b1467577610c7e82c68240a0af))
* **profile:** Add PATH for bicep ([cf42eee](https://github.com/raas-dev/configent/commit/cf42eeed128e52294eec6b878ffa8f0eb24af4e5))

### [1.73.4](https://github.com/raas-dev/configent/compare/1.73.3...1.73.4) (2023-11-08)


### Fixes

* **aliases:** Colorize gpt responses ([09548b5](https://github.com/raas-dev/configent/commit/09548b5b796f00b6e06252d65d41aee050f3ec90))
* **vscode:** Disable telemetry ([0a65030](https://github.com/raas-dev/configent/commit/0a65030228a37fed82d1e994b1126c52e6f37ffb))
* **vscode:** Remove rift ([44c6cec](https://github.com/raas-dev/configent/commit/44c6cec95d4015413df3ccb12a7ba0e0fed69ae3))
* **vscode:** Update continue gpt models ([8ebde8c](https://github.com/raas-dev/configent/commit/8ebde8ce57259ba6c3c9a3743ace9d986cd07b56))
* **vscode:** Use faster gpt model for gitlens ([a683a64](https://github.com/raas-dev/configent/commit/a683a64b7c9d07e4c4cf498f959adbeb6e311d4d))

### [1.73.3](https://github.com/raas-dev/configent/compare/1.73.2...1.73.3) (2023-11-08)


### Fixes

* **aliases:** Update gpt aliases to gpt-4-turbo ([2a050b2](https://github.com/raas-dev/configent/commit/2a050b2acf3d0232758957352f6d534090dfea5f))
* **tmux:** Change tmux-power plugin origin ([d2db5ba](https://github.com/raas-dev/configent/commit/d2db5ba892a77d6890843f7fdc8a0f761aeeb718))
* **vscode:** Remove continue ([a25a70c](https://github.com/raas-dev/configent/commit/a25a70c5faca9187fec9b0973ea94507699b5885))
* **vscode:** Update extensions to use gpt-4 over 3 ([d62dac0](https://github.com/raas-dev/configent/commit/d62dac0a72dbddd3927d5d10beceb3d6bf17ee7b))

### [1.73.2](https://github.com/raas-dev/configent/compare/1.73.1...1.73.2) (2023-10-13)


### Fixes

* **macos:** Remove cask drivers ([ac0592b](https://github.com/raas-dev/configent/commit/ac0592b0fe1421fd4a246802b61a14219a10a0c9))
* **ptpython:** Add config ([e13c990](https://github.com/raas-dev/configent/commit/e13c9901d303b4e1b61d7c8478ce2296246fa288))
* **vscode:** Add rift extension ([7ffd65c](https://github.com/raas-dev/configent/commit/7ffd65c8e938f7ab5e1bde09c8f4bd5145c80491))

### [1.73.1](https://github.com/raas-dev/configent/compare/1.73.0...1.73.1) (2023-09-26)


### Fixes

* **aliases:** Remove aider ([b277bce](https://github.com/raas-dev/configent/commit/b277bcea75284c25575d7869f9ec0efe071eb1bc))
* **aliases:** Remove gpt-engineer over IDE plugins ([cbb0d38](https://github.com/raas-dev/configent/commit/cbb0d38565f690863861f83f15169c5bcb694bde))
* **aliases:** Remove khoj ([6e369ed](https://github.com/raas-dev/configent/commit/6e369ed737a18d1ec342fc1237ca03283c46a6e2))
* **bun:** Uppgrade bun ([c10138a](https://github.com/raas-dev/configent/commit/c10138aee51e29ade5d6aa9b2742abfc99065cfc))

## [1.73.0](https://github.com/raas-dev/configent/compare/1.72.0...1.73.0) (2023-09-15)


### Features

* **aliases:** Rotate one character GPT aliases ([d4f2b2d](https://github.com/raas-dev/configent/commit/d4f2b2d18decba9905a1f88052695899794536c8))


### Fixes

* **bun:** Remove bun due to polluting zshrc ([29cf2c0](https://github.com/raas-dev/configent/commit/29cf2c0774745173f008052494b12131ec26a4f3))

## [1.72.0](https://github.com/raas-dev/configent/compare/1.71.0...1.72.0) (2023-09-12)


### Features

* **aliases:** Add open-interpreter ([c5aa554](https://github.com/raas-dev/configent/commit/c5aa55416158b7f8692c29da6ac309bc404df236))

## [1.71.0](https://github.com/raas-dev/configent/compare/1.70.13...1.71.0) (2023-09-02)


### Features

* **aliases:** Add railway cli ([57c039f](https://github.com/raas-dev/configent/commit/57c039f45b00110183ab0ac073df70f233842763))
* **apps:** Install flyctl by asdf ([6143f8a](https://github.com/raas-dev/configent/commit/6143f8af15798d7ba8e2ac8bcbe402cd880beeb9))
* **install:** Add bun ([879d6c1](https://github.com/raas-dev/configent/commit/879d6c11918e8dbafe45cfca4528c44d9d196822))
* **vscode:** Add continue extension ([52c6b8a](https://github.com/raas-dev/configent/commit/52c6b8a54217b7057c5d655951656ab5095db704))


### Fixes

* **aliases:** Add alias fly for flyctl ([5de0ddb](https://github.com/raas-dev/configent/commit/5de0ddbf719d740214ff17dcdb4b91c9bf1a0a1e))
* **nodejs:** Update nodejs version ([26ab85c](https://github.com/raas-dev/configent/commit/26ab85c986b2a846ad83694368fc3821e67de06b))

### [1.70.13](https://github.com/raas-dev/configent/compare/1.70.12...1.70.13) (2023-08-22)


### Fixes

* **aliases:** Add Azure Functions CLI via npx ([a0b8902](https://github.com/raas-dev/configent/commit/a0b89024454cc370164edded93218f204ecd32de))

### [1.70.12](https://github.com/raas-dev/configent/compare/1.70.11...1.70.12) (2023-08-05)


### Fixes

* **appsec:** Add checkov via pipx ([fca2a7f](https://github.com/raas-dev/configent/commit/fca2a7f3bec2c1ae070aaf13cdebd7a0b7a19f4c))
* **appsec:** Add grype via nixery, not asdf ([6fc845c](https://github.com/raas-dev/configent/commit/6fc845c158baa8068f2ae86210f8e8cc4b8bc21d))
* **nixd:** Fix dockerfile to pass checkov ([a3ece1c](https://github.com/raas-dev/configent/commit/a3ece1c462f36a2fa378152cb98b14f9bc544bd3))

### [1.70.11](https://github.com/raas-dev/configent/compare/1.70.10...1.70.11) (2023-08-04)


### Fixes

* **aliases:** Add checkov via nixery ([3e936a9](https://github.com/raas-dev/configent/commit/3e936a97a1be8ea1c8866db240610e6a4ab3d2b2))
* **aliases:** Add khoj via pipx ([3f34587](https://github.com/raas-dev/configent/commit/3f345870571d567b1c93a2ee745e1c5d12f0e22b))
* **aliases:** Add terrascan via nixery ([41de07c](https://github.com/raas-dev/configent/commit/41de07c6995643e58c49ccee6ec5cbf2fe20618d))

### [1.70.10](https://github.com/raas-dev/configent/compare/1.70.9...1.70.10) (2023-08-03)


### Fixes

* **apps:** Split cloud dev and IAC tools to files ([18b4fd7](https://github.com/raas-dev/configent/commit/18b4fd7117adfd8b37320948e6e88bbede00ace0))

### [1.70.9](https://github.com/raas-dev/configent/compare/1.70.8...1.70.9) (2023-08-03)


### Fixes

* **vscode:** Fix backup check ([09cf571](https://github.com/raas-dev/configent/commit/09cf5712709ee65a19163a11c51840cddd6cb9f3))

### [1.70.8](https://github.com/raas-dev/configent/compare/1.70.7...1.70.8) (2023-08-01)


### Fixes

* **neovim:** Fix create nvim dir ([19e1db8](https://github.com/raas-dev/configent/commit/19e1db8e3acd142bbec04bc84a3c586e21532af2))

### [1.70.7](https://github.com/raas-dev/configent/compare/1.70.6...1.70.7) (2023-08-01)


### Fixes

* **install:** Do not backup vscode if source is symlink ([645f4a2](https://github.com/raas-dev/configent/commit/645f4a2f3bd693a92fc89de52242fb632b47e9cd))
* **install:** No de-reference symlink target dirs ([4943977](https://github.com/raas-dev/configent/commit/494397728cdece7a9be030879398b6630d0e5ea9))
* **install:** Split ~/local to standard subdirs ([c356431](https://github.com/raas-dev/configent/commit/c356431e6339bb6a2cc35d8a0bfa7621092c55d2))

### [1.70.6](https://github.com/raas-dev/configent/compare/1.70.5...1.70.6) (2023-08-01)


### Fixes

* **install:** Fix typo in config path ([8e1ae93](https://github.com/raas-dev/configent/commit/8e1ae93e4f3c8ecd9ca0c6147e905db0750839c9))

### [1.70.5](https://github.com/raas-dev/configent/compare/1.70.4...1.70.5) (2023-08-01)


### Fixes

* **install:** Fix symlinking local if exists ([d4289db](https://github.com/raas-dev/configent/commit/d4289db71f91af3345bf3ce4f3aa49242a381303))

### [1.70.4](https://github.com/raas-dev/configent/compare/1.70.3...1.70.4) (2023-08-01)


### Fixes

* **vscode:** Fix symlinking user path ([69f7eca](https://github.com/raas-dev/configent/commit/69f7ecabb1d9450e245cf8c243f74aab227e0d23))

### [1.70.3](https://github.com/raas-dev/configent/compare/1.70.2...1.70.3) (2023-08-01)


### Fixes

* **install:** Do not create empty backup dirs ([451ceb4](https://github.com/raas-dev/configent/commit/451ceb4e497b5c7dc7ced49df2c99ed688387ae4))
* **install:** Do not dereference symlinks in backups ([c27810a](https://github.com/raas-dev/configent/commit/c27810a6aca377dc457e8a1f429dafde37883f6b))

### [1.70.2](https://github.com/raas-dev/configent/compare/1.70.1...1.70.2) (2023-08-01)


### Fixes

* **install:** Put backed up configs to .backup/ ([290aebf](https://github.com/raas-dev/configent/commit/290aebf86a0902d44a5d8ad74fe05bab4325d0ec))

### [1.70.1](https://github.com/raas-dev/configent/compare/1.70.0...1.70.1) (2023-08-01)


### Fixes

* **install:** Fix backups if target exists ([0862754](https://github.com/raas-dev/configent/commit/0862754378fa31e5443db1bc0f9eed8f7b094675))

## [1.70.0](https://github.com/raas-dev/configent/compare/1.69.0...1.70.0) (2023-07-31)


### Features

* **install:** Backup dotfiles and configs ([1071031](https://github.com/raas-dev/configent/commit/1071031547145c271d12a30988cd05ddd9f205e5))

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
* **README:** Add screenshot ([d002dca](https://github.com/raas-dev/configent/commit/d002dca8221c724ecffe4a5756ea3ce5b79f6b33))


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
