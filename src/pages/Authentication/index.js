import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Signin from './Signin'
import Signup from './Signup'
export default function index() {
  return (
    <>
    <Routes>
      <Route  path='/signin' element={<Signin/>} />
      <Route  path='/signup' element={<Signup/>} />
    </Routes>
    
    </>
  )
}
