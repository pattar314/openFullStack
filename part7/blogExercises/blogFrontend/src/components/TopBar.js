import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setCurrentUser } from '../reducers/authSlice'
import { logoutAction } from '../reducers/usersSlice'

const TopBar = () => {

  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.auth.currentUser)

  const logout = () => {
    dispatch( logoutAction() )
    dispatch( setCurrentUser( null) )
    window.localStorage.removeItem( 'blogUser' )
  }

  return (
    <nav className='top-bar'>
      <Link to='/    ' className='nav-link'><h3>blogs</h3></Link>
      <Link to='/users' className='nav-link'><h3>users</h3></Link>
      <span className='username-banner'><h2>Current user: { currentUser.username }</h2></span>
      <button onClick={ logout } className='logout-button'>logout</button>
    </nav>
  )
}

export default TopBar