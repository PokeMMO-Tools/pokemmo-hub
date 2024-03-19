import React from 'react'
import { useDarkMode } from '../../context/DarkModeContext'
import { useTranslations } from '../../context/TranslationsContext'

export const Typography = ({ children, as = 'p', highlight = false, className = '', style = {}, translate = true, ...props }) => {
    const { isDark } = useDarkMode()
    const { t } = useTranslations();
    const As = highlight ? 'span' : as

    return (
        <As
            {...props}
            style={style}
            className={`${!style.color && !className.includes('text-') ? isDark ? 'text-light' : 'text-dark' : ''} ${highlight ? 'fw-bold fs-5' : ''} ${className} `}
        >
            {
                translate ? t(children) : children
            }
        </As>
    )
}
