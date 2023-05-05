
import { CREATE_PERSON, ALL_PERSONS } from "../queries";

const { useMutation } = require("@apollo/client");
const { useState } = require("react");



const PersonForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [ { query: ALL_PERSONS}],
    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.error.errors
      const messages = Object.values(errors).map(e => e.message).join('\n')
      setError(messages)
    }
  })

  const submit = (event) => {
    event.preventDefault()

    createPerson({ variables: {name, phone, street, city}})
    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          phone <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          street <input value={street} onChange={(e) => setStreet(e.target.value)} />
        </div>
        <div>
          city <input value={city} onChange={(e) => setCity(e.target.value)} />
         </div>
         <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default PersonForm

