import React from 'react'
import { createNote } from '../reducers/noteReducer'
import { connect } from 'react-redux'


const NewNoteForm = (props) => {

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createNote(content)
  }
  

  return (
    <form onSubmit={addNote}>
        <input name='note' />
        <button type='submit'>add</button>
      </form>
  )
}

export default connect(
  null,
  { createNote }
  )(NewNoteForm)