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

  // Anthropic
  config.models
    .filter((model) => model.provider === "anthropic")
    .forEach((anthropicModel) => {
      anthropicModel.apiKey = process.env.ANTHROPIC_API_KEY;
    });

  // Google
  config.models
    .filter((model) => model.provider === "gemini")
    .forEach((googleModel) => {
      googleModel.apiKey = process.env.GEMINI_API_KEY;
    });

  // OpenAI
  config.models
    .filter((model) => model.apiType !== "azure" && model.provider === "openai")
    .forEach((openaiModel) => {
      openaiModel.apiKey = process.env.OPENAI_API_KEY;
    });

  // AWS Bedrock
  // See: https://docs.continue.dev/reference/Model%20Providers/bedrock

  // Azure OpenAI
  config.models
    .filter((model) => model.apiType === "azure" && model.provider === "openai")
    .forEach((openaiModel) => {
      openaiModel.apiBase = process.env.AZURE_OPENAI_API_BASE;
      openaiModel.apiKey = process.env.AZURE_OPENAI_API_KEY;
      openaiModel.apiVersion = process.env.AZURE_OPENAI_API_VERSION;
    });

  // Tab autocomplete
  if (config.tabAutocompleteModel.model === "codestral-latest") {
    config.tabAutocompleteModel.apiKey = process.env.CODESTRAL_API_KEY;
  }

  // Embeddings provider
  if (config.embeddingsProvider.provider === "gemini") {
    config.embeddingsProvider.apiKey = process.env.GEMINI_API_KEY;
  } else if (config.embeddingsProvider.provider === "openai") {
    config.embeddingsProvider.apiKey = process.env.OPENAI_API_KEY;
  } else if (config.embeddingsProvider.model === "voyage-code-2") {
    config.embeddingsProvider.apiKey = process.env.VOYAGE_API_KEY;
  }

  // Reranker
  if (config.reranker.name === "voyage") {
    config.reranker.params.apiKey = process.env.VOYAGE_API_KEY;
  }

  // Google search
  config.contextProviders.find(
    (provider) => provider.name === "google"
  ).params.serperApiKey = process.env.SERPER_API_KEY;

  return config;
}
