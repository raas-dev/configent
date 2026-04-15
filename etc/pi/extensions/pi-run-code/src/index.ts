// index.ts — Pi Run Code extension entry point.
//
// Adds a `run_code` tool that executes TypeScript code in a sandboxed context.
// Does NOT replace or disable any existing Pi tools.
//
// Features:
// - Execute arbitrary TypeScript with shell access (zx)
// - Auto-install npm packages via .pi/run-code.json config
// - Runs in the same working directory as the Pi agent
// - Type-checked before execution

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { SettingsManager } from "@mariozechner/pi-coding-agent";
import { createRunCodeTool, type RunCodeToolOptions } from "./run-code-tool.js";
import { loadUserPackages, type ResolvedPackage } from "./package-resolver.js";

export default function runCodeExtension(pi: ExtensionAPI) {
  // --- Load user-configured packages ---
  // Reads ~/.pi/agent/run-code.json (global) and .pi/run-code.json (project)
  let userPackages: ResolvedPackage[] = [];
  let userPackageMap: Record<string, unknown> = {};
  try {
    const { packages, warnings } = loadUserPackages(process.cwd());
    userPackages = packages;
    userPackageMap = Object.fromEntries(packages.map(p => [p.varName, p.module]));
    for (const w of warnings) {
      console.warn(`Run Code: ${w}`);
    }
  } catch (e: any) {
    console.warn(`Run Code: Failed to load user packages: ${e.message}`);
  }

  // --- Read shell command prefix from pi settings ---
  let shellPrefix: string | undefined;
  try {
    const settings = SettingsManager.create();
    shellPrefix = settings.getShellCommandPrefix();
  } catch {
    // Settings not available
  }

  // --- Register the run_code tool (does NOT disable other tools) ---
  const toolOptions: RunCodeToolOptions = {
    cwd: process.cwd(),
    shellPrefix,
    userPackages: userPackageMap,
  };

  pi.registerTool(createRunCodeTool(toolOptions));
}
