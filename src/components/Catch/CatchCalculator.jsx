import React, { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { Card, Typography, Button } from '../Atoms';
import { Search } from '../Atoms/Search';
import { GatsbyImage } from 'gatsby-plugin-image';

import catchRates from '../../data/catchRates.json';
import monster from '../../data/pokemmo/monster.json';
import { BALLS_CATCHRATE, STATUSES_CATCHRATE, calculateCatchRate } from '../../hooks/useCatchRate';

const CatchCalculator = ({ sprites }) => {
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [currentHpPercent, setCurrentHpPercent] = useState(100);
    const [selectedBall, setSelectedBall] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [catchRate, setCatchRate] = useState(null);
    const [catchRateProbabilities, setCatchRateProbabilities] = useState(null);
    const [debugOpen, setDebugOpen] = useState(false);
    const [pkmnRate, setPkmnRate] = useState(null);

    const pokemonOptions = monster.map(pokemon => ({
        value: pokemon.id,
        label: pokemon.name,
    }));

    const handlePokemonChange = (selectedOption) => {
        setSelectedPokemon(selectedOption);
    };

    const getPokemonSprite = (pokemonId, size = { width: 30, height: 30 }) => {
        const sprite = sprites.find(({ node }) => parseInt(node.name) === pokemonId);
        return sprite ? (
            <GatsbyImage
                image={sprite.node.childImageSharp.gatsbyImageData}
                alt={`${pokemonId}`}
                style={{ width: size.width, height: size.height }}
            />
        ) : null;
    };

    useEffect(() => {
        if (selectedPokemon) {
            const pokemonData = monster.find(p => p.id === selectedPokemon.value);
            const catchRateData = catchRates.find(c => c.id === selectedPokemon.value);

            if (catchRateData) {
                setPkmnRate(catchRateData.rate);
            }
        }
    }, [selectedPokemon]);

    useEffect(() => {
        if (selectedPokemon && selectedBall && selectedStatus && pkmnRate !== null) {
            const pokemonData = monster.find(p => p.id === selectedPokemon.value);
            const max_hp = pokemonData?.stats?.hp;

            if (pkmnRate && max_hp) {
                const current_hp = Math.floor((currentHpPercent / 100) * max_hp);

                const result = calculateCatchRate(
                    pkmnRate,
                    max_hp,
                    current_hp,
                    { rate: selectedBall.rate, name: selectedBall.name },
                    { rate: selectedStatus.rate, name: selectedStatus.name }
                );

                setCatchRate(result?.probability ?? null);
                setCatchRateProbabilities(result?.probabilities ?? null);
            } else {
                setCatchRate(null);
                setCatchRateProbabilities(null);
            }
        } else {
            setCatchRate(null);
            setCatchRateProbabilities(null);
        }
    }, [selectedPokemon, selectedBall, selectedStatus, currentHpPercent, pkmnRate]);

    return (
        <Card>
            <Stack gap={4}>
                <div>
                    <Typography><h5>Pokémon</h5></Typography>
                    <Search
                        items={pokemonOptions}
                        onChange={handlePokemonChange}
                        placeholder="Select a Pokémon"
                        hasEmpty
                        formatOptionLabel={(option) => (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {getPokemonSprite(option.value)}
                                <span>{option.label}</span>
                            </div>
                        )}
                        styles={{ width: '100%' }}
                    />
                </div>

                <div>
                    <Typography><h5>HP</h5></Typography>
                    <Typography>HP: {currentHpPercent}%</Typography>
                    <input
                        type="range"
                        min={1}
                        max={100}
                        value={currentHpPercent}
                        onChange={(e) => setCurrentHpPercent(Number(e.target.value))}
                        style={{ width: '100%' }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexDirection: 'row', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <Typography><h5>Poké Ball</h5></Typography>
                        <Search
                            items={BALLS_CATCHRATE.map(ball => ({
                                value: ball.name,
                                label: ball.name,
                                rate: ball.rate,
                                name: ball.name
                            }))}
                            onChange={(opt) => setSelectedBall(opt)}
                            placeholder="Choose a Poké Ball"
                            hasEmpty
                            styles={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <Typography><h5>Status</h5></Typography>
                        <Search
                            items={STATUSES_CATCHRATE.map(status => ({
                                value: status.name,
                                label: status.name || 'No Status',
                                rate: status.rate,
                                name: status.name
                            }))}
                            onChange={(opt) => setSelectedStatus(opt)}
                            placeholder="Choose a Status"
                            hasEmpty
                            styles={{ width: '100%' }}
                        />
                    </div>
                </div>

                {catchRateProbabilities !== null && (
                    <Stack gap={0}>
                        <Typography><h5>Result</h5><strong>{JSON.stringify(catchRateProbabilities)}%</strong></Typography>
                    </Stack>
                )}

                <div>
                    <Button size="sm" onClick={() => setDebugOpen(prev => !prev)}>
                        {debugOpen ? 'Hide' : 'Show'} Additional Calc Info
                    </Button>
                    {debugOpen && (
                        <div style={{ marginTop: '1rem' }}>
                            <Typography><h5>Additional Calculation Info</h5></Typography>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1 }}>
                                    <Typography><strong>Pokémon ID:</strong> {selectedPokemon?.value ?? 'undefined'}</Typography>
                                    <Typography><strong>Selected Poké Ball:</strong> {selectedBall?.name ?? 'undefined'}</Typography>
                                    <Typography><strong>Selected Status:</strong> {selectedStatus?.name ?? 'undefined'}</Typography>
                                    <Typography><strong>Max HP:</strong> {monster.find(p => p.id === selectedPokemon?.value)?.stats?.hp ?? 'undefined'}</Typography>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Typography><strong>Pokemon Catch Rate:</strong> {pkmnRate ?? 'undefined'}</Typography>
                                    <Typography><strong>Ball Rate:</strong> {selectedBall?.rate ?? 'undefined'}</Typography>
                                    <Typography><strong>Status Rate:</strong> {selectedStatus?.rate ?? 'undefined'}</Typography>
                                    <Typography><strong>HP Percentage:</strong> {currentHpPercent}%</Typography>
                                </div>
                            </div>
                            <Typography className="mt-4">
                                <strong>Calculation Formula:</strong>
                                <pre style={{ textAlign: 'left', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
                                    {`
catchRate = ((3 * pkmn_rate * current_hp) / (max_hp * 255)) * ball_rate * status_rate
Final Catch Rate = ${catchRate ?? 'undefined'}`}
                                </pre>
                            </Typography>
                        </div>
                    )}

                </div>
            </Stack>
        </Card>
    );
};

export default CatchCalculator;
