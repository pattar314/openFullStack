import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from '../services/auth'

export const initalizeUserlist = () => {
  return async dispatch => {
    const retrievedUsers = await getUsers()
    console.log('userlist reducer: ', retrievedUsers)
    dispatch(setUserlist(retrievedUsers))
  }
}

const usersSlice = createSlice({
  name: 'users',
  initialState: { selectedUser: null, userlist: [] },
  reducers: {
    'setSelectedUser': (state, action) => ({ ...state, selectedUser: action.payload }),
    'logoutAction': ( state ) => ({ ...state, currentUser: null }),
    'setUserlist': ( state , action) => ({ ...state, userlist: action.payload })
  }
})

export const { loginAction, logoutAction, setUserlist } = usersSlice.actions
export default usersSlice.reducer