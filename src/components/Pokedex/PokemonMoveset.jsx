import { Link } from 'gatsby';
import React from 'react';
import { useTranslations } from '../../context/TranslationsContext';
import { getMove, getMoveTarget } from '../../utils/pokemon';
import { capitalize } from '../../utils/strings';
import { Table } from '../Atoms';
import { Type } from './Type';

export const PokemonMoveset = ({ dexID, moves }) => {
    const { t } = useTranslations();


    return (
        <Table responsive hover striped size="sm" style={{ border: '1px solid transparent' }}>
            <thead className='border-bottom' style={{ position: 'sticky', top: 0, background: 'white' }}>
                <tr style={{ borderColor: "transparent" /* Fixes weird pixel bug on Firefox */ }}>
                    <th>{t("Move")}</th>
                    <th>{t("Type")}</th>
                    <th>{t("Power")}</th>
                    <th>{t("Accuracy")}</th>
                    <th>{t("PP")}</th>
                    <th>{t("Target")}</th>
                    <th>{t("Learn with / at")}</th>
                </tr>
            </thead>
            <tbody>
                {
                    moves.map(move => {
                        const md = getMove(move.id)
                        return (
                            <tr>
                                <td>{move.name}</td>
                                <td><Type id={md.type} className='d-inline-flex' size="small"></Type></td>
                                <td>{md.base_power}</td>
                                <td>{md.base_accuracy}</td>
                                <td>{md.base_pp}</td>
                                <td>{getMoveTarget(md.target_type)}</td>
                                <td>
                                    {
                                        move.type === "egg_moves"
                                            ? <Link
                                                to="/tools/egg-moves-calculator"
                                                style={{ color: 'var(--bs-warning)' }}
                                                state={{ id: dexID }}>
                                                {capitalize(move.type.replaceAll('_', ' '))}
                                            </Link>
                                            : `${capitalize(move.type.replaceAll('_', ' '))} ${move.level ?? ''}`
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </Table>
    )
}
