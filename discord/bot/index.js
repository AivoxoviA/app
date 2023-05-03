console.log('discord bot loading...');

const fs = require('fs');
const path = require('node:path');
const {
	Client, Collection, Events, GatewayIntentBits
} = require('discord.js');

const configFile = 'config.json';
let token;

try {
	if (fs.existsSync(`./${configFile}`)) {
		token = require(`../../${configFile}`).discord.bot.token;
	} else if (process.env.config) {
		console.log('using config env vars');
		token = JSON.parse(process.env.config).discord.bot.token; 
	} else {
		throw new Error('config couldn\'t be loaded!');
	}
} catch (e) {
	console.error(e);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

client.once(Events.ClientReady, () => {
	console.log('Ready!');
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);