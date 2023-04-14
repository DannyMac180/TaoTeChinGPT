// utils/apiKeyStore.ts

let OPENAI_API_KEY: string | undefined = undefined;

export function setApiKey(key: string) {
  OPENAI_API_KEY = key;
}

export function getApiKey(): string | undefined {
  return OPENAI_API_KEY;
}
