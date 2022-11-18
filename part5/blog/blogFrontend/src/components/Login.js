import React from 'react'

const Login = ({ handleUsernameChange, handlePasswordChange, handleLogin, username, password }) => {



  return (
    <>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin} className='loginForm'>
        <div>Username:  <input type='text' name='username' value={username} onChange={ handleUsernameChange } id='usernameInput' /></div>
        <div>Password:  <input type='text' name='password' value={password} onChange={ handlePasswordChange } id='passwordInput' /></div>
        <button type='submit' id='loginSubmitButton'>login</button>
      </form>
    </>
  )
}

export default Login