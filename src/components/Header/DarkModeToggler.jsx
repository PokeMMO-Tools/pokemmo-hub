import React from 'react'
import { Image } from 'react-bootstrap'
import { Lunatone, Solrock } from '../../assets/icons'
import { useDarkMode } from '../../context/DarkModeContext'
import { Button } from '../Atoms'

export const DarkModeToggler = () => {
    const { isDark, toggleDarkMode } = useDarkMode()
    return (
        <Button size="sm" className="p-0" onClick={toggleDarkMode} variant={isDark ? 'light' : 'dark'}>
            {
                <Image src={isDark ? Solrock : Lunatone} style={{ height: '1.8rem', width: '1.8rem' }} />
            }
        </Button>
    )
}
