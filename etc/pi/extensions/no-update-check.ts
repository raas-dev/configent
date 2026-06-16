import { DefaultPackageManager } from "@earendil-works/pi-coding-agent";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI): void {
	(DefaultPackageManager.prototype as any).checkForAvailableUpdates = async function () {
		return [];
	};
}
