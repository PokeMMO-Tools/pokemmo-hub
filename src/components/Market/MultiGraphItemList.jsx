import React from 'react'
import { Link } from 'gatsby'
import { Stack } from 'react-bootstrap'
import { isMobile, isTablet } from 'react-device-detect'
import { Button, Table as DesktopTable, Typography } from '../../components/Atoms'
import { Table as SrTable, Tbody as SrTbody, Th as SrTh, Thead as SrThead, Td as SrTd, Tr as SrTr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { TbEye, TbEyeOff, TbTrash } from 'react-icons/tb'
import { useTranslations } from '../../context/TranslationsContext'
import { ItemImage } from '../../components/Items/ItemImage'
import { ItemPrices } from '../../components/Items/ItemPrices'

export const MultiGraphItemList = ({ items, removeItem, editItem }) => {
    const { t } = useTranslations()

    const Table = isMobile && !isTablet ? SrTable : DesktopTable;
    const Thead = isMobile && !isTablet ? SrThead : 'thead';
    const Tbody = isMobile && !isTablet ? SrTbody : 'tbody';
    const Th = isMobile && !isTablet ? SrTh : 'td';
    const Tr = isMobile && !isTablet ? SrTr : 'tr';
    const Td = isMobile ? SrTd : 'td';

    return (
        items.length
            ?
            <Table responsive={true} withBaseStyles={{ breakpoint: '920px' }} className='mt-2'>
                <Thead>
                    <Tr>
                        <Th>{ t('Name') }</Th>
                        <Th>{ t('Price and Supply') }</Th>
                        <Th align='right'></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        items.map((item) => (
                            <Tr key={item.apiId}>
                                <Td component='th' scope='row' className='d-flex align-items-start border-0'>
                                    <ItemImage className='me-1' category={item.category} id={item.id} />
                                    &nbsp;
                                    <Typography as={Link} to={`/items/${item.slug}`} style={{ color: 'var(--bs-info)' }}>{item.name}</Typography>
                                </Td>
                                <Td className='border-0'>
                                    <ItemPrices i={item.apiId} />
                                </Td>
                                <Td align='right' className='border-0'>
                                    <Stack direction='horizontal' gap={1} className='justify-content-end'>
                                        <Button size='md' variant='info' onClick={() => editItem(item.apiId, { hidden: !item.hidden })}>
                                            {
                                                item.hidden
                                                ? <TbEyeOff />
                                                : <TbEye />
                                            }
                                        </Button>
                                        <Button size='md' variant='danger' onClick={() => removeItem(item.apiId)}><TbTrash /></Button>
                                    </Stack>
                                </Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
            :
            <Typography className='mt-2'>No items have been selected yet.</Typography>
    )
}
