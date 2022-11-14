import { createSlice } from '@reduxjs/toolkit'


const usersSlice = createSlice({
  name: 'users',
  initialState: { currentUser: null, userlist: [] },
  reducers: {
    'loginHook': (state, action) => ({ ...state, currentUser: action.payload }),
    'logoutHook': ( state ) => ({ ...state, currentUser: null }),
    'setUserList': ( state , action) => ({ ...state, userlist: action.payload })
  }
})

export const { loginHook, logoutHook, setUserList } = usersSlice.actions
export default usersSlice.reducer