const deleting = process.argv[2];
const fs = require('node:fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { discordBot } = require('../config.json');
const { clientId, guildId, token } = discordBot;
const rest = new REST({ version: '9' }).setToken(token);

if (deleting) {
  rest.get(Routes.applicationGuildCommands(clientId, guildId))
  .then(data => {
    console.log(`deleting commands:`);
    const promises = [];
    for (const command of data) {
      console.log(command.name + `,`);
      const deleteUrl = `${
        Routes.applicationGuildCommands(clientId, guildId)
      }/${command.id}`;
      promises.push(rest.delete(deleteUrl));
    }
    return Promise.all(promises);
  });
}

if (deleting) return;

const commands = [];
const commandFiles = fs.readdirSync('./discordBot/commands')
  .filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}
console.log(`registering commands...`, commands.map(function(o) {
    return o.name;
}).join(", "));
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
