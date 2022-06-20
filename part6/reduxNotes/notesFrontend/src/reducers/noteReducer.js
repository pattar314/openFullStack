import { createSlice } from "@reduxjs/toolkit"

const generateID = () => Number((Math.random() * 10000000).toFixed(0))
 
/* 
const noteReducer = ( state = initialState, action) => {

  switch(action.type){
    case('NEW_NOTE'): 
      return  state.concat(action.data)
    case('TOGGLE_IMPORTANCE'): {
      const id = action.data.id
      const noteToChange = state.find( n => n.id === id)
      const changedNote = {
        ...noteToChange, 
        important: !noteToChange.important
      }
      return state.map( note => 
        note.id !== id ? note : changedNote
        )
    }
    default:
      return state
  }
} */

const noteSlice = createSlice({
  name: 'notes',
  initialState: [ {
      content: 'the app state is in redux store',
      important: true,
      id: 3
    },
     {
      content: 'state changes are made with actions',
      important: false,
      id: 4
    }],
  reducers: {
    createNote(state, action){
      const content = action.payload
      state.push({
        content,
        important: false,
        id: generateID()
      })
    },
    toggleImportanceOf(state, action){
      const id = action.payload
      const noteToChange = state.find( n => n.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important      
      }
      return state.map(note => note.id !== id ? note : changedNote)
    },
    appendNote(state, action){
      state.push(action.payload)
    },
    setNotes(state, action){
      return action.payload
    }
    
  }
})



export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer