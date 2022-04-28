console.log(`...initializing discord bot...`);

const { Client, Intents } = require('discord.js');
const { discordBot } = require('../config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
	console.log('Discord Bot Ready!');
});

client.login(discordBot.token);
