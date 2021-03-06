const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const Note = require('./models/note');
const note = require('./models/note');
const { response } = require('express');

  
  app.use(express.json())
  app.use(cors())
  app.use(express.static('build'))




  app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    }).catch(err => console.log(`there was an error: ${err.message}`))
  })


  app.get('/api/notes/:id', (request, response, next) => {
      const id = request.params.id;
      Note.findById(id)
      .then(result => {
        if(note){
          response.json(result)
        }else {
          response.status(404).end()
        }
      })
      .catch(err => next(error))
  }
  )


  app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    Note.findByIdAndRemove(id).then(result => {
      console.log('note deleted')
      response.status(204).end()
    }).catch(error => next(error))
  })


  app.post('/api/notes', (request, response) => {
      const body = request.body;
        if(!body.content){
            return response.status(400).json({
                error: 'content missing'
            })
        }
      const note = new Note({
          content: body.content,
          important: body.important || false,
          date: new Date(),
        })

      note.save()
      .then(savedNote => savedNote.toJSON())
      .then(savedAndFormattedNote => {
        response.json(savedAndFormattedNote)
      })
      .catch(error => next(error))
    })


    app.put('/api/notes/:id', (request, response, next) => {
      const body = request.body;
      const note = {
        content: body.content,
        important: body.important
      }
      note.findByIdAndUpdate(request.params.id, note, {new: true})
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => next(error))
    })


    const unknownEndpoint = (request, response) => {
      response.status(404).send({error: 'unknown endpoint'})
    }
    app.use(unknownEndpoint)
    
    
    const errorHandler = (error, request, response, next) => {
      console.log(error.message);
      if (error.name === 'CastError'){
        return response.status(404).send({error: 'malformatted id'})
      } else if (error.name === 'ValidationError'){
          return response.status(400).json({ error: error.message })
      }
      next(error)
    }
    app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
