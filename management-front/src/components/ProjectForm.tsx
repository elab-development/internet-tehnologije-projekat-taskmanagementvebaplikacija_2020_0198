import React, { useEffect, useState } from 'react'
import Header from './Header'
import Form from './Form'
import { Category, Project } from '../model'
import axios from 'axios'

interface Props {
    onSubmit: (val: any) => any,
    categories: Category[],
    project?: Project
}
const initialForm = {
    name: '',
    description: '',
    status: '',
    start_date: '',
    end_date: '',
    priority: '',
    category_id: '',
}

export default function ProjectForm(props: Props) {
    const [errors, setErrors] = useState({} as any);
    const [formState, setFormState] = useState(initialForm as any)

    useEffect(() => {
        if (!props.project) {
            setFormState(initialForm);
            return;
        }
        setFormState({
            name: props.project.name,
            description: props.project.description,
            status: props.project.status,
            start_date: props.project.start_date,
            end_date: props.project.end_date,
            priority: props.project.priority,
            category_id: props.project.category_id,
        })
    }, [props.project])

    return (
        <div>
            <Header center content={props.project ? 'Edit project' : 'Create project'} />
            <Form formValue={formState} onChange={setFormState} errors={errors} onSubmit={async val => {
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
