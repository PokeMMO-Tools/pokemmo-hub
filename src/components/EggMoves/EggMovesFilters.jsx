import React from 'react';
import { Search, Typography } from '../Atoms';

import evolutions from '../../data/evolutions.json';
import { POKEMON } from '../../utils/pokemon';
import { useTranslations } from '../../context/TranslationsContext';


export const EggMovesFilters = ({ onFilter }) => {
    const { t } = useTranslations()
    return (
        <div>
            <Typography className='mb-0' style={{ fontSize: '.95rem' }}>Choose your Pokemon</Typography>
            <Search
                items={
                    POKEMON
                        .map(pkmn => {
                            const baseFormId = evolutions.find(item => item.includes(pkmn.id))
                            return {
                                value: baseFormId && baseFormId.length ? baseFormId[0] : pkmn.id,
                                label: t(pkmn.name)
                            }
                        })
                }
                onChange={item => onFilter(item.value)}
            />
        </div>
    )
}