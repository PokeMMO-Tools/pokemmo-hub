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
    const [selectedTier, setSelectedTier] = useState(null);
    const [allowOverrideLastAbility, setAllowOverrideLastAbility] = useState(true);



    const tierOptions = [
        { value: "Over Used", label: "Over Used (OU)" },
        { value: "Under Used", label: "Under Used (UU)" },
        { value: "NU+Untiered", label: "Never Used (NU) + Untiered" },
    ];


    const handleTierChange = (selectedTierOption) => {
        setSelectedTier(selectedTierOption ? selectedTierOption.value : null);
    };

    const getAllowedTiers = (tier) => {
        if (tier === "Over Used") return ["Over Used", "Under Used", "Never Used", "Untiered"];
        if (tier === "Under Used") return ["Under Used", "Never Used", "Untiered"];
        if (tier === "NU+Untiered") return ["Never Used", "Untiered"];
        return null; // No filtering
    };





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
        setSelectedTier(null);
    };


    const allowedTiers = getAllowedTiers(selectedTier);

    const overrideAbilityIDs = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 46, 47, 48, 49, 52, 53, 54, 55, 58, 59, 60, 61, 62, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 81, 82, 86, 87, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 104, 105, 108, 111, 112, 113, 114, 115, 116, 117, 120, 121, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 147, 148, 149, 163, 164, 165, 166, 167, 168, 169, 172, 173, 174, 177, 178, 179, 180, 181, 183, 184, 185, 186, 190, 191, 192, 193, 194, 195, 196, 197, 198, 200, 204, 205, 207, 208, 209, 210, 211, 215, 216, 217, 220, 221, 222, 225, 226, 228, 229, 230, 234, 238, 239, 240, 241, 242, 245, 246, 247, 248, 261, 262, 263, 264, 278, 279, 280, 281, 282, 285, 286, 287, 288, 289, 293, 294, 295, 296, 297, 298, 302, 304, 305, 306, 311, 312, 315, 318, 319, 325, 326, 327, 333, 334, 336, 341, 342, 349, 350, 353, 354, 355, 356, 357, 361, 362, 363, 364, 365, 371, 372, 373, 396, 397, 398, 403, 404, 405, 406, 407, 418, 419, 424, 425, 426, 427, 428, 429, 430, 431, 432, 434, 435, 436, 437, 438, 440, 442, 443, 444, 445, 447, 448, 451, 452, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 469, 470, 471, 472, 473, 475, 477, 478, 504, 505, 506, 507, 508, 517, 518, 522, 523, 529, 530, 543, 544, 545, 546, 547, 551, 552, 553, 570, 571, 572, 573, 582, 583, 584, 590, 591, 607, 608, 609, 613, 614, 615, 622, 623, 627, 628, 629, 630
    ]; // alphas

    const filteredPokemon = useMemo(() => {
        return pokemon
            .filter(mon => mon.id <= 637)
            .filter(mon => {
                const allAbilities = mon.abilities?.map(a => a.name) ?? [];

                const monAbilityNames = (() => {
                    if (!allowOverrideLastAbility) {
                        return allAbilities.slice(0, -1); // ignore HA unless alpha
                    }
                    return overrideAbilityIDs.includes(mon.id)
                        ? allAbilities
                        : allAbilities.slice(0, -1);
                })();

                const monMoveNames = mon.moves?.map(m => m.name) ?? [];
                const monTypes = mon.types ?? [];
                const monEggGroups = mon.egg_groups ?? [];
                const monTiers = mon.tiers ?? [];

                const hasAbility = selectedAbility ? monAbilityNames.includes(selectedAbility) : true;
                const hasMoves = selectedMoves.every(move => move ? monMoveNames.includes(move) : true);
                const hasTypes = selectedTypes.every(type => type ? monTypes.includes(type) : true);
                const hasEggGroup = selectedEggGroups ? monEggGroups.includes(selectedEggGroups) : true;
                const matchesTier = allowedTiers ? monTiers.some(t => allowedTiers.includes(t)) : true;

                return hasAbility && hasMoves && hasTypes && hasEggGroup && matchesTier;
            });
    }, [selectedAbility, selectedMoves, selectedTypes, selectedEggGroups, selectedTier, allowOverrideLastAbility]);

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
                        <Typography variant="h5"><h5>Ability</h5></Typography>
                        <Search
                            items={abilityOptions}
                            onChange={handleAbilityChange}
                            placeholder="Select an Ability"
                            hasEmpty={true}
                        />
                        <div className="form-check mt-2">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="abilityOverrideToggle"
                                checked={allowOverrideLastAbility}
                                onChange={() => setAllowOverrideLastAbility(!allowOverrideLastAbility)}
                            />
                            <label className="form-check-label" htmlFor="abilityOverrideToggle">
                                Include Alpha / Hidden Ability
                            </label>
                        </div>
                    </section>



                    <section>
                        <Typography variant="h5"><h5>Moves</h5></Typography>
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
                    <Row className="g-3 align-items-start">
                        <Col sm={6}>
                            <Stack gap={4}>
                                <div>
                                    <Typography variant="h6"><h5>Type 1</h5></Typography>
                                    <Search
                                        items={typesOptions}
                                        onChange={(selected) => handleTypeChange(1, selected)}
                                        placeholder="Select Type 2"
                                        hasEmpty={true}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6"><h5>Egg Group</h5></Typography>
                                    <Search
                                        items={eggGroupOptions}
                                        onChange={handleEggGroupChange}
                                        placeholder="Select Egg Group"
                                        hasEmpty={true}
                                    />
                                </div>
                            </Stack>
                        </Col>
                        <Col sm={6}>
                            <Stack gap={4}>
                                <div>
                                    <Typography variant="h6"><h5>Type 2</h5></Typography>
                                    <Search
                                        items={typesOptions}
                                        onChange={(selected) => handleTypeChange(1, selected)}
                                        placeholder="Select Type 2"
                                        hasEmpty={true}
                                    />
                                </div>
                                <div>
                                    <Typography variant="h6"><h5>PvP Tier</h5></Typography>
                                    <Search
                                        items={tierOptions}
                                        onChange={handleTierChange}
                                        placeholder="Select Tier"
                                        hasEmpty={true}
                                    />
                                </div>
                            </Stack>
                        </Col>
                    </Row>
                </section>

                <Button variant="outline-danger" onClick={handleResetFilters} className="btn-sm me-auto">Clear</Button>

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
