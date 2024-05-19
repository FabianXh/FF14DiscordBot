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
    const itemPNG = `https://www.garlandtools.org/files/icons/item/${itemId}.png`;
    // if there is an NPC associated with the item, get the zone of that NPC
    let ingredients = [];
    let embeddedMessage = new EmbedBuilder()
        .setTitle(itemName + ' data')
        .setDescription('Data for ' + itemName)
        .setColor('89CFF0')
        .setFooter({
            text: 'Sponsored by Full Set Andy',
            iconURL:
                'https://cdn.discordapp.com/attachments/1236243830886371330/1237138036777553940/204558a44722029ecc0dec40ec79c74e.jpeg?ex=663a8e14&is=66393c94&hm=09b0b70257cadc297a94980c98cd22e620f54a086a6f7b8584913e04895c68ae&',
        });
    let CurrID = null;
    let amount = 0;
    let currency = null;
    if (itemData.data.item.tradeShops !== undefined) {
        const npc = itemData.data.item.tradeShops[0].npcs[0];
        const npcData = await axios.get(
            `https://www.garlandtools.org/db/doc/npc/en/2/${npc}.json`
        );

        const zoneId = npcData.data.npc.zoneid;

        const zone = await axios.get(`https://xivapi.com/PlaceName/${zoneId}`);

        for (const shop of npcData.data.npc.shops) {
            for (const entry of shop.entries) {
                if (entry.item[0].id == itemId) {
                    console.log(shop.name);
                    CurrID = entry.currency[0].id;
                    amount = entry.currency[0].amount;
                }
            }
        }
        if (CurrID !== null) {
            currency = await axios.get(`https://xivapi.com/Item/${CurrID}`);
        }
        embeddedMessage.addFields({
            name: 'Seller',
            value: `Zone: ${zone.data.Name} 
                Name: ${npcData.data.npc.name} 
                Coords: ${npcData.data.npc.coords[0]}x ${npcData.data.npc.coords[1]}y
                Currency: ${amount}x ${currency.data.Name}`,
        });
    }
    // if there are ingredients associated with the item, get the names of the ingredients
    if (itemData.data.ingredients !== undefined) {
        for (const ingredient of itemData.data.ingredients) {
            ingredients.push(ingredient.name);
        }
        let ingredientsPrintData = ingredients.join(', \n');
        embeddedMessage.addFields({
            name: 'Ingredients',
            value: ingredientsPrintData,
        });
    }
    // if the item is tradeable, get the item ID return univeraslis link
    if (itemData.data.item.tradeable == 1) {
        const Id = itemData.data.item.id;
        embeddedMessage.setURL(`https://universalis.app/market/${Id}`);
        embeddedMessage.addFields({
            name: 'Universalis Link',
            value: `https://universalis.app/market/${Id}`,
        });
    }
    if (CurrID !== null) {
        const CurrData = await axios.get(
            `https://www.garlandtools.org/db/doc/item/en/3/${CurrID}.json`
        );
        if (CurrData.data.item.instances[0] !== undefined) {
            const instanceData = await axios.get(
                `https://xivapi.com/InstanceContent/${CurrData.data.item.instances[0]}`
            );
            embeddedMessage.addFields({
                name: 'Instance Content',
                value: instanceData.data.Name,
            });
        }
    }
    if (itemData.data.item.instances[0] !== undefined) {
        const IinstanceData = await axios.get(
            `https://xivapi.com/InstanceContent/${itemData.data.item.instances[0]}`
        );
        embeddedMessage.addFields({
            name: 'Instance Content',
            value: IinstanceData.data.Name,
        });
    }

    // add fields to the embedded message based on the data

    return embeddedMessage;
}
exports.getItemId = getItemId;

// https://xivapi.com/InstanceContent/30067 - get instance content
// itemData.data.item.partials[]
