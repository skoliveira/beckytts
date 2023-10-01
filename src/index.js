import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { DISCORD_TOKEN } from './config.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

// Command handling
(async c => {
	client.cooldowns = new Collection();
	client.commands = new Collection();
	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);
	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const { 'default': command } = await import(filePath);
			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in command && 'execute' in command) {
				c.commands.set(command.data.name, command);
			}
			else {
				console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
			}
		}
	}
})(client);

// Event handling
(async c => {
	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		const { 'default': event } = await import(filePath);
		if (event.once) {
			c.once(event.name, (...args) => event.execute(...args));
		}
		else {
			c.on(event.name, (...args) => event.execute(...args));
		}
	}
})(client);

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);
