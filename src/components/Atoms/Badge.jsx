import React from 'react'
import { Badge as BadgeBs } from 'react-bootstrap'
import { useDarkMode } from '../../context/DarkModeContext'
import { useTranslations } from '../../context/TranslationsContext'

export const Badge = ({ children, ...props }) => {
    const { isDark } = useDarkMode()
    const { t } = useTranslations();
    return (
        <BadgeBs bg={isDark ? 'secondary' : 'primary'} {...props}>
            {t(children)}
        </BadgeBs>
    )
}
