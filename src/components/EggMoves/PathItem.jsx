import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'
import { useTranslations } from '../../context/TranslationsContext'
import { getPokemonName } from '../../utils/pokemon'
import { Badge, Typography } from '../Atoms'

export const PathItem = ({ path, sprites }) => {
    const sprite = sprites.find(({ node }) => parseInt(node.name) === parseInt(path.monster_id))
    const pokemonName = getPokemonName(path.monster_id)
    const { t } = useTranslations()
    return (
        <div className="d-flex flex-column align-items-center justify-content-center flex-shrink-0" style={{ gap: '.5rem' }}>
            <GatsbyImage style={{ maxWidth: '80px' }} image={sprite.node.childImageSharp.gatsbyImageData} alt={pokemonName} />
            <Typography className="text-muted mb-0 text-center">{pokemonName}</Typography>
            <Badge pill>
                {
                    path.level === 106
                        ? t('Evolve')
                        : path.level === 108
                            ? t("Breed")
                            : path.level === 101
                                ? t("Special")
                                : `lv. ${path.level}`
                }
            </Badge>
        </div>
    )
}
