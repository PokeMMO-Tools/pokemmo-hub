import React, { useEffect, useState } from 'react'
import { Stack } from 'react-bootstrap'
import { isMobile, isTablet } from 'react-device-detect'
import { Table as SrTable, Tbody as SrTbody, Th as SrTh, Thead as SrThead, Tr as SrTr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useMarket } from '../../context/MarketContext'
import { useTranslations } from '../../context/TranslationsContext'
import { Card, Table as DesktopTable, Typography } from '../Atoms'
import { InvestmentItem } from './InvestmentItem'
import { InvestmentTotal } from './InvestmentTotal'

export const InvestmentList = ({ i, title, fallbackIfEmpty, showTotals }) => {
    const { t } = useTranslations()
    const [investmentsGain, setInvestmentsGain] = useState([]);
    const [totals, setTotals] = useState({});
    let { investments } = useMarket()

    const addInvestmentGain = (investmentId, gain, spent) => {
        setInvestmentsGain(prev => {
            const index = prev.findIndex(item => item.investmentId === investmentId)
            if (!prev.length || index === -1)
                return [...prev, { investmentId, gain, spent }]

            return prev.map((item, i) => (
                i === index ? { investmentId, gain, spent } : item
            ))
        })
    }

    function calculateTotal() {
        const { gain, spent } = investmentsGain.reduce((prev, curr) => (
            {
                gain: prev.gain + curr.gain,
                spent: prev.spent + curr.spent
            }
        ), { gain: 0, spent: 0 })

        const gainPercent = parseFloat(gain / spent * 100).toFixed(2)
        setTotals({ gain, gainPercent, spent })
    }

    useEffect(() => {
        if (investmentsGain.length !== investments.length)
            return

        calculateTotal()

    }, [investmentsGain, investments])

    if (i) {
        investments = investments.filter((item) => item.i === i)
        if (investments.length === 0 && !fallbackIfEmpty)
            return false;
    }

    const Table = isMobile && !isTablet ? SrTable : DesktopTable
    const Thead = isMobile && !isTablet ? SrThead : 'thead'
    const Tbody = isMobile && !isTablet ? SrTbody : 'tbody'
    const Th = isMobile && !isTablet ? SrTh : 'td'
    const Tr = isMobile && !isTablet ? SrTr : 'tr'

    return (
        investments.length
            ? <Stack gap={2}>
                {showTotals ?
                    <Card>
                        <InvestmentTotal totals={totals} />
                    </Card>
                    :
                    <></>
                }

                <Card>
                    {title ? title : false}
                    <Table responsive={true} withBaseStyles={{ breakpoint: "920px" }}>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>{t('Price and Supply')}</Th>
                                <Th align="right">{t('Quantity')}</Th>
                                <Th align="right">{t('Per Unit')}</Th>
                                <Th align="right">{t('Total')}</Th>
                                <Th align="right">{t('Gain')}</Th>
                                <Th align="right">{t('Gain %')}</Th>
                                <Th align="right"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {
                                investments.map((investment) => (
                                    <InvestmentItem
                                        key={investment.id}
                                        onPriceUpdate={(id, gain, spent) => addInvestmentGain(id, gain, spent)}
                                        investment={investment}
                                    />
                                ))
                            }
                        </Tbody>
                    </Table>
                </Card>
            </Stack>

            : <Card>
                <Stack direction="horizontal" className="flex-wrap justify-content-between">
                    <Typography className='mb-0'>No investments found. Start now by going to "All Items" and creating an investment.</Typography>

                </Stack>
            </Card>
    )
}
