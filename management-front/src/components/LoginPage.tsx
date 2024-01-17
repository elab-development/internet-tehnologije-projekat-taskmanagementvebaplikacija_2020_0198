import React, { useState } from 'react'
import Header from './Header'
import Form from './Form'

interface Props {
    login: (val: any) => Promise<void>
}

export default function LoginPage(props: Props) {
    const [error, setError] = useState('');
    return (
        <div className='container mt-3'>
            <Header content='Login page' size='h2' center />
            {
                error && (
                    <Header content={error} size='h4' center error />
                )
            }
            <Form onSubmit={async userData => {
                try {
                    await props.login(userData)
                } catch (error: any) {
                    setError(error.message)
                }
            }}>
                <Form.Input name='email' label='Email' type='email' />
                <Form.Input name='password' label='Password' type='password' />
                <button className='mt-2 form-control btn btn-secondary'>Login</button>
            </Form>
        </div>
    )
}
