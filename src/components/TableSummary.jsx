import React from 'react';
import { Col } from 'react-bootstrap';
import { Typography } from './Atoms';

export function TableSummary({ items }) {
    if (!items) return;

    return (
        <Col md="3" style={{ borderLeft: '1px solid #eee' }}>
            <Typography className="fs-4">Table of Contents</Typography>
            <ul>
                {
                    Object.keys(items).map((key) => (
                        <li key={key}>
                            <a className="text-capitalize" href={`#${key}`}>{items[key]}</a>
                        </li>
                    ))
                }

            </ul>
        </Col>
    )
}