import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, ALL_BOOKS, EDIT_BORN } from "../services/queries"
import {  useEffect, useState } from "react"



const Authors = (props) => {



  const [authors, setAuthors] = useState([])
  const [author, setAuthor] = useState('')
  const [books, setBooks] = useState([])
  const [born, setBorn] = useState(null)
  const queryData = useQuery(ALL_AUTHORS)
  const bookData = useQuery(ALL_BOOKS)
  const [editBorn] = useMutation(EDIT_BORN, {
    refetchQueries: [ALL_AUTHORS, ALL_BOOKS]
  })
  



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
        setAuthors(authorProcessor)      
        setAuthor(authorProcessor[0].name)
      }

  }, [books, queryData.data, bookData.data ])



  if(!props.show){
    return null
  }


  const changeBirth = (e) => {
    e.preventDefault()
    console.log(`name: ${author}, born: ${born}`)
    const editData = editBorn({ variables: { name: author, born: Number(born)}})
    console.log('edit data: ', editData)
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
      <div>set birthyear</div>
      <form onSubmit={changeBirth}>
        <select onChange={(e) => setAuthor(e.target.value)}>
          {authors.map(a => {
            return <option key={a.name} value={a.name}>{a.name}</option>
          })}
        </select>
        <input placeholder="birth year" onChange={(e) => setBorn(e.target.value)} />
        <button type='submit'>update author birth year</button>
      </form>
    </div>
  )
}

export default Authors
