import React, { useEffect, useState } from 'react';
import { usePokedex } from '../../context/PokedexContext';
import { useTranslations } from '../../context/TranslationsContext';
import { getCurrentSeason, matchesHordeFilter, SEASONS } from '../../utils/location';
import { Badge, Table } from '../Atoms';
import { ActionToggler } from './ActionToggler';

const SWEET_SCENT_FLAGS = 2560;

const displayRarity = (rarity, item) => {
    if (rarity === '--') return '';
    if ((item.is_horde_3x || item.is_horde_5x) && item.rarity_flags !== SWEET_SCENT_FLAGS && rarity?.endsWith('%')) {
        return `${parseFloat(rarity) * 20}%`;
    }
    return rarity;
}

export const PokemonLocations = ({ locationList }) => {
    const { filters } = usePokedex();
    const { t } = useTranslations();
    const [season, setSeason] = useState(SEASONS[0].key);

    useEffect(() => {
        setSeason(getCurrentSeason());
    }, []);

    return (
        <div>
            <div className="d-flex mb-2 flex-wrap" style={{ gap: '.3rem' }}>
                {
                    SEASONS.map(({ key, label, icon }) => (
                        <ActionToggler
                            key={key}
                            size="sm"
                            title={label}
                            icon={icon}
                            active={season === key}
                            onClick={() => setSeason(key)}
                        />
                    ))
                }
            </div>
            <Table responsive hover size="sm" style={{ border: '1px solid transparent' }}>
                <thead className='border-bottom' style={{ position: 'sticky', top: 0, background: 'white' }}>
                    <tr style={{borderColor: "transparent" /* Fixes weird pixel bug on Firefox */ }}>
                        <th>{t("Type")}</th>
                        <th>{t("Region")}</th>
                        <th>{t("Location")}</th>
                        <th>{t("Levels")}</th>
                        <th>🌅 {t("Morning")}</th>
                        <th>☀️ {t("Day")}</th>
                        <th>🌙 {t("Night")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        locationList
                            .filter(location => {
                                if (location.season !== 'Any' && location.season !== season) return false;
                                if (!filters.region && !filters.route && !filters.encounterType && !filters.horde) return true;
                                if (filters.region && filters.region.toLowerCase() !== location.region_name.toLowerCase()) return false;
                                if (filters.route && filters.route.toLowerCase() !== location.location_name_full.toLowerCase()) return false;
                                if (filters.encounterType && filters.encounterType !== location.type) return false
                                if (filters.horde && !matchesHordeFilter(location, filters.horde)) return false
                                return true
                            })
                            .map((item, index) => {
                                const { min_level, max_level } = item
                                const level = min_level === max_level ? min_level : `${min_level} - ${max_level}`
                                return (
                                <tr key={index}>
                                        <td className='text-capitalize'>
                                            {t(item.type)}
                                            {
                                                (item.is_horde_3x || item.is_horde_5x)
                                                    ? <Badge className="ms-1" pill>{item.is_horde_5x ? 'x5' : 'x3'}</Badge>
                                                    : false
                                            }
                                        </td>
                                        <td className='text-capitalize'>{t(item.region_name)}</td>
                                        <td className='text-capitalize'>{t(item.location_name_full)}</td>
                                    <td className='text-capitalize'>{level}</td>
                                        <td className='text-capitalize'>{displayRarity(item.rarity_morning, item)}</td>
                                        <td className='text-capitalize'>{displayRarity(item.rarity_day, item)}</td>
                                        <td className='text-capitalize'>{displayRarity(item.rarity_night, item)}</td>
                                </tr>
                                )
                            })
                    }
                </tbody>
            </Table>
        </div>
    )
}
