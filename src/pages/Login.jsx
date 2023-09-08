import React, { useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  const allUsers = JSON.parse(localStorage.getItem('users'))

  const navigate = useNavigate()
  const handleLogin = (e) => {
    e.preventDefault()

    if (loginInfo.email && loginInfo.password) {
      const user_exist = allUsers.find((user) => user.email === loginInfo.email)

      if (user_exist) {
        if (
          user_exist.email === loginInfo.email &&
          user_exist.password === loginInfo.password
        ) {
          localStorage.setItem('loginUser', JSON.stringify(loginInfo))
          navigate('/')
        } else {
          alert('password or email is wrong')
        }
      } else {
        alert('user not registered. please register first')
      }
    }

    // if (
    //   userInfo.email === loginInfo.email &&
    //   userInfo.password === loginInfo.password
    // ) {
    //   localStorage.setItem('loginUser', JSON.stringify(userInfo))
    //   navigate('/')
    // } else {
    //   alert('password is wrong')
    // }
  }
  return (
    <section className='max-width flex-evenly items-center'>
      <div>
        <div className='flex  justify-center items-center h-screen'>
          <div>
            <h1 className='text-4xl font-bold uppercase mt-10'>Login Now</h1>

            <form onSubmit={handleLogin} className='flex flex-col' action=''>
              <input
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, email: e.target.value })
                }
                type='text'
                placeholder='Username/Email'
                className='input-border py-4  my-5   w-[500px]  px-3'
              />
              <input
                onChange={(e) =>
                  setLoginInfo({ ...loginInfo, password: e.target.value })
                }
                type='text'
                placeholder='Password'
                className='py-4  my-5 input-border w-[500px]  px-3'
              />
              <div className='flex gap-4 py-4'>
                <button type='submit' className='btn btn-accent'>
                  Login
                </button>
                <Link to='/register'>
                  <button className='text-blue-700'>Not Registered ?</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
