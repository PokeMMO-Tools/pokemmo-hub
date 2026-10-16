export const getLanguageText = language => {
    switch (language) {
        case 'en':
            return "🇬🇧 English"
        case 'es':
            return "🇪🇸 Spanish Español"
        case 'cn':
            return "🇨🇳 Chinese Simplified 简体中文"
        case 'tw':
            return "🇨🇳 Chinese Traditional 繁體中文"
        case 'fr':
            return "🇫🇷 French Français"
        case 'de':
            return "🇩🇪 German Deutsch"
        case 'it':
            return "🇮🇹 Italian Italiano"
        case 'jp':
            return "🇯🇵 Japanese 日本語"
        case 'br':
        case 'pt':
            return "🇧🇷 Portuguese Português"
        default:
            break;
    }
}

const DEFAULT_LANGUAGE = 'en';

const BROWSER_TO_APP = {
    ja: 'jp',
    pt: 'br',
    zh: 'cn',
    'zh-hans': 'cn',
    'zh-hant': 'tw',
    'zh-tw': 'tw',
    'zh-hk': 'tw',
}

const matchBrowserLocale = (locale, supportedLanguages) => {
    if (!locale) return null

    const segments = locale.toLowerCase().replaceAll('_', '-').split('-')

    for (let length = segments.length; length > 0; length--) {
        const key = segments.slice(0, length).join('-')
        const language = BROWSER_TO_APP[key] ?? key
        if (supportedLanguages.includes(language)) return language
    }

    return null
}

export const getPreferredLanguage = (supportedLanguages, fallback = DEFAULT_LANGUAGE) => {
    if (typeof window === 'undefined') return fallback

    const browserLocales = [
        ...(navigator.languages || []),
        navigator.language,
        navigator.userLanguage,
    ].filter(Boolean)

    return browserLocales
        .map(locale => matchBrowserLocale(locale, supportedLanguages))
        .find(Boolean) ?? fallback
}