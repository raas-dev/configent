import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import type { RtkInfo } from "./rtk-binary";
import { runRtk } from "./rtk-binary";

function getPrefixStatus(): string {
	const prefix = process.env.PI_SHELL_PREFIX || process.env.CLAUDE_CODE_SHELL_PREFIX;
	if (!prefix) return "inactive";
	if (prefix === "rtk") return "active (PI_SHELL_PREFIX=rtk)";
	return `inactive (shell prefix already set to ${prefix})`;
}

async function notifyRtkOutput(
	pi: ExtensionAPI,
	ctx: { cwd: string; ui: { notify(message: string, type?: "info" | "warning" | "error"): void } },
	rtk: RtkInfo,
	args: string[],
	emptyMessage: string,
) {
	if (!rtk.available) {
		ctx.ui.notify(`RTK is unavailable: ${rtk.reason ?? "not installed"}`, "warning");
		return;
	}

	const result = await runRtk(pi, args, ctx.cwd);
	const output = [result.stdout.trim(), result.stderr.trim()].filter(Boolean).join("\n");
	if (result.code !== 0 || result.killed) {
		ctx.ui.notify(output || `rtk ${args.join(" ")} failed`, "error");
		return;
	}

	ctx.ui.notify(output || emptyMessage, "info");
}

export function registerRtkCommands(pi: ExtensionAPI, rtk: RtkInfo): void {
	pi.registerCommand("rtk-gain", {
		description: "Show RTK token savings analytics",
		handler: async (_args, ctx) => {
			await notifyRtkOutput(pi, ctx, rtk, ["gain", "--all"], "No RTK gain data yet.");
		},
	});

	pi.registerCommand("rtk-discover", {
		description: "Show missed RTK optimization opportunities",
		handler: async (_args, ctx) => {
			await notifyRtkOutput(pi, ctx, rtk, ["discover", "--all"], "No missed RTK opportunities found.");
		},
	});

	pi.registerCommand("rtk-status", {
		description: "Show RTK integration status",
		handler: async (_args, ctx) => {
			if (!rtk.available) {
				ctx.ui.notify(`RTK unavailable: ${rtk.reason ?? "not installed"}`, "warning");
				return;
			}

			ctx.ui.notify(
				[`RTK ${rtk.version ?? "unknown"}`, `Shell prefix: ${getPrefixStatus()}`].join("\n"),
				"info",
			);
		},
	});
}
