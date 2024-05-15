const axios = require('axios');

async function getItemId(itemName) {
    const response = await axios.get(
        `https://xivapi.com/search?string=${itemName}`
    );
    const searchData = response.data;
    const itemId = searchData.Results[0].ID;
    const itemData = await axios.get(
        `https://www.garlandtools.org/db/doc/item/en/3/${itemId}.json`
    );
    const npc = itemData.data.item.tradeShops[0].npcs[0];
    console.log(npc);
    const npcData = await axios.get(
        `https://www.garlandtools.org/db/doc/npc/en/2/${npc}.json`
    );

    const zoneId = npcData.data.npc.zoneid;
    const zone = await axios.get(`https://xivapi.com/PlaceName/${zoneId}`);
    console.log(zone.data.Name);
}

getItemId('Gae Bolg Ultima');
