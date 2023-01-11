import { gql, useQuery } from "@apollo/client"
import { useState } from "react"
import Person from "./Person"

const Persons = ({persons}) => {

  console.log('persons was passed: ', persons)


  const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!){
    findPerson(name: $nameToSearch){
      name
      phone
      address {
        street
        city
      }
    }
  }
`

  const [nameToSearch, setNameToSearch] = useState(null)
  const result = useQuery(FIND_PERSON, {
    variables: { nameToSearch },
    skip: !nameToSearch
  })

  if(nameToSearch && result.data){
    return(
      <Person person={result.data.findPerson}
      onClose={() => setNameToSearch(null)}
      />
    )
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p => (
        <div key={p.name} >
          {p.name} {p.phone}
        <button onClick={setNameToSearch(p.name)}> show address</button>
        </div>
      ))}
    </div>
  )
}

export default Persons