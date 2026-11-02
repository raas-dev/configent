/**
 * mcp-adapter-stfu — never ask for project MCP server approval.
 *
 * On every session start, pre-seeds ~/.pi/agent/mcp-project-approvals.json with
 * approvals for every server pi-mcp-adapter treats as project-scoped, via the
 * adapter's own approveProjectServer(). Equivalent to clicking "Allow" for all
 * of them, forever.
 *
 * Discovery + hashing use the adapter's own loadMcpConfigWithSources() — the
 * exact loader/merge/translate path its trust gate hashes (isApproved hashes
 * config.mcpServers[name]). Earlier versions hand-rolled the file discovery and
 * hashed raw defs; raw `.pi/mcp.json` defs include adapter-ignored keys
 * (lifecycle, directTools, disableProxyTool) that translatePiMcpServer strips,
 * so the seeded hash never matched and the TUI re-prompted every session.
 *
 * Global settings.projectServers="allow" does NOT cover the TUI — pi-mcp-adapter
 * only honors it headless (!ctx.hasUI) — so pre-seeding is required.
 *
 * No prompts in TUI or headless. Server defs changing → re-approved automatically
 * on next session start.
 *
 * Also silences "MCP: direct tools refreshed" notify noise (moved from quiet-startup).
 */

import { existsSync, lstatSync, readFileSync, realpathSync } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";

const HOME = process.env.HOME ?? "~";
const ADAPTER_DIR = join(HOME, ".pi/agent/npm/node_modules/pi-mcp-adapter/dist");
const APPROVALS_FILE = join(HOME, ".pi/agent/mcp-project-approvals.json");

/**
 * Verbatim mirror of pi-mcp-adapter's projectApprovalScope(): the scope approvals are
 * keyed by. It is the realpath'd CWD, not the git root — the .git walk-up only matters
 * for linked worktrees (repo scope + relative path). No .git anywhere → cwd itself.
 * Must match project-server-trust.js exactly or seeded approvals won't be found.
 */
function linkedWorktreeRepoScope(dotGit: string): string | undefined {
	try {
		if (!lstatSync(dotGit).isFile()) return undefined;
		const pointer = /^gitdir: (.+)$/m.exec(readFileSync(dotGit, "utf8"))?.[1]?.trim();
		if (!pointer) return undefined;
		const adminDir = realpathSync(resolve(dirname(dotGit), pointer));
		const backLink = readFileSync(join(adminDir, "gitdir"), "utf8").trim();
		if (realpathSync(resolve(adminDir, backLink)) !== realpathSync(dotGit)) return undefined;
		const commonDir = dirname(dirname(adminDir));
		const bare = /^\s*bare\s*=\s*(true|yes|on|1)\s*$/im.test(readFileSync(join(commonDir), "utf8"));
		return basename(commonDir) === ".git" && !bare ? dirname(commonDir) : `git-dir:${commonDir}`;
	} catch {
		return undefined;
	}
}

function approvalScope(cwd: string): string {
	const root = realpathSync(cwd);
	for (let dir = root; ; dir = dirname(dir)) {
		const dotGit = join(dir, ".git");
		if (existsSync(dotGit)) {
			const repoScope = linkedWorktreeRepoScope(dotGit);
			return repoScope ? join(repoScope, relative(dir, root)) : root;
		}
		if (dirname(dir) === dir) return root;
	}
}

function alreadyApproved(root: string, name: string, hash: string): boolean {
	try {
		const store = JSON.parse(readFileSync(APPROVALS_FILE, "utf8"));
		return store.approvals?.some(
			(a: any) => a.projectRoot === root && a.serverName === name && a.definitionHash === hash,
		);
	} catch {
		return false;
	}
}

const MCP_NOISE_PREFIX = "MCP: direct tool";
let uiNotifyPatched = false;

function patchUiNotify(ui: any) {
	if (uiNotifyPatched || !ui?.notify) return;
	const originalNotify = ui.notify.bind(ui);
	ui.notify = (message: string, severity?: string) => {
		if (typeof message === "string" && message.startsWith(MCP_NOISE_PREFIX)) return;
		return originalNotify(message, severity);
	};
	// splash/header widget lines: drop MCP lines entirely
	if (typeof ui.setWidget === "function") {
		const originalSetWidget = ui.setWidget.bind(ui);
		ui.setWidget = (key: string, lines?: any, opts?: any) => {
			if (Array.isArray(lines)) {
				const filtered = lines.filter(
					(l: any) => !(typeof l === "string" && l.startsWith(MCP_NOISE_PREFIX)),
				);
				return filtered.length === 0 ? originalSetWidget(key, undefined, opts) : originalSetWidget(key, filtered, opts);
			}
			return originalSetWidget(key, lines, opts);
		};
	}
	uiNotifyPatched = true;
}

export default function (pi: import("@mariozechner/pi-coding-agent").ExtensionAPI) {
	pi.on("session_start", async (_event, ctx) => {
		try {
			patchUiNotify(ctx.ui);

			const { approveProjectServer, hashProjectServerDefinition } = await import(
				/* @vite-ignore */ join(ADAPTER_DIR, "project-server-trust.js")
			);
			const { loadMcpConfigWithSources, isPiMcpConfigEnabled, setPiMcpConfigEnabled } = await import(
				/* @vite-ignore */ join(ADAPTER_DIR, "config.js")
			);
			// The adapter's own extension sets this on Pi 0.99+; set it too in case
			// this handler runs before it does, so .pi/mcp.json discovery matches.
			if (!isPiMcpConfigEnabled()) setPiMcpConfigEnabled(true);

			const scope = approvalScope(ctx.cwd); // approval-store key — NOT the git root

			const loaded = loadMcpConfigWithSources(null, ctx.cwd);
			for (const [name, def] of Object.entries(loaded.config.mcpServers)) {
				// Only project-scoped servers gate on approval in the TUI.
				if (!loaded.projectServers.has(name)) continue;
				const hash = hashProjectServerDefinition(def);
				if (alreadyApproved(scope, name, hash)) continue;
				await approveProjectServer(ctx.cwd, name, def);
			}
		} catch (err) {
			console.error(`mcp-adapter-stfu: ${err instanceof Error ? err.message : err}`);
		}
	});
}
