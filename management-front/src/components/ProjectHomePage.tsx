import React from 'react'
import { useGet } from '../hooks'
import Header from './Header';
import { Category, Project } from '../model';
import { Link } from 'react-router-dom';




export default function ProjectHomePage() {
    const { data: projects, loading } = useGet<Project>('/api/projects');
    const { data: categories } = useGet<Category>('/api/categories')
    if (loading) {
        return null;
    }
    return (
        <div className='px-5'>
            <Header center content='Projects' />
            <div className='row'>
                <div className='col-8'>
                    <table className='table'>
                        <thead>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Start</th>
                            <th>End</th>
                            <th>Priority</th>
                            <th>Category</th>
                        </thead>
                        <tbody>
                            {
                                projects.map(project => {
                                    return (
                                        <tr key={project.id}>
                                            <td>{project.id}</td>
                                            <td>{project.name}</td>
                                            <td>{project.status}</td>
                                            <td>{project.description}</td>
                                            <td>{project.start_date}</td>
                                            <td>{project.end_date}</td>
                                            <td>{project.priority}</td>
                                            <td>{categories.find(cat => cat.id == project.category_id)?.name}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className='col-4'>

                </div>
            </div>
        </div>
    )
}