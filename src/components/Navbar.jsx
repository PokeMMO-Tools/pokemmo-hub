import React from 'react'
import { Container, Navbar as NavbarBs, Stack } from 'react-bootstrap'
import { useDarkMode } from '../context/DarkModeContext'
import { AccountButton } from './Account/AccountButton'
import { DarkModeToggler } from './Header/DarkModeToggler'
import { Logo } from './Header/Logo'

export function Navbar() {
    const { theme } = useDarkMode()

    return (
        <NavbarBs bg={theme} variant={theme} className="shadow-sm mb-3">
            <Container>
                <Stack direction='horizontal' className='justify-content-between w-100' gap={2}>
                    <Stack direction='horizontal' gap={3} className="align-items-center">
                        <Logo />
                    </Stack>
                    <Stack direction='horizontal' gap={2}>
                        <DarkModeToggler />
                        <AccountButton />
                    </Stack>
                </Stack>
            </Container>
        </NavbarBs>
    )
}
