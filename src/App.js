import React from 'react'
import HomeScreen from './Pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import ProfilePage from './Pages/ProfilePage'

const App = () => {
  return (
<Routes>
<Route path="/" element={<HomeScreen />} />
<Route path="/profile" element={<ProfilePage />} />
  
</Routes>
  )
}

export default App

