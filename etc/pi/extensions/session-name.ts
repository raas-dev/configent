import path from "node:path";

import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { completeSimple } from "@mariozechner/pi-ai";

const TITLE_PROMPT = [
  "Generate a short session title for this coding task.",
  "Return only the title.",
  "Keep the user's language.",
  "No quotes. No trailing punctuation.",
  "Keep it concise.",
].join("\n");

export default function (pi: ExtensionAPI) {
  let firstPrompt: string | null = null;
  let started = false;

  pi.on("input", async (event, ctx) => {
    if (pi.getSessionName()) return;

    firstPrompt ??= event.text.trim();
    if (started) return;
    started = true;

    void (async () => {
      if (!ctx.model) return;

      const auth = await ctx.modelRegistry.getApiKeyAndHeaders(ctx.model);
      if (!auth.ok) return;

      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const response = await completeSimple(
            ctx.model,
            {
              systemPrompt: TITLE_PROMPT,
              messages: [{ role: "user", content: firstPrompt, timestamp: Date.now() }],
            },
            {
              maxTokens: 24,
              apiKey: auth.apiKey,
              headers: { ...(ctx.model.headers ?? {}), ...(auth.headers ?? {}) },
            },
          );

          const part = response.content.toReversed().find(part => part.type === "text");
          if (!part) return;

          pi.setSessionName(part.text);
          ctx.ui.setTitle(`π - ${part.text} - ${path.basename(ctx.cwd)}`);
          return;
        } catch { }
      }
    })();
  });
}
