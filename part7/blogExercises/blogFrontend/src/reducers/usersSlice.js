import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../services/auth'

export const initalizeUserlist = () => {
  return async dispatch => {
    const retrievedUsers = await getUsers()
    console.log('userlist: ', retrievedUsers)
    dispatch(setUserlist(retrievedUsers))
  }
}

const usersSlice = createSlice({
  name: 'users',
  initialState: { currentUser: null, userlist: [] },
  reducers: {
    'loginAction': (state, action) => ({ ...state, currentUser: action.payload }),
    'logoutAction': ( state ) => ({ ...state, currentUser: null }),
    'setUserlist': ( state , action) => ({ ...state, userlist: action.payload })
  }
})

export const { loginAction, logoutAction, setUserlist } = usersSlice.actions
export default usersSlice.reducer