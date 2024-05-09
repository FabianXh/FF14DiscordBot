const {
    Client,
    GatewayIntentBits,
    ButtonStyle,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
} = require('discord.js');
const { token } = require('../../config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const row = new ActionRowBuilder();

const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;

row.addComponents(
    new ButtonBuilder()
        .setCustomId('rollMore')
        .setLabel('Roll')
        .setStyle(ButtonStyle.Danger)
);

const createEmbedMessage = (input, roll, target) =>
    new EmbedBuilder()
        .setColor('DC143C')
        .setTitle('DEATH ROLL!')
        .setDescription(`Rolling a number between 1 and ${input}...`)
        .setAuthor({
            name: target.displayName || target.username,
            iconURL: target.displayAvatarURL(),
        })
        .addFields({ name: 'RESULT', value: roll.toString() });

const endOfGame = (target) =>
    new EmbedBuilder()
        .setColor('DC143C')
        .setTitle('DEATH ROLL!')
        .setDescription(`You Lost!`)
        .setAuthor({
            name: target.displayName || target.username,
            iconURL: target.displayAvatarURL(),
        });

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
        console.log(interaction);
        const input = interaction.options.getInteger('number');
        let roll = getRandomInt(input);

        client.on('interactionCreate', (interaction) => {
            if (
                !interaction.isButton() ||
                interaction.customId !== 'rollMore'
            ) {
                return;
            }

            let oldMax = roll;
            roll = getRandomInt(oldMax);

            if (roll === 1) {
                interaction.deferReply();
                interaction.editReply({
                    embeds: [endOfGame(input, roll, interaction.user)],
                    components: [],
                });
                return;
            }

            interaction.reply({
                embeds: [createEmbedMessage(oldMax, roll, interaction.user)],
                components: [row],
            });
        });

        await interaction.editReply({
            embeds: [createEmbedMessage(input, roll, interaction.user)],
            components: [row],
        });
    },
};

client.login(token);
