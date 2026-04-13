import type { ExtensionAPI } from "@oh-my-pi/pi-coding-agent";
import { detectRtk } from "./rtk-binary";
import { registerRtkCommands } from "./rtk-commands";
import { registerRtkRewrite } from "./rtk-rewrite";

function getExistingShellPrefix(): string | undefined {
	return process.env.PI_SHELL_PREFIX || process.env.CLAUDE_CODE_SHELL_PREFIX;
}

function enableShellPrefix(): { enabled: boolean; reason: string } {
	const existingPrefix = getExistingShellPrefix();
	if (existingPrefix) {
		return { enabled: false, reason: `shell prefix already set to ${existingPrefix}` };
	}

	process.env.PI_SHELL_PREFIX = "rtk";
	return { enabled: true, reason: "set PI_SHELL_PREFIX=rtk" };
}

export default async function rtkExtension(pi: ExtensionAPI) {
	pi.setLabel("RTK Token Optimizer");
	pi.logger.debug("omp-rtk-extension: initializing...");

	const rtk = await detectRtk(pi);
	registerRtkCommands(pi, rtk);

	if (!rtk.available || !rtk.version) {
		pi.logger.warn(`omp-rtk-extension: RTK unavailable; transparent compression disabled (${rtk.reason ?? "not installed"})`);
		return;
	}

	pi.logger.debug(`omp-rtk-extension: RTK ${rtk.version} detected at "${rtk.binary}"`);

	const prefixStatus = enableShellPrefix();
	pi.logger.debug(`omp-rtk-extension: ${prefixStatus.reason} (${prefixStatus.enabled ? "primary" : "rewrite fallback"})`);

	registerRtkRewrite(pi);
	pi.logger.debug("omp-rtk-extension: registered /rtk-gain, /rtk-discover, /rtk-status");

	return {
		name: "omp-rtk-extension",
		description: "Transparent RTK compression for OMP bash commands.",
	};
}
