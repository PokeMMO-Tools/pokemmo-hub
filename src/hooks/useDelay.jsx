import { useState } from 'react'

export const useDelay = (delay = 500) => {
    const [isRunning, setIsRunning] = useState(false)
    const [timeoutId, setTimeoutId] = useState(0)

    const delayedFunction = (callback) => {
        setIsRunning(true)
        clearTimeout(timeoutId)

        setTimeoutId(setTimeout(() => {
            callback()
            setIsRunning(false)
        }, delay));
    }

    return [isRunning, delayedFunction]
}
