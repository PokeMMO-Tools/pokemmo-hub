import React from 'react'
import {TbArrowUpRight, TbBow, TbChartBar, TbLocation, TbPokeball} from 'react-icons/tb'
import { usePokedex } from '../../context/PokedexContext'
import { ActionToggler } from './ActionToggler'
import { useTranslations } from '../../context/TranslationsContext'
import { isMobile, isTablet } from 'react-device-detect'

export const PokemonActionBar = ({ locationList, active, onClick, evolutions }) => {
    const { TABS } = usePokedex()
    const { t } = useTranslations()
    return (
        <div className="d-flex" style={{ gap: ".5rem" }}>
            <>
                {
                    locationList.length
                        ? <ActionToggler
                            active={active === TABS.LOCATION}
                            onClick={() => onClick(TABS.LOCATION)}
                            icon={<TbLocation />}
                            title={
                                !isMobile || isTablet
                                    ?
                                    t('locations')
                                    :
                                    false
                            }
                        />
                        : false
                }
                <ActionToggler
                    active={active === TABS.MOVES}
                    onClick={() => onClick(TABS.MOVES)}
                    icon={<TbBow />}
                    title={
                        !isMobile || isTablet
                            ?
                            t('move list')
                            :
                            false
                    }
                />
                <ActionToggler
                    active={active === TABS.CATCH_RATE}
                    onClick={() => onClick(TABS.CATCH_RATE)}
                    icon={<TbPokeball />}
                    title={
                        !isMobile || isTablet
                            ?
                            t('catch rates')
                            :
                            false
                    }
                />
                <ActionToggler
                    active={active === TABS.STATS}
                    onClick={() => onClick(TABS.STATS)}
                    icon={<TbChartBar />}
                    title={
                        !isMobile || isTablet
                            ?
                            t('stats')
                            :
                            false
                    }
                />
                {
                    evolutions.length
                        ? <ActionToggler
                            active={active === TABS.EVOLUTIONS}
                            onClick={() => onClick(TABS.EVOLUTIONS)}
                            icon={<TbArrowUpRight />}
                            title={
                                !isMobile || isTablet
                                    ?
                                    t('evolutions')
                                    :
                                    false
                            }
                        />
                        : false
                }
            </>
        </div>

    )
}