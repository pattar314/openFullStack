import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from './../services/blogs'
import Notification from './Notification'
import BlogAddForm from './BlogAddForm'

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

  return (
    <>
      <h2>blogs</h2>
      <p>{ username } is logged in <button onClick={logout}>Logout</button></p>
      <BlogAddForm newNotification={newNotification} blogChange={blogChange} />
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      ) }
    </>
    
    
  )
}

export default Main