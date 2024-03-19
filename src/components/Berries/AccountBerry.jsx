import { Link } from 'gatsby'
import React from 'react'
import { Table, Tbody, Th, Thead, Tr } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { useBerries } from '../../context/BerryContext'
import { Button, Card, Typography } from '../Atoms'
import { BerryAccountItem } from './BerryAccountItem'
import { useTranslations } from '../../context/TranslationsContext'

export const AccountBerry = ({ className, style }) => {
    const { accountBerries } = useBerries()
    const { t } = useTranslations()
    if (!accountBerries) return;
    return (
        <div className={className} style={style}>
            <Card style={{ height: "100%" }}>
                {
                    !accountBerries.length
                        ? <>
                            <Typography as="h4">No berries planted. </Typography>
                            <Button as={Link} to="/tools/berries" variant='warning'>Start now</Button>
                        </>
                        : <>
                            <Typography as="h3">Your berries</Typography>
                            <Table responsive="true">
                                <Thead>
                                    <Tr>
                                        <Th>{t('Berry name')}</Th>
                                        <Th>{t('Status')}</Th>
                                        <Th>{t('Ready')}</Th>
                                        <Th>{t('Actions')}</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {accountBerries.map((plantedBerryInfo) => {
                                        return <BerryAccountItem key={plantedBerryInfo.id} {...plantedBerryInfo} />
                                    })}
                                </Tbody>
                            </Table>
                        </>
                }
            </Card>
        </div>
    )
}
