
import { updateCache } from "../App";
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
      setError(error.graphQLErrors[0].message)
    },
    update: (cache, response) => {
     updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson )
        }

      })
    

  const submit = (event) => {
    event.preventDefault()

    createPerson({ variables: {name, street, city, phone: phone.length > 0 ? phone : undefined }})
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

