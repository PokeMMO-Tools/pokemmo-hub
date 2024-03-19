// UI
// TODO: Clean up the translation files and move them to a separate files
import en from './en-BR/translation.json'
import cn from './zh-CN/translation.json'
import tw from './zh-TW/translation.json'
import es from './es-ES/translation.json'
import fr from './fr-FR/translation.json'
import de from './de-DE/translation.json'
import it from './it-IT/translation.json'
import jp from './ja-JP/translation.json'
import br from './pt-BR/translation.json'

// Monster
import monster_en from './en-BR/monster.json'
import monster_cn from './zh-CN/monster.json'
import monster_tw from './zh-TW/monster.json'
import monster_es from './es-ES/monster.json'
import monster_fr from './fr-FR/monster.json'
import monster_de from './de-DE/monster.json'
import monster_it from './it-IT/monster.json'
import monster_jp from './ja-JP/monster.json'
import monster_br from './pt-BR/monster.json'

// Locations
import locations_en from './en-BR/locations.json'
import locations_cn from './zh-CN/locations.json'
import locations_tw from './zh-TW/locations.json'
import locations_es from './es-ES/locations.json'
import locations_fr from './fr-FR/locations.json'
import locations_de from './de-DE/locations.json'
import locations_it from './it-IT/locations.json'
import locations_jp from './ja-JP/locations.json'
import locations_br from './pt-BR/locations.json'



export default {
    'en': {
        ...monster_en,
        ...locations_en,
        ...en,
    },
    'cn': {
        ...monster_cn,
        ...locations_cn,
        ...cn,
    },
    'tw': {
        ...monster_tw,
        ...locations_tw,
        ...tw,
    },
    'es': {
        ...monster_es,
        ...locations_es,
        ...es,
    },
    'fr': {
        ...monster_fr,
        ...locations_fr,
        ...fr,
    },
    'de': {
        ...monster_de,
        ...locations_de,
        ...de,
    },
    'it': {
        ...monster_it,
        ...locations_it,
        ...it,
    },
    'jp': {
        ...monster_jp,
        ...locations_jp,
        ...jp,
    },
    'br': {
        ...monster_br,
        ...locations_br,
        ...br,
    }
}

