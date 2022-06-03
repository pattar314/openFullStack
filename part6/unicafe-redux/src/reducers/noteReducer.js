const noteReducer = (state = [], action) => {
    console.log(action)
    console.log('state is: ', state)
  switch (action.type) {
    case 'GOOD':
      console.log('it was good')
      return {...state, 'good': state.good + 1}
    case 'OK':
      console.log('it was okay')
      return {...state, "ok": state.ok + 1}
    case 'BAD':
      console.log('it was bad')
      return {...state, "bad": state.bad + 1}
    case 'ZERO':
      return { good: 0, ok: 0, bad: 0 }
    case 'NEW_NOTE': 
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE':
      const target = state.filter(note => note.id === action.data)
      const modifiedTarget = target.important = !target.important
      return [...state, modifiedTarget]
    default: return state
  }
}

const generateId = () => Number((Math.random() * 1000000).toFixed(0))


  
export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer