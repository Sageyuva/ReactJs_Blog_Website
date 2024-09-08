import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from '@mui/material';
import { X } from 'lucide-react';

export default function AddBlog({ onClose }) { // Update to destructure onClose
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
      const newPost = await axios.post(`${api_key}/post/addpost`, { username, userid, caption, heading, tag });
      setLoading(false);
      alert("Blog Uploaded");
      navigate("/");
      window.location.reload()
    } catch (error) {
      setLoading(true);
      alert("Failed to upload blog");
      setLoading(false);
      window.location.reload();
    }
  };

  useEffect(() => {
    setUserid(localStorage.getItem('userid'));
    setUsername(localStorage.getItem('user'));
  }, []);

  return (
    <div className="w-[100%] z-50 fixed min-h-screen flex items-center justify-center bg-[#111827] bg-opacity-35 backdrop-blur-sm inset p-4">
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md overflow-hidden relative">
        <button 
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-100 focus:outline-none"
          onClick={onClose} // No additional logic here, just calling onClose
        >
          <X size={24} />
        </button>
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-300">Add New Blog</h2>
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
                defaultValue="general"
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
              Add Blog
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
