import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';

export default {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Make the bot leave its current voice channel.'),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		const meId = interaction.client.user.id;
		const voice = await interaction.guild.members.fetch({ user: meId, force: true })
			.then(fetchedMember => { return fetchedMember.voice; })
			.catch(console.error);
		if (voice.channelId) {
			await interaction.editReply({
				content: `Left the ${voice.channel}`,
				ephemeral: true,
			});
			const connection = getVoiceConnection(interaction.guild.id);
			connection.destroy();
		}
		else {
			await interaction.editReply({
				content: 'I am not in any voice channel.',
				ephemeral: true,
			});
		}
	},
};
