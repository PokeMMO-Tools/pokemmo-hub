import React from 'react'
import {useTranslations} from '../../context/TranslationsContext'
import {getMove, getPokemon} from "../../utils/pokemon"
import {Button, Image} from "react-bootstrap"
import {TbChevronRight} from "react-icons/tb"
import {Badge, Card, Typography} from "../Atoms"
import {Divider, Stack} from "@mui/material";
import {getItemName} from "../../utils/items";
import {useMarket} from "../../context/MarketContext";
import {Link} from "gatsby";
import {slugify} from "../../utils/slugify";

export const PokemonEvolutions = ({evolutions}) => {
    const { t, language } = useTranslations();
    const { allItems } = useMarket();

    const renderItem = (val) => {
        const item = allItems.find(({ item_id }) => item_id === val)
        const { _id, n } = item
        return (
            <Button as={Link} to={`/items/${slugify(n.en)}`} variant="link" size="sm" className='p-0' key={_id}>
                <Stack direction="horizontal" gap={1}>
                    <Image src={`/item/${_id}.png`} />
                    <Typography as={Link}>{getItemName(item.item_id)[language]}</Typography>
                </Stack>
            </Button>
        )
    }

    const renderMethod = (type, val) => {
        if (type.startsWith('LEVEL_LOCATION_')) {
            return (
                <Stack direction="column" alignItems="center">
                    <Typography as={"small"}>{t('when level up')}</Typography>
                    <Typography as={"small"}>{t('near a')} {t(type)}</Typography>
                </Stack>
            )
        }

        switch (type) {
            case 'LEVEL':
                return <Typography as={"small"}>{t('Level')} {val}</Typography>
            case 'LEVEL_WITH_SKILL':
                const move = getMove(val)
                return (
                    <Stack direction="column" alignItems="center">
                        <Typography as="small">{t('with move')} {move.name}</Typography>
                        <Typography as="small"></Typography>
                        <Typography as="small">({t('when level up')})</Typography>
                    </Stack>
                )
            case 'LEVEL_FEMALE':
            case 'LEVEL_MALE':
                return <Typography as={"small"}>{t('Level')} {val} ({type.endsWith('FEMALE') ? t('Female') : t('Male')})</Typography>
            case 'LEVEL_WITH_MONSTER':
                const monster = getPokemon(val);
                return (
                    <Stack direction="column" alignItems="center">
                        <Typography as={"small"}>{t('when level up')}</Typography>
                        <Typography as={"small"}>({t('with')} {t(monster.name)} {t('in team')})</Typography>
                    </Stack>
                )
            case 'HAPPINESS':
            case 'HAPPINESS_DAY':
            case 'HAPPINESS_NIGHT':
                return <Typography as={"small"}>{t('Happiness')} ({type.endsWith('DAY') ? t('Day') : type.endsWith('NIGHT') ? t('Night') : `${t('Day')}/${t('Night')}`})</Typography>
            case 'TRADE':
                return <Typography as={"small"}>{t('Trade')}</Typography>
            case 'TRADE_WITH_ITEM':
            case 'LEVEL_ITEM_DAY':
            case 'LEVEL_ITEM_NIGHT':
            case 'ITEM':
                return (
                    <Stack direction="column" alignItems="center" gap={1}>
                        {renderItem(val)}
                        {type === 'TRADE_WITH_ITEM' && <Typography as="small">({t('Trade')})</Typography>}
                        {type.startsWith("LEVEL_ITEM_") && <Typography as="small">{t('when level up')} ({type.endsWith('DAY') ? t('Day') : type.endsWith('NIGHT') ? t('Night') : ''})</Typography>}
                    </Stack>
                )
            default:
                return <Typography as={"small"}>{type}</Typography>
        }
    }

    const renderEvolution = (evolution) => {
        const targetPokemon = getPokemon(evolution.id);
        return (
            <Stack direction="row"
                   key={evolution.id}
                   spacing={{ xs: 1, sm: 2 }}
                   gap={2}
                   divider={<Divider orientation="vertical" flexItem ><TbChevronRight /></Divider>}
                   justifyContent="center"
            >
                <Card>
                    <Stack direction="column" gap={1} alignItems="center" justifyContent="center">
                        <Image src={`/sprites/${targetPokemon.id.toString().padStart(3, '0')}.png`}
                               style={{maxWidth: '4rem'}}/>
                        <Typography as="span">{targetPokemon.name}</Typography>
                        {renderMethod(evolution.type, evolution.val)}
                    </Stack>
                </Card>
                {targetPokemon.evolutions.map((evolution) => renderEvolution(evolution))}
            </Stack>
        )
    }

    return (
        <>
            <Stack
                direction={evolutions.length > 1 ? "row" : "column"}
                divider={<Divider orientation="vertical" flexItem ><Badge>or</Badge></Divider>}
                spacing={{ xs: 1, sm: 2 }}
                gap={2}
                useFlexGap
                justifyContent="center"
                flexWrap="wrap"
            >
                {evolutions.map((evolution) => renderEvolution(evolution))}
            </Stack>
        </>
    )
}
