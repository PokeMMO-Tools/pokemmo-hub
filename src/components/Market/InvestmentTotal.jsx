import React from 'react'
import { Placeholder } from 'react-bootstrap'
import { isMobile, isTablet } from 'react-device-detect'
import { Table as SrTable, Tbody as SrTbody, Td as SrTd, Th as SrTh, Thead as SrThead, Tr as SrTr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { prices } from '../../utils/prices'
import { Table as DesktopTable } from '../Atoms'
import { useTranslations } from '../../context/TranslationsContext'

export const InvestmentTotal = ({ totals }) => {
    const { t } = useTranslations()

    const Table = isMobile && !isTablet ? SrTable : DesktopTable
    const Thead = isMobile && !isTablet ? SrThead : 'thead'
    const Tbody = isMobile && !isTablet ? SrTbody : 'tbody'
    const Th = isMobile && !isTablet ? SrTh : 'td'
    const Tr = isMobile && !isTablet ? SrTr : 'tr'
    const Td = isMobile ? SrTd : 'td'

    return (

        <Table>
            <Thead>
                <Tr>
                    <Th align="center">{t('Total Spent')}</Th>
                    <Th align="center">{t('Total Gain')}</Th>
                    <Th align="center">{t('Total Gain %')}</Th>
                    <Th align="center">{t('Net Worth')}</Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                    totals.gain
                        ? <Tr>
                            <Td align="center">{prices.format(totals.spent)}</Td>
                            <Td align="center">
                                <span className={`mb-0 ${totals.gain > 0 ? 'text-success' : 'text-danger'}`}>
                                    {prices.format(totals.gain)}
                                </span>
                            </Td>
                            <Td align="center">
                                <span className={`mb-0 ${totals.gainPercent > 0 ? 'text-success' : 'text-danger'}`}>
                                    {totals.gainPercent + "%"}
                                </span>
                            </Td>
                            <Td align="center">
                                <span className={`mb-0 ${totals.gainPercent > 0 ? 'text-success' : 'text-danger'}`}>
                                    {prices.format(totals.spent + totals.gain)}
                                </span>
                            </Td>
                        </Tr>
                        : <Tr>
                            <Td align="center">
                                <Placeholder as="p" animation='glow' className="w-100 mb-0">
                                    <Placeholder xs={12}></Placeholder>
                                </Placeholder>
                            </Td>
                            <Td align="center">
                                <Placeholder as="p" animation='glow' className="w-100 mb-0">
                                    <Placeholder xs={12}></Placeholder>
                                </Placeholder>
                            </Td>
                            <Td align="center">
                                <Placeholder as="p" animation='glow' className="w-100 mb-0">
                                    <Placeholder xs={12}></Placeholder>
                                </Placeholder>
                            </Td>
                            <Td align="center">
                                <Placeholder as="p" animation='glow' className="w-100 mb-0">
                                    <Placeholder xs={12}></Placeholder>
                                </Placeholder>
                            </Td>
                        </Tr>
                }
            </Tbody>
        </Table>
    )
}
