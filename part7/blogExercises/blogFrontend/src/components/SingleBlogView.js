import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setSelectedBlog } from '../reducers/blogSlice'
import  { createComment } from '../reducers/blogSlice'
import blogServices from '../services/blogs'

const SingleBlogView = ({ addLike }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  // const [comments, setComments] = useState([])

  const fetchBlog = async ( ) => {
    const selectedBlog = await blogServices.findBlog(blogID)
    console.log('fetch: ', selectedBlog)
    setUsername(selectedBlog.user.username)
    dispatch(setSelectedBlog(selectedBlog))
    // selectedBlog.comments ? setComments(selectedBlog.comments) : null
  }

  useEffect(() => {
    fetchBlog()
  }, [])


  const blogID = useParams().id
  const userlist = useSelector(state => state.users.userlist)
  console.log('userlist: ', userlist)
  const selectedBlog = useSelector(state => state.blogs.selectedBlog)
  console.log('selectedBLog (required): ', selectedBlog)

  const addComment = ( id, comment  ) => {
    dispatch(createComment(id, comment))
  }

  /*
  const commentList = () => {
    if(comments !== []){
      console.log('comments: ', comments)
      return comments.map(c => {
        <div className='comment-card'>{c}</div>
      })
    } else {
      return ['No comments yet would you like to add one?']
    }
  }
 */

  return (
    <>
      <h1 className='blog-title'>{ selectedBlog.title }</h1>

      <a href={selectedBlog.url}>{selectedBlog.url}</a>
      <div>{selectedBlog.likes} likes <button onClick={ () => addLike(selectedBlog) }>like</button></div>
      <div>added by { username } </div>
      <form onSubmit={addComment}><input placeholder='comment'/><button type='submit'>add comment</button> </form>
      <section className='comment-section'>
      </section>
    </>

  )
}

export default SingleBlogView