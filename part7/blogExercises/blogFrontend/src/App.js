import {  useEffect } from 'react'
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
import { initializeBlogs, likeBlog } from './reducers/blogSlice'
import { createAuthorization, logout } from './services/auth'
import TopBar from './components/TopBar'
import SingleBlogView from './components/SingleBlogView'
import axios from 'axios'


const App = () => {

  const dispatch = useDispatch()
  const message = useSelector(state => state.notification)
  const currentUser = useSelector(state => state.auth.currentUser)



  useEffect(() => {
    console.log('page loading')
    let storedUser = window.localStorage.getItem('blogUser')
    if (storedUser){
      console.log('there is a stored user: ', storedUser)
      const processedUser = JSON.parse(storedUser)
      console.log('processedUser: ', processedUser)
      dispatch(setCurrentUser(processedUser))
    }
    dispatch(initializeBlogs())
    dispatch(initalizeUserlist())
  }, [])

  const addLike = async (blog) => {
    const body = {
      ...blog,
      likes: blog.likes + 1
    }
    console.log('body:', body)

    try{
      const auth = createAuthorization()
      console.log('auth: ', auth)
      let updatedBlog = await axios.put(`/api/blogs/${blog.id}`, body, auth.options)
      if (updatedBlog.status === 200 || updatedBlog.status === 201){
        const data = updatedBlog.data
        console.log('updated blog data: ', data)
        dispatch(likeBlog(data))
      }else {
        console.log('there was an error in else')
      }
    }catch(error){
      console.log('there was an error: ', error)
    }
  }



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
            <Route path='/blogs/:id' element={ currentUser ? <SingleBlogView addLike={addLike} /> :  <Navigate replace to='/login' /> } />
            <Route path='/users/:id' element={ currentUser ? <SingleUserView /> :  <Navigate replace to='/login' /> } />
            <Route path='/users' element={ currentUser ? <AllUsersView /> : <Navigate replace to='/login' />} />
            <Route path='/login' element={ currentUser ? <Navigate replace to='/' /> : <Login newNotification={newNotification} /> } />
            <Route path='/' element={ currentUser ? <Main logout={ logout } newNotification={newNotification} /> : <Navigate replace to='/login' />} />
          </Routes>
        </section>
      </Router>
    </div>
  )
}

export default App