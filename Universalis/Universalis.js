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
    const embededmassage = new EmbedBuilder()
        .setTitle(itemName + ' Market Data')
        .setURL(`https://universalis.app/market/${itemId}`)
        .setDescription('prices of ' + itemName + ' on the market board')
        .addFields({
            name: 'Light Data',
            value:
                lightData.listings[0].worldName +
                lightData.listings[0].pricePerUnit +
                '\n' +
                lightData.listings[1].worldName +
                lightData.listings[1].pricePerUnit +
                '\n' +
                lightData.listings[2].worldName +
                lightData.listings[2].pricePerUnit +
                '\n' +
                lightData.listings[3].worldName +
                lightData.listings[3].pricePerUnit +
                '\n' +
                lightData.listings[4].worldName +
                lightData.listings[4].pricePerUnit,
        });
    // return the data
    var data = 'Light Data | Chaos Data';
    for (let i = 0; i < lightData.listings.length; i++) {
        data +=
            '\n |' +
            lightData.listings[i].worldName +
            lightData.listings[i].pricePerUnit +
            '|' +
            chaosData.listings[i].worldName +
            chaosData.listings[i].pricePerUnit +
            '|';
    }
    // Compare the prices to find cheapest
    if (
        lightData.listings[1].pricePerUnit > chaosData.listings[1].pricePerUnit
    ) {
        data += '\n Chaos is cheaper: ' + chaosData.listings[1].pricePerUnit;
    } else {
        data += '\n Light is cheaper: ' + lightData.listings[1].pricePerUnit;
    }

    // return the data
    return data;
}
// can delete when we load this into the bot

exports.performScraping = performScraping;
