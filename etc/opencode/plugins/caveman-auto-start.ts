import type { Plugin } from "@opencode-ai/plugin";

const DISABLED_VALUES = new Set(["off", "false", "0", "no", ""]);
const env = (process.env.OPENCODE_CAVEMAN_MODE ?? "full").toLowerCase();
const enabled = !DISABLED_VALUES.has(env);

export const CavemanAutoStartPlugin: Plugin = async ({ client }) => {
  if (!enabled) return {};

  return {
    event: async ({ event }) => {
      if (event.type !== "session.created") return;

      try {
        await client.session.prompt({
          path: { id: event.properties.info.id },
          body: {
            parts: [{ type: "text", text: `/caveman ${env}` }],
          },
        });
      } catch {}
    },
  };
};
