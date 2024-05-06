const cheerio = require('cheerio');
const axios = require('axios');
const items = require('./items.json');
const { get } = require('axios');
async function performScraping(itemName) {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const itemId = Object.keys(items).find(
        (key) => items[key]['en'] === itemName
    );
    if (!itemId) {
        console.log('Item not found.');
        return;
    }
    const lightResponse = await axios.get(
        `https://universalis.app/api/v2/light/${itemId}?listings=5`
    );
    const lightData = lightResponse.data;
    //    console.log(lightData);
    const chaosResponse = await axios.get(
        `https://universalis.app/api/v2/chaos/${itemId}?listings=5`
    );
    const chaosData = chaosResponse.data;
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
    if (
        lightData.listings[1].pricePerUnit > chaosData.listings[1].pricePerUnit
    ) {
        data += '\n Chaos is cheaper: ' + chaosData.listings[1].pricePerUnit;
    } else {
        data += '\n Light is cheaper: ' + lightData.listings[1].pricePerUnit;
    }
    return data;
}
// can delete when we load this into the bot

exports.performScraping = performScraping;
