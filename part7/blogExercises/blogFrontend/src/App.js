import {  useEffect, useState } from 'react'
import Main from './components/Main'
import Notification from './components/Notification'
import './styles/app.css'
import Login from './components/Login'
import AllUsersView from './components/AllUsersView'
import SingleUserView from './components/SingleUserView'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentUser } from './reducers/authSlice'
import { initalizeUserlist } from './reducers/usersSlice'
import { clearNotification, setNotification } from './reducers/notificationSlice'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogSlice'
import { logout } from './services/auth'
import TopBar from './components/TopBar'
import SingleBlogView from './components/SingleBlogView'


const App = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  const currentUser = useSelector(state => state.auth.currentUser)
  console.log('check user: ', currentUser)

  const [ username, setUsername ] = useState(null)



  useEffect(() => {
    console.log('app loading')
    let storedUser = window.localStorage.getItem('blogUser')
    if (storedUser){
      console.log('there is a stored user: ', storedUser)
      const processedUser = JSON.parse(storedUser)
      console.log('processedUser: ', processedUser)
      dispatch(setCurrentUser(processedUser))
      setUsername(processedUser.username)
      console.log('username test: ', username)
    }
    dispatch(initializeBlogs())
    dispatch(initalizeUserlist())
  }, [])

  useEffect(() => {
    console.log('current user useEffect in App.js: ', currentUser)
  }, [currentUser])


  const newNotification = ( message ) => {
    dispatch(setNotification( { content: message.content, status: message.status } ) )
    setTimeout( () => {
      dispatch( clearNotification() )
    }, 3000 )
  }


  return (
    <div className='main-content'>
      <Router>
        { currentUser ? <TopBar /> : ''}
        {message !== null ? <Notification content={message.content} status={message.status} />: <></>}
        <section className='content-container'>
          <Routes>
            <Route path='/blogs/:id' element={ currentUser ? <SingleBlogView  /> :  <Navigate replace to='/login' /> } />
            <Route path='/users/:id' element={ currentUser ? <SingleUserView /> :  <Navigate replace to='/login' /> } />
            <Route path='/users' element={ currentUser ? <AllUsersView /> : <Navigate replace to='/login' />} />
            <Route path='/login' element={ currentUser ? <Navigate replace to='/' /> : <Login newNotification={newNotification} /> } />
            <Route path='/' exact element={ currentUser ? <Main logout={ logout } newNotification={newNotification} /> : <Navigate replace to='/login' />} />
          </Routes>
        </section>
      </Router>
    </div>
  )
}

export default App