import { useEffect, useState } from 'react';

export function useIdentify(string) {
    const convertStringToID = (string) => string.replace(' ', '-').toLowerCase()

    const [id, setId] = useState(convertStringToID(string));

    useEffect(() => {
        setId(convertStringToID(string))
    }, string)
    return id
}
