import React from 'react'
import { useTranslations } from '../context/TranslationsContext'
import { throwConfetti } from '../utils/confetti'
import { Button, Modal, Typography } from './Atoms'
import { DiscordButton } from './Atoms/Button'

const NotificationsBody = ({ notifications }) => {
    return (
        notifications.map((notification, index) => (
            <div style={{ borderBottom: index < notifications.length - 1 ? '1px solid rgba(142,142,142,.4)' : '0' }}>
                <Typography as="h6" className='mt-2'>{notification.title}</Typography>
                <Typography className='mb-2' translate={false}>{notification.content}</Typography>
            </div>
        ))
    )
}

const NotificationsFooter = ({ onOk }) => {
    return (
        <div className='d-flex justify-content-start w-100 align-items-center' style={{ gap: '.5rem' }}>
            <Button onClick={onOk}>Ok that's great!</Button>
            <DiscordButton />
        </div>
    )
}

export const NotificationBox = ({ show, onHide, unseenNotifications }) => {
    const { t } = useTranslations()

    if (show) {
        throwConfetti(10)
    }

    return (
        <Modal show={show}
            title={t("Announcements 🎉")}
            body={<NotificationsBody notifications={unseenNotifications} />}
            footer={<NotificationsFooter delay={5000} onOk={onHide} />}
            backdrop="static"
            closeButton={false}
        >
        </Modal>
    )
}
