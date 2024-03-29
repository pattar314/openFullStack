// import React, { useEffect } from 'react'
import Blog from './Blog'
import blogService from './../services/blogs'
import BlogAddForm from './BlogAddForm'
import Toggleable from './Toggleable'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog, likeBlog, setBlogs } from '../reducers/blogSlice'
import { useEffect } from 'react'

const Main = ({ newNotification }) => {

  const state = useSelector(state => state)
  const blogList = useSelector(state => state.blogs.blogList)
  const dispatch = useDispatch()
  const setBlogState = ( data ) => {
    dispatch(setBlogs(data))
  }



  useEffect( () => {
    console.log('main page load')
  }, [])




  const createNewBlog = async (newBlog) => {
    let auth = blogService.createAuthorization()
    console.log('authorization created: ', auth)
    let response = await axios.post('/api/blogs', newBlog, auth.options)
    if(response.status === 201){
      console.log('add form response: ', response)
      const toSend = {
        content: `Blog: ${response.data.title} added successfully`,
        status: 'success'
      }
      newNotification(toSend)
      dispatch(addBlog(newBlog))
    }
  }


  const deleteBlog = async (blogId) => {
    // TODO fix authorization issues probably build request
    let auth = blogService.createAuthorization()

    const deletedBlog = await axios.delete(`/api/blogs/${blogId}`, auth.options)
    console.log('deletedBlog', deletedBlog)

    let newList = state.blogs.filter((blog) => blog.id !== blogId)
    setBlogState(newList)
  }


  const addLike = async (blog) => {
    const body = {
      ...blog,
      likes: blog.likes + 1
    }
    console.log('body:', body)

    try{
      const auth = blogService.createAuthorization()

      let updatedBlog = await axios.put(`/api/blogs/${blog.id}`, body, auth.options)
      if (updatedBlog.status === 200 || updatedBlog.status === 201){
        const data = updatedBlog.data
        dispatch(likeBlog(data))
      }else {
        console.log('there was an error in else')
      }
    }catch(error){
      console.log('there was an error: ', error)
    }
  }


  return (
    <>
      <div className='list-topper'>
        <h2>Blog List</h2>
        <Toggleable buttonLabel='new blog'>
          <BlogAddForm className='blogForm' blogChange={createNewBlog} />
        </Toggleable>
      </div>
      { blogService.sortBlogs(blogList.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} addLike={addLike} />
      )) }


    </>


  )
}

export default Main