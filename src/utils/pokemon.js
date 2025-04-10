import dex from '../data/pokemmo/dex.json'
import pokemon from '../data/pokemmo/monster.json'
import moves from '../data/pokemmo/moves.json'

export const EGG_GROUPS = {
    "monster": { label: "monster", color: "#775544" },
    "water a": { label: "water a", color: "#66ccff" },
    "bug": { label: "bug", color: "#aabb22" },
    "flying": { label: "flying", color: "#8899ff" },
    "field": { label: "field", color: "#ddbb55" },
    "fairy": { label: "fairy", color: "#ee99ee" },
    "plant": { label: "plant", color: "#77cc55" },
    "humanoid": { label: "humanoid", color: "#bb5544" },
    "water c": { label: "water c", color: "#3399ff" },
    "mineral": { label: "mineral", color: "#bbaa67" },
    "chaos": { label: "chaos", color: "#7070bf" },
    "water b": { label: "water b", color: "#4d9ec6" },
    "ditto": { label: "ditto", color: "#cabbd7" },
    "dragon": { label: "dragon", color: "#7766ed" },
    "cannot breed": { label: "cannot breed", color: "#8a8a8a" },
    "genderless": { label: "genderless", color: "#8a8a8a" }
}

export const TYPES = {
    "NORMAL": { label: "Normal", color: "#a4acaf" },
    "FIGHTING": { label: "Fighting", color: "#d56723" },
    "FLYING": { label: "Flying", color: "#3dc7ef" },
    "POISON": { label: "Poison", color: "#b97fc9" },
    "GROUND": { label: "Ground", color: "#ab9842" },
    "ROCK": { label: "Rock", color: "#a38c21" },
    "BUG": { label: "Bug", color: "#729f3f" },
    "GHOST": { label: "Ghost", color: "#7b62a3" },
    "STEEL": { label: "Steel", color: "#9eb7b8" },
    "FIRE": { label: "Fire", color: "#fd7d24" },
    "WATER": { label: "Water", color: "#4592c4" },
    "GRASS": { label: "Grass", color: "#9bcc50" },
    "ELECTRIC": { label: "Electric", color: "#eed535" },
    "PSYCHIC": { label: "Psychic", color: "#f366b9" },
    "ICE": { label: "Ice", color: "#51c4e7" },
    "DRAGON": { label: "Dragon", color: "#f16e57" },
    "DARK": { label: "Dark", color: "#707070" },
}

export const getEggGroups = () => {
    return Object.keys(EGG_GROUPS)
        .map(id => ({ key: id, label: EGG_GROUPS[id].label }))
}

export const getEggGroup = id => EGG_GROUPS[id]

export const getType = id => TYPES[id]

// Everything below is for the pokedex and all above are pokemon variants
export const POKEMON = pokemon.filter(pkmn => pkmn.id < 650)

export const getPokemon = (pkmnid) => pokemon.find(({ id }) => id === pkmnid)

export const getPokeDexID = (pkmnid, region) => {
    const entry = dex.find(({ id }) => id === pkmnid)
    if (entry) return entry[region]
}

export const getPokeDexIDs = (pkmnid) => {
    return {
        kanto_dex: getPokeDexID(pkmnid, "kanto"),
        johto_dex: getPokeDexID(pkmnid, "johto"),
        hoenn_dex: getPokeDexID(pkmnid, "hoenn"),
        sinnoh_dex: getPokeDexID(pkmnid, "sinnoh"),
        unova_dex: getPokeDexID(pkmnid, "unova"),
    }
}

export const getBaseForm = (id) => {
    let pkmn = pokemon.find(pkmn => pkmn.evolutions.some(evo => evo.id === id))
    if (!pkmn) return getPokemon(id)
    while (pkmn.evolutions.some(evo => evo.id !== id)) {
        pkmn = pokemon.find(pkmn => pkmn.evolutions.some(evo => evo.id === pkmn.id))
    }
    return pkmn
}

export const getPokemonThatCanHoldItem = (itemId) => {
    return pokemon.filter(pkmn => pkmn.held_items.filter(item => item.id === itemId).length > 0)
}

export const getPokemonEvolutions = (id) => {
    const pkmn = pokemon.find(pkmn => pkmn.id === id)
    if (pkmn) return pkmn.evoTree
}

export const isPokemonInLocation = (data = { region: false, route: false, pokemon }) => {
    const { region, route } = data;
    if (!region && !route) return true;

    return true;
}

export const getPokemonName = id => {
    const pkmn = pokemon.find(pkmn => pkmn.id === id)
    if (pkmn) return pkmn.name
}

export const getMoveName = moveId => {
    const move = moves.find(move => parseInt(move.id) === parseInt(moveId))
    if (move)
        return move.name;
}

export const getMove = moveId => {
    const move = moves.find(move => parseInt(move.id) === parseInt(moveId))
    if (move)
        return move;
}

export const getMoveTarget = targetId => {
    switch (targetId) {
        case 0:
            return "Single foe"
        case 1:
            return "User or ally"
        case 2:
            return "Adjacent ally"
        case 3:
            return "Adjacent Foe"
        case 4:
            return "All adjacent"
        case 5:
            return "All adjacent foes"
        case 6:
            return "All allies"
        case 7:
            return "User"
        case 8:
            return "All"
        case 9:
            return "Random foe"
        case 10:
            return "Field"
        case 11:
            return "Enemy Field"
        case 12:
            return "Ally field"
        case 13:
            return "Special"
        case 14:
            return "Single foe"
        default:
            return "Single foe"
    }
}