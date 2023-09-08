import React, { useState } from 'react'
import { Link, Navigate, json, useNavigate } from 'react-router-dom'

const Register = () => {
  const [regInfo, setRegInfo] = useState({
    email: '',
    password: '',
    bio: '',
    image: null,
  })
  const navigate = useNavigate()

  // image converting
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onabort = (error) => reject(error)
      reader.readAsDataURL(file)
    })
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    getBase64(file).then((base64) => {
      localStorage['img'] = base64
      console.debug('File Store', base64)
    })
  }

  const users = localStorage.getItem('users')
    ? JSON.parse(localStorage.getItem('users'))
    : []
  const handleRegister = (e) => {
    e.preventDefault()
    users.push(regInfo)
    localStorage.setItem('users', JSON.stringify(users))
    navigate('/login')
  }

  return (
    <section className='max-width flex-evenly items-center'>
      <div>
        <div className='flex  justify-center items-center h-screen'>
          <div>
            <h1 className='text-4xl font-bold uppercase mt-10'>Register Now</h1>

            <form onSubmit={handleRegister} className='flex flex-col' action=''>
              <input
                onChange={(e) =>
                  setRegInfo({ ...regInfo, email: e.target.value })
                }
                type='text'
                placeholder='Email'
                className='input-border py-4  my-5   w-[500px]  px-3'
              />
              <input
                onChange={(e) =>
                  setRegInfo({ ...regInfo, password: e.target.value })
                }
                type='password'
                placeholder='Password'
                className='py-4  my-5 input-border w-[500px]  px-3'
              />

              <textarea
                onChange={(e) =>
                  setRegInfo({ ...regInfo, bio: e.target.value })
                }
                type='text'
                placeholder='Your bio'
                className='py-4  my-5 input-border w-[500px]  px-3'
              />

              <input
                onChange={(e) => handleImageUpload(e)}
                type='file'
                placeholder='Email'
                className='file-input w-full max-w-xs'
              />

              <div className='flex gap-4 py-4 mt-20'>
                <button type='submit' className='btn btn-accent'>
                  Register
                </button>

                <Link to='/login'>
                  <button className='text-blue-700'>
                    Already Registered ?
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
