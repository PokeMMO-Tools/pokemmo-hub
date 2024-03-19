import React from 'react'
import { PathRow } from './PathRow'

export const PathResult = ({ sprites, paths }) => {

    return (
        <div className="mt-2 pt-2">
            {paths.map((path, index) => <PathRow key={index} path={path} sprites={sprites} />)}
        </div>
    )
}
