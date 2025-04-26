import { Link } from 'gatsby'
import React, { useEffect } from 'react'
import { Image } from 'react-bootstrap'
import { ItemsIcon, MarketIcon, TradeAdIcon, MultiIcon, AllItemsIcon, HeartIcon } from '../../assets/icons'
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
        label: "Wishlist",
        url: '/market/wishlist',
        icon: HeartIcon,
        description: 'Keep track of items you are interested in by adding them to your wishlist!'
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

    useEffect(() => {
        const toolElements = document.querySelectorAll('.tool-card');
        toolElements.forEach((tool, index) => {
            tool.style.animationDelay = `${index * 0.1}s`;
            tool.classList.add('fade-in');
        });
    }, []);

    return (
        <div className={`container-lg ${isDark ? "dark-mode" : ""} d-flex justify-content-center`}>
            <div className="row g-2">
                {TOOLS.map(({ label, url, icon, description }, index) => (
                    <div
                        className={`col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center`}
                        key={label}
                    >
                        <Link to={url} className={`tool-card ${isDark ? "dark-mode" : ""}`}>
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