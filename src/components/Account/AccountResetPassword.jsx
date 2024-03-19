import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { auth } from '../../utils/firebase';
import { Button } from '../Atoms';

export const AccountResetPassword = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email)
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
                <Form.Label>Email address</Form.Label>
                <Form.Control required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="name@example.com" />
            </Form.Group>
            <Button type="submit" variant="warning">Forgot Password</Button>
        </Form>
    )
}
