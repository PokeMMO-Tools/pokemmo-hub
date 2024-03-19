import { Link } from 'gatsby'
import React from 'react'
import { Stack } from 'react-bootstrap'
import { Button, Typography } from '../Atoms'
import { InvestmentList } from '../Market/InvestmentList'

const ItemInvestmentsTitle = () => (
    <Stack direction="horizontal" className="justify-content-between">
        <Typography as="h4" className='mb-0' >Investments</Typography>
        <Button as={Link} to="/market/investments" variant="warning" size="sm">All Investments</Button>
    </Stack>
)

export const ItemInvestments = ({ i }) => {
    return (
        <div className='mb-2'>
            <InvestmentList
                i={i}
                title={<ItemInvestmentsTitle />}
                fallbackIfEmpty={false}
                showTotals={false}
            />
        </div>
    )
}
