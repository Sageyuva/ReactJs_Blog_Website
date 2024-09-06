'use client'

import { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User, X } from 'lucide-react'

export const LoginPage = ({onClose}) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(true)

  const toggleForm = () => setIsLogin(!isLogin)
  const togglePasswordVisibility = () => setShowPassword(!showPassword)
 

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isLogin) {
      console.log('Login')
    } else {
      console.log('Signup')
    }
  }


  return (
    <div className=' z-50 fixed inset bg-black bg-opacity-30 backdrop-blur-sm w-[100%] h-[100vh] flex items-center justify-center'>
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
          {!isLogin && (
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
                  className="bg-gray-700 block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-md leading-5 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
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
