import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { resetInput, setAuthorInput, setTitleInput, setUrlInput } from '../reducers/blogSlice'

const BlogAddForm = ({  blogChange }) => {
  const dispatch = useDispatch()

  const author = useSelector(state => state.blogs.blogAddInput.author)
  const title = useSelector(state => state.blogs.blogAddInput.title)
  const url =  useSelector(state => state.blogs.blogAddInput.url)

  const handleSubmit = async (form) => {
    form.preventDefault()
    const  toSend = {
      title,
      author,
      url
    }
    console.log('tosend: ', toSend)
    blogChange(toSend)
    dispatch(resetInput)
  }

  const handleAuthorChange = (e) => {
    dispatch(setAuthorInput(e.target.value))
  }

  const handleTitleChange = (e) => {
    dispatch(setTitleInput(e.target.value))
  }

  const handleUrlChange = (e) => {
    dispatch(setUrlInput(e.target.value))
  }

  return (
    <>
      <form className='newBlogForm' onSubmit={handleSubmit}>
        Author: <input type='text' name='author' id='author-input' placeholder='Please enter authors name' onChange={ handleAuthorChange } /><br />
        Title: <input type='text' name='title' id='title-input' placeholder='Please enter blog title' onChange={ handleTitleChange } /><br />
        URL: <input type='text' name='url' id='url-input' placeholder='Please enter blogs home address' onChange={ handleUrlChange } /><br />
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