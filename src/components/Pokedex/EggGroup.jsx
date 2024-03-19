import React from 'react'
import { Image } from 'react-bootstrap'
import { EggIcon } from '../../assets/icons'
import { useTranslations } from '../../context/TranslationsContext'
import { getEggGroup } from '../../utils/pokemon'

import * as pokedexStyle from "./pokedex.module.css"

export const EggGroup = ({ id }) => {
    const { label, color } = getEggGroup(id)
    const { t } = useTranslations()
    return (
        <div
            className={`px-2 py-1 rounded d-flex align-items-center ${pokedexStyle[label]}`}
            style={{ backgroundColor: color, width: 'auto', textAlign: 'center', gap: '.5rem' }}
        >
            <Image src={EggIcon} style={{ height: '1rem' }} />
            {t(label)}
        </div>
    )
}
