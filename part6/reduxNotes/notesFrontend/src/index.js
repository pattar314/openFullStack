import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'
import { createNote } from './reducers/noteReducer'
import './index.css'
import App from './App'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)


store.subscribe(() => console.log('new state: ', store.getState()))
store.dispatch(filterChange('IMPORTANT'))
store.dispatch(createNote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root'))
.render(
  <Provider store={ store }>
    <App />
  </Provider>
)
