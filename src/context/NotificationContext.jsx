import React, { createContext, useContext, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const defaultContext = {
    showNotification: (string) => null
}

export const NotificationContext = createContext(defaultContext);
export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [show, setShow] = useState(false)
    const [text, setText] = useState('');

    const showNotification = (string) => {
        setText(string)
        setShow(true)
    }

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            <ToastContainer containerPosition='fixed' position="bottom-end" className='p-2'>
                <Toast onClose={() => setShow(false)} show={show} delay={5000} autohide bg="success">
                    <Toast.Body>
                        {text}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
            {children}
        </NotificationContext.Provider>
    );
};