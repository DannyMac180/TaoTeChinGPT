// global.d.ts

declare global {
    namespace NodeJS {
      interface Global {
        OPENAI_API_KEY: string;
      }
    }
  }
  