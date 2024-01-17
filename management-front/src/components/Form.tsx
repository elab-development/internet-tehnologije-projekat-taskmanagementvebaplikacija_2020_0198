import React, { useContext, useEffect, useState } from 'react'

interface FormValue {
    [key: string]: any
}

const FormContext = React.createContext({
    value: {} as FormValue,
    onChange: (name: string, value: any) => { }
});

export function useFormContext() {
    return useContext(FormContext);
}

interface Props {
    title?: string;
    className?: string;
    formValue?: FormValue,
    onChange?: (val: React.SetStateAction<FormValue>) => void,
    onSubmit?: (val: FormValue) => void,
    children: React.ReactNode
}

export default function Form(props: Props) {
    const [formValue, setFormValue] = useState<FormValue>({})


    useEffect(() => {
        if (props.formValue) {
            setFormValue(props.formValue)
        } else {
            setFormValue({});
        }
    }, [props.formValue])

    return (
        <div className={props.className}>
            {
                props.title && (
                    <h2 className='text-center'>
                        <strong>{props.title}</strong>
                    </h2>
                )
            }
            <form onSubmit={e => {
                e.preventDefault();
                props.onSubmit?.(formValue);
            }}>
                <FormContext.Provider value={{
                    value: props.formValue || formValue,
                    onChange: (name, value) => {
                        if (props.onChange) {
                            props.onChange(prev => {
                                return {
                                    ...prev,
                                    [name]: value
                                }
                            })
                            return;
                        }
                        setFormValue(prev => {
                            return {
                                ...prev,
                                [name]: value
                            }
                        })
                    }
                }}>
                    {props.children}
                </FormContext.Provider>
            </form>
        </div>
    )
}

interface InputProps {
    name: string,
    required?: boolean,
    type?: React.HTMLInputTypeAttribute,
    label?: string,
    textArea?: boolean,
    error?: string;
    placeholder?: string
}

function FormInput(props: InputProps) {
    const { value, onChange } = useFormContext();
    return <div className='form-group mt-3'>
        {props.label && <label >{props.label}</label>}
        {
            props.textArea ? (
                <textarea className={'form-control' + (props.error ? ' is-invalid' : '')} required={props.required}
                    value={value[props.name]} placeholder={props.placeholder} onChange={e => onChange(props.name, e.currentTarget.value)}></textarea>
            ) : (
                <input className={'form-control' + (props.error ? ' is-invalid' : '')} required={props.required} type={props.type}
                    value={value[props.name]} placeholder={props.placeholder} onChange={e => onChange(props.name, e.currentTarget.value)} />
            )
        }
        {
            props.error && (<div className="invalid-feedback">
                {props.error}
            </div>)

        }
    </div>
}

Form.Input = FormInput;