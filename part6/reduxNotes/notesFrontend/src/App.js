// import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import './App.css'
import NewNoteForm from './components/NewNoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import noteServices from './services/noteServices'
import { setNotes } from './reducers/noteReducer'
// import noteReducer from './reducers/noteReducer'



 

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    noteServices.getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch])
  
    return (
      <div className="App-wrapper">
        <NewNoteForm />
        <VisibilityFilter />
        <Notes />

      </div>
    )
}

export default App;
