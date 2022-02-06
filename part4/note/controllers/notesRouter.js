const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')


notesRouter.get('/', async ( req, res ) => {
  console.log('notes test 1')
  let notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  console.log('notes test 2: ', notes)
  if(notes) {
    res.status(200).json(notes)
  } else {
    res.status(404).end()
  }
})


notesRouter.get('/:id', async ( req, res ) => {
  let note = await Note.findById( req.params.id )
  console.log('notes test 3: ', note)
  if(note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})


notesRouter.post('/', async (req, res) => {
  const body = req.body

  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  })

  let savedNote = await note.save()
  user.notes = user.notes.concat(savedNote._id)
  await note.save()
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
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})


module.exports = notesRouter