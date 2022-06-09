
const generateID = () => Number((Math.random() * 10000000).toFixed(0))

// const dispatch = useDispatch()

export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateID(),
    }
  }
}


const initialState = {
  notes: [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2
  }
  ],
  filter: 'IMPORTANT'
}


export const toggleImportanceOf = (id) => {
  return{
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}


const noteReducer = ( state = initialState, action) => {

  switch(action.type){
    case('NEW_NOTE'): 
      return  {...state, notes: state.notes.concat(action.data)}
    case('TOGGLE_IMPORTANCE'): {
      const id = action.data.id
      const noteToChange = state.find( n => n.id === id)
      const changedNote = {
        ...noteToChange, 
        important: !noteToChange.important
      }
      return state.map( note => 
        note.id !== id ? note : changedNote
        )
    }
    default:
      return state
  }
}


export default noteReducer