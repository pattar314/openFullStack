const Blog = require('./../models/Blog')
const blogRouter = require('express').Router()



// Create
blogRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


// Read all
blogRouter.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// Read one
blogRouter.get('/api/blogs/:id', ( request, response ) => {
  let id = request.params.id
  Blog.findById(id).then(data => {
    console.log( 'found data', data )
    response.json(data)
  })
})

// Update
blogRouter.put('/api/blogs/:id', (request, response) => {
  let blog = request.body
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(data => {
      console.log('update data: ', data)
      response.json(data)
    })
})

//Delete
blogRouter.delete('/api/blogs/:id', (request, response) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(data => {
      console.log('Deleted: ', data)
      response.json(data)
    })
})

module.exports = blogRouter