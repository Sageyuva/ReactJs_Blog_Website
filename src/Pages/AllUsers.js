import { Mail, Calendar, FileText, ArrowLeft } from 'lucide-react'
import { Backdrop, CircularProgress, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function AllUsers() {

    const api_key = process.env.REACT_APP_SERVER_API
    const navigate = useNavigate()
    const [allUsers, setallUsers] = useState([]);
    const [Loading, setLoading] = useState(true)

    const fetchUsers = async() => {
        try {
            const response = await axios.get(`${api_key}/user/fetchUsers`);
            const logged = localStorage.getItem("userid")
            const filteredArray = response.data.filter((user) => user._id !== logged);
            setallUsers(filteredArray);
            setLoading(false);
        } catch (error) {
            alert("Server error")
            setLoading(false); 
            navigate("/")
        }
    } 

    useEffect(()=> {
        fetchUsers()
    },[])

    return (
        <div className="min-h-screen bg-[#111827] p-8">
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Loading}>
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="flex items-center mb-8">
                <IconButton onClick={() => navigate(-1)} color="inherit">
                    <ArrowLeft className="w-6 h-6 text-[#6363c2]" />
                </IconButton>
                <h1 className="text-3xl font-bold text-[#6363c2] ml-4">User Profiles</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allUsers.map((user, index) => (
                    <div onClick={() => navigate(`/profile/${user._id}`)} key={index} className=" cursor-pointer bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-[#6363c2] mb-2">{user.name}</h2>
                                <div className="flex items-center text-gray-300">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span>{user.email}</span>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex items-center text-gray-300 mb-2">
                                    <FileText className="w-4 h-4 mr-2" />
                                    <span className="font-semibold">Bio:</span>
                                </div>
                                <p className="text-gray-300">{user.bio ? user.bio : "Not Available"}</p>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>Joined: {user.createdAt?.slice(0,10)}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
