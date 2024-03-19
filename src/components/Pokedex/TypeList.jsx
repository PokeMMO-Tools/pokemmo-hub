import React from 'react'
import { Stack } from 'react-bootstrap'
import { Type } from './Type'

export const TypeList = ({ types }) => {
    types = [...new Set(types)]
    return (
        <Stack direction="horizontal" gap={2}>
            {
                types.map(type => type ? <Type key={type} id={type} /> : false)
            }
        </Stack>
    )
}
