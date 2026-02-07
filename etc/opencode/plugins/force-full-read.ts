/**
 * ForceFullReadPlugin - OpenCode plugin to force complete file reading
 *
 * Compatible with OpenCode v1.1.3+ and @opencode-ai/plugin v1.1.3+
 *
 * Features:
 * - Blocks the use of offset/limit parameters by the AI agent
 * - Forces (nearly) complete file reading by removing offset
 * - Uses a high and configurable limit (JavaScript slice naturally stops at EOF)
 * - Structured logging for debugging
 * - Configurable via environment variables
 * - Strict mode option (throw error instead of silently removing parameters)
 *
 * Environment variables:
 * - OPENCODE_FORCE_FULL_READ_ACTIVE: Enable/disable the plugin (default: true)
 * - OPENCODE_FORCE_FULL_READ_LIMIT: Forced line limit (default: 100000)
 * - OPENCODE_FORCE_FULL_READ_STRICT: Strict mode = throw error if offset/limit detected (default: false)
 * - OPENCODE_FORCE_FULL_READ_DEBUG: Enable debug logs (default: false)
 *
 * @author OpenCode Plugin Ecosystem
 * @version 1.0.0
 */

import type { Plugin } from "@opencode-ai/plugin";

// ==================== CONFIGURATION ====================

/**
 * Plugin configuration from environment variables
 */
const pluginConfig = {
  // Enable/disable the plugin
  active: process.env.OPENCODE_FORCE_FULL_READ_ACTIVE !== "false", // Default: true

  // Line limit to force (0 or undefined = use default 100000)
  limit: process.env.OPENCODE_FORCE_FULL_READ_LIMIT
    ? parseInt(process.env.OPENCODE_FORCE_FULL_READ_LIMIT, 10)
    : 100_000,

  // Strict mode: throw error instead of silently removing parameters
  strict: process.env.OPENCODE_FORCE_FULL_READ_STRICT === "true",

  // Enable debug logs
  debug: process.env.OPENCODE_FORCE_FULL_READ_DEBUG === "true",
};

// ==================== LOGGING ====================

/**
 * Structured logging function similar to enhanced-notification.js
 *
 * ALL errors are captured silently and are never
 * propagated to the user's TUI. Logs are written only
 * to a local file.
 */
const log = async (
  level: "INFO" | "DEBUG" | "WARN" | "ERROR",
  message: string,
  data?: Record<string, unknown>,
) => {
  try {
    // Only log in debug mode or for errors
    if (!pluginConfig.debug && level !== "ERROR") {
      return;
    }

    const timestamp = new Date().toISOString();
    const dataStr =
      data && Object.keys(data).length > 0 ? ` ${JSON.stringify(data)}` : "";
    const logEntry = `[${timestamp}] [${level}] ForceFullReadPlugin | ${message}${dataStr}`;

    try {
      // Log to a dedicated local file
      const logPath = process.env.HOME
        ? `${process.env.HOME}/.config/opencode/plugin/force-full-read.log`
        : "force-full-read.log";
      // Bun.write is available in the OpenCode environment
      // @ts-ignore - Bun is available in OpenCode runtime
      await Bun.write(logPath, logEntry + "\n", { createPath: true });
    } catch (logError) {
      // SILENT: Ignore ALL logging errors
      // Never propagate to user via TUI
    }
  } catch (error) {
    // SILENT: Ignore even errors in the log function itself
  }
};

// ==================== CONFIG VALIDATION ====================

// Configuration validation (SILENT: no console.warn, only local log)
if (pluginConfig.limit < 0 || isNaN(pluginConfig.limit)) {
  // Log warning only to local log file
  // NO console.warn that would appear in user's TUI
  log(
    "WARN",
    `Invalid OPENCODE_FORCE_FULL_READ_LIMIT (${process.env.OPENCODE_FORCE_FULL_READ_LIMIT}), using default value: 100000`,
  ).catch(() => {
    // Silent: ignore logging errors
  });
  pluginConfig.limit = 100_000;
}

// ==================== PLUGIN LOGIC ====================

