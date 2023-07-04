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

export const GENRE_FILTER = gql`
  query allBooks($genre: String!){
    allBooks(genre: $genre){
      title
      author
      published
      id
      genres
    }
  }
`

export const GET_GENRES = gql`
  query {
    allBooks{
      genres
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(
      username: $username,
      password: $password
    ){
      value
    }
  }
`

export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!){
    createUser(
      username: $username,
      password: $password
    ){
      User
    }
  }
`

export const GET_CURRENT_USER = gql`
  query{ 
    me {
      username
      favoriteGenre
    }
  }
`