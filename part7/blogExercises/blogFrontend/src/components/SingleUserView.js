import { useEffect } from 'react'
import {  useSelector } from 'react-redux'
// import { getUsers } from '../services/auth'
import { useParams } from 'react-router-dom'


const SingleUserView = () => {
  const searchID = useParams().id
  console.log('search id: ', searchID)
  console.log('state: ', useSelector(state => state))
  const userlist = useSelector(state => state.users.userlist)
  console.log('userliset: ', userlist)
  const selectedUser = userlist.find(u => u._id === searchID)
  console.log('selected user: ', selectedUser)

  useEffect(() => {
  }, [])



  return (
    <>
      { selectedUser.username }

      <h3>added blogs</h3>

      { selectedUser.blogs.map( (b, index) => <div key={index}>{ b.content } </div> )}
    </>
  )
}

export default SingleUserView