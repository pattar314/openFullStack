import React from "react"

  const LoginForm = ({
    handleLogin,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
  }) => {

    return (
      <form onSubmit={handleLogin}>
          <div>
            Username  
            <input type='text'
            value={ username }
            name='Username' 
            onChange={handleUsernameChange} 
          />
          </div>
          <div>
            Password  
            <input type='text'
            value={ password }
            name='Password'
            onChange={handlePasswordChange} 
            />
          </div>
          <button type='submit'>login</button>
        </form>
      )
    }

  export default LoginForm