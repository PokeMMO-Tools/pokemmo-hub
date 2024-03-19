import React, { useEffect, useState } from 'react'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useTranslations } from '../../context/TranslationsContext'
import { Card, Table as DesktopTable, Typography, Button, Modal } from '../Atoms'
import { TradeListing } from './TradeListing'
import { CreateTradeAd } from './CreateTradeAd'
import { app, getUser, updateUser, auth, addTradeAd, getTradeAds } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AccountModal } from '../Account/AccountModal';
import { prices } from '../../utils/prices';
import { useMarket } from '../../context/MarketContext'

export const TradeAds = () => {
    const { t } = useTranslations();

    const toggleModal = () => setIsOpen(prev => !prev);
    const toggleModal2 = () => setShow(prev => !prev);

    const { allItems } = useMarket()
    const [itemList, setItemList] = useState({})
    const [user] = useAuthState(auth)
    const [trades, setTrades] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [show, setShow] = useState(false)
    const [arrayDefined, setArrayDefined] = useState([])
    const [arrayUndefined, setArrayUndefined] = useState([])

    useEffect(() => {
        getTradeAds().then((result) => setTrades(result))
        if (user) {
            getUser(user.uid).then((result) => /* console.log(result)*/ console.log(''))
            //        console.log(trades)
        }
        prices.getAllItemsDesc().then((result) => generateList(result))
    }, []);



    function generateList(array) {

        let arrayDefinedTemp = []
        let arrayUndefinedTemp = []
        const itemArray = array
            .map(item => {
                const itemCheck = allItems.find(({ i }) => i == item.i.i)

                if (!(itemCheck === undefined)) {

                    arrayDefinedTemp.push({ item })
                } else {
                    arrayUndefinedTemp.push({ item })
                }
                return { item }
            })

        let blueFlamingSkull = {
            item: {
                i: {
                    d: "",
                    i: 10001,
                    n: {
                        "en": "Blue Flaming Skull Mask",
                        "cn": "Blue Flaming Skull Mask",
                        "de": "Blue Flaming Skull Mask",
                        "fr": "Blue Flaming Skull Mask",
                        "it": "Blue Flaming Skull Mask",
                        "es": "Blue Flaming Skull Mask"
                    },
                    t: 0
                },
                p: 10,
                q: 10
            }
        }
        let orangeFlamingSkull = {
            item: {
                i: {
                    d: "",
                    i: 10002,
                    n: {
                        "en": "Orange Flaming Skull Mask",
                        "cn": "Orange Flaming Skull Mask",
                        "de": "Orange Flaming Skull Mask",
                        "fr": "Orange Flaming Skull Mask",
                        "it": "Orange Flaming Skull Mask",
                        "es": "Orange Flaming Skull Mask"
                    },
                    t: 0
                },
                p: 10,
                q: 10
            }
        }
        arrayDefinedTemp.push(blueFlamingSkull, orangeFlamingSkull)

        if ((arrayDefinedTemp.find(({ item }) => item.i.n.en == "Scythe") == undefined)) {
            let scythe = {
                item: {
                    i: {
                        d: "",
                        i: 10003,
                        n: {
                            "en": "Scythe",
                            "cn": "Scythe",
                            "de": "Scythe",
                            "fr": "Scythe",
                            "it": "Scythe",
                            "es": "Scythe"
                        },
                        t: 0
                    },
                    p: 10,
                    q: 10
                }
            }
            arrayDefinedTemp.push(scythe)
        }
        if ((arrayDefinedTemp.find(({ item }) => item.i.n.en == "Candy Cane") == undefined)) {
            let candyCane = {
                item: {
                    i: {
                        d: "",
                        i: 10004,
                        n: {
                            "en": "Candy Cane",
                            "cn": "Candy Cane",
                            "de": "Candy Cane",
                            "fr": "Candy Cane",
                            "it": "Candy Cane",
                            "es": "Candy Cane"
                        },
                        t: 0
                    },
                    p: 10,
                    q: 10
                }
            }
            arrayDefinedTemp.push(candyCane)
        }
        if ((arrayDefinedTemp.find(({ item }) => item.i.n.en == "Ghost Costume") == undefined)) {
            let ghostCostume = {
                item: {
                    i: {
                        d: "",
                        i: 10005,
                        n: {
                            "en": "Ghost Costume",
                            "cn": "Ghost Costume",
                            "de": "Ghost Costume",
                            "fr": "Ghost Costume",
                            "it": "Ghost Costume",
                            "es": "Ghost Costume"
                        },
                        t: 0
                    },
                    p: 10,
                    q: 10
                }
            }
            arrayDefinedTemp.push(ghostCostume)
        }

        setArrayDefined(arrayDefinedTemp)
        setItemList(itemArray)
    }
    //  console.log(arrayDefined)
    //  console.log(arrayUndefined)
    return (
        <>
            {
                user
                    ?
                    <Button size="lg" style={{ backgroundColor: "#b97fc9", color: "white", borderColor: "#b97fc9", 'marginBottom': "10px" }} onClick={() => toggleModal()}>Create Trade Ad</Button>
                    :
                    <Button size="lg" style={{ backgroundColor: "#b97fc9", color: "white", borderColor: "#b97fc9", 'marginBottom': "10px" }} onClick={() => toggleModal2()}>Create Trade Ad</Button>

            }
            <Modal
                size="lg"
                show={isOpen}
                onHide={toggleModal}
                title="Create Trade Ad"
                footer={<></>}
            >
                {
                    arrayDefined.length > 10 ?
                        <CreateTradeAd data={arrayDefined}></CreateTradeAd>
                        :
                        <CreateTradeAd data={[]}></CreateTradeAd>
                }

            </Modal>
            <AccountModal show={show} onHide={toggleModal2} />
            {
                trades.length
                    ?
                    trades.map((listing, index) => {
                        return <TradeListing key={index} data={listing} />
                    })
                    :
                    <div className="p-2" style={{
                        flex: '200px', 'marginBottom': '5px', backgroundColor: '#282b31', borderRadius: '10px'
                    }}>
                        <div className='p-2' style={{
                            backgroundColor: '#212429', borderRadius: '10px'
                        }}>
                            Loading Ads . . .
                        </div>
                    </div>
            }
        </>
    )
}