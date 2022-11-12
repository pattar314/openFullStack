// name. initialstate, reducers


import { combineReducers } from 'redux'
import blogSlice from '../reducers/blogSlice'
import notificationSlice from '../reducers/notificationSlice'
import usernameSlice from '../reducers/usernameSlice'
import authSlice from '../reducers/authSlice'








const combinedReducer = combineReducers({ blogs: blogSlice, username: usernameSlice, auth: authSlice, notification: notificationSlice } )

export default combinedReducer