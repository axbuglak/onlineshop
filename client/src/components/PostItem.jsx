import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'

export const PostItem = ({ post }) => {
  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Загрузка...</div>
    )
  }
  return (
    <Link to={`/${post._id}`}>
      <div className="w-11/12 mx-auto h-52 mt-2 rounded-sm px-2 py-1 shadow-md bg-slate-700">
        <div
          className={post.imgUrl ? 'flex rouded-sm h-80' : 'flex rounded-sm'}
        >
          {post.imgUrl && (
            <img
              src={`http://localhost:3002/${post.imgUrl}`}
              alt="img"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-1">
          <p className="text-gray-500 text-xs">{post.username}</p>
          <Moment date={post.createdAt} format="D MMM YYYY" />
        </div>
        <h2 className="text-white text-xl">{post.title}</h2>
        <div className="flex gap-x-3 items-center mt-2">
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiFillEye /> <span>{post.views}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
          </button>
        </div>
      </div>
    </Link>
  )
}
