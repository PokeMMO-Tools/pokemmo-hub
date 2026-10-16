import React, { createContext, isValidElement, useContext } from 'react';
import reactStringReplace from 'react-string-replace';
import { useLocalStorage } from '../hooks/useLocalStorage';
import translations from '../locales';
import { getPreferredLanguage } from '../utils/languages';

const TranslationContext = createContext({
    language: 'en',
    changeLanguage: () => null,
    languages: [],
    t: () => null
})

export function useTranslations() {
    return useContext(TranslationContext)
}

export function TranslationProvider({ children }) {
    const languages = Object.keys(translations);
    const [language, changeLanguage] = useLocalStorage('language', () => getPreferredLanguage(languages));
    document.t = translations;

    const t = (string, targetLang = language, ...variables) => {
        if (typeof string !== "string") return string;
        if (targetLang === null) {
            targetLang = language;
        }

        let translation = translations[targetLang]?.[string.toLowerCase()];
        
        // Fall back to english if translation is missing
        if (!translation) {
            translation = translations['en']?.[string.toLowerCase()];
        }

        // Fall back to original string if translation is missing
        if (!translation) {
            translation = string;
        }

        if (!variables.length) return translation;

        variables.forEach((text, index) => {
            if (!isValidElement(text)) {
                translation = translation.replace(`$${index}`, text);
            } else {
                // Text is react component
                translation = reactStringReplace(translation, `$${index}`, match => text);
            }
        })
        return translation
    };

    return (
        <TranslationContext.Provider value={{ language, changeLanguage, languages, t }}>
            {children}
        </TranslationContext.Provider>
    )
}