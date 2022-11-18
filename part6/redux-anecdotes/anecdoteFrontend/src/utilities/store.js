import { configureStore } from "@reduxjs/toolkit"
import anecdoteSlice from "../reducers/anecdoteReducer"
import filterSlice from "../reducers/filterReducer"
import notificationSlice from "../reducers/notificationReducer"


 const store = configureStore({
  reducer: {
    anecdotes: anecdoteSlice,
    notification: notificationSlice,
    filter: filterSlice
  }
})


export default store