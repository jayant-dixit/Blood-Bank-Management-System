import React, { createContext, useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Cookies from 'js-cookie'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import ScheduleDonation from './Pages/scheduleDonation'
import NearbyPage from './Pages/NearbyEntities'
import Admin from './Pages/Admin'

export const Context = createContext({ isAuthenticated: false, isLoading: false })

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  }, [])
  
  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading, setIsLoading }}>
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/scheduleDonation' element={<ScheduleDonation />} />
        <Route path='/location/nearby' element={<NearbyPage/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </Router>
    </Context.Provider>
  )
}

export default App
