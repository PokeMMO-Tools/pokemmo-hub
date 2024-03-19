import React from 'react'
import { Alert } from 'react-bootstrap'
import { useTranslations } from '../context/TranslationsContext'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { Button } from './Atoms'

export const Information = ({ children, title }) => {
    const [breedingHelp, setBreedingHelp] = useLocalStorage('breedingHelp', false);
    const { t } = useTranslations();
    return (
        breedingHelp
            ? <Alert variant="info">
                <Alert.Heading>{title}</Alert.Heading>
                <div dangerouslySetInnerHTML={{ __html: children }}></div>
                <hr />
                <div className="mt-2">
                    <Button variant="outline-primary" onClick={() => setBreedingHelp(false)}>{t("Close")}</Button>
                </div>
            </Alert>
            : <Button text="light" variant="info" className="mb-3" onClick={() => setBreedingHelp(true)}>
                {t("How to use the breeding tool")}
            </Button>
    )
}
