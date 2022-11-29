import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { usernameInput: '', passwordInput: '', currentUser: {} },
  reducers: {
    'setUsernameInput': (state, action) => {
      return { ...state, usernameInput: action.payload }
    },
    'setPasswordInput': (state, action) => {
      return { ...state, passwordInput: action.payload }
    },
    'clearLoginInput': () => {
      return { usernameInput: '', passwordInput: '', loggedUser: '' }
    },
    'setCurrentUser': (state, action) => {
      return { ...state, currentUser: action.payload }
    }
  }
})

export const { setUsernameInput, setPasswordInput, setCurrentUser, clearLoginInput } = authSlice.actions
export default authSlice.reducer