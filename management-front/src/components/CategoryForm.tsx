import React, { useEffect, useState } from 'react'
import Header from './Header'
import Form from './Form'
import { Category } from '../model'
import axios from 'axios'

interface Props {
    onSubmit: (val: any) => any,
    category?: Category
}
const initialForm = {
    name: '',
    
}

export default function CategoryForm(props: Props) {
    const [errors, setErrors] = useState({} as any);
    const [formState, setFormState] = useState(initialForm as any)

    useEffect(() => {
        if (!props.category) {   
            setFormState(initialForm);
            return;
        }
        setFormState({
            name: props.category.name,
            
        })
    }, [props.category])

    return (
        <div>
            <Header center content={props.category ? 'Edit category' : 'Create category'} />
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
                <Form.Input name='name' label='Name' placeholder='Name...' required />
                <button className='btn btn-secondary mt-2'>Save</button>
            </Form>
        </div>
    )
}
