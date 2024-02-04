import React from 'react';
import './App.css';
import { useUserContext } from './context/UserContext';
import { Route, Routes } from 'react-router';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import ProjectHomePage from './components/ProjectHomePage';
import TasksPage from './components/TasksPage';
import Header from './components/Header';
import CategoryPage from './components/CategoryPage';
import UserPage from './components/UserPage';
import ResetPassword from './components/ResetPasswordPage';
import ForgotPassword from './components/ForgotPassword';
import RegisterPage from './components/RegisterPage';



function App() {

  const { user } = useUserContext();

  return (

    <div>
    
      
        {
          !user ? (
            <>
             <Navbar />
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/reset' element={<ResetPassword />} />
              </Routes>
            </>
           
          ) : (
            <>

              <div className='page'>
                
              <Navbar  />
              
                <div className='page-content'>
                  <Routes>
                    <Route path='*' element={<ProjectHomePage />} />
                    <Route path='/tasks' element={<TasksPage />} />
                    <Route path='/categories' element={<CategoryPage />} />
                    <Route path='/users' element={<UserPage />} />
                    
                    
                    <Route path='/forgot' element={<ForgotPassword />} />
                  </Routes>

                </div>
              </div>
            </>
          )
        }
          


      
   </div>

  )

}

export default App;

  //const { user, loading, login, register, logout } = useUser();

  /*if (loading) {

    return null;
  }
  

  /*if (!user) {
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
            <Route path='/categories' element={<CategoryPage />} />
            <Route path='/users' element={<UserPage />} />
            <Route path='/reg' element={<Register />} />
            <Route path='/signup' element={<SignUpPage register={register} />} />
            <Route path='/reset' element={<ResetPassword  />} />
            <Route path='/forgot' element={<ForgotPassword  />} />
          </Routes>

        </div>
      </div>
    )
  }

  return (
    <div className='page'>
      <Navbar user={user} logout={logout} />
      <Header center content='User is not admin' />
    </div>
  )*/


