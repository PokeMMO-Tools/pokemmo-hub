import { Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import { Placeholder, Stack } from 'react-bootstrap'
import { isMobile } from 'react-device-detect'
import { TbPencil, TbTrash } from 'react-icons/tb'
import { Td as SrTd, Tr as SrTr } from 'react-super-responsive-table'
import { useMarket } from '../../context/MarketContext'
import { useTranslations } from '../../context/TranslationsContext'
import { prices } from '../../utils/prices'
import { getItemName } from '../../utils/items';
import { Button, Typography } from '../Atoms'
import { ItemImage } from '../Items/ItemImage'
import { ItemPrices } from '../Items/ItemPrices'
import { useQuery } from 'react-query'
import { SparklineGraph } from '../Atoms/SparklineGraph';

export const InvestmentItem = ({ investment, onPriceUpdate }) => {
    const { language } = useTranslations()
    const [currentPrice, setCurrentPrice] = useState({
        min: 0,
        change: 0,
        isLoading: true
    })

    const { data: pricesInvestment } = useQuery(
        ["prices", investment.i],
        () => prices.getItemConstraint(investment.i, 180),
        { staleTime: 180000 }
    )

    const { toggleInvestmentsModal, removeFromInvestments, allItems } = useMarket()
    const item = allItems.find(({ item_id }) => item_id === investment.i) || {}
    const {
        n = {
            "en": "1,000RP Reward Point Voucher",
            "cn": "1,000RP奖励点券(Reward Point Voucher)",
            "de": "1.000RP Prämienpunkte-Gutschein",
            "fr": "1.000RP Bon Point Récompense (RP)",
            "it": "Buono da 1,000 Punti Premio",
            "es": "1.000 PP Vale de Puntos de Premio",
            "ja": "1,000RP Reward Point Voucher",
            "tw": "1,000RP獎勵點券(Reward Point Voucher)"
        },
        _id = 275,
        slug = "1000rp-reward-point-voucher",
        category = 0
    } = item
    const sellTotal = currentPrice.min * investment.quantity    //prices.calculateSellGain(currentPrice.min) for listing fee deduction
    const boughtTotal = investment.boughtPrice * investment.quantity
    const boughtWorth = investment.quantity * currentPrice.min
    const gainTotal = sellTotal - boughtTotal
    const gainPercent = boughtTotal > 0 ? (gainTotal / boughtTotal * 100) : null

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
                <Typography as={Link} to={`/items/${slug}`} style={{ color: 'var(--bs-info)' }}>{getItemName(investment.i)[language]}</Typography>
            </Td>
            <Td align="right" className=' border-0'>
                <ItemPrices onPriceUpdate={setCurrentPrice} i={investment.i} noDiff={true} />
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
                    : (
                        gainPercent !== null
                            ? <span className={`mb-0 ${gainPercent > 0 ? 'text-success' : 'text-danger'}`}>
                                {prices.format(parseFloat(gainPercent.toFixed(1))) + "%"}
                            </span>
                            : <span className="text-muted">Error</span>
                    )
            }</Td>
            <Td align="right" className='border-0 w-5'>
                <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', width: '100%' }} className="w-100 mb-0">
                    <SparklineGraph data={pricesInvestment ? pricesInvestment : []} width={115} height={30} link={slug} fadein={true} />
                </div>
            </Td>

            <Td align="right" className=' border-0'>
                <Stack direction='horizontal' gap={1} className='justify-content-end'>
                    <Button size="sm" variant='warning' onClick={() => toggleInvestmentsModal(false, investment)}><TbPencil /></Button>
                    <Button size="sm" variant='danger' onClick={() => removeFromInvestments(investment.id)}><TbTrash /></Button>
                </Stack>
            </Td>
        </Tr >

    )
}
