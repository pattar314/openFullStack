import React, { useState } from "react"
import axios from "axios"


const Blog = ({blog, deleteBlog, addLike}) => {
  
  const [expanded, setExpanded] = useState(false)

  const showBlog = { display: (expanded ? '' : 'none')}
  const expandedStyles = ( expanded ? 'expandedTop' : ''  )

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

  console.log('blog: ', blog)

  const storedUser = JSON.parse(window.localStorage.getItem('blogUser'))
  const storedUsername = storedUser.username

  const deleteButton = () => (
    <button onClick={() => deleteBlog(blog.id)}>delete</button>
  )


return(
    <>
    <div>
    <div className={expandedStyles}>
      {blog.title} - {blog.author} <button onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'show'}</button>
    </div>  
    <div className="expandedBottom" style={showBlog}>
      <div className="url"><b>URL: </b>{blog.url}</div>
      <div className="likes"><b>Likes: </b>{blog.likes}  <button onClick={() => addLike(blog)}>Like</button></div>
      { storedUsername === blog.user[0].username ? deleteButton() : '' }
    </div>
  </div>
  
  </>
)

  
}

export default Blog