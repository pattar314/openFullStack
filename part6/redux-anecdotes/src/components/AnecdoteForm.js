import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdoteInput.value
    dispatch(addAnecdote(newAnecdote))
    dispatch(setNotification(`you added ${newAnecdote}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    event.target.newAnecdoteInput.value = ''
  }


  return (
    <>
      <h2>create new</h2>
      <form className='anecdoteForm' onSubmit={submitAnecdote}>
        <input name='newAnecdoteInput' />
        <button type='submit'>submit</button>
      </form>
    </>
  )
}

export default AnecdoteForm