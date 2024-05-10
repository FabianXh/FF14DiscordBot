const axios = require('axios');

async function getItemId(itemName) {
    const response = await axios.get(
        `https://xivapi.com/search?string=${itemName}`
    );
    const searchData = response.data;
    const itemId = searchData.Results[0].ID;
    const itemData = await axios.get(`https://xivapi.com/item/${itemId}`);
    const links = itemData.data.GameContentLinks;
    console.log(links);

    // Iterate over the keys in the GameContentLinks object
    for (const key in links) {
        //        console.log(`${key}:`);
        // Iterate over the keys in the nested object
        for (const subKey in links[key]) {
            //            console.log(`  ${subKey}: ${links[key][subKey]}`);
            if (key === 'Quest') {
                const questId = links[key][subKey];
                const questData = await axios.get(
                    `https://xivapi.com/Quest/${questId}`
                );
                console.log(`    Location: ${questData.data.PlaceName}`);
            }
            if (key === 'GilShopItem') {
                const CopioltIsAnIdiot = await axios.get(
                    'https://xivapi.com/GilShopItem/262177.8'
                );
                console.log(CopioltIsAnIdiot.data.GilShop.ID);
            }
        }
    }
}

getItemId('Cotton Yarn'); // Get ID for item with name 'Cotton Yarn'
