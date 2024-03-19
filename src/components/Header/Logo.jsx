import { Link } from 'gatsby'
import React from 'react'
import { Image, Stack } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import logo from '../../images/logo.svg'
import { Typography } from '../Atoms'

export const Logo = () => {
    return (
        <Link to="/" className='fs-3 mb-0 d-flex align-items-center text-decoration-none' style={{ gap: '.2rem' }}>
            <Image style={{ width: '2em' }} src={logo} alt="Logo di PokeMMO Guides - Thanks to Bunga" />
            <div className='lh-1 d-flex flex-column'>
                <Stack direction="horizontal" gap={2}>
                    <Typography as="h1" className='fs-3 fw-bold mb-0 lh-1' translate={false}>PokeMMO Hub</Typography>
                </Stack>
                <Typography as="h2" className='text-muted mb-0' style={{ fontSize: isMobile ? '.8rem' : '1rem' }}>Guides, item prices, investments, and tools for PokeMMO</Typography>
            </div>
        </Link>
    )
}
