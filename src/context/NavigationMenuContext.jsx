import React, { createContext, useContext, useState } from 'react';
import { Footer } from '../components/Footer';
import { Navbar } from "../components/Navbar";
import { RandomPokemonEasterEgg } from '../components/RandomPokemonEasterEgg';
import POSTS from '../data/posts.json';

const NavigationMenuContext = createContext({
    posts: [],
    toggleNav: () => null,
    pageName: 'Homepage',
    setPageName: () => null
})

const NAVIGATION_MENU_ITEMS = {
    TOOLS: [
        {
            label: 'Pokedex',
            url: '/tools/pokedex'
        },
        {
            label: 'Breeding Simulator',
            url: '/tools/breeding'
        },
        {
            label: 'Egg Moves Calculator',
            url: '/tools/egg-moves-calculator'
        },
        {
            label: 'Cosmetics Helper',
            url: '/tools/cosmetics'
        }
    ],
    EXTERNAL_RESOURCES: [
        {
            label: 'Official Forum',
            url: 'https://forums.pokemmo.com/'
        },
        {
            label: 'PokeMMO Duders Discord',
            url: 'https://discord.com/invite/7DnX2g7kTD'
        },
        {
            label: 'Patrouski Youtube Channel',
            url: 'https://www.youtube.com/c/patrouski/videos'
        },
        {
            label: 'Pokemon Showdown Damage Calculator',
            url: 'https://calc.pokemonshowdown.com/?gen=5'
        },
        {
            label: 'Smogon Competitive Pokemon',
            url: 'https://www.smogon.com/dex/bw/pokemon/'
        }
    ]
}

export function useNavigationMenu() {
    return useContext(NavigationMenuContext)
}

export function NavigationMenuProvider({ children }) {
    const [pageName, setPageName] = useState('Homepage');

    return (
        <NavigationMenuContext.Provider value={{ pageName, setPageName, NAVIGATION_MENU_ITEMS, POSTS: POSTS.reverse() }}>
            <Navbar />
            <div className='webapp'>
                {children}
            </div>
            <RandomPokemonEasterEgg />
            <Footer />
        </NavigationMenuContext.Provider>
    )
}