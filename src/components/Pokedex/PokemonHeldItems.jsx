import React from 'react'
import { Image, Stack } from 'react-bootstrap'

import { Link } from 'gatsby'
import { useMarket } from '../../context/MarketContext'
import { useTranslations } from '../../context/TranslationsContext'
import { slugify } from '../../utils/slugify'
import { Button } from '../Atoms'

export const PokemonHeldItems = ({ heldItems }) => {
    const { language } = useTranslations()
    const { allItems } = useMarket();
    const items = heldItems.map(({ id }) => {
        return allItems.find(({ i }) => i === id)
    })

    return (
        items.length
            ? <Stack direction='horizontal' gap={2} className="mt-1">
                {
                    items.map((item) => {
                        if (typeof item === 'undefined')
                            return null;

                        const { n, _id } = item;
                        return (
                            <Button as={Link} to={`/items/${slugify(n.en)}`} variant="link" size="sm" className='p-0' key={_id}>
                                <Stack direction="horizontal" gap={1}>
                                    <Image src={`/item/${_id}.png`} />
                                    {n[language]}
                                </Stack>
                            </Button>
                        )
                    }
                    )
                }
            </Stack>
            : false
    )
}
