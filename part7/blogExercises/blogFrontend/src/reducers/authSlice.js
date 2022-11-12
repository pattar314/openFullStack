import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { usernameInput: '', passwordInput: '', loggedUser: '' },
  reducers: {
    'setUsernameInput': (state, action) => {
      return { ...state, usernameInput: action.payload }
    },
    'setPasswordInput': (state, action) => {
      return { ...state, passwordInput: action.payload }
    },
    'setLoggedUser': (state, action) => {
      return { ...state, loggedUser: action.payload }
    }
  }
})

export const { setUsernameInput, setPasswordInput, setLoggedUser } = authSlice.actions
export default authSlice.reducer