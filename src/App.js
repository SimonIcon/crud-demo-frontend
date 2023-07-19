import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserContext from './context/UserContext'

const App = () => {
  return (
    <UserContext>
      <Navbar />
      <Outlet />
    </UserContext>

  )
}

export default App