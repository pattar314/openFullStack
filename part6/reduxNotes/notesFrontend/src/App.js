import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import NewNoteForm from './components/NewNoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
// import noteServices from './services/noteServices'
import { initalizeNotes } from './reducers/noteReducer'



 

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(initalizeNotes())
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
