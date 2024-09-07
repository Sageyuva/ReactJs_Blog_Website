import React from 'react'
import HomeScreen from './Pages/HomePage'
import { Route, Routes } from 'react-router-dom'
import ProfilePage from './Pages/ProfilePage'
import { PostView } from './Pages/PostView'
import ErrorPage from './Pages/ErrorPage'

const App = () => {
  return (
<Routes>
<Route path="/" element={<HomeScreen />} />
<Route path="/profile/:id" element={<ProfilePage />} />
  <Route path='/Post/:id' element={ <PostView/> } />
  <Route path='/*' element={ <ErrorPage/> } />
</Routes>
  )
}

export default App

