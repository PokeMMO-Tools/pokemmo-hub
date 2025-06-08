import axios from 'axios';
import apiItems from '../data/apiItems.json';
import { getItemInfo, getItemName, getItemDescription } from '../utils/items';

const BASE_URL = "https://apis.fiereu.de/pokemmoprices/v1";

const cache = {
    getAllItems: [],
    getAllItemsDesc: [],
    getNewestItems: [],
    getItem: {},
    getItemQuantity: {},
    getItemConstraint: {}
};

export const prices = {
    cancelToken: axios.CancelToken,
    format: price => new Intl.NumberFormat('en-US').format(price),
    calculateSellGain: price => {
        if (price < 1000)
            return price - 100;

        if (price > 500000)
            return price - 25000

        return price * 0.95;
    },

    transformNewApiItem: function (newApiItem) {
        const itemName = getItemName(newApiItem.item_id);
        const itemDescription = getItemDescription(newApiItem.item_id);

        return {
            i: newApiItem.item_id,
            item_id: newApiItem.item_id,
            tradable: newApiItem.tradable,
            price: newApiItem.price,
            p: newApiItem.price,
            listings: newApiItem.listings,
            quantity: newApiItem.quantity,
            q: newApiItem.quantity,
            last_updated: newApiItem.last_updated,
            n: itemName,
            d: itemDescription,
            min_price: newApiItem.price,
            max_price: newApiItem.price
        };
    },

    getAllItems: async function () {
        try {
            const { data } = await axios.get(`${BASE_URL}/items`);

            const transformedData = data.map(item => prices.transformNewApiItem(item));

            cache.getAllItems = transformedData;
            return transformedData;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    getAllItemsDesc: async function () {
        try {
            if (cache.getAllItemsDesc.length)
                return cache.getAllItemsDesc;

            const { data } = await axios.get(`${BASE_URL}/items`);
            const transformedData = data.map(item => prices.transformNewApiItem(item));

            cache.getAllItemsDesc = transformedData;
            return transformedData;
        } catch (error) {
            console.log(error);
            return [];
        }
    },

    getNewestItems: async function () {
        const data = await prices.getAllItems();
        if (!data.length)
            return [];

        const first20ApiIDs = apiItems.slice(0, 20).map(item => item.apiID);

        const filtered = data.filter(item => first20ApiIDs.includes(item.i));

        const response = filtered.map(item => {
            const apiItem = apiItems.find(api => api.apiID === item.i);

            return {
                ...item,
                ...(apiItem && getItemInfo(apiItem.id))
            };
        });

        cache.getNewestItems = response;
        return response;
    },


    getItem: async function (itemId, source = false) {
        try {
            const { data } = await axios.get(`${BASE_URL}/graph/items/${itemId}/min`, {
                cancelToken: source?.token
            });

            if (!data || !Array.isArray(data)) {
                const currentData = await axios.get(`${BASE_URL}/graph/items/${itemId}/min`);
                const transformedItem = this.transformNewApiItem(currentData.data);

                const mockHistoricalData = [{
                    x: Date.now(),
                    y: transformedItem.price
                }];

                cache.getItem = { ...cache.getItem, [itemId]: mockHistoricalData };
                return mockHistoricalData;
            }

            const items = data.map(item => ({ ...item, x: item.x * 1000 }));
            cache.getItem = { ...cache.getItem, [itemId]: items };
            return items;

        } catch (error) {
            if (error.code === "ERR_CANCELED")
                return error;

            console.log('Historical data not available, using current data:', error);

            try {
                const { data } = await axios.get(`${BASE_URL}/items`);
                const item = data.find(i => i.item_id === itemId);

                if (item) {
                    const mockData = [{
                        x: Date.now(),
                        y: item.price
                    }];
                    cache.getItem = { ...cache.getItem, [itemId]: mockData };
                    return mockData;
                }
            } catch (fallbackError) {
                console.log('Fallback also failed:', fallbackError);
            }

            return [];
        }
    },

    getItemConstraint: async function (itemId, constraintDays, source = false) {
        try {
            if (cache.getItemConstraint[itemId]?.[constraintDays])
                return cache.getItemConstraint[itemId][constraintDays];

            const { data } = await axios.get(`https://apis.fiereu.de/pokemmoprices/v1/graph/items/${itemId}/min`, {
                cancelToken: source?.token
            });

            if (!data || !Array.isArray(data)) {
                return await this.getItem(itemId, source);
            }

            const now = Date.now();
            const cutoffTime = now - (constraintDays * 24 * 60 * 60 * 1000); // Convert days to milliseconds

            const filteredItems = data.filter(item => {
                const itemTime = item.x * 1000;
                return itemTime >= cutoffTime;
            });

            const items = filteredItems.map(item => ({ ...item, x: item.x * 1000 }));

            if (!cache.getItemConstraint[itemId]) cache.getItemConstraint[itemId] = {};
            cache.getItemConstraint[itemId][constraintDays] = items;

            return items;
        } catch (error) {
            if (error.code === "ERR_CANCELED")
                return error;

            console.log('New API endpoint not available, falling back to basic item data');
            return await this.getItem(itemId, source);
        }
    },

    getItemQuantity: async function (itemId, source = false) {
        try {
            if (cache.getItemQuantity[itemId])
                return cache.getItemQuantity[itemId];

            const { data } = await axios.get(`${BASE_URL}/graph/items/${itemId}/quantity`, {
                cancelToken: source?.token
            });

            if (!data || !Array.isArray(data)) {
                const allItems = await this.getAllItems();
                const item = allItems.find(i => i.i === itemId);

                if (item) {
                    const mockQuantityData = [{
                        x: Date.now(),
                        y: item.quantity
                    }];
                    cache.getItemQuantity[itemId] = mockQuantityData;
                    return mockQuantityData;
                }
                return [];
            }

            const items = data.map(item => ({ ...item, x: item.x * 1000 }));
            cache.getItemQuantity[itemId] = items;
            return items;

        } catch (error) {
            if (error.code === "ERR_CANCELED")
                return error;

            console.log('Quantity history not available, using current data');

            try {
                const allItems = await this.getAllItems();
                const item = allItems.find(i => i.i === itemId);

                if (item) {
                    const mockData = [{
                        x: Date.now(),
                        y: item.quantity
                    }];
                    cache.getItemQuantity[itemId] = mockData;
                    return mockData;
                }
            } catch (fallbackError) {
                console.log('Quantity fallback failed:', fallbackError);
            }

            return [];
        }
    }
}