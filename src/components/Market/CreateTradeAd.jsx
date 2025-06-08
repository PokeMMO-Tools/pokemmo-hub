import React from 'react';
import { useCallback, useState, useEffect, useRef } from 'react';
import { Image, Stack, Form } from 'react-bootstrap';
import { Button, Card, Typography, Search } from '../Atoms';
import { ItemImage } from '../Items/ItemImage'
import { useMarket } from '../../context/MarketContext'
import { useTranslations } from '../../context/TranslationsContext'
import { getItemInfo, getPokemmoID, getItemName } from '../../utils/items';
import { getApiID } from '../../utils/items';
import { prices } from '../../utils/prices';
import { app, getUser, updateUser, auth, addTradeAd, getTradeAds, db } from '../../utils/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc, getDocs, setDoc, firebase, orderBy, limit, query, onSnapshot, firestore, collection } from "firebase/firestore";
import { IoMdRemoveCircleOutline } from 'react-icons/io'

import cosmetics from '../../data/pokemmo/item-cosmetic.json'
import { blue } from '@mui/material/colors';

export const CreateTradeAd = ({ data, style }) => {

    const [user] = useAuthState(auth)

    const itemList = data

    const { t, language } = useTranslations()
    const { allItems } = useMarket()
    //const { n, _id, slug, category }
    //const itemSelected = allItems.find(({ i }) => i === parseInt(2345))
    const item1 = allItems.find(({ i }) => i === parseInt(1192))
    const item2 = allItems.find(({ i }) => i === parseInt(1192))
    const [tradeAdOffer, setTradeAdOffer] = useState([])
    const [tradeAdRequest, setTradeAdRequest] = useState([])
    const [tradeData, setTradeData] = useState({
        give: null, //testing atm, if null the useEffect wont be fired on load. then when setting tradeData itll fire
        moneyGive: null,
        giveQuantity: null,
        receive: null,
        moneyReceive: null,
        receiveQuantity: null,
        timeStamp: Date.now(),
        uid: null
    })
    const [giveQuantity, setGiveQuantity] = useState(1)
    const [receiveQuantity, setReceiveQuantity] = useState(1)
    const [timeCheck, setTimeCheck] = useState()
    const [showRequestError, setShowRequestError] = useState(false)
    const [showOfferError, setShowOfferError] = useState(false)
    const inputRefsGive = useRef([])
    const inputRefsReceive = useRef([])
    const usernameRef = useRef(null)
    const [showMoneyOffer, setShowMoneyOffer] = useState(false)
    const [showMoneyRequest, setShowMoneyRequest] = useState(false)
    const inputMoneyOffer = useRef([])
    const inputMoneyRequest = useRef([])
    const [message, setMessage] = useState('');
    const [shortNum, setShortNum] = useState('')
    const [shortNum2, setShortNum2] = useState('')

    const docRef = doc(db, 'tradeads', user.uid)
    const docSnap = getDoc(docRef).then((result) => {
        if (result.metadata.hasPendingWrites == false) {
            if (!(result._document == null)) {
                let timeStamp = result._document.data.value.mapValue.fields.timeStamp.integerValue
                setTimeCheck(timeStamp)
            }
        }
    }
    )

    useEffect(() => {
        inputRefsGive.current = inputRefsGive.current.slice(0, tradeAdOffer.length)
        //  console.log(inputRefsGive)
    }, [tradeAdOffer]);

    useEffect(() => {
        inputRefsReceive.current = inputRefsReceive.current.slice(0, tradeAdRequest.length)
        //    console.log(inputRefsReceive)
    }, [tradeAdRequest]);

    useEffect(() => {
        if (tradeData.give !== null) {
            let difference = (parseInt(Date.now()) - parseInt(timeCheck)) / 1000
            //     console.log(difference)
            if (!isNaN(difference)) {
                if (difference > 900) { //15 minutes
                    addTradeAd(user.uid, tradeData).then(() => {
                        console.log("fired")
                        window.location.reload()
                    })
                } else {
                    alert("Posting too fast! Your last ad was " + difference + " seconds ago. Wait atleast 15 minutes (900 seconds)")
                }
            } else {
                console.log("no ad detected")
                addTradeAd(user.uid, tradeData).then(() => {
                    console.log("fired")
                    window.location.reload()
                })
            }
        }
    }, [tradeData])

    function getCosmeticID(id) {
        const item = allItems.find(({ i }) => i == id)
        let itemInfo = itemList.find(item => item.item.i.i === id)
        //console.log(itemList)
        //console.log(itemInfo.item.i.n.en)
        if (id == 10001) {
            let blueFlamingSkullMask = {
                i: 10001,
                n: {
                    "en": "Blue Flaming Skull Mask",
                    "cn": "Blue Flaming Skull Mask",
                    "de": "Blue Flaming Skull Mask",
                    "fr": "Blue Flaming Skull Mask",
                    "it": "Blue Flaming Skull Mask",
                    "es": "Blue Flaming Skull Mask"
                },
                "slug": "1000rp-reward-point-voucher",
                "_id": 1021,
                "category": 6
            }
            return blueFlamingSkullMask
        }
        if (id == 10002) {
            let orangeFlamingSkullMask = {
                i: 10002,
                n: {
                    "en": "Orange Flaming Skull Mask",
                    "cn": "Orange Flaming Skull Mask",
                    "de": "Orange Flaming Skull Mask",
                    "fr": "Orange Flaming Skull Mask",
                    "it": "Orange Flaming Skull Mask",
                    "es": "Orange Flaming Skull Mask"
                },
                "slug": "1000rp-reward-point-voucher",
                "_id": 1022,
                "category": 6
            }
            return orangeFlamingSkullMask
        }
        if (id == 10003) {
            let scythe = {
                i: 10003,
                n: {
                    "en": "Scythe",
                    "cn": "Scythe",
                    "de": "Scythe",
                    "fr": "Scythe",
                    "it": "Scythe",
                    "es": "Scythe"
                },
                "slug": "1000rp-reward-point-voucher",
                "_id": 1019,
                "category": 6
            }
            return scythe
        }
        if (id == 10004) {
            let candyCane = {
                i: 10004,
                n: {
                    "en": "Candy Cane",
                    "cn": "Candy Cane",
                    "de": "Candy Cane",
                    "fr": "Candy Cane",
                    "it": "Candy Cane",
                    "es": "Candy Cane"
                },
                "slug": "1000rp-reward-point-voucher",
                "_id": 1015,
                "category": 6
            }
            return candyCane
        }
        if (id == 10005) {
            let ghostCostume = {
                i: 10005,
                n: {
                    "en": "Ghost Costume",
                    "cn": "Ghost Costume",
                    "de": "Ghost Costume",
                    "fr": "Ghost Costume",
                    "it": "Ghost Costume",
                    "es": "Ghost Costume"
                },
                "slug": "1000rp-reward-point-voucher",
                "_id": 1009,
                "category": 6
            }
            return ghostCostume
        }
        if (item == undefined) {
            let undefinedItem = {
                i: itemInfo.item.i.i,
                n: {
                    "en": itemInfo.item.i.n.en,
                    "cn": itemInfo.item.i.n.cn,
                    "de": itemInfo.item.i.n.de,
                    "fr": itemInfo.item.i.n.fr,
                    "it": itemInfo.item.i.n.it,
                    "es": itemInfo.item.i.n.es
                },
                "slug": "1000rp-reward-point-voucher",
                "_id": 0,
                "category": 0
            }
            //console.log(undefinedItem)
            console.log("found undefined")
            return undefinedItem
        }


        return item
    }

    function requestDuplicate() {
        setShowRequestError(true)
        console.log("Cant add more of the same item to Request. Use quantity instead")
    }
    function offerDuplicate() {
        setShowOfferError(true)
        console.log("Cant add more of the same item to Offer. Use quantity instead")
    }

    function tradeOffer(id) {
        /*    let apiID = getApiID(id)
            let currentItem = allItems.find(({ i }) => i === parseInt(apiID))
            console.log(currentItem)
            console.log(getItemInfo(id))
            console.log(currentItem._id)*/
        const { i, n, slug, _id, category } = getCosmeticID(id)
        const x = Object.entries(tradeAdOffer);
        if ((tradeAdOffer.filter(e => e.id === i).length > 0)) {
            console.log("match found: " + i)
            offerDuplicate()
            return
        }
        setTradeAdOffer(tradeAdOffer => [...tradeAdOffer, { name: n, id: i, _id: _id, slug: slug, category: category }])



    }
    function tradeRequest(id) {
        /*    let apiID = getApiID(id)
            let currentItem = allItems.find(({ i }) => i === parseInt(apiID))
            console.log(currentItem)
            console.log(getItemInfo(id))
            console.log(currentItem._id)*/
        const { i, n, slug, _id, category } = getCosmeticID(id)
        const x = Object.entries(tradeAdRequest);
        if ((tradeAdRequest.filter(e => e.id === i).length > 0)) {
            console.log("match found: " + i)
            requestDuplicate()
            return
        }
        setTradeAdRequest(tradeAdRequest => [...tradeAdRequest, { name: n, id: i, _id: _id, slug: slug, category: category }])
    }

    function sendTradeAd() {
        //  console.log(tradeAdOffer)
        if ((tradeAdOffer.length || inputMoneyOffer.current.value) && (tradeAdRequest.length || inputMoneyRequest.current.value) && (tradeAdOffer.length || tradeAdRequest.length)) {
            const offerID = tradeAdOffer.map(item => item.id + '');
            const requestID = tradeAdRequest.map(item => item.id + '');
            const quantityGive = inputRefsGive.current.map(refs => {
                if (parseInt(refs.value) > 999) {
                    return 999 + ''
                } else {
                    return refs.value + ''
                }
            })
            const quantityReceive = inputRefsReceive.current.map(refs => {
                if (parseInt(refs.value) > 999) {
                    return 999 + ''
                } else {
                    return refs.value + ''
                }
            })

            if (!(quantityGive.includes('')) && !(quantityReceive.includes('')) && (((usernameRef.current.value !== null) && (usernameRef.current.value !== "")))) {
                //    console.log(quantityGive, quantityReceive)
                //     console.log(usernameRef.current.value)
                setTradeData(tradeData => ({
                    ...tradeData, give: offerID, giveQuantity: quantityGive, moneyGive: inputMoneyOffer.current.value ? inputMoneyOffer.current.value : null,
                    receive: requestID, receiveQuantity: quantityReceive, moneyReceive: inputMoneyRequest.current.value ? inputMoneyRequest.current.value : null,
                    username: message, timeStamp: Date.now(), uid: user.uid
                }))
                //     console.log(tradeAdOffer)
                return
            } else {
                alert('Input valid username and item quantities!')
            }

            return
        }
        alert("Select valid items to offer and request first!")
    }

    function removeOffer(i) {
        let left = tradeAdOffer.slice(0, i);
        let right = tradeAdOffer.slice(i + 1);
        let left2 = inputRefsGive.current.slice(0, i);
        let right2 = inputRefsGive.current.slice(i + 1);
        //     console.log([...left, ...right])
        //    console.log([...left2, ...right2])
        setTradeAdOffer([...left, ...right])
        inputRefsGive.current = [...left2, ...right2]
    }

    function removeRequest(i) {
        let left = tradeAdRequest.slice(0, i);
        let right = tradeAdRequest.slice(i + 1);
        let left2 = inputRefsReceive.current.slice(0, i);
        let right2 = inputRefsReceive.current.slice(i + 1);
        //     console.log([...left, ...right])
        //    console.log([...left2, ...right2])
        setTradeAdRequest([...left, ...right])
        inputRefsReceive.current = [...left2, ...right2]
    }

    function moneyToggleOffer() {
        showMoneyOffer ? setShowMoneyOffer(false) : setShowMoneyOffer(true)
    }
    function moneyToggleRequest() {
        showMoneyRequest ? setShowMoneyRequest(false) : setShowMoneyRequest(true)
    }

    const handleChange = event => {
        const result = event.target.value.replace(/[^a-z]/gi, '');
        setMessage(result);
    };

    function displayNum(labelValue) {
        // Nine Zeroes for Billions
        return Math.abs(Number(labelValue)) >= 1.0e+9

            ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
            // Six Zeroes for Millions 
            : Math.abs(Number(labelValue)) >= 1.0e+6

                ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
                // Three Zeroes for Thousands
                : Math.abs(Number(labelValue)) >= 1.0e+3

                    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

                    : Math.abs(Number(labelValue));
    }

    return (
        <>
            <Card style={{
                flex: '200px', 'marginBottom': '10px', ...style
            }}>

                <div className="row flex">
                    <div className="col flex" style={{
                        'align-items': 'center', 'justify-content': 'center', display: 'flex'
                    }}>
                        <Form.Group className="mb-3 w-50 flex" controlId="quantity">
                            <Form.Text className="text-muted" style={{ display: 'flex', fontSize: '0.85rem', textAlign: 'center', 'align-items': 'center', 'justify-content': 'center' }}>
                                {t('Enter the PokeMMO account you wish to trade on')}
                            </Form.Text>
                            <Form.Control
                                ref={usernameRef}
                                type="text"
                                placeholder={t('Account Name')}
                                min={0}
                                maxLength={16}
                                pattern={'/[^a-z]/gi'}
                                value={message}
                                onChange={handleChange}
                            />

                        </Form.Group></div>

                    <div className="w-100"></div>
                    <div className="col" style={{ flex: '1 1 0' }}>
                        <Typography as="p" className='text-muted mb-0' style={{ fontSize: '.8rem', textTransform: "capitalize" }}>Items</Typography>
                        <div className='d-flex' style={{ gap: '0.3rem' }}>
                            <Search
                                hasEmpty={true}
                                items={
                                    itemList.length ?
                                        itemList
                                            .map(({ item }) => {
                                                return {
                                                    value: getItemName(item.i)[language],
                                                    value2: item.i.i,
                                                    label: <Stack direction="horizontal"><ItemImage className="me-1" category={getCosmeticID(item.i.i).category} id={getCosmeticID(item.i.i)._id} />&nbsp;{language !== 'cn' && language !== 'tw' ? getItemName(item.i)[language] : getItemInfo(item1._id).name}</Stack>,
                                                }
                                            })
                                        :
                                        []
                                }
                                onChange={({ value2 }) => tradeOffer(value2)}

                                value={1}
                            ></Search>
                            <Button size="sm" style={{ backgroundColor: "#266d42", color: "white", borderColor: "#266d42", 'marginBottom': "0px", fontSize: "0.75rem", width: "30%", display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => moneyToggleOffer()}>{t('Add Money')}</Button>

                        </div>
                    </div>
                    <div className="col" style={{ flex: '1 1 0' }}>
                        <Typography as="p" className='text-muted mb-0' style={{ fontSize: '.8rem', textTransform: "capitalize" }}>Items</Typography>
                        <div className='d-flex mb-1' style={{ gap: '0.3rem' }}>
                            <Search
                                hasEmpty={true}
                                items={
                                    itemList.length ?
                                        itemList
                                            .map(({ item }) => {
                                                return {
                                                    value: getItemName(item.i)[language],
                                                    value2: item.i.i,
                                                    label: <Stack direction="horizontal"><ItemImage className="me-1" category={getCosmeticID(item.i.i).category} id={getCosmeticID(item.i.i)._id} />&nbsp;{language !== 'cn' && language !== 'tw' ? getItemName(item.i)[language] : getItemInfo(item1._id).name}</Stack>,
                                                }
                                            })
                                        :
                                        []
                                }
                                onChange={({ value2 }) => tradeRequest(value2)}
                                value={1}
                            ></Search>
                            <Button size="sm" style={{ backgroundColor: "#266d42", color: "white", borderColor: "#266d42", 'marginBottom': "0px", fontSize: "0.75rem", width: "30%", display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={() => moneyToggleRequest()}>{t('Add Money')}</Button>

                        </div>
                    </div>
                    <div className="w-100"></div>
                    <div className="col">{t('Offering:')} </div>
                    <div className="col">{t('Requesting:')} </div>
                    <div className="w-100"></div>
                    <div className="col w-50">
                        {
                            tradeAdOffer.length ?
                                tradeAdOffer.map((item, i) => {
                                    return (
                                        <Stack direction='horizontal' className="col" key={item.id + "Give"}>
                                            <Form.Group className="mb-1 align-middle" controlId={item._id + 'offer'} style={{ 'width': '25%' }}>

                                                <Form.Control style={{ minWidth: '3rem' }}
                                                    ref={el => inputRefsGive.current[i] = el}
                                                    className="align-middle"
                                                    type="number"
                                                    onKeyDown={(evt) => (isNaN(evt.key) && evt.key != 'Backspace' && evt.key != 'ArrowLeft' && evt.key != 'ArrowRight') && evt.preventDefault()}
                                                    maxLength="3"
                                                    defaultValue={inputRefsGive.current[i] ? inputRefsGive.current[i].value : 1}
                                                    placeholder={t('Quantity')}
                                                    pattern="^\d*\.?\d+$"
                                                    min="1"
                                                    max="999"
                                                //  value={giveQuantity}
                                                //  onChange={({ target }) => setGiveQuantity(target.valueAsNumber)}
                                                //                                onChange={({ target }) => console.log(inputRefsGive.current.map(refs => refs.value + '').includes(''))}
                                                />
                                            </Form.Group>
                                            {'\u00A0'}
                                            <ItemImage className="me-1 align-middle ml-3" category={item.category} id={item._id} />
                                            {language !== 'cn' && language !== 'tw' ? item.name[language] : getItemInfo(item._id).name}
                                            <Button variant='link' onClick={() => removeOffer(i)} className="ms-auto">
                                                <IoMdRemoveCircleOutline size={24} fill={'var(--bs-danger)'} />
                                            </Button>
                                        </Stack>)
                                })
                                : <></>
                        }
                        {
                            showMoneyOffer ?
                                <>
                                    <Stack direction="horizontal">
                                        <Form.Group className="mb-1 mt-1 align-middle" controlId={'money-offer'} style={{ 'width': '50%' }}>

                                            <Form.Control
                                                ref={inputMoneyOffer}
                                                className="align-middle"
                                                type="number"
                                                onKeyDown={(evt) => (isNaN(evt.key) && evt.key != 'Backspace' && evt.key != 'ArrowLeft' && evt.key != 'ArrowRight') && evt.preventDefault()}
                                                maxLength="3"
                                                defaultValue={inputMoneyOffer.current ? inputMoneyOffer.current.value : null}
                                                placeholder={t('Money to offer')}
                                                pattern="^\d*\.?\d+$"
                                                min="1"
                                                max="999"
                                                label="yuh"
                                                //  value={giveQuantity}
                                                onChange={({ target }) => setShortNum(displayNum(inputMoneyOffer.current.value))}
                                            //  onChange={({ target }) => setGiveQuantity(target.valueAsNumber)}
                                            // onChange={({ target }) => console.log(inputRefsGive.current.map(refs => refs.value + '').includes(''))}
                                            />
                                        </Form.Group>
                                        {'\u00A0'}
                                        <ItemImage category={0} id={9999}></ItemImage>{shortNum}
                                    </Stack>
                                </>
                                :
                                <></>
                        }
                    </div>
                    <div className="col w-50">
                        {
                            tradeAdRequest.length ?
                                tradeAdRequest.map((item, i) => {
                                    return (
                                        <Stack direction='horizontal' className="col" key={item.id + "Receive"}>
                                            <Form.Group className="mb-1 align-middle" controlId={item._id + 'offer'}>

                                                <Form.Control style={{ minWidth: '3rem' }}
                                                    ref={el => inputRefsReceive.current[i] = el}
                                                    className="align-middle"
                                                    type="number"
                                                    onKeyDown={(evt) => (isNaN(evt.key) && evt.key != 'Backspace' && evt.key != 'ArrowLeft' && evt.key != 'ArrowRight') && evt.preventDefault()}
                                                    maxLength="3"
                                                    defaultValue={inputRefsReceive.current[i] ? inputRefsReceive.current[i].value : 1}
                                                    placeholder={t('Quantity')}
                                                    pattern="^\d*\.?\d+$"
                                                    min="1"
                                                    max="999"
                                                //  value={giveQuantity}
                                                //  onChange={({ target }) => setGiveQuantity(target.valueAsNumber)}
                                                //  onChange={({ target }) => console.log(inputRefsReceive.current.map(refs => refs.value + '').includes(''))}
                                                />
                                            </Form.Group>
                                            {'\u00A0'}
                                            <ItemImage className="me-1" category={item.category} id={item._id} />
                                            {language !== 'cn' && language !== 'tw' ? item.name[language] : getItemInfo(item._id).name}
                                            <Button variant='link' onClick={() => removeRequest(i)} className="ms-auto">
                                                <IoMdRemoveCircleOutline size={24} fill={'var(--bs-danger)'} />
                                            </Button>
                                        </Stack>)
                                })
                                : <></>
                        }
                        {
                            showMoneyRequest ?
                                <>
                                    <Stack direction="horizontal">
                                        <Form.Group className="mb-1 mt-1 align-middle" controlId={'money-request'} style={{ 'width': '50%' }} direction="horizontal">
                                            <Form.Control
                                                ref={inputMoneyRequest}
                                                className="align-middle"
                                                type="number"
                                                onKeyDown={(evt) => (isNaN(evt.key) && evt.key != 'Backspace' && evt.key != 'ArrowLeft' && evt.key != 'ArrowRight') && evt.preventDefault()}
                                                maxLength="3"
                                                defaultValue={inputMoneyRequest.current ? inputMoneyRequest.current.value : null}
                                                placeholder={t('Money to request')}
                                                pattern="^\d*\.?\d+$"
                                                min="1"
                                                max="999"
                                                //  value={giveQuantity}
                                                onChange={({ target }) => setShortNum2(displayNum(inputMoneyRequest.current.value))}
                                            //  onChange={({ target }) => setGiveQuantity(target.valueAsNumber)}
                                            // onChange={({ target }) => console.log(inputRefsGive.current.map(refs => refs.value + '').includes(''))}
                                            />
                                        </Form.Group>
                                        {'\u00A0'}
                                        <ItemImage category={0} id={9999}></ItemImage>{shortNum2}
                                    </Stack>

                                </>
                                :
                                <></>
                        }
                    </div>
                    <div className="w-100"></div>
                    <div className="col">
                        {
                            !showOfferError ?
                                <></>
                                :
                                <>
                                    <br></br>
                                    <Typography style={{ 'marginBottom': '0px', 'color': '#e74444' }}>Do not use duplicate items, instead adjust the quantity</Typography>
                                </>
                        }
                    </div>
                    <div className="col">
                        {
                            !showRequestError ?
                                <></>
                                :
                                <>
                                    <br></br>
                                    <Typography style={{ 'marginBottom': '0px', 'color': '#e74444' }}>Do not use duplicate items, instead adjust the quantity</Typography>
                                </>
                        }
                    </div>
                </div>
            </Card >
            <Button size="md" style={{ backgroundColor: "#b97fc9", color: "white", borderColor: "#b97fc9", 'marginBottom': "10px" }} onClick={() => sendTradeAd()}>Create Trade Ad</Button>
        </>
    )
}
