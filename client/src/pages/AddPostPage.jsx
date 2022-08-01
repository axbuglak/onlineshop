import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createPost } from '../store/features/posts/postSlice'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleSubmit = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const clearFormHandler = () => {
    setText('')
    setTitle('')
  }
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-1/3 mx-auto h-2/3 mt-20 rounded-md px-3 py-5 shadow-md bg-slate-800"
    >
      <h1 className="text-lg text-white text-center">Create a post</h1>
      <label className="text-xs text-gray-300">
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mt-1 text-gray-300 w-full rounded-lg bg-slate-700 border py-1 px-2 text-xs outline-none placeholder:text-gray-500 border-gray-500"
        />
      </label>
      <label className="text-xs text-gray-300 block mt-2">
        Image:
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="hidden"
        />
      </label>
      <label className="text-xs text-gray-300">
        Description:
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Your description"
          className="mt-1 text-gray-300 w-full rounded-lg bg-slate-700 border py-1 px-2 text-xs outline-none placeholder:text-gray-500 border-gray-500"
        />
      </label>

      <div className="flex gap-x-5 justify-center mt-4">
        <button
          onClick={handleSubmit}
          className="px-2 py-1 rounded-md text-white text-sm bg-slate-700 hover:bg-slate-800 transition-all"
        >
          Create post
        </button>

        <button
          onClick={clearFormHandler}
          className="px-2 py-1 rounded-md text-white text-sm bg-slate-700 hover:bg-slate-800 transition-all"
        >
          Clear form
        </button>
      </div>
    </form>
  )
}