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

export const InvestmentItem = ({ investment, onPriceUpdate }) => {
    const { language } = useTranslations()
    const [currentPrice, setCurrentPrice] = useState({
        min: 0,
        change: 0,
        isLoading: true
    })
    const { toggleInvestmentsModal, removeFromInvestments, allItems } = useMarket()
    const { n, _id, slug, category } = allItems.find(({ i }) => i === investment.i)
    const sellTotal = currentPrice.min * investment.quantity    //prices.calculateSellGain(currentPrice.min) for listing fee deduction
    const boughtTotal = investment.boughtPrice * investment.quantity
    const boughtWorth = investment.quantity * currentPrice.min
    const gainTotal = sellTotal - boughtTotal
    const gainPercent = gainTotal / boughtTotal * 100

    useEffect(() => {
        if (currentPrice.isLoading)
            return;
        onPriceUpdate(investment.id, gainTotal, boughtTotal)

    }, [currentPrice, gainTotal, boughtTotal])

    const Tr = isMobile ? SrTr : 'tr'
    const Td = isMobile ? SrTd : 'td'

    return (
        <Tr>
            <Td component="th" scope="row" className="d-flex align-items-start border-0">
                <ItemImage className="me-1" category={category} id={_id} />
                &nbsp;
                <Typography as={Link} to={`/items/${slug}`} style={{ color: 'var(--bs-info)' }}>{n[language]}</Typography>
            </Td>
            <Td align="right" className=' border-0'>
                <ItemPrices onPriceUpdate={setCurrentPrice} i={investment.i} />
            </Td>
            <Td align="right" className=' border-0'>{
                investment.quantity
            }</Td>
            <Td align="right" className=' border-0'>{
                prices.format(investment.boughtPrice)
            }</Td>
            <Td align="right" className=' border-0'>{
                prices.format(parseInt(boughtTotal))
            }</Td>
            <Td align="right" className=' border-0'>{
                currentPrice.isLoading
                    ? <Placeholder as="p" animation='glow' className="w-100 mb-0">
                        <Placeholder xs={12}></Placeholder>
                    </Placeholder>
                    : <span className={`mb-0 ${gainTotal > 0 ? 'text-success' : 'text-danger'}`}>{prices.format(parseInt(boughtWorth))}</span>
            }</Td>
            <Td align="right" className=' border-0'>{
                currentPrice.isLoading
                    ? <Placeholder as="p" animation='glow' className="w-100 mb-0">
                        <Placeholder xs={12}></Placeholder>
                    </Placeholder>
                    : <span className={`mb-0 ${gainTotal > 0 ? 'text-success' : 'text-danger'}`}>{prices.format(parseInt(gainTotal))}</span>
            }</Td>
            <Td align="right" className=' border-0'>{
                currentPrice.isLoading
                    ? <Placeholder as="p" animation='glow' className="w-100 mb-0">
                        <Placeholder xs={12}></Placeholder>
                    </Placeholder>
                    : <span className={`mb-0 ${gainPercent > 0 ? 'text-success' : 'text-danger'}`}>{prices.format(parseFloat(gainPercent.toFixed(1))) + "%"}</span>
            }</Td>
            <Td align="right" className=' border-0'>
                <Stack direction='horizontal' gap={1} className='justify-content-end'>
                    <Button size="sm" variant='warning' onClick={() => toggleInvestmentsModal(false, investment)}><TbPencil /></Button>
                    <Button size="sm" variant='danger' onClick={() => removeFromInvestments(investment.id)}><TbTrash /></Button>
                </Stack>
            </Td>
        </Tr >

    )
}


