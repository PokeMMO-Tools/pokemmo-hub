import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import { usePokedex } from '../../context/PokedexContext';
import { useTranslations } from '../../context/TranslationsContext';
import { useCatchRate } from '../../hooks/useCatchRate';
import { getPokeDexIDs } from '../../utils/pokemon';
import { Card, Typography, Badge } from '../Atoms';
import { CatchResults } from './CatchResults';
import { EggGroupList } from './EggGroupList';
import { PokemonActionBar } from './PokemonActionBar';
import { PokemonBaseStats } from './PokemonBaseStats';
import { PokemonDexBar } from './PokemonDexBar';
import { PokemonHeldItems } from './PokemonHeldItems';
import { PokemonLocations } from './PokemonLocations';
import { PokemonMoveset } from './PokemonMoveset';
import { TypeList } from './TypeList';

export const PokemonSection = ({ children, show, title }) => {
    return (
        <div style={{ maxHeight: show ? 300 : 0, overflow: 'scroll', transition: '.3s' }} className="overflow-scroll">
            <div className='p-2'>
                <Typography className="pt-2" as="h3">{title}</Typography>
                {children}
            </div>
        </div>
    )
}

export const PokemonItem = (pokemon) => {
    const { id } = pokemon;
    const { kanto_dex, johto_dex, hoenn_dex, sinnoh_dex, unova_dex } = getPokeDexIDs(id);
    const { name, sprite } = pokemon;
    const { egg_groups } = pokemon;
    const { types } = pokemon;
    const { held_items: heldItems } = pokemon;
    const { hp, attack, defense, sp_attack, sp_defense, speed } = pokemon.stats;
    const { ev_hp, ev_attack, ev_defense, ev_sp_attack, ev_sp_defense, ev_speed } = pokemon.yields;
    const { TABS, activeTab } = usePokedex()
    const [itemActiveTab, setItemActiveTab] = useState(false)
    const catchResults = useCatchRate(id, hp);
    const { t } = useTranslations();
    const locationList = pokemon.locations
    const toggleTab = tabId => setItemActiveTab(prev => prev !== tabId ? tabId : '')

    const size = { width: 80, height: 80 }

    const evLabels = [
        { label: 'HP', value: ev_hp },
        { label: 'ATK', value: ev_attack },
        { label: 'DEF', value: ev_defense },
        { label: 'SP. ATK', value: ev_sp_attack },
        { label: 'SP. DEF', value: ev_sp_defense },
        { label: 'SPEED', value: ev_speed },
    ];

    const nonZeroEvs = evLabels.filter(ev => ev.value > 0);
    const evDisplay = nonZeroEvs.map(ev => `${ev.value} ${ev.label}`).join(', ');

    useEffect(() => {
        setItemActiveTab(activeTab)
    }, [activeTab])

    return (
        <Card className="mb-3 rounded" bodyClassName={'p-2'}>
            <Stack direction="horizontal" gap={3}>
                <GatsbyImage
                    style={{ maxWidth: '80px', width: size.width, height: size.height }}
                    image={sprite.node.childImageSharp.gatsbyImageData}
                    alt={name}
                />
                <Stack gap={1} style={{ justifyContent: 'center' }}>
                    <Stack gap={2}>
                        <Stack gap={4} direction="horizontal" className='align-items-start'>
                            <div style={{ flex: "1" }}>
                                <Typography as="h4" className="mb-0">{t(name)}</Typography>
                                {
                                    isMobile ? false : <PokemonDexBar nationalDex={id} kanto_dex={kanto_dex} johto_dex={johto_dex} hoenn_dex={hoenn_dex} sinnoh_dex={sinnoh_dex} unova_dex={unova_dex} />
                                }
                                {evDisplay && <Badge>EV: {evDisplay}</Badge>}
                            </div>
                            <PokemonActionBar
                                onClick={tabId => toggleTab(tabId)}
                                active={itemActiveTab}
                                locationList={locationList}
                                {...pokemon}
                            />
                        </Stack>
                        <PokemonHeldItems heldItems={heldItems} />
                        <Stack gap={4} direction="horizontal" className='align-items-start justify-content-between'>
                            <EggGroupList groups={egg_groups} />
                            {
                                isMobile ? false : <TypeList types={types} />
                            }
                        </Stack>
                    </Stack>
                </Stack>
            </Stack >
            <>
                <PokemonSection show={itemActiveTab === TABS.LOCATION ? true : false} title={t("Locations")}>
                    <PokemonLocations dexID={id} locationList={locationList} />
                </PokemonSection>
                <PokemonSection show={itemActiveTab === TABS.MOVES ? true : false} title={t("Moveset")}>
                    <PokemonMoveset dexID={id} moves={pokemon.moves} />
                </PokemonSection>
                <PokemonSection show={itemActiveTab === TABS.CATCH_RATE ? true : false} title={t("Catch rates")}>
                    <CatchResults
                        results={catchResults}
                    />
                </PokemonSection>
                <PokemonSection
                    show={itemActiveTab === TABS.STATS ? true : false}
                    title={t("Stats")}>
                    <PokemonBaseStats hp={hp} atk={attack} def={defense} spatk={sp_attack} spdef={sp_defense} spe={speed} />
                </PokemonSection>
            </>
        </Card >
    )
}