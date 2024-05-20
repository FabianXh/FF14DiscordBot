const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('poll testing')
        .addIntegerOption((option) =>
            option
                .setName('start_time')
                .setDescription(
                    'first poll start time (hour only) 13 would be 13:00 ST'
                )
                .setRequired(true)
        ),
    async execute(interaction) {
        let startTime = interaction.options.getInteger('start_time');
        console.log(startTime);
        await interaction.reply({
            poll: {
                question: {
                    text: `Saturday ${startTime}:00-${startTime + 2}:00 ST`,
                },
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
                question: {
                    text: `Saturday ${startTime + 2}:00-${startTime + 4}:00 ST`,
                },
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
                question: {
                    text: `Saturday ${startTime + 4}:00-${startTime + 6}:00 ST`,
                },
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
                question: {
                    text: `Saturday ${startTime + 6}:00-${startTime + 8}:00 ST`,
                },
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
                question: {
                    text: `Saturday ${startTime + 8}:00-${
                        startTime + 10
                    }:00 ST`,
                },
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
