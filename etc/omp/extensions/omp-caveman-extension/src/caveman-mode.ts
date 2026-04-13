import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import { resolveLevel, levelPrompt, DISABLE_VALUES } from "./caveman-level";

const LABEL = "Caveman";

const SKILL_CANDIDATES = [
	join(homedir(), ".agents", "skills", "caveman"),
	join(homedir(), ".omp", "agent", "skills", "caveman"),
];

function resolveSkillDir(): string | null {
	const override = process.env.OMP_CAVEMAN_SKILL_PATH;
	if (override) return existsSync(override) ? override : null;
	return SKILL_CANDIDATES.find(d => existsSync(d)) ?? null;
}

export default async function cavemanExtension(pi: ExtensionAPI) {
	pi.setLabel(LABEL);

	pi.on("session_start", async () => {
		const dir = resolveSkillDir();
		if (!dir) {
			pi.logger.warn(`omp-caveman-extension: skill directory not found, tried: ${SKILL_CANDIDATES.join(", ")}`);
			return;
		}

		const level = resolveLevel(process.env.OMP_CAVEMAN_LEVEL);
		if (!level) {
			pi.logger.debug("omp-caveman-extension: disabled via OMP_CAVEMAN_LEVEL");
			return;
		}

		pi.sendMessage({
			role: "user",
			content: levelPrompt(level),
		}, {
			deliverAs: "steer",
		});
		pi.logger.debug(`omp-caveman-extension: injected caveman ${level} steer on session_start`);
	});

	pi.registerCommand("caveman", {
		description: "Switch caveman intensity level (lite|full|ultra|off)",
		handler: async (args, ctx) => {
			const input = args.trim().toLowerCase();

			if (!input || input === "ultra" || input === "full" || input === "lite") {
				const level = (input || "full") as "lite" | "full" | "ultra";
				pi.sendMessage({
					role: "user",
					content: levelPrompt(level),
				}, { deliverAs: "steer" });
				ctx.ui.notify(`Caveman ${level} activated.`, "info");
				return;
			}

			if (input === "off" || input === "stop" || input === "normal" || DISABLE_VALUES.has(input)) {
				pi.sendMessage({
					role: "user",
					content: "stop caveman",
				}, { deliverAs: "steer" });
				ctx.ui.notify("Caveman mode deactivated.", "info");
				return;
			}

			ctx.ui.notify(`Unknown level "${input}". Use: lite, full, ultra, off.`, "warning");
		},
	});

	return {
		name: "omp-caveman-extension",
		description: "Auto-activates caveman terseness on every new OMP session. Controlled by OMP_CAVEMAN_LEVEL env var.",
	};
}
