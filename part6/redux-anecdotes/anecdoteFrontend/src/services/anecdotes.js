import axios from 'axios'


const baseUrl = 'http://localhost:3001/anecdotes'



const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const toSend = { content, important: false}
  const response = await axios.post(baseUrl, toSend)
  console.log('response data: ', response.data)
  return response.data
}

const exports = { getAll, createNew }

export default exports