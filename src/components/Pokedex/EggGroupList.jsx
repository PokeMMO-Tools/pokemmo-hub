import React from 'react'
import { Stack } from 'react-bootstrap'
import { EggGroup } from './EggGroup'

export const EggGroupList = ({ groups }) => {

    return (
        <Stack direction="horizontal" gap={2}>
            {
                groups.map(egg => egg ? <EggGroup key={egg} id={egg} /> : false)
            }
        </Stack>
    )
}
