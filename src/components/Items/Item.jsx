import React from 'react'
import { ItemBerry } from './ItemBerry'
import { ItemCosmetic } from './ItemCosmetic'

export const Item = ({ data }) => {

    return (
        <div className='mb-3'>
            {
                data.category === 2
                    ? <ItemBerry id={data._id} />
                    : false
            }
            {
                // Cosmetics
                data.category === 6
                    ? <ItemCosmetic id={data._id} />
                    : false

            }
        </div>
    )
}
