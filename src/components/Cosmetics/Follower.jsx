import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const BACKGROUND_POSITIONS = {
    back: [
        "0 -138px",
        "-93px -138px",
    ],
    front: [
        "0 0",
        "-93px 0",
    ],
    side: [
        "0 -47px",
        "-93px -47px",
    ]
}

export const Follower = ({ src, direction }) => {
    const [spritePosition, setSpritePosition] = useState(0)

    useEffect(() => {
        setInterval(() => {
            setSpritePosition(prev => prev ? 0 : 1);
        }, 500)
    }, [])

    return (
        <div className="follower-container">
            <div
                className={`follower-item item-${direction}`}
                style={{ backgroundImage: `url(${src})`, backgroundPosition: BACKGROUND_POSITIONS[direction][spritePosition] }}
            ></div>
        </div>
    )
}
