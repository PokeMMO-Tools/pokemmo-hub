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
        case 'pt':
            return "🇧🇷 Portuguese Português"
        default:
            break;
    }
}