import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import './styleRegister.css';
import { User } from '../model';

const Register = () => {
    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        firstname: '',
        lastname: '',
        position: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [msg, setMsg] = useState("");
    const [user, setUser] = useState<User | undefined>(undefined);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const onSubmitHandler = async (e: FormEvent) => {
            e.preventDefault();
            setIsLoading(true);
          
            try {
              const res = await axios.post('/api/register', signupData);
          
              setUser(res.data.user);
              const token = res.data.access_token;
              localStorage.setItem('authToken', token);
              axios.defaults.headers.common.Authorization = 'Bearer ' + token;
              setIsLoading(false);
          
              if (res.data.status === 200) {
                setMsg(res.data.message);
                setSignupData({
                  username: '',
                  email: '',
                  password: '',
                  password_confirmation: '',
                  firstname: '',
                  lastname: '',
                  position: ''
                });
          
                setTimeout(() => {
                  setMsg("");
                }, 2000);
              } else {
                setMsg(res.data.message);
                setTimeout(() => {
                  setMsg("");
                }, 2000);
              }
            } catch (error) {
              setIsLoading(false);
              console.error('Error during registration:', error);
            }
          };
          
           
    };

return (
    <div>
        <Form className="containers shadow">
            <FormGroup>
                <Label for="username">Username</Label>
                <Input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={signupData.username}
                    onChange={onChangeHandler}
                />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email </Label>
                <Input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={signupData.email}
                    onChange={onChangeHandler}
                />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={signupData.password}
                    onChange={onChangeHandler}
                />
            </FormGroup>
            <FormGroup>
                <Label for="password_confirmation">Password confirmation</Label>
                <Input
                    type="password"
                    name="password_confirmation"
                    placeholder="Enter password confirmation"
                    value={signupData.password_confirmation}
                    onChange={onChangeHandler}
                />
            </FormGroup>

            <FormGroup>
                <Label for="firstname">Firstname</Label>
                <Input
                    type="text"
                    name="firstname"
                    placeholder="Enter firstname"
                    value={signupData.firstname}
                    onChange={onChangeHandler}
                />
            </FormGroup>
            <FormGroup>
                <Label for="lastname">Lastname</Label>
                <Input
                    type="text"
                    name="lastname"
                    placeholder="Enter lastname"
                    value={signupData.lastname}
                    onChange={onChangeHandler}
                />
            </FormGroup>

            <FormGroup>
                <Label for="position">Position</Label>
                <Input
                    type="text"
                    name="position"
                    placeholder="Enter position"
                    value={signupData.position}
                    onChange={onChangeHandler}
                />
            </FormGroup>


            <p className="text-white">{msg}</p>
            <Button
                className="text-center mb-4"
                color="success"
                onClick={onSubmitHandler}
            >
                Sign Up
                {isLoading && (
                    <span
                        className="spinner-border spinner-border-sm ml-5"
                        role="status"
                        aria-hidden="true"
                    ></span>
                )}
            </Button>
            <Link to="*" className="text-white ml-auto"  >
                I'm already a member
            </Link>
        </Form>
    </div>
);
};

export default Register;