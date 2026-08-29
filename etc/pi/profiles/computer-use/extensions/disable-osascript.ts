import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function (pi: ExtensionAPI) {
  pi.on("tool_call", async (event) => {
    if (event.toolName !== "bash") return undefined;

    const command = (event.input.command as string).trim();
    if (/\bosascript\b/.test(command)) {
      return { block: true, reason: "osascript disabled" };
    }
    return undefined;
  });
}
