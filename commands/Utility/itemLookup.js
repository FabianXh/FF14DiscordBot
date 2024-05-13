const { SlashCommandBuilder } = require('@discordjs/builders');
const {
    performScraping,
    specificWorld,
} = require('../../Universalis/Universalis');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('item-lookup')
        .setDescription('Looks up an item on the market board')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('Input the item name')
                .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();
        let input = interaction.options.getString('name');
        if (!input) {
            console.log('No input provided.');
            return;
        }
        input = input
            .split(' ')
            .map((word) =>
                word === 'of'
                    ? word
                    : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');
        const embededMassage = await performScraping(input);
        await interaction.editReply({ embeds: [embededMassage] });
    },
};
