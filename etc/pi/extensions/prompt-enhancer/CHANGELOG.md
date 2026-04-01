# Changelog

All notable changes to `@danchamorro/pi-prompt-enhancer` will be documented
in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project uses [Semantic Versioning](https://semver.org/).

## [1.0.4] - 2026-03-29

### Fixed

- Fixed documentation inconsistencies across the repo.

## [1.0.3] - 2026-03-29

### Fixed

- Aligned with Pi 0.62.0-0.63.2 API changes: migrated from `getApiKey()`
  to `getApiKeyAndHeaders()`, added `ctx.signal` forwarding for proper
  cancellation support.

## [1.0.2] - 2026-03-26

### Fixed

- Use correct context field for model access and switched to the
  provider-agnostic `completeSimple` API instead of calling provider
  SDKs directly.

## [1.0.1] - 2026-03-11

### Changed

- Added keywords for npm discoverability.

## [1.0.0] - 2026-03-11

### Added

- Initial release. Ctrl+Shift+E shortcut to rewrite editor contents for
  clarity and specificity before sending. Ctrl+Shift+Z to undo and restore
  the original prompt.
