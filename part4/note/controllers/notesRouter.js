const notesRouter = require('express').Router()
const process = require('process')
const jwt = require('jsonwebtoken')
const Note = require('../models/Note')
const User = require('../models/User')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')){
    return authorization.substring(7)
  }
}


notesRouter.get('/', async ( req, res ) => {
  let notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  if(notes) {
    res.status(200).json(notes)
  } else {
    res.status(404).end()
  }
})


notesRouter.get('/:id', async ( req, res ) => {
  const note = await Note.findById( req.params.id )
  if(note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})


notesRouter.post('/', async (req, res) => {
  const body = req.body
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id){
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(!req.body.content){
    res.status(400).json({ error: 'content is missing' })
  }else if( !req.body.userId ){
    res.status(400).json({ error: 'user required' })
  }

  console.log('note body: ', req.body)
  console.log('user is: ', user)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    user: user.id
  })

  console.log('note is: ', note)
  let savedNote = await note.save()
  console.log('saved note is: ', savedNote)

  user.notes = user.notes.concat(savedNote._id)
  const savedUser = await user.save()
  console.log('saved user: ', savedUser)

  res.json(savedNote)
})


notesRouter.put('/:id', async (req, res) => {
  const body = req.body


  const note = {
    content: body.content,
    important: body.important,
  }

  let updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true })
  res.json(updatedNote)

})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndRemove(req.params.id)
  res.status(204).end()
})


module.exports = notesRouter