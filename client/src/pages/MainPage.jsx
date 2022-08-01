import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../store/features/posts/postSlice'

export const MainPage = () => {
  const dispatch = useDispatch()
  const { posts, PopularPosts } = useSelector((state) => state.post)
  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts.length) {
    return <div className='text-white text-center text-xl mt-5'>Loading...</div>
  }
  if (posts.length === 0) {
    return <div className='text-white text-center text-xl mt-5'>No post jet</div>
  }


  return (
    <div>
      {posts?.map((post, idx) => (
        <PostItem key={idx} post={post} />
      ))}
    </div>
  )
}
