import { signInWithEmailAndPassword } from '@firebase/auth'
import React, { useState } from 'react'
import { Alert, Form } from 'react-bootstrap'
import { auth } from '../../utils/firebase'
import { Button } from '../Atoms'

export const AccountLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.stopPropagation();
            }
            await signInWithEmailAndPassword(auth, email, password)
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Your Password</Form.Label>
                <Form.Control required value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <Button type="submit" variant="warning">Login</Button>
        </Form>
    )
}
