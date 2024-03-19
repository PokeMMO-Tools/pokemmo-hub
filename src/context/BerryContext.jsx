import React, { createContext, useContext } from 'react';
import { useAccount } from "../context/AccountContext";
import { useLocalStorage } from '../hooks/useLocalStorage';
import { BERRIES_FAVORITES, DEFAULT_ACCOUNT_BERRY } from "../interface/berries";

const BerriesContext = createContext({
    accountBerries: DEFAULT_ACCOUNT_BERRY,
    berriesFavorites: BERRIES_FAVORITES,
    setAccountBerry: () => null,
    addBerry: id => null,
    removeBerry: _id => null,
    waterBerry: _id => null,
    updateBerry: (_id, update) => null,
    addFavoriteBerry: id => null,
    removeFavoriteBerry: id => null
})

export function useBerries() {
    return useContext(BerriesContext)
}

export function BerriesProvider({ children }) {
    const { account, updateAccount } = useAccount();
    const { berries } = account;
    const [accountBerries, setAccountBerries] = useLocalStorage('berriesAccount', DEFAULT_ACCOUNT_BERRY)
    const [berriesFavorites, setBerriesFavorites] = useLocalStorage('berriesFavorites', BERRIES_FAVORITES)

    const addBerry = id => {
        const berry = {
            _id: Date.now(),
            id,
            tsPlant: Date.now(),
            tsLastWater: Date.now()
        };
        updateAccount({
            berries: {
                ...berries,
                planted: [...berries.planted, berry]
            }
        })
    }
    const removeBerry = _id => {
        updateAccount({
            berries: {
                ...berries,
                planted: berries.planted.filter(planted => planted._id !== _id)
            }
        })
    }
    const waterBerry = _id => {
        updateAccount({
            berries: {
                ...berries,
                planted: berries.planted.map(planted => (
                    planted._id === _id
                        ? { ...planted, tsLastWater: Date.now() }
                        : planted
                ))
            }
        })
    }
    const updateBerry = (_id, update) => {
        updateAccount({
            berries: {
                ...berries,
                planted: berries.planted.map(planted => (
                    planted._id === _id
                        ? { ...planted, ...update }
                        : planted
                ))
            }
        })
    }

    const addFavoriteBerry = id => {
        updateAccount({
            berries: {
                ...berries,
                favorites: [...berries.favorites, id]
            }
        })
    }
    const removeFavoriteBerry = id => {
        updateAccount({
            berries: {
                ...berries,
                favorites: berries.favorites.filter(_id => _id !== id)
            }
        })
    }

    return (
        <BerriesContext.Provider value={{ accountBerries: berries.planted, setAccountBerries, berriesFavorites: berries.favorites, addBerry, removeBerry, waterBerry, updateBerry, addFavoriteBerry, removeFavoriteBerry }}>
            {children}
        </BerriesContext.Provider>
    )
}