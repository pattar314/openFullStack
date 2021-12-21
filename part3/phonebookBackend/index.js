const { response } = require('express')
const express = require('express')
const morgan = require("morgan")

const app = express()
const PORT = 3001

const tempPhonebook =  [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
  ]

app.use(express.json())

morgan.token('body', function (req) {
    return JSON.stringify(req.body) 
})

app.use(morgan((tokens, req, res) => {
    console.log(tokens.req)
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-', tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))



app.get(`/api/info`, (request, response) => {
    response.status(200).send(`<div>Phonebook has info for ${tempPhonebook.length} people</div>
        <div>${new Date}`)
})

app.get(`/api/persons`, (request, response) => {
    response.json(tempPhonebook)
})

app.post('/api/persons/', (request, response) => {
    let body = request.body
    let newPerson = {
        id: Number(Math.floor(Math.random() * 1000)),
        name: body.name,
        number: body.number
    }
    if (!body.name){
        return response.status(400).json({message: "name is required"})
    } else if (!body.number) {
        return response.status(400).json({message: "number is required"})
    } else if (tempPhonebook.find(person => body.name === person.name)) {
        return response.status(400).json({message: "Name must be unique"})
    } else {
        tempPhonebook.push(newPerson)
        response.status(200).json({message: 'entry added'})
    }
    
})

app.get(`/api/persons/:id`, (request, response) => {
    const id = Number(request.params.id);
    const found = tempPhonebook.find(entry => id === entry.id);
    console.log('found: ', found);
    if (!found){
        response.status(400).json({
            error: 'content missing'
        })
    }else {
        response.status(200).json(found) 
    }
    
})

app.delete('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id)
    let toRemove = tempPhonebook.findIndex(person => person.id === id)
    if (toRemove !== -1){
        console.log(tempPhonebook)
        let newPhoneBook = tempPhonebook.filter(person => person.id !== id);
        tempPhonebook = newPhoneBook
        console.log(tempPhonebook)
        response.status(200).send('<div>Entry removed</div>')
     } else {
         console.log('toRemove not found')
         response.json({error: "there was an error: selected entry does not exist"})
     } 
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint2'})
}
app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

// app.get(`/`, (request, response) => {})