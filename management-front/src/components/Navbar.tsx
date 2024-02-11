import React from 'react'
import { NavLink } from 'react-router-dom'
import { User } from '../model';
import { useUserContext } from '../context/UserContext'

/*interface Props {
    user: User,
    logout: () => void
}*/

export default function Navbar() {
    const { user, logout } =  useUserContext();;
  
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        {user ? (
          <>
            <NavLink className='navbar-brand' to='/'>Home</NavLink>
            <div className="collapse navbar-collapse d-flex- justify-content-between align-items-center">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className='nav-link' to='/'>Projects</NavLink>
                </li>
                
                <li className="nav-item">
                  <NavLink className='nav-link' to='/kanbanboard'>Kanban board </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className='nav-link' to='/kalendar'>Calendar </NavLink>
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
               
              </ul>
              <div>
                <span className="navbar-text mr-2">
                  {user.username}
                </span>
                <button className='btn btn-danger mx-2' onClick={logout}>Logout</button>
              </div>
            </div>
          </>
        ) : (
          <div className="collapse navbar-collapse d-flex- justify-content-between align-items-center">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className='nav-link' to='/login'>Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className='nav-link' to='/register'>Register</NavLink>
              </li>
            </ul>
          </div>
        )}
      </nav>
    );
  }