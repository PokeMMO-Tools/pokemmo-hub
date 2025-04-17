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

const CatchCalculator = ({ sprites }) => {


    return (
        <Card>
            <Typography>test</Typography>
        </Card>
    );
};

export default CatchCalculator;
