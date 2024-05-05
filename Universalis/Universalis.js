const cheerio = require("cheerio")
const axios = require("axios")

async function performScraping(lookup) {
    // downloading the target web page
    // by performing an HTTP GET request in Axios
    const axiosResponse = await axios.request({
        method: "GET",
        url: `https://universalis.app/market/${lookup}`,
        headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
        }
    })
    // using cheetio to format the web page into HTML
    const $ = cheerio.load(axiosResponse.data)

    // keeping this veriable for later
    var cheapest = $(".cheapest").find("div").first().text()
    // delete whenever you want this was for testing
    console.log($(".cheapest").find("div").first().text())
    return cheapest
}
// can delete when we load this into the bot
var cheapest = performScraping()




