import { createSlice  } from "@reduxjs/toolkit"



export const getId = () => (100000 * Math.random()).toFixed(0)

/* const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
 */

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action){
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      return state.concat(newAnecdote)
    },
    anecdoteVote(state, action){
      const modifiedState = state.map(anecdote => anecdote.id === action.payload ? {...anecdote, votes : anecdote.votes + 1} : anecdote)
      return modifiedState
    },
    appendAnecdotes(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { addAnecdote, anecdoteVote, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer