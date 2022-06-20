import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'
// import noteService from './services/notes'
import noteReducer from './reducers/noteReducer'
import './index.css'
import App from './App'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

// noteService.getAll().then(notes => store.dispatch(setNotes(notes)))

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <Provider store={ store }>
    <App />
  </Provider>
)
