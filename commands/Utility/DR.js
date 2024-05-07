const { SlashCommandBuilder, MessageEmbed } = require('@discordjs/builders');

const getRandomInt = (max) => Math.floor(Math.random() * max);

const createEmbedMessage = (input, roll) =>
    new MessageEmbed()
        .setTitle('DEATH ROLL!')
        .setDescription(`Roll a number between 1 and ${input}`)
        .addFields({ name: 'ROLL', value: roll.toString() });

module.exports = {
    data: new SlashCommandBuilder()
        .setName('death_roll')
        .setDescription('DEATH ROLL!')
        .addIntegerOption((option) =>
            option
                .setName('number')
                .setDescription('Input the number to roll')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const input = interaction.options.getInteger('number');
        const roll = getRandomInt(input);
        const embededMessageDR = createEmbedMessage(input, roll);
        await interaction.editReply({ embeds: [embededMessageDR] });
    },
};
