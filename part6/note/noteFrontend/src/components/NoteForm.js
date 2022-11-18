import React, { useState } from 'react'

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }


  const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: 'false'
    })

    setNewNote('')
  }



  return (
    <>
      <h2>Create a new note</h2>
      <form onSubmit={addNote} id='newNoteForm' >
        <input value={newNote} onChange={handleChange} placeholder='New note' id='newNoteInput' />
        <button type='submit' id='newNoteSaveButton' >save</button>
      </form>
    </>
  )
}


export default NoteForm