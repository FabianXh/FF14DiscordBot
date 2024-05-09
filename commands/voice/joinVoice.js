const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require("@discordjs/voice");
const { ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("joinvc")
    .setDescription("Join vc")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("VC channel to join")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice)
    ),
  async execute(interaction) {
    if (interaction.commandName === "joinvc") {
      const connect = joinVoiceChannel({
        channelId: interaction.options.getChannel("channel").id,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
    }
    await interaction.reply("Wenz Pull! <se.6> (its working)");
  },
};
