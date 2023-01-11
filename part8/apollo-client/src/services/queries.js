import { gql } from "@apollo/client";



export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $phone: String, $street: String!, $city: String!){
  name: $name,
  phone: $phone,
  street: $street,
  city: $city
}: Person
`

export const FIND_PERSON = gql`
query findPersonByName($nameToSearch: String!){
  findPerson(name: $nameToSearch){
    name
    phone
    id
    address {
      street
      city
    }
  }
}
`
  
export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
  `
