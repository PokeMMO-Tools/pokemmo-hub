import { POKEMON } from './pokemon.js'

const generateRoutes = (region_id) => {
    const locations = POKEMON.map(p => p.locations.filter(l => l.region_id === region_id)).flat();
    const routes = []
    const newLocations = []
    locations.forEach(location => {
        if (!routes.includes(location.location)) {
            routes.push(location.location)
            newLocations.push(location)
        }
    });
    return newLocations
}

export const ROUTES = {
    kanto: generateRoutes(0),
    hoenn: generateRoutes(1),
    unova: generateRoutes(2),
    sinnoh: generateRoutes(3),
    johto: generateRoutes(4),
}

export const REGIONS = [
    'kanto',
    'johto',
    'hoenn',
    'sinnoh',
    'unova'
]

export const ENCOUNTER_TRIGGERS = [
    "Very Common",
    "Common",
    "Uncommon",
    "Rare",
    "Very Rare",
    "Special",
    "Horde",
    "Lure",
]

export const ENCOUNTER_TYPE = [
    "Grass",
    "Water",
    "Cave",
    "Rocks",
    "Inside",
    "Old Rod",
    "Good Rod",
    "Super Rod",
    "Honey Tree",
    "Dark Grass",
    "Fishing",
    "Shadow",
    "Dust Cloud"
]

export const TYPE = [
    "Normal",
    "Fighting",
    "Flying",
    "Poison",
    "Ground",
    "Rock",
    "Bug",
    "Ghost",
    "Steel",
    // 10: "???",
    "Fire",
    "Water",
    "Grass",
    "Electric",
    "Psychic",
    "Ice",
    "Dragon",
    "Dark",
    // 18: "None"
]

export const getRegions = () => {
    return REGIONS.map(id => ({ key: id, label: id }))
}

export const getEncounterTriggers = () => {
    return ENCOUNTER_TRIGGERS
        .map(id => ({ key: id, label: id }))
}

export const getEncounterType = () => {
    return ENCOUNTER_TYPE
        .map(id => ({ key: id, label: id }))
}

export const getTypes = () => {
    return TYPE
        .map(id => ({ key: id.toUpperCase(), label: id }))
}

export const getType = (type_id) => ENCOUNTER_TYPE[type_id]

export const getRoute = (route) => {
    if (!route) return []
    return ROUTES[route.toLowerCase()].map(location => ({ key: location.location, label: location.location }))
}