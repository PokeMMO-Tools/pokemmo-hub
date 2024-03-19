import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../utils/firebase';

const defaultContext = {
    currentUser: null,
}

export const AuthContext = createContext(defaultContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
        });
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuthValue() {
    return useContext(AuthContext)
}