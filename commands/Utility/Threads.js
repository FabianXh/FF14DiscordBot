const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('threads')
        .setDescription(
            'create a thread for each raid that got a cirtain number of votes'
        ),
    async execute(interaction) {
        await interaction.reply('');
    },
};
