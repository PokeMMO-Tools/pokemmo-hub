import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AccountProvider } from './AccountContext'
import { AuthProvider } from './AuthContext'
import { BerriesProvider } from './BerryContext'
import { BreedingProvider } from './BreedingContext'
import { DarkModeProvider } from './DarkModeContext'
import { MarketProvider } from './MarketContext'
import { NavigationMenuProvider } from './NavigationMenuContext'
import { NotificationProvider } from './NotificationContext'
import { PokedexProvider } from './PokedexContext'
import { SettingsProvider } from './SettingsContext'
import { TranslationProvider } from './TranslationsContext'

const queryClient = new QueryClient()

export const Providers = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AccountProvider>
                    <NotificationProvider>
                        <TranslationProvider>
                            <SettingsProvider>
                                <DarkModeProvider>
                                    <NavigationMenuProvider>
                                        <BreedingProvider>
                                            <PokedexProvider>
                                                <BerriesProvider>
                                                    <MarketProvider>
                                                        {children}
                                                    </MarketProvider>
                                                </BerriesProvider>
                                            </PokedexProvider>
                                        </BreedingProvider>
                                    </NavigationMenuProvider>
                                </DarkModeProvider>
                            </SettingsProvider>
                        </TranslationProvider>
                    </NotificationProvider>
                </AccountProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}
