const User = require('./../models/User')
const userRouter = require('express').Router()
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res) => {
  const users = await User.find({})
    .populate('blogs', { title: 1 })

  if(!(users)){
    res.status(401).error({ error: 'User not found' })
  } else {
    res.status(200).json(users)
  }
})

userRouter.get('/:id', async (req, res) => {
  let user = User.findById(req.params.id)
    .populate('blogs', { title: 1 })

  if (!user){
    res.status(401).error({ error: 'user not found' })
  }else {
    res.status(200).json(user)
  }
})

userRouter.post('/', async (req, res) => {
  const body = req.body

  if (body.password.length < 3){
    res.status(401).json({ error: 'password must be more than 3 characters' })
  }

  const saltRounds  = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const newUser = new User({
    name: body.name,
    username: body.username,
    passwordHash
  })

  const savedUser = await newUser.save()
  if (savedUser === undefined){
    res.status(401).json({ error: 'error in creating user' })
  } else {
    res.status(201).json(savedUser)
  }
})

module.exports = userRouter