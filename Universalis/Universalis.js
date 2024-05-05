const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const items = require("./items.json");

async function performScraping(itemName) {
  const itemId = Object.keys(items).find(
    (key) => items[key]["en"] === itemName
  );

  if (!itemId) {
    console.log("Item not found.");
    return;
  }

  const url = `https://universalis.app/market/${itemId}`;

  try {
    const axiosResponse = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(axiosResponse.data);
    const cheapest = $(".cheapest").find("div").first().text();
    return "Cheapest offer: " + cheapest;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

module.exports = performScraping;
