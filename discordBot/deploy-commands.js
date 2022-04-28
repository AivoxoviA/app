const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { discordBot } = require('../config.json');
const { clientId, guildId, token } = discordBot;
const { Client } = require("discord-slash-commands-client");

const commands = [
	new SlashCommandBuilder().setName('ping')
    .setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server')
    .setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user')
    .setDescription('Replies with user info!'),
].map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.get(Routes.applicationGuildCommands(clientId, guildId))
.then(data => {
    const promises = [];
    for (const command of data) {
        const deleteUrl = `${
          Routes.applicationGuildCommands(clientId, guildId)
        }/${command.id}`;
        promises.push(rest.delete(deleteUrl));
    }

    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
      .then(() => console.log('Successfully registered application commands.'))
      .catch(console.error);

    return Promise.all(promises);
});
