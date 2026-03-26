import { Tooltip } from '@mui/material';
import React from 'react';
import { prices } from '../../utils/prices';
import { Badge, Typography } from '../Atoms';

export const ItemDifferentials = ({ value, differential, icon, invertColor = false, description }) => {
    const iconFill = invertColor ? 'black' : 'var(--bs-warning)'
    const iconColor = invertColor ? 'var(--bs-warning)' : 'black'
    const Icon = icon;

    return (
        <Tooltip describeChild title={description}>
            <div>
                <Badge className="d-flex align-items-center text-light" style={{ gap: '.15rem', fontSize: '.875rem' }} bg="secondary">
                    <Icon size={16} fill={iconFill} color={iconColor} />
                    <Typography as='small' style={{ color: 'inherit' }}>
                        {!isNaN(value) ? prices.format(value) : "No Listings"}
                        {
                            differential !== 0
                                ? <Typography as={differential > 0 ? "sup" : "sub"} className='ms-1' style={{
                                    color: differential > 0
                                        ? 'var(--bs-teal)'
                                        : 'var(--bs-orange'
                                }}>
                                    {`${differential > 0 ? '+' : ''}${prices.format(differential)}`}
                                </Typography>
                                : false
                        }
                    </Typography>
                </Badge>
            </div>
        </Tooltip>
    )
}
