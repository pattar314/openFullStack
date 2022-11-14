import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedUser } from '../reducers/authSlice'
import { logoutHook } from '../reducers/usersSlice'

const UsersView = () => {
  const state = useSelector (state => state)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch( logoutHook() )
    dispatch( setLoggedUser( null) )
    window.localStorage.removeItem( 'blogUser' )
  }

  const users = state.users
  console.log('users: ', users)

  return (
    <div>
      <h1>blogs</h1>
      { <> { state.loggedUser } logged in </>  }
      <button onClick={ logout }>logout</button>

      <h1>Users</h1>
      <table>
        <tr>
          <th>Users</th><th>blogs created</th>
          { users.map(u => {
            <tr>
              <td>{u.username}</td><td>{u.blogs.length}</td>
            </tr>
          }) }
        </tr>
      </table>
    </div>
  )
}

export default UsersView