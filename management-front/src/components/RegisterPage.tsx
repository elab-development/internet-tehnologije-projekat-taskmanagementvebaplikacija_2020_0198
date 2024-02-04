import React, { useState } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router';
import Input from './Input';
import { useUserContext } from '../context/UserContext';

export default function RegisterPage() {
    const { register } = useUserContext()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const navigate = useNavigate();

    
    return (
        <div className='container mt-3'>
            <Header content='Sign Up ' size='h2' center />
            
            <form onSubmit={async e => {
                e.preventDefault();
                await register({
                    username,
                    email,
                    password,
                    password_confirmation,
                    firstname,
                    lastname,
                    position
                });
                navigate('/')
            }} >

                <Input
                    name='username'
                    label='Username'
                    onChange={setUsername}
                    value={username}
                    required
                />
                <Input
                    name='email'
                    label='Email'
                    onChange={setEmail}
                    value={email}
                    required
                    type='email'
                />
                <Input
                    name='password'
                    label='Password'
                    onChange={setPassword}
                    value={password}
                    required
                    type='password'
                />
                <Input
                    name='passwordconfirmation'
                    label='Password confirmation'
                    onChange={setPasswordConfirmation}
                    value={password_confirmation}
                    required
                    type='password'
                />
                <Input
                    name='firstname'
                    label='First Name'
                    onChange={setFirstName}
                    value={firstname}
                    required
                  
                />
                <Input
                    name='lastaname'
                    label='Last Name'
                    onChange={setLastName}
                    value={lastname}
                    required
                />
                <Input
                    name='position'
                    label='Position'
                    onChange={setPosition}
                    value={position}
                  
                    
                />
                
                <button className='form-control btn btn-primary mt-3'>Register</button>
            </form>
        </div>
    )
}
