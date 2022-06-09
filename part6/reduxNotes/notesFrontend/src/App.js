import { createStore } from 'redux'
import './App.css'
import NewNoteForm from './components/NewNoteForm'
import Notes from './components/Notes'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)


store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 3
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 4
  }
}) 


 

const App = () => {

  const filterSelected = (value) => {
    console.log(value)
  }

  return (
    <div className="App-wrapper">
      <NewNoteForm />
      all <input type='radio' name='filter' onChange={() => filterSelected('ALL')} />
      important <input type='radio' name='filter' onChange={() => filterSelected('IMPORTANT')} />
      nonimportant <input type='radio' name='filter' onChange={() => filterSelected('NONIMPORTANT')} />
      <Notes />

    </div>
  )
}

export default App;
