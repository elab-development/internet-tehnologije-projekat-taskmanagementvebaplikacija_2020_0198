import React, { useState } from 'react'
import Header from './Header'
import Form from './Form'
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from '../context/UserContext';
import Input from './Input';


export default function LoginPage() {
    const [error, setError] = useState('');
    const { login } = useUserContext()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    return (
        <div className='container mt-3'>
            <Header content='Login page' size='h2' center />
            {
                error && (
                    <Header content={error} size='h4' center error />
                )
            }
            <form onSubmit={async e => {
                e.preventDefault();
                await login(email, password);
                navigate('/')
            }}>
                <Input name='email' 
                    label='Email' 
                    value={email}
                    onChange={setEmail}
                    required 
                    type='email' />
                <Input name='password' 
                    label='Password' 
                    type='password' 
                    onChange={setPassword}
                    value={password}
                    required
                    />
                <button className='mt-2 form-control btn btn-secondary'>Login</button>


            </form>

            <Link to='/reset'>
            <button className="custom-link-style">Reset password</button>
            </Link>

            
        </div>
    )

    /**<Link to='/reg'>
            <button className='mt-2 form-control btn btn-secondary'>Register</button>
            </Link>
     */
}