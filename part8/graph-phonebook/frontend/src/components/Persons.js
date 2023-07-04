import { useState } from "react"
import {  useQuery } from "@apollo/client"
import Person from "./Person"
import { FIND_PERSON } from "../queries"

const Persons = ({persons}) => {
  const [nameToSearch, setNameToSearch] = useState(null)
  


  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch,
  })


  if(result.data){
    console.log('there is result data:', result.data)
  }

  if (nameToSearch && result.data){
    return (
      <Person
        person={ result.data.findPerson }
        onClose={() => setNameToSearch(null)}
      />
    )
  }

  if(persons === null){
    return <div>...loading</div>
  }

  return (
    <div>
      <h2>Persons</h2>
      {  console.log('p: ', persons)}
      {persons.map((p) => {
        return (
          <div key={p.name}>
          {p.name} {p.phone}
          <button onClick={() => {
            setNameToSearch(p.name) 
          }}>
            show address
          </button>
          </div>
        )
      })}
    </div>
  )
}


export default Persons