import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const createEntry = (newEntry) => {
    let request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const retrieveAll = () => {
    let request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const updateEntry = (id, entry) => {
    console.log('update entry: ', entry)
    let updated = axios.put(`${baseUrl}/${id}`, entry)
    return updated.then(response => response.data)
    }

const deleteEntry = (id) => {
    axios.delete(`${baseUrl}/${id}`)
    return console.log('entry deleted')
}

//const findEntries = (toFind) => {}


export default { retrieveAll, createEntry, deleteEntry, updateEntry}