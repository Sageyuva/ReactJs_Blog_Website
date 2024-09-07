import React from 'react'
import HomeScreen from './Pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import ProfilePage from './Pages/ProfilePage'
import { PostView } from './Pages/PostView'

const App = () => {
  return (
<Routes>
<Route path="/" element={<HomeScreen />} />
<Route path="/profile" element={<ProfilePage />} />
  <Route path='/Post/:id' element={ <PostView/> } />
</Routes>
  )
}

export default App

