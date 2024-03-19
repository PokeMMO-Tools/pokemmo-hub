import React from 'react'
import { Button } from '../Atoms'

export const ActionToggler = ({ onClick, active, title = "", size = "sm", icon = false, ...props }) => {
    return (
        <Button
            variant={active ? 'warning' : 'info'}
            size={size}
            className="d-flex align-items-center text-capitalize"
            style={{ gap: '.3rem' }}
            onClick={() => onClick()}
            {...props}
        >
            {title}
            {icon}
        </Button>
    )
}
