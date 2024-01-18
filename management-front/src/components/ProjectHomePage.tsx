import React, { useState } from 'react'
import { useGet } from '../hooks'
import Header from './Header';
import { Category, Project } from '../model';
import { Link } from 'react-router-dom';
import ProjectForm from './ProjectForm';
import axios from 'axios';




export default function ProjectHomePage() {
    const { data: projects, loading, setData: setProjects } = useGet<Project>('/api/projects');
    const { data: categories } = useGet<Category>('/api/categories')
    const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined)
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
                                        <tr className={selectedProject === project ? "table-active" : ''}
                                            onClick={() => {
                                                setSelectedProject(prev => {
                                                    if (prev === project) {
                                                        return undefined;
                                                    }
                                                    return project;
                                                })
                                            }}
                                            key={project.id}>
                                            <td>{project.id}</td>
                                            <td>{project.name}</td>
                                            <td>{project.status == '1' ? 'Finished' : 'Active'}</td>
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
                    <ProjectForm
                        project={selectedProject}
                        categories={categories}
                        onSubmit={async (val) => {
                            if (!selectedProject) {
                                const res = await axios.post('/api/addprojects', val);
                                const project = res.data.data;
                                setProjects(prev => [...prev, project]);
                                return;
                            }
                            const res = await axios.post('/api/updateprojects/' + selectedProject.id, val);
                            const project = res.data.data;
                            setProjects(prev => {
                                return prev.map(val => {
                                    if (val === selectedProject) {
                                        return project
                                    }
                                    return val;
                                })
                            })
                            setSelectedProject(undefined);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
