import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
// import { addAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const submitAnecdote = async (event) => {
    event.preventDefault()
    // await checked
    // first funtion
    let newAnecdote = await dispatch(addAnecdote(event.target.newAnecdoteInput.value))
    // console.log('new anecdote in form : ', newAnecdote)
    dispatch(setNotification(`you added ${newAnecdote.content}`))
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