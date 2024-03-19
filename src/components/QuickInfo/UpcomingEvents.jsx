import React, { useEffect, useState } from 'react'
import { Spinner, Stack } from 'react-bootstrap'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { getEventsRss } from '../../utils/netlifyFunctions'
import { Badge, Card, Typography } from '../Atoms'

const getDateFromUrl = ({ link, isoDate }) => {
    const [preDayString, dayString, monthString] = link.split('-').slice('-3');
    // usually the date is 16th July but sometimes is 16th of July so I'll check the latest tree entries.
    const day = isNaN(parseInt(preDayString)) ? parseInt(dayString) : parseInt(preDayString);
    // remove trailing slash from month
    const month = monthString.replace('/', '');
    const date = Date.parse(`${day} ${month} 2023`);

    if (!isNaN(date))
        return date;

    return Date.parse(isoDate)
}

const handleEventsFeed = (items) => {
    const { pvp, catches } = items.reduce((prev, curr) => {
        // Its a official post (event tutorial, event leaderboard etc...)
        if (!curr.title.includes('('))
            return prev;
        // Both PVP and catch has date inside (...)
        curr.date = getDateFromUrl(curr);
        const today = (new Date().setHours(0, 0, 0, 0))

        // If event is ended remove it.
        /* if (today > curr.date)
            return prev; */
        if (today > curr.date)
            return prev;

        if (today === curr.date)
            curr.isToday = true;

        // Its a PVP
        if (curr.title.includes('[') || curr.title.includes('Team Tournament'))
            return { ...prev, pvp: [...prev.pvp, curr] }

        // Its a catch
        return { ...prev, catches: [...prev.catches, curr] }
    }, { pvp: [], catches: [] })
    return {
        pvp: pvp.sort((a, b) => a.date - b.date),
        catches: catches.sort((a, b) => a.date - b.date)
    }
}

const EventItem = (event) => {
    const { title, link, isToday } = event;
    return (
        <div className='mb-3'>
            <a href={link} rel="noreferrer" target="_blank" style={{ textDecoration: "none" }} className="d-flex align-items-center">
                <Typography as="h6" translate={false} className="mb-0">{title}</Typography>
                {
                    isToday
                        ? <Badge className="ms-1" style={{ fontSize: '.6rem', color: 'black' }} bg="warning" pill>TODAY</Badge>
                        : false
                }
            </a>
        </div>
    )
}

const isSameDay = (date, otherDate) => {
    return (new Date(date)).toDateString() === (new Date(otherDate)).toDateString();
};

export const UpcomingEvents = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [events, setEvents] = useLocalStorage('events', { list: false, fetched: false })

    useEffect(() => {
        if (events.list && isSameDay(events.fetched, Date.now()))
            return setLoading(false)

        const updateEvents = async () => {
            const data = await getEventsRss();
            if (!data.items.length)
                return false;

            const events = handleEventsFeed(data.items)
            setEvents({ list: events, fetched: Date.now() })
            setLoading(false)
        }
        updateEvents()
            .catch(err => {
                console.error(err)
                setLoading(false)
                setError(true)
            })
    }, [])

    return (
        <Card>
            {
                loading
                    ? <Spinner animation="border" variant="warning" />
                    : events.list
                        ? <Stack gap={5} direction="horizontal" className='align-items-start'>
                            <div>
                                <Typography as="h4">PVP</Typography>
                                {
                                    events.list.pvp.length
                                        ? events.list.pvp.map(event => <EventItem {...event} />)
                                        : <Typography>No pvp events found</Typography>
                                }
                            </div>
                            <div>
                                <Typography as="h4">Catches</Typography>
                                {
                                    events.list.catches.length
                                        ? events.list.catches.map(event => <EventItem {...event} />)
                                        : <Typography>No catches events found</Typography>
                                }
                            </div>
                        </Stack>
                        : <Typography>There's been an error loading the events.</Typography>
            }
        </Card>
    )
}
