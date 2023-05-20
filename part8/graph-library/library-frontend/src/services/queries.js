import {gql} from '@apollo/client'


export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
    }
  } 
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int, $genres: [String!]!){
    addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
            ){
              title
              author
              published
              id
            }
  }
`

export const EDIT_BORN = gql`
  mutation editBorn($name: String!, $born: Int!){
    editBorn(
      name: $name,
      born: $born
    ){
      name
      born
    }
  }
`