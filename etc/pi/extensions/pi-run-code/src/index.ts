// index.ts — Pi Run Code extension entry point.
//
// Adds a `run_code` tool that executes TypeScript code via esbuild + AsyncFunction.
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

  let shellPrefix: string | undefined;
  try {
    const settings = SettingsManager.create();
    shellPrefix = settings.getShellCommandPrefix();
  } catch {}

  const packageDescriptions = userPackages.map(p =>
    `- ${p.varName} (${p.specifier}@${p.versionRange}): ${p.description}`
  ).join("\n");

  const toolOptions: RunCodeToolOptions = {
    cwd: process.cwd(),
    shellPrefix,
    userPackages: userPackageMap,
    packageDescriptions,
  };

  pi.registerTool(createRunCodeTool(toolOptions));
}
