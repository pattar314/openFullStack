import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {

  return (
    <form onSubmit={handleLogin} id='loginForm'>
      <div>
            Username
        <input type='text'
          value={ username }
          name='Username'
          onChange={handleUsernameChange}
          id='usernameInput'
        />
      </div>
      <div>
            Password
        <input type='text'
          value={ password }
          name='Password'
          onChange={handlePasswordChange}
          id='passwordInput'
        />
      </div>
      <button type='submit' id='loginSubmitButton'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm