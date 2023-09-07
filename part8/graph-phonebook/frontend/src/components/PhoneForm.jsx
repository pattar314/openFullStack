import { useMutation } from "@apollo/client"
import { EDIT_NUMBER } from "../queries"
import { useEffect, useState } from "react"
import { resultKeyNameFromField } from "@apollo/client/utilities"

const PhoneForm = ({ setError }) => {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [changeResult, setChangeResult ] = useState('')

  const [ changeNumber ] = useMutation(EDIT_NUMBER)

  const submit = async (event) => {
    event.preventDefault()
    console.log(`${name}: ${phone}`)
    const numberChange = await changeNumber({variables: {name, phone}})
    setChangeResult(numberChange)

    setName('')
    setPhone('')
  }

  useEffect(() => {
    if(resultKeyNameFromField.data && changeResult.data.editNumber === null){
      setError('person not found')
    }
  }, [changeResult]) // eslint-disable-line


  return (
    <div>
      <h2>change number</h2>
      <div>
        <form onSubmit={submit}>
          <div>name <input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div>phone <input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
          <button type='submit'>change number</button>
        </form>
      </div>
    </div>
  )

}

export default PhoneForm