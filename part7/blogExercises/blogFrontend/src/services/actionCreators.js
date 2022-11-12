import { useReducer } from 'react'
import { useDispatch } from 'react-redux'




const createBlog = async ( data ) => {
  await useDispatch('ADDBLOG', data)
  console.log('blog add action creator yellow flag')
}

const deleteBlog = async ( data ) => {
  await useDispatch('DELETEBLOG', data)
  console.log('blog delete action creator yellow flag')
}

const updateBlog = async ( data ) => {
  await useDispatch('UPDATEBLOG', data)
  console.log('blog update action creator yellow flag')
}

const login = async ( data ) => {
  await useDispatch('LOGIN', data)
  console.log('login action creator yellow flag')
}

const logout = async ( data ) => {
  await useDispatch('LOGIN', data)
  console.log('logout action creator yellow flag')
}

const setUsernameInput = async ( data ) => {
  await useDispatch('SETUSERNAMEINPUT', data)
  console.log('set username yellow flag')
}

const setPasswordInput = async ( data ) => {
  await useDispatch('SETPASSWORDINPUT', data)
  console.log('set password yellow flag')
}

const setLoggedUser = async ( data ) => {
  await useDispatch('SETLOGGEDUSER', data)
  console.log('set logged user yellow flag')
}

const setNotification = async ( data ) => {
  await useReducer('SETNOTIFICATION', data)
  console.log('setnotification yellow flag')
}



export default {
  createBlog,
  deleteBlog,
  updateBlog,
  login,
  logout,
  setUsernameInput,
  setPasswordInput,
  setLoggedUser,
  setNotification
}