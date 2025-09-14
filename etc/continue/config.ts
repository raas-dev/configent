import * as fs from "fs";
import * as os from "os";
import * as path from "path";

export function modifyConfig(config: Config): Config {
  // Load system message from file
  const systemMessagePath = path.join(
    os.homedir(),
    ".config",
    "configent",
    "prompts",
    "general",
    "system.md"
  );
  try {
    if (fs.existsSync(systemMessagePath)) {
      config.systemMessage = fs.readFileSync(systemMessagePath, "utf-8");
    }
  } catch (e) {
    console.error(
      `Failed to load system message from ${systemMessagePath}: ${e}`
    );
  }

  // Chat models ---------------------------------------------------------------

  // Anthropic
  config.models
    .filter((model) => model.apiKey === "[ANTHROPIC_API_KEY]")
    .forEach((anthropicModel) => {
      anthropicModel.apiKey = process.env.ANTHROPIC_API_KEY || "";
    });

  // Google AI Studio
  config.models
    .filter((model) => model.apiKey === "[GEMINI_API_KEY]")
    .forEach((geminiModel) => {
      geminiModel.apiKey = process.env.GEMINI_API_KEY || "";
    });

  // OpenAI
  config.models
    .filter((model) => model.apiKey === "[OPENAI_API_KEY]")
    .forEach((openaiModel) => {
      openaiModel.apiKey = process.env.OPENAI_API_KEY || "";
    });

  // OpenRouter
  config.models
    .filter((model) => model.apiKey === "[OPENROUTER_API_KEY]")
    .forEach((openrouterModel) => {
      openrouterModel.apiKey = process.env.OPENROUTER_API_KEY || "";
    });

  // together.ai
  config.models
    .filter((model) => model.apiKey === "[TOGETHER_API_KEY]")
    .forEach((togetheraiModel) => {
      togetheraiModel.apiKey = process.env.TOGETHER_API_KEY || "";
    });

  // AWS Bedrock
  // See: https://docs.continue.dev/reference/Model%20Providers/bedrock

  // Azure AI Foundry
  config.models
    .filter((model) => model.apiBase === "[AZURE_FOUNDRY_API_BASE]")
    .forEach((azureModel) => {
      azureModel.apiBase = process.env.AZURE_FOUNDRY_API_BASE || "";
    });
  config.models
    .filter((model) => model.apiKey === "[AZURE_FOUNDRY_API_KEY]")
    .forEach((azureModel) => {
      azureModel.apiKey = process.env.AZURE_FOUNDRY_API_KEY || "";
    });

  // Tab autocomplete ----------------------------------------------------------

  if (config.tabAutocompleteModel.apiKey === "[CODESTRAL_API_KEY]") {
    config.tabAutocompleteModel.apiKey = process.env.CODESTRAL_API_KEY || "";
  }

  // Embeddings provider -------------------------------------------------------

  if (config.embeddingsProvider.apiKey === "[GEMINI_API_KEY]") {
    config.embeddingsProvider.apiKey = process.env.GEMINI_API_KEY || "";
  } else if (config.embeddingsProvider.apiKey === "[OPENAI_API_KEY]") {
    config.embeddingsProvider.apiKey = process.env.OPENAI_API_KEY || "";
  } else if (config.embeddingsProvider.apiKey === "[VOYAGE_API_KEY]") {
    config.embeddingsProvider.apiKey = process.env.VOYAGE_API_KEY || "";
  }

  // Reranking model -----------------------------------------------------------

  if (config.reranker.name === "voyage") {
    config.reranker.params.apiKey = process.env.VOYAGE_API_KEY || "";
  }

  // Context providers ---------------------------------------------------------

  // Google search
  config.contextProviders.find(
    (provider) => provider.name === "google"
  ).params.serperApiKey = process.env.SERPER_API_KEY || "";

  // Tools ---------------------------------------------------------------------

  // MCP servers - Load dynamically from mcp.json
  const mcpConfigPath = path.join(
    os.homedir(),
    ".config",
    "configent",
    "mcp",
    "mcp.json"
  );

  try {
    if (fs.existsSync(mcpConfigPath)) {
      const mcpConfigContent = fs.readFileSync(mcpConfigPath, "utf-8");
      const mcpConfig = JSON.parse(mcpConfigContent);

      // Transform mcp.json format to Continue's expected format
      const mcpServers = Object.keys(mcpConfig.mcpServers || {}).map(
        (serverName) => {
          const serverConfig = mcpConfig.mcpServers[serverName];

          const server: any = {
            name: serverName,
            transport: {
              type: "stdio",
              command: serverConfig.command,
              args: serverConfig.args || [],
            },
          };

          // Add environment variables if they exist
          if (serverConfig.env) {
            server.transport.env = { ...serverConfig.env };
          }

          return server;
        }
      );

      // Initialize experimental section if it doesn't exist
      if (!config.experimental) {
        config.experimental = {};
      }

      // Set the dynamically loaded MCP servers
      config.experimental.modelContextProtocolServers = mcpServers;
    }
  } catch (e) {
    console.error(`Failed to load MCP config from ${mcpConfigPath}: ${e}`);
  }

  return config;
}
