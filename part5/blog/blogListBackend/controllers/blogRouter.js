const User = require('../models/User')
const Blog = require('./../models/Blog')
const blogRouter = require('express').Router()
const extractUser = require('./../utilities/middleware').extractUser
const jwt = require('jsonwebtoken')
const process = require('process')
require('dotenv').config()
require('express-async-errors')

/*
const demo = require('./../utilities/config').blogs

 blogRouter.get('/populate', async (req, res) => {
  await Blog.deleteMany({})
  let blogObjects = demo.map((item) => new Blog({
    title: item.title,
    author: item.author,
    url: item.url,
    likes: item.likes
  })
  )

  let promiseArray = blogObjects.map(b => b.save())
  await Promise.all(promiseArray)
  console.log('finished')
  res.send('finished')
})
*/




// Create
blogRouter.post('/', extractUser, async (req, res) => {

  let body = req.body
  console.log('body: ', body)
  console.log('req.token: ', req.token)
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken || !decodedToken.id){
    console.log('token not found or decoding failed')
    return res.status(401).json({ error: 'token missing or invalid' }).end()
  } else {
    const user = await User.findById(decodedToken.id)
    if(body && body.title && body.url){
      console.log('req body: ', body)

      const blog = new Blog({
        user: user.id,
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
      })

      let result = await blog.save()

      user.blogs = user.blogs.concat(result._id)

      await User.findByIdAndUpdate(user._id, user)


      res.status(201).json(result)

    } else {
      console.log('no body provided or an error with submitted info')
      res.status(400).json({ error: 'there was a request error' })
    }
  }

})


// Read all
blogRouter.get('/', async (req, res) => {
  let blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  console.log('result: ', blogs)

  if (!blogs){
    res.status(401).error({ error: 'no blogs found' })
  } else {
    res.status(200).json(blogs)
  }
})

// Read one
blogRouter.get('/:id', async ( req, res ) => {
  let id = req.params.id
  let result = await Blog.findById(id)
    .populate('user', { username: 1, name: 1, id: 1 })
  console.log('result: ', result)
  res.json(result)
})

blogRouter.put('/', extractUser, async (req, res) => {
  let updatedDB = await Blog.updateMany(req.body)
  updatedDB.status === 200 ? console.log('db updated') : console.log(`there was an error ${updatedDB.status}`)
  res.json({ updatedDB: updatedDB, status: updatedDB.status })
})

// Update
blogRouter.put('/:id', extractUser, async (req, res) => {
  let body = req.body
  let result = await Blog.findByIdAndUpdate(req.params.id, body, { new: true })
  res.json(result)
})

//Delete
blogRouter.delete('/:id', extractUser, async (req, res) => {
  const retrievedBlog = await Blog.findById(req.params.id)
  if (!retrievedBlog){
    res.status(400).json({ error: 'blog not found' }).end()
  }
  const blogUser = retrievedBlog.user
  if (!blogUser){
    res.status(400).json({ error: 'blog user not found' })
  }
  if (!(blogUser.toString() === req.user.toString())){
    res.status(401).json({ error: 'Blogs can only be deleted by authorized user' })
  } else {
    const result = await Blog.findByIdAndDelete(req.params.id)
    res.json(result)
  }
})

module.exports = blogRouter