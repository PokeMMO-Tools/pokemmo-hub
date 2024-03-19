import React from 'react'
import { PokedexLabel } from './PokedexLabel'
import { useTranslations } from '../../context/TranslationsContext';
import { getPokeDexIDs } from '../../utils/pokemon';

export const PokemonDexBar = ({ nationalDex }) => {
    const { t } = useTranslations();
    const  { kanto_dex, johto_dex, hoenn_dex, sinnoh_dex, unova_dex } = getPokeDexIDs(nationalDex);
    return (
        <div className="d-flex" style={{ gap: ".5rem" }}>
            <>
                <PokedexLabel color="#FF0000" dexName="National" dexNumber={nationalDex} />
                {
                    kanto_dex !== 0 ? <PokedexLabel color="#000000" dexName={t("kanto")} dexNumber={kanto_dex} /> : null
                }
                {
                    johto_dex !== 0 ? <PokedexLabel color="" dexName={t("johto")} dexNumber={johto_dex} /> : null
                }
                {
                    hoenn_dex !== 0 ? <PokedexLabel color="" dexName={t("hoenn")} dexNumber={hoenn_dex} /> : null
                }
                {
                    sinnoh_dex !== 0 ? <PokedexLabel color="" dexName={t("sinnoh")} dexNumber={sinnoh_dex} /> : null
                }
                {
                    unova_dex !== 0 ? <PokedexLabel color="" dexName={t("unova")} dexNumber={unova_dex} /> : null
                }

            </>
        </div>

    )
}