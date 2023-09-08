import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const loginInfo = JSON.parse(localStorage.getItem('loginUser'))
  return !loginInfo ? <>{children}</> : <Navigate to='/' />
}

export default PublicRoute
