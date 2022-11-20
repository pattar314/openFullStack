import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './services/store'
import { initalizeUserlist } from './reducers/usersSlice'
import { initializeBlogs } from './reducers/blogSlice'

initalizeUserlist()
initializeBlogs()

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'))