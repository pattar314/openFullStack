import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import  { likeBlog } from '../reducers/blogSlice'
import { findBlog } from '../services/blogs'

const SingleBlogView = () => {
  const dispatch = useDispatch()
  const blogID = useParams().id
  const userlist = useSelector(state => state.users.userlist)
  const selectedUser = useSelector(state => state.users.selectedUser)
  const currentBlog = selectedUser.find(u => u._id === blogID)
  console.log('current blog (needed): ', currentBlog)
  const secondOpinion = findBlog(userlist, blogID)
  console.log('there was a second opinion: ', secondOpinion)

  console.log('userlist grabbed successfully: ', userlist)

  const addComment = ( data ) => {
    return data
  }

  return (
    <>
      <h1>{ currentBlog.content }</h1>

      <a href={currentBlog.url}>{currentBlog.url}</a>
      <div>{currentBlog.likes} likes <button onClick={dispatch(likeBlog(currentBlog._id))} >like</button></div>
      <form onSubmit={addComment}><input>comment</input><button type='submit'>add comment</button> </form>
    </>

  )
}

export default SingleBlogView