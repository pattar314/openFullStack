import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GENRE_FILTER, GET_CURRENT_USER } from '../services/queries'

const Recommended = (props) => {

  const [user, setUser] = useState(null)
  const [bookList, setBookList] = useState([])
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const currentUser = useQuery(GET_CURRENT_USER, {skip: !user})
  const genreList = useQuery(GENRE_FILTER, {skip: !favoriteGenre, variables: {genre: favoriteGenre}})

  useEffect(() => {
    if(localStorage.getItem('graph-library-username')){
      setUser(localStorage.getItem('graph-library-username'))
    } else {
      console.log('there is no username')
    }
  }, [])

  useEffect(() => {
    if(!genreList.loading && genreList.data){
      setBookList(genreList.data.allBooks)
    }
  }, [genreList])

  useEffect(() => {
    if(!currentUser.loading && currentUser.data){
      setUser(currentUser.data.me)
      setFavoriteGenre(currentUser.data.me.favoriteGenre)
    }
  }, [currentUser])

  if(!props.show){
    return null
  }
  
  return (
    <>
      <div>Recommended</div>
      <div className='recommended-list'>
        {bookList ? bookList.map((b) => <div key='b.title'> {b.title} by {b.author}</div>) : <div>There are no books matching this users favorite genre</div>}
      </div>
    </>
    
  )
}

export default Recommended