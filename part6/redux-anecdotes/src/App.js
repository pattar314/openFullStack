import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {

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