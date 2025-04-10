import React, { useMemo, useState } from 'react';
import { Stack, Row, Col } from 'react-bootstrap';
import { Card, Typography, Badge, Button } from '../Atoms';
import { Search } from '../Atoms/Search';
import { EGG_GROUPS, TYPES } from '../../utils/pokemon';
import pokemon from '../../data/pokemmo/monster.json';
import abilities from '../../data/pokemmo/ability.json';
import moves from '../../data/pokemmo/moves.json';
import { useTranslations } from '../../context/TranslationsContext';
import { GatsbyImage } from 'gatsby-plugin-image';

const PokemonSearch = ({ sprites }) => {
    const { t } = useTranslations();

    const [selectedAbility, setSelectedAbility] = useState(null);
    const [selectedMoves, setSelectedMoves] = useState([null, null, null, null]);
    const [selectedTypes, setSelectedTypes] = useState([null, null]);
    const [selectedEggGroups, setSelectedEggGroups] = useState(null);

    // Sorting the dropdown data alphabetically
    const abilityOptions = useMemo(() => {
        return abilities
            .map(a => ({ value: a.en_name, label: a.en_name }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    const moveOptions = useMemo(() => {
        return moves
            .map(m => ({ value: m.name, label: m.name }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    const typesOptions = useMemo(() => {
        return Object.keys(TYPES)
            .map(type => ({
                value: type,
                label: TYPES[type].label
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    const eggGroupOptions = useMemo(() => {
        return Object.keys(EGG_GROUPS)
            .map(group => ({
                value: group,
                label: EGG_GROUPS[group].label
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    const handleAbilityChange = (selected) => {
        setSelectedAbility(selected?.value ?? null);
    };

    const handleMoveChange = (index, selected) => {
        const updatedMoves = [...selectedMoves];
        updatedMoves[index] = selected?.value ?? null;
        setSelectedMoves(updatedMoves);
    };

    const handleTypeChange = (index, selectedType) => {
        const updatedTypes = [...selectedTypes];
        updatedTypes[index] = selectedType ? selectedType.value : null;
        setSelectedTypes(updatedTypes);
    };

    const handleEggGroupChange = (selectedEggGroup) => {
        setSelectedEggGroups(selectedEggGroup ? selectedEggGroup.value : null);
    };

    const handleResetFilters = () => {
        setSelectedAbility(null);
        setSelectedMoves([null, null, null, null]);
        setSelectedTypes([null, null]);
        setSelectedEggGroups(null);
    };


    const filteredPokemon = useMemo(() => {
        return pokemon
            .filter(mon => mon.id <= 637)
            .filter(mon => {
                const monAbilityNames = mon.abilities?.map(a => a.name) ?? [];
                const monMoveNames = mon.moves?.map(m => m.name) ?? [];
                const monTypes = mon.types ?? [];
                const monEggGroups = mon.egg_groups ?? [];

                const hasAbility = selectedAbility ? monAbilityNames.includes(selectedAbility) : true;
                const hasMoves = selectedMoves.every(move => move ? monMoveNames.includes(move) : true);
                const hasTypes = selectedTypes.every(type => type ? monTypes.includes(type) : true);
                const hasEggGroup = selectedEggGroups ? monEggGroups.includes(selectedEggGroups) : true;

                return hasAbility && hasMoves && hasTypes && hasEggGroup;
            });
    }, [selectedAbility, selectedMoves, selectedTypes, selectedEggGroups]);

    const getPokemonSprite = (pokemonId) => {
        const sprite = pokemonId ? sprites.find(({ node }) => parseInt(node.name) === pokemonId) : false;
        return sprite ? <GatsbyImage image={sprite.node.childImageSharp.gatsbyImageData} alt={`${pokemonId}`} /> : null;
    };

    // Generate dynamic header text
    const headerText = useMemo(() => {
        const selectedMovesText = selectedMoves.filter(Boolean).join(', ') || '';
        const abilityText = selectedAbility ? `${selectedAbility}` : '';
        const typesText = selectedTypes.filter(Boolean).join(', ') || '';
        const eggGroupText = selectedEggGroups ? `${selectedEggGroups} ` : '';
        return `Pokémon that match: ${typesText ? 'Type: ' + typesText + ',' : ''} ${abilityText ? 'Ability: ' + abilityText + ',' : ''} ${eggGroupText ? 'Egg Group: ' + eggGroupText + ',' : ''} ${selectedMovesText ? 'Moves: ' + selectedMovesText : ''}`;
    }, [selectedAbility, selectedMoves, selectedTypes, selectedEggGroups]);

    return (
        <div>
            <Stack gap={3}>
                <Stack gap={4}>
                    <section>
                        <Typography variant="h5"><h5>Ability Filter</h5></Typography>
                        <Search
                            items={abilityOptions}
                            onChange={handleAbilityChange}
                            placeholder="Select an Ability"
                            hasEmpty={true}
                        />
                    </section>

                    <section>
                        <Typography variant="h5"><h5>Move Filters</h5></Typography>
                        <Row xs={2} md={2} lg={2} xl={2} className="g-3">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <Col key={index}>
                                    <Search
                                        items={moveOptions}
                                        onChange={(selected) => handleMoveChange(index, selected)}
                                        placeholder={`Select Move ${index + 1}`}
                                        hasEmpty={true}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </section>
                </Stack>

                <section>
                    <Typography variant="h5"><h5>Type & Egg Group</h5></Typography>
                    <Stack gap={3}>
                        <Row>
                            <Col sm={6}>
                                <Search
                                    items={typesOptions}
                                    onChange={(selected) => handleTypeChange(0, selected)}
                                    placeholder="Select Type 1"
                                    hasEmpty={true}
                                />
                            </Col>
                            <Col sm={6}>
                                <Search
                                    items={typesOptions}
                                    onChange={(selected) => handleTypeChange(1, selected)}
                                    placeholder="Select Type 2"
                                    hasEmpty={true}
                                />
                            </Col>
                        </Row>

                        <Search
                            items={eggGroupOptions}
                            onChange={handleEggGroupChange}
                            placeholder="Select Egg Group"
                            hasEmpty={true}
                        />
                    </Stack>
                </section>
                <Button variant="warning" onClick={handleResetFilters} className="btn-sm me-auto">Reset Filters</Button>


                <Typography variant="h5">
                    {filteredPokemon.length > 0 ? headerText : 'No Pokémon match your search criteria'}
                </Typography>

                <Card>
                    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-3">
                        {filteredPokemon.map(p => (
                            <Col key={p.id}>
                                <Card className="pokemon-card" style={{ border: '2px solid #464646' }}>
                                    <Stack gap={2} className="align-items-center">
                                        {getPokemonSprite(p.id)}
                                        <Badge>{t(p.name)}</Badge>
                                    </Stack>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Card>
            </Stack>
        </div>
    );
};

export default PokemonSearch;
