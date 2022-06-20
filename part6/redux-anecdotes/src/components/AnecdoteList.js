import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { anecdoteVote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)
  console.log('filter update: ', filter)
  const regx = new RegExp( filter )


  const anecdotes = useSelector(state => state.anecdotes)
  const filteredAnecdotes = anecdotes.filter(a => regx.exec(a.content.toLowerCase()))
  console.log('filtered anecdotes: ', filteredAnecdotes)

  const vote = (id) => {
    console.log('vote', id)
    let targetAnecdote = anecdotes.filter(a => a.id === id)
    dispatch(anecdoteVote(id))
    targetAnecdote = targetAnecdote[0]
    console.log('target', targetAnecdote)
    dispatch(setNotification(`you voted for ${JSON.stringify(targetAnecdote.content)}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000);
  }

  const sortedAnecdotes = () => {
    // for some reason it was not letting me sort the original list so I had to copy it and modify the copy
    const originalAnecdotes = (filter ? [...filteredAnecdotes] : [...anecdotes])
    const modifiedAnecdotes = originalAnecdotes.sort((a, b) =>   a.votes - b.votes).reverse()
    console.log('sorted anecdotes: ', modifiedAnecdotes)
    return modifiedAnecdotes
  }
  

  return (
    <>
    { sortedAnecdotes().map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </>
    
  )
}

export default AnecdoteList