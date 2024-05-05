const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gaming")
    .setDescription("Makes Tygan do the thing")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.reply(`<se.6> WENZ PULL ${option}`);
  },
};
