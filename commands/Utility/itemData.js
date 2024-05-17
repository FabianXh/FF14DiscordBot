const { SlashCommandBuilder } = require('discord.js');
const { getItemId } = require('../../Universalis/FFXIVAPI');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('item-data')
        .setDescription('Provides data about an item')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('Input the item name')
                .setRequired(true)
                .setAutocomplete(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const input = interaction.options.getString('name');
        const itemMessage = await getItemId(input);
        if (!itemMessage) {
            await interaction.editReply('Item not found.');
            return;
        }
        await interaction.editReply({ embeds: [itemMessage] });
    },
};
