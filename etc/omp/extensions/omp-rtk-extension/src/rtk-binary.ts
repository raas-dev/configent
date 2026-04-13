import type { ExtensionAPI, ExecResult } from "@oh-my-pi/pi-coding-agent";

export interface RtkInfo {
	available: boolean;
	version?: string;
	binary?: string;
	reason?: string;
}

function trimOutput(result: ExecResult): string {
	return [result.stdout, result.stderr]
		.map(value => value.trim())
		.find(Boolean) ?? "";
}

function parseRtkVersion(output: string): string | undefined {
	const match = output.match(/\brtk\s+v?(\d+\.\d+\.\d+(?:[-+][^\s]+)?)/i);
	return match?.[1];
}

export async function detectRtk(pi: ExtensionAPI): Promise<RtkInfo> {
	try {
		const result = await pi.exec("rtk", ["--version"]);
		if (result.code !== 0 || result.killed) {
			return { available: false, reason: trimOutput(result) || "rtk --version failed" };
		}

		const output = trimOutput(result);
		const version = parseRtkVersion(output);
		if (!version || !output.toLowerCase().includes("rtk")) {
			return {
				available: false,
				reason: output || "Command on PATH did not identify itself as RTK",
			};
		}

		return { available: true, version, binary: "rtk" };
	} catch (error) {
		return {
			available: false,
			reason: error instanceof Error ? error.message : String(error),
		};
	}
}

export async function runRtk(pi: ExtensionAPI, args: string[], cwd?: string): Promise<ExecResult> {
	return pi.exec("rtk", args, cwd ? { cwd } : undefined);
}
