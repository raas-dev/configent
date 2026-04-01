/**
 * Agent Modes - switch between code, architect, debug, ask, and review modes.
 *
 * Each mode controls which tools are visible, what bash commands are allowed,
 * what files can be edited, and injects a short behavioral prompt.
 *
 * Commands:
 *   /agent-mode <name>     Switch to a specific mode
 *   /agent-mode            Show mode selector
 *   /agent-mode setup      Assign models and thinking levels per mode
 *
 * Shortcuts:
 *   Ctrl+M           Cycle through modes
 *
 * CLI flag:
 *   --agent-mode <name>    Start session in a specific mode
 *
 * Config files (merged, project wins):
 *   ~/.pi/agent/agent-modes.json   Global overrides
 *   .pi/agent-modes.json           Project overrides
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import type {
  ExtensionAPI,
  ExtensionContext,
  ToolCallEventResult,
} from "@mariozechner/pi-coding-agent";
import type { Api, Model } from "@mariozechner/pi-ai";
import type { ThinkingLevel } from "@mariozechner/pi-agent-core";
import { DynamicBorder, getAgentDir, isToolCallEventType } from "@mariozechner/pi-coding-agent";
import { Container, Key, type SelectItem, SelectList, Text } from "@mariozechner/pi-tui";
import { loadModes, type ModesConfig } from "./config.ts";
import {
  MODE_NAMES,
  isSafeBash,
  isEditableFile,
  modeHasOverride,
  type ModeDefinition,
  type ModeName,
} from "./modes.ts";

// ---------------------------------------------------------------------------
// Extension
// ---------------------------------------------------------------------------

export default function agentModes(pi: ExtensionAPI) {
  let modes: Record<ModeName, ModeDefinition>;
  let activeMode: ModeName | "off" = "off";

  // Baseline model/thinking state -- captured before entering a mode with
  // model or thinking overrides. Restored when switching to a non-overriding
  // mode or turning off.
  let baseline: { model: Model<Api> | undefined; thinkingLevel: ThinkingLevel } | null = null;

  // ------------------------------------------------------------------
  // CLI flag
  // ------------------------------------------------------------------

  pi.registerFlag("agent-mode", {
    description: "Start in a specific agent mode (code, architect, debug, ask, review)",
    type: "string",
  });

  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------

  function getMode(): ModeDefinition | undefined {
    if (activeMode === "off") return undefined;
    return modes[activeMode];
  }

  // Built-in tool names -- these are the only ones modes restrict
  const BUILTIN_TOOLS = new Set(["read", "bash", "edit", "write", "grep", "find", "ls"]);

  function resolveTools(mode: ModeDefinition): string[] {
    const allTools = pi.getAllTools().map((t) => t.name);
    if (mode.tools === "all") {
      return allTools;
    }
    // Start with the mode's explicit tool list (filtered to existing)
    const allNames = new Set(allTools);
    const result = new Set(mode.tools.filter((t) => allNames.has(t)));
    // Include all extension/MCP tools -- mode restrictions only apply
    // to built-in tools, not third-party information-gathering tools
    for (const tool of allTools) {
      if (!BUILTIN_TOOLS.has(tool)) {
        result.add(tool);
      }
    }
    return [...result];
  }

  async function restoreBaseline(ctx: ExtensionContext): Promise<void> {
    if (!baseline) return;
    const saved = baseline;
    baseline = null;

    if (saved.model) {
      const ok = await pi.setModel(saved.model);
      if (!ok) {
        ctx.ui.notify("Could not restore previous model (no API key)", "warning");
      }
    }
    pi.setThinkingLevel(saved.thinkingLevel);
  }

  async function turnOff(ctx: ExtensionContext): Promise<void> {
    await restoreBaseline(ctx);
    activeMode = "off";
    pi.setActiveTools(pi.getAllTools().map((t) => t.name));
    updateStatus(ctx);
  }

  async function applyMode(
    name: ModeName,
    ctx: ExtensionContext,
    options?: { saveBaseline?: boolean },
  ): Promise<void> {
    const mode = modes[name];
    const shouldSave = options?.saveBaseline !== false;

    // Handle baseline save/restore for model/thinking overrides
    if (shouldSave) {
      if (modeHasOverride(mode)) {
        // Entering an overriding mode -- save baseline if not already saved
        if (!baseline) {
          baseline = {
            model: ctx.model,
            thinkingLevel: pi.getThinkingLevel(),
          };
        }
      } else {
        // Entering a non-overriding mode -- restore baseline if saved
        await restoreBaseline(ctx);
      }
    }

    activeMode = name;

    // Set active tools
    pi.setActiveTools(resolveTools(mode));

    // Apply model if configured
    if (mode.provider && mode.model) {
      const model = ctx.modelRegistry.find(mode.provider, mode.model);
      if (model) {
        const ok = await pi.setModel(model);
        if (!ok) {
          ctx.ui.notify(
            `Mode "${mode.name}": no API key for ${mode.provider}/${mode.model}`,
            "warning",
          );
        }
      } else {
        ctx.ui.notify(
          `Mode "${mode.name}": model ${mode.provider}/${mode.model} not found`,
          "warning",
        );
      }
    }

    // Apply thinking level if configured
    if (mode.thinkingLevel) {
      pi.setThinkingLevel(mode.thinkingLevel);
    }

    updateStatus(ctx);
  }

  function updateStatus(ctx: ExtensionContext) {
    if (activeMode === "off") {
      ctx.ui.setWidget("agent-mode-card", undefined);
    } else {
      updateModeCard(ctx, modes[activeMode as ModeName]);
    }
  }

  function updateModeCard(ctx: ExtensionContext, mode: ModeDefinition) {
    const t = ctx.ui.theme;
    const lines: string[] = [];

    // Header
    lines.push(t.fg("accent", t.bold(mode.name.toUpperCase())) + t.fg("dim", " mode"));

    // Description
    lines.push(t.fg("dim", mode.description));

    // Restrictions summary
    const parts: string[] = [];

    if (mode.bash === "all") {
      parts.push(t.fg("muted", "bash:") + t.fg("success", "all"));
    } else if (mode.bash === "none") {
      parts.push(t.fg("muted", "bash:") + t.fg("warning", "off"));
    } else {
      parts.push(t.fg("muted", "bash:") + t.fg("warning", "read-only"));
    }

    if (mode.editableExtensions) {
      parts.push(t.fg("muted", "edit:") + t.fg("warning", mode.editableExtensions.join(" ")));
    } else if (mode.tools !== "all" && Array.isArray(mode.tools) && !mode.tools.includes("edit")) {
      parts.push(t.fg("muted", "edit:") + t.fg("error", "off"));
    } else {
      parts.push(t.fg("muted", "edit:") + t.fg("success", "all"));
    }

    if (mode.provider && mode.model) {
      parts.push(t.fg("muted", "model:") + `${mode.provider}/${mode.model}`);
    }

    if (mode.thinkingLevel) {
      parts.push(t.fg("muted", "think:") + mode.thinkingLevel);
    }

    lines.push(parts.join(t.fg("dim", " | ")));

    ctx.ui.setWidget("agent-mode-card", lines);
  }

  // ------------------------------------------------------------------
  // Mode selector UI
  // ------------------------------------------------------------------

  async function showModeSelector(ctx: ExtensionContext): Promise<void> {
    const items: SelectItem[] = [
      ...MODE_NAMES.map((name) => {
        const mode = modes[name];
        const isActive = name === activeMode;
        const toolSummary = mode.tools === "all" ? "all tools" : mode.tools.join(", ");
        return {
          value: name,
          label: isActive ? `${mode.name} (active)` : mode.name,
          description: toolSummary,
        };
      }),
      {
        value: "off",
        label: activeMode === "off" ? "Off (active)" : "Off",
        description: "Disable agent modes, restore default PI behavior",
      },
    ];

    const result = await ctx.ui.custom<string | null>((tui, theme, _kb, done) => {
      const container = new Container();
      container.addChild(new DynamicBorder((str) => theme.fg("accent", str)));
      container.addChild(new Text(theme.fg("accent", theme.bold("Select Agent Mode"))));

      const selectList = new SelectList(items, Math.min(items.length, 10), {
        selectedPrefix: (text) => theme.fg("accent", text),
        selectedText: (text) => theme.fg("accent", text),
        description: (text) => theme.fg("muted", text),
        scrollInfo: (text) => theme.fg("dim", text),
        noMatch: (text) => theme.fg("warning", text),
      });

      selectList.onSelect = (item) => done(item.value);
      selectList.onCancel = () => done(null);
      container.addChild(selectList);

      container.addChild(new Text(theme.fg("dim", "up/down navigate | enter select | esc cancel")));
      container.addChild(new DynamicBorder((str) => theme.fg("accent", str)));

      return {
        render(width: number) {
          return container.render(width);
        },
        invalidate() {
          container.invalidate();
        },
        handleInput(data: string) {
          selectList.handleInput(data);
          tui.requestRender();
        },
      };
    });

    if (!result) return;

    if (result === "off") {
      await turnOff(ctx);
      ctx.ui.notify("Agent modes disabled", "info");
      persistState();
      return;
    }

    const name = result as ModeName;
    await applyMode(name, ctx);
    ctx.ui.notify(`Switched to ${modes[name].name} mode`, "info");
    persistState();
  }

  // ------------------------------------------------------------------
  // Cycling
  // ------------------------------------------------------------------

  async function cycleMode(ctx: ExtensionContext): Promise<void> {
    const cycle: (ModeName | "off")[] = [...MODE_NAMES, "off"];
    const currentIdx = cycle.indexOf(activeMode);
    const nextIdx = (currentIdx + 1) % cycle.length;
    const next = cycle[nextIdx];

    if (next === "off") {
      await turnOff(ctx);
      ctx.ui.notify("Agent modes disabled", "info");
    } else {
      await applyMode(next, ctx);
      ctx.ui.notify(`Switched to ${modes[next].name} mode`, "info");
    }
    persistState();
  }

  // ------------------------------------------------------------------
  // State persistence
  // ------------------------------------------------------------------

  function persistState() {
    pi.appendEntry("agent-mode-state", { mode: activeMode });
  }

  // ------------------------------------------------------------------
  // Setup wizard
  // ------------------------------------------------------------------

  const NO_OVERRIDE_MODEL = "No override (use session model)";
  const NO_OVERRIDE_THINKING = "No override (use session level)";
  const THINKING_LEVELS = ["off", "minimal", "low", "medium", "high", "xhigh"] as const;

  async function runSetup(ctx: ExtensionContext): Promise<void> {
    const available = ctx.modelRegistry.getAvailable();
    if (available.length === 0) {
      ctx.ui.notify("No models available. Configure API keys first.", "error");
      return;
    }

    // Build model options: "Name (provider/id)"
    const modelOptions = [
      NO_OVERRIDE_MODEL,
      ...available.map((m) => `${m.name ?? m.id} (${m.provider}/${m.id})`),
    ];

    const thinkingOptions = [NO_OVERRIDE_THINKING, ...THINKING_LEVELS];
    const config: ModesConfig = {};

    for (const name of MODE_NAMES) {
      const mode = modes[name];

      // Current assignment (if any)
      const current =
        mode.provider && mode.model
          ? `Current: ${mode.provider}/${mode.model}`
          : "Current: session default";

      const modelChoice = await ctx.ui.select(
        `${mode.name} mode -- select model (${current}):`,
        modelOptions,
      );

      if (modelChoice === undefined) {
        ctx.ui.notify("Setup cancelled", "info");
        return;
      }

      if (modelChoice !== NO_OVERRIDE_MODEL) {
        // Parse "Name (provider/id)" -> provider, id
        const match = modelChoice.match(/\(([^/]+)\/(.+)\)$/);
        if (match) {
          const entry = config[name] ?? (config[name] = {});
          entry.provider = match[1];
          entry.model = match[2];
        }
      }

      const currentThinking = mode.thinkingLevel
        ? `Current: ${mode.thinkingLevel}`
        : "Current: session default";

      const thinkingChoice = await ctx.ui.select(
        `${mode.name} mode -- select thinking level (${currentThinking}):`,
        thinkingOptions,
      );

      if (thinkingChoice === undefined) {
        ctx.ui.notify("Setup cancelled", "info");
        return;
      }

      if (thinkingChoice !== NO_OVERRIDE_THINKING) {
        const entry = config[name] ?? (config[name] = {});
        entry.thinkingLevel = thinkingChoice as (typeof THINKING_LEVELS)[number];
      }
    }

    // Load existing config and merge
    const configPath = join(getAgentDir(), "agent-modes.json");
    let existing: ModesConfig = {};
    if (existsSync(configPath)) {
      try {
        existing = JSON.parse(readFileSync(configPath, "utf-8"));
      } catch {
        // Ignore malformed JSON
      }
    }

    for (const name of MODE_NAMES) {
      if (config[name]) {
        existing[name] = { ...existing[name], ...config[name] };
      } else if (existing[name]) {
        // "No override" selected -- clear model/thinking assignments
        const entry = existing[name];
        delete entry.provider;
        delete entry.model;
        delete entry.thinkingLevel;
        if (Object.keys(entry).length === 0) {
          delete existing[name];
        }
      }
    }

    // Save
    const dir = dirname(configPath);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(configPath, JSON.stringify(existing, null, 2) + "\n");

    // Reload
    modes = loadModes(ctx.cwd);

    // Summary
    const summary = MODE_NAMES.map((name) => {
      const m = modes[name];
      const model = m.provider && m.model ? `${m.provider}/${m.model}` : "session default";
      const thinking = m.thinkingLevel ?? "session default";
      return `  ${m.name}: ${model} (thinking: ${thinking})`;
    }).join("\n");

    ctx.ui.notify(`Setup saved to ~/.pi/agent/agent-modes.json\n\n${summary}`, "info");
  }

  // ------------------------------------------------------------------
  // Command: /agent-mode [name|setup]
  // ------------------------------------------------------------------

  pi.registerCommand("agent-mode", {
    description: "Switch agent mode (code, architect, debug, ask, review) or run setup",
    getArgumentCompletions: (prefix: string) => {
      const items = [
        ...MODE_NAMES.map((name) => ({
          value: name,
          label: modes[name].name,
        })),
        { value: "off", label: "Off" },
        { value: "setup", label: "Setup" },
      ];
      const filtered = items.filter((i) => i.value.startsWith(prefix));
      return filtered.length > 0 ? filtered : null;
    },
    handler: async (args, ctx) => {
      const arg = args?.trim().toLowerCase();

      if (arg === "setup") {
        await runSetup(ctx);
        return;
      }

      if (arg === "off") {
        await turnOff(ctx);
        ctx.ui.notify("Agent modes disabled", "info");
        persistState();
        return;
      }

      if (arg) {
        const name = arg as ModeName;
        if (!MODE_NAMES.includes(name)) {
          ctx.ui.notify(
            `Unknown mode "${args.trim()}". Available: ${MODE_NAMES.join(", ")}, off, setup`,
            "error",
          );
          return;
        }
        await applyMode(name, ctx);
        ctx.ui.notify(`Switched to ${modes[name].name} mode`, "info");
        persistState();
        return;
      }
      await showModeSelector(ctx);
    },
  });

  // ------------------------------------------------------------------
  // Shortcut: Ctr+M to cycle modes
  // ------------------------------------------------------------------

  pi.registerShortcut(Key.ctrl("m"), {
    description: "Cycle agent modes",
    handler: async (ctx) => {
      await cycleMode(ctx);
    },
  });

  // ------------------------------------------------------------------
  // Event: Inject mode prompt into system prompt
  // ------------------------------------------------------------------

  pi.on("before_agent_start", async (event) => {
    const mode = getMode();
    if (!mode || !mode.prompt) return;

    return {
      systemPrompt: `${event.systemPrompt}\n\n${mode.prompt}`,
    };
  });

  // ------------------------------------------------------------------
  // Event: Enforce bash and file restrictions
  // ------------------------------------------------------------------

  pi.on("tool_call", async (event): Promise<ToolCallEventResult | undefined> => {
    const mode = getMode();
    if (!mode) return;

    // Bash restrictions
    if (isToolCallEventType("bash", event)) {
      if (mode.bash === "none") {
        return {
          block: true,
          reason: `${mode.name} mode does not allow bash commands. Switch to code mode first.`,
        };
      }
      if (mode.bash === "restricted") {
        const {command} = event.input;
        if (!isSafeBash(command, activeMode as ModeName)) {
          return {
            block: true,
            reason: `${mode.name} mode: command blocked (not in allowlist). Switch to code mode for full access.\nCommand: ${command}`,
          };
        }
      }
    }

    // File edit restrictions
    if (isToolCallEventType("edit", event) && mode.editableExtensions) {
      const {path} = event.input;
      if (!isEditableFile(path, mode)) {
        return {
          block: true,
          reason: `${mode.name} mode: can only edit ${mode.editableExtensions.join(", ")} files. Switch to code mode for full access.\nPath: ${path}`,
        };
      }
    }

    // File write restrictions
    if (isToolCallEventType("write", event) && mode.editableExtensions) {
      const {path} = event.input;
      if (!isEditableFile(path, mode)) {
        return {
          block: true,
          reason: `${mode.name} mode: can only write ${mode.editableExtensions.join(", ")} files. Switch to code mode for full access.\nPath: ${path}`,
        };
      }
    }
  });

  // ------------------------------------------------------------------
  // Event: Session start - load config and restore state
  // ------------------------------------------------------------------

  pi.on("session_start", async (_event, ctx) => {
    // Load mode definitions
    modes = loadModes(ctx.cwd);

    // Check CLI flag first
    const flagValue = pi.getFlag("agent-mode");
    if (typeof flagValue === "string" && flagValue) {
      const name = flagValue.toLowerCase() as ModeName;
      if (MODE_NAMES.includes(name)) {
        await applyMode(name, ctx);
        ctx.ui.notify(`Started in ${modes[name].name} mode`, "info");
        return;
      }
      ctx.ui.notify(`Unknown mode "${flagValue}". Available: ${MODE_NAMES.join(", ")}`, "warning");
    }

    // Restore persisted state
    const entries = ctx.sessionManager.getEntries();
    const stateEntry = entries
      .filter(
        (e: { type: string; customType?: string }) =>
          e.type === "custom" && e.customType === "agent-mode-state",
      )
      .pop() as { data?: { mode: ModeName | "off" } } | undefined;

    if (stateEntry?.data?.mode === "off") {
      await turnOff(ctx);
    } else if (stateEntry?.data?.mode && MODE_NAMES.includes(stateEntry.data.mode)) {
      await applyMode(stateEntry.data.mode, ctx, { saveBaseline: false });
    } else {
      updateStatus(ctx);
    }
  });
}
