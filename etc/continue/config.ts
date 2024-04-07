require('dotenv').config();

export function modifyConfig(config: Config): Config {
  config.allowAnonymousTelemetry = false;

  config.completionOptions = {
    ...config.completionOptions,
    temperature: 0,
    maxTokens: 1024
  };

  config.models = [
    ...config.models,
    {
      "title": "claude-3-sonnet",
      "provider": "anthropic",
      "model": "claude-3-sonnet-20240229",
      "apiKey": process.env.ANTHROPIC_KEY
    },
    {
      "title": "gpt-4-turbo-preview",
      "provider": "openai",
      "model": "gpt-4-turbo-preview",
      "apiKey": process.env.OPENAI_API_KEY
    }
  ];

  config.systemMessage = "You are a helpful assistant. Please make all responses as concise as possible and never repeat something you have already explained. Take a deep breath and work on the problem step-by-step.";

  return config;
}
