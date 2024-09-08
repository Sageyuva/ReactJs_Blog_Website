import React from 'react'
import HomeScreen from './Pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import ProfilePage from './Pages/ProfilePage'
import { PostView } from './Pages/PostView'
import ErrorPage from './Pages/ErrorPage'
import AddBlog from './Components/AddBlog'

const App = () => {
  return (
<Routes>
<Route path="/" element={<HomeScreen />} />
<Route path="/profile/:id" element={<ProfilePage />} />
  <Route path='/Post/:id' element={ <PostView/> } />
  <Route path="/add" element={<AddBlog />} />
</Routes>
  )
}

export default App

