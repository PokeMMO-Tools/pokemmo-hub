import React, { useState } from 'react';
import { Placeholder } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useTranslations } from '../../context/TranslationsContext';
import ADS from '../../data/ads.json';
import { prices as PricesApi } from '../../utils/prices';
import { /*Adsense,*/ Button, Card, Table, Typography } from '../Atoms';
import { Table as DesktopTable } from '../Atoms'
import { isMobile, isTablet } from 'react-device-detect'
import { Table as SrTable, Tbody as SrTbody, Td as SrTd, Th as SrTh, Thead as SrThead, Tr as SrTr } from 'react-super-responsive-table'

const BASE_REWARD = 8632;
let AM_COINS = [
    {
        label: "None",
        multiply: 1,
        multiply2: 1,
        costs: 0
    },
    {
        label: "Amulet Coin 50%",
        multiply: 50,
        multiply2: 1.5,
        costs: 15000
    },
    {
        label: "Riches Charm 75%",
        multiply: 75,
        multiply2: 1.75,
        costs: 50000
    },
    {
        label: "Riches Charm 100%",
        multiply: 100,
        multiply2: 2,
        costs: 120000
    }
]

const getAverageEarnings = ({ multiply, costs }) => {
    return {
        each: BASE_REWARD + (BASE_REWARD * multiply / 100),
        stonks: BASE_REWARD * multiply / 100,
        itemCovered: parseInt(costs / (BASE_REWARD * multiply / 100))
    }
}



