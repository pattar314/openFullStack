import { gql } from "@apollo/client";


export const CREATE_PERSON = gql`
mutation createPerson($name: String!, $phone: String, $street: String!, $city: String!){
  addPerson(
    name: $name,
    phone: $phone,
    street: $street,
    city: $city
  ){
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

export const FIND_PERSON = gql` 
query findPersonByName($nameToSearch: String!){
  findPerson(name: $nameToSearch){
    name
    phone
    address {
      street
      city
    }
    id
  }
}`



export const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $number: String!){
    editNumber(name: $name, number: $number){
      name
      phone
      address{
        street
        city
      }
      id
    }
  }
`