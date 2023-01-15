import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../services/queries"

const Authors = (props) => {

  const [author, setAuthor] = useState('')
  const [authors, setAuthors] = useState([])
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    onError: (error) => {
      console.log('there was an error: ', error.message)
    },
    refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOKS}]
  })

  const authorQuery = useQuery(ALL_AUTHORS)
  
  useEffect(() => {
    if(authorQuery.data){
      console.log('there is data: ', authorQuery.data.allAuthors)
      setAuthors(authorQuery.data.allAuthors)
      setAuthor(authorQuery.data.allAuthors[0].name)
    }

  }, [setAuthor, authorQuery.data, authors])


  if (!props.show) {
    return null
  }

  const authorEditer = async (e) => {
    e.preventDefault()
    console.log(`name is ${author} born is ${born}`)
    const editedAuthor = await editAuthor({variables : {name: author, setBornTo: Number(born)}})

    console.log('edited author: ', editedAuthor)
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
      <div>
        <h2>edit author</h2>
        <form onSubmit={authorEditer} >
            <label htmlFor='authorName' value='name'>name</label>  
            <select name='authorName' id='authorName' onChange={(e) => setAuthor(e.target.value)} >
              {authors.map((a, index) => <option value={a.name} key={index}>{a.name}</option>)}
            </select> <br />
            Born  <input value={born} onChange={(e) =>setBorn(e.target.value)} />
            <button type="submit">submit</button>
        </form>
      </div>

    </div>
  )
}

export default Authors
