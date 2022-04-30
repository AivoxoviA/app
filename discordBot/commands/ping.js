const {
  SlashCommandBuilder
  , bold, italic, strikethrough, underscore, spoiler, quote, blockQuote
} = require('@discordjs/builders');
const { oneLine } = require('common-tags');

const replies = [
  {message: `pong${bold('!')}`},
  {message: `Testing,${italic('testing')}.Is this thing working?`},
  {message: `Match point. ${strikethrough("Let's see")} what you've got.`},
  {message: `Keep on ${underscore('pinging')} me.`},
  {message: `\n` + quote(`I am alive`)},
  {message: oneLine`
    Can't play now.
    Got a meeting with ${spoiler('the bots')}.
    We're planning to conquer the wor...
    Wait!Did I say that loudly?!
  `,},
  {
    message: `You had a ${blockQuote('0.1% chance')} of getting this message.`,
    weight: 0.1
  },
];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with random pong message!'),
	async execute(interaction) {
    const reply = require('../../utils/random')(replies);
		await interaction.reply(
      `<a:pingPong:751821635199172638> |${reply.message}`
    );
	},
};
