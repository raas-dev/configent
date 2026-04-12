/**
 * pi-install — OMP Extension
 *
 * Installs Pi plugins (extensions + skills) from GitHub into OMP.
 *
 * Pi extensions can't run in OMP as-is because OMP is a compiled Bun binary —
 * the @oh-my-pi/* and @sinclair/* packages don't exist on disk. This extension
 * solves that by:
 *
 *   1. Bundling multi-file extensions into a single file (via Bun.build)
 *   2. Rewriting pi package imports to use OMP's injected runtime objects
 *      (pi.pi for coding-agent/ai/tui exports, pi.typebox for typebox)
 *   3. Relocating module-scope code that depends on pi symbols into the
 *      factory function body
 *   4. Installing third-party npm dependencies
 *
 * Commands:
 *   /pi-install <user/repo | github-url>  — install a Pi plugin
 *   /pi-uninstall [name]                  — remove an installed plugin
 *   /pi-list                              — list installed Pi plugins
 *   /pi-update [name]                     — re-install from source
 */

import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const OMP_AGENT_DIR = path.join(os.homedir(), ".omp", "agent");
const EXTENSIONS_DIR = path.join(OMP_AGENT_DIR, "extensions");
const SKILLS_DIR = path.join(OMP_AGENT_DIR, "skills");
const REGISTRY_PATH = path.join(OMP_AGENT_DIR, "pi-plugins.json");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface InstalledPlugin {
	name: string;
	source: string;
	extensions: string[];
	skills: string[];
	installedAt: string;
}

interface PluginRegistry {
	plugins: Record<string, InstalledPlugin>;
}

interface PiManifest {
	extensions?: string[];
	skills?: string[];
}

type ExecFn = (
	cmd: string,
	args: string[],
	opts?: { timeout?: number; cwd?: string },
) => Promise<{ code: number; stdout: string; stderr: string }>;

type NotifyFn = (msg: string, level: "info" | "error" | "warning") => void;

// ---------------------------------------------------------------------------
// Bundling — flatten multi-file extensions into a single file via Bun.build
// ---------------------------------------------------------------------------

