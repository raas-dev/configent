// Hides the @jmcombs/pi-prompt-enhancer status widget above the editor
// when idle (brand + model only). Reappears on activity: auto-enhance armed
// or a transient status segment (enhanced, cancelled, …).
// Commands (/prompt_enhance etc.) and shortcuts keep working.
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const KEY = "prompt-enhancer";
const ARROW = "\u{E0B0}";

export default function hidePromptEnhancer(pi: ExtensionAPI) {
	pi.on("session_start", async (_event, ctx) => {
		const ui = ctx.ui as unknown as {
			setWidget?: (key: string, lines?: unknown, opts?: unknown) => void;
			__peHidden?: boolean;
		};
		if (!ui?.setWidget || ui.__peHidden) return;
		ui.__peHidden = true;
		const orig = ui.setWidget.bind(ui);
		// Idle widget = brand + model = 2 arrows. 3+ arrows = auto/status segment.
		const active = (lines: unknown): boolean =>
			Array.isArray(lines) &&
			lines.some((l) => typeof l === "string" && l.split(ARROW).length > 3);
		ui.setWidget = (key: string, lines?: unknown, opts?: unknown) =>
			key === KEY && !active(lines)
				? orig(key, undefined)
				: orig(key, lines, opts);
		ui.setWidget(KEY, undefined); // clear if already painted
	});
}
