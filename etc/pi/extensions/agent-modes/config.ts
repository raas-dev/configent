/**
 * Configuration loading for agent modes.
 *
 * Merge order: built-in defaults <- global overrides <- project overrides.
 * Config files only override fields that are explicitly set.
 */

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getAgentDir } from "@mariozechner/pi-coding-agent";
import { BUILTIN_MODES, MODE_NAMES, type ModeDefinition, type ModeName } from "./modes.ts";

// ---------------------------------------------------------------------------
// Config file shape
// ---------------------------------------------------------------------------

export interface ModeOverride {
  /** Override which tools are active */
  tools?: string[] | "all";
  /** Override bash access */
  bash?: "all" | "none" | "restricted";
  /** Override editable file extensions */
  editableExtensions?: string[];
  /** Override system prompt addition */
  prompt?: string;
  /** Model provider (e.g. "anthropic", "openai") */
  provider?: string;
  /** Model ID (e.g. "claude-sonnet-4-5") */
  model?: string;
  /** Thinking level */
  thinkingLevel?: "off" | "minimal" | "low" | "medium" | "high" | "xhigh";
}

export type ModesConfig = Partial<Record<ModeName, ModeOverride>>;

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

function loadJsonFile(path: string): ModesConfig {
  if (!existsSync(path)) return {};
  try {
    return JSON.parse(readFileSync(path, "utf-8")) as ModesConfig;
  } catch (err) {
    console.error(`[agent-modes] Failed to load ${path}: ${err}`);
    return {};
  }
}

function applyOverride(base: ModeDefinition, override: ModeOverride): ModeDefinition {
  return {
    ...base,
    ...(override.tools !== undefined && { tools: override.tools }),
    ...(override.bash !== undefined && { bash: override.bash }),
    ...(override.editableExtensions !== undefined && {
      editableExtensions: override.editableExtensions,
    }),
    ...(override.prompt !== undefined && { prompt: override.prompt }),
    ...(override.provider !== undefined && { provider: override.provider }),
    ...(override.model !== undefined && { model: override.model }),
    ...(override.thinkingLevel !== undefined && { thinkingLevel: override.thinkingLevel }),
  };
}

/**
 * Load and merge mode definitions from built-in defaults, global config,
 * and project config.
 *
 * Global: ~/.pi/agent/agent-modes.json
 * Project: <cwd>/.pi/agent-modes.json
 */
export function loadModes(cwd: string): Record<ModeName, ModeDefinition> {
  const globalPath = join(getAgentDir(), "agent-modes.json");
  const projectPath = join(cwd, ".pi", "agent-modes.json");

  const globalOverrides = loadJsonFile(globalPath);
  const projectOverrides = loadJsonFile(projectPath);

  const result = {} as Record<ModeName, ModeDefinition>;

  for (const name of MODE_NAMES) {
    let mode = { ...BUILTIN_MODES[name] };

    const globalOvr = globalOverrides[name];
    if (globalOvr) {
      mode = applyOverride(mode, globalOvr);
    }

    const projectOvr = projectOverrides[name];
    if (projectOvr) {
      mode = applyOverride(mode, projectOvr);
    }

    result[name] = mode;
  }

  return result;
}
