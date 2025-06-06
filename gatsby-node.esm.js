// gatsby-node.js

const fetch = require('node-fetch');
const { getItemInfo, getPokemmoID } = require('./src/utils/items');
import itemsData from './src/data/pokemmo/item_lookup.json'


const NODE_TYPE = "Pokemmo"

const slugify = string => string.toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

const getItemName = (id) => {
    const item = itemsData[id.toString()];
    if (!item) return null;

    return item.name;
}

const getItemDescription = (id) => {
    const item = itemsData[id.toString()];
    if (!item) return null;

    const cleanedDescription = {};
    for (const [lang, text] of Object.entries(item.description)) {
        cleanedDescription[lang] = text.replace(/\\n/g, ' ');
    }

    return cleanedDescription;
}

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions;

    const response = await fetch(
        `https://apis.fiereu.de/pokemmoprices/v1/items` // https://pokemmoprices.com/api/v2/items/all
    );
    const data = await response.json();

    data.forEach((item) => {
        let item_pokemmo_id = getPokemmoID(item.item_id)
        if (!item_pokemmo_id) {
            return false
        }
        const itemName = getItemName(item.item_id)

        if (!itemName) {
            return false
        }
        const slug = slugify(itemName['en'])


        item = {
            ...item,
            n: getItemName(item.item_id),
            d: getItemDescription(item.item_id),
            ...getItemInfo(item_pokemmo_id),
            slug: slug,
            _id: item_pokemmo_id
        }

        createNode({
            ...item,
            id: createNodeId(`${NODE_TYPE}-${item.item_id}`),
            parent: null,
            children: [],
            context: {
                i: item.item_id,
                slug: slug
            },
            internal: {
                type: NODE_TYPE,
                content: JSON.stringify(item),
                contentDigest: createContentDigest(item)
            }
        });
    });
};