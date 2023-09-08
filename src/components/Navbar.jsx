import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'

const Navbar = () => {
  const usersInfo = JSON.parse(localStorage.getItem('loginUser'))
  const userImage = localStorage.getItem('img')

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('loginUser')
    localStorage.removeItem('img')
    navigate('/login')
  }

  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost normal-case text-xl'>Task Management</a>
      </div>
      <div className='flex-none'>
        <img
          className='w-16 rounded-md h-12'
          src={userImage ? userImage : avatar}
        />
        <Link to='/see-profile'>
          {' '}
          <button className='btn btn-active btn-link'>See Profile</button>
        </Link>
        <button onClick={() => handleLogout()} className='btn btn-error'>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar
