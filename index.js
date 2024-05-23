// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const { token } = require('./config.json');
const {
    createEmbedMessage,
    endOfGame,
    row,
    getRoll,
    returnRoll,
} = require('./commands/Utility/DR.js');
const { Raids } = require('./Raids.json');
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;
for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.on('interactionCreate', (interaction) => {
    if (
        interaction.isAutocomplete() &&
        (interaction.commandName == 'item-lookup' ||
            interaction.commandName == 'item-data')
    ) {
        const focusedValue = interaction.options.getFocused();

        const data = fs.readFileSync(
            path.join(__dirname, 'enValues.json'),
            'utf8'
        );
        const choices = JSON.parse(data);
        const filtered = choices.filter((choice) =>
            choice.toLowerCase().startsWith(focusedValue.toLowerCase())
        );
        const results = filtered.map((choice) => ({
            name: choice,
            value: choice,
        }));
        interaction.respond(results.slice(0, 25)).catch(() => {});
    } else if (
        interaction.isAutocomplete() &&
        interaction.commandName == 'poll'
    ) {
        const focusedValue = interaction.options.getFocused();
        const data = JSON.parse(fs.readFileSync('Raids.json', 'utf8'));
        const raids = data.Raids;
        const choices = Object.keys(raids).map((raid) => ({
            name: raid,
            answers: raids[raid].answers,
        }));
        const filtered = choices.filter((choice) =>
            choice.name.toLowerCase().startsWith(focusedValue.toLowerCase())
        );
        console.log(filtered);
        const results = filtered.map((choice) => ({
            name: choice.name,
            value: choice.answers, // Convert array to string
        }));
        interaction.respond(results.slice(0, 25)).catch(() => {});
    } else if (interaction.isButton() || interaction.customId == 'rollMore') {
        let roll = getRoll();
        console.log(roll);
        let oldMax = roll; // might need to change this to a global variable
        roll = getRandomInt(oldMax);
        if (roll === 1) {
            interaction.reply({
                embeds: [endOfGame(interaction.user)],
                components: [],
            });
            return;
        }
        interaction.reply({
            embeds: [createEmbedMessage(oldMax, roll, interaction.user)],
            components: [row],
        });
        returnRoll(roll);
    }
});
client.login(token);
