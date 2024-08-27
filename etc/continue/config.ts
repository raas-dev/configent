// NOTE: this file is copied, not symlinked - run setup_continue after editing

import * as dotenv from "dotenv";

dotenv.config();

export function modifyConfig(config: Config): Config {
  let anthropic = config.models.find((model) => model.provider === "anthropic");
  anthropic.apiKey = process.env.ANTHROPIC_API_KEY;

  config.tabAutocompleteModel.apiKey = process.env.CODESTRAL_API_KEY;
  config.embeddingsProvider.apiKey = process.env.VOYAGE_API_KEY;
  config.reranker.params.apiKey = process.env.VOYAGE_API_KEY;

  config.contextProviders.find(
    (provider) => provider.name === "google"
  ).params.serperApiKey = process.env.SERPER_API_KEY;

  let azure_openai = config.models.find((model) => model.apiType === "azure");

  azure_openai.model = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
  azure_openai.apiBase = process.env.AZURE_OPENAI_API_BASE;
  azure_openai.apiKey = process.env.AZURE_OPENAI_API_KEY;
  azure_openai.apiVersion = process.env.AZURE_OPENAI_API_VERSION;

  return config;
}
