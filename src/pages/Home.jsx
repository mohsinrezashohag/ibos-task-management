import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, json, useNavigate } from 'react-router-dom'

const Home = () => {
  const loginUserInfo = JSON.parse(localStorage.getItem('loginUser'))
  const users = JSON.parse(localStorage.getItem('users'))

  const allTask = JSON.parse(localStorage.getItem('allTask'))

  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([])

  // (completed, in progress, pending)
  const [statusCondition, setStatusCondition] = useState(null)

  useEffect(() => {
    console.log(statusCondition)
  }, [statusCondition])

  // handle status change
  const handleStatusChange = (e) => {
    const remainingTask = allTask.filter(
      (task) => task?.title !== selectedTask?.title
    )
    selectedTask.status = e.target.value
    remainingTask.push(selectedTask)
    localStorage.setItem('allTask', JSON.stringify(remainingTask))
    navigate('/')
  }

  // handle member selection
  const handleRadioChange = (e) => {
    const selectedValue = e.target.value
    setSelectedTeamMembers((prevSelected) =>
      prevSelected.includes(selectedValue)
        ? prevSelected.filter((option) => option !== selectedValue)
        : [...prevSelected, selectedValue]
    )
  }
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    // Process the selectedOptions array as needed
    if (selectedTeamMembers?.length > 0) {
      const remainingTask = allTask.filter(
        (task) => task?.title !== selectedTask?.title
      )
      selectedTask.teamMembers = selectedTeamMembers
      remainingTask.push(selectedTask)

      localStorage.setItem('allTask', JSON.stringify(remainingTask))
      navigate('/')
    } else {
      alert('select team member first')
    }
  }

  return (
    <div className='container mx-auto'>
      <div className='mt-10'>
        <h1 className='text-2xl font-bold mb-4'>All available tasks</h1>

        <div className='bg-gray-300 p-6 rounded-md flex justify-between'>
          <div>
            <h1 className='py-2'>Show based on status</h1>
            <select
              onChange={(e) => {
                setStatusCondition(e.target.value)
              }}
              defaultValue={null}
              className='select w-full max-w-xs'
            >
              <option value={null}>All</option>
              <option>Inprogress</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <h1 className='py-2'>Show based on priority</h1>
            <select
              onChange={(e) => {
                setStatusCondition(e.target.value)
              }}
              className='select w-full max-w-xs'
            >
              <option defaultChecked>All</option>
              <option>High</option>
              <option>normal</option>
              <option>optional</option>
            </select>
          </div>
        </div>

        {allTask?.filter((task) => {
          if (statusCondition === 'Inprogress') {
            return task.status === 'Inprogress'
          } else if (statusCondition === 'Completed') {
            return task?.status === 'Completed'
          } else {
            return task
          }
        }).length > 0 ? (
          <div className='overflow-x-auto'>
            <table
              style={{ width: '900px' }}
              className='w-full table-auto text-left'
            >
              {/* head */}
              <thead>
                <tr>
                  <th className='p-2'>Task Name</th>
                  <th className='p-2'>Task Creator</th>
                  <th className='p-2'>Due Date</th>
                  <th className='p-2'>Priority</th>
                  <th className='p-2'>Status</th>
                  <th className='p-2'>Assign Team</th>
                </tr>
              </thead>
              <tbody>
                {allTask?.map((task, index) => (
                  <tr key={index} className='bg-gray-100'>
                    <td className='p-2'>{task?.title}</td>
                    <td className='p-2'>
                      {task?.taskCreator ? task?.taskCreator : 'NA'}
                    </td>
                    <td className='p-2'>{task?.dueDate}</td>
                    <td className='p-2'>{task?.priorityLevel}</td>
                    <td className='p-2'>
                      <select
                        onClick={() => setSelectedTask(task)}
                        onChange={(e) => {
                          handleStatusChange(e)
                        }}
                        defaultValue={task?.status}
                        className='select w-full max-w-xs'
                      >
                        <option disabled>{task?.status}</option>
                        <option>Inprogress</option>
                        <option>Completed</option>
                      </select>

                      {/* {task?.status ? task?.status : 'NA'} */}
                    </td>
                    <td className='p-2'>
                      {task?.teamMembers?.length === 0 ? (
                        <div>
                          {task?.taskCreator === loginUserInfo?.email ? (
                            <button
                              className='btn btn-primary'
                              // onClick={() => setAssignMod((prev) => !prev)}
                              onClick={() => {
                                setSelectedTask(task)
                                document
                                  .getElementById('my_modal_1')
                                  .showModal()
                              }}
                            >
                              Assign team
                            </button>
                          ) : (
                            'Only task creator can assign a team'
                          )}
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedTask(task)
                            document.getElementById('my_modal_2').showModal()
                          }}
                          className='btn btn-secondary'
                        >
                          See assigned team
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dialog id='my_modal_1' className='modal'>
              <div className='modal-box'>
                <h3 className='font-bold text-lg'>
                  Assign Team For :{' '}
                  <span className='font-thin'>{selectedTask?.title}</span>
                </h3>

                <div>
                  <form onSubmit={handleSubmit} action=''>
                    {users.map((user, index) => (
                      <>
                        <label key={index}>
                          <input
                            className='mt-4'
                            type='checkbox'
                            name='options'
                            value={user.email}
                            onChange={handleRadioChange}
                            checked={selectedTeamMembers.includes(user?.email)}
                          />
                          {user?.email}
                        </label>
                        <br />
                      </>
                    ))}

                    <button type='submit' className='mt-6 btn btn-primary'>
                      Assign Team Now
                    </button>
                  </form>
                </div>
                <p className='py-4'>Press ESC key or click outside to close</p>
              </div>
              <form method='dialog' className='modal-backdrop'>
                <button>close</button>
              </form>
            </dialog>

            <dialog id='my_modal_2' className='modal'>
              <div className='modal-box'>
                <h3 className='font-bold text-lg'>
                  Selected Team Members For Task :{' '}
                  <span className='font-normal'>{selectedTask?.title}</span>
                </h3>

                <div>
                  {selectedTask?.teamMembers.map((member, index) => (
                    <p className='font-bold m-2' key={index}>
                      ➡️ {member}
                    </p>
                  ))}
                </div>

                <p className='py-4'>Press ESC key or click outside to close</p>
              </div>
              <form method='dialog' className='modal-backdrop'>
                <button>close</button>
              </form>
            </dialog>
          </div>
        ) : (
          <h1 className=' py-8 uppercase text-red-500'>No task available</h1>
        )}
      </div>

      <div className='py-4 w-30%'>
        <Link to='/create-task'>
          <button className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'>
            Create a new task
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
