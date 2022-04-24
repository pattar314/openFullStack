import React, { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import './../src/styles/main.css'

const App = () => {

  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState(null)
  const noteFormRef = useRef()

  useEffect( () => {
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
        console.log('initial notes: ', initialNotes)
      }).catch(err => console.log(err))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with ', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setStatus('message-success')
      setMessage(`${user.username} logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception){
      setStatus('message-fail')
      setMessage('wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    noteFormRef.current.toggleVisibility()
  }


  const toggleImportanceOf = (id) => {

    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(() => {
        alert(`the note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const notesToShow = (showAll ? notes : notes.filter(note => note.important))


  const loginForm = () => (
    <Togglable buttonLabel='login' ref={noteFormRef} >
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
        setNotes={setNotes}

      />
    </Togglable>
  )

  const createNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const returnedNote = await noteService.create(noteObject)
    setNotes(notes.concat(returnedNote))
    setStatus('message-success')
    setMessage('note created')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef} >
      <NoteForm createNote={createNote} />
    </Togglable>
  )

  return (
    <div>
      <div className={`${status}`} id='message-banner'>{message}</div>
      <h1>Notes</h1>
      { user ? `${user.username} logged in` : <></> }

      {
        user === null
          ? loginForm()
          : noteForm()
      }

      <div>
        <button id='show-button' onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important': 'all'}
        </button>

      </div>
      <ul>
        {console.log('notes to show: ', notesToShow)}
        {notesToShow.map((note, i) =>
          <Note key={i} note={note} toggleImportant={() => toggleImportanceOf(note.id)} />
        )}
      </ul>
    </div>
  )
}

export default App