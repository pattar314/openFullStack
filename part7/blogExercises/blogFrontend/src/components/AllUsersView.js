import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../services/auth'

const AllUsers = () => {
  const currentUser = (useSelector(state => state.users.currentUser))
  const users = useSelector(state => state.users.userlist)
  console.log('current user: ', currentUser)



  return (
    <div>
      <h1>blogs</h1>
      { <> { currentUser } logged in </>  }
      <button onClick={ logout }>logout</button>

      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Users</th><th>blogs created</th>
          </tr>
        </thead>
        < tbody >
          { users.map(( u, index ) => (
            <tr key={ index }>
              <td><Link to={`/users/${u._id}`}>{u.username}</Link></td><td>{u.blogs.length}</td>
            </tr>) )}
        </tbody>

      </table>
    </div>
  )
}

export default AllUsers