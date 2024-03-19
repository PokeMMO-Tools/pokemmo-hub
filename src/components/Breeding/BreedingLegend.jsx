import React from 'react'
import { useBreeding } from '../../context/BreedingContext'
import { Typography } from '../Atoms'

import IVS_DATA from '../../data/ivs'

export function BreedingLegend() {
    const { breedingConfig } = useBreeding()
    const { IV_STATS, IV_COLORS } = IVS_DATA

    return (
        <div className="d-flex justify-content-center" style={{ gap: '1rem' }}>
            {
                Object.values(breedingConfig.iv)
                    .filter(iv => iv)
                    .map(iv => (
                        <div key={iv} className="d-flex align-items-center" style={{ gap: '.5rem' }}>
                            <div style={{ height: '1rem', width: '1rem', borderRadius: '1rem', backgroundColor: IV_COLORS[iv] }}></div>
                            <Typography as="span">{IV_STATS.find(({ id }) => id === iv).label}</Typography>
                        </div>
                    ))
            }
            {
                breedingConfig.nature ? <div className="d-flex align-items-center" style={{ gap: '.5rem' }}>
                    <div style={{ height: '1rem', width: '1rem', borderRadius: '1rem', backgroundColor: IV_COLORS['nat'] }}></div>
                    <Typography as="span">Nature</Typography>
                </div> : null
            }
        </div>
    )
}
