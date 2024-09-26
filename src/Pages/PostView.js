import axios from 'axios';
import { ArrowLeft, Edit, Trash2, Clock, User } from 'lucide-react'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material'

export const PostView = () => {
  const api_key = process.env.REACT_APP_SERVER_API
    const {id} = useParams()
    const [time, settime] = useState("")
    const [heading, setHeading] = useState("")
    const [content, setContent] = useState("")
    const [author, setAuthor] = useState("")
    const navigate = useNavigate();
    const [Loading, setLoading] = useState(true)
    const [userId, setuserId] = useState("")
    const [Owner, setOwner] = useState(false)
    const [tag, settag] = useState("")

    const fetchBlog = async() => {
        try {
      
      const blogData = await axios.get(`${api_key}/post/onepost/${id}`)
      const OnBlog = blogData.data
      setHeading(OnBlog.heading)
      setContent(OnBlog.caption)
      setAuthor(OnBlog.username)
      settime(OnBlog.updatedAt ? OnBlog.updatedAt : OnBlog.createdAt)
      setuserId(OnBlog.userid)
      settag(OnBlog.tag)

      if(OnBlog.userid === localStorage.getItem('userid')) {
        setOwner(true)
      }

      setLoading(false)
      } catch (error) {
        alert("Server failed")
        navigate("/")
      }
    }


    const handlePostDelete = async() => {

try {
  setLoading(true)
  const deletePost = await axios.delete(`${api_key}/post/deletepost/${id}`)
  alert("post deleted")
  setLoading(false)
  navigate("/")
} catch (error) {
  alert("server failed")
  navigate("/")
}

}

    useEffect(()=>{
     fetchBlog()
    },[])


  return (
    (<div className="min-h-screen bg-[#111827] text-white p-6 flex flex-col">
    
      <button onClick={() => { navigate(-1);}} className="flex items-center text-blue-400 hover:text-blue-300 transition-colors mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Back to Posts
      </button>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <article  className="bg-gray-800 relative rounded-lg shadow-lg p-6 mb-6">
      <h4 className="text-gray-600 absolute -top-1 -right-1  border-2 border-[#6363c2]  w-fit px-4 py-1 rounded-full dark:text-gray-300 mb-4">{tag}</h4>
        <h1 className="text-[#6363c2] text-3xl font-bold mb-4">
          {heading}
        </h1>
        
        
        
        <div  className="flex  items-center text-gray-400 mb-4">
          <User size={16} className="mr-2" />
          <span onClick={() => navigate(`/profile/${userId}`)} className="mr-4 cursor-pointer hover:text-[#6363c2]">{author}</span>
          <Clock size={16} className="mr-2" />
          <span>
  {time?.slice(0, 10)} {time?.slice(12,16)} (UTC)
</span>

        </div>
        
        <div className="text-gray-300 mb-6 leading-relaxed space-y-4">
{content}
        </div>
        
        {
          Owner  && <div className="flex justify-end space-x-4">
          <button onClick={() => navigate(`/update/${id}`)} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            <Edit size={16} className="mr-2" />
            Edit
          </button>
          <button onClick={handlePostDelete} className="flex items-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors">
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
        </div>
        }
        
      </article>
    </div>)
  );
}