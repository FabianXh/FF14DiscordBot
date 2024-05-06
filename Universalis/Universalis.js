const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const items = require('./items.json');
const { get } = require('axios');

async function performScraping(itemName) {
    // Find the item ID from the items.json file
    const itemId = Object.keys(items).find(
        (key) => items[key]['en'] === itemName
    );
    if (!itemId) {
        console.log('Item not found.');
        return;
    }

    // Get the data from Universalis
    const lightResponse = await axios.get(
        `https://universalis.app/api/v2/light/${itemId}?listings=5`
    );
    const lightData = lightResponse.data;

    const chaosResponse = await axios.get(
        `https://universalis.app/api/v2/chaos/${itemId}?listings=5`
    );
    const chaosData = chaosResponse.data;
    var lightPrintData = '';
    for (let i = 0; i < lightData.listings.length; i++) {
        lightPrintData += `${lightData.listings[i].worldName}: ${lightData.listings[i].pricePerUnit}<:Gil_Icon:1237123134260379758>x${lightData.listings[i].quantity}\n`;
        {
            lightData.listings[i].hq
                ? (lightPrintData += 'HQ\n')
                : (lightPrintData += '\n');
        }
    }
    var chaosPrintData = '';
    for (let i = 0; i < chaosData.listings.length; i++) {
        chaosPrintData += `${chaosData.listings[i].worldName}: ${chaosData.listings[i].pricePerUnit}<:Gil_Icon:1237123134260379758>x${chaosData.listings[i].quantity}\n`;
        {
            lightData.listings[i].hq
                ? (chaosPrintData += 'HQ\n')
                : (chaosPrintData += '\n');
        }
    }
    const embededMassage = new EmbedBuilder()
        .setColor('89CFF0')
        .setTitle(itemName + ' Market Data')
        .setURL(`https://universalis.app/market/${itemId}`)
        .setDescription('Prices of ' + itemName + ' on the market board')
        .addFields(
            {
                name: 'Light Data',
                value: lightPrintData,
                inline: true,
            },
            {
                name: 'Chaos Data',
                value: chaosPrintData,
                inline: true,
            }
        );

    // return the data
    return embededMassage;
}
// can delete when we load this into the bot

exports.performScraping = performScraping;
