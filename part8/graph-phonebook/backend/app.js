const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const User = require('./services/models/User')
const typeDefs = require('./services/typeDefs')
const resolvers = require('./services/resolvers')
const { graphql, GraphQLError } = require('graphql')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { v1: uuid } = require('uuid')
const Person = require('./services/models/Person')
const { default: mongoose } = require('mongoose')
const jwt = require('jsonwebtoken')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
require('dotenv').config() 


const MONGODB_URI = process.env.MONGODB_URI 


mongoose.connect(MONGODB_URI).then(() =>
  console.log('connected to mongodb')
).catch((error) => {
  console.log('there was an error connecting to mongodb: ', error)
})

mongoose.set('debug', true)

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  const start = async () => {
    const app = express()
    const httpServer = http.createServer(app)

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/',
    })

    const schema = makeExecutableSchema({ typeDefs, resolvers })
    const serverCleanup = useServer({ schema }, wsServer)

    const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
        async serverWillStart(){
          return {
            async drainServer(){
              await serverCleanup.dispose();
            }
          }
        }
        }
      ],

    })

    await server.start()

    app.use(
      '/',
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req }) => {
          const auth = req ? req.headers.authorization : null
          if (auth && auth.startsWith('Bearer ')){
            const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id).populate('friends')
            return { currentUser }
          }
        }
      })
    )
    
    const PORT = 4000

    httpServer.listen(PORT, () => console.log(`server is now running on http://localhost:${PORT}`))
  }

  start()
  
