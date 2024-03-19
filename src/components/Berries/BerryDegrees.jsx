import React from 'react';
import { Image, Stack } from 'react-bootstrap';
import { BERRIES_DEGREES, getSeeds } from '../../utils/berries';
import { Typography } from '../Atoms';

export const BerryDegrees = (berry) => {
    const seeds = getSeeds()
    return (
        <Stack gap={2} direction="horizontal" className='mb-1'>
            <Typography as="b" className='mb-0'>Seeds required: </Typography>
            {
                BERRIES_DEGREES.map((degree, index) => {
                    if (!berry[degree.key]) return null;
                    const seed = seeds.find(({ type }) => type === degree.label.toLowerCase())
                    return <Typography className='mb-0' key={index}><Image src={`/item/${seed.id}.png`} alt={degree.label} title={degree.label} /> {berry[degree.key]}</Typography>
                })
            }
        </Stack>
    )
}
