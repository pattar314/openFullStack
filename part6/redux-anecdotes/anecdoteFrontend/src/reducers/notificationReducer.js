import { createSlice  } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: '',
  reducers: {
    setNotification(state, action){
      return action.payload
    },
    clearNotification(state, action){
      return ''
    }
  }
})

export const { setNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer