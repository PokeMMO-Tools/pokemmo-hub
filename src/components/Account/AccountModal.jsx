import React from 'react';
import { useAuthValue } from '../../context/AuthContext';
import { Modal } from '../Atoms';
import { AccountAuth } from './AccountAuth';
import { AccountProfile } from './AccountProfile';

export const AccountModal = ({ onHide, show }) => {
    const { currentUser } = useAuthValue();

    return (
        <Modal
            onHide={onHide}
            show={show}
            title="Account"
            body={
                !currentUser
                    ? <AccountAuth />
                    : <AccountProfile />
            }>
        </Modal>
    )
}
