const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');

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
        await interaction.deferReply();
        let input = interaction.options.getInteger('number');
        const embededMessageDR = new EmbedBuilder()
            .setTitle('DEATH ROLL!')
            .setDescription('Roll a number between 1 and the number you input')
            .addFields({
                name: 'ROLL',
                value: getRandomInt(input).toString(),
            });
        await interaction.editReply({ embeds: [embededMessageDR] });
    },
};
