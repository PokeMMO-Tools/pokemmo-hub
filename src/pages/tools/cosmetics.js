import React, { useState } from 'react'
import { Button } from '../../components/Atoms'
import { AvatarList } from '../../components/Cosmetics/AvatarList'
import { CosmeticsFilter } from '../../components/Cosmetics/CosmeticsFilter'
import { Page } from '../../components/Page'
import { PageTitle } from '../../components/PageTitle'
import { Seo } from '../../components/SEO'
import { useTranslations } from '../../context/TranslationsContext'
import { DEFAULT_CLOTHES, getCosmeticSetupImage, getItemInfo } from '../../utils/items'

import cosmetics from '../../data/pokemmo/item-cosmetic.json'

// const { language } = useTranslations() 

const cosmeticsArrays = cosmetics
    .map(item => {
        const { en_name, name } = getItemInfo(item.item_id)
        return { ...item, en_name, ch_name: name, value: item.item_id, label: en_name /* language !== 'cn' ? en_name : name */ }
    })
    .sort((a, b) => {
        return a.en_name.toLowerCase() < b.en_name.toLowerCase() ? -1 : 1
    })
    .reduce((prev, curr) => {
        return {
            ...prev,
            [curr.slot]: (prev[curr.slot] || []).concat(curr)
        }
    }, {});

const Cosmetics = ({ pageContext }) => {
    const [clothes, setClothes] = useState(DEFAULT_CLOTHES)
    const [follower, setFollower] = useState('');
    const [shiny, setShiny] = useState('');
    const pgImages = getCosmeticSetupImage(clothes)
    const { t } = useTranslations();

    const PAGE_TITLE = "Cosmetics Helper"

    const changeClothes = (slot, value) => {
        if (slot === 'shiny')
            return setShiny(value)

        if (slot === 'follower')
            return setFollower(value)

        setClothes(prev => ({ ...prev, [slot]: value }))
    }

    const randomizeCharacter = () => {
        let randomClothes = {};
        Object.keys(cosmeticsArrays)
            .forEach(slot => {
                randomClothes[slot] = cosmeticsArrays[slot][Math.floor(Math.random() * cosmeticsArrays[slot].length)].item_id
            })
        setClothes(randomClothes)
    }

    const clearCharacter = () => setClothes(DEFAULT_CLOTHES);

    return (
        <Page breadcrumbs={pageContext.breadcrumb} label={PAGE_TITLE}>
            <PageTitle credits="Last updated during 2025 Lunar Event">{PAGE_TITLE}</PageTitle>
            <div className='d-flex flex-column align-items-start' style={{ gap: '3rem' }}>
                <div className='d-flex flex-column align-items-start order-2 order-sm-1'>
                    <CosmeticsFilter selectedClothes={clothes} onCosmeticSelect={changeClothes} cosmeticsArrays={cosmeticsArrays} />
                    <div className='d-flex' style={{ gap: '1rem' }}>
                        <Button className='mt-3' size="sm" variant="warning" onClick={randomizeCharacter}>{t("Randomize your character")}</Button>
                        <Button className='mt-3' size="sm" variant="danger" onClick={clearCharacter}>{t("Clear character")}</Button>
                    </div>
                </div>
                <div className='order-1 order-sm-2'>
                    <AvatarList images={pgImages} follower={follower} isShiny={shiny}></AvatarList>
                </div>
            </div>
        </Page>
    )
}
export default Cosmetics

const description = "A list of the cosmetics in PokeMMO. Here you can find all the cosmetics in PokeMMO and try them all. You can also match cosmetics with your preferred Pokemon"
export const Head = () => <Seo title="Cosmetics Compendium" description={description}></Seo>
