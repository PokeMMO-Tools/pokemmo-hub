import { Link } from 'gatsby'
import React from 'react'
import { Stack } from 'react-bootstrap'
import { useDarkMode } from '../../context/DarkModeContext'
import { Typography } from '../Atoms'
import { MarketItemActions } from '../Market/MarketItemActions'
import { ItemImage } from './ItemImage'
import { ItemPrices } from './ItemPrices'
import { useTranslations } from '../../context/TranslationsContext';
import { prices as PricesApi } from '../../utils/prices'
import { useQuery } from 'react-query'
import { SparklineGraph } from '../Atoms/SparklineGraph';


export const ItemRow = ({ item }) => {
    const { n, i, _id, d, category, slug, p, q } = item
    const { isDark } = useDarkMode()
    const { language } = useTranslations();

    const { data: prices } = useQuery(
        ["prices", i],
        () => PricesApi.getItemConstraint(i, 180),
        { staleTime: 180000 }
    )

    return (
        <Stack gap={1}>
            <Stack direction="horizontal" className="justify-content-between flex-wrap" gap={1}>
                <Link to={slug} className={`d-flex ${isDark ? 'text-info' : ''}`} style={{ gap: '.35rem' }}>
                    <ItemImage id={_id} category={category} />
                    <Typography as="h2" className="fs-6 mb-0" style={{ color: 'inherit' }}>
                        {n[language]}
                    </Typography>
                </Link>
                <ItemPrices i={i} p={p} q={q} />
            </Stack>
            <div className="d-flex justify-content-between">
                <Stack gap={1} style={{ flex: 1 }}>
                    <Typography as="small" className="text-muted">{d[language]}</Typography>
                    <MarketItemActions id={i} className="d-flex" style={{ gap: ".4rem" }} />
                </Stack>
                <div style={{ display: 'flex', alignItems: 'stretch', width: "40%" }}>
                    <SparklineGraph data={prices ? prices : []} width={"100%"} height={"100%"} link={slug} />
                </div>
            </div>
        </Stack>
    );

}
