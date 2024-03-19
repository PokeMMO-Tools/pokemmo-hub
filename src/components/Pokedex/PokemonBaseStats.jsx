import React from 'react'
import { useTranslations } from '../../context/TranslationsContext'
import { Table } from '../Atoms'

export const PokemonBaseStats = ({ hp, atk, def, spatk, spdef, spe }) => {
    const { t } = useTranslations();
    return (
        <Table responsive hover size="sm">
            <thead>
                <tr>
                    <th>{t("HP")}</th>
                    <th>{t("Attack")}</th>
                    <th>{t("Defense")}</th>
                    <th>{t("Sp. Atk")}</th>
                    <th>{t("Sp. Def")}</th>
                    <th>{t("Speed")}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{hp}</td>
                    <td>{atk}</td>
                    <td>{def}</td>
                    <td>{spatk}</td>
                    <td>{spdef}</td>
                    <td>{spe}</td>
                </tr>
            </tbody>
        </Table>
    )
}
