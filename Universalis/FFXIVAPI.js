const axios = require('axios');

async function getItemId(itemName) {
    const response = await axios.get(
        `https://xivapi.com/search?string=${itemName}`
    );
    const searchData = response.data;
    const itemId = searchData.Results[0].ID;

    console.log(itemId);
    return itemId;
}

getItemId('Cotton Yarn'); // Get ID for item with name 'Cotton Yarn'
