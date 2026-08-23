// Moves the pi-mcp-adapter footer status ("MCP x/y") to the leftmost slot
// by remapping its status key "mcp" -> "!mcp" so it sorts first.
import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

export default function mcpStatusFirst(pi: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    const ui = ctx.ui as unknown as {
      setStatus?: (key: string, text?: string) => void;
      __mcpFirst?: boolean;
    };
    if (!ui?.setStatus || ui.__mcpFirst) return;
    ui.__mcpFirst = true;
    const orig = ui.setStatus.bind(ui);
    ui.setStatus("mcp", undefined); // clear any slot already registered
    ui.setStatus = (key: string, text?: string) =>
      orig(key === "mcp" ? "!mcp" : key, text);
  });
}
