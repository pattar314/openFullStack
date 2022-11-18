import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './services/store'
// import  { setNotes } from './reducers/noteReducer'
import './index.css'
import App from './App'


// noteService.getAll().then(notes => store.dispatch(setNotes(notes)))

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <Provider store={ store }>
    <App />
  </Provider>
)
