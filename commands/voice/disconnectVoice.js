const { SlashCommandBuilder } = require("@discordjs/builders");
const state = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("disconnect")
    .setDescription("Disconnect from VC"),
  async execute(interaction) {
    const currentVoiceConnection = state.getCurrentVoiceConnection();
    const currentAudioPlayer = state.getCurrentAudioPlayer();

    if (currentVoiceConnection) {
      if (currentAudioPlayer) {
        currentAudioPlayer.stop();
        state.setCurrentAudioPlayer(null);
      }
      currentVoiceConnection.destroy();
      state.setCurrentVoiceConnection(null);
      await interaction.reply("Disconnected from the voice channel.");
    } else {
      await interaction.reply("Not connected to any voice channel.");
    }
  },
};
