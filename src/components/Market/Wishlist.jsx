import React, { useEffect, useState } from 'react'
import { Link } from 'gatsby'
import { Stack } from 'react-bootstrap'
import { isMobile, isTablet } from 'react-device-detect'
import { Table as SrTable, Tbody as SrTbody, Th as SrTh, Thead as SrThead, Tr as SrTr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useTranslations } from '../../context/TranslationsContext'
import { Card, Table as DesktopTable, Typography, Button } from '../Atoms'
import { WishlistItem } from './WishlistItem'
import { useMarket } from '../../context/MarketContext'

export const Wishlist = ({ }) => {
    const { t, language } = useTranslations()

    let { wishlist, allItems } = useMarket()
    console.log(wishlist)

    const Table = isMobile && !isTablet ? SrTable : DesktopTable
    const Thead = isMobile && !isTablet ? SrThead : 'thead'
    const Tbody = isMobile && !isTablet ? SrTbody : 'tbody'
    const Th = isMobile && !isTablet ? SrTh : 'td'
    const Tr = isMobile && !isTablet ? SrTr : 'tr'

    return (
        wishlist.length
            ? <Stack gap={2}>
                <Card>
                    <Table responsive={true} withBaseStyles={{ breakpoint: "920px" }}>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>{t('Price and Supply')}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                wishlist.map((wishlist) => (
                                    <WishlistItem
                                        key={wishlist}
                                        wishlist={wishlist}
                                    />
                                ))
                            }
                        </Tbody>
                    </Table>
                </Card>
            </Stack>
            :
            <Card>
                <Stack direction="horizontal" className="flex-wrap justify-content-between">
                    <Typography className='mb-0'>No wishlist items found. Start now by going to "All Items" and adding items to your wishlist.</Typography>
                </Stack>
            </Card>
    )
}