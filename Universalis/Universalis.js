const cheerio = require("cheerio")
const axios = require("axios")

async function performScraping() {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
        method: "GET",
        url: "https://universalis.app/market/39630",
        headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })
    const $ = cheerio.load(axiosResponse.data)
    var mb = $(".cross_world_markets").find("div").each((index, element) => {

    });
    var cheapest = $(".cheapest").find("div").first().text()
    console.log($(".cheapest").find("div").first().text())
}

performScraping()




