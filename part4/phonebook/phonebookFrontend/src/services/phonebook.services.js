import axios from 'axios'



const baseUrl = '/api/persons'


// create
const createEntry = (newEntry) => {
  let request = axios.post(baseUrl, newEntry).then(data => data)
  return request
}


// read all
const readAll = () => {
  let entries = axios.get(baseUrl)
  return entries.then( recieved => recieved.data)
}

// read one

const readOne = (id) => {
  let data = axios.get(`${baseUrl}/${id}`)
  console.log(`read one: ${data}`)
  return data
}


const updateEntry = (id, entry) => {
  console.log('update entry: ', entry)
  let updated = axios.put(`${baseUrl}/${id}`, entry)
  console.log(`updated: ${updated}`)
  return updated.then(response => response.data)
}

const deleteEntry = (id) => {
  axios.delete(`${baseUrl}/${id}`).catch(err => console.log('there was an error: ', err.message))
  return console.log('entry deleted')
}



export default { readAll, readOne, createEntry, deleteEntry, updateEntry}

//mongodb+srv://pattarlearn:greensage%40420@mongolearn.p32sk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority