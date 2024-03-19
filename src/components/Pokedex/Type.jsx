import React from 'react'
import { useTranslations } from '../../context/TranslationsContext'
import { getType } from '../../utils/pokemon'

export const Type = ({ id, className = '', size = "regular" }) => {
    const { label, color } = getType(id)
    const { t } = useTranslations()

    const padding = size === "small" ? "px-2 py-0" : "px-2 py-1"
    return (
        <div
            className={`${padding} rounded d-flex align-items-center ${className}`}
            style={{ backgroundColor: color, width: 'auto', textAlign: 'center', gap: '.5rem' }}
        >
            {t(label)}
        </div>
    )
}
