import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogAddForm = ({  blogChange }) => {

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
    blogChange(toSend)
  }


  return (
    <>
      <form className='newBlogForm' onSubmit={handleSubmit}>
        Author: <input type='text' name='author' id='author-input' placeholder='Please enter authors name' onChange={handleAuthorChange} /><br />
        Title: <input type='text' name='title' id='title-input' placeholder='Please enter blog title' onChange={handleTitleChange} /><br />
        URL: <input type='text' name='url' id='url-input' placeholder='Please enter blogs home address' onChange={handleUrlChange} /><br />
        <button id='blog-create-button' type='submit'>create</button>
      </form>
    </>
  )
}

BlogAddForm.propTypes = {
  user: PropTypes.object,
  response: PropTypes.object
}

export default BlogAddForm