import * as dotenv from 'dotenv'

/**
 * Load environment variables from a .env file, if it exists.
 */

dotenv.config()

const config = {
  DISCORD_APPLICATION_ID: process.env.DISCORD_APPLICATION_ID,
  DISCORD_PUBLIC_KEY: process.env.DISCORD_PUBLIC_KEY,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  DISCORD_REDIRECT_URI: process.env.DISCORD_REDIRECT_URI,
  DISCORD_TOKEN: process.env.DISCORD_TOKEN
};

export default config;
