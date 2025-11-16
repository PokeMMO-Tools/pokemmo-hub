import React, { useEffect, useState, useMemo } from 'react'
import { Link } from 'gatsby'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { Stack } from 'react-bootstrap'
import { isMobile, isTablet } from 'react-device-detect'
import { Table as SrTable, Tbody as SrTbody, Th as SrTh, Thead as SrThead, Tr as SrTr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useMarket } from '../../context/MarketContext'
import { useTranslations } from '../../context/TranslationsContext'
import { Card, Table as DesktopTable, Typography, Button } from '../Atoms'
import { InvestmentItem } from './InvestmentItem'
import { InvestmentTotal } from './InvestmentTotal'
import { getItemName } from '../../utils/items'

export const InvestmentList = ({ i, title, fallbackIfEmpty, showTotals }) => {
    const { t, language } = useTranslations()
    const { investments: rawInvestments, allItems } = useMarket()

    const [investmentsGain, setInvestmentsGain] = useState([])
    const [totals, setTotals] = useState({})
    const [sortConfig, setSortConfig] = useState([])

    let investments = rawInvestments
    if (i) {
        investments = investments.filter(item => item.i === i)
    }

    const addInvestmentGain = (investmentId, gain, spent) => {
        setInvestmentsGain(prev => {
            const idx = prev.findIndex(x => x.investmentId === investmentId)
            if (idx === -1) return [...prev, { investmentId, gain, spent }]
            return prev.map((item, i) => (i === idx ? { investmentId, gain, spent } : item))
        })
    }

    const calculateTotal = () => {
        const { gain, spent, value } = investmentsGain.reduce(
            (prev, curr) => ({
                gain: prev.gain + curr.gain,
                spent: prev.spent + curr.spent,
                value: prev.spent + curr.spent + prev.gain + curr.gain
            }),
            { gain: 0, spent: 0, value: 0 }
        )
        const gainPercent = spent > 0 ? parseFloat((gain / spent) * 100).toFixed(2) : 0
        setTotals({ gain, gainPercent, spent, value })
    }

    useEffect(() => {
        if (investmentsGain.length !== investments.length) return
        calculateTotal()
    }, [investmentsGain, investments])

    const toggleSort = (key) => {
        setSortConfig(prev => {
            const existing = prev.length > 0 && prev[0].key === key ? prev[0] : null
            if (!existing) {
                // first click - asc
                return [{ key, direction: 'asc' }]
            }
            if (existing.direction === 'asc') {
                // second click - desc
                return [{ key, direction: 'desc' }]
            }
            // third click - clear
            return []
        })
    }

    const getSortArrow = (key) => {
        if (sortConfig.length === 0 || sortConfig[0].key !== key) return ''
        return sortConfig[0].direction === 'asc' ? '▲' : '▼'
    }

    const gainLookup = useMemo(() => {
        const map = {}
        investmentsGain.forEach(g => { map[g.investmentId] = g })
        return map
    }, [investmentsGain])

    const sortedInvestments = useMemo(() => {
        if (sortConfig.length === 0) return investments

        const getValue = (inv, key) => {
            const gain = gainLookup[inv.id] || { gain: 0, spent: 0 }
            switch (key) {
                case 'name': return getItemName(inv.i)[language] || ''
                case 'quantity': return inv.quantity
                case 'perUnit': return inv.boughtPrice
                case 'currentPrice': return inv.boughtPrice
                case 'spent': return gain.spent
                case 'value': return gain.spent + gain.gain
                case 'gain': return gain.gain
                case 'gainPercent': return gain.spent ? gain.gain / gain.spent : 0
                default: return ''
            }
        }

        return [...investments].sort((a, b) => {
            for (const rule of sortConfig) {
                let A = getValue(a, rule.key)
                let B = getValue(b, rule.key)

                if (typeof A === 'string') {
                    A = A.toLowerCase(); B = B.toLowerCase()
                }

                if (A < B) return rule.direction === 'asc' ? -1 : 1
                if (A > B) return rule.direction === 'asc' ? 1 : -1
            }
            return 0
        })
    }, [investments, sortConfig, gainLookup, language])

    const exportToExcel = () => {
        const headerRow = ['Name', 'Quantity', 'Per Unit', 'Total Spent', 'Total Value', 'Gain', 'Gain %']
        const dataRows = investments.map(inv => {
            const gain = gainLookup[inv.id] || { gain: 0, spent: 0 }
            const name = getItemName(inv.i)[language] || inv.name || 'Unknown'
            const quantity = inv.quantity || 0
            const perUnit = inv.boughtPrice || 0
            const spent = gain.spent || 0
            const totalValue = spent + (gain.gain || 0)
            return [name, quantity, perUnit, spent, totalValue, 0, 0]
        })

        const blankRow = ['', '', '', '', '', '', '']
        const totalsHeaderRow = ['PORTFOLIO SUMMARY', '', 'Total Spent', 'Total Value', 'Total Gain', 'Total Gain %', 'Net Worth']
        const totalsRow = ['Total', '', 0, 0, 0, 0, 0]

        const allRows = [totalsHeaderRow, totalsRow, blankRow, headerRow, ...dataRows]
        const ws = XLSX.utils.aoa_to_sheet(allRows)
        const firstDataRow = 5

        ws[XLSX.utils.encode_cell({ r: 1, c: 2 })] = { f: `SUM(D${firstDataRow}:D${firstDataRow + 1000})`, t: 'n' }
        ws[XLSX.utils.encode_cell({ r: 1, c: 3 })] = { f: `SUM(E${firstDataRow}:E${firstDataRow + 1000})`, t: 'n' }
        ws[XLSX.utils.encode_cell({ r: 1, c: 4 })] = { f: `D2-C2`, t: 'n' }
        ws[XLSX.utils.encode_cell({ r: 1, c: 5 })] = { f: `IFERROR(E2/C2,0)`, t: 'n' }
        ws[XLSX.utils.encode_cell({ r: 1, c: 6 })] = { f: `E2-C2`, t: 'n' }

        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Investments')
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
        saveAs(new Blob([excelBuffer]), 'investment-list.xlsx')
    }

    const Table = isMobile && !isTablet ? SrTable : DesktopTable
    const Thead = isMobile && !isTablet ? SrThead : 'thead'
    const Tbody = isMobile && !isTablet ? SrTbody : 'tbody'
    const Th = isMobile && !isTablet ? SrTh : 'td'
    const Tr = isMobile && !isTablet ? SrTr : 'tr'

    if (i && investments.length === 0 && !fallbackIfEmpty) {
        return null
    }

    return (
        investments.length ? (
            <Stack gap={2}>
                {showTotals && (
                    <>
                        <Stack direction="horizontal" className="justify-content-between">
                            <Typography className='mb-0'>Portfolio Totals</Typography>
                            <Button as={Link} to="/items" size="sm" variant='info'
                                style={{ backgroundColor: "#ffcb05", color: "black", borderColor: "#ffcb05" }}>
                                All Items
                            </Button>
                        </Stack>
                        <Card><InvestmentTotal totals={totals} /></Card>
                    </>
                )}

                <Stack direction="horizontal" className="justify-content-between">
                    <Typography className='mb-0'>Investment List</Typography>
                    <Button size="sm" variant="primary" onClick={exportToExcel}
                        style={{ backgroundColor: "#369102", color: "white", borderColor: "#369102" }}>
                        Download as Excel
                    </Button>
                </Stack>

                <Card>
                    {title || false}
                    <Table responsive withBaseStyles={{ breakpoint: "920px" }}>
                        <Thead>
                            <Tr>
                                <Th onClick={() => toggleSort('name')} style={{ cursor: 'pointer' }}>Name {getSortArrow('name')}</Th>
                                <Th onClick={() => toggleSort('currentPrice')} style={{ cursor: 'pointer' }}>{t('Price and Supply')} {getSortArrow('currentPrice')}</Th>
                                <Th onClick={() => toggleSort('quantity')} align="right" style={{ cursor: 'pointer' }}>{t('Quantity')} {getSortArrow('quantity')}</Th>
                                <Th onClick={() => toggleSort('perUnit')} align="right" style={{ cursor: 'pointer' }}>{t('Per Unit')} {getSortArrow('perUnit')}</Th>
                                <Th onClick={() => toggleSort('spent')} align="right" style={{ cursor: 'pointer' }}>{t('Total Spent')} {getSortArrow('spent')}</Th>
                                <Th onClick={() => toggleSort('value')} align="right" style={{ cursor: 'pointer' }}>{t('Total Value')} {getSortArrow('value')}</Th>
                                <Th onClick={() => toggleSort('gain')} align="right" style={{ cursor: 'pointer' }}>{t('Gain')} {getSortArrow('gain')}</Th>
                                <Th onClick={() => toggleSort('gainPercent')} align="right" style={{ cursor: 'pointer' }}>{t('Gain %')} {getSortArrow('gainPercent')}</Th>
                                <Th align="center">{t('Trend')}</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {sortedInvestments.map(investment => (
                                <InvestmentItem
                                    key={investment.id}
                                    onPriceUpdate={(id, g, s) => addInvestmentGain(id, g, s)}
                                    investment={investment}
                                />
                            ))}
                        </Tbody>
                    </Table>
                </Card>
            </Stack>
        ) : (
            <Card>
                <Stack direction="horizontal" className="flex-wrap justify-content-between">
                    <Typography className='mb-0'>No investments found. Start now by going to "All Items" and creating an investment.</Typography>
                    <Button as={Link} to="/items" size="sm" variant='info'
                        style={{ backgroundColor: "#ffcb05", color: "black", borderColor: "#ffcb05" }}>
                        All Items
                    </Button>
                </Stack>
            </Card>
        )
    )
}