import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const loginInfo = JSON.parse(localStorage.getItem('loginUser'))
  return loginInfo ? <>{children}</> : <Navigate to='/login' />
}

export default PrivateRoute
