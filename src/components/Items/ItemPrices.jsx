import React, { useEffect, useState } from 'react'
import { Placeholder, Stack } from 'react-bootstrap'
import { TbBrandStackoverflow, TbMoneybag } from 'react-icons/tb'
import { prices } from '../../utils/prices'
import { Badge } from '../Atoms'
import { ItemDifferentials } from './ItemDifferentials'

const BadgePlaceholder = () => (
    <Placeholder animation='glow'>
        <Placeholder as={Badge} style={{ width: '3rem', height: '22.4px' }}>
            <Placeholder />
        </Placeholder>
    </Placeholder>
)

export const ItemPrices = ({ i, onPriceUpdate = false }) => {
    const [minPrice, setMinPrice] = useState(0)
    const [priceChanges, setPriceChanges] = useState(0)
    const [priceLoading, setPriceLoading] = useState(true)
    const [quantity, setQuantity] = useState(0)
    const [quantityChange, setQuantityChange] = useState(0)
    const [quantityLoading, setQuantityLoading] = useState(true)

    const priceDifferentials = minPrice - priceChanges;
    const quantityDifferentials = quantity - quantityChange;

    useEffect(() => {
        const { cancelToken } = prices;
        let [sourceGetItem, sourceGetQuantity] = [cancelToken.source(), cancelToken.source()];

        const timeout = setTimeout(() => {
            prices.getItem(i, sourceGetItem)
                .then(res => {
                    const [currentMinPrice, fourSnapBeforeMinPrice] = [res[res.length - 1]?.y || 0, res[res.length - 4]?.y || 0]
                    setMinPrice(currentMinPrice)
                    setPriceChanges(fourSnapBeforeMinPrice)
                    setPriceLoading(false)
                    if (onPriceUpdate)
                        onPriceUpdate({ min: currentMinPrice, change: fourSnapBeforeMinPrice, loading: false })
                })
                .catch(err => {
                    console.log(err);
                })

            prices.getItemQuantity(i, sourceGetQuantity)
                .then(res => {
                    const [currentMinQuantity, fourSnapBeforeMinQuantity] = [
                        res[res.length - 1].y,
                        res[res.length - 4].y
                    ]
                    setQuantity(currentMinQuantity)
                    setQuantityChange(fourSnapBeforeMinQuantity)
                    setQuantityLoading(false)
                })
                .catch(err => {
                    console.log(err);
                })

        }, 1500)

        return () => {
            clearTimeout(timeout)
            sourceGetItem.cancel()
            sourceGetQuantity.cancel()
        }
    }, [])


    return (
        <Stack direction="horizontal" gap={2} className='flex-wrap'>
            {
                priceLoading
                    ? <BadgePlaceholder />
                    : <ItemDifferentials icon={TbMoneybag} value={minPrice} differential={priceDifferentials} description={"Current price. "} />
            }
            {
                quantityLoading
                    ? <BadgePlaceholder />
                    : <ItemDifferentials icon={TbBrandStackoverflow} invertColor={true} value={quantity} differential={quantityDifferentials} description={"Current item supply in the market"} />
            }
        </Stack>
    )
}
