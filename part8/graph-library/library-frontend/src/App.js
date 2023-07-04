import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'
import Recommended from './components/Recommended'

const App = () => {
  const [page, setPage] = useState('authors')
  const [loggedIn, setLoggedIn] = useState(false)
  const client = useApolloClient()

  const logout = () => {
    localStorage.removeItem('graph-library-auth')
    client.resetStore()
    window.location.reload()
  }



  useEffect(() => {
    if(localStorage.getItem('graph-library-auth')){
      console.log('logged in')
      setLoggedIn(localStorage.getItem('graph-library-auth'))
    }

  }, [])

  

  console.log('app loading')

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {loggedIn ? <button onClick={() => setPage('add')}>add book</button> : <></> }
        {loggedIn ? <button onClick={() => setPage('recommended')}>recommended</button> : <></> }
        {loggedIn ? <button onClick={logout}>logout</button> : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} loggedIn={loggedIn}  />

      <Books show={page === 'books' } />

      <NewBook show={page === 'add'} />
      
      <Recommended show={page === 'recommended'} />

      <Login show={page === 'login'} />

    </div>
  )
}

export default App
