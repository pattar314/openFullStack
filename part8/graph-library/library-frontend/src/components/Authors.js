import { useQuery } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS } from "../services/queries"
import {  useEffect, useState } from "react"



const Authors = (props) => {



  const [authors, setAuthors] = useState([])
  const [books, setBooks] = useState([])
  const queryData = useQuery(ALL_AUTHORS)
  const bookData = useQuery(ALL_BOOKS)
  



  useEffect(() => {
    const countBooks = (author) => {
      return books.filter(a => a.author === author).length
    }

    console.log('test')
      if(queryData.data && bookData.data ){
        setBooks(bookData.data.allBooks)
        const authorProcessor = queryData.data.allAuthors.map((a) => {
          return {...a, bookCount: countBooks(a.name)}
        })
        console.log('authors: ', authorProcessor)
        setAuthors(authorProcessor)
      }
  }
  , [books, queryData.data, bookData.data])



  if(!props.show){
    return null
  }




  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
