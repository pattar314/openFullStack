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
    blogChange(toSend)
    dispatch(resetInput)
  }


  return (
    <>
      <form className='newBlogForm' onSubmit={handleSubmit}>
        Author: <input type='text' name='author' id='author-input' placeholder='Please enter authors name' onChange={ () => (dispatch(setAuthorInput)) } /><br />
        Title: <input type='text' name='title' id='title-input' placeholder='Please enter blog title' onChange={ () => (dispatch(setTitleInput)) } /><br />
        URL: <input type='text' name='url' id='url-input' placeholder='Please enter blogs home address' onChange={ () => (dispatch(setUrlInput)) } /><br />
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