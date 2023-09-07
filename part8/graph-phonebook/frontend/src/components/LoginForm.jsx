import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOG_IN } from "../queries"


const LoginForm = ({setError, setToken}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOG_IN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data){
      console.log('result: ', result)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonebook-user-token', token)
    }
  }, [result, setToken])

  const loginSubmit = (e) => {
    e.preventDefault()
    login({variables: {username, password}})
  }

  return(
    <div className="login-form">
      <form onSubmit={loginSubmit}>
        <div>username <input value={username} onChange={(e) => setUsername(e.target.value)} /></div>
        <div>password <input value={password} onChange={(e) => setPassword(e.target.value)} /></div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm