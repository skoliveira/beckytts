import { SlashCommandBuilder, ChannelType, PermissionsBitField } from 'discord.js';
import { joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';

export default {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Make the bot join the current voice channel or the specified voice channel.')
		.addChannelOption(option =>
			option
				.setName('channel')
				.setDescription('The voice channel to join into')
				.addChannelTypes(ChannelType.GuildVoice)
				.setRequired(false)),
	async execute(interaction) {
		async function join(channel) {
			// Check permissions
			const permissions = channel.permissionsFor(interaction.guild.members.me);
			if (!permissions.has(PermissionsBitField.Flags.Connect)) {
				await interaction.editReply({
					content: `The bot doesn't have permissions to join ${channel}`,
					ephemeral: true,
				});
				return;
			}
			// Connecting...
			const connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator,
			});
			connection.once(VoiceConnectionStatus.Ready, async () => {
				await interaction.editReply({
					content: `Joined in the ${channel}`,
					ephemeral: true,
				});
			});
		}

		await interaction.deferReply({ ephemeral: true });

		const channel = interaction.options.getChannel('channel');
		if (!channel) {
			if (!interaction.member.voice.channelId) {
				await interaction.editReply({
					content: 'You must first join a voice channel or explicitly specify the voice channel.',
					ephemeral: true,
				});
				return;
			}

			// Join the voice channel the user is in.
			join(interaction.member.voice.channel);
			return;
		}

		// Join the requested voice channel.
		join(channel);
	},
};
