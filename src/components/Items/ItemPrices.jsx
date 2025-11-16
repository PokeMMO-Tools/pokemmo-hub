import React, { useEffect, useState } from 'react'
import { Placeholder, Stack } from 'react-bootstrap'
import { TbBrandStackoverflow, TbMoneybag } from 'react-icons/tb'
import { prices } from '../../utils/prices'
import { Badge } from '../Atoms'
import { ItemDifferentials } from './ItemDifferentials'

const BadgePlaceholder = () => (
    <Placeholder animation="glow">
        <Placeholder as={Badge} style={{ width: '3rem', height: '22.4px' }}>
            <Placeholder />
        </Placeholder>
    </Placeholder>
)

export const ItemPrices = ({ i, p, q, noDiff, onPriceUpdate = false }) => {
    const [minPrice, setMinPrice] = useState(0)
    const [priceChanges, setPriceChanges] = useState(0)
    const [priceLoading, setPriceLoading] = useState(true)

    const [quantity, setQuantity] = useState(0)
    const [quantityChange, setQuantityChange] = useState(0)
    const [quantityLoading, setQuantityLoading] = useState(true)

    const priceDifferentials = minPrice - priceChanges
    const quantityDifferentials = quantity - quantityChange

    useEffect(() => {
        // only fetch if p & q not provided
        const shouldFetch = !p || !q

        if (!shouldFetch) {
            setMinPrice(p ?? 0)
            setPriceLoading(false)
            setQuantity(q ?? 0)
            setQuantityLoading(false)
            return
        }

        const { cancelToken } = prices
        const sourceGetItem = cancelToken.source()
        const sourceGetQuantity = cancelToken.source()

        const timeout = setTimeout(() => {
            prices.getItem(i, sourceGetItem)
                .then(res => {
                    const currentMinPrice = res[res.length - 1]?.y || 0
                    const fourBefore = res[res.length - 4]?.y || 0

                    setMinPrice(currentMinPrice)
                    setPriceChanges(fourBefore)
                    setPriceLoading(false)

                    if (onPriceUpdate) {
                        onPriceUpdate({
                            min: currentMinPrice,
                            change: fourBefore,
                            loading: false
                        })
                    }
                })
                .catch(console.log)

            prices.getItemQuantity(i, sourceGetQuantity)
                .then(res => {
                    const currentMinQty = res[res.length - 1]?.y || 0
                    const fourBeforeQty = res[res.length - 4]?.y || 0

                    setQuantity(currentMinQty)
                    setQuantityChange(fourBeforeQty)
                    setQuantityLoading(false)
                })
                .catch(console.log)
        }, 1500)

        return () => {
            clearTimeout(timeout)
            sourceGetItem.cancel()
            sourceGetQuantity.cancel()
        }
    }, [i, p, q, onPriceUpdate])

    return (
        <>
            {noDiff ? (
                <Stack direction="horizontal" gap={1} className="flex-wrap">
                    {priceLoading
                        ? <BadgePlaceholder />
                        : <ItemDifferentials icon={TbMoneybag} value={minPrice} differential={0} description="Current price." />}
                    {quantityLoading
                        ? <BadgePlaceholder />
                        : <ItemDifferentials icon={TbBrandStackoverflow} invertColor={true} value={quantity} differential={0} description="Current item supply in the market" />}
                </Stack>
            ) : (!p || !q) ? (
                <Stack direction="horizontal" gap={2} className="flex-wrap">
                    {priceLoading
                        ? <BadgePlaceholder />
                        : <ItemDifferentials icon={TbMoneybag} value={minPrice} differential={priceDifferentials} description="Current price." />}
                    {quantityLoading
                        ? <BadgePlaceholder />
                        : <ItemDifferentials icon={TbBrandStackoverflow} invertColor={true} value={quantity} differential={quantityDifferentials} description="Current item supply in the market" />}
                </Stack>
            ) : (
                <Stack direction="horizontal" gap={2} className="flex-wrap">
                    <ItemDifferentials icon={TbMoneybag} value={p} differential={priceDifferentials} description="Current price." />
                    <ItemDifferentials icon={TbBrandStackoverflow} invertColor={true} value={q} differential={quantityDifferentials} description="Current item supply in the market" />
                </Stack>
            )}
        </>
    )
}
