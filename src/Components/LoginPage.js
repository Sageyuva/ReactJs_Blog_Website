'use client'

import { useEffect, useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, X, BookText } from 'lucide-react'
import { Backdrop, CircularProgress } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const LoginPage = ({onClose}) => {
  const api = process.env.REACT_APP_SERVER_API
  const navigate = useNavigate()
  const [name, setname] = useState("")
  const [bio, setbio] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [Loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  const toggleForm = () => setIsLogin(!isLogin)
  const togglePasswordVisibility = () => setShowPassword(!showPassword)
 

  const LoginUser = async(e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const loginuser = await axios.post(`${api}/user/login` , {email, password})
      if(loginuser.status === 200) {
         const loggingemail = loginuser.data.user._id
         const logginname = loginuser.data.user.name
         const expirationTime = new Date().getTime() + 3 * 24 * 60 * 60 * 1000; // 3 days expiration
         localStorage.setItem('user', logginname);
         localStorage.setItem('userid', loggingemail);
         localStorage.setItem('expirationTime', expirationTime);
         setLoading(false)
         window.location.reload()
      } else {
        alert("Server is offline")
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      if(error.code === "ERR_NETWORK") {
        alert("Server is offline")
      } else if(error.response.status === 402) {
        alert("Invalid password, try again")
      } else if(error.response.status === 400) {
        alert("User not found")
      } else {
        alert("Server error, try again later")
      }
    }
  }

  const handleRegister = async(e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      alert("All fields are not filled. Please try again.");
      return;
    }
    
    setLoading(true);
    try {
      const newuser = await axios.post(`${api}/user/register`, { name, email, password ,bio })
      setLoading(false);
      alert("Created new account");
      window.location.reload();
    } catch (error) {
      setLoading(false)
      if(error.response && error.response.status === 400){
        alert("Email is already taken")
      } else {
        alert("Server Busy")
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      LoginUser(e)
    } else {
      handleRegister(e)
    }
  }

  useEffect(() => {
    const loggedinUser = localStorage.getItem('user');
    const expirationTime = localStorage.getItem('expirationTime');
    if(loggedinUser && expirationTime && new Date().getTime() < expirationTime) {
      navigate("/")
      alert("User already loged in")
      window.location.reload()
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userid');
      localStorage.removeItem('expirationTime');
    }
  }, [])

  return (
    <div className=' z-50 fixed inset bg-black bg-opacity-30 backdrop-blur-sm w-[100%] h-[100vh] flex items-center justify-center'>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Loading}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && 
           <>
           <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Bio
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <BookText className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={bio}
                  onChange={(e) => setbio(e.target.value)}
                  className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bio"
                />
              </div>
            </div>
           </>
          }
          <div>
            <label htmlFor="email"  className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) =>  setemail(e.target.value.toLowerCase())}
                className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="password"
                value={password}
                onChange={(e) =>setpassword(e.target.value)}
                className="bg-gray-700 block w-full pl-10 pr-10 py-2 border border-gray-600 rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-400 hover:text-gray-300 focus:outline-none focus:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <button
            onClick={toggleForm}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-300"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  )
}
