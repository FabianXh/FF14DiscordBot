const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
} = require('discord.js');
const {
    performScraping,
    specificWorld,
} = require('../../Universalis/Universalis');
const { token } = require('../../config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
module.exports = {
    data: new SlashCommandBuilder()
        .setName('item-lookup')
        .setDescription('Looks up an item on the market board')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('Input the item name')
                .setRequired(true)
                .setAutocomplete(true)
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
        )
        .addBooleanOption((option) =>
            option
                .setName('hq')
                .setDescription(
                    'wether you want the bot to only return HQ options'
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
                interaction.options.getString('world'),
                interaction.options.getBoolean('hq')
            );
            await interaction.editReply({ embeds: [embededMassage] });
            return;
        }
        const embededMassage = await performScraping(
            input,
            interaction.options.getBoolean('hq')
        );
        await interaction.editReply({ embeds: [embededMassage] });
    },
};
client.login(token);
