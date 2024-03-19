import React from 'react'
import { Stack } from 'react-bootstrap'
import { InterfaceItems } from '../../interface/items'
import { Badge, Typography } from '../Atoms'
import { ItemImage } from './ItemImage'
import { ItemPrices } from './ItemPrices'

export const ItemHeading = ({ category, i, _id, name }) => {
    return (
        <Stack direction='horizontal' gap={2} className='flex-wrap'>
            <ItemImage category={category} id={_id}></ItemImage>
            <Typography as='h1'>{name}</Typography>
            <Badge text="dark" bg="info" className="fs-6 me-lg-auto fw-normal">
                {InterfaceItems.category[category]}
            </Badge>
            <ItemPrices i={i} />
        </Stack>
    )
}
