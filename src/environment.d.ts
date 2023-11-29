declare global {
    namespace NodeJS {
      interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        DISCORD_BOT_TOKEN: string;
        DISCORD_BOT_ID: string;
      }
    }
  }

export { };

