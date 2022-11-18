import { createSlice  } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: '',
  reducers: {
    updateNotification(state, action){
      return action.payload
    },
    clearNotification(state, action){
      return ''
    }
  }
})

export const { updateNotification, clearNotification} = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, seconds=5) => {
  return async dispatch => {
    dispatch(updateNotification(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, (seconds * 1000));
  }
}