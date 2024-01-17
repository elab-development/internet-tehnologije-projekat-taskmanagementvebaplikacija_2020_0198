export interface Category {
    id: number,
    name: string
}

export interface Project {
    id: number,
    name: string,
    status: string,
    description: string,
    start_date: string,
    end_date: string,
    priority: string,
    category_id: number,
}

export interface Task {
    id: number,
    name: string,
    status: string,
    description: string,
    project: Project,
    user: User
}

export interface User {
    id: number,
    username: string,
    firstname: string,
    lastname: string,
    position: string,
    email: string,
    role: string,
}