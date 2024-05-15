const axios = require('axios');
const { EmbedBuilder } = require('discord.js');

async function getItemId(itemName) {
    const response = await axios.get(
        `https://xivapi.com/search?string=${itemName}`
    );

    const searchData = response.data;
    const itemId = searchData.Results[0].ID;

    const itemData = await axios.get(
        `https://www.garlandtools.org/db/doc/item/en/3/${itemId}.json`
    );
    console.log(itemData.data);
    // if there is an NPC associated with the item, get the zone of that NPC
    let ingredients = [];
    if (itemData.data.item.tradeShops !== undefined) {
        const npc = itemData.data.item.tradeShops[0].npcs[0];
        const npcData = await axios.get(
            `https://www.garlandtools.org/db/doc/npc/en/2/${npc}.json`
        );

        const zoneId = npcData.data.npc.zoneid;

        const zone = await axios.get(`https://xivapi.com/PlaceName/${zoneId}`);
        console.log(zone.data.Name);
        return zone.data.Name;
    }
    // if there are ingredients associated with the item, get the names of the ingredients
    if (itemData.data.ingredients !== undefined) {
        for (const ingredient of itemData.data.ingredients) {
            console.log(ingredient.name);
            ingredients.push(ingredient.name);
        }
        console.log(ingredients);
    }
    // if the item is tradeable, get the item ID return univeraslis link
    if (itemData.data.item.tradeable == 1) {
        const Id = itemData.data.item.id;
        console.log(`https://universalis.app/market/${Id}`);
    }
    const embeddedMessage = new EmbedBuilder()
        .setTitle(itemName + 'data')
        .setDescription('Data for ' + itemName)
        .setColor('89CFF0')
        .setFooter({
            text: 'Sponsored by Full Set Andy',
            iconURL:
                'https://cdn.discordapp.com/attachments/1236243830886371330/1237138036777553940/204558a44722029ecc0dec40ec79c74e.jpeg?ex=663a8e14&is=66393c94&hm=09b0b70257cadc297a94980c98cd22e620f54a086a6f7b8584913e04895c68ae&',
        });
    // add fields to the embedded message based on the data
    return embeddedMessage;
}

getItemId('Grade 8 Tincture of Strength');
