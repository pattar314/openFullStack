import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearLoginInput, setCurrentUser, setPasswordInput, setUsernameInput } from '../reducers/authSlice'
import { loginAction } from '../reducers/usersSlice'
import { login } from '../services/auth'
import { useNavigate } from 'react-router-dom'


const Login = ( { newNotification }) => {

  const usernameInput = useSelector(state => state.auth.usernameInput)
  const passwordInput = useSelector(state => state.auth.passwordInput)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleUsernameChange = (event) => {
    dispatch(setUsernameInput(event.target.value))
  }

  const handlePasswordChange = (event) => {
    dispatch(setPasswordInput(event.target.value))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`Attempting to login with username: ${ usernameInput }, password: ${ passwordInput }`)
    const user = { username: usernameInput, password: passwordInput }
    let retrievedUser = await login(user)
    if (retrievedUser){
      console.log('login succeeded')
      dispatch(setCurrentUser(retrievedUser))
      dispatch(loginAction(retrievedUser.username))
      dispatch(clearLoginInput())
      console.log('app user: ', retrievedUser.username)
      console.log('retrieved user: ', retrievedUser)
      navigate('/')
      newNotification( { content: `${ retrievedUser.username } logged in`, status: 'success' } )
    } else {
      console.log('login failed')
      dispatch( newNotification( { content: 'Login failed', status: 'fail' } ) )
    }
  }



  return (
    <div className='login-container'>
      <div className='login-center'>
        <h1 className='login-banner'>log in to application</h1>
        <form onSubmit={handleLogin} className='login-form'>
          <div>Username:  <input type='text' name='username' value={usernameInput} onChange={ handleUsernameChange } id='usernameInput' /></div>
          <div>Password:  <input type='text' name='password' value={passwordInput} onChange={ handlePasswordChange } id='passwordInput' /></div>
          <button type='submit' className='login-button'>login</button>
        </form>
      </div>
    </div>
  )
}

export default Login