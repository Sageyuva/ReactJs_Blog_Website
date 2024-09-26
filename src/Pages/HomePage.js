'use client'

import { useState, useEffect } from 'react'
import { LogOut, Search, Menu, X, User, PenSquare, Users } from 'lucide-react'
import { LoginPage } from '../Components/LoginPage'
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material'
import PostCard from '../Components/PostCard'
import { useNavigate } from 'react-router-dom'
import AddBlog from '../Components/AddBlog'

export default function HomeScreen() {
  const navigate = useNavigate()
  const api_key = process.env.REACT_APP_SERVER_API
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState(false)
  const [allBlogs, setAllBlogs] = useState([]) // This will hold the filtered blogs
  const [originalBlogs, setOriginalBlogs] = useState([]) // Store unmodified blogs here
  const [Loading, setLoading] = useState(true)
  const [addVlog, setaddVlog] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('') // Added state for selected filter
  const [searchInput, setSearchInput] = useState('') // State to hold search input

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api_key}/post/allposts`)
      const blogs = response.data.reverse()
      setOriginalBlogs(blogs) // Store the unmodified blog data here
      setAllBlogs(blogs) // Initialize `allBlogs` with the fetched data
      setLoading(false)
    } catch (error) {
      alert('Server Issue')
      localStorage.clear()
    }
  }

  const handleLogOut = () => {
    localStorage.clear()
    setIsLoggedIn(false)
    window.location.reload()
  }

  const handleProfile = () => {
    const id = localStorage.getItem('userid')
    navigate(`/profile/${id}`)
  }

  const handleallUsers = () => {
    navigate('/allusers')
  }

  const menuItems = [
    { icon: User, text: 'Profile', onClick: handleProfile },
    { icon: Users, text: 'All Users', onClick: handleallUsers },
    { icon: LogOut, text: 'Logout', onClick: handleLogOut },
  ]

  // Filter logic: always filter based on `originalBlogs` to avoid filtering already filtered data
  const filterAll = () => {
    setAllBlogs(originalBlogs)
  }

  const filterGeneral = () => {
    const filtered = originalBlogs.filter((blog) => blog.tag === 'general')
    setAllBlogs(filtered)
  }

  const filterEducation = () => {
    const filtered = originalBlogs.filter((blog) => blog.tag === 'education')
    setAllBlogs(filtered)
  }

  const filterSports = () => {
    const filtered = originalBlogs.filter((blog) => blog.tag === 'sports')
    setAllBlogs(filtered)
  }

  const filterPolitics = () => {
    const filtered = originalBlogs.filter((blog) => blog.tag === 'politics')
    setAllBlogs(filtered)
  }

  const filterBusiness = () => {
    const filtered = originalBlogs.filter((blog) => blog.tag === 'business')
    setAllBlogs(filtered)
  }

  const filterTechnology = () => {
    const filtered = originalBlogs.filter((blog) => blog.tag === 'technology')
    setAllBlogs(filtered)
  }

  // Function to handle search
  const handleSearch = () => {
    if (searchInput.trim() === '') {
      setAllBlogs(originalBlogs) // If the search input is empty, reset the blogs to original
    } else {
      const filtered = originalBlogs.filter((blog) =>
        blog.heading.toLowerCase().includes(searchInput.toLowerCase()) ||
        blog.caption.toLowerCase().includes(searchInput.toLowerCase())
      )
      setAllBlogs(filtered)
    }
  }

  const filterItems = [
    { text: 'All', onClick: filterAll },
    { text: 'General', onClick: filterGeneral },
    { text: 'Education', onClick: filterEducation },
    { text: 'Politics', onClick: filterPolitics },
    { text: 'Sport', onClick: filterSports },
    { text: 'Business', onClick: filterBusiness },
    { text: 'Technology', onClick: filterTechnology },
  ]

  useEffect(() => {
    fetchData()
    const loggedinUser = localStorage.getItem('user')
    const expirationTime = localStorage.getItem('expirationTime')
    if (loggedinUser && expirationTime && new Date().getTime() < expirationTime) {
      setIsLoggedIn(true)
    } else {
      localStorage.clear()
    }
  }, [])

  return (
    <div className="min-h-screen dark:bg-[#111827]">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
      {loginForm && <LoginPage onClose={() => setLoginForm(false)} />}
      {addVlog && <AddBlog onClose={() => setaddVlog(false)} />}
      <div className="bg-[#f4f4f4] dark:bg-[#111827] text-gray-900 dark:text-white">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white dark:bg-[#111827] shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[#6363c2]">SAGE-Blogs</h1>
              {isLoggedIn && (
                <nav className="hidden md:flex space-x-4">
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={item.onClick}
                      className="flex font-bold items-center space-x-1 text-gray-600 hover:text-[#6363c2] dark:text-gray-300 dark:hover:text-[#6363c2]"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.text}</span>
                    </button>
                  ))}
                </nav>
              )}
              <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                  <button
                    className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={toggleMenu}
                  >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setLoading(true)
                      setLoginForm(true)
                      setLoading(false)
                    }}
                    className="bg-[#6363C2] px-4 py-2 font-semibold rounded-md"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 z-30 bg-gray-900 bg-opacity-50 ${isMenuOpen ? 'block' : 'hidden'}`}
          onClick={toggleMenu}
        >
          <div
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out"
            style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <div className="p-6">
              <nav className="space-y-4">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={item.onClick}
                    className="flex items-center space-x-2 text-gray-600 hover:text-[#6363c2] dark:text-gray-300 dark:hover:text-[#6363c2]"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.text}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className='w-[100%] my-2 px-3 flex gap-3 items-center justify-center'>
          <input
            type="text"
            className='flex-1 bg-gray-700 rounded-md outline-none font-semibold text-white text-xl px-4 py-2'
            placeholder='Enter text'
            value={searchInput} // Bind the input field to the state
            onChange={(e) => setSearchInput(e.target.value)} // Update state on input change
          />
          <button onClick={handleSearch} className='bg-[#6363c2] font-semibold text-white rounded-md px-4 py-2 text-xl'>
            Search
          </button>
        </div>

        {/* Filter Items */}
        <div className="w-[100%] px-3 items-center overflow-y-hidden overflow-x-scroll flex gap-3 h-[60px]">
          {filterItems.map((filter, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedFilter(filter.text) // Set the selected filter
                filter.onClick() // Call the associated filter function
              }}
              className={`rounded-md font-semibold h-[40px]  px-4 py-2 ${
                selectedFilter === filter.text ? 'bg-[#6363c2]' : 'bg-gray-700'
              }`}
            >
              {filter.text}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogs.map((post) => (
              <PostCard key={post._id} id={post._id} title={post.heading} content={post.caption} tag={post.tag} />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 py-4 mt-8">
          <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            &copy; 2023 SAGE-Blogs. All rights reserved.
          </div>
        </footer>

        {/* New Post Button */}
        {isLoggedIn && (
          <button
            onClick={() => setaddVlog(true)}
            className="font-semibold fixed right-6 bottom-6 z-50 bg-[#6363c2] hover:bg-[#5252a3] text-white px-4 py-2 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 flex items-center space-x-2"
          >
            <PenSquare className="w-5 h-5" />
            <span>New post</span>
          </button>
        )}
      </div>
    </div>
  )
}
