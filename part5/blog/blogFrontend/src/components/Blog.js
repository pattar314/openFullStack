import React, { useState } from 'react'


const Blog = ({ blog, deleteBlog, addLike, storedUser }) => {

  const [expanded, setExpanded] = useState(false)

  const showBlog = { display: (expanded ? '' : 'none') }
  const expandedStyles = ( expanded ? 'expandedTop' : 'block'  )

  /*   const addLike = (blogId) => {
    // TODO set function to update likes, the update function should already be in the router I think
    const body = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    try{
      let updatedNote = axios.put(`/api/blogs/${blog.id}`, body)
      console.log('updated note: ', updatedNote)
      if (updatedNote.status === 200){
        console.log('blog updated')
      }else {
        console.log('there was an error in else')
      }
    }catch(error){
      console.log('there was an error: ', error)
    }
  } */



  const deleteButton = () => (
    <button onClick={() => deleteBlog(blog.id)}>delete</button>
  )


  return(
    <>
      <div className='blog-wrapper'>
        {console.log('blog: ', blog,  `blog user: ${JSON.stringify(blog.user)}`)}
        <div className={`${expandedStyles} blog-content`}>
          {blog.title} - {blog.author} <button onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'show'}</button>
        </div>
        <div className="expandedBottom" style={showBlog}>
          <b>URL: </b><div className="url">{blog.url}</div>
          <div className="likes"><b>Likes: </b><span className='like-counter'>{blog.likes} </span> <button id='like-button' onClick={() => addLike(blog)}>Like</button></div>
          { storedUser === blog.user.username ? deleteButton() : '' }
        </div>
      </div>
    </>
  )
}

export default Blog