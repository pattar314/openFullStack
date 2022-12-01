import axios from 'axios'
import React, { useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { likeBlog } from '../reducers/blogSlice'
import  { addComment } from '../reducers/blogSlice'
import { createAuthorization } from '../services/auth'
import blogService from '../services/blogs'

const SingleBlogView = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth.currentUser)
  const [commentInput, setCommentInput] = useState('')


  const addLike = async (blog) => {
    const body = {
      ...blog,
      likes: blog.likes + 1
    }
    console.log('body:', body)

    try{
      const auth = createAuthorization()
      console.log('auth: ', auth)
      let updatedBlog = await axios.put(`/api/blogs/${blog.id}`, body, auth.options)
      if (updatedBlog.status === 200 || updatedBlog.status === 201){
        const data = updatedBlog.data
        console.log('updated blog data: ', data)
        dispatch(likeBlog(data))
      }else {
        console.log('there was an error in else')
      }
    }catch(error){
      console.log('there was an error: ', error)
    }
  }


  const blogID = useParams().id
  const userlist = useSelector(state => state.users.userlist)
  const selectedBlog = useSelector(state => state.blogs.blogList).filter(b => b.id === blogID)[0]
  console.log('userlist: ', userlist)
  console.log('selectedBLog (required): ', selectedBlog)

  const comment = ( e ) => {
    e.preventDefault()
    console.log(`id: ${blogID}, comment input: ${commentInput}`, )
    blogService.createComment(blogID, commentInput)
    dispatch( addComment({ id: blogID, comment: commentInput }) )
    setCommentInput('')
  }


  const commentList = () => {
    if(selectedBlog.comments !== []){
      console.log('comments: ', selectedBlog.comments)
      const list = selectedBlog.comments.map((c, index) => <div key={index}>{c}</div>)
      return list
    } else {
      const placeholder = (<div>No comments yet would you like to add one?</div>)
      return placeholder
    }
  }


  return (
    <>
      <h1 className='blog-title'>{ selectedBlog.title }</h1>

      <a href={selectedBlog.url}>{selectedBlog.url}</a>
      <div>{selectedBlog.likes} likes <button onClick={ () => addLike(selectedBlog) }>like</button></div>
      <div>added by { currentUser.username } </div>
      <form onSubmit={comment}><input placeholder='comment' onChange={(e) => setCommentInput(e.target.value)} value={commentInput} /><button type='submit'>add comment</button> </form>
      <section className='comment-section'>
        <h3>comments:</h3>
        {commentList()}
      </section>
    </>

  )
}

export default SingleBlogView