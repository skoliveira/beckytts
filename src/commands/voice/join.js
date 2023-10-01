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
		await interaction.deferReply({ ephemeral: true });
		const me = await interaction.guild.members.fetchMe()
			.then(fetchedMember => { return fetchedMember; })
			.catch(console.error);
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
			// Check permissions
			const permissions = interaction.member.voice.channel.permissionsFor(me);
			if (!permissions.has(PermissionsBitField.Flags.Connect)) {
				await interaction.editReply({
					content: `The bot doesn't have permissions to join ${interaction.member.voice.channel}`,
					ephemeral: true,
				});
				return;
			}

			// Connecting...
			const connection = joinVoiceChannel({
				channelId: interaction.member.voice.channelId,
				guildId: interaction.guild.id,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});
			connection.once(VoiceConnectionStatus.Ready, async () => {
				await interaction.editReply({
					content: `Joined in the ${interaction.member.voice.channel}`,
					ephemeral: true,
				});
			});
			return;
		}

		// Join the requested voice channel.
		// Check permissions
		const permissions = channel.permissionsFor(me);
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
	},
};
