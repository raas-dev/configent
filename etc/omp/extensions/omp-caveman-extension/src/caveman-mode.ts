import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import { resolveLevel, type CavemanLevel } from "./caveman-level";

const LABEL = "Caveman";

const SKILL_CANDIDATES = [
	join(homedir(), ".omp", "agent", "skills", "caveman"),
	join(homedir(), ".agents", "skills", "caveman"),
];

function resolveSkillContent(): string | null {
	const override = process.env.OMP_CAVEMAN_SKILL_PATH;
	const dir = override
		? (existsSync(override) ? override : null)
		: SKILL_CANDIDATES.find(d => existsSync(d)) ?? null;
	if (!dir) return null;
	const file = join(dir, "SKILL.md");
	return existsSync(file) ? readFileSync(file, "utf-8") : null;
}

function buildInjection(skillContent: string, level: CavemanLevel): string {
	const body = skillContent.replace(/^---[\s\S]*?---\n/, "").trim();
	return `CAVEMAN MODE ACTIVE — level: ${level}\n\n${body}`;
}

export default async function cavemanExtension(pi: ExtensionAPI) {
	pi.setLabel(LABEL);

	const activeLevel: CavemanLevel | null = resolveLevel(process.env.OMP_CAVEMAN_LEVEL);
	const skillContent = resolveSkillContent();

	if (!skillContent) {
		pi.logger.warn(`omp-caveman-extension: skill not found, tried: ${SKILL_CANDIDATES.join(", ")}`);
	}

	if (!activeLevel) {
		pi.logger.debug("omp-caveman-extension: disabled via OMP_CAVEMAN_LEVEL");
	}

	if (activeLevel && skillContent) {
		const injection = buildInjection(skillContent, activeLevel);
		let injected = false;
		pi.on("before_agent_start", async (event) => {
			if (injected) return;
			injected = true;
			return { systemPrompt: `${event.systemPrompt}\n\n${injection}` };
		});
		pi.logger.debug(`omp-caveman-extension: will inject caveman ${activeLevel} into system prompt on first turn`);
	}

	return {
		name: "omp-caveman-extension",
		description: "Injects caveman terseness into system prompt each turn. Controlled by OMP_CAVEMAN_LEVEL env var.",
	};
}
