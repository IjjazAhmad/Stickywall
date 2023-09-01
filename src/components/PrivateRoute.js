import React from 'react'
import { useAuthContext } from '../pages/Context/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

export default function PrivateRoute({ Component }) {
    const location = useLocation()
    const { isAuth } = useAuthContext()
     
    if (!isAuth) {
      return <Navigate to='/auth/signin' state={{ from: location.pathname }} replace />
    }
  
    return (
    <>
        <Component />
    </>
    )
}
