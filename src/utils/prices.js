import axios from 'axios';
import apiItems from '../data/apiItems.json';
import { getItemInfo } from '../utils/items';

const BASE_URL = "https://pokemmoprices.com/api/v2/items";

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
    getAllItems: async function () {
        try {
            if (cache.getAllItems.length)
                return cache.getAllItems

            const { data: axiosResponse } = await axios.get(`${BASE_URL}/table`)
            if (axiosResponse.httpcode !== 200) {
                throw axiosResponse
            }
            cache.getAllItems = axiosResponse.data
            return axiosResponse.data;
        } catch (error) {
            console.log(error);
        }
    },
    getAllItemsDesc: async function () {
        try {
            if (cache.getAllItemsDesc.length)
                return cache.getAllItemsDesc

            const { data: axiosResponse } = await axios.get(`${BASE_URL}/table?names=true`)
            if (axiosResponse.httpcode !== 200) {
                throw axiosResponse
            }
            cache.getAllItemsDesc = axiosResponse.data
            return axiosResponse.data;
        } catch (error) {
            console.log(error);
        }
    },
    getNewestItems: async function () {
        if (cache.getNewestItems.length)
            return cache.getNewestItems;

        const data = await prices.getAllItems()
        if (!data.length)
            return;

        const response = apiItems.slice(0, 20).map(item => {
            return {
                ...item,
                ...data.find(({ i }) => i === item.apiID),
                ...getItemInfo(item.id)
            }
        });
        cache.getNewestItems = response;
        return response;
    },
    getItem: async function (itemId, source = false) {
        try {
            const { data: axiosResponse } = await axios.get(`${BASE_URL}/graph/min/${itemId}`, {
                cancelToken: source.token
            });

            if (axiosResponse.httpcode !== 200) {
                throw axiosResponse;
            }

            const items = axiosResponse.data.map(item => ({ ...item, x: item.x * 1000 }));

            cache.getItem = { ...cache.getItem, [itemId]: items }; // Store full dataset separately

            return items;
        } catch (error) {
            if (error.code === "ERR_CANCELED")
                return error;

            console.log(error);
        }
    },
    getItemConstraint: async function (itemId, constraint, source = false) {
        try {
            if (cache.getItemConstraint[itemId]?.[constraint])
                return cache.getItemConstraint[itemId][constraint];

            const { data: axiosResponse } = await axios.get(`${BASE_URL}/graph/min/${itemId}/${constraint}`, {
                cancelToken: source.token
            });

            if (axiosResponse.httpcode !== 200) {
                throw axiosResponse;
            }

            const items = axiosResponse.data.map(item => ({ ...item, x: item.x * 1000 }));

            if (!cache.getItemConstraint[itemId]) cache.getItemConstraint[itemId] = {};
            cache.getItemConstraint[itemId][constraint] = items; // Store separately from getItem

            return items;
        } catch (error) {
            if (error.code === "ERR_CANCELED")
                return error;

            console.log(error);
        }
    },
    getItemQuantity: async function (itemId, source = false) {
        try {
            if (cache.getItemQuantity[itemId])
                return cache.getItemQuantity[itemId];

            const { data: axiosResponse } = await axios.get(`${BASE_URL}/graph/quantity/${itemId}`, {
                cancelToken: source.token
            })
            if (axiosResponse.httpcode !== 200) {
                throw axiosResponse
            }
            const items = axiosResponse.data.map(item => ({ ...item, x: item.x * 1000 }));

            cache.getItemQuantity[itemId] = items;
            return items;
        } catch (error) {
            if (error.code === "ERR_CANCELED")
                return error;

            console.log(error);
        }
    }
}