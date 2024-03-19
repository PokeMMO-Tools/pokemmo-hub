import React from 'react'
import { BreedingItem } from './BreedingItem'

import * as breedingStyle from "./breeding.module.css"

export function BreedingRow({ row, count, maxRows }) {

    return (
        <div className={`d-flex ${breedingStyle.breedingRows}`} style={{ gap: '.5rem' }}>
            {
                [...Array(count)].map((_, index, array) => {
                    return <BreedingItem
                        key={`${row}-${index}`}
                        maxItems={array.length}
                        maxRows={maxRows}
                        row={row}
                        index={index}
                    ></BreedingItem>
                })
            }
        </div>
    )
}
