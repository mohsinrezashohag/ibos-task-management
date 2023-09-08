import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const CreateTask = () => {
  const loginUserInfo = JSON.parse(localStorage.getItem('loginUser'))

  const [taskInfo, setTaskInfo] = useState({
    title: '',
    description: '',
    dueDate: '',
    priorityLevel: '',
    status: null,
    teamMembers: [],
    taskCreator: loginUserInfo?.email,
  })

  const navigate = useNavigate()

  const allTask = JSON.parse(localStorage.getItem('allTask'))
    ? JSON.parse(localStorage.getItem('allTask'))
    : []

  const handleTaskCreation = (e) => {
    e.preventDefault()
    allTask.push(taskInfo)
    localStorage.setItem('allTask', JSON.stringify(allTask))
    navigate('/')
  }

  return (
    <>
      <Navbar></Navbar>
      <div>
        <section className='max-width flex-evenly items-center'>
          <div>
            <div className='flex  justify-center items-center h-screen'>
              <div>
                <h1 className='text-4xl font-bold uppercase mt-10'>
                  Create Task
                </h1>

                <form
                  onSubmit={handleTaskCreation}
                  className='flex flex-col mt-3'
                  action=''
                >
                  <input
                    onChange={(e) =>
                      setTaskInfo({ ...taskInfo, title: e.target.value })
                    }
                    required
                    type='text'
                    placeholder='task title'
                    className='input input-bordered input-md w-full max-w-xs my-2'
                  />
                  <input
                    onChange={(e) =>
                      setTaskInfo({ ...taskInfo, description: e.target.value })
                    }
                    required
                    type='text'
                    placeholder='task description'
                    className='input input-bordered input-md w-full max-w-xs my-2'
                  />

                  <input
                    onChange={(e) =>
                      setTaskInfo({ ...taskInfo, dueDate: e.target.value })
                    }
                    required
                    type='date'
                    placeholder='Your bio'
                    className='input input-bordered input-md w-full max-w-xs my-2'
                  />

                  <select
                    onChange={(e) =>
                      setTaskInfo({
                        ...taskInfo,
                        priorityLevel: e.target.value,
                      })
                    }
                    required
                    className='select select-bordered w-full max-w-xs'
                  >
                    <option disabled selected>
                      {taskInfo.priorityLevel}
                    </option>
                    <option>High</option>
                    <option>Normal</option>
                    <option>Optional</option>
                  </select>

                  <div className='flex gap-4 py-4 mt-5'>
                    <button type='submit' className='btn btn-accent'>
                      Create Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default CreateTask
