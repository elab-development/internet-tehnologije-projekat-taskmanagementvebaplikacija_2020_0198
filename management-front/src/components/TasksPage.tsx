import React, { useEffect, useState } from 'react'
import Header from './Header'
import Form from './Form'
import { useGet } from '../hooks'
import { Task } from '../model';

const SIZE = 10;

export default function TasksPage() {
    const [search, setSearch] = useState('')
    const searchLower = search.toLowerCase();
    const [page, setPage] = useState(0);
    const { data: tasks } = useGet<Task>('/api/tasks');
    const filteredTasks = tasks.filter(task => {
        return task.name.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower) ||
            task.project.name.toLowerCase().includes(searchLower)
    })
    const totalPages = Math.ceil(filteredTasks.length / SIZE);
    return (
        <div className='px-5 task-page'>
            <Header content='Tasks' center />
            <div>
                <input
                    type="text"
                    className='form-control'
                    placeholder='Search...'
                    value={search}
                    onChange={e => {
                        setSearch(e.currentTarget.value);
                        setPage(0);
                    }}
                />
            </div>
            <table className='table mt-2 task-table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Project</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredTasks.slice(page * SIZE, SIZE * (page + 1)).map(task => {
                            return (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.name}</td>
                                    <td>{task.status}</td>
                                    <td>{task.description}</td>
                                    <td>{task.project.name}</td>
                                    <td>{task.user.username}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="btn-group mb-3" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary" onClick={() => setPage(p => p - 1)}>Previous</button>
                {
                    new Array(totalPages).fill(0).map((val, index) => {
                        return (
                            <button key={index} type="button" className={"btn btn-secondary" + (index === page ? ' active' : '')} onClick={() => setPage(index)}>{index + 1}</button>
                        )
                    })
                }
                <button type="button" className="btn btn-secondary" onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </div>
    )
}
