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
        )
        .addStringOption((option) =>
            option
                .setName('world')
                .setDescription(
                    'optional world that you specifically want to search'
                )
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
        if (interaction.options.getString('world') != null) {
            const embededMassage = await specificWorld(
                input,
                interaction.options.getString('world')
            );
            await interaction.editReply({ embeds: [embededMassage] });
            return;
        }
        const embededMassage = await performScraping(input);
        await interaction.editReply({ embeds: [embededMassage] });
    },
};
