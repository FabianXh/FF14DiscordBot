const { EmbedBuilder } = require('discord.js');
const axios = require('axios');
const items = require('./items.json');

// Function to perform scraping
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
    const [lightResponse, chaosResponse] = await Promise.all([
        axios.get(`https://universalis.app/api/v2/light/${itemId}?listings=5`),
        axios.get(`https://universalis.app/api/v2/chaos/${itemId}?listings=5`),
    ]);
    const lightData = lightResponse?.data;
    const chaosData = chaosResponse?.data;

    // Format the data for light listings
    const lightPrintData = lightData.listings
        .map((listing) => {
            const hq = listing.hq ? 'HQ' : '';
            return `**${listing.worldName}**: ${listing.pricePerUnit}<:Gil_Icon:1237123134260379758>x${listing.quantity} ${hq}\n`;
        })
        .join('');

    // Format the data for chaos listings
    const chaosPrintData = chaosData.listings
        .map((listing) => {
            const hq = listing.hq ? 'HQ' : '';
            return `**${listing.worldName}**: ${listing.pricePerUnit}<:Gil_Icon:1237123134260379758>x${listing.quantity} ${hq}\n`;
        })
        .join('');

    // Create an embedded message
    const embeddedMessage = new EmbedBuilder()
        .setColor('89CFF0')
        .setTitle(itemName + ' Market Data')
        .setURL(`https://universalis.app/market/${itemId}`)
        .setDescription('Prices of ' + itemName + ' on the market board')
        .addFields(
            {
                name: '__Light Data__',
                value: lightPrintData,
                inline: true,
            },
            { name: '\u200b', value: '\u200b', inline: true },
            {
                name: '__Chaos Data__',
                value: chaosPrintData,
                inline: true,
            }
        )
        .setTimestamp()
        .setFooter({
            text: 'Sponsored by Full Set Andy',
            iconURL:
                'https://cdn.discordapp.com/attachments/1236243830886371330/1237138036777553940/204558a44722029ecc0dec40ec79c74e.jpeg?ex=663a8e14&is=66393c94&hm=09b0b70257cadc297a94980c98cd22e620f54a086a6f7b8584913e04895c68ae&',
        });

    // Return the embedded message
    return embeddedMessage;
}

// Export the performScraping function
exports.performScraping = performScraping;
