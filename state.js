let currentInteraction = null;
let currentVoiceConnection = null;
let currentAudioPlayer = null;

module.exports = {
  setCurrentInteraction(interaction) {
    currentInteraction = interaction;
  },
  getCurrentInteraction() {
    return currentInteraction;
  },
  setCurrentVoiceConnection(connection) {
    currentVoiceConnection = connection;
  },
  getCurrentVoiceConnection() {
    return currentVoiceConnection;
  },
  setCurrentAudioPlayer(audioPlayer) {
    currentAudioPlayer = audioPlayer;
  },
  getCurrentAudioPlayer() {
    return currentAudioPlayer;
  },
};
