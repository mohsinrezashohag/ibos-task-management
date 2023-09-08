import { BrowserRouter, Router, Route, Link, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import PrivateRoute from './routeAuth/PrivateRoute'
import PublicRoute from './routeAuth/PublicRoute'
import Profile from './pages/Profile'
import CreateTask from './pages/CreateTask'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <Home></Home>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login></Login>
              </PublicRoute>
            }
          ></Route>
          <Route
            path='/register'
            element={
              <PublicRoute>
                <Register></Register>
              </PublicRoute>
            }
          ></Route>
          <Route
            path='/see-profile'
            element={
              <PrivateRoute>
                <Profile></Profile>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path='/create-task'
            element={
              <PrivateRoute>
                <CreateTask></CreateTask>
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
