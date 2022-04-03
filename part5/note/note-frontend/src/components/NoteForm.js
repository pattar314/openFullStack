import React, { useState } from "react"

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

 
 const addNote = (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: Math.random() > 0.5
    })
  }



  return (
    <>
    <h2>Create a new note</h2>
    <form onSubmit={addNote} >
      <input value={newNote} onChange={handleChange} placeholder='New note' />
      <button type='submit'>Save</button>
    </form>
    </>
  )
}


 export default NoteForm