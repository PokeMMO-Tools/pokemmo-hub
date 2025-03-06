import { Link } from 'gatsby'
import React from 'react'
import { Image } from 'react-bootstrap'
import { ItemsIcon, MarketIcon, TradeAdIcon, MultiIcon, AllItemsIcon } from '../../assets/icons'
import { useTranslations } from '../../context/TranslationsContext'
import { Badge, Button } from '../Atoms'
import { useDarkMode } from '../../context/DarkModeContext'
import './module.css'

const TOOLS = [
    {
        label: "All Items",
        url: '/items',
        icon: AllItemsIcon,
        description: 'View, browse, and search all in-game items, displaying their price history and item information.'
    },
    {
        label: "GTL Investments",
        url: '/market/investments',
        icon: MarketIcon,
        description: 'Track your investments here. View analytics, such as net worth and investment performance.'
    },
    {
        label: "Trade Ads",
        url: '/market/trade-ads',
        icon: TradeAdIcon,
        description: 'Post your trade ad, or view other players\' trade deals. Contact them in-game to discuss the deals.'
    },
    {
        label: 'Multi Graph',
        url: '/market/multigraph',
        icon: MultiIcon,
        description: 'Overlays mutliple item graphs. Analyse market trends of multiple items at once.',
        highlight: false
    },
]



export const ToolsMarket = () => {
    const { t } = useTranslations();
    const { isDark } = useDarkMode()

    return (
        <div className={`container-lg ${isDark ? 'dark-mode' : ''} d-flex justify-content-center`}>
            <div className="row g-2 justify-content-center">
                {TOOLS.map(({ label, url, icon, description }) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={label}>
                        <Link to={url} className={`tool-card ${isDark ? 'dark-mode' : ''}`}>
                            <div className="tool-card-header">
                                <Image src={icon} className="tool-icon" />
                                <h5 className="tool-title">{t(label)}</h5>
                            </div>
                            <div className="tool-card-body">
                                <p>{t(description)}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

