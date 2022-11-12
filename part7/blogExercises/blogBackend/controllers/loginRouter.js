const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const process = require('process')
require('express-async-errors')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  console.log(`logging in with ${username}: ${password}`)
  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect) ){
    res.status(401).json( { error: 'Invalid username or password' })
  }

  const userForToken = {
    username: user.username, id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60*120 })
  console.log('login succeeded')
  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
