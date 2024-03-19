import { InterfaceItems } from '../interface/items'

import apiItems from '../data/apiItems.json'
import berries from '../data/pokemmo/item-berry.json'
import cosmetics from '../data/pokemmo/item-cosmetic.json'
import items from '../data/pokemmo/item.json'

/* export const DEFAULT_CLOTHES = {
    //forehead
    1: 0,
    //hat
    2: 0,
    //hair
    3: 0,
    //eyes
    4: 0,
    //face
    5: 0,
    //back
    6: 0,
    //top
    7: 0,
    //gloves
    8: 0,
    //shoes
    9: 0,
    //legs
    10: 0,
    //rod
    11: 0,
    //bicycle
    12: 0
} */

export const DEFAULT_CLOTHES = {
    "1": 0,
    "2": 0,
    "3": 1183,
    "4": 1441,
    "5": 1322,
    "6": 0,
    "7": 1323,
    "8": 0,
    "9": 1327,
    "10": 1316,
    "11": 0,
    "12": 0
}

export const getCosmeticSetupImage = (cosmetics) => {
    const selectedClothes = { ...DEFAULT_CLOTHES, ...cosmetics }

    const scenes = [];
    for (const key in InterfaceItems.sceneCosmeticParam) {
        if (Object.hasOwnProperty.call(InterfaceItems.sceneCosmeticParam, key)) {
            const scene = InterfaceItems.sceneCosmeticParam[key];
            scenes.push({
                name: scene,
                url: `https://pokemmoprices.com/dress-room/v2/${key}/2/1/${selectedClothes[6]}/${selectedClothes[12]}/${selectedClothes[4]}/${selectedClothes[5]}/${selectedClothes[8]}/${selectedClothes[3]}/${selectedClothes[2]}/${selectedClothes[10]}/${selectedClothes[9]}/${selectedClothes[7]}.png`,
                hasFollower: scene === 'Back' || scene === 'Front' || scene === 'Side' ? true : false
            })
        }
    }
    return scenes;
}

export const getItemInfo = id => {
    return items.find(item => parseInt(item.id) === parseInt(id))
}

export const getPokemmoID = apiId => {
    const item = apiItems.find(item => parseInt(item.apiID) === parseInt(apiId));
    if (!item) return false;

    return item.id;
}

export const getCosmeticInfo = id => {
    const item = cosmetics.find(({ item_id }) => parseInt(item_id) === id)
    if (!item) return false;

    return item;
}

export const getBerryInfo = id => {
    const item = berries.find(({ item_id }) => parseInt(item_id) === id)
    if (!item) return false;

    return item;
}

export const getApiID = id => {
    const item = apiItems.find(item => parseInt(item.id) === parseInt(id));
    if (!item) return false;

    return item.apiID;
}