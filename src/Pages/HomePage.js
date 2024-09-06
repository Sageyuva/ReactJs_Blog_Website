'use client'

import { useState, useEffect } from 'react'
import { LogOut, Search, Menu, X, Home, User, PenSquare, Users, Settings } from 'lucide-react'
import { LoginPage } from '../Components/LoginPage'
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material'

export default function HomeScreen() {
  const  api_key =  process.env.REACT_APP_SERVER_API
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState(false)
  const [allBlogs, setAllBlogs] = useState([])
  const [Loading, setLoading] = useState(true)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api_key}/post/allposts`);
      const reversedData = response.data.reverse();
      setAllBlogs(reversedData);
      console.log(reversedData);
      setLoading(false);
    } catch (error) {
      alert("Server Issue");
      localStorage.clear();
    }
  }

  const menuItems = [
    { icon: Home, text: 'Home' },
    { icon: User, text: 'Profile' },
    { icon: Users, text: 'All Users' },
    { icon: Settings, text: 'Settings' },
    { icon:LogOut , text:'Logout'}
  ]

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="min-h-screen dark:bg-[#111827]">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      {loginForm && <LoginPage onClose={() => setLoginForm(false)} />}
      <div className="bg-[#f4f4f4] dark:bg-[#111827] text-gray-900 dark:text-white">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white dark:bg-[#111827] shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[#6363c2]">SAGE-Blogs</h1>
              {isLoggedIn ? (
                <nav className="hidden md:flex space-x-4">
                  {menuItems.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="flex font-bold items-center space-x-1 text-gray-600 hover:text-[#6363c2] dark:text-gray-300 dark:hover:text-[#6363c2]"
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.text}</span>
                    </a>
                  ))}
                </nav>
              ) : null}
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
                      setLoading (true);
                      setLoginForm(true);
                      setLoading (false);
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
          className={`md:hidden fixed inset-0 z-30 bg-gray-900 bg-opacity-50 ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          onClick={toggleMenu}
        >
          <div
            className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out"
            style={{ transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <div className="p-6">
              <nav className="space-y-4">
                {menuItems.map((item, index) => (
                  <a
                    key={index}
                    href="#"
                    className="flex items-center space-x-2 text-gray-600 hover:text-[#6363c2] dark:text-gray-300 dark:hover:text-[#6363c2]"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.text}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  className="w-full p-2 pl-10 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              </div>
              <button className="bg-[#6363c2] hover:bg-[#5252a3] text-white font-semibold py-2 px-4 rounded-r-md transition duration-300 ease-in-out">
                Search
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allBlogs.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-[#1f2937] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-[#6363c2] mb-2">{post.heading}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{post.caption}</p>
                </div>
                <button className="bg-[#6363c2] hover:bg-[#5252a3] text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 self-start">
                  Read more
                </button>
              </article>
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
        {isLoggedIn ? (
          <button className="font-semibold fixed right-6 bottom-6 z-50 bg-[#6363c2] hover:bg-[#5252a3] text-white px-4 py-2 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110 flex items-center space-x-2">
            <PenSquare className="w-5 h-5" />
            <span>New post</span>
          </button>
        ) : null}
      </div>
    </div>
  )
}
