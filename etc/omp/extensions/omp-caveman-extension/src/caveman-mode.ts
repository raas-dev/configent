import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import { DISABLE_VALUES, VALID_LEVELS, resolveLevel, type CavemanLevel } from "./caveman-level";

const LABEL = "Caveman";
const STATUS_KEY = "caveman";
const USAGE = "Usage: /caveman [lite|full|ultra|off|show|hide|update]";

export const CONFIG_PATH = join(homedir(), ".omp", "agent", "caveman.json");

const SKILL_CANDIDATES = [
	join(homedir(), ".omp", "agent", "skills", "caveman"),
	join(homedir(), ".agents", "skills", "caveman"),
];

const SKILL_URL = "https://raw.githubusercontent.com/JuliusBrussee/caveman/main/skills/caveman/SKILL.md";

export interface CavemanConfig {
	defaultLevel: CavemanLevel | null;
	showStatus: boolean;
}

export interface CavemanOptions {
	configPath?: string;
	skillDir?: string;
	fetcher?: typeof fetch;
}

export function loadConfig(path: string = CONFIG_PATH): CavemanConfig {
	const fallback: CavemanConfig = { defaultLevel: "full", showStatus: false };
	if (!existsSync(path)) return fallback;
	try {
		const parsed = JSON.parse(readFileSync(path, "utf-8")) as { defaultLevel?: unknown; showStatus?: unknown };
		return {
			defaultLevel: parsed.defaultLevel === null ? null : resolveLevel(typeof parsed.defaultLevel === "string" ? parsed.defaultLevel : undefined),
			showStatus: parsed.showStatus === true,
		};
	} catch (err) {
		console.error(`omp-caveman-extension: invalid config at ${path}: ${err}`);
		return fallback;
	}
}

export function writeConfig(config: CavemanConfig, path: string = CONFIG_PATH): void {
	writeFileSync(path, `${JSON.stringify(config, null, 2)}\n`);
}

function buildInjection(skillContent: string, level: CavemanLevel): string {
	const body = skillContent.replace(/^---[\s\S]*?---\n/, "").trim();
	return `CAVEMAN MODE ACTIVE — level: ${level}\n\n${body}`;
}

export default async function cavemanExtension(pi: ExtensionAPI, options: CavemanOptions = {}) {
	pi.setLabel(LABEL);

	const configPath = options.configPath ?? CONFIG_PATH;
	const config = loadConfig(configPath);
	// Session state starts from config defaults; /caveman level changes are
	// session-scoped and never persist. Only show/hide writes, and only its own key.
	const session = { level: config.defaultLevel, showStatus: config.showStatus };
	const skillDir = options.skillDir ?? SKILL_CANDIDATES.find(d => existsSync(d)) ?? SKILL_CANDIDATES[0];
	const skillFile = join(skillDir, "SKILL.md");
	const fetcher = options.fetcher ?? fetch;
	let skillContent = existsSync(skillFile) ? readFileSync(skillFile, "utf-8") : null;

	if (!skillContent) {
		pi.logger.warn(`omp-caveman-extension: skill not found at ${skillFile}`);
	}

	function applyStatus(ctx: { ui: { setStatus: (key: string, text: string | undefined) => void } }) {
		ctx.ui.setStatus(STATUS_KEY, session.showStatus && session.level ? `caveman ${session.level}` : undefined);
	}

	// session_start: statusbar visible before the first message.
	pi.on("session_start", async (_event, ctx) => {
		applyStatus(ctx);
	});

	// before_agent_start fires per agent loop with the fresh base prompt and a
	// UI context, so current level, skill content, and statusbar apply per turn.
	pi.on("before_agent_start", async (event, ctx) => {
		applyStatus(ctx);
		if (!session.level || !skillContent) return;
		return { systemPrompt: `${event.systemPrompt}\n\n${buildInjection(skillContent, session.level)}` };
	});

	pi.registerCommand("caveman", {
		description: USAGE,
		handler: async (args, ctx) => {
			const value = args.trim().toLowerCase();

			if (!value) {
				const level = session.level ?? "off";
				applyStatus(ctx);
				ctx.ui.notify(`caveman ${level}, status ${session.showStatus ? "shown" : "hidden"}`);
				return;
			}

			if (value === "show" || value === "hide") {
				session.showStatus = value === "show";
				writeConfig({ defaultLevel: config.defaultLevel, showStatus: session.showStatus }, configPath);
				applyStatus(ctx);
				ctx.ui.notify(`caveman status ${session.showStatus ? "shown" : "hidden"}`);
				return;
			}

			if (value === "update") {
				try {
					const response = await fetcher(SKILL_URL);
					if (!response.ok) throw new Error(`HTTP ${response.status}`);
					skillContent = await response.text();
					writeFileSync(skillFile, skillContent);
					ctx.ui.notify("caveman skill updated");
				} catch (err) {
					ctx.ui.notify(`caveman skill update failed: ${err}`, "warning");
				}
				return;
			}

			const isLevel = (VALID_LEVELS as readonly string[]).includes(value);
			const isOff = DISABLE_VALUES.has(value);
			if (!isLevel && !isOff) {
				ctx.ui.notify(`Unknown level: ${args}. ${USAGE}`, "warning");
				return;
			}

			session.level = isOff ? null : (value as CavemanLevel);
			applyStatus(ctx);
			ctx.ui.notify(`caveman ${session.level ?? "off"} (session)`);
		},
	});

	return {
		name: "omp-caveman-extension",
		description: "Injects caveman terseness per level. Configured via ~/.omp/agent/caveman.json and /caveman command.",
	};
}
