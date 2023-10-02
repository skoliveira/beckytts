import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection, VoiceConnectionStatus } from '@discordjs/voice';

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
			const connection = getVoiceConnection(interaction.guild.id);
			connection.once(VoiceConnectionStatus.Disconnected, async () => {
				await interaction.editReply({
					content: `I left the ${voice.channel}`,
					ephemeral: true,
				});
				if (connection && connection.state.status !== VoiceConnectionStatus.Destroyed) {
					connection.destroy();
				}
			});
			connection.disconnect();
		}
		else {
			await interaction.editReply({
				content: 'I am not in any voice channel.',
				ephemeral: true,
			});
		}
	},
};
