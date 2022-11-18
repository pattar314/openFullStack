import axios from 'axios'
import { getId } from '../reducers/anecdoteReducer'


const baseUrl = 'http://localhost:3001/anecdotes'




const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const toSend = { content, important: false, id: getId(), votes: 0 }
  const response = await axios.post( baseUrl, toSend )
  console.log('response 2: ', response.data)
  return response.data
}

const castVote = async (id) => {
  const initial = await axios.get(`${baseUrl}/${id}`)
  const initialData = initial.data
  console.log('initialData: ', initialData)
  const toSend = {...initialData, votes: initialData['votes'] + 1}
  console.log('tosend: ', toSend)
  const response = await axios.put(`${baseUrl}/${id}`, toSend)
  console.log('anecdotes castVote: ', response.data)
  return response
}

const exports = { getAll, createNew, castVote }

export default exports