const {
  Client,
  GatewayIntentBits,
  ButtonStyle,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const { token } = require("../../config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const row = new ActionRowBuilder();
const getRandomInt = (max) => Math.floor(Math.random() * max) + 1;

row.addComponents(
  new ButtonBuilder()
    .setCustomId("rollMore")
    .setLabel("Roll")
    .setStyle(ButtonStyle.Danger)
);

const createEmbedMessage = (input, roll) =>
  new EmbedBuilder()
    .setColor("DC143C")
    .setTitle("DEATH ROLL!")
    .setDescription(`Rolling a number between 1 and ${input}...`)
    .addFields({ name: "RESULT", value: roll.toString() });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("death_roll")
    .setDescription("DEATH ROLL!")
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("Input the number to roll")
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply();
    // const target = interaction?.options?.getUser("target");
    const input = interaction.options.getInteger("number");
    let roll = getRandomInt(input);
    client.on("interactionCreate", (interaction) => {
      if (!interaction.isButton() || interaction.customId !== "rollMore") {
        return;
      }

      let oldMax = roll;
      roll = getRandomInt(oldMax);

      interaction.reply({
        // content: `${target}`, Fuck you tygan
        embeds: [createEmbedMessage(oldMax, roll)],
        components: [row],
      });
    });

    await interaction.editReply({
      //   content: `${target}`,
      embeds: [createEmbedMessage(input, roll)],
      components: [row],
    });
  },
};

client.login(token);
