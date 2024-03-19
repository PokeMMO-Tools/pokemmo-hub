import React from 'react'
import { Bulbasaur, Charmander, Dratini, Eevee, Meowth, Pikachu, Snorlax } from '../assets/icons'

export const RandomPokemonEasterEgg = () => {
    const allImages = [Bulbasaur, Charmander, Dratini, Eevee, Meowth, Pikachu, Snorlax]
    return (
        <>
            <img src={Dratini} alt="" className='random-pokemon-easter-egg top-right' />
            <img src={allImages[[Math.floor(Math.random() * allImages.length)]]} alt="" className='random-pokemon-easter-egg bottom-left' />
        </>
    )
}
