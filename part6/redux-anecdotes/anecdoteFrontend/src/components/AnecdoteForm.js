import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitAnecdote = async (event) => {
    event.preventDefault()
    let newAnecdote = await dispatch(addAnecdote(event.target.newAnecdoteInput.value))
    dispatch(setNotification(`you added ${newAnecdote.content}`))
    let time = null
    clearTimeout(time)
    time = setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
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