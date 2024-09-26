
import React from 'react'
import { Link } from 'react-router-dom'

const PostCard = (props) => {
    const id = props.id
    const title = props.title
    const content = props.content
    const tag = props.tag


    const trimmedCaption =content.length > 150
  ? content.substring(0, 200) + "..."
  : content;
  

  const trimmedHeading = title.length > 15 ? title.substring(0,20)   + "...": title ;
 
    return (
    <>
        <article
                className="bg-white relative dark:bg-[#1f2937] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-bold text-[#6363c2] mb-2">{trimmedHeading}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{trimmedCaption}</p>
                  <h4 className="text-gray-600 absolute -top-1 -right-1  border-2 border-[#6363c2]  w-fit px-4 py-1 rounded-full dark:text-gray-300 mb-4">{tag}</h4>
                </div>
                <Link to={`/Post/${id}`}>
                <button className="bg-[#6363c2]  hover:bg-[#5252a3] text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 self-start">
                  Read more
                </button>
                </Link>
              </article>
    </>
  )
}

export default PostCard