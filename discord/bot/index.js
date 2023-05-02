console.log('discord bot loading...');

const { Client, Events, GatewayIntentBits } = require('discord.js');
let token;
console.log(token);

const fs = require('fs');
const configFile = 'config.json';

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

client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(token);