import { useEffect, useState } from "react";
import { User } from "./model";
import axios from "axios";

export function useUser() {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const login = async (userData: any) => {
        const res = await axios.post('/api/login', userData);
        setUser(res.data.user);
        const token = res.data.access_token;
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common.Authorization = 'Bearer ' + token;
    }
    const logout = async () => {
        await axios.post('/api/logout');
        axios.defaults.headers.common.Authorization = undefined;
        localStorage.removeItem('authToken')
        setUser(undefined);
    }

    useEffect(() => {
        if (!loading) {
            return;
        }
        let token = localStorage.getItem('authToken');
        if (!token) {
            setLoading(false);
            return;
        }
        token = 'Bearer ' + token;
        axios
            .get('/api/user', { headers: { Authorization: token } })
            .then(res => {
                setUser(res.data);
                axios.defaults.headers.common.Authorization = token;
            })
            .catch(err => {
                axios.defaults.headers.common.Authorization = undefined;
                localStorage.removeItem('authToken')
            })
            .finally(() => {
                setLoading(false);
            })

    }, [loading])

    return {
        user,
        loading,
        login,
        logout
    }
}