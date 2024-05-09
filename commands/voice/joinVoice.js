const { SlashCommandBuilder } = require("@discordjs/builders");
const { joinVoiceChannel } = require("@discordjs/voice");
const { ChannelType, Client, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription("Join vc")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("VC channel to join")
        .setRequired(true)
        .addChannelTypes(ChannelType.GuildVoice)
    ),
  async execute(interaction) {
    if (interaction.commandName === "join") {
      const connect = joinVoiceChannel({
        channelId: interaction.option.getChannel("channel"),
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });
    }
    await interaction.reply("Wenz Pull! <se.6> (its working)");
  },
};
