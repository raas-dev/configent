// Quiet startup & idle UI: no update check, no changelog banner, no splash
// header, no "Ponytail loaded" banner, no idle prompt-enhancer widget.
import {
  DefaultPackageManager,
  InteractiveMode,
} from "@earendil-works/pi-coding-agent";
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const PT_PREFIX = "Ponytail loaded";
const PE_KEY = "prompt-enhancer";
const ARROW = "\u{E0B0}";

export default function quietStartup(pi: ExtensionAPI): void {
  // No update check
  (DefaultPackageManager.prototype as any).checkForAvailableUpdates =
    async function () {
      return [];
    };

  // No changelog banner
  (InteractiveMode.prototype as any).getChangelogForDisplay = function () {
    return undefined;
  };

  pi.on("session_start", async (_event, ctx) => {
    const ui = ctx?.ui as unknown as {
      notify?: (msg: string, kind?: string) => void;
      setHeader?: (h: unknown) => void;
      __noHeader?: boolean;
      setWidget?: (key: string, lines?: unknown, opts?: unknown) => void;
      __ptNotifyPatched?: boolean;
      __peHidden?: boolean;
    };

    // No "Ponytail loaded" notify
    if (ui?.notify && !ui.__ptNotifyPatched) {
      ui.__ptNotifyPatched = true;
      const orig = ui.notify.bind(ui);
      ui.notify = (msg: string, kind?: string) =>
        typeof msg === "string" && msg.startsWith(PT_PREFIX)
          ? undefined
          : orig(msg, kind);
    }

    // No splash screen: drop header sets — open-tui installs its
    // header after our session_start, so patch must stick.
    if (ui?.setHeader && !ui.__noHeader) {
      ui.__noHeader = true;
      const origSetHeader = ui.setHeader.bind(ui);
      ui.setHeader = () => origSetHeader(undefined);
      origSetHeader(undefined);
    }

    // Hide idle prompt-enhancer widget (brand + model = 2 arrows).
    // 3+ arrows = auto/status segment → keep visible.
    if (ui?.setWidget && !ui.__peHidden) {
      ui.__peHidden = true;
      const orig = ui.setWidget.bind(ui);
      const active = (lines: unknown): boolean =>
        Array.isArray(lines) &&
        lines.some((l) => typeof l === "string" && l.split(ARROW).length > 3);
      ui.setWidget = (key: string, lines?: unknown, opts?: unknown) =>
        key === PE_KEY && !active(lines)
          ? orig(key, undefined)
          : orig(key, lines, opts);
      ui.setWidget(PE_KEY, undefined); // clear if already painted
    }
  });
}
