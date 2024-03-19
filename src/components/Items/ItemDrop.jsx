import { Link } from 'gatsby'
import React from 'react'
import { Image, Stack } from 'react-bootstrap'
import { getPokemonThatCanHoldItem } from '../../utils/pokemon'
import { Button, Card, Typography } from '../Atoms'
import { useTranslations } from '../../context/TranslationsContext'

export const ItemDrop = ({ itemId }) => {
    const { t } = useTranslations();
    const heldBy = getPokemonThatCanHoldItem(itemId);
    return (
        heldBy.length
            ? (
                <Card className="mb-3">
                    <Typography as="h5" className='mb-0'>Pokémon that drop this item</Typography>
                    <Typography as="small" className='text-muted'>
                        You can get this item with Thief or Covet
                    </Typography>
                    <Stack direction='horizontal' className='mt-1 flex-wrap justify-content-start' gap={2}>
                        {
                            heldBy.map((pokemon) => {
                                if (!pokemon)
                                    return null;

                                const { id, name } = pokemon;
                                return (
                                    <Button key={id} as={Link} to="/tools/pokedex" state={{ name }} variant="secondary" className='text-light'>
                                        <Stack
                                            style={{ flex: "0 1 100%", minWidth: "4.5rem" }}
                                            className='align-items-center'
                                        >
                                            <Image src={`/sprites/${id.toString().padStart(3, 0)}.png`} style={{ maxWidth: '4rem' }} />
                                            <Typography className='mb-0 text-light'>{t(name)}</Typography>
                                        </Stack>
                                    </Button>
                                )
                            })
                        }
                    </Stack>
                </Card>
            )
            : false
    )
}
