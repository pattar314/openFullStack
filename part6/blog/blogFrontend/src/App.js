import { useState, useEffect } from 'react'
import Main from './components/Main'
import { login } from './services/auth'
import Notification from './components/Notification'
import './styles/temp.css'
import Login from './components/Login'


const App = () => {

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState()


  useEffect(() => {
    let storedUser = window.localStorage.getItem('blogUser')
    if (storedUser){
      console.log('there is a stored user: ', storedUser)
      const processedUser = JSON.parse(storedUser)
      setUser(processedUser)
      setUsername(processedUser.username)
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
      newNotification({ content: `${username} logged in`, status: 'success' })
      setUsername(null)
      setPassword(null)
    } else {
      newNotification({ content: 'Login failed', status: 'fail' })
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



  return (
    <div className='main-content'>
      {message ? <Notification content={message.content} status={message.status} />: <></>}
      { user ? <Main username={user.username} logout={handleLogout} newNotification={newNotification} />
        : <Login handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
          username={username}
          password={password}
        /> }
    </div>
  )
}

export default App
