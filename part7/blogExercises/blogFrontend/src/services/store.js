import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../reducers/authSlice'
import blogSlice from '../reducers/blogSlice'
import notificationSlice from '../reducers/notificationSlice'
import usernameSlice from '../reducers/usernameSlice'


const store = configureStore({
  reducer : { blogs: blogSlice , username: usernameSlice, auth: authSlice, notification: notificationSlice }
})

export default store