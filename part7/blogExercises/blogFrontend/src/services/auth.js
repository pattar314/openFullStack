import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../reducers/authSlice'
import { logoutAction } from '../reducers/usersSlice'


const createAuthorization = () => {
  const localUser = window.localStorage.getItem('blogUser')
  const converted = JSON.parse(localUser)
  const authorization = `Bearer ${converted.token}`

  const options = {
    headers: { Authorization: authorization }
  }

  return { converted, authorization, options }
}



const login = async (user) => {
  console.log('user is: ', user)
  const request = await axios.post('/api/login', user).catch((response) => {return response})
  if(request.status === 200){
    window.localStorage.setItem('blogUser', JSON.stringify( request.data ))
    return request.data
  }else {
    console.log('login failed')
  }

}


const logout = () => {
  const dispatch = useDispatch()
  dispatch( logoutAction () )
  dispatch( setCurrentUser( null ) )
  window.localStorage.removeItem( 'blogUser' )
}

const getUsers = async () => {
  const users = await axios.get('/api/users')
  return users.data
}


export { login, logout, getUsers, createAuthorization }