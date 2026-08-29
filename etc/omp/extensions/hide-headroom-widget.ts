// Suppresses the omp-headroom on-screen widget without touching plugin source:
// wraps ctx.ui.setWidget and drops calls for the "headroom" key. Compression
// (proxy, MCP tools, session archive) keeps working — only the widget dies.
// Key defined in omp-headroom src/config.ts: EXTENSION_KEY = "headroom".
interface UIContext {
  setWidget: (...args: unknown[]) => unknown;
}

interface SessionContext {
  ui?: UIContext;
}

interface ExtensionAPI {
  on(event: string, handler: (event: unknown, ctx: SessionContext) => void): void;
}

const HEADROOM_KEY = "headroom";
const wrapped = new WeakSet<object>();

export default function hideHeadroomWidget(pi: ExtensionAPI): void {
  pi.on("session_start", (_event, ctx) => {
    const ui = ctx?.ui;
    if (!ui || typeof ui.setWidget !== "function" || wrapped.has(ui)) return;
    wrapped.add(ui);
    const original = ui.setWidget.bind(ui);
    ui.setWidget = (key: unknown, ...args: unknown[]) => {
      if (key === HEADROOM_KEY) return;
      return original(key, ...args);
    };
  });
}
