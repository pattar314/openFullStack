import React from "react"

  const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
    loginVisible
  }) => {

    return (
      <form onSubmit={handleLogin}>
          <div>
            Username  
            <input type='text'
            value={ username }
            name='Username' 
            onChange={({ target }) => handleUsernameChange(target.value)} 
          />
          </div>
          <div>
            Password  
            <input type='text'
            value={ password }
            name='Password'
            onChange={ ({ target }) => handlePasswordChange(target.value) } 
            />
          </div>
          <button type='submit'>login</button>
        </form>
      )
    }

  export default LoginForm