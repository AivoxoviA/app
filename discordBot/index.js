const log = require('../utils/log');
log.info(`initializing discord bot`);

const fs = require('node:fs');
const { Client, Intents, Collection } = require('discord.js');
const { discordBot } = require('../config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./discordBot/commands')
  .filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	log.info('Discord Bot Ready!');
});

client.on('interactionCreate', async interaction => {
  log(`interactionCreate - command:`, interaction.commandName);
	if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
      content: 'There was an error while executing this command!'
      , ephemeral: true
    });
	}
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

client.login(discordBot.token);
