import { useMutation } from "@apollo/client"
import { EDIT_NUMBER } from "../queries"
import { useEffect, useState } from "react"
import { resultKeyNameFromField } from "@apollo/client/utilities"

const PhoneForm = ({ setError }) => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const [ changeNumber, result ] = useMutation(EDIT_NUMBER)

  const submit = (event) => {
    event.preventDefault()

    changeNumber({variables: {name, phone}})

    setName('')
    setPhone('')
  }

  useEffect(() => {
    if(resultKeyNameFromField.data && result.data.editNumber === null){
      setError('person not found')
    }
  }, [result.data]) // eslint-disable-line


  return (
    <div>
      <h2>change number</h2>
      <div>
        <form onSubmit={submit}>
          <div>name <input onChange={(e) => setName(e.target.value)} /></div>
          <div>phone <input onChange={(e) => setPhone(e.target.value)} /></div>
          <button type='submit'>change number</button>
        </form>
      </div>
    </div>
  )

}

export default PhoneForm