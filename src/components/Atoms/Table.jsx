import React from 'react'
import { Table as TableBS } from 'react-bootstrap'
import { useDarkMode } from '../../context/DarkModeContext'

export const Table = ({ children, ...props }) => {
    const { isDark } = useDarkMode()
    return (
        <TableBS {...props} variant={isDark ? 'dark' : 'light'}>
            {children}
        </TableBS>
    )
}
