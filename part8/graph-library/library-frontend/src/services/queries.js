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
  mutaton addBook($title: String!, $author: String!, $published: String, $genres: [String]){
    addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
            )
  }
`