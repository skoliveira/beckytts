import * as dotenv from 'dotenv';

/**
 * Load environment variables from a .env file, if it exists.
 */

dotenv.config();

export const {
	DISCORD_APPLICATION_ID,
	DISCORD_PUBLIC_KEY,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	DISCORD_REDIRECT_URI,
	DISCORD_TOKEN,
} = process.env;
