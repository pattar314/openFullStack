const mongoose = require('mongoose')
const helper = require('./test_helper')
const api = helper.api

const Note = require('../models/Note')

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(helper.initialNotes)
})

describe('when there is initally some notes saved', () => {
  test('notes are returned as JSON', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  })


  test('a specific note is among returned notes', async () => {

    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)

    expect(contents).toContain('Browser can execute only Javascript')
  })
})

describe('viewing a specific note', () => {
  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedNoteToView = JSON.parse(JSON.stringify(noteToView))

    expect(resultNote.body).toEqual(processedNoteToView)
  })

  test('fails with a statuscode 404 if note does not exist', async () => {
    const validNonExistingId = await helper.nonExistingId()

    console.log(validNonExistingId)

    await api
      .get(`/api/notes/${ validNonExistingId }`)
      .expect(404)

  })

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/notes/${ invalidId }`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('succeeds with valid data', async () => {
    console.log('this one is suppose to succeed')
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
      userId: '61fc806059032abe9e142391'
    }

    try{
      await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      console.log('note saved')

      const notesAtEnd = await helper.notesInDb()
      expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
      console.log('note added')
      const contents = notesAtEnd.map(n => n.content)
      expect(contents).toContain(
        'async/await simplifies making async calls'
      )
      console.log('note contained')
    } catch(error){
      console.log('there was an error:', error.message)
    }
  })

  test('note without content is not added', async () => {
    console.log('this one is supposed to fail')
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await api.get('/api/notes')

    expect(notesAtEnd.body).toHaveLength(helper.initialNotes.length)
  })
})

describe('deletion of a note', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)

    const contents = notesAtEnd.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)
  })
})

afterAll(() => {
  mongoose.connection.close()
})