import { SlashCommandBuilder } from 'discord.js';
import { getVoiceConnection, VoiceConnectionStatus } from '@discordjs/voice';

export default {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Make the bot leave its current voice channel.')
		.setDescriptionLocalizations({
			'da': 'Få robotten til at forlade sin nuværende talekanal.',
			'de': 'Das bewirkt, dass der Bot seinen aktuellen Sprachkanal verlässt.',
			'es-ES': 'Haz que el bot salga de su canal de voz actual.',
			'fr': 'Faites quitter au bot son salon vocal actuel.',
			'hr': 'Neka bot napusti svoj trenutni glasovni kanal.',
			'it': 'Fai uscire il bot dal suo canale vocale attuale.',
			'lt': 'Verčia bota palikti jo dabartinį balso kanalą.',
			'hu': 'Ezzel a paranccsal a bot elhagyja jelenlegi hangcsatornáját.',
			'nl': 'Deze opdracht laat de bot zijn huidige spraakkanaal verlaten.',
			'no': 'Dette får botten til å forlate sin nåværende talekanal.',
			'pl': 'Spraw, aby bot opuścił swoją aktualną kanał głosowy.',
			'pt-BR': 'Faz o bot sair de seu canal de voz atual.',
			'ro': 'Fă ca botul să părăsească canalul său vocal curent.',
			'fi': 'Käskytä bottia poistumaan nykyisestä puhekanavastaan.',
			'sv-SE': 'Få boten att lämna sin nuvarande röstkanal.',
			'vi': 'Làm cho bot rời khỏi kênh âm thanh hiện tại của nó.',
			'tr': 'Botun şu anki ses kanalından ayrılmasını sağla.',
			'cs': 'Dejte tomu botovi pokyn, aby opustil jeho aktuální hlasový kanál.',
			'el': 'Κάντε το bot να αφήσει τον τρέχοντα φωνητικό του κανάλι.',
			'bg': 'Направете бота да напусне текущия си гласов канал.',
			'ru': 'Заставьте бота покинуть текущий голосовой канал.',
			'uk': 'Змусьте бота залишити свій поточний голосовий канал.',
			'hi': 'बॉट को उसके वर्तमान आवाज चैनल से बाहर निकालें।',
			'th': 'ทำให้บอทออกจากช่องเสียงปัจจุบันของมัน',
			'zh-CN': '使机器人离开其当前的语音频道。',
			'ja': 'ボットを現在のボイスチャンネルから出させる。',
			'zh-TW': '将机器人退出其当前的语音频道。',
			'ko': '이 명령은 봇이 현재 음성 채널에서 나가도록합니다.',
		}),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		const meId = interaction.client.user.id;
		const voice = await interaction.guild.members.fetch({ user: meId, force: true })
			.then(fetchedMember => { return fetchedMember.voice; })
			.catch(console.error);
		if (voice.channelId) {
			const connection = getVoiceConnection(interaction.guild.id);
			connection.once(VoiceConnectionStatus.Disconnected, async () => {
				const locales = {
					'da': `Jeg forlod ${voice.channel}`,
					'de': `Ich bin nicht mehr im ${voice.channel}`,
					'es-ES': `Salí del ${voice.channel}`,
					'fr': `J'ai quitté le ${voice.channel}`,
					'hr': `Napustila sam ${voice.channel}`,
					'it': `Ho lasciato il ${voice.channel}`,
					'lt': `Palikau ${voice.channel}`,
					'hu': `${voice.channel}-t elhagytam.`,
					'nl': `${voice.channel} heb ik verlaten.`,
					'no': `Jeg forlot ${voice.channel}`,
					'pl': `Opuściłam kanał głosowy ${voice.channel}`,
					'pt-BR': `Eu saí de ${voice.channel}`,
					'ro': `Am părăsit ${voice.channel}`,
					'fi': `Jätin ${voice.channel}`,
					'sv-SE': `Jag lämnade ${voice.channel}`,
					'vi': `Tôi đã rời khỏi ${voice.channel}`,
					'tr': `${voice.channel} kanalından ayrıldım.`,
					'cs': `Opustila jsem ${voice.channel}`,
					'el': `Έφυγα από το ${voice.channel}`,
					'bg': `Напуснах ${voice.channel}`,
					'ru': `Я покинула ${voice.channel}`,
					'uk': `Я покинула ${voice.channel}`,
					'hi': `${voice.channel} मैंने छोड़ दिया।`,
					'th': `ฉันออกจาก ${voice.channel}`,
					'zh-CN': `我离开了 ${voice.channel}`,
					'ja': `${voice.channel} を退出しました`,
					'zh-TW': `我離開了 ${voice.channel}`,
					'ko': `${voice.channel}에서 나갔습니다`,
				};
				await interaction.editReply({
					content: locales[interaction.locale] ?? `I left the ${voice.channel}`,
					ephemeral: true,
				});
				if (connection && connection.state.status !== VoiceConnectionStatus.Destroyed) {
					connection.destroy();
				}
			});
			connection.disconnect();
		}
		else {
			const locales = {
				'da': 'Jeg er ikke i nogen talekanal.',
				'de': 'Ich bin in keinem Sprachkanal.',
				'es-ES': 'No estoy en ningún canal de voz.',
				'fr': 'Je ne suis dans aucun salon vocal.',
				'hr': 'Nisam u nijednom glasovnom kanalu.',
				'it': 'Non sono in nessun canale vocale.',
				'lt': 'Aš ne esu jokio balso kanale.',
				'hu': 'Nem vagyok egyetlen hangcsatornában sem.',
				'nl': 'Ik ben niet in een spraakkanaal.',
				'no': 'Jeg er ikke i noen talekanal.',
				'pl': 'Nie jestem w żadnym kanale głosowym.',
				'pt-BR': 'Não estou em nenhum canal de voz.',
				'ro': 'Nu sunt în niciun canal vocal.',
				'fi': 'En ole missään puhekanavassa.',
				'sv-SE': 'Jag är inte i någon röstkanal.',
				'vi': 'Tôi không ở trong bất kỳ kênh thoại nào.',
				'tr': 'Hiçbir ses kanalında değilim.',
				'cs': 'Nejsem v žádném hlasovém kanálu.',
				'el': 'Δεν βρίσκομαι σε κανένα κανάλι ομιλίας.',
				'bg': 'Не съм в нито един гласов канал.',
				'ru': 'Я не нахожусь в каком-либо голосовом канале.',
				'uk': 'Я не знаходжусь в жодному голосовому каналі.',
				'hi': 'मैं किसी भी आवाज़ चैनल में नहीं हूँ।',
				'th': 'ฉันไม่ได้อยู่ในช่องเสียงใดๆ',
				'zh-CN': '我不在任何语音频道中。',
				'ja': '私はどのボイスチャンネルにもいません。',
				'zh-TW': '我不在任何語音頻道中。',
				'ko': '나는 어떤 음성 채널에도 있지 않습니다.',
			};
			await interaction.editReply({
				content: locales[interaction.locale] ?? 'I am not in any voice channel.',
				ephemeral: true,
			});
		}
	},
};
