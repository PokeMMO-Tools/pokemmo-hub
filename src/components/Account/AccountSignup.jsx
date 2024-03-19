import { createUserWithEmailAndPassword } from '@firebase/auth'
import React, { useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { auth, createUser } from '../../utils/firebase'
import { Button } from '../Atoms'
import { useTranslations } from '../../context/TranslationsContext'

export const AccountSignup = () => {
    const { t } = useTranslations()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const validatePassword = () => {
        let isValid = true;
        if (password !== '' && confirmPassword !== '') {
            if (password !== confirmPassword) {
                isValid = false;
                setError('Password doesnt match.')
            }
        }
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setError('');
            if (validatePassword()) {
                const { user } = await createUserWithEmailAndPassword(auth, email, password)
                createUser(user.uid)

            }
        } catch (error) {
            setError(error.code)
        }
    }

    return (
        <Form onSubmit={handleSubmit} >
            {
                error ? <Alert variant="danger">{error}</Alert> : false
            }
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>{t('Email address')}</Form.Label>
                <Form.Control required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder={t('name@example.com')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{t('Your Password')}</Form.Label>
                <Form.Control required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder={t('password')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>{t('repeat your password')}</Form.Label>
                <Form.Control required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder={t('password')} />
            </Form.Group>
            <Button type="submit" variant="warning">Signup</Button>
        </Form>
    )
}
