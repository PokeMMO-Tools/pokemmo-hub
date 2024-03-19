import React, { useState } from 'react'
import { Image, Stack } from 'react-bootstrap'

import { TbArrowsRightLeft } from 'react-icons/tb'
import { BisBall, BisBallSleep, MegaBall, MegaBallSleep, PokeBall, PokeBallSleep, UltraBall, UltraBallSleep, VeloxBall, VeloxBallSleep } from '../../assets/icons'
import { useTranslations } from '../../context/TranslationsContext'
import { Button } from '../Atoms'


const ASSETS = {
    pokeball: {
        sleep: <Image src={PokeBallSleep} style={{ height: "2rem", aspectRatio: '1' }} />,
        healthy: <Image src={PokeBall} style={{ height: "2rem", aspectRatio: '1' }} />
    },
    megaball: {
        sleep: <Image src={MegaBallSleep} style={{ height: "2rem", aspectRatio: '1' }} />,
        healthy: <Image src={MegaBall} style={{ height: "2rem", aspectRatio: '1' }} />
    },
    ultraball: {
        sleep: <Image src={UltraBallSleep} style={{ height: "2rem", aspectRatio: '1' }} />,
        healthy: <Image src={UltraBall} style={{ height: "2rem", aspectRatio: '1' }} />
    },
    bisball: {
        sleep: <Image src={BisBallSleep} style={{ height: "2rem", aspectRatio: '1' }} />,
        healthy: <Image src={BisBall} style={{ height: "2rem", aspectRatio: '1' }} />
    },
    veloxball: {
        sleep: <Image src={VeloxBallSleep} style={{ height: "2rem", aspectRatio: '1' }} />,
        healthy: <Image src={VeloxBall} style={{ height: "2rem", aspectRatio: '1' }} />
    }
}

const BALLS = [
    'pokeball',
    'megaball',
    'ultraball',
    'bisball',
    'veloxball'
]

export const CatchResults = ({ results }) => {
    const [activeBall, setActiveBall] = useState(0);
    const { t } = useTranslations();

    const changeActiveBall = () => {
        setActiveBall(prev => activeBall >= BALLS.length - 1 ? 0 : prev + 1)
    }

    return (
        <Stack direction="horizontal" gap={2} className="flex-wrap">
            <Button
                className='d-flex align-items-center justify-content-center shadow rounded-circle bg-primary text-light'
                style={changeActiveBallStyles}
                onClick={() => changeActiveBall()}>
                <TbArrowsRightLeft />
            </Button>
            {
                results
                    .filter(({ ball }) => ball === BALLS[activeBall])
                    .map((result, index) => {
                        return (
                            <div key={index} className='d-flex align-items-center px-2 flex-wrap justify-content-center text-start' style={{ gap: '.5rem' }}>
                                <div className='position-relative'>
                                    {result.status ? ASSETS[result.ball].sleep : ASSETS[result.ball].healthy}
                                </div>
                                <div className='d-flex flex-column'>
                                    <b>{result.hp > 1 ? t('Full HP') : t('1 HP')}</b>
                                    {`${result.probabilities} %`}
                                </div>
                            </div>
                        )
                    })
            }
        </Stack>
    )
}

const changeActiveBallStyles = {
    height: '1.5rem',
    width: '1.5rem',
    fontSize: '.7rem',
    padding: 0,
    border: 0
}