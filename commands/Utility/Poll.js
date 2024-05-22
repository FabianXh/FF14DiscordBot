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
        )
        .addIntegerOption((option) =>
            option
                .setName('amount')
                .setDescription(
                    'ammount of polls to create (a poll is a 2 hour block)  '
                )
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName('duration')
                .setDescription('duration of each poll in hours')
                .setRequired(true)
        ),
    async execute(interaction) {
        let startTime = interaction.options.getString('start_time');
        let duration = interaction.options.getInteger('duration');
        startTime = parseInt(startTime.split(':')[0], 10);
        let endTime = startTime + 2;
        console.log(startTime);
        const poll = {
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
        };
        await interaction.reply({
            poll,
        });
        startTime = (startTime + 2) % 24;
        endTime = (startTime + 2) % 24;
        for (let i = 0; i < interaction.options.getInteger('amount') - 1; i++) {
            await interaction.followUp({
                poll,
            });

            startTime = (startTime + 2) % 24;
            endTime = (startTime + 2) % 24;
            poll.question.text = `Saturday ${startTime}:00-${endTime}:00 ST`;
        }
    },
};
