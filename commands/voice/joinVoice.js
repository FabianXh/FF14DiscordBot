const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel, VoiceConnectionStatus } = require("@discordjs/voice");
const { ChannelType } = require("discord.js");
const state = require("../../state");

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
    const channel = interaction.options.getChannel("channel");

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log(
        "The connection has entered the Ready state - ready to play audio!"
      );
    });

    connection.on(VoiceConnectionStatus.Disconnected, () => {
      console.log("Disconnected from the voice channel.");
      state.setCurrentVoiceConnection(null);
    });

    state.setCurrentVoiceConnection(connection);

    await interaction.reply(`Joined voice channel: ${channel.name}`);
  },
};
