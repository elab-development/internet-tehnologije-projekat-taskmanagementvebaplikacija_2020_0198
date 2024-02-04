import React, { useContext, useEffect, useState } from 'react'
import { User } from "../model";
import axios from 'axios';

interface RegisterUser {
    username: string,
    email: string,
    password: string,
    password_confirmation: string,
    firstname: string,
    lastname: string,
    position: string
}

export const UserContext = React.createContext({
    user: undefined as User | undefined,
    login: (email: string, password: string) => Promise.resolve(),
    register: (ru: RegisterUser) => Promise.resolve(),
    logout: () => Promise.resolve()
});
interface Props {
    children: React.ReactNode
}
export const useUserContext = () => {
    return useContext(UserContext);
}

export function UserContextProvider(props: Props) {
    const [user, setUser] = useState<User | undefined>(undefined)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }
        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
        axios.get('/api/user').then(res => {
            setUser(res.data);
        })
            .catch(() => {
                axios.defaults.headers.common.Authorization = undefined;
                setUser(undefined)
            })
    }, [])
    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post('/api/login', { email, password });
            const token = response.data.token;
            axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            localStorage.setItem('token', token);
            setUser(response.data.user);

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message); 
            }
            throw new Error('Unknown error')
        }
    }
    const register = async (regUser: RegisterUser) => {
        try {
            const response = await axios.post('/api/register', regUser);
            const token = response.data.token;
            //axios.defaults.headers.common.Authorization = 'Bearer ' + token;
            localStorage.setItem('token', token);
            //setUser(response.data.user);
            await login(regUser.email, regUser.password);

        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message); 
            }
            throw new Error('Unknown error')
        }
    }
    const logout = async () => {
        try {
            await axios.post('/api/logout');
            setUser(undefined);
            localStorage.removeItem('token');
            axios.defaults.headers.common.Authorization = undefined;
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message); 
            }
            throw new Error('Unknown error')
        }
    }
    return (
        <UserContext.Provider value={{
            user, login, register, logout
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
