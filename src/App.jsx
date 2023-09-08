import { BrowserRouter, Router, Route, Link, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import PrivateRoute from './routeAuth/PrivateRoute'
import PublicRoute from './routeAuth/PublicRoute'

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
