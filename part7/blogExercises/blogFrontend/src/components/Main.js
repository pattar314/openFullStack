import React, { useEffect } from 'react'
import Blog from './Blog'
import blogService from './../services/blogs'
import BlogAddForm from './BlogAddForm'
import Toggleable from './Toggleable'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, setBlogs } from '../reducers/blogSlice'

const Main = ({ username, logout, newNotification }) => {

  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const setBlogState = ( data ) => {
    dispatch(setBlogs(data))
  }

  console.log('processed username: ', username)


  useEffect( () => {
    blogService.getAll().then(retrievedBlogs => {
      setBlogState( retrievedBlogs )
      console.log('blog state: ', state.blogs)
    }
    )
  }, [])

  const createAuthorization = () => {
    const localUser = window.localStorage.getItem('blogUser')
    const converted = JSON.parse(localUser)
    const authorization = `Bearer ${converted.token}`

    const options = {
      headers: { Authorization: authorization }
    }

    return { converted, authorization, options }
  }



  const createNewBlog = async (newBlog) => {
    let auth = createAuthorization()
    // console.log('authorization created: ', auth)
    let response = await axios.post('/api/blogs', newBlog, auth.options)
    if(response.status === 201){
      // console.log('add form response: ', response)
      const toSend = {
        content: `Blog: ${response.data.title} added successfully`,
        status: 'success'
      }
      newNotification(toSend)
      setBlogState( [...state.blogs, response.data])
    }
  }


  const deleteBlog = async (blogId) => {
    // TODO fix authorization issues probably build request
    let auth = createAuthorization()

    const deletedBlog = await axios.delete(`/api/blogs/${blogId}`, auth.options)
    console.log('deletedBlog', deletedBlog)

    let newList = state.blogs.filter((blog) => blog.id !== blogId)
    setBlogState(newList)
  }


  const addLike = async (blog) => {
    const body = {
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    console.log('body:', body)

    try{
      const auth = createAuthorization()

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

  /*
    const newBlogList = blogs.filter((blog) => blog.id !== blogId)
    blogService.deleteBlog(newBlogList)
    setBlogState(newBlogList)

 */
  return (
    <>
      <h2>blogs</h2>
      <p>{ username } is logged in <button onClick={logout}>Logout</button></p>
      <Toggleable buttonLabel='new blog'>
        <BlogAddForm  blogChange={createNewBlog} />
      </Toggleable>
      { blogService.sortBlogs(state.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} addLike={addLike} storedUser={username} />
      )) }


    </>


  )
}

export default Main