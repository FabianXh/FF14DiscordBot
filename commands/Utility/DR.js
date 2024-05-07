const { SlashCommandBuilder } = require('@discordjs/builders');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('death_roll') // Changed to meet Discord's requirements
        .setDescription('DEATH ROLL!')
        .addIntegerOption((option) =>
            option
                .setName('number')
                .setDescription('Input the number to roll')
                .setRequired(true)
        ),
    async execute(interaction) {
        let input = interaction.options.getInteger('number');
        await interaction.reply(getRandomInt(input).toString());
    },
};
