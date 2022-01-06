const express = require('express')
const process = require('process')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 3001
const PhoneEntry = require('./models/entry')

app.use(cors())
app.use(express.static('build'))
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



app.get('/api/info', (request, response) => {
  PhoneEntry.countDocuments({}).then(data => {
    console.log(`there are ${data} documents in the collection`)
    response.status(200).send(`there are ${data} documents in the collection`)
  })
})

// create entry
app.post('/api/persons/', (request, response, next) => {
  let body = request.body
  let newPerson = new PhoneEntry({
    id: Number(Math.floor(Math.random() * 1000)),
    name: body.name,
    number: body.number
  })
  newPerson.save().then(result => {
    console.log('Entry saved: ', result)
    response.json(newPerson)
  }).catch(error => next(error))
})

// read one
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  console.log('id: ', id)
  const found = PhoneEntry.findById(id).then(data => {
    console.log('found: ', data)
    if (!found){
      response.status(400).json({
        error: 'content missing'
      })
    }else {
      response.status(200).json(data)
    }
  }).catch(error => next(error))
})



// read all
app.get('/api/persons', (request, response, next) => {
  PhoneEntry.find({}).then(results => response.json(results)).catch(error => next(error))
})



app.put('/api/persons/:id', (request, response, next) => {
  let body = request.body
  let person = {
    name: body.name,
    number: body.number
  }
  PhoneEntry.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedNote => {
      console.log(`updated note: ${updatedNote}`)
      return response.status(204).json({ updatedNote: updatedNote })
    }).catch(error => next(error))
})



// delete entry
app.delete('/api/persons/:id', (request, response) => {
  console.log('id is ', request.params.id)
  PhoneEntry.findByIdAndRemove(request.params.id).then(result => {
    console.log('Entry removed')
    response.json({ removed: result })
  }).catch(err => console.log(err.message))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint2' })
}
app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  if (error){
    if(error.name === 'ValidationError'){
      return response.status(400).json({ error: error.message })
    }
  }
  next(error)
}
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})