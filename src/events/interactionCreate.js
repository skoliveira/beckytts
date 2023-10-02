import { Events, Collection } from 'discord.js';

export default {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		const { cooldowns } = interaction.client;

		if (!cooldowns.has(command.data.name)) {
			cooldowns.set(command.data.name, new Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.data.name);
		const defaultCooldownDuration = 3;
		const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				const locales = {
					'da': `Vent venligst, du er på afkøling for \`${command.data.name}\`. Du kan bruge det igen <t:${expiredTimestamp}:R>.`,
					'de': `Bitte warten Sie, Sie befinden sich in einer Abkühlphase für \`${command.data.name}\`. Sie können es erneut verwenden <t:${expiredTimestamp}:R>.`,
					'es-ES': `Por favor, espera, estás en tiempo de reutilización para \`${command.data.name}\`. Puedes usarlo nuevamente <t:${expiredTimestamp}:R>.`,
					'fr': `Veuillez patienter, vous êtes en temps de recharge pour \`${command.data.name}\`. Vous pouvez l'utiliser à nouveau <t:${expiredTimestamp}:R>.`,
					'hr': `Pričekajte, nalazite se na hlađenju za \`${command.data.name}\`. Možete ga ponovno koristiti <t:${expiredTimestamp}:R>.`,
					'it': `Attendere prego, sei in cooldown per \`${command.data.name}\`. Puoi usarlo nuovamente <t:${expiredTimestamp}:R>.`,
					'lt': `Palaukite, esate atšaldyme dėl \`${command.data.name}\`. Galite jį vėl naudoti <t:${expiredTimestamp}:R>.`,
					'hu': `Kérjük, várjon, lehűlésen van \`${command.data.name}\`-ért. Újra használhatja <t:${expiredTimestamp}:R>.`,
					'nl': `Wacht even, je zit in een cooldown voor \`${command.data.name}\`. Je kunt het opnieuw gebruiken <t:${expiredTimestamp}:R>.`,
					'no': `Vennligst vent, du er på avkjøling for \`${command.data.name}\`. Du kan bruke det igjen <t:${expiredTimestamp}:R>.`,
					'pl': `Proszę czekać, jesteś na okresie odnowienia dla \`${command.data.name}\`. Możesz go ponownie użyć <t:${expiredTimestamp}:R>.`,
					'pt-BR': `Aguarde, você está em cooldown para \`${command.data.name}\`. Você pode usá-lo novamente <t:${expiredTimestamp}:R>.`,
					'ro': `Așteptați, sunteți într-un cooldown pentru \`${command.data.name}\`. Puteți să-l utilizați din nou <t:${expiredTimestamp}:R>.`,
					'fi': `Odota hetki, olet jäähdytysajalla \`${command.data.name}\`. Voit käyttää sitä uudelleen <t:${expiredTimestamp}:R>.`,
					'sv-SE': `Vänta, du är på cooldown för \`${command.data.name}\`. Du kan använda det igen <t:${expiredTimestamp}:R>.`,
					'vi': `Vui lòng chờ, bạn đang trong thời gian chờ cho \`${command.data.name}\`. Bạn có thể sử dụng nó lại <t:${expiredTimestamp}:R>.`,
					'tr': `Lütfen bekleyin, \`${command.data.name}\` için bir bekleme süresindesiniz. Tekrar kullanabilirsiniz <t:${expiredTimestamp}:R>.`,
					'cs': `Počkejte prosím, jste na cooldownu pro \`${command.data.name}\`. Můžete ho znovu použít <t:${expiredTimestamp}:R>.`,
					'el': `Παρακαλώ περιμένετε, βρίσκεστε σε κατάσταση αναμονής για \`${command.data.name}\`. Μπορείτε να το χρησιμοποιήσετε ξανά <t:${expiredTimestamp}:R>.`,
					'bg': `Моля, изчакайте, в момента сте на охлаждане за \`${command.data.name}\`. Можете да го използвате отново <t:${expiredTimestamp}:R>.`,
					'ru': `Пожалуйста, подождите, вы находитесь в режиме ожидания для \`${command.data.name}\`. Вы можете использовать его снова <t:${expiredTimestamp}:R>.`,
					'uk': `Будь ласка, зачекайте, ви перебуваєте в режимі очікування для \`${command.data.name}\`. Ви можете використовувати його знову <t:${expiredTimestamp}:R>.`,
					'hi': `कृपया प्रतीक्षा करें, आप \`${command.data.name}\` के लिए कूलडाउन पर हैं। आप इसका फिर से उपयोग कर सकते हैं <t:${expiredTimestamp}:R>।`,
					'th': `โปรดรอสักครู่ คุณกำลังอยู่ในช่วงระยะเวลาหยุด \`${command.data.name}\` คุณสามารถใช้มันอีกครั้ง <t:${expiredTimestamp}:R>.`,
					'zh-CN': `请稍等，您正在\`${command.data.name}\`的冷却时间内。您可以在 <t:${expiredTimestamp}:R> 后再次使用它。`,
					'ja': `お待ちください、\`${command.data.name}\` のクールダウン中です。 <t:${expiredTimestamp}:R> 後に再度使用できます。`,
					'zh-TW': `請稍候，您正在\`${command.data.name}\`的冷卻時間內。您可以在 <t:${expiredTimestamp}:R> 後再次使用它。`,
					'ko': `기다려주세요, \`${command.data.name}\`에 대한 쿨다운 중입니다. <t:${expiredTimestamp}:R> 후에 다시 사용할 수 있습니다.`,
				};
				return interaction.reply({
					content: locales[interaction.locale] ?? `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
					ephemeral: true,
				});
			}
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
	},
};
