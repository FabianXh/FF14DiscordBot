const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  joinVoiceChannel,
} = require("@discordjs/voice");
const state = require("../../state");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play audio in the voice channel")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("The URL of the audio file to play")
        .setRequired(true)
    ),
  async execute(interaction) {
    const url = interaction.options.getString("url");
    const connection = state.getCurrentVoiceConnection();

    if (!connection) {
      await interaction.reply("You need to join a voice channel first!");
      return;
    }

    const audioPlayer = createAudioPlayer();

    try {
      const resource = createAudioResource(url);
      console.log("Audio resource created successfully");
    } catch (error) {
      console.error("Error creating audio resource:", error.message);
    }

    audioPlayer.play(resource);

    // Log when the audio player starts playing
    audioPlayer.on(AudioPlayerStatus.Playing, () => {
      console.log("Audio player started playing");
    });

    // Log when the audio player stops playing
    audioPlayer.on(AudioPlayerStatus.Idle, () => {
      console.log("Audio player stopped playing");
    });

    // Log any errors encountered by the audio player
    audioPlayer.on("error", (error) => {
      console.error("Audio player error:", error.message);
    });

    connection.subscribe(audioPlayer);

    state.setCurrentAudioPlayer(audioPlayer);

    await interaction.reply(`Now playing: ${url}`);
  },
};
