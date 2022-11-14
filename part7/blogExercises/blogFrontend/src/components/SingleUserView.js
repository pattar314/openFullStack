import { useSelector } from 'react-redux'


const SingleUserView = ({ userId }) => {
  const userlist = useSelector(state => state.users.userlist)
  const currentUser = userlist.filter( u => u.id === userId)
  console.log('current user: ', currentUser)

  return (
    <>
      { currentUser.username }

      <h3>added blogs</h3>

      { currentUser.blogs.map( (b, index) => <div key={index}>{ b.content } </div> )}
    </>
  )
}

export default SingleUserView