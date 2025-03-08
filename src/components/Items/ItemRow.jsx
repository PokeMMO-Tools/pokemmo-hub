import { Link } from 'gatsby'
import React from 'react'
import { Stack } from 'react-bootstrap'
import { useDarkMode } from '../../context/DarkModeContext'
import { Typography } from '../Atoms'
import { MarketItemActions } from '../Market/MarketItemActions'
import { ItemImage } from './ItemImage'
import { ItemPrices } from './ItemPrices'
import { useTranslations } from '../../context/TranslationsContext';

export const ItemRow = ({ item }) => {
    const { n, i, _id, d, category, slug, p, q } = item
    const { isDark } = useDarkMode()
    const { language } = useTranslations();

    return (
        <Stack gap={1}>
            <Stack direction="horizontal" className="justify-content-between flex-wrap" gap={1}>
                <Link to={slug} className={`d-flex ${isDark ? 'text-info' : false}`} style={{ gap: '.35rem' }}>
                    <ItemImage id={_id} category={category}></ItemImage>
                    <Typography as="h2" className='fs-6 mb-0' style={{ color: 'inherit' }}>{n[language]}</Typography>
                </Link>
                <ItemPrices i={i} p={p} q={q} />
            </Stack>
            <Typography as="small" className='text-muted'>
                {d[language]}
            </Typography>
            <MarketItemActions id={i} className='mb-1 mt-2 d-flex' style={{ gap: '.4rem' }} />
        </Stack>
    )
}
