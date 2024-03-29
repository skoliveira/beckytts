import { SlashCommandBuilder, ChannelType, PermissionsBitField } from 'discord.js';
import { getVoiceConnection, joinVoiceChannel, VoiceConnectionStatus } from '@discordjs/voice';

export default {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Make the bot join the current voice channel or the specified voice channel.')
		.setDescriptionLocalizations({
			'da': 'Gør robotten deltage i den nuværende talekanal eller den angivne talekanal.',
			'de': 'Bitte den Bot dem aktuellen Sprachkanal oder dem angegebenen Sprachkanal beitreten lassen.',
			'es-ES': 'Haz que el bot se una al canal de voz actual o al canal de voz especificado.',
			'fr': 'Faites rejoindre le bot au salon vocal actuel ou au salon vocal spécifié.',
			'hr': 'Zatražite od bota da se pridruži trenutačnom glasovnom kanalu ili određenom glasovnom kanalu.',
			'it': 'Fai in modo che il bot si unisca al canale vocale attuale o al canale vocale specificato.',
			'lt': 'Sukurkite bota prisijungti prie esamo balso kanalo arba nurodyto balso kanalo.',
			'hu': 'A botot csatlakoztassa a jelenlegi hangcsatornához, vagy a megadott hangcsatornához.',
			'nl': 'Laat de bot het huidige voice-kanaal of het gespecificeerde voice-kanaal betreden.',
			'no': 'La boten bli med i den nåværende talekanalen eller den angitte talekanalen.',
			'pl': 'Zmusz bota do dołączenia do obecnego kanału głosowego lub określonego kanału głosowego.',
			'pt-BR': 'Faz o bot entrar no canal de voz atual ou no canal de voz especificado.',
			'ro': 'Fă ca bot-ul să se alăture canalului vocal curent sau canalului vocal specificat.',
			'fi': 'Tee botti liittymään nykyiseen puhekanavaan tai määriteltyyn puhekanavaan.',
			'sv-SE': 'Se till att botten ansluter till den aktuella röstkanalen eller den angivna röstkanalen.',
			'vi': 'Để bot tham gia vào kênh thoại hiện tại hoặc kênh thoại cụ thể được chỉ định.',
			'tr': "Bot'u şu anki ses kanalına veya belirtilen ses kanalına katılmasını sağla.",
			'cs': 'Připojte bota k aktuálnímu hlasovému kanálu nebo k určenému hlasovému kanálu.',
			'el': 'Κάντε το bot να συμμετέχει στο τρέχον κανάλι φωνής ή στο καθορισμένο κανάλι φωνής.',
			'bg': 'Задайте на бота да се присъедини към текущия гласов канал или към определения гласов канал.',
			'ru': 'Сделайте бота присоединиться к текущему голосовому каналу или указанному голосовому каналу.',
			'uk': 'Спонукайте бота приєднатися до поточного голосового каналу або вказаного голосового каналу.',
			'hi': 'बॉट को वर्तमान वॉयस चैनल या निर्दिष्ट वॉयस चैनल में शामिल करें।',
			'th': 'ทำให้บอทเข้าร่วมช่องเสียงปัจจุบันหรือช่องเสียงที่ระบุ',
			'zh-CN': '让机器人加入当前的语音频道或指定的语音频道。',
			'ja': 'ボットを現在のボイスチャンネルまたは指定されたボイスチャンネルに参加させてください。',
			'zh-TW': '讓機器人加入當前的語音頻道或指定的語音頻道。',
			'ko': '봇이 현재 음성 채널 또는 지정된 음성 채널에 참가하도록 만듭니다.'
		})
		.setDMPermission(false)
		.addChannelOption(option =>
			option
				.setName('channel')
				.setNameLocalizations({
					'da': 'talekanal',			// Danish
					'de': 'sprachkanal',		// German
					'es-ES': 'canal',			// SpanishES
					'fr': 'salon',				// French
					'hr': 'kanal',				// Croatian
					'it': 'canale',				// Italian
					'lt': 'kanalą',				// Lithuanian
					'hu': 'hangcsatorna',		// Hungarian
					'nl': 'voice-kanaal',		// Dutch
					'no': 'talekanal',			// Norwegian
					'pl': 'kanał',				// Polish
					'pt-BR': 'canal',			// PortugueseBR
					'ro': 'canal',				// Romanian
					'fi': 'puhekanava',			// Finnish
					'sv-SE': 'röstkanal',		// Swedish
					'vi': 'kênh',				// Vietnamese
					'tr': 'kanalı',				// Turkish
					'cs': 'kanál',				// Czech
					'el': 'καναλιού',			// Greek
					'bg': 'канал',				// Bulgarian
					'ru': 'канал',				// Russian
					'uk': 'канал',				// Ukrainian
					'hi': 'चैनल',				// Hindi
					'th': 'ช่องเสียง',			// Thai
					'zh-CN': '语音频道',		// ChineseCN
					'ja': 'ボイスチャンネル',	// Japanese
					'zh-TW': '語音頻道',		// ChineseTW
					'ko': '채널'				// Korean
				})
				.setDescription('The voice channel to join into.')
				.setDescriptionLocalizations({
					'da': 'Den talekanal, som du vil deltage i.',
					'de': 'Der Sprachkanal, dem du beitreten möchtest.',
					'es-ES': 'El canal de voz al que unirse.',
					'fr': 'Le salon vocal à rejoindre.',
					'hr': 'Glasovni kanal u koji želite ući.',
					'it': 'Il canale vocale a cui unirsi.',
					'lt': 'Balso kanalas, į kurį prisijungti.',
					'hu': 'A hangcsatorna, amelyhez csatlakozni szeretnél.',
					'nl': 'Het voice-kanaal om aan deel te nemen.',
					'no': 'Talekanalen å delta i.',
					'pl': 'Kanał głosowy, do którego dołączyć.',
					'pt-BR': 'O canal de voz para entrar.',
					'ro': 'Canalul vocal în care să te alături.',
					'fi': 'Puhekanava, johon liittyä.',
					'sv-SE': 'Röstrummet att ansluta till.',
					'vi': 'Kênh thoại để tham gia.',
					'tr': 'Katılmak istediğiniz ses kanalı.',
					'cs': 'Hlasový kanál, do kterého se připojit.',
					'el': 'Το κανάλι φωνητικών για σύνδεση.',
					'bg': 'Гласовият канал, в който да се присъедините.',
					'ru': 'Голосовой канал для присоединения.',
					'uk': 'Голосовий канал для приєднання.',
					'hi': 'जुड़ने के लिए आवाज़ चैनल।',
					'th': 'ช่องเสียงที่ต้องการเข้าร่วม',
					'zh-CN': '要加入的语音频道。',
					'ja': '参加する音声チャンネル。',
					'zh-TW': '要加入的語音頻道。',
					'ko': '참여할 음성 채널.'
				})
				.addChannelTypes(ChannelType.GuildVoice)
				.setRequired(false)),
	async execute(interaction) {
		if (!interaction.deferred) {
			await interaction.deferReply({ ephemeral: true });
		}

		async function join(channel) {
			const meId = interaction.client.user.id;
			const me = await interaction.guild.members.fetch({ user: meId, force: true })
				.then(fetchedMember => { return fetchedMember; })
				.catch(console.error);

			// Check permissions
			const permissions = me.permissionsIn(channel);
			if (!permissions.has([
				PermissionsBitField.Flags.ViewChannel,
				PermissionsBitField.Flags.Connect
			])) {
				const locales = {
					'da': `Jeg har ikke tilladelse til at deltage i ${channel}`,
					'de': `${channel} kann ich aufgrund fehlender Berechtigungen nicht betreten.`,
					'es-ES': `No tengo permiso para unirme a ${channel}`,
					'fr': `Je n'ai pas la permission de rejoindre ${channel}`,
					'hr': `Nemam dozvolu za pridruživanje ${channel}`,
					'it': `Non ho il permesso di unirmi a ${channel}`,
					'lt': `Mano netenkama leidimo prisijungti prie ${channel}.`,
					'hu': `${channel} hangcsatornához nincs jogosultságom csatlakozni.`,
					'nl': `Vanwege een gebrek aan toestemming kan ik niet deelnemen aan de ${channel}`,
					'no': `Jeg har ikke tillatelse til å bli med i ${channel}`,
					'pl': `Nie mam pozwolenia, aby dołączyć do ${channel}`,
					'pt-BR': `Não tenho permissão para entrar em ${channel}`,
					'ro': `Nu am permisiunea să mă alătur la ${channel}`,
					'fi': `Minulla ei ole lupaa liittyä ${channel}`,
					'sv-SE': `Jag har inte behörighet att gå med i ${channel}`,
					'vi': `Tôi không có quyền tham gia vào ${channel}`,
					'tr': `${channel}'e katılma iznim yok.`,
					'cs': `Nemám oprávnění připojit se k ${channel}`,
					'el': `Δεν έχω άδεια να ενταχθώ στο κανάλι ${channel}`,
					'bg': `Нямам разрешение да се присъединя към ${channel}`,
					'ru': `У меня нет разрешения на присоединение к ${channel}`,
					'uk': `У мене немає дозволу приєднатися до ${channel}`,
					'hi': `${channel} में शामिल होने की मेरी अनुमति नहीं है।`,
					'th': `ฉันไม่มีสิทธิ์เข้าร่วม ${channel}`,
					'zh-CN': `我没有权限加入${channel}`,
					'ja': `${channel}に参加する権限がありません。`,
					'zh-TW': `我沒有權限加入${channel}`,
					'ko': `${channel}에 참여할 권한이 없습니다.`
				};
				await interaction.editReply({
					content: locales[interaction.locale] ?? `I don't have permission to join the ${channel}`,
					ephemeral: true
				});
				return;
			}

			// Check if it's already connected
			let connection = getVoiceConnection(interaction.guild.id);
			if (connection) {
				// If it's already in the same channel -> notfy and return
				if (me.voice.channelId === channel.id) {
					if (interaction.commandName === 'join') {
						const locales = {
							'da': `Jeg er allerede i ${channel}`,
							'de': `Ich bin bereits im ${channel}`,
							'es-ES': `Ya estoy en ${channel}`,
							'fr': `Je suis déjà en ${channel}`,
							'hr': `Već sam u ${channel}`,
							'it': `Sono già in ${channel}`,
							'lt': `Aš jau esu ${channel}`,
							'hu': `Már benne vagyok a ${channel}`,
							'nl': `Ik ben al in het ${channel}`,
							'no': `Jeg er allerede i ${channel}`,
							'pl': `Jestem już w ${channel}`,
							'pt-BR': `Já estou em ${channel}`,
							'ro': `Sunt deja în ${channel}`,
							'fi': `Olen jo ${channel}`,
							'sv-SE': `Jag är redan i ${channel}`,
							'vi': `Tôi đã ở trong kênh âm thanh ${channel}`,
							'tr': `Zaten kanaldayım, ${channel}`,
							'cs': `Už jsem v ${channel}`,
							'el': `Ήδη είμαι στο ${channel}`,
							'bg': `Вече съм в ${channel}`,
							'ru': `Я уже в ${channel}`,
							'uk': `Я вже в ${channel}`,
							'hi': `${channel} में मैं पहले से ही हूँ।`,
							'th': `ฉันอยู่ในห้องเสียงช่อง ${channel}`,
							'zh-CN': `${channel}我已经在了。`,
							'ja': `${channel}にもういます。`,
							'zh-TW': `${channel}我已經在了。`,
							'ko': `${channel}에 이미 있어.`
						};
						await interaction.editReply({
							content: locales[interaction.locale] ?? `I'm already in ${channel}`,
							ephemeral: true
						});
					}
					return connection;
				}
			}

			// Connecting...
			connection = joinVoiceChannel({
				channelId: channel.id,
				guildId: channel.guild.id,
				adapterCreator: channel.guild.voiceAdapterCreator
			});
			connection.once(VoiceConnectionStatus.Ready, async () => {
				if (interaction.commandName === 'join') {
					const locales = {
						'da': `Jeg tilsluttede ${channel}`,
						'de': `Ich bin in ${channel}`,
						'es-ES': `Me uní a ${channel}`,
						'fr': `J'ai rejoint ${channel}`,
						'hr': `Upala sam u ${channel}`,
						'it': `Mi sono unita a ${channel}`,
						'lt': `Aš prisijungiau prie ${channel}`,
						'hu': `${channel}-ba csatlakoztam.`,
						'nl': `Ik ben in ${channel}`,
						'no': `Jeg ble med i ${channel}`,
						'pl': `Przyłączyłam się do ${channel}`,
						'pt-BR': `Eu entrei em ${channel}`,
						'ro': `M-am alăturat ${channel}`,
						'fi': `Liityin juuri ${channel}`,
						'sv-SE': `Jag anslöt till ${channel}`,
						'vi': `Tôi vừa vào ${channel}`,
						'tr': `${channel} kanalındayım.`,
						'cs': `Připojila jsem se do ${channel}`,
						'el': `Είμαι στο ${channel}`,
						'bg': `Влязох в ${channel}`,
						'ru': `Я присоединилась к ${channel}`,
						'uk': `Я приєдналася до ${channel}`,
						'hi': `मैं ${channel} में हूँ।`,
						'th': `ฉันเข้าร่วม ${channel} ค่ะ`,
						'zh-CN': `我加入了 ${channel}。`,
						'ja': `「${channel}」に参加しました。`,
						'zh-TW': `我加入了 ${channel}。`,
						'ko': `${channel}에 가입했습니다.`
					};
					await interaction.editReply({
						content: locales[interaction.locale] ?? `I joined ${channel}`,
						ephemeral: true
					});
				}
			});
			return connection;
		}

		const targetChannel = interaction.options.getChannel('channel');
		if (!targetChannel) {
			if (!interaction.member.voice.channelId) {
				const locales = {
					'da': 'Du skal først deltage i en talekanal eller eksplicit angive talekanalen.',
					'de': 'Du musst zuerst einem Sprachkanal beitreten oder den Sprachkanal explizit angeben.',
					'es-ES': 'Debes unirte primero a un canal de voz o especificar explícitamente el canal.',
					'fr': "Vous devez d'abord rejoindre un salon vocal ou spécifier explicitement le salon.",
					'hr': 'Prvo se morate pridružiti glasovnom kanalu ili eksplicitno navesti glasovni kanal.',
					'it': 'Devi prima unirti a un canale vocale o specificare esplicitamente il canale.',
					'lt': 'Pirmiausiai turite prisijungti prie balso kanalo arba aiškiai nurodyti balso kanalą.',
					'hu': 'Először csatlakoznod kell egy hangcsatornához, vagy egyértelműen meg kell adnod a hangcsatornát.',
					'nl': 'Je moet eerst lid worden van een spraakkanaal of expliciet het spraakkanaal opgeven.',
					'no': 'Du må først bli med i en talekanal eller eksplicit angi talekanalen.',
					'pl': 'Najpierw musisz dołączyć do kanału głosowego lub jawnie określić kanał głosowy.',
					'pt-BR': 'Você deve primeiro entrar em um canal de voz ou especificar explicitamente o canal.',
					'ro': 'Trebuie să te alături mai întâi unui canal vocal sau să specifici explicit canalul.',
					'fi': 'Sinun täytyy ensin liittyä puhekanavaan tai määrittää puhekanava nimenomaisesti.',
					'sv-SE': 'Du måste först gå med i en röstkanal eller ange röstkanalen explicit.',
					'vi': 'Bạn phải trước tiên tham gia vào một kênh thoại hoặc chỉ định kênh thoại một cách rõ ràng.',
					'tr': 'Önce bir ses kanalına katılmalı veya ses kanalını açıkça belirtmelisiniz.',
					'cs': 'Musíte se nejprve připojit k hlasovému kanálu nebo explicitně určit hlasový kanál.',
					'el': 'Πρέπει πρώτα να εγγραφείτε σε ένα φωνητικό κανάλι ή να καθορίσετε ρητά το φωνητικό κανάλι.',
					'bg': 'Трябва първо да се присъедините към гласов канал или явно да посочите канала.',
					'ru': 'Вы должны сначала присоединиться к голосовому каналу или явно указать канал.',
					'uk': 'У вас спершу повинно бути приєднано до голосового каналу або явно вказано канал.',
					'hi': 'आपको पहले एक आवाज चैनल में शामिल होना होगा या स्पष्ट रूप से आवाज चैनल की घोषणा करनी होगी।',
					'th': 'คุณจะต้องเข้าร่วมช่องเสียงก่อนหรือระบุช่องเสียงโดยชัดเจนก่อน',
					'zh-CN': '您必须首先加入一个语音频道或明确指定语音频道。',
					'ja': '最初に音声チャンネルに参加するか、音声チャンネルを明示的に指定する必要があります。',
					'zh-TW': '您必須首先加入一個語音頻道或明確指定語音頻道。',
					'ko': '먼저 음성 채널에 참가하거나 명시적으로 음성 채널을 지정해야 합니다.'
				};
				await interaction.editReply({
					content: locales[interaction.locale] ?? 'You must first join a voice channel or explicitly specify the voice channel.',
					ephemeral: true
				});
				return;
			}

			// Join the voice channel the user is in.
			return await join(interaction.member.voice.channel);
		}

		// Join the requested voice channel.
		return await join(targetChannel);
	}
};
