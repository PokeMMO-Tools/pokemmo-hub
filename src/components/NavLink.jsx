import { Link } from 'gatsby'
import React from 'react'
import { Nav } from 'react-bootstrap'

export function NavLink({ to, onClick, children, target = '_self' }) {
    return (
        <Nav.Item>
            <Nav.Link target={target} as={Link} to={to} onClick={onClick}>{children}</Nav.Link>
        </Nav.Item>
    )
}