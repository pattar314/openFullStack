import { useState, useEffect } from 'react'
import Main from './components/Main'
import { login } from './services/auth'
import Notification from './components/Notification'
import './styles/temp.css'


const App = () => {

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState()


  useEffect(() => {
    let storedUser = window.localStorage.getItem('blogUser')
    if (storedUser){
      storedUser = JSON.parse(storedUser)
      console.log('stored user: ', storedUser)
      setUser(storedUser)
      setUsername(storedUser.username)
    }
  }, [])




  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`Attempting to login with username: ${username}, password: ${password}`)
    const user = { username, password }
    let retrievedUser = await login(user)
    if (retrievedUser){
      setUser(retrievedUser)
      setUsername(retrievedUser.username)
      console.log('app user: ', username)
      console.log('retrieved user: ', retrievedUser)
      setUsername(null)
      setPassword(null)
    } else {
      newNotification({ content: 'Login failed', status: 'failed' })
    }
  }

  const handleLogout = () => {
    setUser(null)
    setUsername(null)
    window.localStorage.removeItem('blogUser')
  }

  const newNotification = (message) => {
    console.log('app message: ', message)
    setMessage({ content: message.content, status: message.status })
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const Login = () => (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin} className='loginForm'>
        <div>Username:  <input type='text' name='username' value={username} onChange={ (event) => handleUsernameChange(event) } /></div>
        <div>Password:  <input type='text' name='password' value={password} onChange={ (event) => handlePasswordChange(event) } /></div>
        <button type='submit'>login</button>
      </form>
    </>
  )



  return (
    <div className='main-content'>
      {message ? <Notification content={message.content} status={message.status} />: <></>}
      { user ? <Main username={user.username} logout={handleLogout} newNotification={newNotification} /> : Login() }
    </div>
  )
}

export default App
