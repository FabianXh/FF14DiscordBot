const cheerio = require("cheerio");
const axios = require("axios");
const items = require("./items.json");
const { get } = require("axios");
async function performScraping(itemName) {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const itemId = Object.keys(items).find(
        (key) => items[key]["en"] === itemName
    );
    if (!itemId) {
        console.log("Item not found.");
        return;
    }
    const lightResponse = await axios.get(
        `https://universalis.app/api/v2/light/39630?listings=5`
    );
    const lightData = lightResponse.data;
    //    console.log(lightData);
    const chaosResponse = await axios.get(
        `https://universalis.app/api/v2/light/39630?listings=5`
    );
    const chaosData = chaosResponse.data;
    for (let lightListing of lightData.listings) {
        console.log(lightListing.worldName, listing.pricePerUnit);
    }
}
// can delete when we load this into the bot
performScraping("Diadochos Sword");

exports.performScraping = performScraping;
