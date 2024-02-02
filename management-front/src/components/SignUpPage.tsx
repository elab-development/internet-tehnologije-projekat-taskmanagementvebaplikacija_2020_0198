import React, { useState } from 'react'
import Header from './Header'
import Form from './Form'
import { Link, useNavigate } from "react-router-dom";
import Register from './Register';
import { Route, Routes } from 'react-router';
import axios from 'axios';
import { User } from '../model';


interface Props {
    register: (userData: any) => Promise<void>;
}


export default function SignUpPage(props: Props) {
    const [error, setError] = useState('');
    //const navigate = useNavigate();
    


    /*const handleSignUpClick = () => {
        // Navigacija na register stranicu
        //navigate('/register');
       
        navigate('/register');
    };*/

    return (
        <div className='container mt-3'>

            <Header content='Register page' size='h2' center />
            {
                error && (
                    <Header content={error} size='h4' center error />
                )
            }

            <Form
                onSubmit={async (userData) => {
                    try {
                        await props.register(userData);
                    } catch (error: any) {
                        setError(error.message);
                    }
                }}




            >
                <Form.Input name='username' label='Username' type='text' />
                <Form.Input name='email' label='Email' type='email' />
                <Form.Input name='password' label='Password' type='password' />
                <Form.Input name='password_conf' label='Password confirmation' type='password' />
                <Form.Input name='firstname' label='Firstname' type='text' />
                <Form.Input name='lastname' label='Lastname' type='text' />
                <Form.Input name='position' label='Position' type='text' />
                <button className='mt-2 form-control btn btn-secondary'>Sign up</button>
            </Form>

        </div>
    )
}
