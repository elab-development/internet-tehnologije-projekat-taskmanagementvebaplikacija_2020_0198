import React, { useEffect, useState } from 'react'
import Header from './Header'
import Form from './Form'
import { User} from '../model'
import axios from 'axios'

interface Props {
    onSubmit: (val: any) => any,
    user?: User
}
const initialForm = {
    username: '',
    email: '',
    //password: '',
    firstname: '',
    lastname: '',
    position: '',
    role: '',
}

export default function ProjectForm(props: Props) {
    const [errors, setErrors] = useState({} as any);
    const [formState, setFormState] = useState(initialForm as any)

    //useEffect izvršiti svaki put kada se vrednost props.project promeni
    useEffect(() => {
        if (!props.user) {  //ako je null 
            setFormState(initialForm);
            return;
        }
        setFormState({
            username: props.user.username,
            email: props.user.email,
            //password: props.user.password,
            firstname: props.user.firstname,
            lastname: props.user.lastname,
            position: props.user.position,
            role: props.user.role,
        })
    }, [props.user])

    return (
        <div>
            <Header center content={props.user ? 'Edit user' : ''} />
            <Form formValue={formState} onChange={setFormState} errors={errors} onSubmit={async val => {
                try {
                    await props.onSubmit({ 
                        ...val,
                    });
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        setErrors(err.response?.data);
                    }
                }
            }}>
                <Form.Input name='username' label='Username' placeholder='Username..' required />
                <Form.Input name='email' label='Email' placeholder='Email..' required />
                <Form.Input name='firstname' label='Firstname' placeholder='Firstname..' required />
                <Form.Input name='lastname' label='Lastname' placeholder='Lastname..' required />
                <Form.Input name='position' label='Position' placeholder='Position..' required />
                <Form.Select name='role' label='Role' required data={[
                    {
                        label: 'Admin',
                        value: 'Admin'
                    },
                    {
                        label: 'VIP Korisnik',
                        value: 'VIP Korisnik'
                    },
                    {
                        label: 'Korisnik',
                        value: 'Korisnik'
                    }
                ]} />
                <button className='btn btn-secondary mt-2'>Save</button>
            </Form>
        </div>
    )
}
