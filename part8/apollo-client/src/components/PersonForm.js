import {  useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_PERSONS, CREATE_PERSON } from '../services/queries'

  

const PersonForm = () => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [ createPerson ] = useMutation(CREATE_PERSON, {
    refetchQueries: [ { query: ALL_PERSONS } ]
  })

  const submit = (event) => {
    event.preventDefault()

    createPerson({ variables: { name, phone, street, city} })
    setName('')
    setPhone('')
    setCity('')
    setStreet('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          phone <input value={phone} onChange={(event) => setPhone(event.target.value)} />
        </div>
        <div>
          street <input value={street} onChange={(event) => setStreet(event.target.value)} />
        </div>
        <div>
          city <input value={city} onChange={(event) => setCity(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default PersonForm