// NOTE: this file is copied, not symlinked - run setup_continue after editing

import * as dotenv from "dotenv";

dotenv.config();

export function modifyConfig(config: Config): Config {
  config.models[0].apiKey = process.env.ANTHROPIC_API_KEY;
  config.tabAutocompleteModel.apiKey = process.env.CODESTRAL_API_KEY;
  config.embeddingsProvider.apiKey = process.env.VOYAGE_API_KEY;
  config.reranker.params.apiKey = process.env.VOYAGE_API_KEY;

  config.contextProviders.find(
    (provider) => provider.name === "google"
  ).params.serper_api_key = process.env.SERPER_API_KEY;

  return config;
}
