const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/User')

// create user
usersRouter.post('/', async (req, res) => {
  const body = req.body
  console.log('test 2: ', body)
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  console.log('test 3: ', passwordHash)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  console.log('test 4: ', user)
  const savedUser = await user.save()
  console.log('test 5: ', savedUser)
  res.json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 })
  console.log('users test 1: ', users)
  res.json(users)
})

module.exports = usersRouter