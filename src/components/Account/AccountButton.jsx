import React, { useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { FaRegUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../Atoms';
import { AccountModal } from './AccountModal';
import { useTranslations } from '../../context/TranslationsContext';

export const AccountButton = () => {
    const { t } = useTranslations()
    const [show, setShow] = useState(false)
    const toggleModal = () => setShow(prev => !prev);
    const { currentUser } = useAuth();

    return (
        <div>
            <Button onClick={toggleModal} size="sm" variant={currentUser ? 'success' : 'info'}>
                <BrowserView>
                    {currentUser ? t('account') : t('login / signup')}
                </BrowserView>
                <MobileView>
                    <FaRegUser size="18" />
                </MobileView>
            </Button>
            <AccountModal show={show} onHide={toggleModal} />
        </div>
    )
}
