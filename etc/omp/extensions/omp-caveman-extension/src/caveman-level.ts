const VALID_LEVELS = ["lite", "full", "ultra"] as const;
type CavemanLevel = (typeof VALID_LEVELS)[number];

const DISABLE_VALUES = new Set(["off", "no", "false", "0"]);

function resolveLevel(env?: string): CavemanLevel | null {
	if (!env) return "full";
	const normalized = env.trim().toLowerCase();
	if (DISABLE_VALUES.has(normalized)) return null;
	if ((VALID_LEVELS as readonly string[]).includes(normalized)) return normalized as CavemanLevel;
	return "full";
}

function levelPrompt(level: CavemanLevel): string {
	return `/caveman ${level}`;
}

export { resolveLevel, levelPrompt, VALID_LEVELS, DISABLE_VALUES };
export type { CavemanLevel };
