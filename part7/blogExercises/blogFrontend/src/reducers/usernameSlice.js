import { createSlice } from '@reduxjs/toolkit'

const usernameSlice = createSlice({
  name: 'username',
  initialState: null,
  reducers: {
    'loginHook': (state, action) => action.payload,
    'logoutHook': ( ) => null
  }
})

export const { loginHook, logoutHook } = usernameSlice.actions
export default usernameSlice.reducer