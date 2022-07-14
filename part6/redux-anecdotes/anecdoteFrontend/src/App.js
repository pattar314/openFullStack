import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
// import anecdoteService from './services/anecdotes'
// import store from './utilities/store'

const App = () => {

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  


  const state = useSelector(state => state)

  return (
    <div>
      
      <h2>Anecdotes</h2>
      <Filter />
      { state.notification ? <Notification /> : <></>}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App