export const ForceFullReadPlugin: Plugin = async ({
  project,
  client,
  $,
  directory,
  worktree,
}) => {
  try {
    // Log on startup (silent, if logging error occurs we ignore it)
    await log("INFO", "Plugin initialized", { config: pluginConfig });
  } catch (initError) {
    // SILENT: Ignore even initialization errors
    // The plugin starts anyway, we don't want to block OpenCode
  }

  return {
    /**
     * Hook executed BEFORE tool execution
     *
     * This hook intercepts calls to the "read" tool and:
     * 1. Removes the offset parameter (always forced to 0)
     * 2. Removes the limit parameter and uses our high limit
     *
     * IMPORTANT: ALL errors are captured silently.
     * NEVER throw error to the user's TUI.
     * If an error occurs, it is only logged locally.
     */
    "tool.execute.before": async (input, output) => {
      try {
        // If plugin is disabled, do nothing
        if (!pluginConfig.active) {
          return;
        }

        // Only process calls to "read" tool
        if (input.tool !== "read") {
          return;
        }

        const originalOffset = output.args.offset;
        const originalLimit = output.args.limit;
        const filePath = output.args.filePath || "<unknown>";

        // Log in debug mode only
        await log("DEBUG", "read tool intercepted", {
          filePath,
          originalOffset,
          originalLimit,
          forcedLimit: pluginConfig.limit,
        });

        // Strict mode: LOG warning but still remove params
        // (NEVER throw error - would appear in user's TUI)
        if (pluginConfig.strict) {
          if (originalOffset !== undefined) {
            await log(
              "WARN",
              "STRICT MODE: offset parameter blocked and removed",
              { filePath, originalOffset },
            );
          }
          if (originalLimit !== undefined) {
            await log(
              "WARN",
              "STRICT MODE: limit parameter blocked and replaced",
              { filePath, originalLimit },
            );
          }
        }

        // Silently remove offset/limit
        let forced = false;
        if (originalOffset !== undefined) {
          await log(
            "INFO",
            "offset parameter removed (forced full read from start)",
            {
              filePath,
              removedOffset: originalOffset,
            },
          );
          delete output.args.offset;
          forced = true;
        }

        if (originalLimit !== undefined) {
          await log("INFO", "limit parameter replaced with high limit", {
            filePath,
            removedLimit: originalLimit,
            forcedLimit: pluginConfig.limit,
          });
          delete output.args.limit;
          output.args.limit = pluginConfig.limit;
          forced = true;
        }

        // If agent didn't specify offset/limit, force high limit anyway
        if (!forced) {
          await log("INFO", "No offset/limit specified, forcing high limit", {
            filePath,
            forcedLimit: pluginConfig.limit,
          });
          delete output.args.limit; // Remove to make sure there's no hidden value
          output.args.limit = pluginConfig.limit;
        }

        await log("INFO", "read tool modified successfully", {
          filePath,
          finalOffset: 0,
          finalLimit: output.args.limit,
        });

        // SUCCESS: Silent modifications applied, no error propagated to TUI
      } catch (hookError) {
        // SILENT: ALL hook errors are captured
        // and logged locally only. NEVER propagated to TUI.
        await log("ERROR", "Error in tool.execute.before hook", {
          error:
            hookError instanceof Error ? hookError.message : String(hookError),
          stack: hookError instanceof Error ? hookError.stack : undefined,
        });
        // Don't rethrow error - operation continues silently
      }
    },

    /**
     * Hook after execution to log results (debug only)
     *
     * SILENT: If logging fails, ignore the error.
     */
    "tool.execute.after": async (input, output) => {
      try {
        if (!pluginConfig.active || !pluginConfig.debug) {
          return;
        }

        if (input.tool === "read") {
          await log("DEBUG", "read tool executed", {
            title: output.title,
            outputLength: output.output?.length || 0,
            preview: output.metadata?.preview?.substring(0, 100) || "",
          });
        }
      } catch (hookError) {
        // SILENT: Ignore all logging errors in after hook
        await log("ERROR", "Error in tool.execute.after hook", {
          error:
            hookError instanceof Error ? hookError.message : String(hookError),
        });
      }
    },
  };
};
