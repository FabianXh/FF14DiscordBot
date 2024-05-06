const { EmbedBuilder } = require("discord.js");
const axios = require("axios");
const items = require("./items.json");
const { get } = require("axios");

async function performScraping(itemName) {
  // Find the item ID from the items.json file
  const itemId = Object.keys(items).find(
    (key) => items[key]["en"] === itemName
  );
  if (!itemId) {
    console.log("Item not found.");
    return;
  }

  // Get the data from Universalis
  const lightResponse = await axios.get(
    `https://universalis.app/api/v2/light/${itemId}?listings=5`
  );
  const lightData = lightResponse?.data;

  const chaosResponse = await axios.get(
    `https://universalis.app/api/v2/chaos/${itemId}?listings=5`
  );
  const chaosData = chaosResponse?.data;
  var lightPrintData = "";
  for (let i = 0; i < lightData.listings.length; i++) {
    lightPrintData += `**${lightData?.listings[i].worldName}**: ${lightData?.listings[i].pricePerUnit}<:Gil_Icon:1237123134260379758>x${lightData.listings[i].quantity} `;
    {
      lightData.listings[i].hq
        ? (lightPrintData += "HQ\n")
        : (lightPrintData += "\n");
    }
  }
  var chaosPrintData = "";
  for (let i = 0; i < chaosData?.listings.length; i++) {
    chaosPrintData += `**${chaosData?.listings[i].worldName}**: ${chaosData?.listings[i].pricePerUnit}<:Gil_Icon:1237123134260379758>x${chaosData.listings[i].quantity} `;
    {
      lightData.listings[i].hq
        ? (chaosPrintData += "HQ\n")
        : (chaosPrintData += "\n");
    }
  }
  const embededMassage = new EmbedBuilder()
    .setColor("89CFF0")
    .setTitle(itemName + " Market Data")
    .setURL(`https://universalis.app/market/${itemId}`)
    .setDescription("Prices of " + itemName + " on the market board")
    .addFields(
      {
        name: "__Light Data__",
        value: lightPrintData,
        inline: true,
      },
      { name: "\u200b", value: "\u200b", inline: true },
      {
        name: "__Chaos Data__",
        value: chaosPrintData,
        inline: true,
      }
    )
    .setTimestamp()
    .setFooter({
      text: "Sponsored by Full Set Andy",
      iconURL:
        "https://cdn.discordapp.com/attachments/1236243830886371330/1237138036777553940/204558a44722029ecc0dec40ec79c74e.jpeg?ex=663a8e14&is=66393c94&hm=09b0b70257cadc297a94980c98cd22e620f54a086a6f7b8584913e04895c68ae&",
    });
  // return the data
  return embededMassage;
}
// can delete when we load this into the bot

exports.performScraping = performScraping;
