import React from 'react';
import { Image, Stack } from 'react-bootstrap';
import { TbHeart } from 'react-icons/tb';
import { useBerries } from '../../context/BerryContext';
import { Button, Card, Typography } from '../Atoms';
import { BerryDegrees } from './BerryDegrees';
import { BerryDetails } from './BerryDetails';

export const BerryItem = ({ berry, style }) => {
    const { addBerry, berriesFavorites, addFavoriteBerry, removeFavoriteBerry } = useBerries();
    const isFavoriteBerry = berriesFavorites.find((id) => id === berry.item_id)

    const toggleFavoriteBerry = (berryId) => {
        isFavoriteBerry
            ? removeFavoriteBerry(berryId)
            : addFavoriteBerry(berryId)
    }

    return (
        <Card style={{ flex: '1 1 300px', ...style }}>
            <Stack direction="horizontal" gap={2} className="mb-2">
                <Image src={`/item/${berry.item_id}.png`}></Image>
                <Typography as="h5" className='mb-0'>{berry.en_name}</Typography>
                <Button variant='link' onClick={() => toggleFavoriteBerry(berry.item_id)} className="ms-auto">
                    <TbHeart size={24} color={isFavoriteBerry ? 'var(--bs-danger)' : 'var(--bs-gray)'} fill={isFavoriteBerry ? 'var(--bs-danger)' : 'var(--bs-gray)'} />
                </Button>
            </Stack>
            <Stack className='mb-3'>
                <BerryDegrees {...berry} key="degrees" />
                <BerryDetails {...berry} key="details" />
            </Stack>
            <Button size="sm" onClick={() => addBerry(berry.item_id)}>Plant</Button>
        </Card >
    )
}