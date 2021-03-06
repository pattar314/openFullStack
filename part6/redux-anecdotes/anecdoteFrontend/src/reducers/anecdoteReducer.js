import { createSlice  } from "@reduxjs/toolkit"
import anecdoteServices from './../services/anecdotes'
// import axios from "axios"



export const getId = () => {
  const id = (100000 * Math.random()).toFixed(0)
  console.log('id is: ', id)
  return id
}

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

export const { anecdoteVote, appendAnecdotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteServices.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    let processed = await anecdoteServices.createNew(content)
    console.log('add anecdote processed: ', processed)
    await dispatch(appendAnecdotes(processed))
    return processed
  }
}

export const vote = (id) => {
  return async dispatch => {

    // async service function returns data
    // action to modify state based on retrieved data




    const service = await anecdoteServices.castVote(id)
    console.log('vote response: ', service)

    const updatedState2 = dispatch(anecdoteVote(id))
    console.log('updated state2: ', updatedState2)

  

    return updatedState2

    /*  
    console.log('av: ', av)

    console.log('voted: ', voted)
    
    return av  
    */
  }  
}