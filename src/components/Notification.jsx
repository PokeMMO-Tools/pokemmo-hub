import React, { useState } from 'react';
import { TbBell } from 'react-icons/tb';
import { useSettings } from '../context/SettingsContext';
import updates from '../data/updates';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Badge, Button } from './Atoms';
import { NotificationBox } from './NotificationBox';


const getUnseenNotifications = (notifications, seen) => {
    return notifications.filter(({ id }) => !seen.find(seenId => id === seenId))
}

const getReadNotifications = (notifications) => notifications.map(({ id }) => id)

export const Notification = () => {

    const { settings } = useSettings()
    const [show, setShow] = useState(false)
    const [readNotifications, setReadNotifications] = useLocalStorage('readNotifications', []);
    if (!settings.notifications) return;
    if (!readNotifications) return;

    const unseenNotifications = getUnseenNotifications(updates, readNotifications)
    const readNotificationsId = getReadNotifications(unseenNotifications)

    const onNotificationRead = () => {
        setReadNotifications(prev => [...prev, ...readNotificationsId])
        setShow(false)
    }

    return (
        unseenNotifications.length
            ?
            <>
                <div className='d-flex position-relative'
                //    style={{ position: 'absolute', bottom: 0 }}
                >
                    <Button size="sm" variant='danger' onClick={() => setShow(true)} className='rounded' style={{ padding: "0.1rem" }}>
                        <TbBell size={22} />
                    </Button>
                    <Badge pill bg="warning" text="dark" style={{ position: 'absolute', right: -5, bottom: -5, width: '1rem', height: '1rem', fontSize: '.85rem' }} className="d-flex align-items-center justify-content-center">{unseenNotifications.length}</Badge>
                </div>
                <NotificationBox show={show} onHide={onNotificationRead} unseenNotifications={unseenNotifications} />
            </>
            : false
    )
}
