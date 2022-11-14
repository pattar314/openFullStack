import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogSlice, { likeBlog } from '../reducers/blogSlice'

const SingleBlogView = ({ id }) => {
  const dispatch = useDispatch()
  const userList = useSelector()
  const currentBlog = userList.filter(b => b.id === id)

 /*  const addComment = ( data ) => {

  } */

  return (
    <>
      <h1>{ currentBlog.content }</h1>

      <a href={currentBlog.url}>{currentBlog.url}</a>
      <div>{currentBlog.likes} likes <button onClick={dispatch( likeBlog(currentBlog.id) )} >like</button></div>
      <form onSubmit={addComment}><input>comment</input><button type='submit'>add comment</button> </form>
    </>

  )
}

export default SingleBlogView