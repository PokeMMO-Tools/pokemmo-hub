import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { getTimestamp } from '../../utils/date'
import { Button } from '../Atoms'

const INVESTMENT_DEFAULT_DATA = {
    id: 0,
    i: 2454,
    quantity: 0,
    boughtPrice: false
}

export const MarketAddInvestment = ({ i, onSave, updateInvestment, onUpdate }) => {
    /* const [investment, setInvestment] = useState({
        
    }) */

    if (i == 0) {
        i = 2454
    }

    const [investment, setInvestment] = useState(
        updateInvestment
            ? updateInvestment
            : {
                ...INVESTMENT_DEFAULT_DATA,
                i,
                id: getTimestamp()
            }
    )

    return (
        <Form>
            <Form.Group controlId="i">
                <Form.Control type="hidden" value={i} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="quantity">
                <Form.Label>Item quantity</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter quantity"
                    min={0}
                    value={investment.quantity || ''}
                    onChange={({ target }) => setInvestment(prev => ({ ...prev, quantity: target.valueAsNumber }))}
                />
                <Form.Text className="text-muted">
                    Enter how many items you bought for this investment.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="boughtPrice">
                <Form.Label>Item price</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter item price"
                    min={0}
                    value={
                        investment.boughtPrice !== false
                            ? investment.boughtPrice
                            : ''
                    }
                    onChange={({ target }) => setInvestment(prev => ({ ...prev, boughtPrice: target.valueAsNumber }))}
                />
                <Form.Text className="text-muted">
                    Enter how much did you pay them on average
                </Form.Text>
            </Form.Group>
            <Button variant="success" onClick={() => updateInvestment ? onUpdate(investment) : onSave(investment)}>Save</Button>
        </Form>
    )
}
