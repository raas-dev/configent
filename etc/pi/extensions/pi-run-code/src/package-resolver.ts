import { execSync } from "node:child_process";
import { existsSync, readFileSync, mkdirSync, writeFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

export interface ResolvedPackage {
  specifier: string;
  versionRange: string;
  varName: string;
  module: unknown;
  packageDir: string;
  hasTypes: boolean;
  scope: "global" | "project";
  description: string;
}

export interface PackageSpec {
  version: string;
  as?: string;
  description?: string;
}

export interface RunCodeConfig {
  packages?: Record<string, string | PackageSpec>;
}

export interface LoadResult {
  packages: ResolvedPackage[];
  warnings: string[];
}

function specifierToVarName(specifier: string): string {
  let name = specifier.replace(/^@[^/]+\//, "");
  name = name.split("/")[0];
  name = name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  name = name.replace(/[^a-zA-Z0-9_$]/g, "");
  if (/^[0-9]/.test(name)) name = "_" + name;
  return name;
}

function loadConfig(configPath: string, warnings: string[]): RunCodeConfig | null {
  if (!existsSync(configPath)) return null;
  try {
    const raw = readFileSync(configPath, "utf8");
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed as RunCodeConfig;
  } catch (e: any) {
    warnings.push(`Failed to parse ${configPath}: ${e.message}`);
    return null;
  }
}

function normalizeEntry(
  specifier: string,
  value: string | PackageSpec,
): { version: string; varName: string; description?: string } {
  if (typeof value === "string") {
    return { version: value, varName: specifierToVarName(specifier) };
  }
  return {
    version: value.version,
    varName: value.as ?? specifierToVarName(specifier),
    description: value.description,
  };
}

function findPackageDir(specifier: string, nodeModulesDir: string): string | null {
  const parts = specifier.split("/");
  const pkgDir = parts[0].startsWith("@")
    ? join(nodeModulesDir, parts[0], parts[1])
    : join(nodeModulesDir, parts[0]);
  return existsSync(pkgDir) ? pkgDir : null;
}

function packageHasTypes(specifier: string, pkgDir: string, nodeModulesDir: string): boolean {
  const pkgJsonPath = join(pkgDir, "package.json");
  if (existsSync(pkgJsonPath)) {
    try {
      const pkgJson = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
      if (pkgJson.types || pkgJson.typings) return true;
      if (pkgJson.exports?.["."]?.types) return true;
    } catch {}
  }

  const baseName = specifier.startsWith("@")
    ? specifier.replace("@", "").replace("/", "__")
    : specifier.split("/")[0];
  const typesDir = join(nodeModulesDir, "@types", baseName);
  return existsSync(typesDir);
}

function ensureInstalledAndResolve(
  config: RunCodeConfig,
  installDir: string,
  scope: "global" | "project",
  warnings: string[],
): ResolvedPackage[] {
  const packages = config.packages ?? {};
  const entries = Object.entries(packages);
  if (entries.length === 0) return [];

  const desiredDeps: Record<string, string> = {};
  let optionalTypeDeps: Record<string, string> | undefined;
  const entryMap = new Map<string, { version: string; varName: string; description?: string }>();

  for (const [specifier, value] of entries) {
    const normalized = normalizeEntry(specifier, value);
    desiredDeps[specifier] = normalized.version;
    entryMap.set(specifier, normalized);

    if (!specifier.startsWith(".") && !specifier.startsWith("/")) {
      const baseName = specifier.startsWith("@")
        ? specifier.replace("@", "").replace("/", "__")
        : specifier.split("/")[0];
      if (!optionalTypeDeps) optionalTypeDeps = {};
      optionalTypeDeps["@types/" + baseName] = "*";
    }
  }

  const pkgJsonPath = join(installDir, "package.json");
  let needsInstall = false;

  if (!existsSync(pkgJsonPath)) {
    needsInstall = true;
  } else {
    try {
      const existing = JSON.parse(readFileSync(pkgJsonPath, "utf8"));
      const existingDeps = existing.dependencies ?? {};
      const existingOptDeps = existing.optionalDependencies ?? {};
      const desiredOptDeps = optionalTypeDeps ?? {};

      const existingKeys = Object.keys(existingDeps).sort();
      const desiredKeys = Object.keys(desiredDeps).sort();
      const existingOptKeys = Object.keys(existingOptDeps).sort();
      const desiredOptKeys = Object.keys(desiredOptDeps).sort();

      if (
        existingKeys.length !== desiredKeys.length ||
        existingKeys.some((k, i) => k !== desiredKeys[i]) ||
        existingKeys.some((k) => existingDeps[k] !== desiredDeps[k]) ||
        existingOptKeys.length !== desiredOptKeys.length ||
        existingOptKeys.some((k, i) => k !== desiredOptKeys[i]) ||
        existingOptKeys.some((k) => existingOptDeps[k] !== desiredOptDeps[k])
      ) {
        needsInstall = true;
      }
    } catch {
      needsInstall = true;
    }
  }

  if (needsInstall) {
    try {
      mkdirSync(installDir, { recursive: true });

      const pkgJson: Record<string, unknown> = {
        name: "pi-run-code-user-packages",
        version: "0.0.0",
        private: true,
        dependencies: desiredDeps,
      };
      if (optionalTypeDeps && Object.keys(optionalTypeDeps).length > 0) {
        pkgJson.optionalDependencies = optionalTypeDeps;
      }
      writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + "\n");

      execSync("npm install --no-audit --no-fund", {
        cwd: installDir,
        stdio: "pipe",
        timeout: 60_000,
      });
    } catch (e: any) {
      warnings.push(`Failed to install packages in ${installDir}: ${e.message}`);
      return [];
    }
  }

  const resolved: ResolvedPackage[] = [];
  const nodeModulesDir = join(installDir, "node_modules");

  for (const [specifier, entry] of entryMap) {
    try {
      const resolvedPath = require.resolve(specifier, { paths: [installDir] });
      const mod = require(resolvedPath);

      const pkgDir = findPackageDir(specifier, nodeModulesDir);
      const hasTypes = pkgDir ? packageHasTypes(specifier, pkgDir, nodeModulesDir) : false;

      let description = entry.description;
      if (!description && pkgDir) {
        try {
          const pkgJson = JSON.parse(readFileSync(join(pkgDir, "package.json"), "utf8"));
          description = pkgJson.description;
        } catch {}
      }
      if (!description) description = specifier;

      resolved.push({
        specifier,
        versionRange: entry.version,
        varName: entry.varName,
        module: mod,
        packageDir: pkgDir ?? join(installDir, "node_modules", ...specifier.split("/")),
        hasTypes,
        scope,
        description,
      });
    } catch (e: any) {
      warnings.push(`Failed to resolve package "${specifier}": ${e.message}`);
    }
  }

  return resolved;
}

function ensureGitignore(piDir: string, entryToIgnore: string) {
  const gitignorePath = join(piDir, ".gitignore");
  if (existsSync(gitignorePath)) {
    const content = readFileSync(gitignorePath, "utf8");
    if (content.includes(entryToIgnore)) return;
    appendFileSync(gitignorePath, entryToIgnore + "/\n");
  } else {
    mkdirSync(piDir, { recursive: true });
    writeFileSync(gitignorePath, entryToIgnore + "/\n");
  }
}

export function loadUserPackages(cwd: string): LoadResult {
  const warnings: string[] = [];
  const allPackages = new Map<string, ResolvedPackage>();

  const globalConfigPath = join(homedir(), ".pi", "agent", "pi-run-code.json");
  const globalInstallDir = join(homedir(), ".pi", "agent", "pi-run-code");
  const globalConfig = loadConfig(globalConfigPath, warnings);
  if (globalConfig?.packages && Object.keys(globalConfig.packages).length > 0) {
    ensureGitignore(join(homedir(), ".pi", "agent"), "pi-run-code");
    const resolved = ensureInstalledAndResolve(globalConfig, globalInstallDir, "global", warnings);
    for (const pkg of resolved) {
      allPackages.set(pkg.varName, pkg);
    }
  }

  const projectConfigPath = join(cwd, ".pi", "pi-run-code.json");
  const projectInstallDir = join(cwd, ".pi", "pi-run-code");
  const projectConfig = loadConfig(projectConfigPath, warnings);
  if (projectConfig?.packages && Object.keys(projectConfig.packages).length > 0) {
    ensureGitignore(join(cwd, ".pi"), "pi-run-code");
    const resolved = ensureInstalledAndResolve(projectConfig, projectInstallDir, "project", warnings);
    for (const pkg of resolved) {
      allPackages.set(pkg.varName, pkg);
    }
  }

  return {
    packages: [...allPackages.values()],
    warnings,
  };
}
