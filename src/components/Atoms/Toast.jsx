import React from 'react'
import { Toast as ToastBS } from 'react-bootstrap'
import { useDarkMode } from '../../context/DarkModeContext'

export const Toast = ({ children, bg = 'light', ...props }) => {
    const { isDark } = useDarkMode()
    return (
        <ToastBS {...props} bg={bg === 'light' ? isDark ? 'dark' : 'light' : bg}>
            {children}
        </ToastBS>
    )
}
