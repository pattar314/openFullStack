import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../services/queries"
import { GENRE_FILTER } from "../services/queries"
import { GET_GENRES } from '../services/queries'
import { useEffect, useState } from "react"

const Books = (props) => {
  
  const books = useQuery(ALL_BOOKS)
  const genres = useQuery(GET_GENRES)
  const [genreFilter, setGenreFilter] = useState(null)
  const filterQuery = useQuery(GENRE_FILTER, {skip: !genreFilter, variables: {genre: genreFilter}})
  const [chosenBooks, setChosenBooks] = useState([])
 
  useEffect(() => {
    if(!books.loading && books.data){
      setChosenBooks(books.data.allBooks)
    }
  }, [books])

  useEffect(() => {
  if(!filterQuery.loading && filterQuery.data){
    console.log('attempting to set filtered books')
    setChosenBooks(filterQuery.data.allBooks)
  } 
  }, [filterQuery])
  
  if (!props.show) {
    return null
  }
 
  const genreList = !genres.loading ? Array.from(new Set(genres.data.allBooks.reduce((build, next) => build = [...build, ...next.genres], [] ))) : null
  const genreButtons = genreList ? genreList.map((g) => <button key={g} onClick={() => buttonPress(g)}>{g}</button>) : null
  console.log('choosen books: ', chosenBooks)





  const buttonPress = async (e) => {
    console.log('chosen genre: ', e)
    setGenreFilter(e)
  }

  const reset = () => {
    setGenreFilter(null)
    setChosenBooks(books.data.allBooks)
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
          {chosenBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={reset}>reset</button> {genreButtons}
      
    </div> 
   
    )
}

export default Books
