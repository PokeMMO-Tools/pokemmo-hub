import React from 'react'
import { TbBow, TbChartBar, TbLocation, TbPokeball } from 'react-icons/tb'
import { usePokedex } from '../../context/PokedexContext'
import { ActionToggler } from './ActionToggler'

export const PokemonActionBar = ({ locationList, active, onClick }) => {
    const { TABS } = usePokedex()
    return (
        <div className="d-flex" style={{ gap: ".5rem" }}>
            <>
                {
                    locationList.length
                        ? <ActionToggler
                            active={active === TABS.LOCATION ? true : false}
                            onClick={() => onClick(TABS.LOCATION)}
                            icon={<TbLocation />}
                        />
                        : false
                }
                <ActionToggler
                    active={active === TABS.MOVES ? true : false}
                    onClick={() => onClick(TABS.MOVES)}
                    icon={<TbBow />}
                />
                <ActionToggler
                    active={active === TABS.CATCH_RATE ? true : false}
                    onClick={() => onClick(TABS.CATCH_RATE)}
                    icon={<TbPokeball />}
                />
                <ActionToggler
                    active={active === TABS.STATS ? true : false}
                    onClick={() => onClick(TABS.STATS)}
                    icon={<TbChartBar />}
                />
            </>
        </div>

    )
}