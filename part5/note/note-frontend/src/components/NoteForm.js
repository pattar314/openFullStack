import React, { useState } from "react"
import noteService from './../services/notes'

const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState('')

  const handleChange = (event) => {
    setNewNote(event.target.value)
  }

 /*  
 const addNote = (event) => {
    event.preventDefault()
    let noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
  
    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  } */



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