import React, { useState } from 'react'
import Header from './Header'
import Form from './Form'
import { Category } from '../model'
import axios from 'axios'

interface Props {
    onSubmit: (val: any) => any,
    categories: Category[]
}

export default function ProjectForm(props: Props) {
    const [errors, setErrors] = useState({} as any)
    return (
        <div>
            <Header center content='Create project' />
            <Form errors={errors} onSubmit={async val => {
                try {
                    await props.onSubmit(val);
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        setErrors(err.response?.data);
                    }
                }
            }}>
                <Form.Input name='name' label='Name' placeholder='Name...' required />
                <Form.Select name='status' label='Status' required data={[{ label: 'Finished', value: 1 }, { label: 'Active', value: 0 }]} />
                <Form.Input type='date' name='start_date' label='Start date' required />
                <Form.Input type='date' name='end_date' label='End date' />
                <Form.Select name='priority' label='Priority' required data={[
                    {
                        label: 'low',
                        value: 'low'
                    },
                    {
                        label: 'medium',
                        value: 'medium'
                    },
                    {
                        label: 'high',
                        value: 'high'
                    }
                ]} />
                <Form.Select name='category_id' label='Category' required
                    data={props.categories.map(cat => {
                        return {
                            label: cat.name,
                            value: cat.id
                        }
                    })}
                />
                <Form.Input textArea name='description' label='Description' required />
                <button className='btn btn-secondary mt-2'>Save</button>
            </Form>
        </div>
    )
}
