import React from 'react'
import { Typography } from '../Atoms'
import { useTranslations } from '../../context/TranslationsContext';

export const PokedexLabel = ({ color, dexName, dexNumber }) => {
    const { t } = useTranslations();
    return (
        <div style={{}}>
            <Typography as="small" className="text-muted">{dexName + " #" + dexNumber}</Typography>
        </div>
    )
}
