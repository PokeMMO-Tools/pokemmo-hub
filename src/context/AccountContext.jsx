import React, { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { DEFAULT_USER_DATA } from '../interface/userdata';
import { getUser, updateUser } from '../utils/firebase';
import { mergeDeep } from '../utils/mergeDeep';
import { useAuthValue } from './AuthContext';

const AccountContext = createContext({
    account: DEFAULT_USER_DATA,
    updateAccount: () => null,
})

export function useAccount() {
    return useContext(AccountContext)
}

export function AccountProvider({ children }) {

    const [account, setAccount] = useLocalStorage('account', DEFAULT_USER_DATA)
    const { currentUser } = useAuthValue()

    const updateAccount = (data) => {

        // Update user with latest default_user_date
        data = mergeDeep(DEFAULT_USER_DATA, data);

        if (currentUser)
            updateUser(currentUser.uid, data)

        setAccount(prev => ({ ...prev, ...data }))
        return account;
    }

    useEffect(() => {
        if (!currentUser)
            return;

        getUser(currentUser.uid)
            .then(res => updateAccount(res))
            .catch(err => console.log(err))
    }, [currentUser])

    if (typeof window === 'undefined')
        return;

    return (
        <AccountContext.Provider value={{ account, updateAccount }}>
            {children}
        </AccountContext.Provider>
    )
}