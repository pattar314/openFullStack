import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_PERSON } from '../services/queries'


const PersonForm = ({setError}) => {


  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [ createPerson ] = useMutation(ADD_PERSON,
    {
      onError: (error) => {
        console.log('there was an error: ', error.message)
      }
    }
)

  const submit = (event) => {
    event.preventDefault()
    console.log(`name: ${name} phone: ${phone} street: ${street} city: ${city}`)
    const personCreator = createPerson({  variables: { name, street, city, phone}})
    console.log('person creator: ', personCreator.data)
    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div> name <input value={name} onChange={({target}) => setName(target.value)} />          </div>
        <div> phone <input value={phone} onChange={({ target }) => setPhone(target.value)} /></div>
        <div> street <input value={street} onChange={({target}) => setStreet(target.value)} /></div>
        <div> city <input value={city} onChange={({target}) => setCity(target.value)} /></div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default PersonForm


// "\n\n\nmutation AddPerson($name: String!, $street: String!, $city: String!, $phone: String) {\n addPerson(name: $name, street: $street, city: $city, phone: $phone) {\n address {\n city\n }\n id\n name\n phone\n }\n}"
// "mutation addPerson($name: String!, $street: String!, $city: String!, $phone: String) {\n addperson(name: $name, street: $street, city: $city, phone: $phone) {\n name\n phone\n address {\n street\n city\n __typename\n }\n __typename\n }\n}"