// package-resolver.ts — Resolve npm packages from .pi/run-code.json config files.
//
// Reads both global (~/.pi/agent/run-code.json) and project-local (.pi/run-code.json)
// configs, merges them, installs missing packages, and returns resolved modules.

import { existsSync, readFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { execSync } from "node:child_process";

export interface ResolvedPackage {
  /** npm package name (e.g. "yaml") */
  name: string;
  /** Version specifier (e.g. "^2.8.0") */
  version: string;
  /** Global variable name in sandbox (e.g. "YAML") */
  varName: string;
  /** The resolved module (loaded via require) */
  module: unknown;
}

export interface PackageConfig {
  packages: Record<string, { version: string; as: string }>;
}

export interface LoadResult {
  packages: ResolvedPackage[];
  warnings: string[];
}

const GLOBAL_CONFIG_PATH = join(
  process.env.HOME || "/tmp",
  ".pi",
  "agent",
  "run-code.json",
);

/**
 * Read and parse a run-code.json config file.
 * Returns undefined if file doesn't exist or is invalid.
 */
function readConfig(filePath: string): PackageConfig | undefined {
  if (!existsSync(filePath)) return undefined;
  try {
    const raw = readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.packages) return undefined;
    return parsed as PackageConfig;
  } catch {
    return undefined;
  }
}

/**
 * Merge global and project-local configs.
 * Project-local takes precedence on conflicts.
 */
function mergeConfigs(
  global: PackageConfig | undefined,
  local: PackageConfig | undefined,
): Record<string, { version: string; as: string }> {
  const merged: Record<string, { version: string; as: string }> = {};
  if (global) {
    for (const [name, cfg] of Object.entries(global.packages)) {
      merged[name] = cfg;
    }
  }
  if (local) {
    for (const [name, cfg] of Object.entries(local.packages)) {
      merged[name] = cfg;
    }
  }
  return merged;
}

/**
 * Ensure a package is installed in the sandbox node_modules directory.
 * Uses a dedicated directory to avoid polluting the project's node_modules.
 */
function ensureInstalled(
  pkgName: string,
  version: string,
  installDir: string,
): string {
  mkdirSync(installDir, { recursive: true });

  const pkgDir = join(installDir, "node_modules", ...pkgName.split("/"));
  if (existsSync(pkgDir)) return pkgDir;

  const spec = `${pkgName}@${version}`;
  try {
    execSync(`npm install --prefix "${installDir}" "${spec}" --no-save --no-package-lock`, {
      stdio: "pipe",
      timeout: 60000,
    });
  } catch (e: any) {
    throw new Error(`Failed to install ${spec}: ${e.message}`);
  }

  return pkgDir;
}

/**
 * Load user-configured packages from global and project configs.
 *
 * @param cwd - Current working directory (for resolving .pi/run-code.json)
 * @returns Resolved packages and any warnings
 */
export function loadUserPackages(cwd: string): LoadResult {
  const packages: ResolvedPackage[] = [];
  const warnings: string[] = [];

  const globalConfig = readConfig(GLOBAL_CONFIG_PATH);
  const localConfigPath = join(cwd, ".pi", "run-code.json");
  const localConfig = readConfig(localConfigPath);

  if (!globalConfig && !localConfig) {
    return { packages, warnings };
  }

  const merged = mergeConfigs(globalConfig, localConfig);

  const installDir = join(cwd, ".pi", ".run-code-modules");

  for (const [pkgName, cfg] of Object.entries(merged)) {
    try {
      ensureInstalled(pkgName, cfg.version, installDir);

      const modulePath = resolve(installDir, "node_modules", ...pkgName.split("/"));
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const mod = require(modulePath);

      packages.push({
        name: pkgName,
        version: cfg.version,
        varName: cfg.as,
        module: mod,
      });
    } catch (e: any) {
      warnings.push(`Failed to load package "${pkgName}": ${e.message}`);
    }
  }

  return { packages, warnings };
}
