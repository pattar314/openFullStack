
import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { LOGIN } from '../services/queries'


const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('there was an error: ', error.graphQLErrors[0].message)
    }
  })

  const submit = async (e) => {
    console.log(`attempting to submit: ${username}: ${password}`)
    e.preventDefault()
    try {
      const tokenRequest = await login({variables: {username, password: 'test' }})
      if(tokenRequest.data.login.value){
        localStorage.setItem('graph-library-auth', tokenRequest.data.login.value)
        localStorage.setItem('graph-library-username', username)
      } else {
        console.log('login error')
        return {error: 'there was an error'}
      }
      window.location.reload()
    } catch(error){
      console.log('there was an error: ', error)
    }
    
  }

  if(!props.show){
    return null
  }


  return (
    <>
      <div>Login</div>
      <div>
        <form onSubmit={submit}>
          <div>Username: <input value={username} onChange={(e) => setUsername(e.target.value)} /></div>
          <div>password: <input value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <button type='submit'>login</button>
        </form>
      </div>
    </>
    

  )
}

export default Login