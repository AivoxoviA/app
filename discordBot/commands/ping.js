const {
  SlashCommandBuilder
} = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with random pong message!'),
	async execute(interaction) {
    const reply = require('../../utils/random')(require('../data/ping-replies'));
		await interaction.reply(
      `<a:pingPong:751821635199172638> ${reply.message}`
    );
	},
};
