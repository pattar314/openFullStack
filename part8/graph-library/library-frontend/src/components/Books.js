import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../services/queries"

const Books = (props) => {
  
  const bookQuery = useQuery(ALL_BOOKS)

  if(bookQuery.loading){
    console.log('loading...')
  }

  if (!props.show) {
    return null
  }
  
  if(bookQuery.data){
    console.log('books: ', bookQuery.data.allBooks)
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookQuery.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
