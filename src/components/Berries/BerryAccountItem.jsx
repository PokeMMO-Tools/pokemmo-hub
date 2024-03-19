import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { TbDroplet } from 'react-icons/tb';
import { Td, Tr } from 'react-super-responsive-table';
import { useBerries } from '../../context/BerryContext';
import { useDarkMode } from '../../context/DarkModeContext';
import { getBerry } from '../../utils/berries';
import { convertDiffToString, diffTimestamp, getMsFromHour } from '../../utils/date';
import { getItemInfo } from '../../utils/items';
import { Button } from '../Atoms';
import { BerryTimeChanger } from './BerryTimeChanger';

const DRY_FLOOR_TIME1 = -10;
const DRY_FLOOR_TIME2 = -15;

const getDropletColor = (hours, limit, isDarkMode, isLongGrowth) => {
    if (!isLongGrowth && hours <= DRY_FLOOR_TIME1) {
        return { color: "red", className: "blinking-droplet" }
    }
    else if (hours <= DRY_FLOOR_TIME2) {
        return { color: "red", className: "blinking-droplet" }
    }
    if (hours <= limit) {
        return { fill: '' }
    }
    else if (limit === -9 && hours === -7) {
        return { fill: '' }
    }
    else {
        return { fill: isDarkMode ? 'white' : 'black' }
    }
}

export const BerryAccountItem = (plantedBerry) => {
    const { removeBerry, waterBerry, updateBerry } = useBerries();
    const { isDark } = useDarkMode()

    const [now, setNow] = useState(Date.now())

    const berry = { ...plantedBerry, ...getBerry(plantedBerry.id), ...getItemInfo(plantedBerry.id) }
    const timeFromWater = berry.tsPlant !== berry.tsLastWater
        ? diffTimestamp(berry.tsLastWater, now)
        : diffTimestamp(berry.tsLastWater - getMsFromHour(6), now, true);
    const timeToReady = diffTimestamp(berry.tsPlant + getMsFromHour(berry.grow_time), now)

    useEffect(() => {
        setInterval(() => {
            setNow(Date.now())

        }, 60 * 1000)
    }, [])

    const onChangeBerryTimes = (type, timestamp) => {
        updateBerry(plantedBerry._id, { [type]: timestamp })
    }

    return (
        <Tr>
            <Td><Image className='me-1' src={`/item/${berry.item_id}.png`} />{berry.en_name}</Td>
            <Td>
                {
                    berry.grow_time === 42 || berry.grow_time === 44 || berry.grow_time === 67
                        ?
                        [...Array(5)].map((_, index) => (
                            <TbDroplet key={index} title={
                                timeFromWater.isJustCalc
                                    ? 'Still not watered'
                                    : `watered: ${convertDiffToString(timeFromWater)}`
                            }
                                {...getDropletColor(timeFromWater.hour, -15 + index * 3, isDark, true)}
                            />
                        ))
                        :
                        [...Array(5)].map((_, index) => (
                            <TbDroplet key={index} title={
                                timeFromWater.isJustCalc
                                    ? 'Still not watered'
                                    : `watered: ${convertDiffToString(timeFromWater)}`
                            }
                                {...getDropletColor(timeFromWater.hour + 1, -10 + index * 2, isDark, false)}
                            />
                        ))
                }
                <BerryTimeChanger label="Change watered date and time" onSelectDate={timestamp => onChangeBerryTimes('tsLastWater', timestamp)} value={plantedBerry.tsLastWater} />
            </Td>
            <Td>
                {convertDiffToString(timeToReady)}
                <BerryTimeChanger label="Change planted date and time" onSelectDate={timestamp => onChangeBerryTimes('tsPlant', timestamp)} value={plantedBerry.tsPlant} />
            </Td>
            <Td className='d-flex' style={{ gap: '.5rem' }}>
                <Button size="sm" variant="primary" onClick={() => waterBerry(plantedBerry._id)}>Water</Button>
                <Button size="sm" variant="danger" onClick={() => removeBerry(plantedBerry._id)}>Remove</Button>
            </Td>
        </Tr>
    )
}
