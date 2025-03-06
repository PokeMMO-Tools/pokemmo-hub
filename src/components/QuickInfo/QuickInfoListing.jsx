import React, { useState } from 'react'
import { Badge } from 'react-bootstrap'
import { useTranslations } from '../../context/TranslationsContext'
import { Button } from '../Atoms'
import { EVsInfo } from './EVsInfo'
import { GymEarningMultiplier } from './GymEarningMultiplier'
import { GymCalculator } from './GymCalculator'
import { RegionsLevelCap } from './RegionsLevelCap'
import { UpcomingEvents } from './UpcomingEvents'


const QUICK_INFO_LISTS = [
    {
        label: 'Gym Level Caps',
        id: 'regions-level-cap',
        component: <RegionsLevelCap />
    },
    {
        label: "EV Hordes",
        id: 'ev-utility',
        component: <EVsInfo />
    },
    {
        label: "Upcoming Events",
        id: "upcoming-events",
        component: <UpcomingEvents />,
    },
    {
        label: "Gym Earnings Calculator",
        id: "gym-earnings-calculator",
        component: <GymCalculator />,
    }
]

export const QuickInfoListing = () => {
    const [quickInfo, setQuickInfo] = useState(false)
    const { t } = useTranslations();

    return (
        <div>
            <div className="d-flex justify-content-center mb-3 flex-wrap" style={{ gap: '1rem' }}>
                {
                    QUICK_INFO_LISTS.map(({ label, id, highlight }, index) => {
                        return (
                            <Button
                                active={quickInfo === id}
                                key={index}
                                onClick={() => setQuickInfo(prev => prev === id ? false : id)}
                                className="d-inline-flex align-items-center"
                                style={{ gap: '.3rem' }}
                                variant={highlight ? "info" : "warning"}
                            >
                                {t(label)}
                                {highlight ?
                                    <Badge className="ms-1" style={{ fontSize: '.6rem', color: 'black' }} bg="warning" pill>{t('new')}</Badge>
                                    : false
                                }
                            </Button>
                        )
                    })
                }
            </div>

            {/* This will center the displayed component */}
            <div className="d-flex justify-content-center">
                {
                    quickInfo && QUICK_INFO_LISTS.length
                        ? QUICK_INFO_LISTS.find(({ id }) => id === quickInfo).component
                        : false
                }
            </div>
        </div>
    )
}

