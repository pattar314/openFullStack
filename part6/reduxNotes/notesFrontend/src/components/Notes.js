import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import Note from './Note'

const Notes = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state.notes)
  console.log('state: ', state.notes)
  
  return (
    <ul>
    { state.notes.map( note => 
      <Note 
        key={ note.id }
        note={ note }
        handleClick={ ()=> dispatch(toggleImportanceOf(note.id)) }
        />
      ) }
  </ul>
  )
}

export default Notes