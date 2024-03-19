import React from 'react'
import { Stack } from 'react-bootstrap'
import { getBerryInfo, getItemInfo } from '../../utils/items'
import { AccountBerry } from '../Berries/AccountBerry'
import { BerryItem } from '../Berries/BerryItem'

export const ItemBerry = ({ id }) => {
    const berry = {
        ...getItemInfo(id),
        ...getBerryInfo(id)
    }
    return (
        <Stack direction="horizontal" className='align-items-stretch mb-3 flex-wrap' gap={3}>
            <BerryItem berry={berry} style={{ flex: "0 1 200px" }} />
            <AccountBerry style={{ flex: "1" }} />
        </Stack>
    )
}
