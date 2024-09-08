import { ArrowLeft, Mail, Calendar, BookOpen, User, Slice } from 'lucide-react'
import PostCard from '../Components/PostCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Backdrop, CircularProgress } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

export default function Component() {
  const {id} = useParams()
  const userId = id
  const navigate = useNavigate()
  const api_key = process.env.REACT_APP_SERVER_API
  const [allBlogsofuser, setAllBlogsofuser] = useState([])
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState({})
  const [totalposts , settotalposts] = useState("")
  const [owner , setowner] = useState(false)
  const blogger = {
    name: "Jane Doe",
    totalPosts: 42,
    joinedDate: "2023-01-15",
    email: "jane.doe@example.com",
    bio: "Passionate writer and tech enthusiast. I love to share my thoughts on the latest trends in technology and how they shape our world. When I'm not writing, you can find me exploring new coding projects or enjoying a good book."
  }

  const fetchUserData = async() => {
    try {
      const userData = await axios.post(`${api_key}/user/singleuser`, { userId })
     setUserProfile(userData.data[0])
      const userPosts = await axios.post(`${api_key}/post/postofuser`, { userId })
      setAllBlogsofuser(userPosts.data)
      settotalposts(userPosts.data.length) 
      setLoading(false)
    } catch (error) {
      alert("Server is offline")
      navigate("/")
    }
  }

  useEffect(() => {
    setLoading(true)
    fetchUserData()
    if(userId === localStorage.getItem('userid')){
      setowner(true)
    }
  }, [])

  return (
    <>
      <div className="min-h-screen bg-[#111827] flex items-center flex-col gap-3 justify-center p-4">
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="secondary" />
        </Backdrop>
        <div className="bg-gray-800 rounded-lg shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-[100%]">
          <div className="flex items-center mb-6">
            <button className="text-gray-300 hover:text-[#6363c2] transition-colors flex items-center" onClick={() => navigate(-1)}>
              <ArrowLeft size={24} />
              <span className="ml-2 font-medium">Back</span>
            </button>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#6363c2] text-center">
              {userProfile.name}
            </h2>

            <div className="bg-gray-700 rounded-lg p-4 md:p-6">
              <div className="flex items-center text-gray-300 mb-2">
                <User size={20} className="mr-3 text-[#6363c2]" />
                <span className="font-semibold text-lg">Bio</span>
              </div>
              <p className="text-gray-300 text-sm md:text-base font-semibold">{userProfile.bio ? userProfile.bio : "Not Available"}</p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center text-gray-300">
                <BookOpen size={20} className="mr-3 text-[#6363c2] flex-shrink-0" />
                <span className="font-semibold">Total Posts:</span>
                <span className="ml-auto font-semibold">{totalposts}</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Calendar size={20} className="mr-3 text-[#6363c2] flex-shrink-0" />
                <span className="font-semibold">Joined:</span>
                <span className="ml-auto font-semibold">  {userProfile.createdAt?.slice(0,10)}</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Mail size={20} className="mr-3 text-[#6363c2] flex-shrink-0" />
                <span className="font-semibold">Email:</span>
                <span className="ml-auto font-semibold break-all">{userProfile.email}</span>
              </div>
            </div>

            {
              owner && <button className="w-full bg-[#6363c2] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors font-semibold text-lg">
              Edit Profile
            </button>
            }
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allBlogsofuser.map((post) => {
            return (
              <PostCard key={post._id} id={post._id} title={post.heading} content={post.caption} />
            )
          })}
        </div>
      </div>
    </>
  )
}