import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setLoggedUser } from '../reducers/authSlice'
import { logoutHook } from '../reducers/usersSlice'




const login = async (user) => {
  console.log('user is: ', user)
  const request = await axios.post('/api/login', user).catch((response) => {return response})
  if(request.status === 200){
    console.log('login succeeded')
    window.localStorage.setItem('blogUser', JSON.stringify( request.data ))
    return request.data
  }else {
    console.log('login failed')
  }

}


const logout = () => {
  const dispatch = useDispatch()
  dispatch( logoutHook () )
  dispatch( setLoggedUser( null) )
  window.localStorage.removeItem( 'blogUser' )
}

const getUsers = async () => {
  const users = await axios.get('/api/users')
  return users
}


export { login, logout, getUsers }