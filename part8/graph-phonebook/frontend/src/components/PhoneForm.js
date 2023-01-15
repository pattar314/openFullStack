import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { EDIT_NUMBER } from "../services/queries"

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const [changeNumber, result] = useMutation(EDIT_NUMBER)

  useEffect(() => {
    if(result.data && result.data.editNumber === null){
      setError('person not found')
    }
  }, [result.data])


  const phoneSubmit = (e) => {
    e.preventDefault()
    changeNumber({ variables: { name, phone: newPhone }})

    setName('')
    setNewPhone('')

  }

  return (
    <div>
      <h2>change number</h2>
      <form onSubmit={phoneSubmit}>
        <div>name <input value={name} onChange={({target}) => setName(target.value)} /></div>
        <div>phone <input value={newPhone} onChange={({target}) => setNewPhone(target.value)} /></div>
        <button type="submit">change number</button>
      </form>
    </div>
  )
}

export default PhoneForm