import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Blog = ({ blog, addLike }) => {

  const [expanded, setExpanded] = useState(false)

  const showBlog = { display: (expanded ? '' : 'none') }
  const expandedStyles = ( expanded ? 'expandedTop' : 'block'  )



  /*
  const deleteButton = () => (
    <button onClick={() => deleteBlog(blog.id)}>delete</button>
  )
 */

  return(
    <>
      <div className='blog-wrapper'>
        <div className={`${expandedStyles} blog-content`}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author} <button onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'show'}</button>
          </Link>
        </div>
        <div className="expandedBottom" style={showBlog}>
          <b>URL: </b><div className="url">{blog.url}</div>
          <div className="likes"><b>Likes: </b><span className='like-counter'>{blog.likes} </span> <button id='like-button' onClick={() => addLike(blog) }>Like</button></div>
        </div>
      </div>
    </>
  )
}

export default Blog