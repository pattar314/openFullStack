import React, { useState } from 'react'
import { login } from './../services/auth'

const Login = () => {

  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`Attempting to login with username: ${username}, password: ${password}`)
    const user = { username, password }
    setUsername(null)
    setPassword(null)
    let loggedInUser = login(user)
    if(loggedInUser.status === 200){
      console.log('login successful')
    } else {
      console.log('login failed')
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin} className='loginForm'>
        <div>Username:  <input type='text' name='username' value={username} onChange={ (event) => handleUsernameChange(event) } /></div>
        <div>Password:  <input type='text' name='password' value={password} onChange={ (event) => handlePasswordChange(event) } /></div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default Login