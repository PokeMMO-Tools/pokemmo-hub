import React, { createContext, useContext, useState } from 'react';

const DEFAULT_SETTINGS = {
    notifications: true
}

const SettingsContext = createContext({
    settings: DEFAULT_SETTINGS,
    setSettings: () => null,
    resetSettings: () => null
})

export function useSettings() {
    return useContext(SettingsContext)
}

export function SettingsProvider({ children }) {

    const [settings, setSettings] = useState(DEFAULT_SETTINGS)

    const resetSettings = () => setSettings(DEFAULT_SETTINGS)

    return (
        <SettingsContext.Provider value={{ settings, setSettings, resetSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}