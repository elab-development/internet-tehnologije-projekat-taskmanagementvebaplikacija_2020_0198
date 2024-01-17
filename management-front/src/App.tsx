import React from 'react';
import './App.css';
import { useUser } from './hooks';
import { Route, Routes } from 'react-router';

function App() {
  const { user, loading } = useUser();

  if (loading) {
    return null;
  }

  if (!user) {
    return (
      <div>
        <Routes>
          <Route path='*' element={<div>Login</div>} />
        </Routes>
      </div>
    )
  }
  if (user.role === 'Admin') {
    return (
      <div>
        <Routes>
          <Route path='*' element={<div>Projects</div>} />
          <Route path='/categories' element={<div>Categories</div>} />
          <Route path='/project/:id' element={<div>Project</div>} />
        </Routes>
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
