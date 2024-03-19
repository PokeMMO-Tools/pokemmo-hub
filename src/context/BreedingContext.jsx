import React, { createContext, useContext } from 'react';
import { useAccount } from "../context/AccountContext";
import { BREEDING_FORM_VALUES, DEFAULT_BREDS, DEFAULT_BREEDING_CONFIG } from '../interface/breeding';


const BreedingContext = createContext({
    breds: DEFAULT_BREDS,
    setAsBred: () => null,
    removeBred: () => null,
    clearBreeding: () => null,
    breedingConfig: DEFAULT_BREEDING_CONFIG,
    setBreedingConfig: () => null,
    BREEDING_FORM_VALUES
})

export function useBreeding() {
    return useContext(BreedingContext)
}

export function BreedingProvider({ children }) {

    const { account, updateAccount } = useAccount();
    const { breeding } = account;

    //const [breds, setBreds] = useLocalStorage('breds', DEFAULT_BREDS)
    //const [breedingConfig, setBreedingConfig] = useLocalStorage('breedingConfig', DEFAULT_BREEDING_CONFIG);

    const setAsBred = ({ row, col }) => {
        const breds = findTreeBreds({ row, col })
        updateAccount({
            breeding: {
                config: { ...breeding.config },
                breds: [...breeding.breds, ...breds]
            }
        })
    }

    const removeBred = ({ row, col }) => {
        const breds = findTreeBreds({ row, col })
        const filteredBreds = breeding.breds.filter(({ row, col }) => {
            return !breds.some(bred => bred.row === row && bred.col === col)
        })
        updateAccount({
            breeding: {
                config: { ...breeding.config },
                breds: filteredBreds
            }
        })

    }

    const findTreeBreds = ({ row, col }) => {
        let breds = [];
        let delta = 1
        breds.push({ row, col })
        for (let i = row - 1; i > 0; i--) {
            delta = delta * 2
            let ending = (col + 1) * delta
            for (let j = 0; j < delta; j++) {
                breds.push({ row: i, col: ending - 1 - j });
            }
        }
        return breds;
    }
    const clearBreeding = () => {
        updateAccount({
            breeding: {
                config: DEFAULT_BREEDING_CONFIG,
                breds: DEFAULT_BREDS
            }
        });
    }

    const setBreedingConfig = (data) => {
        updateAccount({
            breeding: {
                config: {
                    ...breeding.config,
                    ...data
                },
                breds: [...breeding.breds]
            }
        })
    }

    return (
        <BreedingContext.Provider value={{ breds: breeding.breds, setAsBred, removeBred, clearBreeding, breedingConfig: breeding.config, setBreedingConfig, BREEDING_FORM_VALUES }}>
            {children}
        </BreedingContext.Provider>
    )
}