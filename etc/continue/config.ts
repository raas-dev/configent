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
    "chat.md"
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
      anthropicModel.apiKey = process.env.ANTHROPIC_API_KEY;
    });

  // Google AI Studio
  config.models
    .filter((model) => model.apiKey === "[GEMINI_API_KEY]")
    .forEach((geminiModel) => {
      geminiModel.apiKey = process.env.GEMINI_API_KEY;
    });

  // OpenAI
  config.models
    .filter((model) => model.apiKey === "[OPENAI_API_KEY]")
    .forEach((openaiModel) => {
      openaiModel.apiKey = process.env.OPENAI_API_KEY;
    });

  // OpenRouter
  config.models
    .filter((model) => model.apiKey === "[OPENROUTER_API_KEY]")
    .forEach((openrouterModel) => {
      openrouterModel.apiKey = process.env.OPENROUTER_API_KEY;
    });

  // together.ai
  config.models
    .filter((model) => model.apiKey === "[TOGETHER_API_KEY]")
    .forEach((togetheraiModel) => {
      togetheraiModel.apiKey = process.env.TOGETHER_API_KEY;
    });

  // AWS Bedrock
  // See: https://docs.continue.dev/reference/Model%20Providers/bedrock

  // Azure AI Foundry
  config.models
    .filter((model) => model.apiBase === "[AZURE_AI_API_BASE]")
    .forEach((azureModel) => {
      azureModel.apiBase = process.env.AZURE_AI_API_BASE;
    });
  config.models
    .filter((model) => model.apiKey === "[AZURE_AI_API_KEY]")
    .forEach((azureModel) => {
      azureModel.apiKey = process.env.AZURE_AI_API_KEY;
    });

  // Tab autocomplete ----------------------------------------------------------

  if (config.tabAutocompleteModel.apiKey === "[CODESTRAL_API_KEY]") {
    config.tabAutocompleteModel.apiKey = process.env.CODESTRAL_API_KEY;
  }

  // Embeddings provider -------------------------------------------------------

  if (config.embeddingsProvider.apiKey === "[GEMINI_API_KEY]") {
    config.embeddingsProvider.apiKey = process.env.GEMINI_API_KEY;
  } else if (config.embeddingsProvider.apiKey === "[OPENAI_API_KEY]") {
    config.embeddingsProvider.apiKey = process.env.OPENAI_API_KEY;
  } else if (config.embeddingsProvider.apiKey === "[VOYAGE_API_KEY]") {
    config.embeddingsProvider.apiKey = process.env.VOYAGE_API_KEY;
  }

  // Reranking model -----------------------------------------------------------

  if (config.reranker.name === "voyage") {
    config.reranker.params.apiKey = process.env.VOYAGE_API_KEY;
  }

  // Context providers ---------------------------------------------------------

  // Google search
  config.contextProviders.find(
    (provider) => provider.name === "google"
  ).params.serperApiKey = process.env.SERPER_API_KEY;

  return config;
}
