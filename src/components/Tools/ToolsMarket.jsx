import { Link } from 'gatsby'
import React from 'react'
import { Image } from 'react-bootstrap'
import { ItemsIcon, MarketIcon, TradeAdIcon } from '../../assets/icons'
import { useTranslations } from '../../context/TranslationsContext'
import { Badge, Button } from '../Atoms'

const TOOLS = [

    {
        label: "All Items",
        url: '/items',
        icon: ItemsIcon,
    },
    {
        label: "GTL Investments",
        url: '/market/investments',
        icon: MarketIcon,
    },
    {
        label: "Trade Ads",
        url: '/market/trade-ads',
        icon: TradeAdIcon,
    },
    {
        label: 'Multi Graph',
        url: '/market/multigraph',
        icon: '/sprites/051.png',
        highlight: true
    },
]

export const ToolsMarket = () => {
    const { t } = useTranslations();
    return (
        <div className="d-flex  flex-wrap" style={{ gap: '1rem' }}>
            {
                TOOLS.map(({ label, url, icon, highlight }) => {
                    return (
                        <>
                            {
                                label == "Trade Ads" ?
                                    <Button variant={highlight ? 'info' : 'primary'} key={label} as={Link} to={url} className="d-inline-flex align-items-center" style={{ gap: '.3rem' }}>
                                        <Image style={{ height: '1.5em', width: '2em' }} src={icon} />
                                        {t(label)}
                                        {highlight ? <Badge className="ms-1" style={{ fontSize: '.6rem', color: 'black' }} bg="warning" pill>NEW</Badge> : false}
                                    </Button>
                                    :
                                    <Button variant={highlight ? 'info' : 'primary'} key={label} as={Link} to={url} className="d-inline-flex align-items-center" style={{ gap: '.3rem' }}>
                                        <Image style={{ height: '1.5em', width: '1.5em' }} src={icon} />
                                        {t(label)}
                                        {highlight ? <Badge className="ms-1" style={{ fontSize: '.6rem', color: 'black' }} bg="warning" pill>NEW</Badge> : false}
                                    </Button>
                            }
                        </>


                    )
                })
            }
        </div>
    )
}

