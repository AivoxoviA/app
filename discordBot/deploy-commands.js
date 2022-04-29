const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { discordBot } = require('../config.json');
const { clientId, guildId, token } = discordBot;

const commands = [
	new SlashCommandBuilder().setName('ping')
    .setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server')
    .setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user')
    .setDescription('Replies with user info!'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);
const deleting = !true;

if (deleting) {
  rest.get(Routes.applicationGuildCommands(clientId, guildId))
  .then(data => {
    const promises = [];
      for (const command of data) {
        console.log(command);
        const deleteUrl = `${
          Routes.applicationGuildCommands(clientId, guildId)
        }/${command.id}`;
        promises.push(rest.delete(deleteUrl));
      }
      return Promise.all(promises);
  });
}

if (deleting) return;
console.log(`registering commands...`, commands);
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
