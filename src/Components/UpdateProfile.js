import { useState } from 'react'
import { X } from 'lucide-react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

export default function UpdateProfile({onClose}) {
  const navigate = useNavigate()
  const api_key = process.env.REACT_APP_SERVER_API;
  // Fixed typo here
  const { id } = useParams();
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const Update = await axios.post(`${api_key}/user/updateuser/${id}` ,{name , bio })
      if (Update.status === 200 ){
        alert("Profile updated successfully")
       window.location.reload()
      }else{
        alert("Failed to update profile")
       navigate("/") 
      }
    } catch (error) {
      alert("server error")
      window.location.reload()
    }

  }

  const handleDelete = async() => {
    try {
      const deleteAccount = await axios.delete(`${api_key}/user/deleteuser/${id}`) // Fixed typo here
      if(deleteAccount.status === 200){
        alert("Account Deleted")
        
        localStorage.clear()
        navigate("/") 
      } else {
        alert("Failed to delete account")
        
        localStorage.clear()
        navigate("/")
      }
    } catch (error) {
      alert("server error")
      localStorage.clear()
      navigate("/") 
    }
  }

  return (
    <div className="fixed inset w-[100%] z-50 bg-opacity-40 backdrop-blur-sm min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-700 rounded-lg shadow-lg relative">
        <div onClick={onClose} className="absolute top-2 right-2">
          <X className="text-white cursor-pointer" size={24} />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#6363c2]">Update Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md font-semibold bg-gray-500 px-4 py-2 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-white">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1 block w-full rounded-md font-semibold bg-gray-500 px-4 py-2 border-transparent focus:border-gray-500 focus:bg-gray-600 focus:ring-0 text-white"
                placeholder="Tell us about yourself"
                rows={4}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
              onClick={handleSubmit}
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-[#6363c2] font-semibold text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full sm:w-auto px-4 py-2 font-semibold bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Delete Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
