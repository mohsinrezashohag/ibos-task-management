import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/avatar.png'
import Navbar from '../components/Navbar'

const Profile = () => {
  const navigate = useNavigate()

  const loginUserInfo = JSON.parse(localStorage.getItem('loginUser'))
  const userImage = localStorage.getItem('img')

  const detailsInfo = JSON.parse(localStorage.getItem('users')).find(
    (user) => user?.email === loginUserInfo.email
  )

  // my assigned task
  const allTask = JSON.parse(localStorage.getItem('allTask'))
  const myTasks = allTask?.filter((task) =>
    task?.teamMembers.includes(detailsInfo.email)
  )

  // team assign & invitation functionality
  const [selectedTask, setSelectedTask] = useState(null)

  const users = JSON.parse(localStorage.getItem('users'))
  const systemUsers = users?.filter(
    (user) => user?.email !== loginUserInfo?.email
  )
  const handleInvitationSend = (user) => {
    console.log(user)
    console.log(selectedTask)

    const invitedUsers = []
    console.log(user)
    const invitation_Info = {
      invitedBy: detailsInfo?.email,
      invitedTaskTitle: selectedTask?.title,
      invitedTaskTo: [...invitedUsers, user],
    }
    invitedUsers.push(invitation_Info)
    localStorage.setItem('invitations', JSON.stringify(invitedUsers))
    navigate('/see-profile')
  }

  // my invitations
  const myInvitations = JSON.parse(localStorage.getItem('invitations'))?.filter(
    (item) => item.invitedTaskTo.includes(detailsInfo?.email)
  )

  // accept invitations functionalities
  const handleAcceptInvitations = (InvitedTask) => {
    const allTask = JSON.parse(localStorage.getItem('allTask'))
    const invitedActualTask = allTask.find(
      (task) => task?.title === InvitedTask?.invitedTaskTitle
    )
    invitedActualTask.teamMembers.push(...InvitedTask.invitedTaskTo)
    const remainingTask = allTask.filter(
      (task) => task?.title !== InvitedTask?.invitedTaskTitle
    )
    remainingTask.push(invitedActualTask)
    localStorage.setItem('allTask', JSON.stringify(remainingTask))

    myInvitations.filter(
      (item) => item?.invitedTaskTitle !== InvitedTask?.invitedTaskTitle
    )
    localStorage.setItem('invitations', JSON.stringify(myInvitations))

    navigate('/')
  }

  // logout functionality
  const handleLogout = () => {
    localStorage.removeItem('loginUser')
    localStorage.removeItem('img')
    navigate('/login')
  }

  return (
    <>
      <Navbar></Navbar>
      <div className='flex justify-evenly items-center h-screen'>
        <div className='flex flex-col'>
          <img
            className='rounded-md'
            src={userImage ? userImage : avatar}
            alt=''
            width='200px'
          />
          <div className=' mt-6'>
            <h2>
              <span className='font-bold'>Your Email :</span> <br />{' '}
              {detailsInfo.email}
            </h2>

            <h5>
              <span className='font-bold'>Your Bio :</span> <br />{' '}
              {detailsInfo.bio}
            </h5>
          </div>
          <div>
            <button
              onClick={() => handleLogout()}
              className='btn btn-error inline-block w-32 mt-10'
            >
              Logout
            </button>
            <Link to='/'>
              {' '}
              <button
                className='btn btn-link
             inline-block  mt-10'
              >
                Back in home page
              </button>
            </Link>
          </div>
        </div>

        <div>
          <div>
            <h1 className='uppercase text-2xl font-bold  my-4'>
              My Assigned Task
            </h1>
            {myTasks?.length > 0 ? (
              <div className='overflow-x-auto'>
                <table
                  style={{ width: '900px' }}
                  className='w-full table-auto text-left'
                >
                  {/* head */}
                  <thead>
                    <tr>
                      <th className='p-2'>Task Name</th>
                      <th className='p-2'>Due Date</th>
                      <th className='p-2'>Priority</th>
                      <th className='p-2'>Status</th>
                      <th className='p-2'>Current Team</th>
                      <th className='p-2'>Make Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myTasks?.map((task, index) => (
                      <tr key={index} className='bg-gray-100'>
                        <td className='p-2'>{task?.title}</td>
                        <td className='p-2'>{task?.dueDate}</td>
                        <td className='p-2'>{task?.priorityLevel}</td>
                        <td className='p-2'>
                          {task?.status ? task?.status : 'NA'}
                        </td>
                        <td className='p-2'>
                          {task?.teamMembers.map((member, index) => (
                            <>
                              <p key={index}>{member}</p>
                              <br />
                            </>
                          ))}
                        </td>

                        <td className='p-2'>
                          <button
                            onClick={() => {
                              setSelectedTask(task)
                              document.getElementById('my_modal_1').showModal()
                            }}
                            className='btn btn-primary'
                          >
                            Make team or invite a team mate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <dialog id='my_modal_1' className='modal'>
                  <div className='modal-box'>
                    <h3 className='font-bold text-lg'>
                      Sent Invitation for task :{' '}
                      <span className='text-normal'>{selectedTask?.title}</span>
                    </h3>

                    <div>
                      <h1>Users to the system are not in team</h1>

                      <div>
                        {systemUsers ? (
                          <div className='overflow-x-auto'>
                            <table className='table'>
                              {/* head */}
                              <thead>
                                <tr>
                                  <th>Name</th>
                                  <th>Sent invitation</th>
                                </tr>
                              </thead>
                              <tbody>
                                {systemUsers?.map((user, index) => (
                                  <tr key={index}>
                                    <td>{user?.email}</td>
                                    <td>
                                      <button
                                        onClick={() =>
                                          handleInvitationSend(
                                            (user = user.email)
                                          )
                                        }
                                        className='btn btn-primary'
                                      >
                                        sent invitation
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <h1 className='text-red-500 my-2'>
                            There is no others users to invite
                          </h1>
                        )}
                      </div>
                    </div>
                    <p className='py-4'>
                      Press ESC key or click the button below to close
                    </p>
                    <div className='modal-action'>
                      <form method='dialog'>
                        <button className='btn'>Close</button>
                      </form>
                    </div>
                  </div>
                </dialog>
              </div>
            ) : (
              <h1 className='text-3xl text-red-500 my-8'>
                {' '}
                No task assigned to you
              </h1>
            )}
          </div>

          <div>
            <h1 className='uppercase text-2xl font-bold  my-4'>
              Pending Invitations
            </h1>
            {myInvitations?.length > 0 ? (
              <div>
                <table
                  style={{ width: '900px' }}
                  className='w-full table-auto text-left'
                >
                  <thead>
                    <tr>
                      <th className='p-2'>Task Name</th>
                      <th className='p-2'>Invited By</th>
                      <th className='p-2'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myInvitations?.map((item, index) => (
                      <tr key={index} className='bg-gray-100'>
                        <td className='p-2'>{item?.invitedTaskTitle}</td>
                        <td className='p-2'>
                          <p>user name</p>
                        </td>
                        <td className='p-2'>
                          <button
                            onClick={() => handleAcceptInvitations(item)}
                            className='btn btn-primary me-4'
                          >
                            Accept
                          </button>
                          <button className='btn btn-error'>reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h1 className='text-3xl text-red-500 my-8'>
                No Pending Invitations
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
