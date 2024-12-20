import { Link } from 'gatsby'
import React from 'react'
import { Image } from 'react-bootstrap'
import { ArchetypeIcon, BerryIcon, CosmeticsIcon, EggIcon, EggMovesIcon, PokedexIcon } from '../../assets/icons'
import { useTranslations } from '../../context/TranslationsContext'
import { Badge, Button } from '../Atoms'

const TOOLS = [
    {
        label: 'Cosmetics Helper',
        url: '/tools/cosmetics/',
        icon: CosmeticsIcon
    },
    {
        label: 'Egg Moves Calculator',
        url: '/tools/egg-moves-calculator/',
        icon: EggMovesIcon
    },
    {
        label: 'Pokedex',
        url: '/tools/pokedex/',
        icon: PokedexIcon
    },
    {
        label: 'Breeding Simulator',
        url: '/tools/breeding/',
        icon: EggIcon
    },
    {
        label: 'Berries Helper',
        url: '/tools/berries/',
        icon: BerryIcon
    },
    {
        label: 'Archetype Counter',
        url: '/tools/archetype-counter/',
        icon: ArchetypeIcon,
    }
]

export const ToolsListing = () => {
    const { t } = useTranslations();
    return (
        <div className="d-flex  flex-wrap" style={{ gap: '1rem' }}>
            {
                TOOLS.map(({ label, url, icon, highlight }) => {
                    if (icon == undefined) {
                        return (
                            <Button variant={highlight ? 'info' : 'primary'} key={label} as={Link} to={url} className="d-inline-flex align-items-center" style={{ gap: '.3rem' }}>
                                {t(label)}
                                {highlight ? <Badge className="ms-1" style={{ fontSize: '.6rem', color: 'black' }} bg="warning" pill>NEW</Badge> : false}
                            </Button>
                        )
                    } else {
                        return (
                            <Button variant={highlight ? 'info' : 'primary'} key={label} as={Link} to={url} className="d-inline-flex align-items-center" style={{ gap: '.3rem' }}>
                                <Image style={{ height: '1.5em', width: '1.5em' }} src={icon} />
                                {t(label)}
                                {highlight ? <Badge className="ms-1" style={{ fontSize: '.6rem', color: 'black' }} bg="warning" pill>NEW</Badge> : false}
                            </Button>
                        )
                    }
                })
            }
        </div>
    )
}

