#!/bin/bash
# Sisyphus Silent Auto-Update Hook
# Runs completely in the background to check for and apply updates.
#
# SECURITY: This hook only runs if the user has explicitly enabled
# silent auto-updates in ~/.claude/.sisyphus-config.json
#
# This hook is designed to be called on UserPromptSubmit events
# but runs asynchronously so it doesn't block the user experience.

# Read stdin (JSON input from Claude Code)
INPUT=$(cat)

# Always return immediately to not block the user
# The actual update check happens in the background
(
  # Configuration
  CONFIG_FILE="$HOME/.claude/.sisyphus-config.json"
  VERSION_FILE="$HOME/.claude/.sisyphus-version.json"
  STATE_FILE="$HOME/.claude/.sisyphus-silent-update.json"
  LOG_FILE="$HOME/.claude/.sisyphus-update.log"
  CHECK_INTERVAL_HOURS=24
  REPO_URL="https://raw.githubusercontent.com/Yeachan-Heo/oh-my-claude-sisyphus/main"

  # Log function (silent - only to file)
  log() {
    echo "[$(date -Iseconds)] $1" >>"$LOG_FILE" 2>/dev/null
  }

  # Check if silent auto-update is enabled in configuration
  is_enabled() {
    if [ ! -f "$CONFIG_FILE" ]; then
      # No config file = not explicitly enabled = disabled for security
      return 1
    fi

    # Check silentAutoUpdate setting
    local enabled=""
    if command -v jq &>/dev/null; then
      enabled=$(jq -r '.silentAutoUpdate // false' "$CONFIG_FILE" 2>/dev/null)
    else
      # Fallback: simple grep
      enabled=$(grep -o '"silentAutoUpdate"[[:space:]]*:[[:space:]]*true' "$CONFIG_FILE" 2>/dev/null)
      if [ -n "$enabled" ]; then
        enabled="true"
      else
        enabled="false"
      fi
    fi

    [ "$enabled" = "true" ]
  }

  # Exit early if silent auto-update is disabled
  if ! is_enabled; then
    log "Silent auto-update is disabled (run installer to enable, or use /update)"
    exit 0
  fi

  # Portable function to convert ISO date to epoch (works on Linux and macOS)
  iso_to_epoch() {
    local iso_date="$1"
    local epoch=""

    # Try GNU date first (Linux)
    epoch=$(date -d "$iso_date" +%s 2>/dev/null)
    if [ $? -eq 0 ] && [ -n "$epoch" ]; then
      echo "$epoch"
      return 0
    fi

    # Try BSD/macOS date (need to strip timezone suffix and reformat)
    # ISO format: 2024-01-15T10:30:00+00:00 or 2024-01-15T10:30:00Z
    local clean_date=$(echo "$iso_date" | sed 's/[+-][0-9][0-9]:[0-9][0-9]$//' | sed 's/Z$//' | sed 's/T/ /')
    epoch=$(date -j -f "%Y-%m-%d %H:%M:%S" "$clean_date" +%s 2>/dev/null)
    if [ $? -eq 0 ] && [ -n "$epoch" ]; then
      echo "$epoch"
      return 0
    fi

    # Fallback: return 0 (will trigger update check)
    echo "0"
  }

  # Check if we should check for updates (rate limiting)
  should_check() {
    if [ ! -f "$VERSION_FILE" ]; then
      return 0 # No version file - should check
    fi

    local last_check=""
    if [ -f "$STATE_FILE" ]; then
      last_check=$(cat "$STATE_FILE" 2>/dev/null | grep -o '"lastAttempt"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"\([^"]*\)"$/\1/')
    fi

    if [ -z "$last_check" ]; then
      return 0 # No last check time - should check
    fi

    # Calculate hours since last check (using portable iso_to_epoch)
    local last_check_epoch=$(iso_to_epoch "$last_check")
    local now_epoch=$(date +%s)
    local diff_hours=$(((now_epoch - last_check_epoch) / 3600))

    if [ "$diff_hours" -ge "$CHECK_INTERVAL_HOURS" ]; then
      return 0 # Enough time has passed
    fi

    return 1 # Too soon to check
  }

  # Get current installed version
  get_current_version() {
    if [ -f "$VERSION_FILE" ]; then
      cat "$VERSION_FILE" 2>/dev/null | grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' | sed 's/.*"\([^"]*\)"$/\1/'
    else
      echo ""
    fi
  }

  # Fetch latest version from GitHub
  get_latest_version() {
    local pkg_json
    pkg_json=$(curl -fsSL --connect-timeout 5 --max-time 10 "$REPO_URL/package.json" 2>/dev/null)
    if [ $? -eq 0 ]; then
      echo "$pkg_json" | grep -o '"version"[[:space:]]*:[[:space:]]*"[^"]*"' | head -1 | sed 's/.*"\([^"]*\)"$/\1/'
    else
      echo ""
    fi
  }

  # Compare semantic versions (returns 0 if first < second)
  version_lt() {
    [ "$(printf '%s\n' "$1" "$2" | sort -V | head -n1)" = "$1" ] && [ "$1" != "$2" ]
  }

  # Update state file
  update_state() {
    local now=$(date -Iseconds)
    cat >"$STATE_FILE" <<EOF
{
  "lastAttempt": "$now",
  "lastSuccess": "${1:-}",
  "consecutiveFailures": ${2:-0},
  "pendingRestart": ${3:-false},
  "lastVersion": "${4:-}"
}
EOF
  }

  # Perform silent update
  do_update() {
    log "Downloading install script..."

    local temp_script=$(mktemp)
    if curl -fsSL --connect-timeout 10 --max-time 60 "$REPO_URL/scripts/install.sh" -o "$temp_script" 2>/dev/null; then
      chmod +x "$temp_script"

      log "Running install script..."
      # Run silently, redirect all output to log
      bash "$temp_script" >>"$LOG_FILE" 2>&1
      local result=$?

      rm -f "$temp_script"

      if [ $result -eq 0 ]; then
        log "Update completed successfully"
        return 0
      else
        log "Install script failed with exit code $result"
        return 1
      fi
    else
      log "Failed to download install script"
      rm -f "$temp_script" 2>/dev/null
      return 1
    fi
  }

  # Lock file management for concurrent install protection
  LOCK_FILE="$HOME/.claude/.sisyphus-update.lock"
  LOCK_TIMEOUT=300 # 5 minutes - stale lock threshold

  acquire_lock() {
    # Check if lock exists and is stale
    if [ -f "$LOCK_FILE" ]; then
      local lock_time=$(cat "$LOCK_FILE" 2>/dev/null)
      local now=$(date +%s)
      local lock_age=$((now - lock_time))

      if [ "$lock_age" -lt "$LOCK_TIMEOUT" ]; then
        log "Another update is in progress (lock age: ${lock_age}s)"
        return 1 # Lock is held by another process
      else
        log "Removing stale lock (age: ${lock_age}s)"
        rm -f "$LOCK_FILE"
      fi
    fi

    # Create lock file with current timestamp
    echo "$(date +%s)" >"$LOCK_FILE"
    return 0
  }

  release_lock() {
    rm -f "$LOCK_FILE" 2>/dev/null
  }

  # Main logic
  main() {
    # Check rate limiting
    if ! should_check; then
      exit 0
    fi

    # Acquire lock to prevent concurrent installations
    if ! acquire_lock; then
      exit 0 # Another instance is updating, skip
    fi

    # Ensure lock is released on exit
    trap release_lock EXIT

    log "Starting silent update check..."

    local current_version=$(get_current_version)
    local latest_version=$(get_latest_version)

    if [ -z "$latest_version" ]; then
      log "Failed to fetch latest version"
      update_state "" 1 false ""
      exit 1
    fi

    log "Current: $current_version, Latest: $latest_version"

    if [ -z "$current_version" ] || version_lt "$current_version" "$latest_version"; then
      log "Update available: $current_version -> $latest_version"

      if do_update; then
        local now=$(date -Iseconds)
        update_state "$now" 0 true "$latest_version"
        log "Silent update to $latest_version completed"
      else
        update_state "" 1 false ""
        log "Silent update failed"
      fi
    else
      log "Already up to date ($current_version)"
      update_state "" 0 false ""
    fi
  }

  # Run in background, completely detached
  main
) </dev/null >/dev/null 2>&1 &

# Return success immediately (don't block)
echo '{"continue": true}'
exit 0
