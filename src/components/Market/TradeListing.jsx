import React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { Image, Stack } from 'react-bootstrap';
import { Button, Card, Typography, Search } from '../Atoms';
import { ItemImage } from '../Items/ItemImage'
import { useMarket } from '../../context/MarketContext'
import { useTranslations } from '../../context/TranslationsContext'
import { getItemInfo, getItemName } from '../../utils/items';
import { getApiID } from '../../utils/items';
import { prices } from '../../utils/prices';
import cosmetics from '../../data/pokemmo/item-cosmetic.json'
import { map } from 'highcharts';
import { Link } from 'gatsby'

export const TradeListing = ({ data, style }) => {
    //const [clothes, setClothes] = useState(getCosmeticInfo(selectedClothes));
    const database = data.data
    const { t, language } = useTranslations()
    const { allItems } = useMarket()
    //const itemSelected = allItems.find(({ i }) => i === parseInt(2345))
    const item1 = allItems.find(({ i }) => i === parseInt(database.give)) //the firestore data passed into this component
    const item2 = allItems.find(({ i }) => i === parseInt(database.receive))
    const [itemsGive, setItemsGive] = useState([])
    const [itemsReceive, setItemsReceive] = useState([])
    const giveQuantity = database.giveQuantity
    const receiveQuantity = database.receiveQuantity
    const moneyGive = database.moneyGive
    const moneyReceive = database.moneyReceive
    const timeStamp = database.timeStamp
    const timeSinceSeconds = Math.trunc(((Date.now() - timeStamp) / 1000))
    const key = 0


    useEffect(() => {

        getItemGive()
        getItemReceive()
    }, []);

    function getItemGive() {
        let items = []
        for (let x = 0; x < database.give.length; x++) {
            if (database.give[x] == 10001) {
                let item = {
                    i: 10001,
                    n: {
                        "en": "Blue Flaming Skull Mask",
                        "cn": "Blue Flaming Skull Mask",
                        "de": "Blue Flaming Skull Mask",
                        "fr": "Blue Flaming Skull Mask",
                        "it": "Blue Flaming Skull Mask",
                        "es": "Blue Flaming Skull Mask"
                    },
                    "slug": "blue-flaming-skull-mask",
                    "_id": 1021,
                    "category": 6
                }
                items.push(item)
            }
            else if (database.give[x] == 10002) {
                let item = {
                    i: 10002,
                    n: {
                        "en": "Orange Flaming Skull Mask",
                        "cn": "Orange Flaming Skull Mask",
                        "de": "Orange Flaming Skull Mask",
                        "fr": "Orange Flaming Skull Mask",
                        "it": "Orange Flaming Skull Mask",
                        "es": "Orange Flaming Skull Mask"
                    },
                    "slug": "orange-flaming-skull-mask",
                    "_id": 1022,
                    "category": 6
                }
                items.push(item)
            }
            else if (database.give[x] == 10003) {
                let item = {
                    i: 10003,
                    n: {
                        "en": "Scythe",
                        "cn": "Scythe",
                        "de": "Scythe",
                        "fr": "Scythe",
                        "it": "Scythe",
                        "es": "Scythe"
                    },
                    "slug": "scythe",
                    "_id": 1019,
                    "category": 6
                }
                items.push(item)
            }
            else if (database.give[x] == 10004) {
                let item = {
                    i: 10004,
                    n: {
                        "en": "Candy Cane",
                        "cn": "Candy Cane",
                        "de": "Candy Cane",
                        "fr": "Candy Cane",
                        "it": "Candy Cane",
                        "es": "Candy Cane"
                    },
                    "slug": "candy-cane",
                    "_id": 1015,
                    "category": 6
                }
                items.push(item)
            }
            else if (database.give[x] == 10005) {
                let item = {
                    i: 10005,
                    n: {
                        "en": "Ghost Costume",
                        "cn": "Ghost Costume",
                        "de": "Ghost Costume",
                        "fr": "Ghost Costume",
                        "it": "Ghost Costume",
                        "es": "Ghost Costume"
                    },
                    "slug": "ghost-costume",
                    "_id": 1009,
                    "category": 6
                }
                items.push(item)
            } else {
                const item = allItems.find(({ i }) => i === parseInt(database.give[x]))

                items.push(item)
            }
            setItemsGive(items)
        }
    }

    function getItemReceive() {
        let items = []
        for (let x = 0; x < database.receive.length; x++) {
            if (database.receive[x] == 10001) {
                let item = {
                    i: 10001,
                    n: {
                        "en": "Blue Flaming Skull Mask",
                        "cn": "Blue Flaming Skull Mask",
                        "de": "Blue Flaming Skull Mask",
                        "fr": "Blue Flaming Skull Mask",
                        "it": "Blue Flaming Skull Mask",
                        "es": "Blue Flaming Skull Mask"
                    },
                    "slug": "blue-flaming-skull-mask",
                    "_id": 1021,
                    "category": 6
                }
                items.push(item)
            }
            else if (database.receive[x] == 10002) {
                let item = {
                    i: 10002,
                    n: {
                        "en": "Orange Flaming Skull Mask",
                        "cn": "Orange Flaming Skull Mask",
                        "de": "Orange Flaming Skull Mask",
                        "fr": "Orange Flaming Skull Mask",
                        "it": "Orange Flaming Skull Mask",
                        "es": "Orange Flaming Skull Mask"
                    },
                    "slug": "orange-flaming-skull-mask",
                    "_id": 1022,
                    "category": 6
                }
                items.push(item)
            } else if (database.receive[x] == 10003) {
                let item = {
                    i: 10003,
                    n: {
                        "en": "Scythe",
                        "cn": "Scythe",
                        "de": "Scythe",
                        "fr": "Scythe",
                        "it": "Scythe",
                        "es": "Scythe"
                    },
                    "slug": "scythe",
                    "_id": 1019,
                    "category": 6
                }
                items.push(item)
            }
            else if (database.receive[x] == 10004) {
                let item = {
                    i: 10004,
                    n: {
                        "en": "Candy Cane",
                        "cn": "Candy Cane",
                        "de": "Candy Cane",
                        "fr": "Candy Cane",
                        "it": "Candy Cane",
                        "es": "Candy Cane"
                    },
                    "slug": "candy-cane",
                    "_id": 1015,
                    "category": 6
                }
                items.push(item)
            }
            else if (database.receive[x] == 10005) {
                let item = {
                    i: 10005,
                    n: {
                        "en": "Ghost Costume",
                        "cn": "Ghost Costume",
                        "de": "Ghost Costume",
                        "fr": "Ghost Costume",
                        "it": "Ghost Costume",
                        "es": "Ghost Costume"
                    },
                    "slug": "ghost-costume",
                    "_id": 1009,
                    "category": 6
                }
                items.push(item)
            }
            else {
                const item = allItems.find(({ i }) => i === parseInt(database.receive[x]))
                items.push(item)
            }
        }
        setItemsReceive(items)
    }

    function displayNum(labelValue) {
        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? Math.round(((Math.abs(Number(labelValue)) / 1.0e+9) + Number.EPSILON) * 100) / 100 + "B"
            // Six Zeroes for Millions 
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? Math.round(((Math.abs(Number(labelValue)) / 1.0e+6) + Number.EPSILON) * 100) / 100 + "M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? Math.round(((Math.abs(Number(labelValue)) / 1.0e+3) + Number.EPSILON) * 100) / 100 + "K"

                    : Math.abs(Number(labelValue));
    }

    return (
        <Card className="mb-2">
            <div className="row flex mb-3">
                <Typography className="col mb-0 text-muted" as="h3">{database.username}</Typography>
                <div className="col" style={{
                    display: 'flex', flex: 'right', alignItems: 'right', justifyContent: 'right'
                }}>
                    {
                        timeSinceSeconds && timeSinceSeconds < 2
                            ?
                            timeSinceSeconds + " " + t('second ago')
                            :
                            timeSinceSeconds && timeSinceSeconds < 60 ?
                                timeSinceSeconds + " " + t('seconds ago')
                                :
                                timeSinceSeconds && timeSinceSeconds > 60 && timeSinceSeconds < 120
                                    ?
                                    Math.trunc(timeSinceSeconds / 60) + " " + t('minute ago')
                                    :
                                    timeSinceSeconds && timeSinceSeconds > 60 && timeSinceSeconds < 3600
                                        ?
                                        Math.trunc(timeSinceSeconds / 60) + " " + t('minutes ago')
                                        :
                                        timeSinceSeconds && timeSinceSeconds > 3600 && Math.trunc(timeSinceSeconds / 3600) == 1
                                            ?
                                            Math.trunc(timeSinceSeconds / 3600) + " " + t('hour ago')
                                            :
                                            timeSinceSeconds && timeSinceSeconds > 3600 && Math.trunc(timeSinceSeconds / 3600) > 1 && Math.trunc(timeSinceSeconds / 3600) < 24
                                                ?
                                                Math.trunc(timeSinceSeconds / 3600) + " " + t('hours ago')
                                                :
                                                timeSinceSeconds && timeSinceSeconds > 3600 && Math.trunc(timeSinceSeconds / (24 * 3600)) == 1
                                                    ?
                                                    Math.trunc(timeSinceSeconds / (24 * 3600)) + " " + t('day ago')
                                                    :
                                                    timeSinceSeconds && timeSinceSeconds > 3600 && Math.trunc(timeSinceSeconds / (24 * 3600)) > 1
                                                        ?
                                                        Math.trunc(timeSinceSeconds / (24 * 3600)) + " " + t('days ago')
                                                        :
                                                        "Error"

                    }
                </div>
            </div>
            <div className="row">
                <div className="col fs-5">
                    {t('Offering:')}
                </div>
                <div className="col fs-5">Requesting: </div>
                <div className="w-100"></div>
                <div className="col">
                    {
                        itemsGive.length && giveQuantity.length ?
                            itemsGive
                                .map((item, i) => {
                                    //    console.log(item)
                                    return (
                                        <Stack direction='horizontal' className="col" key={item._id}>
                                            {giveQuantity[i]}x {'\u00A0'}
                                            <ItemImage className="me-1" category={item.category} id={item._id} tradeListing={true} />
                                            <Typography as={Link} to={`../../items/${item.slug}`} style={{ color: 'var(--bs-info)' }}>{language !== 'cn' && language !== 'tw' ? getItemName(item.i)[language] : getItemInfo(item._id).name}</Typography>
                                        </Stack>
                                    )
                                })
                            :
                            <></>
                    }
                    {
                        moneyGive ?
                            <>
                                <ItemImage category={0} id={9999} tradeListing={true}></ItemImage>
                                {
                                    parseInt(moneyGive) > 1999999999 ?
                                        "1,999,999,999 (2B)"
                                        :
                                        parseInt(moneyGive).toLocaleString('en-US') + " (" + displayNum(moneyGive) + ")"
                                }
                            </>
                            :
                            <></>
                    }
                </div>
                <div className="col">
                    {
                        itemsReceive.length && receiveQuantity.length ?
                            itemsReceive
                                .map((item, i) => {
                                    return (
                                        <Stack direction='horizontal' className="col" key={item._id}>
                                            {receiveQuantity[i]}x {'\u00A0'}
                                            <ItemImage className="me-1" category={item.category} id={item._id} tradeListing={true} />
                                            <Typography as={Link} to={`../../items/${item.slug}`} style={{ color: 'var(--bs-info)' }}>{language !== 'cn' && language !== 'tw' ? getItemName(item.i)[language] : getItemInfo(item._id).name}</Typography>
                                        </Stack>
                                    )
                                })

                            :
                            <></>
                    }
                    {
                        moneyReceive ?
                            <>
                                <ItemImage category={0} id={9999} tradeListing={true}></ItemImage>
                                {
                                    parseInt(moneyReceive) > 1999999999 ?
                                        "1,999,999,999 (2B)"
                                        :
                                        parseInt(moneyReceive).toLocaleString('en-US') + " (" + displayNum(moneyReceive) + ")"
                                }
                            </>
                            :
                            <></>
                    }
                </div>
            </div>
        </Card>
    )
}
