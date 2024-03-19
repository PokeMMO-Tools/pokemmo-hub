import React, { createContext, useContext, useState } from 'react';


const DEFAULT_FILTERS = {
    name: '',
    region: false,
    route: false,
    eggGroup: false,
    encounterTrigger: false,
    encounterType: false,
    type: false
}

const TABS = {
    LOCATION: 'location',
    CATCH_RATE: 'catchrate',
    STATS: 'stats',
    MOVES: 'moves'
}

const PokedexContext = createContext({
    filters: DEFAULT_FILTERS,
    setFilters: () => null,
    resetFilters: () => null,
    setTabs: () => null,
    activeTab: false,
    TABS: TABS
})

export function usePokedex() {
    return useContext(PokedexContext)
}

export function PokedexProvider({ children }) {

    const [filters, setFilters] = useState(DEFAULT_FILTERS)
    const [activeTab, setActiveTab] = useState(false)

    const resetFilters = () => setFilters(DEFAULT_FILTERS)

    return (
        <PokedexContext.Provider value={{ filters, setFilters, resetFilters, TABS, activeTab, setActiveTab }}>
            {children}
        </PokedexContext.Provider>
    )
}