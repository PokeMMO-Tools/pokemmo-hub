import React from 'react'
import { Stack } from 'react-bootstrap'
import { RealEggIcon } from '../../assets/icons'
import { PathItem } from './PathItem'

export const PathRow = ({ sprites, path }) => {
    return (
        <Stack direction="horizontal" className="mb-4 overflow-scroll" style={{ gap: '.5rem' }}>
            {
                [...path].reverse().map((item, index, arg) => (
                    <div class="d-flex align-items-center" key={index}>
                        <PathItem path={item} sprites={sprites} />
                        {
                            console.log(arg.length, index)
                        }
                        {
                            arg.length > index + 1 ? <img style={{ maxWidth: '20px' }} src={RealEggIcon} alt={"Breed with"} /> : false
                        }
                    </div>
                ))
            }
        </Stack>
    )
}
