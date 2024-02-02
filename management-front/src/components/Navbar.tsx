import React from 'react'
import { NavLink } from 'react-router-dom'
import { User } from '../model';

interface Props {
    user: User,
    logout: () => void
}

export default function Navbar(props: Props) {
    const { user, logout } = props;
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <NavLink className='navbar-brand' to='/'>Admin panel</NavLink>
            <div className="collapse navbar-collapse d-flex- justify-content-between align-items-center" >
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <NavLink className='nav-link' to='/'>Projects</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/tasks'>Tasks</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/categories'>Categories</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/users'>Users</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/reg'>Registration</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/signup'>SignUp</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/reset'>Reset password</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className='nav-link' to='/forgot'>Forgot password</NavLink>
                    </li>
                    
                    
                </ul>
                <div>
                    <span className="navbar-text mr-2">
                        {user.username}
                    </span>
                    <button className='btn btn-danger mx-2' onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
    )
}
