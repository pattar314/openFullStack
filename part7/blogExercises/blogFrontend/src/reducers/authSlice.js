import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { usernameInput: '', passwordInput: '', currentUser: null },
  reducers: {
    'setUsernameInput': (state, action) => {
      return { ...state, usernameInput: action.payload }
    },
    'setPasswordInput': (state, action) => {
      return { ...state, passwordInput: action.payload }
    },
    'clearLoginInput': (state) => {
      return { ...state, usernameInput: '', passwordInput: '' }
    },
    'setCurrentUser': (state, action) => {
      console.log('current user redux: ', action.payload)
      return { ...state, currentUser: action.payload }
    }
  }
})

export const { setUsernameInput, setPasswordInput, setCurrentUser, clearLoginInput } = authSlice.actions
export default authSlice.reducer