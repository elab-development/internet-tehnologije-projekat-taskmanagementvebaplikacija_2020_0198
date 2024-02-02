import React, { useState } from 'react'
import { useGet } from '../hooks'
import Header from './Header';
import { User } from '../model';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import axios from 'axios';




export default function UserPage() {
    const { data: users, loading, setData: setUsers } = useGet<User>('/api/users');
    const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined)
    if (loading) {
        return null;
    }
    return (
        <div className='px-5'>
            <Header center content='Users' />
            <div className='row'>
                <div className='col-8'>
                    <table className='table'>
                        <thead>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Position</th>
                            <th>Role</th>
                        </thead>
                        <tbody>
                            {
                                users.map(user => {
                                    return (
                                        <tr className={selectedUser === user ? "table-active" : ''}
                                            onClick={() => {
                                                setSelectedUser(prev => {
                                                    if (prev === user) {
                                                        return undefined;
                                                    }
                                                    return user;
                                                })
                                            }}
                                            key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.firstname}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.position}</td>
                                            <td>{user.role}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className='col-4'>

                    {selectedUser ? (
                        

                        <UserForm
                            user={selectedUser}
                            onSubmit={async (val) => {
                                if (!selectedUser) {
                                    <p>Select user</p>
                                }
                                const res = await axios.post('/api/updateusers/' + selectedUser.id, val);
                                const user = res.data.data;
                                setUsers(prev => {
                                    return prev.map(val => {
                                        if (val === selectedUser) {
                                            return user
                                        }
                                        return val;
                                    })
                                })
                                setSelectedUser(undefined);
                            }}
                        />
                    ) : (

                        <p>Select user</p>
                    )}
                </div>
            </div>
        </div>
    )
}
