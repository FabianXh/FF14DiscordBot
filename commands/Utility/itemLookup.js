const { SlashCommandBuilder } = require("@discordjs/builders");
const { performScraping } = require("../../Universalis/Universalis");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("item-lookup")
        .setDescription("Looks up an item on the market board")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("Input the item name")
                .setRequired(true)
        ),
    async execute(interaction) {
        const input = interaction.options.getString("name");
        await interaction.reply(
            `<se.6> WENZ PULL ` + (await performScraping(input))
        );
    },
};
