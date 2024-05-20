const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('poll testing'),
    async execute(interaction) {
        await interaction.reply({
            poll: {
                question: { text: 'some text here' },
                answers: [{ text: 'Aye' }, { text: 'Nay' }],
                duration: 1,
                allowMultiselect: false,
            },
        });
        await interaction.followUp({
            poll: {
                question: { text: 'some text here' },
                answers: [{ text: 'Aye' }, { text: 'Nay' }],
                duration: 1,
                allowMultiselect: false,
            },
        });
    },
};
