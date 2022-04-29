const { SlashCommandBuilder } = require('@discordjs/builders');
const ms = require('ms');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
    const messages = await interaction.channel.awaitMessages({
      filter: m => m.author.id === interaction.user.id,
      max: 2,
      time: 30e3,
      errors: ['time'],
    });

    const difference = messages.last().createdTimestamp - messages.first().createdTimestamp;
    const formatted = ms(difference);

    await interaction.followUp(`You sent the two messages ${formatted} apart.`);
	},
};
