// gatsby-node.js

const fetch = require('node-fetch');
const { getItemInfo, getPokemmoID } = require('./src/utils/items');


const NODE_TYPE = "Pokemmo"

const slugify = string => string.toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

exports.sourceNodes = async ({ actions, createContentDigest, createNodeId }) => {
    const { createNode } = actions;

    const response = await fetch(
        `https://pokemmoprices.com/api/v2/items/all`
    );
    const { data } = await response.json();

    data.forEach((item) => {
        const item_pokemmo_id = getPokemmoID(item.i)
        if (!item_pokemmo_id) {
            return;
        }
        const slug = slugify(item.n.en)


        item = {
            ...item,
            ...getItemInfo(item_pokemmo_id),
            slug: slug,
            _id: item_pokemmo_id
        }

        createNode({
            ...item,
            id: createNodeId(`${NODE_TYPE}-${item.i}`),
            parent: null,
            children: [],
            context: {
                i: item.i,
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