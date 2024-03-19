import React from 'react'
import { TbArrowsRightLeft } from 'react-icons/tb'
import { Button } from '../Atoms'

export const VariationPicker = ({ onUpdateVariation }) => {
    return (
        <Button variant='warning' onClick={onUpdateVariation}><TbArrowsRightLeft /></Button>
    )
}
