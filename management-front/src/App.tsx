import React from 'react';
import './App.css';
import { useGet, useUser } from './hooks';
import { Route, Routes } from 'react-router';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import ProjectHomePage from './components/ProjectHomePage';
import { Category } from './model';
import TasksPage from './components/TasksPage';

function App() {
  const { user, loading, login, logout } = useUser();
  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <div>
        <Routes>
          <Route path='*' element={<LoginPage login={login} />} />
        </Routes>
      </div>
    )
  }
  if (user.role === 'Admin') {
    return (
      <div className='page'>
        <Navbar user={user} logout={logout} />
        <div className='page-content'>
          <Routes>
            <Route path='*' element={<ProjectHomePage />} />
            <Route path='/tasks' element={<TasksPage />} />
          </Routes>
        </div>
      </div>
    )
  }

  return (
    <div>
      Trenutno postoji podrska samo za admin korisnike
    </div>
  )
}

export default App;
