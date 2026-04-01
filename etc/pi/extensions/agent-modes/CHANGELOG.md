# Changelog

All notable changes to `@danchamorro/pi-agent-modes` will be documented in
this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project uses [Semantic Versioning](https://semver.org/).

## [1.1.2] - 2026-03-29

### Changed

- Replaced non-null assertions with safer patterns throughout.
- Added explicit types for baseline model/thinking state.
- Used destructuring for cleaner tool-call interception.
- Aligned published package documentation.

## [1.1.1] - 2026-03-28

### Added

- Description field on the mode status card, showing a short summary of
  what each mode does.

## [1.1.0] - 2026-03-24

### Added

- Model and thinking level are now restored to their original values when
  exiting a mode that overrides them.

## [1.0.8] - 2026-03-24

### Changed

- Debug and review modes now default to medium thinking level.

## [1.0.7] - 2026-03-23

### Changed

- Typed the `tool_call` handler return value with `ToolCallEventResult` for
  better type safety.

## [1.0.6] - 2026-03-18

### Fixed

- Sessions now start with no mode active instead of defaulting to a mode,
  avoiding unexpected restrictions on first launch.

## [1.0.5] - 2026-03-18

### Added

- Mode info widget displayed in the TUI, replacing the previous footer
  status indicator.

## [1.0.4] - 2026-03-18

### Fixed

- MCP and extension-registered tools are now included in restricted mode
  tool lists, so tools like jCodeMunch work in all modes.

## [1.0.3] - 2026-03-18

### Added

- "off" option to disable all modes entirely via `/mode off`.

## [1.0.2] - 2026-03-17

### Fixed

- Ask mode now has restricted bash access instead of no bash access.

## [1.0.1] - 2026-03-17

### Fixed

- Each mode prompt now includes the explicit mode name so the model knows
  which mode is active.

### Added

- Setup wizard for configuring per-mode model and thinking overrides.

## [1.0.0] - 2026-03-17

### Added

- Initial release. Five operational modes (code, architect, debug, ask,
  review) with enforced tool restrictions, bash allowlists, editable file
  filters, and per-mode model assignment.
