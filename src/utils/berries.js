import { useBerries } from '../context/BerryContext'
import berries from '../data/pokemmo/item-berry.json'
import items from '../data/pokemmo/item.json'
import { getItemInfo } from './items'

export const BERRIES_DEGREES = [
    { key: 'bitter_degree', label: "Bitter" },
    { key: 'dry_degree', label: "Dry" },
    { key: 'sour_degree', label: "Sour" },
    { key: 'spicy_degree', label: "Spicy" },
    { key: 'sweet_degree', label: "Sweet" }
]

export const useGetBerries = () => {
    const { berriesFavorites } = useBerries();
    if (!berriesFavorites) return;
    return berries
        .map(item => ({
            ...item,
            ...getItemInfo(item.item_id)
        }))
        .sort((a, b) => {
            return a.en_name.toLowerCase() > b.en_name.toLowerCase() ? -1 : 1
        })
        .sort((a, b) => {
            return berriesFavorites.includes(a.item_id) > berriesFavorites.includes(b.item_id) ? - 1 : 1
        })
}

export const getBerry = id => {
    return berries.find(item => (
        item.item_id === id
            ? item
            : false
    ))
}

export const getSeeds = () => {
    return items
        .filter(item => item.category === 3)
        .map(item => {
            const berryInfo = item.key.split('-').slice(0, -1);
            return { value: berryInfo[0].includes('plain') ? 1 : 2, type: berryInfo[1], ...item }
        })
}