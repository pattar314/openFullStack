const express = require('express')
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')
// const loginRouter = require('./controllers/loginRouter')
const middleware = require('./utilities/middleware')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const config = require('./utilities/config')
const errorHandler = require('./utilities/errorHandler')

app.use(cors())
app.use(express.json())
app.use(middleware.routeLogger)

mongoose.connect(config.MONGODB_URI)

app.get('/', (request, response) => {
  response.send('homepage')
})


app.use(middleware.extractToken)
app.use('/api/login', loginRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use(errorHandler.errorHandler)
app.use(errorHandler.unknownEndpoint)

module.exports = app