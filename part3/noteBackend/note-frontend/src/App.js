import React, { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'

const App = (props) => {

  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect( () => {
    noteService.getAll()
    .then(initialNotes => {
      setNotes(initialNotes)
    }).catch(err => console.log(err))
  
  
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    let noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5
    }

    noteService.create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(`${event.target.value}`);
    console.log('new note: ', event.target.value)
  }

  const toggleImportanceOf = (id) => {

    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
         setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(err => {
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = (showAll ? notes : notes.filter(note => note.important))

  


  return (
    <div>
      <h1>Notes</h1>
      <div >
        <button id='show-button' onClick={()=>setShowAll(!showAll)}>
          Show {showAll ? 'important': 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => 
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
      <form onSubmit={addNote} >
        <input value={newNote} onChange={handleNoteChange} placeholder='New note' />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App