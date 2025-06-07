import { Link } from 'gatsby'
import React from 'react'
import { Stack } from 'react-bootstrap'
import { useDarkMode } from '../../context/DarkModeContext'
import { Typography, Badge } from '../Atoms'
import { MarketItemActions } from '../Market/MarketItemActions'
import { ItemImage } from './ItemImage'
import { ItemPrices } from './ItemPrices'
import { useTranslations, t } from '../../context/TranslationsContext';
import { prices as PricesApi } from '../../utils/prices'
import { useQuery } from 'react-query'
import { SparklineGraph } from '../Atoms/SparklineGraph';
import { InterfaceItems } from '../../interface/items';
import cosmeticInfo from '../../data/pokemmo/item-cosmetic';


export const ItemRow = ({ item }) => {
    const { n, i, _id, d, category, slug, p, q } = item
    const { isDark } = useDarkMode()
    const { language, t } = useTranslations();

    const categoryTable = [
        { key: "items", label: t("Item"), values: [1, 2, 3] },
        { key: "cosmetics", label: t("Cosmetic"), values: [6] },
        { key: "event_bags", label: t("Event Bag"), values: [4] },
        { key: "particles", label: t("Particle"), values: [5] },
    ];

    const getCategoryLabel = (category) => {
        const foundCategory = categoryTable.find(cat => cat.values.includes(category));
        return foundCategory ? foundCategory.label : "Item";
    };

    const itemInfo = cosmeticInfo.find(cosmetic => cosmetic.item_id === _id)

    const { data: prices } = useQuery(
        ["prices", i],
        () => PricesApi.getItemConstraint(i, 180),
        { staleTime: 180000 }
    )

    return (
        <Stack gap={1}>
            <Stack direction="horizontal" className="justify-content-between flex-wrap" gap={1}>
                <div className="d-flex align-items-center gap-2">
                    <Link to={slug} className={`d-flex ${isDark ? 'text-info' : ''}`} style={{ gap: '.35rem' }}>
                        <ItemImage id={_id} category={category} />
                        <Typography as="h2" className="fs-6 mb-0" style={{ color: 'inherit' }}>
                            {n[language]}
                        </Typography>
                    </Link>
                    <div className="d-flex gap-2">
                        {itemInfo ? (
                            <div className="d-flex gap-2 flex-wrap">
                                <Badge text="dark" bg="info" className="fs-8 fw-normal">
                                    {getCategoryLabel(category)}
                                </Badge>
                                {itemInfo.limitation !== 0 && (
                                    <Badge text="dark" bg="info" className="fs-8 fw-normal">
                                        {InterfaceItems.limitations[itemInfo.limitation]}
                                    </Badge>
                                )}
                                {itemInfo.festival !== 0 && itemInfo.year !== 0 && (
                                    <Badge text="dark" bg="info" className="fs-8 fw-normal">
                                        {InterfaceItems.festival[itemInfo.festival]}
                                        {` ${itemInfo.year}`}
                                    </Badge>
                                )}
                            </div>
                        ) : (
                            <Badge text="dark" bg="info" className="fs-8 fw-normal">
                                {getCategoryLabel(category)}
                            </Badge>
                        )}
                    </div>
                </div>
                <ItemPrices i={i} p={p} q={q} />
            </Stack>

            <div className="d-flex justify-content-between">
                <Stack gap={1} style={{ flex: 1 }}>
                    <Typography as="small" className="text-muted">{d[language]}</Typography>
                    <MarketItemActions id={i} className="d-flex" style={{ gap: ".4rem" }} />
                </Stack>
                <div style={{ display: 'flex', alignItems: 'stretch', width: "40%" }}>
                    <SparklineGraph data={prices ? prices : []} width={"100%"} height={"100%"} link={slug} fadein={true} />
                </div>
            </div>
        </Stack>
    );

}
