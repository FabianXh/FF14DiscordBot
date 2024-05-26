const { SlashCommandBuilder } = require('@discordjs/builders');
const { getMessages, returnMessages } = require('./Poll.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('threads')
        .setDescription(
            'create a thread for each raid that got a cirtain number of votes'
        ),
    async execute(interaction) {
        const messages = getMessages();
        console.log(messages);
        console.log(messages.Message);
    },
};
