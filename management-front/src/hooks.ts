import { useEffect, useState } from "react";
import { User } from "./model";
import axios from "axios";

export function useUser() {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    const login = async (userData: any) => { 
        try {
            const res = await axios.post('/api/login', userData);
            setUser(res.data.user);
            const token = res.data.access_token;
            localStorage.setItem('authToken', token); 
            axios.defaults.headers.common.Authorization = 'Bearer ' + token; 
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data.message); 
            }
            throw new Error('Unknown error')
        }
    }

    const register = async (userData:any) => {
        try {
          const res = await axios.post("/api/register", userData);
          setUser(res.data.user);
          const token = res.data.access_token;
          localStorage.setItem("authToken", token);
          axios.defaults.headers.common.Authorization = "Bearer " + token;
        } catch (error) {
          if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message);
          }
          throw new Error("Unknown error");
        }
      };
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
        register,
        logout,
        
    }
}





export function useGet<T>(path: string) {  
    const [data, setData] = useState<T[]>([])
    
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(path)   
            .then(res => setData(res.data))
            .finally(() => {
                setLoading(false)
            })
    }, [path])
    

    return {
        data, loading, setData
        
    }
}