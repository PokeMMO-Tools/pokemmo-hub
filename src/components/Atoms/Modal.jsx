import React from 'react'
import { Modal as ModalBS, ModalDialog } from 'react-bootstrap'
import { useDarkMode } from '../../context/DarkModeContext'
import { Typography } from './Typography'

export const Modal = ({ title, body, footer, show, backdrop, closeButton = true, onHide, ...props }) => {
    const { isDark } = useDarkMode()
    const Dialog = ({ children }) => <ModalDialog style={{ "--bs-modal-bg": isDark ? '#343A40' : 'white' }}>{children}</ModalDialog>;
    return (
        <ModalBS

            className="modal-lg"
            show={show}
            onHide={onHide}
            dialogAs={Dialog}
            backdrop={backdrop}
        >
            {
                title
                    ? <ModalBS.Header closeButton={closeButton} closeVariant={isDark ? 'white' : null}>
                        <ModalBS.Title as={({ children }) => <Typography as="h4" className="mb-0">{children}</Typography>}>
                            {title}
                        </ModalBS.Title>
                    </ModalBS.Header>
                    : false
            }
            {
                body || props.children
                    ? <ModalBS.Body >{body || props.children}</ModalBS.Body>
                    : false
            }
            {
                footer
                    ? <ModalBS.Footer>{footer}</ModalBS.Footer>
                    : false
            }
        </ModalBS>
    )
}
