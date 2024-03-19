import React from 'react'
import { Card as CardBS } from 'react-bootstrap'
import { useDarkMode } from '../../context/DarkModeContext'

export const Card = ({ children, bodyClassName, ...props }) => {
    const { isDark } = useDarkMode()
    return (
        <CardBS bg={isDark ? 'dark' : 'light'} text={isDark ? 'light' : 'dark'} {...props} >
            <CardBS.Body className={bodyClassName}>
                {children}
            </CardBS.Body>
        </CardBS>
    )
}
