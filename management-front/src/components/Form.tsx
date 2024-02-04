import React, { useContext, useEffect, useState } from 'react'

interface FormValue {
    [key: string]: any
}

//FormContext se koristi za deljenje stanja forme između Form, FormInput, i FormSelect komponenti putem React Context API-ja.
//ne želimo da prenosimo propertije kroz sve komponente na putu.
const FormContext = React.createContext({
    value: {} as FormValue,//value je trenutno stanje forme
    errors: {} as { [key: string]: string } | undefined,  //Tip podataka je objekat čiji su ključevi nazivi polja u formi, a vrednosti su poruke o greškama.
    onChange: (name: string, value: any) => { } // funkcija koja će se koristiti za ažuriranje vrednosti pojedinačnih polja u formi.
    //name je naziv polja koji se azurira 
    //value je vrednost koja treba da se postavi tj nova vrednost polja 
});

//useFormContext je funkcija koja se koristi za dohvat trenutnog stanja forme (value, errors, onChange) iz FormContext. 
//Koristi se unutar FormInput i FormSelect komponenata.
export function useFormContext() {
    return useContext(FormContext);
}

interface Props {
    title?: string;
    className?: string;
    formValue?: FormValue,
    errors?: { [key: string]: string },
    onChange?: (val: React.SetStateAction<FormValue>) => void,
    onSubmit?: (val: FormValue) => void,
    children: React.ReactNode  //form.input je npr children 
}

export default function Form(props: Props) {
    const [formValue, setFormValue] = useState<FormValue>({})

    // React čvorove koji se renderuju unutar ovog providera.
    useEffect(() => {
        if (props.formValue) {  //useEffect hook se koristi kako bi se inicijalizovalo stanje forme na osnovu propertija 
            //formValue kada dođe do promene u vrednosti tog propertija.
            setFormValue(props.formValue)
        } else {
            setFormValue({});
        }
    }, [props.formValue])

    return (
        <div className={props.className}>
            {
                props.title && ( //za edit i create 
                    <h2 className='text-center'>
                        <strong>{props.title}</strong> 
                    </h2>
                )
            }
            <form onSubmit={e => {
                e.preventDefault();
                props.onSubmit?.(formValue);
            }}>
                <FormContext.Provider value={{ //obezbedjuje vrednost trenutnog stanja forme za sve podkomponente koje su unutar tog providera
                    errors: props.errors,
                    value: props.formValue || formValue, //Trenutno stanje forme. Ako je props.formValue definisan, 
                    //koristiće se ta vrednost, inače će se koristiti lokalno (inicijalno) stanje formValue
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
    placeholder?: string
    
}
function FormInput(props: InputProps) {
    const { value, onChange, errors } = useFormContext();
    const error = errors ? errors[props.name] : '';
    ////Ako postoji properti label, tada se renderuje <label> element sa tekstom iz propertija. Inače, ovaj deo se ne renderuje.
    return <div className='form-group mt-3'>
        {props.label && <label >{props.label}</label>}
        
        {
            props.textArea ? (
                <textarea className={'form-control' + (error ? ' is-invalid' : '')} required={props.required}
                    value={value[props.name]} placeholder={props.placeholder} onChange={e => onChange(props.name, e.currentTarget.value)}></textarea>
            ) : (
                <input className={'form-control' + (error ? ' is-invalid' : '')} required={props.required} type={props.type}
                    value={value[props.name]} placeholder={props.placeholder} onChange={e => onChange(props.name, e.currentTarget.value)} />
            )
        }
        {
            error && (<div className="invalid-feedback">
                {error}
            </div>)

        }
    </div>
}

interface SelectProps {
    name: string,
    required?: boolean,
    label?: string,
    data: { label: string, value: any }[]
}

function FormSelect(props: SelectProps) {
    const { value, onChange, errors } = useFormContext();
    const error = errors ? errors[props.name] : '';
    return <div className='form-group mt-3'>
        {props.label && <label >{props.label}</label>}
        <select className={'form-control' + (error ? ' is-invalid' : '')} required={props.required}
            value={value[props.name]} onChange={e => onChange(props.name, e.currentTarget.value)} >
            <option value="0">Select...</option>
            {
                props.data.map(elem => {
                    return (
                        <option value={elem.value} key={elem.value}>{elem.label}</option>
                    )
                })
            }
        </select>
        {
            error && (<div className="invalid-feedback">
                {error}
            </div>)

        }
    </div>
}

Form.Input = FormInput;
Form.Select = FormSelect;