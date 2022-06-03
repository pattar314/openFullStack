import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitAnecdote = (event) => {
    event.preventDefault()
    const newAnecdote = event.target.newAnecdoteInput.value
   console.log('new anecdote: ', newAnecdote)
    dispatch(addAnecdote(newAnecdote))
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