import React, { createContext, useContext, useMemo } from 'react';
import Helmet from 'react-helmet';
import { useAccount } from './AccountContext';

const DarkModeContext = createContext({
    isDark: false,
    toggleDarkMode: () => null
})

export function useDarkMode() {
    return useContext(DarkModeContext)
}

export function DarkModeProvider({ children }) {

    const { account, updateAccount } = useAccount()

    const { isDark } = useMemo(() => account, [account.isDark])

    const toggleDarkMode = () => {
        updateAccount({ isDark: !isDark })
    }

    return (
        <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
            <Helmet
                bodyAttributes={{
                    class: isDark ? 'dark' : 'light'
                }}
            >
                <meta name="theme-color" content={`${isDark ? '#212529' : '#f8f9fa'}`} />
            </Helmet>
            {children}
        </DarkModeContext.Provider>
    )
}