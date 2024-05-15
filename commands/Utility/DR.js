const {
    ButtonStyle,
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
} = require('discord.js');

const row = new ActionRowBuilder();

const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;
let roll = 0;
const getRoll = () => roll;
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
        const input = interaction.options.getInteger('number');
        roll = getRandomInt(input);

        await interaction.editReply({
            embeds: [createEmbedMessage(input, roll, interaction.user)],
            components: [row],
        });
    },
    createEmbedMessage,
    endOfGame,
    row,
    getRoll,
};
