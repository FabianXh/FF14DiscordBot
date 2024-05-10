const axios = require('axios');

async function getItemId(itemName) {
    const response = await axios.get(
        `https://xivapi.com/search?string=${itemName}`
    );
    const searchData = response.data;
    const itemId = searchData.Results[0].ID;
    const itemData = await axios.get(`https://xivapi.com/item/${itemId}`);
    const links = itemData.data.GameContentLinks;

    // Iterate over the keys in the GameContentLinks object
    for (const key in links) {
        console.log(`${key}:`);
        // Iterate over the keys in the nested object
        for (const subKey in links[key]) {
            console.log(`  ${subKey}: ${links[key][subKey]}`);
            if (key === 'Quest') {
                const questId = links[key][subKey];
                const questData = await axios.get(
                    `https://xivapi.com/Quest/${questId}`
                );
                console.log(`    Location: ${questData.data.PlaceName}`);
            }
            if (key === 'GilShopItem') {
                const gilShopItemId = links[key][subKey];
                const gilShopItemData = await axios.get(
                    `https://xivapi.com/GilShopItem/${gilShopItemId}`
                );
                if (
                    gilShopItemData.data.Item &&
                    gilShopItemData.data.Item.GilShop
                ) {
                    const gilShopId = gilShopItemData.data.Item.GilShop.ID;
                    const gilShopData = await axios.get(
                        `https://xivapi.com/GilShop/${gilShopId}`
                    );
                    if (gilShopData.data.ENpcResident) {
                        const npcId = gilShopData.data.ENpcResident.ID;
                        const npcData = await axios.get(
                            `https://xivapi.com/ENpcResident/${npcId}`
                        );
                        console.log(`    Gil Shop: ${gilShopData.data.Name}`);
                        console.log(
                            `    Location: ${npcData.data.PlaceName.Name}`
                        );
                    }
                }
            }
        }
    }
}

getItemId('Cotton Yarn'); // Get ID for item with name 'Cotton Yarn'
