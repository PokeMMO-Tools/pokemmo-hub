import React, { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroller';

import { usePokedex } from '../../context/PokedexContext';
import { useTranslations } from '../../context/TranslationsContext';
import { getLocation } from '../../utils/location';
import { Adsense, Card } from '../Atoms';
import { PokemonItem } from './PokemonItem';

import AD_LIST from '../../data/ads.json';
import { getPokeDexID, getPokeDexIDs, POKEMON } from '../../utils/pokemon';

const POKEMON_PER_PAGE = 50;

const filterByName = (name, pokeName) => {
    if (name === '') return true;
    return pokeName.toLowerCase().includes(name.toLowerCase().replace(' ', ''));
}

const filterByDexID = (input, pokemon, regionFilter) => {
    if (input === '') return true;
    if (isNaN(input)) return false;
    const id = parseInt(input);
    const { kanto_dex, johto_dex, hoenn_dex, sinnoh_dex, unova_dex } = getPokeDexIDs(pokemon.id);
    switch (regionFilter) {
        case 1:
            return kanto_dex === id;
        case 2:
            return johto_dex === id;
        case 3:
            return hoenn_dex === id;
        case 4:
            return sinnoh_dex === id;
        case 5:
            return unova_dex === id;
        default:
            return pokemon.id === id || kanto_dex === id || johto_dex === id || hoenn_dex === id || sinnoh_dex === id || unova_dex === id;
    }

}

const filterByEggGroup = (eggGroup, pokemon) => {
    if (!eggGroup) return true;
    return pokemon.egg_groups.includes(eggGroup);
}

const filterPokedex = (filters, t) => {
    return POKEMON
        .filter(pokemon => {
            if (filters.region) {
                // get the dex id for the region
                const { kanto_dex, johto_dex, hoenn_dex, sinnoh_dex, unova_dex } = getPokeDexIDs(pokemon.id);
                // if the pokemon doesn't have the dex id or 0, filter it out
                switch(filters.region) {
                    case "kanto":
                        if (!kanto_dex)
                            return false;
                        break;
                    case "johto":
                        if (!johto_dex)
                            return false;
                        break;
                    case "hoenn":
                        if (!hoenn_dex)
                            return false;
                        break;
                    case "sinnoh":
                        if (!sinnoh_dex)
                            return false;
                        break;
                    case "unova":
                        if (!unova_dex)
                            return false;
                        break;
                    default:
                        break;
                }
            }
            
            let hasNoLocations = !pokemon.locations.length;
            let hasNoFilters = !filters.encounterType && !filters.encounterTrigger && !filters.route;

            // if there are no locations but there are filters, filter it out
            if (!hasNoFilters && hasNoLocations)
                return false;

            // skip loop if there are no locations
            // skip loop if there are no location filters
            let locationCount = 0;
            for (let idx = 0; idx < pokemon.locations.length && !hasNoFilters; idx++) {
                // get current location
                const location = pokemon.locations[idx];

                // apply filters if they exist
                if (filters.region && filters.region.toLowerCase() !== location.region_name.toLowerCase())
                    continue;
                if (filters.encounterType && filters.encounterType !== location.type)
                    continue;
                if (filters.encounterTrigger && filters.encounterTrigger !== location.rarity)
                    continue;
                if (filters.route && filters.route !== location.location)
                    continue;

                locationCount++;
            }
            // if there are no locations but filters, filter it out
            if (locationCount === 0 && !hasNoFilters)
                return false;

            if (!filterByName(filters.name, pokemon.name) && !filterByName(filters.name, t(pokemon.name)) &&
                !filterByDexID(filters.name, pokemon, filters.region)
            )
                return false;
            if (!filterByEggGroup(filters.eggGroup, pokemon))
                return false

            if (filters.type)
                if (!pokemon.types.includes(filters.type))
                    return false;
            return true
        })
}

const sortPokedex = (pokedex, region) => {
    switch (region) {
        case "kanto":
        case "johto":
        case "hoenn":
        case "sinnoh":
        case "unova":
            pokedex.sort((a, b) => getPokeDexID(a.id, region) - getPokeDexID(b.id, region));
            break;
        default:
            pokedex.sort((a, b) => a.id - b.id);
            break;
    }
    return pokedex;
}

export const PokemonList = ({ sprites }) => {
    const [maxCount, setMaxCount] = useState(POKEMON_PER_PAGE);
    const { filters } = usePokedex()
    const { t } = useTranslations();
    const pokemonList = sortPokedex(filterPokedex(filters, t), filters.region);
    const hasMore = maxCount < pokemonList.length

    return (
        <InfiniteScroll
            hasMore={hasMore}
            loadMore={() => setMaxCount(prev => prev + POKEMON_PER_PAGE)}
            loader={<Spinner key={0} animation="grow" />}
        >
            {
                pokemonList.length > 0
                    ? pokemonList
                        .slice(0, maxCount)
                        .map((pokemon, index) => {
                            const sprite = sprites.find(({ node }) => parseInt(node.name) === parseInt(pokemon.id))
                            if (!sprite) return false;
                            return (
                                <div key={pokemon.id}>
                                    <PokemonItem {...pokemon} sprite={sprite} />
                                </div>
                            )
                        })
                    : <Card body>{t("No results found...")}</Card>
            }
        </InfiniteScroll>

    )
}