import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDarkMode } from '../context/DarkModeContext';
import { useTranslations } from '../context/TranslationsContext';
import { getLanguageText } from '../utils/languages';

export const LanguageSwitcher = () => {
    const { theme } = useDarkMode()
    const { language, changeLanguage, languages } = useTranslations();

    return (
        <Dropdown>
            <Dropdown.Toggle id="language-switcher" variant="info" size='sm'>
                {getLanguageText(language)}
            </Dropdown.Toggle>
            <Dropdown.Menu variant={theme} align="end">
                {
                    languages.map(lng => (
                        <Dropdown.Item key={lng} language={lng} active={lng === language} onClick={() => changeLanguage(lng)}>
                            {getLanguageText(lng)}
                        </Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}
