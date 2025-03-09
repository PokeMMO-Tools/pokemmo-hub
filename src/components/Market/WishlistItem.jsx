import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { Placeholder, Stack } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { Td as SrTd, Tr as SrTr } from 'react-super-responsive-table'
import { useMarket } from '../../context/MarketContext'
import { useTranslations } from '../../context/TranslationsContext'
import { prices } from '../../utils/prices'
import { Button, Typography } from '../Atoms'
import { ItemImage } from '../Items/ItemImage'
import { ItemPrices } from '../Items/ItemPrices'
import { useQuery } from 'react-query'
import { SparklineGraph } from '../Atoms/SparklineGraph';

export const WishlistItem = ({ wishlist, onPriceUpdate }) => {

    const { language } = useTranslations()
    const [currentPrice, setCurrentPrice] = useState({
        min: 0,
        change: 0,
        isLoading: true
    })

    const { data: pricesWishlist } = useQuery(
        ["prices", wishlist],
        () => prices.getItemConstraint(wishlist, 180),
        { staleTime: 180000 }
    )

    const { removeFromWishlist, allItems } = useMarket()
    const { n, _id, slug, category } = wishlist ? allItems.find(({ i }) => i === wishlist) : false

    const Tr = isMobile ? SrTr : 'tr'
    const Td = isMobile ? SrTd : 'td'

    return (
        n ?
            <Tr>
                <Td component="th" scope="row" className="d-flex align-items-start border-0">
                    <ItemImage className="me-1" category={category} id={_id} />
                    &nbsp;
                    <Typography as={Link} to={`/items/${slug}`} style={{ color: 'var(--bs-info)' }}>{n[language]}</Typography>
                </Td>
                <Td align="right" className=' border-0'>
                    <ItemPrices onPriceUpdate={setCurrentPrice} i={wishlist} />
                </Td>
                <Td align="right" className='border-0 w-5'>
                    <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', width: '100%' }} className="w-100 mb-0">
                        <SparklineGraph data={pricesWishlist ? pricesWishlist : []} width={200} height={30} link={slug} />
                    </div>
                </Td>
                <Td align="right" className=' border-0'>
                    <Stack direction='horizontal' gap={1} className='justify-content-end'>
                        <Button size="sm" variant='danger' onClick={() => removeFromWishlist(wishlist)}><TbTrash /></Button>
                    </Stack>
                </Td>
            </Tr >
            :
            <></>
    )
}




