import {  useSelector } from 'react-redux'
// import { getUsers } from '../services/auth'
import { Link, useParams } from 'react-router-dom'


const SingleUserView = () => {
  const searchID = useParams().id
  console.log('search id: ', searchID)
  console.log('state: ', useSelector(state => state))
  const userlist = useSelector(state => state.users.userlist)
  console.log('userlist: ', userlist)
  const selectedUser = userlist.find(u => u._id === searchID)
  console.log('selected user: ', selectedUser)
  console.log('selected blogs: ', selectedUser.blogs)



  return (
    <>

      {( selectedUser.blogs !== [] ?  <div className='single-user-banner'><h2>{ selectedUser.username }s added blogs:</h2></div> : <h1>This user has not added any blogs yet</h1> )}

      <section className='selected-blogs'>
        { selectedUser.blogs.map( (b, index) => <Link key={index} to={`/blogs/${b.id}`}>{ b.title } </Link> )}
      </section>
    </>
  )
}

export default SingleUserView