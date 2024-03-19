import React from 'react'
import { Image } from 'react-bootstrap'
import { Badge } from '../Atoms'
import { Follower } from './Follower'

export const AvatarList = ({ images, follower, isShiny }) => {

    return (
        <div className='d-flex flex-wrap flex-xl-nowrap' style={{ gap: '2rem' }}>
            {
                images.map(({ url, name, hasFollower }) => (
                    <div
                        key={name}
                        className='d-flex flex-column align-items-center justify-content-center position-relative'
                        style={{ gap: '.5rem', flex: "1 1 0px", maxWidth: "calc(33% - 1.5rem)" }}>
                        <Image style={{ height: 150 }} rounded src={url} alt={name}></Image>
                        {
                            hasFollower && follower ? <Follower direction={name.toLowerCase()} src={`/follower/${isShiny ? 'shiny' : 'normal'}/${follower}.png`} /> : false
                        }
                        <Badge pill>{name}</Badge>
                    </div>
                ))
            }
        </div>
    )
}