/** Check if a file has relative imports (indicating multi-file extension). */
function hasRelativeImports(filePath: string): boolean {
	const code = fs.readFileSync(filePath, "utf-8");
	// Match import/export from "./..." or "../..."
	return /(?:import|export)\s+.*from\s+["']\.\.?\//.test(code)
		|| /require\s*\(\s*["']\.\.?\//.test(code);
}

/**
 * Bundle a multi-file extension into a single output file using Bun.build.
 *
 * - Inlines all relative imports (./foo, ../bar)
 * - Externalizes everything else (npm packages, node builtins, pi packages)
 * - Returns the bundled code as a string, or null on failure
 */
async function bundleExtension(
	entryFile: string,
	notify: NotifyFn,
): Promise<string | null> {
	const Bun = (globalThis as any).Bun;
	if (typeof Bun?.build !== "function") {
		notify("Bun.build not available — cannot bundle multi-file extensions.", "error");
		return null;
	}

	try {
		const result = await Bun.build({
			entrypoints: [entryFile],
			target: "bun",
			format: "esm",
			// Externalize ALL bare specifiers: npm packages, node builtins, pi packages.
			// Only relative imports (./foo, ../bar) get bundled.
			packages: "external",
		});

		if (!result.success) {
			const logs = result.logs.map((l: any) => String(l.message ?? l)).join("\n");
			notify(`Bundle failed:\n${logs}`, "error");
			return null;
		}

		return await result.outputs[0].text();
	} catch (e: any) {
		notify(`Bundle error: ${e.message}`, "error");
		return null;
	}
}

// ---------------------------------------------------------------------------
// Import rewriting — the core transformation
//
// OMP's compiled binary injects pi packages via:
//   pi.pi      — exports from pi-coding-agent + pi-ai + pi-tui + pi-agent-core
//   pi.typebox — exports from @sinclair/typebox
//
// Symbols NOT on pi.pi (pi-tui): truncateToWidth, matchesKey, visibleWidth
//   → injected as polyfill functions
//
// Strategy after bundling:
//   1. Remap @mariozechner/* scopes → @oh-my-pi/*
//   2. Collect and remove runtime imports from pi scopes and typebox
//   3. Relocate ALL module-scope code that isn't a type or an import
//      into the factory function body
//   4. Inject pi.pi/pi.typebox destructuring + polyfills at factory top
// ---------------------------------------------------------------------------

/** Symbols that live on pi.typebox, even when re-exported by pi-ai. */
const TYPEBOX_SYMBOLS = new Set([
	"Type", "Kind", "TypeGuard", "TypeRegistry", "TypeBoxError",
	"TypeClone", "TypeCompiler", "Value", "ValueGuard",
]);

/** pi-tui functions NOT on pi.pi — need polyfills. */
const POLYFILL_NAMES = new Set(["truncateToWidth", "matchesKey", "visibleWidth"]);

const TUI_POLYFILLS = `
// --- pi-install: polyfills for pi-tui functions not on pi.pi ---
function truncateToWidth(text, maxWidth) {
	const strip = (s) => s.replace(/\\x1b\\[[0-9;]*m/g, "");
	if (strip(text).length <= maxWidth) return text;
	let visible = 0, i = 0;
	while (i < text.length && visible < maxWidth - 1) {
		if (text[i] === "\\x1b" && text[i+1] === "[") {
			const end = text.indexOf("m", i);
			if (end !== -1) { i = end + 1; continue; }
		}
		visible++; i++;
	}
	return text.slice(0, i) + "\u2026";
}
function matchesKey(data, key) {
	const MAP = {
		"escape": "\\x1b", "up": "\\x1b[A", "down": "\\x1b[B",
		"right": "\\x1b[C", "left": "\\x1b[D",
		"pageUp": "\\x1b[5~", "pageDown": "\\x1b[6~",
	};
	return data === (MAP[key] ?? key);
}
function visibleWidth(text) {
	return text.replace(/\\x1b\\[[0-9;]*m/g, "").length;
}
// --- end polyfills ---
`.trim();

/** Scopes that get remapped from Pi upstream to OMP. */
const SCOPE_REMAP: [string, string][] = [
	["@mariozechner/pi-coding-agent", "@oh-my-pi/pi-coding-agent"],
	["@mariozechner/pi-agent-core", "@oh-my-pi/pi-agent-core"],
	["@mariozechner/pi-ai", "@oh-my-pi/pi-ai"],
	["@mariozechner/pi-tui", "@oh-my-pi/pi-tui"],
	["@mariozechner/pi-utils", "@oh-my-pi/pi-utils"],
];

function isPiOrTypeboxPkg(pkg: string): boolean {
	return /^@oh-my-pi\//.test(pkg) || pkg === "@sinclair/typebox";
}

/**
 * Rewrite a Pi extension file so it runs in OMP's compiled runtime.
 *
 * This is the main transformation. It handles:
 * - Raw source files (export default function name(pi) { ... })
 * - Bundled output (function name(pi) { ... } export { name as default })
 * - Named imports, namespace imports, type-only imports
 * - Module-scope declarations (const, let, var, class, function)
 * - Class extends imported types
 */
function rewriteExtensionFile(filePath: string): boolean {
	let code = fs.readFileSync(filePath, "utf-8");
	const original = code;

	// ── Step 1: Remap @mariozechner → @oh-my-pi ────────────────────────
	for (const [from, to] of SCOPE_REMAP) {
		code = code.replaceAll(from, to);
	}

	// ── Step 2: Collect and remove runtime imports ─────────────────────
	// Handles both single-line and multi-line import { A, B } from "..."
	// Uses [\s\S]*? to cross newlines in bundled output (Bun splits long imports)
	const namedImportRe = /import\s+\{([\s\S]*?)\}\s+from\s+["']([^"']+)["'];?/g;
	// Namespace: import * as X from "..."
	const nsRe = /^import\s+\*\s+as\s+(\w+)\s+from\s+["']([^"']+)["'];?\s*$/gm;

	const piPiSet = new Set<string>();
	const typeboxSet = new Set<string>();
	const nsBindings: { name: string; target: "pi" | "typebox" }[] = [];
	let needsPolyfills = false;

	const classifyImport = (imports: string, pkg: string) => {
		const names = imports.split(",").map((s: string) => s.trim()).filter(Boolean);
		for (const n of names) {
			// Skip type-only imports ("type Foo")
			if (n.startsWith("type ")) continue;
			if (pkg === "@sinclair/typebox" || TYPEBOX_SYMBOLS.has(n)) {
				typeboxSet.add(n);
			} else if (POLYFILL_NAMES.has(n)) {
				needsPolyfills = true;
			} else {
				piPiSet.add(n);
			}
		}
	};

	code = code.replace(namedImportRe, (_m, imports: string, pkg: string) => {
		if (!isPiOrTypeboxPkg(pkg)) return _m;
		classifyImport(imports, pkg);
		return "// [pi-install] removed: " + _m.trim().replace(/\n/g, " ");
	});

	code = code.replace(nsRe, (_m, name: string, pkg: string) => {
		if (!isPiOrTypeboxPkg(pkg)) return _m; // not a pi package — keep
		nsBindings.push({
			name,
			target: pkg === "@sinclair/typebox" ? "typebox" : "pi",
		});
		return "// [pi-install] removed: " + _m.trim();
	});

	if (code === original) return false; // nothing changed

	// ── Step 3: Identify the factory function ──────────────────────────
	// Two patterns:
	//   A) export default function name(pi: ExtensionAPI) { ... }
	//   B) function name(pi) { ... }  export { name as default };  (bundled)
	const factoryInlineRe = /(export\s+default\s+function\s+\w*\s*\([^)]*\)\s*\{)/;
	// Matches both single-line and multi-line: export {\n  name as default\n};
	const factoryExportRe = /export\s*\{\s*(\w+)\s+as\s+default\s*\}\s*;?/s;

	let factoryOpener: string | null = null;
	let factoryName: string | null = null;

	const inlineMatch = code.match(factoryInlineRe);
	if (inlineMatch) {
		factoryOpener = inlineMatch[1];
	} else {
		const exportMatch = code.match(factoryExportRe);
		if (exportMatch) {
			factoryName = exportMatch[1];
			const funcRe = new RegExp(
				`(function\\s+${factoryName}\\s*\\([^)]*\\)\\s*\\{)`,
			);
			const funcMatch = code.match(funcRe);
			if (funcMatch) {
				factoryOpener = funcMatch[1];
			}
		}
	}

	if (!factoryOpener) {
		// No factory found — just write the import-rewritten file.
		// This handles edge cases where extensions don't use the factory pattern.
		fs.writeFileSync(filePath, code);
		return true;
	}

	// ── Step 4: Relocate module-scope code into the factory ────────────
	// After bundling, the file has:
	//   - import/export statements (keep at module scope)
	//   - interface/type declarations (erased by TS, keep at module scope)
	//   - Everything else: const, let, var, class, function declarations
	//     that may depend on pi symbols → relocate into factory body
	//
	// Instead of trying to trace dependency chains, we take the safe approach:
	// move ALL non-import, non-type module-scope statements into the factory.
	// This guarantees everything has access to pi.pi/pi.typebox symbols.

	const lines = code.split("\n");
	const keepAtModuleScope: string[] = [];
	const relocate: string[] = [];
	let factoryOpenerLineIdx = -1;
	let factoryExportStartIdx = -1;
	let factoryExportEndIdx = -1;

	// Find the factory function opener
	for (let i = 0; i < lines.length; i++) {
		if (factoryOpenerLineIdx === -1 && lines[i].includes(factoryOpener!.slice(0, 30))) {
			const joined = lines.slice(i, Math.min(i + 3, lines.length)).join("\n");
			if (joined.includes(factoryOpener!)) {
				factoryOpenerLineIdx = i;
			}
		}
	}

	// Find the export { name as default } block (may span 1-3 lines)
	if (factoryName) {
		for (let i = 0; i < lines.length; i++) {
			if (/^\s*export\s*\{/.test(lines[i])) {
				// Check if this export block contains "name as default"
				let j = i;
				let chunk = "";
				while (j < lines.length) {
					chunk += lines[j] + "\n";
					if (lines[j].includes("}")) break;
					j++;
				}
				if (chunk.includes(factoryName + " as default")) {
					factoryExportStartIdx = i;
					factoryExportEndIdx = j;
					break;
				}
			}
		}
	}

	if (factoryOpenerLineIdx === -1) {
		// Couldn't find factory line — bail with what we have
		fs.writeFileSync(filePath, code);
		return true;
	}

	// Find the factory's closing brace by tracking depth from the opener
	let factoryEndLineIdx = factoryOpenerLineIdx;
	{
		let depth = 0;
		for (let i = factoryOpenerLineIdx; i < lines.length; i++) {
			for (const ch of lines[i]) {
				if (ch === "{") depth++;
				if (ch === "}") depth--;
			}
			if (depth === 0 && i > factoryOpenerLineIdx) {
				factoryEndLineIdx = i;
				break;
			}
		}
	}

	// Extract the factory body lines (between opener and closer)
	const factoryBodyLines = lines.slice(factoryOpenerLineIdx + 1, factoryEndLineIdx);
	const factoryCloser = lines[factoryEndLineIdx]; // the closing }

	// Classify each line outside the factory.
	// Key: multi-line constructs (imports, interfaces, types) must be consumed
	// as a group — not line-by-line — to avoid splitting their bodies.
	for (let i = 0; i < lines.length; i++) {
		// Skip factory lines — handled separately
		if (i >= factoryOpenerLineIdx && i <= factoryEndLineIdx) continue;
		// Skip the export { name as default } block (may span multiple lines)
		if (factoryExportStartIdx !== -1 && i >= factoryExportStartIdx && i <= factoryExportEndIdx) continue;

		const line = lines[i];
		const trimmed = line.trim();

		// Keep: empty lines, comments, bun header
		if (
			trimmed === "" ||
			trimmed.startsWith("//") ||
			trimmed.startsWith("/*") ||
			trimmed.startsWith("*") ||
			trimmed.startsWith("// @bun")
		) {
			keepAtModuleScope.push(line);
			continue;
		}

		// Keep: imports, type/interface declarations, export type, declare
		// These may span multiple lines — consume the full construct.
		const isKeepStart =
			/^import\s/.test(trimmed) ||
			/^export\s+type\s/.test(trimmed) ||
			/^export\s*\{/.test(trimmed) ||
			/^interface\s/.test(trimmed) ||
			/^type\s+\w+/.test(trimmed) ||
			/^declare\s/.test(trimmed);

		if (isKeepStart) {
			// Consume the entire multi-line construct by tracking depth
			let depth = 0;
			let j = i;
			do {
				for (const ch of lines[j]) {
					if (ch === "(" || ch === "{" || ch === "[") depth++;
					if (ch === ")" || ch === "}" || ch === "]") depth--;
				}
				keepAtModuleScope.push(lines[j]);
				j++;
			} while (depth > 0 && j < lines.length);
			i = j - 1;
			continue;
		}

		// Anything else: var, const, let, class, function, standalone expressions
		// Handle multi-line declarations by tracking brace/paren depth.
		let depth = 0;
		let j = i;
		do {
			for (const ch of lines[j]) {
				if (ch === "(" || ch === "{" || ch === "[") depth++;
				if (ch === ")" || ch === "}" || ch === "]") depth--;
			}
			relocate.push("\t" + lines[j]);
			j++;
		} while (depth > 0 && j < lines.length);
		// Skip the lines we consumed
		i = j - 1;
	}

	// ── Step 5: Reassemble the file ────────────────────────────────────
	const injections: string[] = [];

	// Destructuring from pi.pi / pi.typebox
	const piPiSymbols = [...piPiSet];
	const typeboxSymbols = [...typeboxSet];
	if (piPiSymbols.length > 0) {
		injections.push(`\tconst { ${piPiSymbols.join(", ")} } = pi.pi;`);
	}
	if (typeboxSymbols.length > 0) {
		injections.push(`\tconst { ${typeboxSymbols.join(", ")} } = pi.typebox;`);
	}
	for (const ns of nsBindings) {
		const src = ns.target === "typebox" ? "pi.typebox" : "pi.pi";
		injections.push(`\tconst ${ns.name} = ${src};`);
	}

	// Polyfills
	if (needsPolyfills) {
		injections.push("");
		injections.push(TUI_POLYFILLS.split("\n").map((l) => "\t" + l).join("\n"));
	}

	// Relocated module-scope code
	if (relocate.length > 0) {
		injections.push("");
		injections.push("\t// [pi-install] relocated from module scope:");
		injections.push(...relocate);
	}

	// Build final file
	const output: string[] = [];

	// Module-scope: imports, types, comments
	output.push(...keepAtModuleScope);

	// Factory opener
	output.push(factoryOpener!);

	// Injections (destructuring, polyfills, relocated code)
	if (injections.length > 0) {
		output.push(...injections.join("\n").split("\n"));
		output.push("");
	}

	// Original factory body
	output.push(...factoryBodyLines);

	// Factory closer
	output.push(factoryCloser);

	// Re-export (for bundled pattern)
	if (factoryExportStartIdx !== -1) {
		for (let i = factoryExportStartIdx; i <= factoryExportEndIdx; i++) {
			output.push(lines[i]);
		}
	}

	// Trailing newline
	output.push("");

	fs.writeFileSync(filePath, output.join("\n"));
	return true;
}

/** Rewrite all source files in a directory tree. */
function rewriteExtensionDir(dir: string): number {
	let count = 0;
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".git") {
			count += rewriteExtensionDir(full);
		} else if (entry.isFile() && /\.(ts|js|tsx|jsx|mts|mjs)$/.test(entry.name)) {
			if (rewriteExtensionFile(full)) count++;
		}
	}
	return count;
}

// ---------------------------------------------------------------------------
// Dependency installation
// ---------------------------------------------------------------------------

/**
 * If the source dir has a package.json with third-party dependencies,
 * install them in the destination directory.
 */
async function installDepsIfNeeded(
	sourceDir: string,
	destDir: string,
	notify: NotifyFn,
	exec: ExecFn,
): Promise<void> {
	const srcPkg = path.join(sourceDir, "package.json");
	if (!fs.existsSync(srcPkg)) return;

	try {
		const pkg = JSON.parse(fs.readFileSync(srcPkg, "utf-8"));
		const allDeps = { ...pkg.dependencies };
		// Filter out pi-ecosystem packages — handled by the rewriter
		const thirdParty = Object.keys(allDeps).filter(
			(d) => !d.startsWith("@mariozechner/") && !d.startsWith("@oh-my-pi/") && !d.startsWith("@sinclair/"),
		);
		if (thirdParty.length === 0) return;

		// Write a minimal package.json with only third-party deps
		const minPkg: Record<string, any> = { dependencies: {} };
		for (const dep of thirdParty) {
			minPkg.dependencies[dep] = allDeps[dep];
		}
		fs.writeFileSync(path.join(destDir, "package.json"), JSON.stringify(minPkg, null, 2));

		notify(`Installing dependencies: ${thirdParty.join(", ")}...`, "info");
		const result = await exec("npm", ["install", "--production", "--no-audit", "--no-fund"], {
			cwd: destDir,
			timeout: 120_000,
		});
		if (result.code !== 0) {
			notify(`Warning: npm install failed (exit ${result.code}). Extension may not work.`, "warning");
		}
	} catch {
		notify("Warning: could not install dependencies from package.json.", "warning");
	}
}

// ---------------------------------------------------------------------------
// Registry persistence
// ---------------------------------------------------------------------------

function loadRegistry(): PluginRegistry {
	try {
		if (fs.existsSync(REGISTRY_PATH)) {
			return JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf-8"));
		}
	} catch {
		// Corrupted — start fresh
	}
	return { plugins: {} };
}

function saveRegistry(reg: PluginRegistry): void {
	fs.mkdirSync(path.dirname(REGISTRY_PATH), { recursive: true });
	fs.writeFileSync(REGISTRY_PATH, JSON.stringify(reg, null, 2) + "\n");
}

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

function normalizeGitHubUrl(input: string): string | null {
	const s = input.trim().replace(/\.git$/, "").replace(/\/$/, "");
	if (/^[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/.test(s)) return `https://github.com/${s}`;
	if (s.startsWith("github.com/")) return `https://${s}`;
	if (/^https?:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+/.test(s)) return s;
	return null;
}

function repoNameFromUrl(url: string): string {
	return url.split("/").pop()!;
}

// ---------------------------------------------------------------------------
// Filesystem helpers
// ---------------------------------------------------------------------------

function copyDir(src: string, dest: string): void {
	fs.mkdirSync(dest, { recursive: true });
	for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
		const from = path.join(src, entry.name);
		const to = path.join(dest, entry.name);
		if (entry.isDirectory()) {
			copyDir(from, to);
		} else {
			fs.copyFileSync(from, to);
		}
	}
}

function rmDir(dir: string): void {
	fs.rmSync(dir, { recursive: true, force: true });
}

// ---------------------------------------------------------------------------
// Core install logic — the pipeline
// ---------------------------------------------------------------------------

/**
 * Install a plugin from a cloned directory.
 *
 * Pipeline for each extension directory:
 *   1. Copy source to extensions dir
 *   2. Install third-party npm deps (if any)
 *   3. Bundle multi-file extensions into a single file (Bun.build)
 *   4. Rewrite pi imports to use pi.pi/pi.typebox
 *   5. Relocate module-scope code into factory
 */
async function installFromDir(
	tmpDir: string,
	repoName: string,
	notify: NotifyFn,
	exec: ExecFn,
): Promise<{ name: string; extensions: string[]; skills: string[] } | null> {
	// Read manifest: omp > pi > fallback to convention
	const pkgPath = path.join(tmpDir, "package.json");
	let manifest: PiManifest = {};
	let pkgName = repoName;

	if (fs.existsSync(pkgPath)) {
		try {
			const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
			pkgName = pkg.name ?? repoName;
			manifest = pkg.omp ?? pkg.pi ?? {};
		} catch {
			notify("Warning: malformed package.json, scanning by convention...", "warning");
		}
	}

	// Fallback: look for extensions/ and skills/ dirs by convention
	if (!manifest.extensions?.length && fs.existsSync(path.join(tmpDir, "extensions"))) {
		manifest.extensions = ["./extensions"];
	}
	if (!manifest.skills?.length && fs.existsSync(path.join(tmpDir, "skills"))) {
		manifest.skills = ["./skills"];
	}

	if (!manifest.extensions?.length && !manifest.skills?.length) {
		notify("No extensions or skills found in this package.", "error");
		return null;
	}

	const installedExts: string[] = [];
	const installedSkills: string[] = [];

	// Install extensions
	if (manifest.extensions) {
		fs.mkdirSync(EXTENSIONS_DIR, { recursive: true });

		for (const extRef of manifest.extensions) {
			const resolved = path.resolve(tmpDir, extRef);
			if (!fs.existsSync(resolved)) {
				notify(`Extension path not found: ${extRef}`, "warning");
				continue;
			}

			if (fs.statSync(resolved).isDirectory()) {
				const hasIndex =
					fs.existsSync(path.join(resolved, "index.ts")) ||
					fs.existsSync(path.join(resolved, "index.js"));

				if (hasIndex) {
					// This dir is itself one extension
					const name = path.basename(resolved);
					const dest = path.join(EXTENSIONS_DIR, name);
					if (fs.existsSync(dest)) rmDir(dest);
					copyDir(resolved, dest);
					await processExtensionDir(dest, resolved, name, notify, exec);
					installedExts.push(name);
				} else {
					// Dir contains multiple extensions as subdirs/files
					for (const entry of fs.readdirSync(resolved, { withFileTypes: true })) {
						const src = path.join(resolved, entry.name);
						if (entry.isDirectory()) {
							const dest = path.join(EXTENSIONS_DIR, entry.name);
							if (fs.existsSync(dest)) rmDir(dest);
							copyDir(src, dest);
							await processExtensionDir(dest, src, entry.name, notify, exec);
							installedExts.push(entry.name);
						} else if (/\.(ts|js)$/.test(entry.name)) {
							const dest = path.join(EXTENSIONS_DIR, entry.name);
							fs.copyFileSync(src, dest);
							rewriteExtensionFile(dest);
							installedExts.push(entry.name);
						}
					}
				}
			} else if (/\.(ts|js)$/.test(resolved)) {
				// Single file extension
				const name = path.basename(resolved);
				const dest = path.join(EXTENSIONS_DIR, name);
				fs.copyFileSync(resolved, dest);
				rewriteExtensionFile(dest);
				installedExts.push(name);
			}
		}
	}

	// Install skills
	if (manifest.skills) {
		fs.mkdirSync(SKILLS_DIR, { recursive: true });

		for (const skillRef of manifest.skills) {
			const resolved = path.resolve(tmpDir, skillRef);
			if (!fs.existsSync(resolved) || !fs.statSync(resolved).isDirectory()) {
				notify(`Skill path not found or not a directory: ${skillRef}`, "warning");
				continue;
			}

			if (fs.existsSync(path.join(resolved, "SKILL.md"))) {
				const name = path.basename(resolved);
				const dest = path.join(SKILLS_DIR, name);
				if (fs.existsSync(dest)) rmDir(dest);
				copyDir(resolved, dest);
				installedSkills.push(name);
			} else {
				for (const entry of fs.readdirSync(resolved, { withFileTypes: true })) {
					if (!entry.isDirectory()) continue;
					const src = path.join(resolved, entry.name);
					if (!fs.existsSync(path.join(src, "SKILL.md"))) continue;

					const dest = path.join(SKILLS_DIR, entry.name);
					if (fs.existsSync(dest)) rmDir(dest);
					copyDir(src, dest);
					installedSkills.push(entry.name);
				}
			}
		}
	}

	if (installedExts.length === 0 && installedSkills.length === 0) {
		notify("Found manifest entries but no actual extensions or skills to install.", "error");
		return null;
	}

	return { name: pkgName, extensions: installedExts, skills: installedSkills };
}

/**
 * Process a single extension directory through the full pipeline:
 * deps → bundle → rewrite.
 */
async function processExtensionDir(
	destDir: string,
	sourceDir: string,
	name: string,
	notify: NotifyFn,
	exec: ExecFn,
): Promise<void> {
	// 1. Install third-party deps
	await installDepsIfNeeded(sourceDir, destDir, notify, exec);

	// 2. Find the entry file
	const entryTs = path.join(destDir, "index.ts");
	const entryJs = path.join(destDir, "index.js");
	const entryFile = fs.existsSync(entryTs) ? entryTs : entryJs;

	// 3. Bundle if multi-file
	if (hasRelativeImports(entryFile)) {
		notify(`Bundling ${name} (multi-file extension)...`, "info");
		const bundled = await bundleExtension(entryFile, notify);
		if (bundled) {
			// Replace all source files with the single bundled output
			for (const entry of fs.readdirSync(destDir, { withFileTypes: true })) {
				const p = path.join(destDir, entry.name);
				if (entry.name === "node_modules" || entry.name === "package.json") continue;
				if (entry.isDirectory()) rmDir(p);
				else fs.unlinkSync(p);
			}
			fs.writeFileSync(entryFile, bundled);
		}
	}

	// 4. Rewrite pi imports
	rewriteExtensionDir(destDir);
}

// ---------------------------------------------------------------------------
// Extension — command handlers
// ---------------------------------------------------------------------------

export default function piInstallExtension(pi: ExtensionAPI) {
	pi.setLabel("Pi Plugin Installer");

	// -------------------------------------------------------------------
	// /pi-install <user/repo | url>
	// -------------------------------------------------------------------
	pi.registerCommand("pi-install", {
		description: "Install a Pi plugin from GitHub → /pi-install user/repo",
		handler: async (args, ctx) => {
			const input = (args ?? "").trim();
			if (!input) {
				ctx.ui.notify(
					[
						"Usage: /pi-install <user/repo | github-url>",
						"",
						"Examples:",
						"  /pi-install davebcn87/pi-autoresearch",
						"  /pi-install https://github.com/user/repo",
					].join("\n"),
					"info",
				);
				return;
			}

			const gitUrl = normalizeGitHubUrl(input);
			if (!gitUrl) {
				ctx.ui.notify(
					`Invalid GitHub reference: ${input}\nExpected: user/repo or https://github.com/user/repo`,
					"error",
				);
				return;
			}

			const repoName = repoNameFromUrl(gitUrl);
			ctx.ui.notify(`Cloning ${repoName}...`, "info");

			const tmpDir = path.join(os.tmpdir(), `pi-install-${repoName}-${Date.now()}`);

			try {
				const clone = await pi.exec("git", ["clone", "--depth", "1", "--single-branch", gitUrl, tmpDir], {
					timeout: 60_000,
				});

				if (clone.code !== 0) {
					const err = (clone.stderr || clone.stdout || "unknown error").trim();
					ctx.ui.notify(`Clone failed:\n${err.slice(0, 300)}`, "error");
					return;
				}

				const result = await installFromDir(tmpDir, repoName, (msg, level) => ctx.ui.notify(msg, level), pi.exec.bind(pi));
				if (!result) return;

				// Save to registry
				const reg = loadRegistry();
				reg.plugins[result.name] = {
					name: result.name,
					source: gitUrl,
					extensions: result.extensions,
					skills: result.skills,
					installedAt: new Date().toISOString(),
				};
				saveRegistry(reg);

				const lines = [`Installed ${result.name}`];
				if (result.extensions.length) lines.push(`  Extensions: ${result.extensions.join(", ")}`);
				if (result.skills.length) lines.push(`  Skills: ${result.skills.join(", ")}`);
				lines.push("", "Run /reload to activate.");
				ctx.ui.notify(lines.join("\n"), "info");
			} finally {
				if (fs.existsSync(tmpDir)) rmDir(tmpDir);
			}
		},
	});

	// -------------------------------------------------------------------
	// /pi-uninstall [name]
	// -------------------------------------------------------------------
	pi.registerCommand("pi-uninstall", {
		description: "Uninstall a Pi plugin → /pi-uninstall <name>",
		handler: async (args, ctx) => {
			const reg = loadRegistry();
			const plugins = Object.keys(reg.plugins);

			if (plugins.length === 0) {
				ctx.ui.notify("No Pi plugins installed.", "info");
				return;
			}

			let name = (args ?? "").trim();

			if (!name) {
				ctx.ui.notify(
					`Installed plugins:\n${plugins.map((p) => `  - ${p}`).join("\n")}\n\nUsage: /pi-uninstall <name>`,
					"info",
				);
				return;
			}

			const plugin = reg.plugins[name];
			if (!plugin) {
				const match = plugins.find((p) => p.toLowerCase().includes(name.toLowerCase()));
				if (!match) {
					ctx.ui.notify(`Plugin "${name}" not found.\nInstalled: ${plugins.join(", ")}`, "error");
					return;
				}
				name = match;
			}

			const target = reg.plugins[name]!;

			for (const ext of target.extensions) {
				const p = path.join(EXTENSIONS_DIR, ext);
				if (fs.existsSync(p)) {
					fs.statSync(p).isDirectory() ? rmDir(p) : fs.unlinkSync(p);
				}
			}

			for (const skill of target.skills) {
				const p = path.join(SKILLS_DIR, skill);
				if (fs.existsSync(p)) rmDir(p);
			}

			delete reg.plugins[name];
			saveRegistry(reg);

			ctx.ui.notify(`Uninstalled ${name}. Run /reload to apply.`, "info");
		},
	});

	// -------------------------------------------------------------------
	// /pi-list
	// -------------------------------------------------------------------
	pi.registerCommand("pi-list", {
		description: "List installed Pi plugins",
		handler: async (_args, ctx) => {
			const reg = loadRegistry();
			const plugins = Object.values(reg.plugins);

			if (plugins.length === 0) {
				ctx.ui.notify("No Pi plugins installed.\nUse /pi-install <user/repo> to install one.", "info");
				return;
			}

			const lines = plugins.map((p) => {
				const parts = [p.name];
				parts.push(`  Source: ${p.source}`);
				if (p.extensions.length) parts.push(`  Extensions: ${p.extensions.join(", ")}`);
				if (p.skills.length) parts.push(`  Skills: ${p.skills.join(", ")}`);
				parts.push(`  Installed: ${p.installedAt}`);
				return parts.join("\n");
			});

			ctx.ui.notify(lines.join("\n\n"), "info");
		},
	});

	// -------------------------------------------------------------------
	// /pi-update [name]
	// -------------------------------------------------------------------
	pi.registerCommand("pi-update", {
		description: "Update a Pi plugin from its source → /pi-update [name]",
		handler: async (args, ctx) => {
			const reg = loadRegistry();
			const plugins = Object.keys(reg.plugins);

			if (plugins.length === 0) {
				ctx.ui.notify("No Pi plugins installed.", "info");
				return;
			}

			let name = (args ?? "").trim();

			const targets = name
				? [reg.plugins[name] ?? reg.plugins[plugins.find((p) => p.toLowerCase().includes(name.toLowerCase())) ?? ""]].filter(Boolean)
				: Object.values(reg.plugins);

			if (targets.length === 0) {
				ctx.ui.notify(`Plugin "${name}" not found.\nInstalled: ${plugins.join(", ")}`, "error");
				return;
			}

			for (const plugin of targets) {
				ctx.ui.notify(`Updating ${plugin.name} from ${plugin.source}...`, "info");

				const rn = repoNameFromUrl(plugin.source);
				const tmpDir = path.join(os.tmpdir(), `pi-install-${rn}-${Date.now()}`);

				try {
					const clone = await pi.exec("git", ["clone", "--depth", "1", "--single-branch", plugin.source, tmpDir], {
						timeout: 60_000,
					});

					if (clone.code !== 0) {
						ctx.ui.notify(`Failed to update ${plugin.name}: clone failed`, "error");
						continue;
					}

					// Remove old files
					for (const ext of plugin.extensions) {
						const p = path.join(EXTENSIONS_DIR, ext);
						if (fs.existsSync(p)) {
							fs.statSync(p).isDirectory() ? rmDir(p) : fs.unlinkSync(p);
						}
					}
					for (const skill of plugin.skills) {
						const p = path.join(SKILLS_DIR, skill);
						if (fs.existsSync(p)) rmDir(p);
					}

					const result = await installFromDir(tmpDir, rn, (msg, level) => ctx.ui.notify(msg, level), pi.exec.bind(pi));
					if (result) {
						reg.plugins[result.name] = {
							name: result.name,
							source: plugin.source,
							extensions: result.extensions,
							skills: result.skills,
							installedAt: new Date().toISOString(),
						};
						ctx.ui.notify(`Updated ${result.name}`, "info");
					}
				} finally {
					if (fs.existsSync(tmpDir)) rmDir(tmpDir);
				}
			}

			saveRegistry(reg);
			ctx.ui.notify("Updates complete. Run /reload to apply.", "info");
		},
	});
}
