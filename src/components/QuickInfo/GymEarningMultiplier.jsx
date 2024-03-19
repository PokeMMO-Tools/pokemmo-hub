import React, { useState } from 'react';
import { Button, Card, Typography } from '../Atoms';
import { useTranslations } from '../../context/TranslationsContext';

const BASE_REWARD = 8632;
const AM_COINS = [
    {
        multiply: 50,
        costs: 15000
    },
    {
        multiply: 75,
        costs: 39500
    },
    {
        multiply: 100,
        costs: 53000
    }
]

const getAverageEarnings = ({ multiply, costs }) => {
    return {
        each: BASE_REWARD + (BASE_REWARD * multiply / 100),
        stonks: BASE_REWARD * multiply / 100,
        itemCovered: parseInt(costs / (BASE_REWARD * multiply / 100))
    }
}

export const GymEarningMultiplier = () => {
    const { t } = useTranslations()
    const [selected, setSelected] = useState(0)
    const { multiply, costs } = AM_COINS[selected]
    const earnings = getAverageEarnings(AM_COINS[selected])
    return (
        <Card>
            <div class="d-flex align-items-center mb-3" style={{ gap: '.5rem' }}>
                <Typography as="b" className='mb-0'>Amulet coin multiplier: </Typography>
                {
                    AM_COINS.map((item, index) => (
                        <Button
                            active={selected === index}
                            key={index}
                            size="sm"
                            onClick={() => setSelected(index)}>
                            {item.multiply}%
                        </Button>
                    ))
                }
            </div>
            <ul class="m-0 p-0" style={{ listStyleType: 'none' }}>
                <li>
                    {t('Multiplier:')} <Typography as="b">{multiply}%</Typography>
                </li>
                <li>
                    {t('Gain x Gym:')} <Typography as="b">{earnings.each}$</Typography>
                </li>
                <li>
                    {t('Amulet costs covered in:')} <Typography as="b">{earnings.itemCovered}</Typography> {t('gyms')}.
                </li>
                <li>
                    {t('Expected gain in 15 gym:')} <Typography as="b">{earnings.each * 15}$ (${earnings.stonks * 15} {t('from Amulet coin')}.)</Typography>
                </li>
            </ul>
        </Card>
    )
}
