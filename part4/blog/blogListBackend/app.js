const express = require('express')
const cors = require('cors')
const process = require('process')
const blogRouter = require('./controllers/blogRouter')
const middleware = require('./utilities/middleware')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(middleware)

mongoose.connect(process.env.MONGODB_URI)

app.get('/', (request, response) => {
  response.send('homepage')
})

app.use(blogRouter)

module.exports = app