import React from 'react'
import { Card as CardBS } from 'react-bootstrap'
import { Badge, Button, Card, Typography } from './Atoms'

export function Post({ title, excerpt, url, credits, category, isNew }) {
    return (
        <Card className="rounded" style={{ border: 0, flex: '1 1 280px', padding: "0!important" }} bodyClassName="d-flex flex-column align-items-start">
                <div className='mb-2 d-flex' style={{ gap: '.5rem' }}>
                    <Badge className="text-capitalize" bg="warning" text="dark">{category}</Badge>
                    {
                        isNew ? <Badge bg="info" text="dark">New</Badge> : null
                    }
                </div>
                <CardBS.Title>{title}</CardBS.Title>
                <CardBS.Text>
                    {excerpt}
                </CardBS.Text>
                <div className="mt-auto d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
                    <Button className='flex-shrink-0' target="_blank" href={url}>Read more</Button>
                    {
                        credits
                            ? <Typography className='text-muted mb-0 text-end'>By: {credits}</Typography>
                            : false
                    }
            </div>
        </Card>
    )
}
