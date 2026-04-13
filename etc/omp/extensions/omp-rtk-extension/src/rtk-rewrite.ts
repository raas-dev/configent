import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";

const RTK_PREFIXES = [
	"git",
	"ls",
	"tree",
	"cat",
	"head",
	"tail",
	"grep",
	"rg",
	"find",
	"fd",
	"kubectl",
	"tsc",
	"eslint",
	"biome",
	"prettier",
	"ruff",
	"pytest",
	"vitest",
	"jest",
	"playwright",
	"pnpm",
	"npm",
	"cargo build",
	"cargo clippy",
	"cargo test",
	"go build",
	"go test",
	"go vet",
	"docker compose",
	"docker images",
	"docker logs",
	"docker ps",
	"gh issue",
	"gh pr",
	"gh run",
];

function startsWithSupportedPrefix(command: string): boolean {
	const trimmed = command.trimStart();
	return RTK_PREFIXES.some(prefix => trimmed === prefix || trimmed.startsWith(`${prefix} `));
}

function getConfiguredPrefix(): string | undefined {
	return process.env.PI_SHELL_PREFIX || process.env.CLAUDE_CODE_SHELL_PREFIX;
}

export function shouldRewriteWithRtk(command: string): boolean {
	const trimmed = command.trimStart();
	if (!trimmed) return false;
	if (trimmed.startsWith("rtk ")) return false;
	return startsWithSupportedPrefix(trimmed);
}

export function registerRtkRewrite(pi: ExtensionAPI): void {
	pi.on("tool_call", async (event) => {
		if (event.toolName !== "bash") return undefined;

		const command = (event.input as { command?: string }).command ?? "";

		if (getConfiguredPrefix() === "rtk") return undefined;

		if (!shouldRewriteWithRtk(command)) return undefined;

		(event.input as { command: string }).command = `rtk ${command}`;

		return undefined;
	});
}
