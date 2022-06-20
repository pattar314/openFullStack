// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import './App.css'
import NewNoteForm from './components/NewNoteForm'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
// import noteReducer from './reducers/noteReducer'



 

const App = () => {

// const dispatch = useDispatch()

/* 
dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 3
  }
})

dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 4
  }
}) 
 */


/* useEffect(() => {
  noteService.getAll().then(notes => dispatch(setNotes(notes)))
}, [dispatch])
 */
  return (
    <div className="App-wrapper">
      <NewNoteForm />
      <VisibilityFilter />
      <Notes />

    </div>
  )
}

export default App;
