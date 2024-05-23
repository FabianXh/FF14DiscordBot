const { SlashCommandBuilder } = require('@discordjs/builders');
const { ReturnMessages } = require('../../index');

let messages = [];

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
        .addStringOption((option) =>
            option
                .setName('raids')
                .setDescription('raids to poll')
                .setRequired(true)
                .setAutocomplete(true)
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
        const answer = interaction.options.getString('raids');
        answers = answer.split(',');
        const poll = {
            question: {
                text: `Saturday ${startTime}:00-${endTime}:00 ST ${answers[5]}`,
            },
            answers: [
                { text: answers[0] },
                { text: answers[1] },
                { text: answers[2] },
                { text: answers[3] },
                { text: answers[4] },
            ],
            duration: duration,
            allowMultiselect: true,
        };

        let massage = await interaction.reply({
            poll,
        });
        messages.push(massage);
        startTime = (startTime + 2) % 24;
        endTime = (startTime + 2) % 24;
        for (let i = 0; i < interaction.options.getInteger('amount') - 1; i++) {
            poll.question.text = `Saturday ${startTime}:00-${endTime}:00 ST`;
            message = await interaction.followUp({
                poll,
            });
            messages.push(message);
            startTime = (startTime + 2) % 24;
            endTime = (startTime + 2) % 24;
        }
        console.log(messages);
        ReturnMessages(messages);
    },
};
