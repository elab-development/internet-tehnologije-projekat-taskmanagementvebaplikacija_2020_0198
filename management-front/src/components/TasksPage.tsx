import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useGet } from '../hooks';
import { Task } from '../model';

const SIZE = 10;

export default function TasksPage() {
    const [search, setSearch] = useState('');
    const searchLower = search.toLowerCase();
    const [page, setPage] = useState(0);
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('name');
    
    
    const { data: tasks } = useGet<Task>('/api/tasks');
    const filteredTasks = tasks.filter(task => {
        return task.name.toLowerCase().includes(searchLower) ||
            task.description.toLowerCase().includes(searchLower) ||
            task.project.name.toLowerCase().includes(searchLower);
    });

    const sortedTasks = filteredTasks
    .slice(page * SIZE, SIZE * (page + 1))
    .sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
        } else {
            return b.name.localeCompare(a.name, undefined, { sensitivity: 'base' });
        }
    });

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
                <div className="sort-options">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">Name</option>
                        {/* Dodajte opcije za dodatne atribute po kojima želite sortirati */}
                    </select>
                    <label>Order:</label>
                    <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
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
                    {sortedTasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.name}</td>
                            <td>{task.status == '1' ? 'Finished' : 'Active'}</td>
                            <td>{task.description}</td>
                            <td>{task.project.name}</td>
                            <td>{task.user.username}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="btn-group mb-3" role="group" aria-label="First group">
                <button type="button" className="btn btn-secondary" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</button>
                {new Array(totalPages).fill(0).map((val, index) => (
                    <button key={index} type="button" className={"btn btn-secondary" + (index === page ? ' active' : '')} onClick={() => setPage(index)}>{index + 1}</button>
                ))}
                <button type="button" className="btn btn-secondary" disabled={page === totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</button>
            </div>
        </div>
    );
}