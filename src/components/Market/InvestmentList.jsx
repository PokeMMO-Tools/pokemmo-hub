import React, { useEffect, useState } from 'react'
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

export const InvestmentList = ({ i, title, fallbackIfEmpty, showTotals }) => {
    const { t, language } = useTranslations()
    const [investmentsGain, setInvestmentsGain] = useState([]);
    const [totals, setTotals] = useState({});
    let { investments, allItems } = useMarket()

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
        const { gain, spent, value } = investmentsGain.reduce((prev, curr) => (
            {
                gain: prev.gain + curr.gain,
                spent: prev.spent + curr.spent,
                value: (prev.gain + curr.gain) + (prev.spent + curr.spent)
            }
        ), { gain: 0, spent: 0, value: 0 })

        const gainPercent = parseFloat(gain / spent * 100).toFixed(2)
        setTotals({ gain, gainPercent, spent, value })
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

    //excel export
    const exportToExcel = () => {

        const headerRow = ['Name', 'Quantity', 'Per Unit', 'Total Cost', 'Current Value', 'Gain', 'Gain %'];
        const dataRows = investments.map(investment => {
            const { n } = allItems.find(({ i }) => i === investment.i) || { n: {} };
            const gainInfo = investmentsGain.find(item => item.investmentId === investment.id) || { gain: 0, spent: 0 };
            const name = n[language] || investment.name || 'Unknown';
            const quantity = investment.quantity || 0;
            const perUnit = investment.perUnit || (quantity > 0 ? gainInfo.spent / quantity : 0);
            const spent = gainInfo.spent || 0;
            const totalValue = spent + (gainInfo.gain || 0);

            return [name, quantity, perUnit, spent, totalValue, 0, 0];
        });
        const blankRow = ['', '', '', '', '', '', ''];
        const totalsHeaderRow = ['PORTFOLIO SUMMARY', '', 'Total Spent', 'Total Value', 'Total Gain', 'Total Gain %', 'Net Worth'];
        const totalsRow = ['Total', '', 0, 0, 0, 0, 0];
        const allRows = [
            totalsHeaderRow,
            totalsRow,
            blankRow,
            headerRow,
            ...dataRows
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(allRows);
        const firstDataRow = 5;
        const lastDataRow = firstDataRow + dataRows.length - 1;

        // Total Spent (column D)
        worksheet[XLSX.utils.encode_cell({ r: 1, c: 2 })] = {
            f: `SUM(D${firstDataRow}:D${firstDataRow + 1000})`,
            t: 'n',
            z: '$#,##0'
        };

        // Total Value (column E)
        worksheet[XLSX.utils.encode_cell({ r: 1, c: 3 })] = {
            f: `SUM(E${firstDataRow}:E${firstDataRow + 1000})`,
            t: 'n',
            z: '$#,##0'
        };

        // Gain (column F)
        worksheet[XLSX.utils.encode_cell({ r: 1, c: 4 })] = {
            f: `D2-C2`,
            t: 'n',
            z: '$#,##0'
        };

        // Gain % (column F)
        worksheet[XLSX.utils.encode_cell({ r: 1, c: 5 })] = {
            f: `E2/C2`,
            t: 'n',
            z: '0%'
        };

        // Net Worth (column G)
        worksheet[XLSX.utils.encode_cell({ r: 1, c: 6 })] = {
            f: `E2-C2`,
            t: 'n',
            z: '$#,##0'
        };

        for (let i = 0; i < dataRows.length; i++) {
            const rowIndex = firstDataRow - 1 + i;
            worksheet[XLSX.utils.encode_cell({ r: rowIndex, c: 5 })] = {
                f: `E${rowIndex + 1}-D${rowIndex + 1}`,
                t: 'n',
                z: '$#,##0'
            };

            worksheet[XLSX.utils.encode_cell({ r: rowIndex, c: 6 })] = {
                f: `F${rowIndex + 1}/D${rowIndex + 1}`,
                t: 'n',
                z: '0%'
            };
        }

        worksheet['!cols'] = [
            { wch: 20 }, // Name
            { wch: 10 }, // Quantity
            { wch: 10 }, // Per Unit
            { wch: 15 }, // Total Spent
            { wch: 15 }, // Total Value
            { wch: 15 }, // Gain
            { wch: 10 }  // Gain %
        ];
        for (let i = firstDataRow - 1; i < firstDataRow + dataRows.length - 1; i++) {
            // Format currency cells (Per Unit, Total Spent, Total Value)
            for (const C of [2, 3, 4]) {
                const cell_ref = XLSX.utils.encode_cell({ r: i, c: C });
                if (worksheet[cell_ref]) {
                    worksheet[cell_ref].z = '$#,##0'
                }
            }
        }

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Investments');

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const fileData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(fileData, 'investment-list.xlsx');
    };

    const Table = isMobile && !isTablet ? SrTable : DesktopTable
    const Thead = isMobile && !isTablet ? SrThead : 'thead'
    const Tbody = isMobile && !isTablet ? SrTbody : 'tbody'
    const Th = isMobile && !isTablet ? SrTh : 'td'
    const Tr = isMobile && !isTablet ? SrTr : 'tr'

    return (
        investments.length
            ? <Stack gap={2}>
                {showTotals ?
                    <>
                        <Stack direction="horizontal" className="justify-content-between">
                            <Typography className='mb-0'>Portfolio Totals</Typography>
                            <Button as={Link} to="/items" size="sm" variant='info' style={{ backgroundColor: "#ffcb05", color: "black", borderColor: "#ffcb05" }}>All Items</Button>
                        </Stack>
                        <Card>
                            <InvestmentTotal totals={totals} />
                        </Card>
                    </>
                    :
                    <></>
                }
                {/* Excel download button */}
                <Stack direction="horizontal" className="justify-content-between">
                    <Typography className='mb-0'>Investment List</Typography>
                    <Button size="sm" variant="primary" onClick={exportToExcel} style={{ backgroundColor: "#369102", color: "white", borderColor: "#369102" }}>
                        Download as Excel
                    </Button>
                </Stack>

                <Card>
                    {title ? title : false}
                    <Table responsive={true} withBaseStyles={{ breakpoint: "920px" }}>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>{t('Price and Supply')}</Th>
                                <Th align="right">{t('Quantity')}</Th>
                                <Th align="right">{t('Per Unit')}</Th>
                                <Th align="right">{t('Total Spent')}</Th>
                                <Th align="right">{t('Total Value')}</Th>
                                <Th align="right">{t('Gain')}</Th>
                                <Th align="right">{t('Gain %')}</Th>
                                <Th align="center">{t('Trend')}</Th>
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
            :
            <Card>
                <Stack direction="horizontal" className="flex-wrap justify-content-between">
                    <Typography className='mb-0'>No investments found. Start now by going to "All Items" and creating an investment.</Typography>
                </Stack>
            </Card>
    )
}