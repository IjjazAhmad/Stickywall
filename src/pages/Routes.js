import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import Dashboard from './Dashboard'
import Authentication from './Authentication'
import PrivateRoute from '../components/PrivateRoute';
import { useAuthContext } from './Context/AuthContext';
export default function Index() {
  const {isAuth} =useAuthContext()

  return (
    <>
    <Routes>
      <Route path='/*' element={<PrivateRoute Component={Dashboard} />}/>
      <Route path='/auth/*' element={!isAuth? <Authentication/> : <Navigate to='/' /> }/>
    </Routes>
    <ToastContainer />
    </>
  )
}
