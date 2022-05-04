const http = require('http')
//const logger = require('./utilities/logger')
const config = require('./utilities/config')
//const middleware = require('./utilities/middleware')
const blogRouter = require('./controllers/blogRouter')
const app = require('./app')


//app.use(logger)
//app.use(middleware)
app.use(blogRouter)


const server = http.createServer(app)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
