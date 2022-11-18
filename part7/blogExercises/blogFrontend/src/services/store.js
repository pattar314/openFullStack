import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../reducers/authSlice'
import blogSlice from '../reducers/blogSlice'
import notificationSlice from '../reducers/notificationSlice'
import usersSlice from '../reducers/usersSlice'




const store = configureStore({
  reducer : { blogs: blogSlice , users: usersSlice, auth: authSlice, notification: notificationSlice }
})

export default store