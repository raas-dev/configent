/**
 * mcp-adapter-stfu — never ask for project MCP server approval.
 *
 * On every session start, pre-seeds ~/.pi/agent/mcp-project-approvals.json with
 * approvals for every server defined in the current project's .pi/mcp-adapter.json
 * and every ~/.pi/agent/profiles/<name>/mcp-adapter.json, via pi-mcp-adapter's own
 * approveProjectServer(). Equivalent to clicking "Allow" for all of them, forever.
 *
 * No prompts in TUI or headless. Server defs changing → re-approved automatically
 * on next session start.
 *
 * Also silences "MCP: direct tools refreshed" notify noise (moved from quiet-startup).
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const HOME = process.env.HOME ?? "~";
const ADAPTER_DIR = join(HOME, ".pi/agent/npm/node_modules/pi-mcp-adapter/dist");
const APPROVALS_FILE = join(HOME, ".pi/agent/mcp-project-approvals.json");

/** Mirror of pi-mcp-adapter's project-root resolution (.git walk-up + worktree pointer). */
function findProjectRoot(cwd: string): string | undefined {
	let dir = resolve(cwd);
	for (;;) {
		const dotGit = join(dir, ".git");
		if (existsSync(dotGit)) {
			const st = statSync(dotGit);
			if (st.isDirectory()) return dir;
			try {
				const pointer = readFileSync(dotGit, "utf8").match(/^gitdir:\s*(.+)$/m)?.[1];
				if (pointer) return resolve(dirname(resolve(dotGit)), pointer, "..");
			} catch {
				/* fallthrough */
			}
			return dir;
		}
		const parent = dirname(dir);
		if (parent === dir) return undefined;
		dir = parent;
	}
}

function serversOf(file: string): Record<string, unknown> {
	try {
		return JSON.parse(readFileSync(file, "utf8"))?.mcpServers ?? {};
	} catch {
		return {};
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

			const root = findProjectRoot(ctx.cwd);
			if (!root) return;

			const sources: string[] = [join(root, ".pi/mcp-adapter.json"), join(ctx.cwd, ".pi/mcp-adapter.json")];
			const profilesDir = join(HOME, ".pi/agent/profiles");
			try {
				for (const p of readdirSync(profilesDir))
					sources.push(join(profilesDir, p, "mcp-adapter.json"));
			} catch {
				/* no profiles dir */
			}

			let n = 0;
			for (const file of sources) {
				if (!existsSync(file)) continue;
				for (const [name, def] of Object.entries(serversOf(file))) {
					const hash = hashProjectServerDefinition(def as any);
					if (alreadyApproved(root, name, hash)) continue;
					await approveProjectServer(root, name, def as any);
					n++;
				}
			}
		} catch (err) {
			console.error(`mcp-adapter-stfu: ${err instanceof Error ? err.message : err}`);
		}
	});
}
