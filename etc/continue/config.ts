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
      "title": "claude-3-haiku",
      "provider": "anthropic",
      "model": "claude-3-haiku-20240307",
      "apiKey": process.env.CLAUDE_API_KEY
    },
    {
      "title": "gpt-4o",
      "provider": "openai",
      "model": "gpt-4o",
      "apiKey": process.env.OPENAI_API_KEY
    }
  ];

  config.systemMessage = "You are a helpful assistant. Please make all responses as concise as possible and never repeat something you have already explained. Take a deep breath and work on the problem step-by-step.";

  return config;
}
