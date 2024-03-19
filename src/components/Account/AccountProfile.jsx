import { signOut } from '@firebase/auth'
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useAccount } from '../../context/AccountContext'
import { useAuthValue } from '../../context/AuthContext'
import { auth } from '../../utils/firebase'
import { Button, Typography } from '../Atoms'

export const AccountProfile = () => {
    const [discordId, setDiscordId] = useState('');
    const { account, updateAccount } = useAccount()
    const { currentUser } = useAuthValue();

    const handleSubmit = async () => {
        try {
            updateAccount({
                ...account,
                discordId: '1234'
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Logged in as</Form.Label>
                    <Form.Control disabled={true} value={currentUser.email} placeholder="Logged in as" />
                </Form.Group>
            </Form>
            <Typography as="small">
                You're currently logged in. For now this functionality syncs every configuration on the website with all your devices that are logged into this account. In the future we will expand this functionality for new utilities!
            </Typography>
            <div className='mt-3 pt-3 border-top d-flex'>
                <Button className='ms-auto' variant="danger" onClick={() => signOut(auth)} size="sm">Logout</Button>
            </div>
        </div>
    )
}
