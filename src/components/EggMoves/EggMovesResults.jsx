import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useTranslations } from '../../context/TranslationsContext';
import eggMoveChain from '../../data/pokemmo/egg-move-chain.json';
import { getMoveName, getPokemonName } from '../../utils/pokemon';
import { Button, Card, Typography } from '../Atoms';
import { PathResult } from './PathResult';

const filterMovesByPokemonId = pkmn_id => {
    const currentPokemonEggMoves = eggMoveChain
        .filter(chains => (
            chains[0].monster_id === pkmn_id
                ? true
                : false
        ))
        .reduce((acc, curr) => {
            const move_id = curr[0].move_id;
            return { ...acc, [move_id]: [...(acc[move_id] || []), curr] };
        }, {})

    return currentPokemonEggMoves;
}

export const EggMovesResults = ({ sprites, selectedPokemon }) => {
    const sprite = selectedPokemon ? sprites.find(({ node }) => parseInt(node.name) === selectedPokemon) : false;
    const pokemonName = getPokemonName(selectedPokemon);
    const [paths, setPaths] = useState({});
    const [activeMove, setActiveMove] = useState(false);
    const { t } = useTranslations();

    useEffect(() => {
        const paths = filterMovesByPokemonId(selectedPokemon)
        setActiveMove(false)
        if (paths)
            return setPaths(paths);
    }, [selectedPokemon])


    //const movePaths = activeMove ? currentPokemonEggMoves[activeMove] : false

    return (
        selectedPokemon
            ? <Card className="rounded pe-0">
                <Stack gap="3" direction="horizontal" className="align-items-center">
                    <GatsbyImage style={{ maxWidth: '80px' }} image={sprite.node.childImageSharp.gatsbyImageData} alt={pokemonName} />
                    <Stack gap="2">
                        <Typography as="h4" className="mb-0">{pokemonName}</Typography>
                        {
                        Object.keys(paths).length ? 
                            <Stack direction="horizontal" gap="2" className="flex-wrap">
                                {
                                    Object.keys(paths).map(move_id => (
                                        <Button
                                            active={move_id === activeMove}
                                            variant='warning'
                                            onClick={() => setActiveMove(move_id)}
                                            key={move_id}
                                        >
                                            {t(getMoveName(move_id))}
                                        </Button>
                                    ))
                                }
                            </Stack>
                        :
                        <Typography as="text" className="mb-0">None</Typography>
                        }
                    </Stack>
                </Stack>
                {
                    activeMove && paths[activeMove].length ? <PathResult choosenPkmnSprite={sprite} sprites={sprites} paths={paths[activeMove]} /> : false
                }
            </Card>
            : false
    );
    /* const pokemonName = getPokemonName(eggMove.id)
    const [paths, setPaths] = useState([])
    const [activeMove, setActiveMove] = useState(false)
    

    useEffect(() => {
        setPaths([])
        setActiveMove(false)
    }, [selectedPokemon])

    const updatePaths = (index, paths) => {
        setActiveMove(index)
        setPaths(paths)
    }

    return (
        <Card className="rounded pe-0">
            <Stack gap="3" direction="horizontal" className="align-items-center">
                <GatsbyImage style={{ maxWidth: '80px' }} image={sprite.node.childImageSharp.gatsbyImageData} alt={pokemonName} />
                <Stack gap="2">
                    <Typography as="h4" className="mb-0">{pokemonName}</Typography>
                    <Stack direction="horizontal" gap="2" className="flex-wrap">
                        {
                            eggMove.moves.map((move, index) => (
                                <Button
                                    active={index === activeMove}
                                    variant='warning'
                                    onClick={() => updatePaths(index, move.paths)} key={index}>
                                    {t(move.name)}
                                </Button>
                            ))
                        }
                    </Stack>
                </Stack>
            </Stack>
            {
                paths.length ? <PathResult choosenPkmnSprite={sprite} sprites={sprites} paths={paths} /> : false
            }
        </Card>
    ) */
}
