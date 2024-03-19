import React from 'react';
import { usePokedex } from '../../context/PokedexContext';
import { useTranslations } from '../../context/TranslationsContext';
import { Table } from '../Atoms';

export const PokemonLocations = ({ locationList }) => {
    const { filters } = usePokedex();
    const { t } = useTranslations();
    return (
        <div>
            <Table responsive hover size="sm" style={{ border: '1px solid transparent' }}>
                <thead className='border-bottom' style={{ position: 'sticky', top: 0, background: 'white' }}>
                    <tr style={{borderColor: "transparent" /* Fixes weird pixel bug on Firefox */ }}>
                        <th>{t("Region")}</th>
                        <th>{t("Route")}</th>
                        <th>{t("Rarity")}</th>
                        <th>{t("Type")}</th>
                        <th>{t("Level")}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        locationList
                            .filter(location => {
                                if (!filters.region && !filters.route && !filters.encounterTrigger && !filters.encounterType) return true;
                                if (filters.region && filters.region.toLowerCase() !== location.region_name.toLowerCase()) return false;
                                if (filters.route && filters.route.toLowerCase() !== location.location.toLowerCase()) return false;
                                if (filters.encounterTrigger && filters.encounterTrigger !== location.rarity) return false
                                if (filters.encounterType && filters.encounterType !== location.type) return false
                                return true
                            })
                            .map((item, index) => {
                                const { min_level, max_level } = item
                                const level = min_level === max_level ? min_level : `${min_level} - ${max_level}`
                                return (
                                <tr key={index}>
                                        <td className='text-capitalize'>{t(item.region_name)}</td>
                                        <td className='text-capitalize'>{t(item.location)}</td>
                                        <td className='text-capitalize'>{t(item.rarity)}</td>
                                        <td className='text-capitalize'>{t(item.type)}</td>
                                    <td className='text-capitalize'>{level}</td>
                                </tr>
                                )
                            })
                    }
                </tbody>
            </Table>
        </div>
    )
}
