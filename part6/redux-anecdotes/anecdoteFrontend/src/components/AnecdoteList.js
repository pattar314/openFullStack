import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
// import anecdoteServices from './../services/anecdotes'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector(state => state.filter)
  // console.log('filter update: ', filter)
  const regx = new RegExp( filter )


  const anecdotes = useSelector(state => state.anecdotes)
  const filteredAnecdotes = anecdotes.filter(a => regx.exec(a.content.toLowerCase()))

  const listVote = async (id) => {
    console.log('vote', id)
    let targetAnecdote = anecdotes.filter(a => a.id === id)
    targetAnecdote = targetAnecdote[0]
    console.log('target', targetAnecdote)
    dispatch(vote(id))
    console.log('vote casted for: ', targetAnecdote.content)
    dispatch(setNotification(`you voted for: ${targetAnecdote.content}`))
  }

  const sortedAnecdotes = () => {
    // for some reason it was not letting me sort the original list so I had to copy it and modify the copy
    const originalAnecdotes = (filter ? [...filteredAnecdotes] : [...anecdotes])
    const modifiedAnecdotes = originalAnecdotes.sort((a, b) =>   a.votes - b.votes).reverse()
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
          <button onClick={() => listVote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </>
    
  )
}

export default AnecdoteList