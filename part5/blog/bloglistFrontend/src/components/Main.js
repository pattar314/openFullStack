import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from './../services/blogs'
import BlogAddForm from './BlogAddForm'
import Toggleable from './Toggleable'
import axios from 'axios'

const Main = ({ username, logout, newNotification }) => {
  
  const [blogs, setBlogs] = useState([])


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  

  }, [])



  const blogChange = (newBlog) => {
    setBlogs( [...blogs, newBlog])
  }

  const deleteBlog = async (blogId) => {
    // TODO fix authorization issues probably build request 
    const localUser = window.localStorage.getItem('blogUser')
    const converted = JSON.parse(localUser)
    const authorization = `Bearer ${converted.token}`
    
    const options = {
      headers: { Authorization: authorization}
    }
    
    const deletedBlog = await axios.delete(`/api/blogs/${blogId}`, options)
    console.log('deletedBlog', deletedBlog)
    
    let newList = blogs.filter((blog) => blog.id !== blogId)
    setBlogs(newList)
}
  

  const addLike = async (blog) => {
    // TODO set function to update likes, the update function should already be in the router I think
    const body = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    try{
      const localUser = window.localStorage.getItem('blogUser')
      const converted = JSON.parse(localUser)
      const authorization = `Bearer ${converted.token}`
      
    
      const options = {
        headers: { Authorization: authorization}
      }
    
      let updatedNote = await axios.put(`/api/blogs/${blog.id}`, body, options)
      console.log('updated note: ', updatedNote)
      if (updatedNote.status === 200 || updatedNote.status === 201){
        console.log('blog updated')
        blogService.getAll().then(blogs =>
          setBlogs( blogs )
        ) 
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
    setBlogs(newBlogList)

 */
  return (
    <>
    
      <h2>blogs</h2>
      <p>{ username } is logged in <button onClick={logout}>Logout</button></p>
      <Toggleable buttonLabel='new note'>
        <BlogAddForm newNotification={newNotification} blogChange={blogChange} />
      </Toggleable>
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} addLike={addLike} />
      ) }
    

    </>
    
    
  )
}

export default Main