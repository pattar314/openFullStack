import {  useEffect } from 'react'
import Main from './components/Main'
import { login } from './services/auth'
import Notification from './components/Notification'
import './styles/temp.css'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { setLoggedUser, setPasswordInput, setUsernameInput } from './reducers/authSlice'
import { loginHook, logoutHook } from './reducers/usernameSlice'
import { setNotification } from './reducers/notificationSlice'
import blogs from './services/blogs'
import { setBlogs } from './reducers/blogSlice'


const App = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  console.log('retrieved state: ', state)
  const loggedUser = state.auth.loggedUser ? state.auth.loggedUser : null
  const username = state.username ? state.username : null
  const usernameInput = state.auth.usernameInput ? state.auth.usernameInput : null
  const passwordInput = state.auth.passwordInput ? state.auth.passwordInput : null
  const message = state.message ? state.message : null



  useEffect(() => {
    let storedUser = window.localStorage.getItem('blogUser')
    if (storedUser){
      console.log('there is a stored user: ', storedUser)
      const processedUser = JSON.parse(storedUser)
      dispatch(setLoggedUser(processedUser))
      dispatch(loginHook(processedUser.username))
    }
    initialBlogs()
  }, [])


  const initialBlogs = async ( ) => {
    const data = await blogs.getAll()
    console.log('the initial blogs are: ', data)
    dispatch(setBlogs(data))
  }



  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`Attempting to login with username: ${ usernameInput }, password: ${ passwordInput }`)
    const user = { username: usernameInput, password: passwordInput }
    let retrievedUser = await login(user)
    if (retrievedUser){
      console.log('login succeeded')
      dispatch(setLoggedUser(retrievedUser))
      dispatch(loginHook(retrievedUser.username))
      console.log('app user: ', username)
      console.log('retrieved user: ', retrievedUser)
      dispatch( setNotification( { content: `${username} logged in`, status: 'success' } ) )
      dispatch(setUsernameInput(null))
      dispatch(setPasswordInput(null))
    } else {
      console.log('login failed')
      dispatch( setNotification( { content: 'Login failed', status: 'fail' } ) )
    }
  }

  const handleLogout = () => {
    dispatch( logoutHook() )
    dispatch( setLoggedUser( null) )
    window.localStorage.removeItem( 'blogUser' )
  }

  const newNotification = ( message ) => {
    console.log( 'app message: ', message )
    dispatch(setNotification( { content: message.content, status: message.status } ) )
    setTimeout( () => {
      dispatch( setNotification(null) )
    }, 3000 )
  }

  const handleUsernameChange = (event) => {
    dispatch(setUsernameInput(event.target.value))
  }

  const handlePasswordChange = (event) => {
    dispatch(setPasswordInput(event.target.value))
  }



  return (
    <div className='main-content'>
      {message ? <Notification content={message.content} status={message.status} />: <></>}
      { loggedUser ? <Main username={loggedUser.username} logout={handleLogout} newNotification={newNotification} />
        : <Login handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
          username={usernameInput}
          password={passwordInput}
        /> }
    </div>
  )
}

export default App
