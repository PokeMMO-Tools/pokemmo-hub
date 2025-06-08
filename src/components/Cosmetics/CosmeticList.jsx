import React, { memo, useCallback, useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useMarket } from '../../context/MarketContext';
import { useTranslations } from '../../context/TranslationsContext';
import { InterfaceItems } from '../../interface/items';
import { getApiID, getItemName } from '../../utils/items';
import { Search, Typography } from '../Atoms';
import { ItemImage } from '../Items/ItemImage';
import { SwatchColorPicker } from './SwatchColorPicker';
import { VariationPicker } from './VariationPicker';

export const CosmeticList = memo(({ selectedClothes, onCosmeticSelect, slotId, cosmeticsArrays }) => {
    const { language } = useTranslations();
    const { allItems } = useMarket();

    const [variationId, setVariationId] = useState(0)

    const getCosmeticInfo = useCallback((cosmeticId) => {
        return cosmeticsArrays[slotId].find(({ item_id }) => parseInt(item_id) === parseInt(cosmeticId))
    }, [slotId]);

    const [clothes, setClothes] = useState(getCosmeticInfo(selectedClothes));

    useEffect(() => {
        if (!selectedClothes) return setClothes(false)
        setClothes(getCosmeticInfo(selectedClothes))
    }, [selectedClothes, getCosmeticInfo])

    const getSlotName = (slotId) => InterfaceItems.slot[slotId]

    const updateClothes = (cosmeticId) => {
        onCosmeticSelect(slotId, cosmeticId)
        const cosmeticInfo = getCosmeticInfo(cosmeticId)
        setClothes(cosmeticInfo);
    }

    const updateClothesColor = (color_id) => {
        onCosmeticSelect(slotId, `${clothes.item_id}d${color_id}`)
    }

    const updateClothesVariation = () => {
        setVariationId(prev => prev === 0 ? 1 : 0);
    }

    useEffect(() => {
        if (!clothes)
            return;

        onCosmeticSelect(slotId, `${clothes.item_id}s${variationId}`)
    }, [variationId])

    return (

        <div style={{ flex: '1 1 0' }}>
            <Typography as="p" className='text-muted mb-0' style={{ fontSize: '.8rem', textTransform: "capitalize" }}>{getSlotName(slotId)}</Typography>
            <div className='d-flex' style={{ gap: '0.3rem' }}>
                <Search
                    hasEmpty={true}
                    items={

                        cosmeticsArrays[slotId]
                            .map(({ item_id, en_name, ch_name }) => {
                                const itemAPI = allItems.find(({ item_id }) => item_id === parseInt(getApiID(item_id)))
                                return (
                                    itemAPI == undefined ?
                                        {
                                            value: [item_id, language !== 'cn' && language !== 'tw' ? en_name : ch_name], //only way i found to get search working. objects in label dont work
                                            label: <Stack direction='horizontal'><ItemImage className="me-1" category={6} id={item_id} />{language !== 'cn' && language !== 'tw' ? en_name : ch_name}</Stack>
                                        }
                                        :
                                        {
                                            value: [item_id, language !== 'cn' && language !== 'tw' ? getItemName(itemAPI.item_id)[language] : ch_name], //only way i found to get search working. objects in label dont work
                                            label: <Stack direction='horizontal'><ItemImage className="me-1" category={6} id={item_id} />{language !== 'cn' && language !== 'tw' ? getItemName(itemAPI.item_id)[language] : ch_name}</Stack>
                                        }
                                )
                            })
                    }
                    onChange={({ value }) => updateClothes(value[0])}
                    value={clothes}
                ></Search>
                {
                    clothes && (clothes.attribute === 8 || clothes.attribute === 24 || clothes.attribute === 9)
                        ? <SwatchColorPicker onUpdateClothesColor={updateClothesColor} />
                        : null
                }
                {
                    clothes && clothes.attribute === 54
                        ? <VariationPicker onUpdateVariation={updateClothesVariation} />
                        : null
                }
            </div>

        </div>
    )
}, (prevProps, nextProps) => prevProps.selectedClothes === nextProps.selectedClothes)