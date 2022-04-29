console.log(`...initializing discord bot...`);

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
	console.log('Discord Bot Ready!');
});

client.on('interactionCreate', async interaction => {
  console.log(`interactionCreate - command:`, interaction.commandName);
	if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
	if (!command) return;
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({
      content: 'There was an error while executing this command!', ephemeral: true
    });
	}
});

client.login(discordBot.token);
