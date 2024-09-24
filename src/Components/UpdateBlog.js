import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';

export default function UpdateBlog() { 
    const { id } = useParams();
    const api_key = process.env.REACT_APP_SERVER_API;
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [userid, setUserid] = useState("");
    const [heading, setHeading] = useState("");
    const [caption, setCaption] = useState("");
    const [tag, setTag] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const newPost = await axios.post(`${api_key}/post/updatepost/${id}`, { username, userid, caption, heading, tag });
            console.log(newPost);
            alert("Blog Updated");
            setLoading(false);
            navigate("/");
        } catch (error) {
            alert("Failed to update blog");
            setLoading(false);
            navigate("/");
        }
    }

    const fetchBlogData = async () => {
        const localUserid = localStorage.getItem('userid');
        const localUsername = localStorage.getItem('user');
   
        setUserid(localUserid);
        setUsername(localUsername);
    
        try {
            const thatBlog = await axios.get(`${api_key}/post/onepost/${id}`);
            console.log(thatBlog.data);
    
            // Compare localUserid with the blog's userid directly
            if (thatBlog.data.userid === localUserid) {
                setCaption(thatBlog.data.caption);
                setHeading(thatBlog.data.heading);
                setTag(thatBlog.data.tag);
            } else {
                alert("You are not the owner of this blog");
                navigate("/");
            }
        } catch (error) {
            alert("Server is not working");
            navigate("/");
        }
    };
    

    useEffect(() => {
        fetchBlogData();
    }, []);

    return (
        <div className="w-[100%] z-50 fixed min-h-screen flex items-center justify-center bg-[#111827] p-4">
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="w-[100%] bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
                <div className="p-6 space-y-6">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-4 left-4 text-white bg-[#6363c2] px-4 py-2 rounded-md hover:bg-[#5252a3]"
                    >
                        Back
                    </button>
                    <h2 className="text-2xl font-bold text-center text-gray-300">Update Blog</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="heading" className="block text-sm font-medium text-gray-300">
                                Heading
                            </label>
                            <input
                                value={heading}
                                onChange={(e) => setHeading(e.target.value)}
                                className="mt-1 font-semibold bg-gray-700 px-4 text-gray-300 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#6363c2] focus:ring focus:ring-[#6363c2] focus:ring-opacity-50"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="caption" className="block text-sm font-medium text-gray-300">
                                Caption
                            </label>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                rows="3"
                                className="mt-1 block w-full rounded-md h-[150px] font-semibold py-2 bg-gray-700 px-4 text-gray-300 border-gray-300 shadow-sm focus:border-[#6363c2] focus:ring focus:ring-[#6363c2] focus:ring-opacity-50"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                                Category
                            </label>
                            <select
                                value={tag}
                                onChange={(e) => setTag(e.target.value)}
                                id="category"
                                name="category"
                                className="mt-1 block w-full rounded-md font-semibold bg-gray-700 px-4 text-gray-300 py-2 border-gray-300 shadow-sm focus:border-[#6363c2] focus:ring focus:ring-[#6363c2] focus:ring-opacity-50"
                            >
                                <option value="general">General</option>
                                <option value="education">Education</option>
                                <option value="politics">Politics</option>
                                <option value="sports">Sports</option>
                                <option value="technology">Technology</option>
                                <option value="business">Business</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#6363c2] hover:bg-[#5252a3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6363c2]"
                        >
                            Update Blog
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
