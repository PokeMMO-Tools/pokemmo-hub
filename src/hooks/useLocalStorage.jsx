import { useEffect, useState } from 'react';

const getSavedValue = (key, initialValue) => {
    if (typeof window === 'undefined') return;
    const savedValue = JSON.parse(localStorage.getItem(key, initialValue))
    if (savedValue) return savedValue
    if (initialValue instanceof Function) return initialValue()
    return initialValue
}

export function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        return getSavedValue(key, initialValue)
    })

    useEffect(() => {
        if (typeof value === 'undefined') {
            return;
        }
        localStorage.setItem(key, JSON.stringify(value))
    }, [value, key])

    return [value, setValue]
}
