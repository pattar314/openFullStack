import noteService from './noteServices'
import { configureStore } from '@reduxjs/toolkit'
import noteReducer, { setNotes } from '../reducers/noteReducer'
import filterReducer from '../reducers/filterReducer'

noteService.getAll().then(notes => store.dispatch(setNotes(notes)))

const store = configureStore({
  reducer: {
    notes: noteReducer ,
    filter: filterReducer
  }
})

export default store