export const GymCalculator = () => {
    const { t } = useTranslations()
    const [selected, setSelected] = useState(0)
    const [sum, setSum] = useState(0)
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)
    const { multiply, multiply2, costs } = AM_COINS[selected]
    const [customCost, setCustomCost] = useState(NaN)
    const earnings = getAverageEarnings(AM_COINS[selected])

    const amuletCoin = 5223
    const richesCharm75 = 1412
    const richesCharm100 = 1413
    const { data: amuletCoinPrice } = useQuery(
        ["prices", amuletCoin],
        () => PricesApi.getItem(amuletCoin),
        { staleTime: 180000 }
    )
    const { data: richesCharm75Price } = useQuery(
        ["prices", richesCharm75],
        () => PricesApi.getItem(richesCharm75),
        { staleTime: 180000 }
    )
    const { data: richesCharm100Price } = useQuery(
        ["prices", richesCharm100],
        () => PricesApi.getItem(richesCharm100),
        { staleTime: 180000 }
    )


    const amuletCoinLast = amuletCoinPrice ? amuletCoinPrice[amuletCoinPrice.length - 1].y : 'loading'
    const richesCharm75Last = richesCharm75Price ? richesCharm75Price[richesCharm75Price.length - 1].y : 'loading'
    const richesCharm100Last = richesCharm100Price ? richesCharm100Price[richesCharm100Price.length - 1].y : 'loading'

    const Table = isMobile && !isTablet ? SrTable : DesktopTable
    const Thead = isMobile && !isTablet ? SrThead : 'thead'
    const Tbody = isMobile && !isTablet ? SrTbody : 'tbody'
    const Th = isMobile && !isTablet ? SrTh : 'td'
    const Tr = isMobile && !isTablet ? SrTr : 'tr'
    const Td = isMobile ? SrTd : 'td'





    const handleChange = (boolean) => {
        //boolean can be used for if checked == true or false
        let sum = 0;
        let count = 0
        let count2 = 0
        var markedCheckbox = document.getElementsByName('pl');
        var markedCheckbox2 = document.getElementsByName('p2')
        for (var checkbox of markedCheckbox) {
            if (checkbox.checked) {
                sum += parseInt(checkbox.value)
                count++
            }
        }
        for (var checkbox of markedCheckbox2) {
            if (checkbox.checked) {
                sum += parseInt(checkbox.value)
                count2++
            }
        }
        setSum(sum)
        setCount(count)
        setCount2(count2)
    }

    const handleChange2 = (value) => {
        value > '0' || value !== '' ?
            setCustomCost(parseInt(value))
            :
            setCustomCost('disable')
    }


    return (
        <Card>
            <div class="d-flex align-items-center mb-3" style={{ gap: '.5rem' }}>
                <Typography as="b" className='mb-0'>Money multiplier: </Typography>
                {
                    AM_COINS.map((item, index) => (
                        <Button
                            active={selected === index}
                            key={index}
                            size="sm"
                            onClick={() => setSelected(index)}>
                            {item.label}
                        </Button>
                    ))
                }
            </div>
            <ul class="m-0 p-0" style={{ listStyleType: 'none' }}>
                {
                    selected !== 0 ?
                        <li>
                            {t('(Optional) Input your custom charm cost: ')}<input class="numberInput" type="number" id="charmPrice" onChange={(e) => handleChange2(e.target.value)}></input>
                        </li>
                        :
                        <></>
                }
                {
                    selected !== 0 ?
                        <li>
                            {t('Multiplier: ')} <Typography as="b">{multiply}%  ({multiply2}x)</Typography>
                        </li>
                        :
                        <li>
                            {t('Multiplier: ')} <Typography as="b">None</Typography>
                        </li>
                }
                <li>
                    {t('Gyms: ')} <Typography as="b">{count}</Typography>
                </li>
                <li>
                    {t('Trainers: ')} <Typography as="b">{count2}</Typography>
                </li>
                <li>
                    {t('Total earnings: ')} <Typography as="b">${(sum * multiply2).toLocaleString('en-US')}</Typography>
                </li>
                {

                    selected !== 0 && isNaN(customCost) ?
                        <li>
                            {t('Current amulet/charm cost (latest data): ')}
                            {
                                isNaN(sum * multiply2 - richesCharm100Last) ?
                                    <Placeholder as="p" animation='glow' className="w-100 mb-0">
                                        <Placeholder xs={12}></Placeholder>
                                    </Placeholder>
                                    :
                                    selected === 1 ?
                                        <Typography as="b">${amuletCoinLast.toLocaleString('en-US')}</Typography>
                                        :
                                        selected === 2 ?
                                            <Typography as="b">${richesCharm75Last.toLocaleString('en-US')}</Typography>
                                            :
                                            selected === 3 ?
                                                <Typography as="b">${richesCharm100Last.toLocaleString('en-US')}</Typography>
                                                :
                                                <Placeholder as="p" animation='glow' className="w-100 mb-0">
                                                    <Placeholder xs={12}></Placeholder>
                                                </Placeholder>
                            }
                        </li>
                        :
                        <li>
                            {
                                selected !== 0 && !isNaN(customCost) ?
                                    <>
                                        {t('Custom charm cost: ')}
                                        <Typography as="b">${customCost.toLocaleString('en-US')}</Typography>
                                    </>
                                    :
                                    <></>
                            }
                        </li>

                }
                {
                    selected !== 0 && isNaN(customCost) ?
                        <li>
                            {t('Profit including amulet/charm cost: ')}
                            {
                                isNaN(sum * multiply2 - richesCharm100Last) ?
                                    <Placeholder as="p" animation='glow' className="w-100 mb-0">
                                        <Placeholder xs={12}></Placeholder>
                                    </Placeholder>
                                    :
                                    selected === 1 ?
                                        <Typography as="b">${(sum * multiply2 - amuletCoinLast).toLocaleString('en-US')}</Typography>
                                        :
                                        selected === 2 ?
                                            <Typography as="b">${(sum * multiply2 - richesCharm75Last).toLocaleString('en-US')}</Typography>
                                            :
                                            selected === 3 ?
                                                <Typography as="b">${(sum * multiply2 - richesCharm100Last).toLocaleString('en-US')}</Typography>
                                                :
                                                <Placeholder as="p" animation='glow' className="w-100 mb-0">
                                                    <Placeholder xs={12}></Placeholder>
                                                </Placeholder>
                            }
                        </li>
                        :


                        selected !== 0 && !isNaN(customCost) ?
                            <li>
                                {t('Profit including custom charm cost: ')}
                                {
                                    selected === 1 ?
                                        <Typography as="b">${(sum * multiply2 - customCost).toLocaleString('en-US')}</Typography>
                                        :
                                        selected === 2 ?
                                            <Typography as="b">${(sum * multiply2 - customCost).toLocaleString('en-US')}</Typography>
                                            :
                                            selected === 3 ?
                                                <Typography as="b">${(sum * multiply2 - customCost).toLocaleString('en-US')}</Typography>
                                                :
                                                <></>
                                }

                            </li>
                            : <></>

                }







                <li>
                    <Typography as="b">&nbsp;</Typography>
                </li>

                <Table size='lg' responsive>
                    <Thead>
                        <Tr>

                            <Th>{t('Kanto')}</Th>

                            <Th>{t('Johto')}</Th>

                            <Th>{t('Hoenn')}</Th>

                            <Th>{t('Sinnoh')}</Th>

                            <Th>{t('Unova')}</Th>

                            <Th>{t('Trainers')}</Th>

                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr style={{ position: 'relative' }}>
                            <Td>

                                {t('1st Gym: Pewter')}
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8632'></input>
                            </Td>
                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8632'></input>
                                {t('1st Gym: Violet')}
                            </Td>
                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8632'></input>
                                {t('1st Gym: Rustboro')}
                            </Td>
                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8632'></input>
                                {t('1st Gym: Oreburgh')}
                            </Td>
                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8632'></input>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8632'></input>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8632'></input>
                                {t('1st Gym: Striaton')}
                            </Td>
                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="p2" value='15660'></input>
                                {t('Morimoto')}</Td>
                        </Tr>

                        <Tr>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8736'></input>
                                {t('2nd Gym: Cerulean')}
                            </Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8736'></input>
                                {t('2nd Gym: Azalea')}
                            </Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8736'></input>
                                {t('2nd Gym: Dewford')}
                            </Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8736'></input>
                                {t('2nd Gym: Eterna')}
                            </Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8736'></input>
                                {t('2nd Gym: Nacrene')}
                            </Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="p2" value='16560'></input>
                                {t('Cynthia')}
                            </Td>
                        </Tr>
                        <Tr>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8840'></input>
                                {t('3rd Gym: Vermillion')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8840'></input>
                                {t('3rd Gym: Goldenrod')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8840'></input>
                                {t('3rd Gym: Mauville')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8840'></input>
                                {t('3rd Gym: Hearthome')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8840'></input>
                                {t('3rd Gym: Castelia')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="p2" value='4080'></input>
                                {t('Unova Route 9 Rich boy Manuel')}</Td>
                        </Tr>
                        <Tr>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8944'></input>
                                {t('4th Gym: Celadon')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8944'></input>
                                {t('4th Gym: Ecruteak')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8944'></input>
                                {t('4th Gym: Lavaridge')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8944'></input>
                                {t('4th Gym: Veilstone')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='8944'></input>
                                {t('4th Gym: Nimbasa')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="p2" value='4080'></input>
                                {t('Unova Route 9 Lady Isabel')}</Td>
                        </Tr>
                        <Tr>

                            <Td> <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9048'></input>
                                {t('5th Gym: Fuschia')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9048'></input>
                                {t('5th Gym: Cianwood')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9048'></input>
                                {t('5th Gym: Petalburg')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9048'></input>
                                {t('5th Gym: Pastoria')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9048'></input>
                                {t('5th Gym: Driftveil')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="p2" value='5400'></input>
                                {t('Unova Undella Socialite Marian')}</Td>
                        </Tr>
                        <Tr>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9152'></input>
                                {t('6th Gym: Saffron')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9152'></input>
                                {t('6th Gym: Olivine')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9152'></input>
                                {t('6th Gym: Fortree')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9152'></input>
                                {t('6th Gym: Canalave')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9152'></input>
                                {t('6th Gym: Mistralton')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="p2" value='5400'></input>
                                {t('Unova Undella Gentleman Yan')}</Td>
                        </Tr>
                        <Tr>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9256'></input>
                                {t('7th Gym: Cinnabar')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9256'></input>
                                {t('7th Gym: Mahogany')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9256'></input>
                                {t('7th Gym: Mossdeep')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9256'></input>
                                {t('7th Gym: Snowpoint')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9256'></input>
                                {t('7th Gym: Icirrus')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="p2" value='6000'></input>
                                {t('PI Carlos')}</Td>
                        </Tr>
                        <Tr>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9360' disabled></input>
                                {t('8th Gym: Viridian')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9360'></input>
                                {t('8th Gym: Blackthorn')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9360'></input>
                                {t('8th Gym: Sootopolis')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9360'></input>
                                {t('8th Gym: Sunyshore')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="pl" value='9360'></input>
                                {t('8th Gym: Opelucid')}</Td>

                            <Td>
                                <input type="checkbox" onChange={(e) => handleChange(e.target.checked)} id="check1" name="p2" value='110400'></input>
                                {t('Red')}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </ul>
        </Card>




    )
}
