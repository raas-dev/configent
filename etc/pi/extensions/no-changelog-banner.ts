import { InteractiveMode } from "@earendil-works/pi-coding-agent";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (_pi: ExtensionAPI): void {
	(InteractiveMode.prototype as any).getChangelogForDisplay = function () {
		return undefined;
	};
}
