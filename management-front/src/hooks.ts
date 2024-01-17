import { useEffect, useState } from "react";
import { User } from "./model";
import axios from "axios";

export function useUser() {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!loading) {
            return;
        }
        let token = localStorage.getItem('authToken');
        if (!token) {
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
        loading
    }
}