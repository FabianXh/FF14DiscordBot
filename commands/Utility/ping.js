const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('explain')
        .setDescription('when someone starts to explain something'),
    async execute(interaction) {
        await interaction.reply('Wenz Pull! <se.6>');
    },
};
