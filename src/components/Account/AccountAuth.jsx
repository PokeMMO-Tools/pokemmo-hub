import React, { useState } from 'react'
import { Stack } from 'react-bootstrap'
import { Button } from '../Atoms'
import { AccountLogin } from './AccountLogin'
import { AccountResetPassword } from './AccountResetPassword'
import { AccountSignup } from './AccountSignup'

const AUTH_ACTIONS = {
    LOGIN: {
        key: 'login',
        label: 'login',
        component: <AccountLogin />
    },
    SIGNUP: {
        key: 'signup',
        label: 'signup',
        component: <AccountSignup />
    },
    FORGOT_PASSWORD: {
        key: 'forgot_password',
        label: 'Reset Password',
        component: <AccountResetPassword />
    }
}

export const AccountAuth = () => {
    const [action, setAction] = useState(AUTH_ACTIONS.SIGNUP.key)
    return (
        <Stack gap={2}>
            {
                Object
                    .keys(AUTH_ACTIONS)
                    .map(key => {
                        const item = AUTH_ACTIONS[key];
                        return item.key === action
                            ? item.component
                            : false
                    })
            }
            <Stack gap={3} direction="horizontal" className="justify-content-between mt-2 pt-2 border-top">
                {
                    Object
                        .keys(AUTH_ACTIONS)
                        .map(key => {
                            const item = AUTH_ACTIONS[key]
                            return item.key !== action
                                ? <Button key={item.key} onClick={() => setAction(item.key)} variant='link'>{item.label}</Button>
                                : false
                        })
                }
            </Stack>
        </Stack>
    )
}
