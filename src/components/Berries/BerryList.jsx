import React from 'react'
import { Stack } from 'react-bootstrap'
import { useGetBerries } from '../../utils/berries'
import { BerryItem } from './BerryItem'

export const BerryList = () => {
    const berries = useGetBerries()
    if (!berries) return;
    return (
        <Stack direction="horizontal" className='flex-wrap' gap={3}>
            {
                berries.map((item, index) => {
                    return <BerryItem key={index} berry={item} />
                })
            }
        </Stack>
    )
}
