import React from 'react'
import { Card, Table, Typography } from '../Atoms'
import { useTranslations } from '../../context/TranslationsContext'


export const EVsInfo = () => {
    const { t } = useTranslations()
    return (
        <Card>
            <Typography as="h5">Best EV Spots</Typography>
            <Table size='sm' striped="columns" responsive>
                <thead>
                    <tr>
                        <th></th>
                        <th>{t('Kanto')}</th>
                        <th>{t('Hoenn')}</th>
                        <th>{t('Sinnoh')}</th>
                        <th>{t('Unova')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>HP</td>
                        <td>{t('Nidorina')}, {t('Route 14')}</td>
                        <td>{t('Hariyama')}, {t('Victory Road')}</td>
                        <td>{t('Sealeo')}, {t('Route 230')}</td>
                        <td>{t('Amoonguss')}, {t('Route 10')}</td>
                    </tr>
                    <tr>
                        <td>{t('ATK')}</td>
                        <td>{t('Nidorino')}, {t('Route 15')}</td>
                        <td>{t('Mightyena')}, {t('Route 120')}</td>
                        <td>{t('Machoke')}, {t('Route 211')} (east)</td>
                        <td>{t('Bouffalant')}, {t('Route 10')}</td>
                    </tr>
                    <tr>
                        <td>{t('DEF')}</td>
                        <td>{t('Slowbro')}, {t('Cape Brink')} (grass)</td>
                        <td>{t('Torkoal')}, {t('Magma Hideout')}</td>
                        <td>{t('Pelipper')}, {t('Route 222')}</td>
                        <td>{t('Pelipper')},{t('Undella Bay')} </td>
                    </tr>
                    <tr>
                        <td>{t('SP. ATK')}</td>
                        <td>{t('Golduck')}, {t('Cape Brink')} (surf)</td>
                        <td>{t('Gloom')}, {t('Route 119')}</td>
                        <td>{t('Golduck')}, {t('Resort Area')}</td>
                        <td>{t('Golduck')}, {t('Route 11')}</td>
                    </tr>
                    <tr>
                        <td>{t('SP. DEF')}</td>
                        <td>{t('Tentacruel')}, {t('Trainer Tower')}, {t('Isle 7')} (surf)</td>
                        <td>{t('Tentacruel')}, {t('Battle Frontier')}</td>
                        <td>{t('Tentacruel')}, {t('Pokemon League')}</td>
                        <td>{t('Mantine')}, {t('Undella Town')}</td>
                    </tr>
                    <tr>
                        <td>{t('SPEED')}</td>
                        <td>{t('Pidgeotto')}, {t('Five Isle Meadow')}</td>
                        <td>{t('Linoone')}, {t('Route 121')}</td>
                        <td>{t('Raticate')}/{t('Fearow')}, {t('Route 225')}</td>
                        <td>{t('Rapidash')}, {t('Route 12')}</td>
                    </tr>
                </tbody>
            </Table>
            <Typography as="h5"> </Typography>
            <Typography as="h5">EV Berries</Typography>
            <Typography className='text-muted'>They lower the EVs of a specific stats by 10.</Typography>
            <div>
                <Typography className='mb-0 fw-bold' translate={false}>{t('HP')}: <Typography as="span" className='fw-normal'>Pomeg Berry</Typography></Typography>
                <Typography className='mb-0 fw-bold' translate={false}>{t('ATK')}: <Typography as="span" className='fw-normal'>Kelpsy Berry</Typography></Typography>
                <Typography className='mb-0 fw-bold' translate={false}>{t('DEF')}: <Typography as="span" className='fw-normal'>Qualot Berry</Typography></Typography>
                <Typography className='mb-0 fw-bold' translate={false}>{t('SP. ATK')}: <Typography as="span" className='fw-normal'>Hondew Berry</Typography></Typography>
                <Typography className='mb-0 fw-bold' translate={false}>{t('SP. DEF')}: <Typography as="span" className='fw-normal'>Grepa Berry</Typography></Typography>
                <Typography className='mb-0 fw-bold' translate={false}>{t('SPEED')}: <Typography as="span" className='fw-normal'>Tamato Berry</Typography></Typography>
            </div>
        </Card>
    )
}