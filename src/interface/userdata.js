import { BERRIES_FAVORITES, DEFAULT_ACCOUNT_BERRY } from "./berries"
import { DEFAULT_BREDS, DEFAULT_BREEDING_CONFIG } from "./breeding"

export const DEFAULT_USER_DATA = {
    berries: {
        planted: DEFAULT_ACCOUNT_BERRY,
        favorites: BERRIES_FAVORITES
    },
    breeding: {
        config: DEFAULT_BREEDING_CONFIG,
        breds: DEFAULT_BREDS
    },
    market: {
        investments: [],
        wishlist: []
    },
    discordId: "",
    language: "en",
    notifications: [],
    isDark: true
}