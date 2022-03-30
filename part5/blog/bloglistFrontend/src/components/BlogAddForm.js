import axios from 'axios'
import React, { useState } from 'react'

const BlogAddForm = ({newNotification, blogChange}) => {

  const [author, setAuthor] = useState(null)
  const [title, setTitle] = useState(null)
  const [url, setUrl] = useState(null)

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleSubmit = async (form) => {
    form.preventDefault()
    const  toSend = {
      title,
      author,
      url
    }

    let user = await JSON.parse(window.localStorage.getItem('blogUser'))
    let token = `Bearer ${user.token}`
    console.log(`blog add token is ${token}`)
    let response = await axios.post('/api/blogs', toSend, { headers: { 'Authorization': token}})
    if(response.status === 201){
      console.log('add form response: ', response)
      const toSend = {
        content: `Blog ${title} added successfully`,
        status: 'success'
      }
      newNotification(toSend)
      blogChange(response.data)
    } else {
      newNotification({content: 'blog creation failed', status: 'failed'})
    }
  }


  return (
    <>
      <form className='newBlogForm' onSubmit={handleSubmit}>
        Author: <input type='text' name='author' onChange={handleAuthorChange} /><br />
        Title: <input type='text' name='title' onChange={handleTitleChange} /><br />
        URL: <input type='text' name='url' onChange={handleUrlChange} /><br />
        <button type='submit'>Create</button>
      </form>
    </>
  )
}

export default BlogAddForm