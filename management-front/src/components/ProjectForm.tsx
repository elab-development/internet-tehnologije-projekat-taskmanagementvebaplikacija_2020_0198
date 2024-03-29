import React, { useEffect, useState } from 'react'
import Header from './Header'
import Form from './Form'
import { Category, Project } from '../model'
import axios from 'axios'
import './projectstyle.css';


interface Props {
    onSubmit: (val: any) => any,
    categories: Category[],
    project?: Project,
    onDelete: () => void
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

    //useEffect izvršiti svaki put kada se vrednost props.project promeni
    useEffect(() => {
        if (!props.project) {  //ako je null 
            setFormState(initialForm);
            return;
        }
        setFormState({
            name: props.project.name,
            description: props.project.description,
            status: props.project.status == '1' ? 'Finished' : 'Active',
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
                    await props.onSubmit({ //poziva se nad props-om funkcija on submit sa vrednostima koje su trenutno unete u val 
                        ...val,
                        status: val.status === 'Finished' ? '1' : '0' //ovde se vrsi konverzijaa jer je nama inace u bazi i na serveru 0,1 umesto finished i active
                    });
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        setErrors(err.response?.data);
                    }
                }
            }}>
                <Form.Input name='name' label='Name' placeholder='Name...' required />
                <Form.Select name='status' label='Status' required data={[{ label: 'Finished', value: 'Finished' }, { label: 'Active', value: 'Active' }]} />
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
                <div className='button-container'>
                    <button className='btn btn-secondary save-button'>Save</button>
                    <button className='btn btn-danger delete-button' onClick={() => props.onDelete()}>
                        Delete
                    </button>
                </div>
            </Form>
        </div>
    )
}
