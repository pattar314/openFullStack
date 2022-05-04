
const User = require('../models/User')
const Blog = require('../models/Blog')
const testRouter = require('express').Router()

testRouter.post('/reset', async (req, res) => {
  console.log('test 1 passed')
  await User.deleteMany({})
  await Blog.deleteMany({})


  return res.json({ message: 'db reset' })
})

module.exports = testRouter