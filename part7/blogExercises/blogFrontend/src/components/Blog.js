import React, { useState } from 'react'


const Blog = ({ blog, deleteBlog, storedUser, addLike }) => {

  const [expanded, setExpanded] = useState(false)

  const showBlog = { display: (expanded ? '' : 'none') }
  const expandedStyles = ( expanded ? 'expandedTop' : 'block'  )




  const deleteButton = () => (
    <button onClick={() => deleteBlog(blog.id)}>delete</button>
  )


  return(
    <>
      <div className='blog-wrapper'>
        <div className={`${expandedStyles} blog-content`}>
          {blog.title} - {blog.author} <button onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'show'}</button>
        </div>
        <div className="expandedBottom" style={showBlog}>
          <b>URL: </b><div className="url">{blog.url}</div>
          <div className="likes"><b>Likes: </b><span className='like-counter'>{blog.likes} </span> <button id='like-button' onClick={() => addLike(blog) }>Like</button></div>
          {console.log(`storedUser: ${storedUser}, blog.user.username:, ${blog.user.username}`)}
          { storedUser === blog.user.username ? deleteButton() : '' }
        </div>
      </div>
    </>
  )
}

export default Blog