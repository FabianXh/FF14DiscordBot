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
                .addChoices(
                    { name: 'Cerberus', value: 'Cerberus' },
                    { name: 'Louisoix', value: 'Louisoix' },
                    { name: 'Moogle', value: 'Moogle' },
                    { name: 'Omega', value: 'Omega' },
                    { name: 'Phantom', value: 'Phantom' },
                    { name: 'Ragnarok', value: 'Ragnarok' },
                    { name: 'Sagittarius', value: 'Sagittarius' },
                    { name: 'Spriggan', value: 'Spriggan' },
                    { name: 'Alpha', value: 'Alpha' },
                    { name: 'Lich', value: 'Lich' },
                    { name: 'Odin', value: 'Odin' },
                    { name: 'Phoenix', value: 'Phoenix' },
                    { name: 'Raiden', value: 'Raiden' },
                    { name: 'Shiva', value: 'Shiva' },
                    { name: 'Twintania', value: 'Twintania' },
                    { name: 'Zodiark', value: 'Zodiark' }
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
