const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('poll testing'),
    async execute(interaction) {
        await interaction.reply({
            poll: {
                question: { text: 'Saturday 13:00-15:00 ST' },
                answers: [
                    { text: 'p9s' },
                    { text: 'p10s' },
                    { text: 'p11s' },
                    { text: 'p12s p1' },
                    { text: 'p12s p2' },
                ],
                duration: 1,
                allowMultiselect: true,
            },
        });
        await interaction.followUp({
            poll: {
                question: { text: 'Saturday 15:00-17:00 ST' },
                answers: [
                    { text: 'p9s' },
                    { text: 'p10s' },
                    { text: 'p11s' },
                    { text: 'p12s p1' },
                    { text: 'p12s p2' },
                ],
                duration: 1,
                allowMultiselect: true,
            },
        });
        await interaction.followUp({
            poll: {
                question: { text: 'Saturday 17:00-19:00 ST' },
                answers: [
                    { text: 'p9s' },
                    { text: 'p10s' },
                    { text: 'p11s' },
                    { text: 'p12s p1' },
                    { text: 'p12s p2' },
                ],
                duration: 1,
                allowMultiselect: true,
            },
        });
        await interaction.followUp({
            poll: {
                question: { text: 'Saturday 19:00-21:00 ST' },
                answers: [
                    { text: 'p9s' },
                    { text: 'p10s' },
                    { text: 'p11s' },
                    { text: 'p12s p1' },
                    { text: 'p12s p2' },
                ],
                duration: 1,
                allowMultiselect: true,
            },
        });
        await interaction.followUp({
            poll: {
                question: { text: 'Saturday 21:00-23:00 ST' },
                answers: [
                    { text: 'p9s' },
                    { text: 'p10s' },
                    { text: 'p11s' },
                    { text: 'p12s p1' },
                    { text: 'p12s p2' },
                ],
                duration: 1,
                allowMultiselect: true,
            },
        });
    },
};
