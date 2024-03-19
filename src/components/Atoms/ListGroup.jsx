import React from 'react';
import { ListGroup as ListGroupBS, ListGroupItem } from 'react-bootstrap';
import { useDarkMode } from '../../context/DarkModeContext';
import { Card } from './Card';

export const ListGroup = ({ children, ...props }) => {
    return (
        <Card bodyClassName="p-0">
            <ListGroupBS variant="flush" {...props}>
                {children}
            </ListGroupBS>
        </Card>
    )
}

export const ListItem = ({ children, style, ...props }) => {
    const { isDark } = useDarkMode();
    return (
        <ListGroupItem style={{ backgroundColor: isDark ? "#343a40" : '', color: isDark ? '#fff' : '', ...style }} variant={isDark ? 'dark' : ''} {...props}>{children}</ListGroupItem>
    )
}