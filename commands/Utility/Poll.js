const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('poll testing')
        .addStringOption((option) =>
            option
                .setName('start_time')
                .setDescription(
                    'first poll start time in 24 hour format (e.g. 9 for 9:00 ST)'
                )
                .setRequired(true)
        ),
    async execute(interaction) {
        let startTime = interaction.options.getString('start_time');
        startTime = parseInt(startTime.split(':')[0], 10);
        let endTime = startTime + 2;
        console.log(startTime);

        await interaction.reply({
            poll: {
                question: {
                    text: `Saturday ${startTime}:00-${endTime}:00 ST`,
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
        startTime = (startTime + 2) % 24;
        endTime = (startTime + 2) % 24;
        await interaction.followUp({
            poll: {
                question: {
                    text: `Saturday ${startTime}:00-${endTime}:00 ST`,
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
        startTime = (startTime + 2) % 24;
        endTime = (startTime + 2) % 24;
        await interaction.followUp({
            poll: {
                question: {
                    text: `Saturday ${startTime}:00-${endTime}:00 ST`,
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
        startTime = (startTime + 2) % 24;
        endTime = (startTime + 2) % 24;
        await interaction.followUp({
            poll: {
                question: {
                    text: `Saturday ${startTime}:00-${endTime}:00 ST`,
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
        startTime = (startTime + 2) % 24;
        endTime = (startTime + 2) % 24;
        await interaction.followUp({
            poll: {
                question: {
                    text: `Saturday ${startTime}:00-${endTime}:00 ST`,
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
